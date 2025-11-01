// ===== GAMS SCIENCE DEPARTMENT - ENHANCED JAVASCRIPT =====

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔬 Gams Science Department - Initializing...');
    
    // Core initializations
    initializeNavigation();
    initializeSidebar();
    initializeMobileMenu();
    initializeScrollEffects();
    
    // Page-specific initializations
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        initializeCalendar();
    }
    
    if (currentPage === 'department-admin.html') {
        initializeDepartmentAdmin();
    }
    
    if (currentPage === 'shop.html') {
        initializeShop();
    }
    
    // Initialize file downloads on all pages
    if (document.querySelector('.file-item')) {
        initializeFileDownloads();
    }
    
    console.log('✅ Initialization complete!');
});

// ===== DEPARTMENT ADMIN INITIALIZATION =====
function initializeDepartmentAdmin() {
    console.log('🔧 Initializing Department Admin page...');
    
    // Check if there's a hash in the URL on load
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => handleSectionNavigation(sectionId), 300);
    }
    
    // Add click handlers to all cards in the welcome section
    const welcomeCards = document.querySelectorAll('#welcome-section .card-footer a');
    welcomeCards.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                window.location.hash = href;
                handleSectionNavigation(sectionId);
            }
        });
    });
}

// ===== NAVIGATION HIGHLIGHTING =====
function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');
        
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== ENHANCED SIDEBAR FUNCTIONALITY =====
function initializeSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    sidebarItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.sidebar-submenu');
        
        // Check if this item should be active based on current page
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            item.classList.add('active');
        }
        
        // Add click handler for items with submenus
        if (submenu) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // If it's a hash link or same page, prevent default and toggle
                if (href === '#' || href === currentPage) {
                    e.preventDefault();
                    
                    // Check if currently active
                    const isActive = item.classList.contains('active');
                    
                    // Close all other submenus
                    sidebarItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    if (isActive) {
                        item.classList.remove('active');
                    } else {
                        item.classList.add('active');
                    }
                }
            });
        }
        
        // Add click handlers for submenu links
        if (submenu) {
            const submenuLinks = submenu.querySelectorAll('a');
            submenuLinks.forEach(subLink => {
                subLink.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Check if it's a hash link for the current page
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const sectionId = href.substring(1);
                        handleSectionNavigation(sectionId);
                        
                        // Update URL hash
                        window.location.hash = href;
                        
                        // Highlight active submenu item
                        submenuLinks.forEach(l => {
                            l.style.color = '';
                            l.style.background = '';
                        });
                        this.style.color = 'white';
                        this.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                });
                
                // Highlight if current hash matches
                if (window.location.hash && subLink.getAttribute('href') === window.location.hash) {
                    subLink.style.color = 'white';
                    subLink.style.background = 'rgba(255, 255, 255, 0.1)';
                }
            });
        }
    });
    
    // Handle hash on page load
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => handleSectionNavigation(sectionId), 100);
    }
}

// ===== SECTION NAVIGATION HANDLER =====
function handleSectionNavigation(sectionId) {
    console.log('Navigating to section:', sectionId);
    
    // Hide the welcome section
    const welcomeSection = document.getElementById('welcome-section');
    if (welcomeSection) {
        welcomeSection.style.display = 'none';
    }
    
    // Get or create the section content container
    let sectionContainer = document.getElementById('section-content-container');
    if (!sectionContainer) {
        const contentArea = document.querySelector('.content');
        sectionContainer = document.createElement('div');
        sectionContainer.id = 'section-content-container';
        contentArea.appendChild(sectionContainer);
    }
    
    // Clear existing content
    sectionContainer.innerHTML = '';
    
    // Load the appropriate section
    loadSectionContent(sectionId);
    
    // Scroll to the section
    setTimeout(() => {
        sectionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ===== LOAD SECTION CONTENT =====
function loadSectionContent(sectionId) {
    const sectionContainer = document.getElementById('section-content-container');
    if (!sectionContainer) return;
    
    // Check if we're on department-admin page
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'department-admin.html' && currentPage !== '') {
        return;
    }
    
    // Show loading state
    sectionContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i><p>Loading...</p></div>';
    
    // Small delay for smooth loading effect
    setTimeout(() => {
        // Load content based on section
        switch(sectionId) {
            case 'meetings':
                loadMeetingsSection(sectionContainer);
                break;
            case 'documents':
                loadDocumentsSection(sectionContainer);
                break;
            case 'timetables':
                loadTimetablesSection(sectionContainer);
                break;
            case 'estimates':
                loadEstimatesSection(sectionContainer);
                break;
            case 'budget':
                loadBudgetSection(sectionContainer);
                break;
            case 'marksheets':
                loadMarksheetsSection(sectionContainer);
                break;
            case 'appraisals':
                loadAppraisalsSection(sectionContainer);
                break;
            case 'inventory':
                loadInventorySection(sectionContainer);
                break;
            default:
                sectionContainer.innerHTML = '<div class="drive-section"><p style="text-align: center; color: #999; padding: 2rem;">Section not found.</p></div>';
        }
    }, 300);
}

// ===== MEETINGS SECTION =====
function loadMeetingsSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-meetings">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-users"></i> Department Meetings</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Manage meeting agendas, minutes, and related documents.</p>
                
                <div class="meeting-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                    <div class="action-card" onclick="showDraftAgenda()">
                        <i class="fas fa-file-alt" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h4>Draft New Agenda</h4>
                        <p>Create a new meeting agenda</p>
                    </div>
                    
                    <div class="action-card" onclick="showPastAgendas()">
                        <i class="fas fa-folder-open" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                        <h4>View Past Agendas</h4>
                        <p>Access previous meeting agendas</p>
                    </div>
                    
                    <div class="action-card" onclick="showPastMinutes()">
                        <i class="fas fa-history" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h4>Past Meeting Minutes</h4>
                        <p>View minutes from previous meetings</p>
                    </div>
                    
                    <div class="action-card" onclick="showUploadDocument('meeting')">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                        <h4>Upload Document</h4>
                        <p>Upload a prepared meeting document</p>
                    </div>
                </div>
                
                <div id="meetings-dynamic-content"></div>
            </div>
        </div>
    `;
}

// Return to overview
window.returnToOverview = function() {
    const welcomeSection = document.getElementById('welcome-section');
    const sectionContainer = document.getElementById('section-content-container');
    
    if (welcomeSection) {
        welcomeSection.style.display = 'block';
    }
    
    if (sectionContainer) {
        sectionContainer.innerHTML = '';
    }
    
    // Clear the hash
    history.pushState("", document.title, window.location.pathname);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Draft New Agenda
window.showDraftAgenda = function() {
    const dynamicContent = document.getElementById('meetings-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-file-alt"></i> Draft Meeting Agenda</h3>
                <button onclick="closeDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form id="agendaForm" onsubmit="saveAgenda(event)">
                <div class="form-group">
                    <label class="form-label">Meeting Title *</label>
                    <input type="text" class="form-input" id="meetingTitle" required 
                           placeholder="e.g., Department Meeting - November 2025">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Date *</label>
                        <input type="date" class="form-input" id="meetingDate" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Time *</label>
                        <input type="time" class="form-input" id="meetingTime" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Location *</label>
                    <input type="text" class="form-input" id="meetingLocation" required 
                           placeholder="e.g., Science Lab 1">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Attendees (one per line)</label>
                    <textarea class="form-textarea" id="meetingAttendees" rows="4" 
                              placeholder="John Smith - Head of Department&#10;Jane Doe - Chemistry Teacher&#10;..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Agenda Items</label>
                    <div id="agendaItems">
                        <div class="agenda-item-input" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <input type="text" class="form-input" placeholder="Agenda item 1" style="flex: 1;">
                            <button type="button" onclick="removeAgendaItem(this)" class="btn btn-danger btn-sm">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <button type="button" onclick="addAgendaItem()" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem;">
                        <i class="fas fa-plus"></i> Add Item
                    </button>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Additional Notes</label>
                    <textarea class="form-textarea" id="meetingNotes" rows="4" 
                              placeholder="Any additional information..."></textarea>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" onclick="closeDynamicContent()" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Agenda
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Set default date to today
    document.getElementById('meetingDate').valueAsDate = new Date();
};

window.addAgendaItem = function() {
    const container = document.getElementById('agendaItems');
    const itemCount = container.children.length + 1;
    const newItem = document.createElement('div');
    newItem.className = 'agenda-item-input';
    newItem.style.cssText = 'display: flex; gap: 0.5rem; margin-bottom: 0.5rem;';
    newItem.innerHTML = `
        <input type="text" class="form-input" placeholder="Agenda item ${itemCount}" style="flex: 1;">
        <button type="button" onclick="removeAgendaItem(this)" class="btn btn-danger btn-sm">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(newItem);
};

window.removeAgendaItem = function(button) {
    const container = document.getElementById('agendaItems');
    if (container.children.length > 1) {
        button.parentElement.remove();
    } else {
        alert('You must have at least one agenda item.');
    }
};

window.saveAgenda = function(event) {
    event.preventDefault();
    
    const title = document.getElementById('meetingTitle').value;
    const date = document.getElementById('meetingDate').value;
    const time = document.getElementById('meetingTime').value;
    const location = document.getElementById('meetingLocation').value;
    const attendees = document.getElementById('meetingAttendees').value;
    const notes = document.getElementById('meetingNotes').value;
    
    const agendaItems = [];
    document.querySelectorAll('#agendaItems input').forEach(input => {
        if (input.value.trim()) {
            agendaItems.push(input.value.trim());
        }
    });
    
    const agenda = {
        id: Date.now().toString(),
        title,
        date,
        time,
        location,
        attendees: attendees.split('\n').filter(a => a.trim()),
        agendaItems,
        notes,
        createdAt: new Date().toISOString(),
        type: 'agenda'
    };
    
    // Save to localStorage
    let agendas = JSON.parse(localStorage.getItem('meetingAgendas')) || [];
    agendas.push(agenda);
    localStorage.setItem('meetingAgendas', JSON.stringify(agendas));
    
    alert('✅ Agenda saved successfully!');
    closeDynamicContent();
    showPastAgendas();
};

// View Past Agendas
window.showPastAgendas = function() {
    const agendas = JSON.parse(localStorage.getItem('meetingAgendas')) || [];
    const dynamicContent = document.getElementById('meetings-dynamic-content');
    
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-folder-open"></i> Past Meeting Agendas</h3>
                <button onclick="closeDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            ${agendas.length === 0 ? 
                '<p style="text-align: center; color: #999; padding: 2rem;">No agendas found. Create your first agenda!</p>' :
                `<div class="agenda-list">
                    ${agendas.map(agenda => `
                        <div class="agenda-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--primary);">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div style="flex: 1;">
                                    <h4 style="color: var(--primary); margin-bottom: 0.5rem;">${agenda.title}</h4>
                                    <p style="color: #666; margin-bottom: 0.5rem;">
                                        <i class="fas fa-calendar"></i> ${new Date(agenda.date).toLocaleDateString()} 
                                        <i class="fas fa-clock" style="margin-left: 1rem;"></i> ${agenda.time}
                                    </p>
                                    <p style="color: #666; margin-bottom: 0.5rem;">
                                        <i class="fas fa-map-marker-alt"></i> ${agenda.location}
                                    </p>
                                    <p style="color: #999; font-size: 0.85rem;">
                                        Created: ${new Date(agenda.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button onclick="viewAgenda('${agenda.id}')" class="btn btn-primary btn-sm">
                                        <i class="fas fa-eye"></i> View
                                    </button>
                                    <button onclick="deleteAgenda('${agenda.id}')" class="btn btn-danger btn-sm">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>`
            }
        </div>
    `;
};

window.viewAgenda = function(id) {
    const agendas = JSON.parse(localStorage.getItem('meetingAgendas')) || [];
    const agenda = agendas.find(a => a.id === id);
    
    if (!agenda) return;
    
    const dynamicContent = document.getElementById('meetings-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-file-alt"></i> ${agenda.title}</h3>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="downloadAgenda('${id}')" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button onclick="showPastAgendas()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                </div>
            </div>
            
            <div class="agenda-view" style="line-height: 1.8;">
                <p><strong>Date:</strong> ${new Date(agenda.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${agenda.time}</p>
                <p><strong>Location:</strong> ${agenda.location}</p>
                
                ${agenda.attendees.length > 0 ? `
                    <div style="margin-top: 1.5rem;">
                        <strong>Attendees:</strong>
                        <ul style="margin-top: 0.5rem;">
                            ${agenda.attendees.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div style="margin-top: 1.5rem;">
                    <strong>Agenda Items:</strong>
                    <ol style="margin-top: 0.5rem;">
                        ${agenda.agendaItems.map(item => `<li>${item}</li>`).join('')}
                    </ol>
                </div>
                
                ${agenda.notes ? `
                    <div style="margin-top: 1.5rem;">
                        <strong>Additional Notes:</strong>
                        <p style="margin-top: 0.5rem; white-space: pre-line;">${agenda.notes}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
};

window.downloadAgenda = function(id) {
    const agendas = JSON.parse(localStorage.getItem('meetingAgendas')) || [];
    const agenda = agendas.find(a => a.id === id);
    
    if (!agenda) return;
    
    // Create text content
    let content = `${agenda.title}\n`;
    content += `${'='.repeat(agenda.title.length)}\n\n`;
    content += `Date: ${new Date(agenda.date).toLocaleDateString()}\n`;
    content += `Time: ${agenda.time}\n`;
    content += `Location: ${agenda.location}\n\n`;
    
    if (agenda.attendees.length > 0) {
        content += `Attendees:\n`;
        agenda.attendees.forEach(a => content += `  - ${a}\n`);
        content += `\n`;
    }
    
    content += `Agenda Items:\n`;
    agenda.agendaItems.forEach((item, index) => {
        content += `  ${index + 1}. ${item}\n`;
    });
    
    if (agenda.notes) {
        content += `\nAdditional Notes:\n${agenda.notes}\n`;
    }
    
    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${agenda.title.replace(/[^a-z0-9]/gi, '_')}_agenda.txt`;
    a.click();
    URL.revokeObjectURL(url);
};

window.deleteAgenda = function(id) {
    if (!confirm('Are you sure you want to delete this agenda?')) return;
    
    let agendas = JSON.parse(localStorage.getItem('meetingAgendas')) || [];
    agendas = agendas.filter(a => a.id !== id);
    localStorage.setItem('meetingAgendas', JSON.stringify(agendas));
    
    alert('✅ Agenda deleted successfully!');
    showPastAgendas();
};

// View Past Minutes
window.showPastMinutes = function() {
    const minutes = JSON.parse(localStorage.getItem('meetingMinutes')) || [];
    const dynamicContent = document.getElementById('meetings-dynamic-content');
    
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-history"></i> Past Meeting Minutes</h3>
                <button onclick="closeDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            ${minutes.length === 0 ? 
                '<p style="text-align: center; color: #999; padding: 2rem;">No meeting minutes found. Upload or create meeting minutes!</p>' :
                `<div class="minutes-list">
                    ${minutes.map(minute => `
                        <div class="minutes-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--success);">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div>
                                    <h4 style="color: var(--success); margin-bottom: 0.5rem;">${minute.title}</h4>
                                    <p style="color: #666;">${new Date(minute.date).toLocaleDateString()}</p>
                                </div>
                                <button onclick="viewMinutes('${minute.id}')" class="btn btn-success btn-sm">
                                    <i class="fas fa-eye"></i> View
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>`
            }
        </div>
    `;
};

// Upload Document
window.showUploadDocument = function(type) {
    const dynamicContent = document.getElementById('meetings-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-cloud-upload-alt"></i> Upload Meeting Document</h3>
                <button onclick="closeDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form onsubmit="uploadMeetingDocument(event)">
                <div class="upload-area" style="border: 2px dashed var(--primary); border-radius: 8px; padding: 3rem; text-align: center; margin-bottom: 1.5rem; background: #f8fdff; cursor: pointer;">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <p>Click to browse or drag and drop your file here</p>
                    <input type="file" id="meetingDocUpload" accept=".pdf,.doc,.docx,.txt" style="display: none;">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Document Type *</label>
                    <select class="form-select" id="docType" required>
                        <option value="agenda">Meeting Agenda</option>
                        <option value="minutes">Meeting Minutes</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Document Title *</label>
                    <input type="text" class="form-input" id="docTitle" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" id="docDescription" rows="3"></textarea>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" onclick="closeDynamicContent()" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-upload"></i> Upload
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Add file input handler
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('meetingDocUpload');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            uploadArea.querySelector('p').textContent = `Selected: ${this.files[0].name}`;
        }
    });
};

window.uploadMeetingDocument = function(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('meetingDocUpload');
    const docType = document.getElementById('docType').value;
    const title = document.getElementById('docTitle').value;
    const description = document.getElementById('docDescription').value;
    
    if (!fileInput.files.length) {
        alert('Please select a file to upload');
        return;
    }
    
    // In production, this would upload to your server/drive
    alert(`✅ Document "${title}" uploaded successfully!\n\nType: ${docType}\nFile: ${fileInput.files[0].name}`);
    closeDynamicContent();
};

window.closeDynamicContent = function() {
    const dynamicContent = document.getElementById('meetings-dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = '';
    }
};
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav ul');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
            this.innerHTML = nav.classList.contains('show') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('show');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('show');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== ENHANCED CALENDAR FUNCTIONALITY =====
function initializeCalendar() {
    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem('departmentEvents')) || [
        { id: '1', title: 'Department Meeting', date: '2024-04-15' },
        { id: '2', title: 'Science Fair', date: '2024-04-20' },
        { id: '3', title: 'Lab Safety Training', date: '2024-04-25' }
    ];

    function generateCalendar() {
        const calendar = document.getElementById('calendar');
        const currentMonth = document.getElementById('currentMonth');
        
        if (!calendar || !currentMonth) return;
        
        // Set current month display
        currentMonth.textContent = currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });

        // Clear calendar completely
        calendar.innerHTML = '';

        // Calculate calendar days
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const totalDays = lastDay.getDate();
        const startingDay = firstDay.getDay();
        const today = new Date();

        // Add empty days for alignment
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }

        // Add calendar days
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            // Check if it's today
            if (day === today.getDate() && 
                currentDate.getMonth() === today.getMonth() && 
                currentDate.getFullYear() === today.getFullYear()) {
                dayElement.classList.add('today');
            }

            // Check for events
            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getDate() === day && 
                       eventDate.getMonth() === currentDate.getMonth() && 
                       eventDate.getFullYear() === currentDate.getFullYear();
            });

            if (dayEvents.length > 0) {
                dayElement.classList.add('event');
                
                // Add click handler to show event details
                dayElement.addEventListener('click', function() {
                    const eventList = dayEvents.map(e => `• ${e.title}`).join('\n');
                    alert(`Events on ${currentDate.toLocaleDateString('en-US', { month: 'long' })} ${day}:\n\n${eventList}`);
                });
            }

            calendar.appendChild(dayElement);
        }
    }

    // Event form handling
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('eventTitle').value.trim();
            const date = document.getElementById('eventDate').value;

            if (!title || !date) {
                alert('Please fill in all fields');
                return;
            }

            const newEvent = {
                id: Date.now().toString(),
                title: title,
                date: date
            };

            events.push(newEvent);
            localStorage.setItem('departmentEvents', JSON.stringify(events));
            
            this.reset();
            generateCalendar();
            
            alert('✅ Event added successfully!');
        });
    }

    // Month navigation
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    
    if (prevMonth) {
        prevMonth.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar();
        });
    }
    
    if (nextMonth) {
        nextMonth.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar();
        });
    }

    // Initial calendar generation
    generateCalendar();
}

// ===== SHOP FUNCTIONALITY =====
function initializeShop() {
    console.log('🛒 Initializing shop...');
    
    // Shop inventory data
    const shopItems = {
        vegetables: [
            { id: 1, name: "Fresh Tomatoes", price: 2.50, unit: "per lb", image: "🍅", description: "Freshly harvested organic tomatoes", available: true },
            { id: 2, name: "Carrots", price: 1.75, unit: "per lb", image: "🥕", description: "Organic carrots, crisp and sweet", available: true },
            { id: 3, name: "Lettuce", price: 1.50, unit: "per head", image: "🥬", description: "Fresh green lettuce", available: true },
            { id: 4, name: "Bell Peppers", price: 3.00, unit: "per lb", image: "🫑", description: "Colorful bell peppers", available: false },
            { id: 5, name: "Cucumbers", price: 1.25, unit: "each", image: "🥒", description: "Fresh cucumbers", available: true },
            { id: 6, name: "Broccoli", price: 2.25, unit: "per lb", image: "🥦", description: "Fresh broccoli crowns", available: true }
        ],
        plants: [
            { id: 1, name: "Orchid Plant", price: 15.00, unit: "each", image: "🌸", description: "Beautiful flowering orchid", available: true },
            { id: 2, name: "Succulent Set", price: 8.50, unit: "set of 3", image: "🌵", description: "Low maintenance succulents", available: true },
            { id: 3, name: "Herb Garden Kit", price: 12.00, unit: "kit", image: "🌿", description: "Basil, mint, and parsley", available: true },
            { id: 4, name: "Rose Bush", price: 18.00, unit: "each", image: "🌹", description: "Beautiful red rose bush", available: false },
            { id: 5, name: "Sunflower", price: 5.00, unit: "each", image: "🌻", description: "Bright yellow sunflower", available: true },
            { id: 6, name: "Peace Lily", price: 14.00, unit: "each", image: "🌺", description: "Air-purifying peace lily", available: true }
        ],
        chickens: [
            { id: 1, name: "Fresh Eggs", price: 4.00, unit: "per dozen", image: "🥚", description: "Farm fresh eggs", available: true },
            { id: 2, name: "Whole Chicken", price: 12.00, unit: "each", image: "🍗", description: "Fresh whole chicken", available: true },
            { id: 3, name: "Chicken Feed", price: 8.50, unit: "20lb bag", image: "🌾", description: "Organic chicken feed", available: true },
            { id: 4, name: "Fertilized Eggs", price: 6.00, unit: "per dozen", image: "🥚", description: "For hatching purposes", available: true }
        ]
    };

    let cart = JSON.parse(localStorage.getItem('shopCart')) || [];
    let quantities = {};

    // Initialize shop display
    showShopCategory('vegetables');
    updateCartDisplay();

    // Shop category switching
    window.showShopCategory = function(category) {
        // Hide all categories
        document.querySelectorAll('.shop-category').forEach(cat => {
            cat.classList.remove('active');
        });
        
        // Show selected category
        const categoryElement = document.getElementById(category + '-shop');
        if (categoryElement) {
            categoryElement.classList.add('active');
        }
        
        // Update active tab
        document.querySelectorAll('.shop-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = document.querySelector(`.shop-tab[data-category="${category}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        renderShopItems(category);
    };

    function renderShopItems(category) {
        const container = document.getElementById(category + '-items');
        const items = shopItems[category];
        
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <div class="shop-item-card ${!item.available ? 'out-of-stock' : ''}" data-item-id="${item.id}">
                <div class="shop-item-image">${item.image}</div>
                <div class="shop-item-info">
                    <h4>${item.name}</h4>
                    <p class="shop-item-description">${item.description}</p>
                    <div class="shop-item-price">$${item.price.toFixed(2)} <span>${item.unit}</span></div>
                    <div class="shop-item-availability ${item.available ? 'in-stock' : 'out-of-stock'}">
                        ${item.available ? '✓ In Stock' : '✗ Out of Stock'}
                    </div>
                </div>
                <div class="shop-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id}, '${category}')" ${!item.available ? 'disabled' : ''}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display" id="quantity-${category}-${item.id}">0</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id}, '${category}')" ${!item.available ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="btn btn-primary add-to-cart-btn" 
                            onclick="addToCart(${item.id}, '${category}')"
                            ${!item.available ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    window.increaseQuantity = function(itemId, category) {
        const quantityDisplay = document.getElementById(`quantity-${category}-${itemId}`);
        if (quantityDisplay) {
            let quantity = parseInt(quantityDisplay.textContent) || 0;
            quantity++;
            quantityDisplay.textContent = quantity;
            quantities[`${category}-${itemId}`] = quantity;
        }
    };

    window.decreaseQuantity = function(itemId, category) {
        const quantityDisplay = document.getElementById(`quantity-${category}-${itemId}`);
        if (quantityDisplay) {
            let quantity = parseInt(quantityDisplay.textContent) || 0;
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
                quantities[`${category}-${itemId}`] = quantity;
            }
        }
    };

    window.addToCart = function(itemId, category) {
        const quantityDisplay = document.getElementById(`quantity-${category}-${itemId}`);
        if (!quantityDisplay) return;
        
        const quantity = parseInt(quantityDisplay.textContent) || 0;
        
        if (quantity === 0) {
            alert('⚠️ Please select a quantity first');
            return;
        }
        
        const item = shopItems[category].find(i => i.id === itemId);
        const existingItem = cart.find(cartItem => cartItem.id === itemId && cartItem.category === category);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: itemId,
                category: category,
                name: item.name,
                price: item.price,
                unit: item.unit,
                image: item.image,
                quantity: quantity
            });
        }
        
        // Reset quantity display
        quantityDisplay.textContent = '0';
        quantities[`${category}-${itemId}`] = 0;
        
        // Save to localStorage
        localStorage.setItem('shopCart', JSON.stringify(cart));
        
        // Update cart display
        updateCartDisplay();
        
        // Show success message
        alert(`✅ Added ${quantity} ${item.name} to cart!`);
    };

    function updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartCount || !cartItems || !cartTotal) return;
        
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items list
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">🛒 Your cart is empty</p>';
            cartTotal.textContent = '0.00';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)} ${item.unit}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, '${item.category}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, '${item.category}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id}, '${item.category}')" title="Remove from cart">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = total.toFixed(2);
        }
    }

    window.updateCartQuantity = function(itemId, category, change) {
        const item = cart.find(cartItem => cartItem.id === itemId && cartItem.category === category);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(itemId, category);
            } else {
                localStorage.setItem('shopCart', JSON.stringify(cart));
                updateCartDisplay();
            }
        }
    };

    window.removeFromCart = function(itemId, category) {
        if (confirm('Remove this item from cart?')) {
            cart = cart.filter(item => !(item.id === itemId && item.category === category));
            localStorage.setItem('shopCart', JSON.stringify(cart));
            updateCartDisplay();
        }
    };

    window.clearCart = function() {
        if (cart.length === 0) {
            alert('Cart is already empty!');
            return;
        }
        
        if (confirm('Are you sure you want to clear your entire cart?')) {
            cart = [];
            localStorage.setItem('shopCart', JSON.stringify(cart));
            updateCartDisplay();
            alert('🗑️ Cart cleared!');
        }
    };

    window.checkout = function() {
        if (cart.length === 0) {
            alert('⚠️ Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const message = `🛒 Checkout Summary:\n\n` +
                       `Items: ${itemCount}\n` +
                       `Total: $${total.toFixed(2)}\n\n` +
                       `Thank you for your order! 🌟\n` +
                       `(This is a demo - no actual payment processed)`;
        
        alert(message);
        
        // Clear cart after "checkout"
        cart = [];
        localStorage.setItem('shopCart', JSON.stringify(cart));
        updateCartDisplay();
    };
}

// ===== FILE DOWNLOAD FUNCTIONALITY =====
function initializeFileDownloads() {
    const fileItems = document.querySelectorAll('.file-item');
    
    fileItems.forEach(item => {
        // Only add click handler if it doesn't already have one
        if (!item.classList.contains('has-click-handler')) {
            item.classList.add('has-click-handler');
            
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const fileName = this.querySelector('.file-name')?.textContent || 'file';
                
                alert(`📥 Downloading: ${fileName}\n\n` +
                      `This is a demo. In production, this would download the actual file.`);
            });
        }
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        const href = target.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
});

// ===== UTILITY FUNCTIONS =====

// Format currency
function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// ===== ESTIMATES SECTION =====
function loadEstimatesSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-estimates">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-calculator"></i> Department Estimates</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Manage budget estimates, cost projections, and financial planning for department activities.</p>
                
                <div class="estimates-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                    <div class="action-card" onclick="showCreateEstimate()">
                        <i class="fas fa-plus-circle" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h4>Create Estimate</h4>
                        <p>Create new budget estimates</p>
                    </div>
                    
                    <div class="action-card" onclick="showPendingEstimates()">
                        <i class="fas fa-clock" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                        <h4>Pending Estimates</h4>
                        <p>View estimates awaiting approval</p>
                    </div>
                    
                    <div class="action-card" onclick="showApprovedEstimates()">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h4>Approved Estimates</h4>
                        <p>View approved budgets</p>
                    </div>
                    
                    <div class="action-card" onclick="showEstimateTemplates()">
                        <i class="fas fa-copy" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                        <h4>Estimate Templates</h4>
                        <p>Use pre-built templates</p>
                    </div>
                    
                    <div class="action-card" onclick="showBudgetTracking()">
                        <i class="fas fa-chart-line" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                        <h4>Budget Tracking</h4>
                        <p>Monitor budget utilization</p>
                    </div>
                    
                    <div class="action-card" onclick="showUploadEstimate()">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--secondary); margin-bottom: 1rem;"></i>
                        <h4>Upload Estimate</h4>
                        <p>Upload existing estimate files</p>
                    </div>
                </div>
                
                <div id="estimates-dynamic-content"></div>
            </div>
        </div>
    `;
}

// Create Estimate Section
window.showCreateEstimate = function() {
    const dynamicContent = document.getElementById('estimates-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-plus-circle"></i> Create New Estimate</h3>
                <button onclick="closeEstimatesDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form id="estimateForm" onsubmit="saveEstimate(event)">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Estimate Title *</label>
                        <input type="text" class="form-input" id="estimateTitle" required 
                               placeholder="e.g., Science Lab Equipment Q2 2025">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Department *</label>
                        <select class="form-select" id="estimateDepartment" required>
                            <option value="">-- Select Department --</option>
                            <option value="physics">Physics Department</option>
                            <option value="chemistry">Chemistry Department</option>
                            <option value="biology">Biology Department</option>
                            <option value="mathematics">Mathematics Department</option>
                            <option value="general_science">General Science</option>
                        </select>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Academic Year *</label>
                        <select class="form-select" id="academicYear" required>
                            <option value="2024-2025">2024-2025</option>
                            <option value="2025-2026" selected>2025-2026</option>
                            <option value="2026-2027">2026-2027</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Quarter *</label>
                        <select class="form-select" id="estimateQuarter" required>
                            <option value="q1">Q1 (Jan-Mar)</option>
                            <option value="q2">Q2 (Apr-Jun)</option>
                            <option value="q3">Q3 (Jul-Sep)</option>
                            <option value="q4">Q4 (Oct-Dec)</option>
                            <option value="full_year">Full Year</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Purpose *</label>
                    <textarea class="form-textarea" id="estimatePurpose" rows="3" required 
                              placeholder="Describe the purpose and justification for this estimate..."></textarea>
                </div>
                
                <div class="estimate-items-section">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-list"></i> Estimate Items
                    </h4>
                    
                    <div class="items-table" style="margin-bottom: 1.5rem;">
                        <div class="table-header" style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr 80px; gap: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px 8px 0 0; font-weight: bold;">
                            <div>Item Description</div>
                            <div>Quantity</div>
                            <div>Unit Price ($)</div>
                            <div>Total ($)</div>
                            <div>Action</div>
                        </div>
                        
                        <div id="estimateItems">
                            <div class="table-row" style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr 80px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;">
                                <input type="text" class="form-input" placeholder="Item description" onchange="calculateItemTotal(this)">
                                <input type="number" class="form-input" value="1" min="1" onchange="calculateItemTotal(this)">
                                <input type="number" class="form-input" placeholder="0.00" step="0.01" min="0" onchange="calculateItemTotal(this)">
                                <div class="item-total" style="font-weight: bold; color: var(--success);">0.00</div>
                                <button type="button" onclick="removeEstimateItem(this)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="table-footer" style="padding: 1rem; background: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <button type="button" onclick="addEstimateItem()" class="btn btn-secondary btn-sm">
                                <i class="fas fa-plus"></i> Add Item
                            </button>
                        </div>
                    </div>
                    
                    <div class="estimate-summary" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--primary);">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <strong>Subtotal:</strong>
                                <div id="estimateSubtotal" style="font-size: 1.2rem; font-weight: bold; color: var(--primary);">$0.00</div>
                            </div>
                            <div>
                                <strong>Tax (18%):</strong>
                                <div id="estimateTax" style="font-size: 1.2rem; font-weight: bold; color: var(--warning);">$0.00</div>
                            </div>
                            <div>
                                <strong>Total Estimate:</strong>
                                <div id="estimateTotal" style="font-size: 1.5rem; font-weight: bold; color: var(--success);">$0.00</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="form-group" style="margin-top: 1.5rem;">
                    <label class="form-label">Additional Notes</label>
                    <textarea class="form-textarea" id="estimateNotes" rows="3" 
                              placeholder="Any additional information or special requirements..."></textarea>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" onclick="closeEstimatesDynamicContent()" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Estimate
                    </button>
                </div>
            </form>
        </div>
    `;
};

// Pending Estimates Section
window.showPendingEstimates = function() {
    const estimates = JSON.parse(localStorage.getItem('pendingEstimates')) || [];
    const dynamicContent = document.getElementById('estimates-dynamic-content');
    
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-clock"></i> Pending Estimates</h3>
                <div>
                    <button onclick="exportPendingEstimates()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button onclick="closeEstimatesDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            ${estimates.length === 0 ? 
                '<div class="empty-state" style="text-align: center; padding: 3rem; color: #999;">' +
                    '<i class="fas fa-inbox" style="font-size: 4rem; margin-bottom: 1rem;"></i>' +
                    '<p>No pending estimates found.</p>' +
                    '<button onclick="showCreateEstimate()" class="btn btn-primary">Create First Estimate</button>' +
                '</div>' :
                `<div class="estimates-list">
                    ${estimates.map(estimate => `
                        <div class="estimate-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--warning);">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div style="flex: 1;">
                                    <h4 style="color: var(--warning); margin-bottom: 0.5rem;">${estimate.title}</h4>
                                    <p style="color: #666; margin-bottom: 0.5rem;">
                                        <strong>Department:</strong> ${estimate.department} • 
                                        <strong>Quarter:</strong> ${estimate.quarter} • 
                                        <strong>Created:</strong> ${new Date(estimate.createdAt).toLocaleDateString()}
                                    </p>
                                    <p style="color: #999; margin-bottom: 0.5rem;">${estimate.purpose.substring(0, 100)}...</p>
                                    <div style="display: flex; gap: 2rem;">
                                        <div>
                                            <strong>Total Amount:</strong>
                                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--success);">$${estimate.total.toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <strong>Status:</strong>
                                            <span style="color: var(--warning); font-weight: bold;">Pending Review</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                    <button onclick="viewEstimate('${estimate.id}')" class="btn btn-primary btn-sm">
                                        <i class="fas fa-eye"></i> View
                                    </button>
                                    <button onclick="approveEstimate('${estimate.id}')" class="btn btn-success btn-sm">
                                        <i class="fas fa-check"></i> Approve
                                    </button>
                                    <button onclick="rejectEstimate('${estimate.id}')" class="btn btn-danger btn-sm">
                                        <i class="fas fa-times"></i> Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>`
            }
        </div>
    `;
};

// Approved Estimates Section
window.showApprovedEstimates = function() {
    const estimates = JSON.parse(localStorage.getItem('approvedEstimates')) || [];
    const dynamicContent = document.getElementById('estimates-dynamic-content');
    
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-check-circle"></i> Approved Estimates</h3>
                <div>
                    <button onclick="exportApprovedEstimates()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export All
                    </button>
                    <button onclick="closeEstimatesDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div class="stat-card" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--primary);">
                    <div style="font-size: 2rem; font-weight: bold; color: var(--primary);">$${calculateTotalApproved().toLocaleString()}</div>
                    <div style="color: #666;">Total Approved</div>
                </div>
                <div class="stat-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--success);">
                    <div style="font-size: 2rem; font-weight: bold; color: var(--success);">${estimates.length}</div>
                    <div style="color: #666;">Approved Estimates</div>
                </div>
                <div class="stat-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--warning);">
                    <div style="font-size: 2rem; font-weight: bold; color: var(--warning);">$${calculateAverageEstimate().toLocaleString()}</div>
                    <div style="color: #666;">Average Estimate</div>
                </div>
            </div>
            
            ${estimates.length === 0 ? 
                '<div class="empty-state" style="text-align: center; padding: 3rem; color: #999;">' +
                    '<i class="fas fa-check-circle" style="font-size: 4rem; margin-bottom: 1rem;"></i>' +
                    '<p>No approved estimates found.</p>' +
                '</div>' :
                `<div class="estimates-grid" style="display: grid; gap: 1.5rem;">
                    ${estimates.map(estimate => `
                        <div class="estimate-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--success);">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div style="flex: 1;">
                                    <h4 style="color: var(--success); margin-bottom: 0.5rem;">${estimate.title}</h4>
                                    <p style="color: #666; margin-bottom: 0.5rem;">
                                        <strong>Department:</strong> ${estimate.department} • 
                                        <strong>Quarter:</strong> ${estimate.quarter} • 
                                        <strong>Approved:</strong> ${new Date(estimate.approvedAt).toLocaleDateString()}
                                    </p>
                                    <p style="color: #999; margin-bottom: 0.5rem;">${estimate.purpose.substring(0, 100)}...</p>
                                    <div style="display: flex; gap: 2rem;">
                                        <div>
                                            <strong>Total Amount:</strong>
                                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--success);">$${estimate.total.toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <strong>Approved By:</strong>
                                            <div style="color: #666;">${estimate.approvedBy || 'Head of Department'}</div>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                    <button onclick="viewEstimate('${estimate.id}')" class="btn btn-primary btn-sm">
                                        <i class="fas fa-eye"></i> View
                                    </button>
                                    <button onclick="downloadEstimate('${estimate.id}')" class="btn btn-success btn-sm">
                                        <i class="fas fa-download"></i> PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>`
            }
        </div>
    `;
};

// Estimate Templates Section
window.showEstimateTemplates = function() {
    const dynamicContent = document.getElementById('estimates-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-copy"></i> Estimate Templates</h3>
                <button onclick="closeEstimatesDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <div class="templates-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                <div class="template-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px dashed #dee2e6; cursor: pointer;" onclick="useTemplate('lab_equipment')">
                    <i class="fas fa-flask" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Lab Equipment</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Standard laboratory equipment and supplies template</p>
                    <div class="template-stats" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-list"></i> 15 items</span>
                        <span style="color: #999;"><i class="fas fa-clock"></i> 5 min setup</span>
                    </div>
                </div>
                
                <div class="template-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px dashed #dee2e6; cursor: pointer;" onclick="useTemplate('chemical_supplies')">
                    <i class="fas fa-vial" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--info); margin-bottom: 0.5rem;">Chemical Supplies</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Common chemicals and laboratory reagents</p>
                    <div class="template-stats" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-list"></i> 25 items</span>
                        <span style="color: #999;"><i class="fas fa-clock"></i> 3 min setup</span>
                    </div>
                </div>
                
                <div class="template-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px dashed #dee2e6; cursor: pointer;" onclick="useTemplate('teaching_aids')">
                    <i class="fas fa-chalkboard" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--success); margin-bottom: 0.5rem;">Teaching Aids</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Educational materials and teaching resources</p>
                    <div class="template-stats" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-list"></i> 12 items</span>
                        <span style="color: #999;"><i class="fas fa-clock"></i> 2 min setup</span>
                    </div>
                </div>
                
                <div class="template-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px dashed #dee2e6; cursor: pointer;" onclick="useTemplate('maintenance')">
                    <i class="fas fa-tools" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--warning); margin-bottom: 0.5rem;">Maintenance</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Equipment maintenance and repair costs</p>
                    <div class="template-stats" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-list"></i> 8 items</span>
                        <span style="color: #999;"><i class="fas fa-clock"></i> 4 min setup</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Budget Tracking Section
window.showBudgetTracking = function() {
    const dynamicContent = document.getElementById('estimates-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-chart-line"></i> Budget Tracking</h3>
                <div>
                    <button onclick="generateBudgetReport()" class="btn btn-success btn-sm">
                        <i class="fas fa-chart-bar"></i> Generate Report
                    </button>
                    <button onclick="closeEstimatesDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="budget-overview" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="budget-card" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">$250,000</div>
                        <div style="color: #666;">Total Budget</div>
                    </div>
                    <div class="budget-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--warning);">$175,000</div>
                        <div style="color: #666;">Allocated</div>
                    </div>
                    <div class="budget-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--success);">$75,000</div>
                        <div style="color: #666;">Available</div>
                    </div>
                    <div class="budget-card" style="background: #fff5f5; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--danger);">70%</div>
                        <div style="color: #666;">Utilized</div>
                    </div>
                </div>
            </div>
            
            <div class="department-breakdown" style="margin-bottom: 2rem;">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Department-wise Allocation</h4>
                <div class="breakdown-grid" style="display: grid; gap: 1rem;">
                    <div class="department-item">
                        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="font-weight: bold;">Physics Department</span>
                            <span style="color: var(--success);">$75,000 / $100,000</span>
                        </div>
                        <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; background: var(--success); width: 75%;"></div>
                        </div>
                    </div>
                    
                    <div class="department-item">
                        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="font-weight: bold;">Chemistry Department</span>
                            <span style="color: var(--warning);">$60,000 / $80,000</span>
                        </div>
                        <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; background: var(--warning); width: 75%;"></div>
                        </div>
                    </div>
                    
                    <div class="department-item">
                        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="font-weight: bold;">Biology Department</span>
                            <span style="color: var(--info);">$40,000 / $70,000</span>
                        </div>
                        <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; background: var(--info); width: 57%;"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="recent-activity">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Recent Budget Activity</h4>
                <div class="activity-list">
                    <div class="activity-item" style="display: flex; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="background: var(--success); color: white; padding: 0.5rem; border-radius: 50%; margin-right: 1rem;">
                            <i class="fas fa-check"></i>
                        </div>
                        <div style="flex: 1;">
                            <strong>Physics Lab Equipment</strong> approved
                            <p style="margin: 0.25rem 0 0 0; color: #666;">$25,000 • ${new Date().toLocaleDateString()}</p>
                        </div>
                        <span style="color: var(--success); font-weight: bold;">Approved</span>
                    </div>
                    
                    <div class="activity-item" style="display: flex; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="background: var(--warning); color: white; padding: 0.5rem; border-radius: 50%; margin-right: 1rem;">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div style="flex: 1;">
                            <strong>Chemical Supplies Q2</strong> pending review
                            <p style="margin: 0.25rem 0 0 0; color: #666;">$18,500 • ${new Date().toLocaleDateString()}</p>
                        </div>
                        <span style="color: var(--warning); font-weight: bold;">Pending</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Upload Estimate Section
window.showUploadEstimate = function() {
    const dynamicContent = document.getElementById('estimates-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-cloud-upload-alt"></i> Upload Estimate File</h3>
                <button onclick="closeEstimatesDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form onsubmit="uploadEstimateFile(event)">
                <div class="upload-area" style="border: 2px dashed var(--primary); border-radius: 8px; padding: 3rem; text-align: center; margin-bottom: 1.5rem; background: #f8fdff; cursor: pointer;">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <p>Click to browse or drag and drop estimate file here</p>
                    <p style="font-size: 0.9rem; color: #666;">Supported formats: PDF, Excel (.xlsx, .xls), CSV</p>
                    <input type="file" id="estimateFileUpload" accept=".pdf,.xlsx,.xls,.csv" style="display: none;">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Estimate Type *</label>
                        <select class="form-select" id="uploadEstimateType" required>
                            <option value="">-- Select Type --</option>
                            <option value="lab_equipment">Lab Equipment</option>
                            <option value="chemical_supplies">Chemical Supplies</option>
                            <option value="teaching_aids">Teaching Aids</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Quarter *</label>
                        <select class="form-select" id="uploadQuarter" required>
                            <option value="q1">Q1 (Jan-Mar)</option>
                            <option value="q2">Q2 (Apr-Jun)</option>
                            <option value="q3">Q3 (Jul-Sep)</option>
                            <option value="q4">Q4 (Oct-Dec)</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" id="uploadDescription" rows="3" 
                              placeholder="Brief description of the estimate..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Total Amount ($)</label>
                    <input type="number" class="form-input" id="uploadAmount" step="0.01" min="0" 
                           placeholder="0.00">
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" onclick="closeEstimatesDynamicContent()" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-upload"></i> Upload Estimate
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Add file input handler
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('estimateFileUpload');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            uploadArea.querySelector('p').textContent = `Selected: ${this.files[0].name}`;
        }
    });
};

// Helper functions for Estimates section
window.closeEstimatesDynamicContent = function() {
    const dynamicContent = document.getElementById('estimates-dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = '';
    }
};

window.addEstimateItem = function() {
    const container = document.getElementById('estimateItems');
    const newItem = document.createElement('div');
    newItem.className = 'table-row';
    newItem.style.cssText = 'display: grid; grid-template-columns: 3fr 1fr 1fr 1fr 80px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;';
    newItem.innerHTML = `
        <input type="text" class="form-input" placeholder="Item description" onchange="calculateItemTotal(this)">
        <input type="number" class="form-input" value="1" min="1" onchange="calculateItemTotal(this)">
        <input type="number" class="form-input" placeholder="0.00" step="0.01" min="0" onchange="calculateItemTotal(this)">
        <div class="item-total" style="font-weight: bold; color: var(--success);">0.00</div>
        <button type="button" onclick="removeEstimateItem(this)" class="btn btn-danger btn-sm">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(newItem);
};

window.removeEstimateItem = function(button) {
    const container = document.getElementById('estimateItems');
    if (container.children.length > 1) {
        button.closest('.table-row').remove();
        calculateEstimateTotals();
    } else {
        alert('You must have at least one estimate item.');
    }
};

window.calculateItemTotal = function(input) {
    const row = input.closest('.table-row');
    const quantity = row.children[1].querySelector('input').value || 0;
    const unitPrice = row.children[2].querySelector('input').value || 0;
    const total = (quantity * unitPrice).toFixed(2);
    row.children[3].textContent = total;
    calculateEstimateTotals();
};

window.calculateEstimateTotals = function() {
    let subtotal = 0;
    document.querySelectorAll('.item-total').forEach(element => {
        subtotal += parseFloat(element.textContent) || 0;
    });
    
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + tax;
    
    document.getElementById('estimateSubtotal').textContent = '$' + subtotal.toLocaleString();
    document.getElementById('estimateTax').textContent = '$' + tax.toLocaleString();
    document.getElementById('estimateTotal').textContent = '$' + total.toLocaleString();
};

window.saveEstimate = function(event) {
    event.preventDefault();
    
    const title = document.getElementById('estimateTitle').value;
    const department = document.getElementById('estimateDepartment').value;
    const academicYear = document.getElementById('academicYear').value;
    const quarter = document.getElementById('estimateQuarter').value;
    const purpose = document.getElementById('estimatePurpose').value;
    const notes = document.getElementById('estimateNotes').value;
    const total = parseFloat(document.getElementById('estimateTotal').textContent.replace('$', '').replace(/,/g, '')) || 0;
    
    // Collect items
    const items = [];
    document.querySelectorAll('#estimateItems .table-row').forEach(row => {
        const description = row.children[0].querySelector('input').value;
        const quantity = row.children[1].querySelector('input').value;
        const unitPrice = row.children[2].querySelector('input').value;
        const itemTotal = row.children[3].textContent;
        
        if (description && quantity && unitPrice) {
            items.push({
                description,
                quantity: parseInt(quantity),
                unitPrice: parseFloat(unitPrice),
                total: parseFloat(itemTotal)
            });
        }
    });
    
    const estimate = {
        id: Date.now().toString(),
        title,
        department,
        academicYear,
        quarter,
        purpose,
        notes,
        items,
        subtotal: total / 1.18, // Remove tax
        tax: total * 0.18,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        createdBy: 'Current User' // In real app, get from auth
    };
    
    // Save to localStorage
    let estimates = JSON.parse(localStorage.getItem('pendingEstimates')) || [];
    estimates.push(estimate);
    localStorage.setItem('pendingEstimates', JSON.stringify(estimates));
    
    alert('✅ Estimate saved successfully and sent for approval!');
    closeEstimatesDynamicContent();
    showPendingEstimates();
};

window.viewEstimate = function(estimateId) {
    // Look in both pending and approved estimates
    let estimates = JSON.parse(localStorage.getItem('pendingEstimates')) || [];
    let estimate = estimates.find(e => e.id === estimateId);
    
    if (!estimate) {
        estimates = JSON.parse(localStorage.getItem('approvedEstimates')) || [];
        estimate = estimates.find(e => e.id === estimateId);
    }
    
    if (!estimate) return;
    
    const dynamicContent = document.getElementById('estimates-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-file-invoice"></i> ${estimate.title}</h3>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="downloadEstimate('${estimate.id}')" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> PDF
                    </button>
                    <button onclick="showPendingEstimates()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                </div>
            </div>
            
            <div class="estimate-details" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    <div>
                        <strong>Department:</strong> ${estimate.department}
                    </div>
                    <div>
                        <strong>Academic Year:</strong> ${estimate.academicYear}
                    </div>
                    <div>
                        <strong>Quarter:</strong> ${estimate.quarter}
                    </div>
                    <div>
                        <strong>Status:</strong> 
                        <span style="color: ${estimate.status === 'approved' ? 'var(--success)' : 'var(--warning)'}; font-weight: bold;">
                            ${estimate.status === 'approved' ? 'Approved' : 'Pending Review'}
                        </span>
                    </div>
                </div>
                
                <div style="margin-top: 1.5rem;">
                    <strong>Purpose:</strong>
                    <p style="margin-top: 0.5rem; white-space: pre-line;">${estimate.purpose}</p>
                </div>
            </div>
            
            <div class="estimate-items">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Estimate Items</h4>
                <div class="items-table">
                    <div class="table-header" style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px 8px 0 0; font-weight: bold;">
                        <div>Item Description</div>
                        <div>Quantity</div>
                        <div>Unit Price ($)</div>
                        <div>Total ($)</div>
                    </div>
                    
                    ${estimate.items.map(item => `
                        <div class="table-row" style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee;">
                            <div>${item.description}</div>
                            <div>${item.quantity}</div>
                            <div>$${item.unitPrice.toLocaleString()}</div>
                            <div style="font-weight: bold; color: var(--success);">$${item.total.toLocaleString()}</div>
                        </div>
                    `).join('')}
                    
                    <div class="table-footer" style="padding: 1rem; background: #f8f9fa; border-radius: 0 0 8px 8px;">
                        <div style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 1rem; font-weight: bold;">
                            <div></div>
                            <div></div>
                            <div>Subtotal:</div>
                            <div>$${estimate.subtotal.toLocaleString()}</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 1rem;">
                            <div></div>
                            <div></div>
                            <div>Tax (18%):</div>
                            <div>$${estimate.tax.toLocaleString()}</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 1rem; font-size: 1.1rem;">
                            <div></div>
                            <div></div>
                            <div>Total:</div>
                            <div style="color: var(--success); font-weight: bold;">$${estimate.total.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            ${estimate.notes ? `
                <div style="margin-top: 1.5rem;">
                    <strong>Additional Notes:</strong>
                    <p style="margin-top: 0.5rem; white-space: pre-line;">${estimate.notes}</p>
                </div>
            ` : ''}
        </div>
    `;
};

// Additional helper functions
window.approveEstimate = function(estimateId) {
    if (!confirm('Are you sure you want to approve this estimate?')) return;
    
    let pendingEstimates = JSON.parse(localStorage.getItem('pendingEstimates')) || [];
    const estimateIndex = pendingEstimates.findIndex(e => e.id === estimateId);
    
    if (estimateIndex !== -1) {
        const estimate = pendingEstimates[estimateIndex];
        estimate.status = 'approved';
        estimate.approvedAt = new Date().toISOString();
        estimate.approvedBy = 'Head of Department';
        
        // Move to approved estimates
        let approvedEstimates = JSON.parse(localStorage.getItem('approvedEstimates')) || [];
        approvedEstimates.push(estimate);
        localStorage.setItem('approvedEstimates', JSON.stringify(approvedEstimates));
        
        // Remove from pending
        pendingEstimates.splice(estimateIndex, 1);
        localStorage.setItem('pendingEstimates', JSON.stringify(pendingEstimates));
        
        alert('✅ Estimate approved successfully!');
        showPendingEstimates();
    }
};

window.rejectEstimate = function(estimateId) {
    if (!confirm('Are you sure you want to reject this estimate?')) return;
    
    let pendingEstimates = JSON.parse(localStorage.getItem('pendingEstimates')) || [];
    pendingEstimates = pendingEstimates.filter(e => e.id !== estimateId);
    localStorage.setItem('pendingEstimates', JSON.stringify(pendingEstimates));
    
    alert('❌ Estimate rejected.');
    showPendingEstimates();
};

window.useTemplate = function(templateId) {
    alert(`Using template: ${templateId}\n\nIn a real implementation, this would pre-fill the estimate form with template items.`);
    showCreateEstimate();
};

window.downloadEstimate = function(estimateId) {
    alert(`Downloading estimate ${estimateId} as PDF...`);
};

window.exportPendingEstimates = function() {
    alert('Exporting pending estimates...');
};

window.exportApprovedEstimates = function() {
    alert('Exporting approved estimates...');
};

window.generateBudgetReport = function() {
    alert('Generating budget report...');
};

window.uploadEstimateFile = function(event) {
    event.preventDefault();
    alert('✅ Estimate file uploaded successfully!');
    closeEstimatesDynamicContent();
};

window.calculateTotalApproved = function() {
    const estimates = JSON.parse(localStorage.getItem('approvedEstimates')) || [];
    return estimates.reduce((total, estimate) => total + estimate.total, 0);
};

window.calculateAverageEstimate = function() {
    const estimates = JSON.parse(localStorage.getItem('approvedEstimates')) || [];
    return estimates.length > 0 ? calculateTotalApproved() / estimates.length : 0;
};
