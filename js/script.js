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

// ===== DOCUMENTS SECTION =====
function loadDocumentsSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-documents">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-folder"></i> Department Documents</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Access and manage department documents, forms, and legal resources.</p>
                
                <div class="document-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                    <div class="action-card" onclick="showNationalLaw()">
                        <i class="fas fa-gavel" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h4>National Law</h4>
                        <p>Access national education laws and regulations</p>
                    </div>
                    
                    <div class="action-card" onclick="showEventsTours()">
                        <i class="fas fa-calendar-alt" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                        <h4>Events & Tours</h4>
                        <p>Event planning and tour documentation</p>
                    </div>
                    
                    <div class="action-card" onclick="showFormList()">
                        <i class="fas fa-list-alt" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h4>Form List</h4>
                        <p>Access all department forms and templates</p>
                    </div>
                    
                    <div class="action-card" onclick="showCalendarEvents()">
                        <i class="fas fa-calendar-check" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                        <h4>Calendar of Events</h4>
                        <p>View and manage event calendar</p>
                    </div>
                    
                    <div class="action-card" onclick="showCorrespondence()">
                        <i class="fas fa-envelope" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                        <h4>Correspondence</h4>
                        <p>Official letters and communications</p>
                    </div>
                    
                    <div class="action-card" onclick="showUploadDocument('general')">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--secondary); margin-bottom: 1rem;"></i>
                        <h4>Upload Document</h4>
                        <p>Upload new documents to the repository</p>
                    </div>
                </div>
                
                <div id="documents-dynamic-content"></div>
            </div>
        </div>
    `;
}

// National Law Section
window.showNationalLaw = function() {
    const dynamicContent = document.getElementById('documents-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-gavel"></i> National Education Laws & Regulations</h3>
                <button onclick="closeDocumentsDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <div class="search-section" style="margin-bottom: 2rem;">
                <div class="form-group">
                    <input type="text" class="form-input" placeholder="Search laws and regulations..." 
                           onkeyup="searchNationalLaws(this.value)" style="width: 100%;">
                </div>
            </div>
            
            <div class="laws-grid" style="display: grid; gap: 1.5rem;">
                <div class="law-category">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-balance-scale"></i> Education Act & Framework
                    </h4>
                    <div class="law-list">
                        <div class="law-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <div>
                                <h5 style="margin: 0; color: #333;">Education Act 2020</h5>
                                <p style="margin: 0.25rem 0 0 0; color: #666; font-size: 0.9rem;">Comprehensive education legislation</p>
                            </div>
                            <button onclick="viewLawDocument('education_act_2020')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                        </div>
                        
                        <div class="law-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <div>
                                <h5 style="margin: 0; color: #333;">National Curriculum Framework</h5>
                                <p style="margin: 0.25rem 0 0 0; color: #666; font-size: 0.9rem;">Curriculum standards and guidelines</p>
                            </div>
                            <button onclick="viewLawDocument('curriculum_framework')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="law-category">
                    <h4 style="color: var(--success); margin-bottom: 1rem; border-bottom: 2px solid var(--success-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-user-graduate"></i> Teacher Regulations
                    </h4>
                    <div class="law-list">
                        <div class="law-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <div>
                                <h5 style="margin: 0; color: #333;">Teacher Certification Standards</h5>
                                <p style="margin: 0.25rem 0 0 0; color: #666; font-size: 0.9rem;">Professional standards and requirements</p>
                            </div>
                            <button onclick="viewLawDocument('teacher_certification')" class="btn btn-success btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                        </div>
                        
                        <div class="law-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <div>
                                <h5 style="margin: 0; color: #333;">Code of Professional Conduct</h5>
                                <p style="margin: 0.25rem 0 0 0; color: #666; font-size: 0.9rem;">Ethical guidelines for educators</p>
                            </div>
                            <button onclick="viewLawDocument('professional_conduct')" class="btn btn-success btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="law-category">
                    <h4 style="color: var(--warning); margin-bottom: 1rem; border-bottom: 2px solid var(--warning-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-shield-alt"></i> Safety & Compliance
                    </h4>
                    <div class="law-list">
                        <div class="law-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <div>
                                <h5 style="margin: 0; color: #333;">School Safety Regulations</h5>
                                <p style="margin: 0.25rem 0 0 0; color: #666; font-size: 0.9rem;">Health and safety requirements</p>
                            </div>
                            <button onclick="viewLawDocument('safety_regulations')" class="btn btn-warning btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                        </div>
                        
                        <div class="law-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <div>
                                <h5 style="margin: 0; color: #333;">Student Protection Policy</h5>
                                <p style="margin: 0.25rem 0 0 0; color: #666; font-size: 0.9rem;">Child protection guidelines</p>
                            </div>
                            <button onclick="viewLawDocument('student_protection')" class="btn btn-warning btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Events & Tours Section
window.showEventsTours = function() {
    const dynamicContent = document.getElementById('documents-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-calendar-alt"></i> Events & Tours Management</h3>
                <div>
                    <button onclick="createNewEvent()" class="btn btn-primary btn-sm">
                        <i class="fas fa-plus"></i> New Event
                    </button>
                    <button onclick="closeDocumentsDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="events-tabs" style="margin-bottom: 2rem;">
                <div class="tabs" style="display: flex; border-bottom: 2px solid #eee;">
                    <button class="tab-btn active" onclick="switchEventsTab('upcoming')" style="padding: 0.75rem 1.5rem; border: none; background: none; border-bottom: 3px solid var(--primary);">
                        Upcoming Events
                    </button>
                    <button class="tab-btn" onclick="switchEventsTab('past')" style="padding: 0.75rem 1.5rem; border: none; background: none;">
                        Past Events
                    </button>
                    <button class="tab-btn" onclick="switchEventsTab('tours')" style="padding: 0.75rem 1.5rem; border: none; background: none;">
                        Educational Tours
                    </button>
                </div>
            </div>
            
            <div id="events-tab-content">
                <div class="events-list">
                    <div class="event-card" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--info);">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div style="flex: 1;">
                                <h4 style="color: var(--info); margin-bottom: 0.5rem;">Science Fair 2025</h4>
                                <p style="color: #666; margin-bottom: 0.5rem;">
                                    <i class="fas fa-calendar"></i> March 15, 2025 | 
                                    <i class="fas fa-clock" style="margin-left: 0.5rem;"></i> 9:00 AM - 3:00 PM
                                </p>
                                <p style="color: #666; margin-bottom: 0.5rem;">
                                    <i class="fas fa-map-marker-alt"></i> Main Auditorium
                                </p>
                                <p style="color: #999;">Annual science exhibition showcasing student projects</p>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button onclick="viewEventDetails('science_fair')" class="btn btn-info btn-sm">
                                    <i class="fas fa-eye"></i> Details
                                </button>
                                <button onclick="downloadEventPlan('science_fair')" class="btn btn-success btn-sm">
                                    <i class="fas fa-download"></i> Plan
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="event-card" style="background: #fff0f0; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--danger);">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div style="flex: 1;">
                                <h4 style="color: var(--danger); margin-bottom: 0.5rem;">Parent-Teacher Conference</h4>
                                <p style="color: #666; margin-bottom: 0.5rem;">
                                    <i class="fas fa-calendar"></i> April 5, 2025 | 
                                    <i class="fas fa-clock" style="margin-left: 0.5rem;"></i> 1:00 PM - 6:00 PM
                                </p>
                                <p style="color: #666; margin-bottom: 0.5rem;">
                                    <i class="fas fa-map-marker-alt"></i> Classrooms
                                </p>
                                <p style="color: #999;">Spring semester parent-teacher meetings</p>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button onclick="viewEventDetails('parent_conference')" class="btn btn-info btn-sm">
                                    <i class="fas fa-eye"></i> Details
                                </button>
                                <button onclick="downloadEventPlan('parent_conference')" class="btn btn-success btn-sm">
                                    <i class="fas fa-download"></i> Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Form List Section
window.showFormList = function() {
    const dynamicContent = document.getElementById('documents-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-list-alt"></i> Department Forms & Templates</h3>
                <button onclick="closeDocumentsDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <div class="search-section" style="margin-bottom: 2rem;">
                <div class="form-group">
                    <input type="text" class="form-input" placeholder="Search forms..." 
                           onkeyup="searchForms(this.value)" style="width: 100%;">
                </div>
            </div>
            
            <div class="forms-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                <div class="form-category">
                    <h4 style="color: var(--primary); margin-bottom: 1rem;">
                        <i class="fas fa-user-tie"></i> Staff Forms
                    </h4>
                    <div class="form-list">
                        <div class="form-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <span>Leave Application Form</span>
                            <button onclick="downloadForm('leave_application')" class="btn btn-primary btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="form-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <span>Professional Development Request</span>
                            <button onclick="downloadForm('pd_request')" class="btn btn-primary btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="form-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <span>Expense Reimbursement Form</span>
                            <button onclick="downloadForm('expense_form')" class="btn btn-primary btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="form-category">
                    <h4 style="color: var(--success); margin-bottom: 1rem;">
                        <i class="fas fa-user-graduate"></i> Student Forms
                    </h4>
                    <div class="form-list">
                        <div class="form-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <span>Field Trip Permission Slip</span>
                            <button onclick="downloadForm('field_trip_form')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="form-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <span>Academic Appeal Form</span>
                            <button onclick="downloadForm('academic_appeal')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="form-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <span>Student Information Update</span>
                            <button onclick="downloadForm('student_info_update')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="form-category">
                    <h4 style="color: var(--warning); margin-bottom: 1rem;">
                        <i class="fas fa-clipboard-list"></i> Administrative Forms
                    </h4>
                    <div class="form-list">
                        <div class="form-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <span>Purchase Requisition Form</span>
                            <button onclick="downloadForm('purchase_requisition')" class="btn btn-warning btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="form-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <span>Room Reservation Request</span>
                            <button onclick="downloadForm('room_reservation')" class="btn btn-warning btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="form-item" style="display: flex; justify-content: between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                            <span>Incident Report Form</span>
                            <button onclick="downloadForm('incident_report')" class="btn btn-warning btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Calendar of Events Section
window.showCalendarEvents = function() {
    const dynamicContent = document.getElementById('documents-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-calendar-check"></i> Calendar of Events</h3>
                <div>
                    <button onclick="exportCalendar()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button onclick="closeDocumentsDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="calendar-controls" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <div>
                    <button onclick="previousMonth()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <span style="margin: 0 1rem; font-weight: bold; font-size: 1.1rem;">March 2025</span>
                    <button onclick="nextMonth()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <button onclick="addCalendarEvent()" class="btn btn-primary btn-sm">
                    <i class="fas fa-plus"></i> Add Event
                </button>
            </div>
            
            <div class="calendar-view" style="background: #f8f9fa; border-radius: 8px; padding: 1rem;">
                <div class="calendar-header" style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-weight: bold; margin-bottom: 1rem;">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                
                <div class="calendar-days" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem;">
                    ${generateCalendarDays()}
                </div>
            </div>
            
            <div class="upcoming-events" style="margin-top: 2rem;">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Upcoming Events</h4>
                <div class="events-list">
                    <div class="event-item" style="display: flex; align-items: center; padding: 1rem; background: #f0f9ff; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="background: var(--info); color: white; padding: 0.5rem; border-radius: 6px; text-align: center; min-width: 60px; margin-right: 1rem;">
                            <div style="font-size: 0.8rem;">MAR</div>
                            <div style="font-size: 1.2rem; font-weight: bold;">15</div>
                        </div>
                        <div style="flex: 1;">
                            <strong>Science Fair 2025</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Main Auditorium • 9:00 AM - 3:00 PM</p>
                        </div>
                    </div>
                    
                    <div class="event-item" style="display: flex; align-items: center; padding: 1rem; background: #fff0f0; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="background: var(--danger); color: white; padding: 0.5rem; border-radius: 6px; text-align: center; min-width: 60px; margin-right: 1rem;">
                            <div style="font-size: 0.8rem;">APR</div>
                            <div style="font-size: 1.2rem; font-weight: bold;">5</div>
                        </div>
                        <div style="flex: 1;">
                            <strong>Parent-Teacher Conference</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Classrooms • 1:00 PM - 6:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Correspondence Section
window.showCorrespondence = function() {
    const dynamicContent = document.getElementById('documents-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-envelope"></i> Official Correspondence</h3>
                <div>
                    <button onclick="composeNewLetter()" class="btn btn-primary btn-sm">
                        <i class="fas fa-plus"></i> New Letter
                    </button>
                    <button onclick="closeDocumentsDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="correspondence-tabs" style="margin-bottom: 2rem;">
                <div class="tabs" style="display: flex; border-bottom: 2px solid #eee;">
                    <button class="tab-btn active" onclick="switchCorrespondenceTab('incoming')" style="padding: 0.75rem 1.5rem; border: none; background: none; border-bottom: 3px solid var(--primary);">
                        Incoming
                    </button>
                    <button class="tab-btn" onclick="switchCorrespondenceTab('outgoing')" style="padding: 0.75rem 1.5rem; border: none; background: none;">
                        Outgoing
                    </button>
                    <button class="tab-btn" onclick="switchCorrespondenceTab('templates')" style="padding: 0.75rem 1.5rem; border: none; background: none;">
                        Templates
                    </button>
                </div>
            </div>
            
            <div id="correspondence-tab-content">
                <div class="letters-list">
                    <div class="letter-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 1rem;">
                        <div style="flex: 1;">
                            <h4 style="margin: 0 0 0.5rem 0; color: #333;">Ministry of Education - Curriculum Update</h4>
                            <p style="margin: 0.25rem 0; color: #666;">
                                <strong>From:</strong> Ministry of Education • 
                                <strong>Date:</strong> March 1, 2025 • 
                                <strong>Ref:</strong> MOE/2025/CUR/012
                            </p>
                            <p style="margin: 0.25rem 0 0 0; color: #999;">
                                Updates to national science curriculum standards for 2025-2026 academic year
                            </p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="viewLetter('moe_curriculum_update')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="downloadLetter('moe_curriculum_update')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="letter-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 1rem;">
                        <div style="flex: 1;">
                            <h4 style="margin: 0 0 0.5rem 0; color: #333;">University Partnership Inquiry</h4>
                            <p style="margin: 0.25rem 0; color: #666;">
                                <strong>From:</strong> State University • 
                                <strong>Date:</strong> February 28, 2025 • 
                                <strong>Ref:</strong> SU/ADM/2025/045
                            </p>
                            <p style="margin: 0.25rem 0 0 0; color: #999;">
                                Proposal for collaborative research program and student mentorship
                            </p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="viewLetter('university_partnership')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="downloadLetter('university_partnership')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Helper functions for Documents section
window.closeDocumentsDynamicContent = function() {
    const dynamicContent = document.getElementById('documents-dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = '';
    }
};

window.searchNationalLaws = function(query) {
    // Implementation for searching laws
    console.log('Searching laws:', query);
};

window.viewLawDocument = function(lawId) {
    alert(`Viewing law document: ${lawId}\n\nIn a real implementation, this would open the document viewer.`);
};

window.switchEventsTab = function(tab) {
    // Implementation for switching event tabs
    console.log('Switching to tab:', tab);
};

window.viewEventDetails = function(eventId) {
    alert(`Viewing event details: ${eventId}`);
};

window.downloadEventPlan = function(eventId) {
    alert(`Downloading event plan: ${eventId}`);
};

window.searchForms = function(query) {
    // Implementation for searching forms
    console.log('Searching forms:', query);
};

window.downloadForm = function(formId) {
    alert(`Downloading form: ${formId}\n\nIn a real implementation, this would download the form template.`);
};

window.generateCalendarDays = function() {
    // Simplified calendar generation - in real implementation, this would generate actual calendar
    let days = '';
    for (let i = 1; i <= 31; i++) {
        const hasEvent = i === 15 || i === 5; // Example events on 5th and 15th
        days += `
            <div class="calendar-day ${hasEvent ? 'has-event' : ''}" 
                 style="background: white; padding: 0.75rem; border-radius: 6px; text-align: center; min-height: 80px; position: relative;">
                <div style="font-weight: bold; margin-bottom: 0.25rem;">${i}</div>
                ${hasEvent ? `
                    <div style="background: var(--info); color: white; padding: 0.1rem 0.3rem; border-radius: 4px; font-size: 0.7rem; margin-top: 0.25rem;">
                        Event
                    </div>
                ` : ''}
            </div>
        `;
    }
    return days;
};

window.switchCorrespondenceTab = function(tab) {
    // Implementation for switching correspondence tabs
    console.log('Switching to correspondence tab:', tab);
};

window.viewLetter = function(letterId) {
    alert(`Viewing letter: ${letterId}`);
};

window.downloadLetter = function(letterId) {
    alert(`Downloading letter: ${letterId}`);
};

window.createNewEvent = function() {
    alert('Opening new event creation form...');
};

window.composeNewLetter = function() {
    alert('Opening letter composition form...');
};

window.exportCalendar = function() {
    alert('Exporting calendar data...');
};

window.previousMonth = function() {
    alert('Navigating to previous month...');
};

window.nextMonth = function() {
    alert('Navigating to next month...');
};

window.addCalendarEvent = function() {
    alert('Adding new calendar event...');
};

// ===== TIMETABLES SECTION =====
function loadTimetablesSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-timetables">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-clock"></i> Department Timetables</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Manage and view class schedules, teacher timetables, and room allocations.</p>
                
                <div class="timetable-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                    <div class="action-card" onclick="showClassTimetables()">
                        <i class="fas fa-chalkboard-teacher" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h4>Class Timetables</h4>
                        <p>View and manage class schedules</p>
                    </div>
                    
                    <div class="action-card" onclick="showTeacherTimetables()">
                        <i class="fas fa-user-tie" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                        <h4>Teacher Schedules</h4>
                        <p>Individual teacher timetables</p>
                    </div>
                    
                    <div class="action-card" onclick="showRoomAllocations()">
                        <i class="fas fa-door-open" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h4>Room Allocations</h4>
                        <p>Classroom and lab schedules</p>
                    </div>
                    
                    <div class="action-card" onclick="showGenerateTimetable()">
                        <i class="fas fa-plus-circle" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                        <h4>Generate Timetable</h4>
                        <p>Create new timetables</p>
                    </div>
                    
                    <div class="action-card" onclick="showTimetableRequests()">
                        <i class="fas fa-exchange-alt" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                        <h4>Change Requests</h4>
                        <p>Manage timetable modifications</p>
                    </div>
                    
                    <div class="action-card" onclick="showUploadTimetable()">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--secondary); margin-bottom: 1rem;"></i>
                        <h4>Upload Timetable</h4>
                        <p>Upload existing timetable files</p>
                    </div>
                </div>
                
                <div id="timetables-dynamic-content"></div>
            </div>
        </div>
    `;
}

// Class Timetables Section
window.showClassTimetables = function() {
    const dynamicContent = document.getElementById('timetables-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-chalkboard-teacher"></i> Class Timetables</h3>
                <div>
                    <button onclick="printTimetable()" class="btn btn-success btn-sm">
                        <i class="fas fa-print"></i> Print
                    </button>
                    <button onclick="closeTimetablesDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="class-selector" style="margin-bottom: 2rem;">
                <div class="form-group">
                    <label class="form-label">Select Class</label>
                    <select class="form-select" onchange="loadClassTimetable(this.value)" style="width: 300px;">
                        <option value="">-- Select a Class --</option>
                        <option value="grade10_science">Grade 10 Science</option>
                        <option value="grade11_math">Grade 11 Mathematics</option>
                        <option value="grade12_physics">Grade 12 Physics</option>
                        <option value="grade10_chemistry">Grade 10 Chemistry</option>
                        <option value="grade11_biology">Grade 11 Biology</option>
                        <option value="grade12_chemistry">Grade 12 Chemistry</option>
                    </select>
                </div>
            </div>
            
            <div id="class-timetable-display">
                <div class="timetable-placeholder" style="text-align: center; padding: 3rem; color: #999; background: #f8f9fa; border-radius: 8px;">
                    <i class="fas fa-table" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                    <p>Select a class to view its timetable</p>
                </div>
            </div>
        </div>
    `;
};

// Teacher Timetables Section
window.showTeacherTimetables = function() {
    const dynamicContent = document.getElementById('timetables-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-user-tie"></i> Teacher Schedules</h3>
                <div>
                    <button onclick="exportAllTeacherSchedules()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export All
                    </button>
                    <button onclick="closeTimetablesDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="teacher-search" style="margin-bottom: 2rem;">
                <div class="form-group">
                    <input type="text" class="form-input" placeholder="Search teachers..." 
                           onkeyup="searchTeachers(this.value)" style="width: 100%;">
                </div>
            </div>
            
            <div class="teachers-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                <div class="teacher-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--primary);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Dr. Sarah Johnson</h4>
                            <p style="color: #666; margin-bottom: 0.5rem;">Physics Department</p>
                            <p style="color: #999; font-size: 0.9rem;">
                                <i class="fas fa-clock"></i> 18 periods/week
                            </p>
                        </div>
                        <button onclick="viewTeacherTimetable('sarah_johnson')" class="btn btn-primary btn-sm">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </div>
                
                <div class="teacher-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--info);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--info); margin-bottom: 0.5rem;">Prof. Michael Chen</h4>
                            <p style="color: #666; margin-bottom: 0.5rem;">Chemistry Department</p>
                            <p style="color: #999; font-size: 0.9rem;">
                                <i class="fas fa-clock"></i> 20 periods/week
                            </p>
                        </div>
                        <button onclick="viewTeacherTimetable('michael_chen')" class="btn btn-info btn-sm">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </div>
                
                <div class="teacher-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--success);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--success); margin-bottom: 0.5rem;">Dr. Emily Davis</h4>
                            <p style="color: #666; margin-bottom: 0.5rem;">Biology Department</p>
                            <p style="color: #999; font-size: 0.9rem;">
                                <i class="fas fa-clock"></i> 16 periods/week
                            </p>
                        </div>
                        <button onclick="viewTeacherTimetable('emily_davis')" class="btn btn-success btn-sm">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </div>
                
                <div class="teacher-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--warning);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--warning); margin-bottom: 0.5rem;">Mr. Robert Brown</h4>
                            <p style="color: #666; margin-bottom: 0.5rem;">Mathematics Department</p>
                            <p style="color: #999; font-size: 0.9rem;">
                                <i class="fas fa-clock"></i> 22 periods/week
                            </p>
                        </div>
                        <button onclick="viewTeacherTimetable('robert_brown')" class="btn btn-warning btn-sm">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Room Allocations Section
window.showRoomAllocations = function() {
    const dynamicContent = document.getElementById('timetables-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-door-open"></i> Room Allocations</h3>
                <div>
                    <button onclick="showRoomBooking()" class="btn btn-primary btn-sm">
                        <i class="fas fa-book"></i> Book Room
                    </button>
                    <button onclick="closeTimetablesDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="room-selector" style="margin-bottom: 2rem;">
                <div class="form-group">
                    <label class="form-label">Select Room</label>
                    <select class="form-select" onchange="loadRoomSchedule(this.value)" style="width: 300px;">
                        <option value="">-- Select a Room --</option>
                        <option value="science_lab_1">Science Lab 1</option>
                        <option value="science_lab_2">Science Lab 2</option>
                        <option value="chemistry_lab">Chemistry Lab</option>
                        <option value="physics_lab">Physics Lab</option>
                        <option value="lecture_hall_a">Lecture Hall A</option>
                        <option value="lecture_hall_b">Lecture Hall B</option>
                    </select>
                </div>
            </div>
            
            <div id="room-schedule-display">
                <div class="weekly-schedule">
                    <div class="schedule-header" style="display: grid; grid-template-columns: 100px repeat(5, 1fr); gap: 1px; background: #dee2e6; margin-bottom: 1rem;">
                        <div style="background: white; padding: 1rem; font-weight: bold;">Time</div>
                        <div style="background: white; padding: 1rem; font-weight: bold; text-align: center;">Monday</div>
                        <div style="background: white; padding: 1rem; font-weight: bold; text-align: center;">Tuesday</div>
                        <div style="background: white; padding: 1rem; font-weight: bold; text-align: center;">Wednesday</div>
                        <div style="background: white; padding: 1rem; font-weight: bold; text-align: center;">Thursday</div>
                        <div style="background: white; padding: 1rem; font-weight: bold; text-align: center;">Friday</div>
                    </div>
                    
                    ${generateRoomSchedule()}
                </div>
            </div>
            
            <div class="room-availability" style="margin-top: 2rem;">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Room Availability Summary</h4>
                <div class="availability-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="availability-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; color: var(--success); margin-bottom: 0.5rem;">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <strong>Science Lab 1</strong>
                        <p style="margin: 0.5rem 0 0 0; color: #666;">4 slots available</p>
                    </div>
                    
                    <div class="availability-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; color: var(--warning); margin-bottom: 0.5rem;">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <strong>Chemistry Lab</strong>
                        <p style="margin: 0.5rem 0 0 0; color: #666;">1 slot available</p>
                    </div>
                    
                    <div class="availability-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; color: var(--danger); margin-bottom: 0.5rem;">
                            <i class="fas fa-times-circle"></i>
                        </div>
                        <strong>Physics Lab</strong>
                        <p style="margin: 0.5rem 0 0 0; color: #666;">Fully booked</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Generate Timetable Section
window.showGenerateTimetable = function() {
    const dynamicContent = document.getElementById('timetables-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-plus-circle"></i> Generate New Timetable</h3>
                <button onclick="closeTimetablesDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form id="timetableGeneratorForm" onsubmit="generateTimetable(event)">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                    <div class="form-group">
                        <label class="form-label">Academic Year *</label>
                        <select class="form-select" id="academicYear" required>
                            <option value="">-- Select Year --</option>
                            <option value="2024-2025">2024-2025</option>
                            <option value="2025-2026" selected>2025-2026</option>
                            <option value="2026-2027">2026-2027</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Semester *</label>
                        <select class="form-select" id="semester" required>
                            <option value="">-- Select Semester --</option>
                            <option value="semester1">Semester 1</option>
                            <option value="semester2" selected>Semester 2</option>
                            <option value="full_year">Full Year</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Classes to Include</label>
                    <div class="classes-checklist" style="background: #f8f9fa; padding: 1rem; border-radius: 8px; max-height: 200px; overflow-y: auto;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.5rem;">
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" name="classes" value="grade10_science" checked>
                                Grade 10 Science
                            </label>
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" name="classes" value="grade11_math" checked>
                                Grade 11 Mathematics
                            </label>
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" name="classes" value="grade12_physics" checked>
                                Grade 12 Physics
                            </label>
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" name="classes" value="grade10_chemistry">
                                Grade 10 Chemistry
                            </label>
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" name="classes" value="grade11_biology">
                                Grade 11 Biology
                            </label>
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" name="classes" value="grade12_chemistry">
                                Grade 12 Chemistry
                            </label>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                    <div class="form-group">
                        <label class="form-label">Start Time *</label>
                        <input type="time" class="form-input" id="startTime" value="08:00" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">End Time *</label>
                        <input type="time" class="form-input" id="endTime" value="16:00" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Period Duration (minutes) *</label>
                    <input type="number" class="form-input" id="periodDuration" value="45" min="30" max="90" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Break Times</label>
                    <div id="breakTimes">
                        <div class="break-time-input" style="display: grid; grid-template-columns: 1fr 1fr 100px; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <input type="text" class="form-input" placeholder="Break name" value="Lunch Break">
                            <input type="time" class="form-input" value="12:00">
                            <input type="number" class="form-input" placeholder="Min" value="45">
                        </div>
                    </div>
                    <button type="button" onclick="addBreakTime()" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem;">
                        <i class="fas fa-plus"></i> Add Break
                    </button>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" onclick="closeTimetablesDynamicContent()" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-magic"></i> Generate Timetable
                    </button>
                </div>
            </form>
        </div>
    `;
};

// Timetable Change Requests Section
window.showTimetableRequests = function() {
    const dynamicContent = document.getElementById('timetables-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-exchange-alt"></i> Timetable Change Requests</h3>
                <div>
                    <button onclick="createNewRequest()" class="btn btn-primary btn-sm">
                        <i class="fas fa-plus"></i> New Request
                    </button>
                    <button onclick="closeTimetablesDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="requests-tabs" style="margin-bottom: 2rem;">
                <div class="tabs" style="display: flex; border-bottom: 2px solid #eee;">
                    <button class="tab-btn active" onclick="switchRequestsTab('pending')" style="padding: 0.75rem 1.5rem; border: none; background: none; border-bottom: 3px solid var(--warning);">
                        Pending (3)
                    </button>
                    <button class="tab-btn" onclick="switchRequestsTab('approved')" style="padding: 0.75rem 1.5rem; border: none; background: none;">
                        Approved
                    </button>
                    <button class="tab-btn" onclick="switchRequestsTab('rejected')" style="padding: 0.75rem 1.5rem; border: none; background: none;">
                        Rejected
                    </button>
                </div>
            </div>
            
            <div id="requests-tab-content">
                <div class="requests-list">
                    <div class="request-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--warning);">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div style="flex: 1;">
                                <h4 style="color: var(--warning); margin-bottom: 0.5rem;">Room Change Request</h4>
                                <p style="color: #666; margin-bottom: 0.5rem;">
                                    <strong>From:</strong> Dr. Sarah Johnson • 
                                    <strong>Date:</strong> ${new Date().toLocaleDateString()} • 
                                    <strong>Priority:</strong> High
                                </p>
                                <p style="color: #999; margin-bottom: 0.5rem;">
                                    Need larger room for Grade 12 Physics practical - current room too small for equipment
                                </p>
                                <p style="color: #666; font-size: 0.9rem;">
                                    <strong>Current:</strong> Physics Lab (Mon, 10:00 AM) • 
                                    <strong>Requested:</strong> Lecture Hall A
                                </p>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button onclick="approveRequest('req_001')" class="btn btn-success btn-sm">
                                    <i class="fas fa-check"></i> Approve
                                </button>
                                <button onclick="rejectRequest('req_001')" class="btn btn-danger btn-sm">
                                    <i class="fas fa-times"></i> Reject
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="request-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--warning);">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div style="flex: 1;">
                                <h4 style="color: var(--warning); margin-bottom: 0.5rem;">Time Slot Change</h4>
                                <p style="color: #666; margin-bottom: 0.5rem;">
                                    <strong>From:</strong> Prof. Michael Chen • 
                                    <strong>Date:</strong> ${new Date().toLocaleDateString()} • 
                                    <strong>Priority:</strong> Medium
                                </p>
                                <p style="color: #999; margin-bottom: 0.5rem;">
                                    Conflict with department meeting - need to reschedule Grade 11 Chemistry
                                </p>
                                <p style="color: #666; font-size: 0.9rem;">
                                    <strong>Current:</strong> Wednesday 2:00 PM • 
                                    <strong>Requested:</strong> Wednesday 4:00 PM
                                </p>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button onclick="approveRequest('req_002')" class="btn btn-success btn-sm">
                                    <i class="fas fa-check"></i> Approve
                                </button>
                                <button onclick="rejectRequest('req_002')" class="btn btn-danger btn-sm">
                                    <i class="fas fa-times"></i> Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Upload Timetable Section
window.showUploadTimetable = function() {
    const dynamicContent = document.getElementById('timetables-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-cloud-upload-alt"></i> Upload Timetable File</h3>
                <button onclick="closeTimetablesDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form onsubmit="uploadTimetableFile(event)">
                <div class="upload-area" style="border: 2px dashed var(--primary); border-radius: 8px; padding: 3rem; text-align: center; margin-bottom: 1.5rem; background: #f8fdff; cursor: pointer;">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <p>Click to browse or drag and drop timetable file here</p>
                    <p style="font-size: 0.9rem; color: #666;">Supported formats: PDF, Excel (.xlsx, .xls), CSV</p>
                    <input type="file" id="timetableFileUpload" accept=".pdf,.xlsx,.xls,.csv" style="display: none;">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Timetable Type *</label>
                        <select class="form-select" id="timetableType" required>
                            <option value="">-- Select Type --</option>
                            <option value="class">Class Timetable</option>
                            <option value="teacher">Teacher Schedule</option>
                            <option value="room">Room Allocation</option>
                            <option value="master">Master Timetable</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Academic Period *</label>
                        <input type="text" class="form-input" id="academicPeriod" required 
                               placeholder="e.g., Semester 2 2025">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" id="timetableDescription" rows="3" 
                              placeholder="Brief description of the timetable..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" id="replaceExisting">
                        Replace existing timetable for this period
                    </label>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" onclick="closeTimetablesDynamicContent()" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-upload"></i> Upload Timetable
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Add file input handler
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('timetableFileUpload');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            uploadArea.querySelector('p').textContent = `Selected: ${this.files[0].name}`;
        }
    });
};

// Helper functions for Timetables section
window.closeTimetablesDynamicContent = function() {
    const dynamicContent = document.getElementById('timetables-dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = '';
    }
};

window.loadClassTimetable = function(classId) {
    if (!classId) return;
    
    const display = document.getElementById('class-timetable-display');
    display.innerHTML = `
        <div class="timetable-view">
            <div class="timetable-header" style="text-align: center; margin-bottom: 1rem;">
                <h4 style="color: var(--primary);">Grade 10 Science - Semester 2 2025</h4>
                <p style="color: #666;">Effective from March 1, 2025</p>
            </div>
            
            <div class="weekly-timetable" style="background: #f8f9fa; border-radius: 8px; overflow: hidden;">
                <div class="timetable-grid" style="display: grid; grid-template-columns: 80px repeat(5, 1fr);">
                    <!-- Header -->
                    <div style="background: var(--primary); color: white; padding: 1rem; font-weight: bold; text-align: center;">Time</div>
                    <div style="background: var(--primary); color: white; padding: 1rem; font-weight: bold; text-align: center;">Monday</div>
                    <div style="background: var(--primary); color: white; padding: 1rem; font-weight: bold; text-align: center;">Tuesday</div>
                    <div style="background: var(--primary); color: white; padding: 1rem; font-weight: bold; text-align: center;">Wednesday</div>
                    <div style="background: var(--primary); color: white; padding: 1rem; font-weight: bold; text-align: center;">Thursday</div>
                    <div style="background: var(--primary); color: white; padding: 1rem; font-weight: bold; text-align: center;">Friday</div>
                    
                    <!-- Time slots -->
                    ${generateClassTimetableSlots()}
                </div>
            </div>
        </div>
    `;
};

window.generateClassTimetableSlots = function() {
    const timeSlots = [
        { time: '8:00-8:45', mon: 'Physics', tue: 'Chemistry', wed: 'Biology', thu: 'Physics', fri: 'Mathematics' },
        { time: '8:45-9:30', mon: 'Physics', tue: 'Chemistry', wed: 'Biology', thu: 'Physics', fri: 'Mathematics' },
        { time: '9:30-10:15', mon: 'Mathematics', tue: 'Physics', wed: 'Chemistry', thu: 'Biology', fri: 'Physics' },
        { time: '10:15-11:00', mon: 'Mathematics', tue: 'Physics', wed: 'Chemistry', thu: 'Biology', fri: 'Physics' },
        { time: '11:00-11:15', mon: 'BREAK', tue: 'BREAK', wed: 'BREAK', thu: 'BREAK', fri: 'BREAK' },
        { time: '11:15-12:00', mon: 'Chemistry', tue: 'Biology', wed: 'Physics', thu: 'Chemistry', fri: 'Biology' },
        { time: '12:00-12:45', mon: 'Chemistry', tue: 'Biology', wed: 'Physics', thu: 'Chemistry', fri: 'Biology' },
        { time: '12:45-13:45', mon: 'LUNCH', tue: 'LUNCH', wed: 'LUNCH', thu: 'LUNCH', fri: 'LUNCH' },
        { time: '13:45-14:30', mon: 'Biology', tue: 'Mathematics', wed: 'Mathematics', thu: 'Mathematics', fri: 'Chemistry' },
        { time: '14:30-15:15', mon: 'Biology', tue: 'Mathematics', wed: 'Mathematics', thu: 'Mathematics', fri: 'Chemistry' },
    ];
    
    return timeSlots.map(slot => `
        <div style="background: white; padding: 0.75rem; border-bottom: 1px solid #eee; font-weight: bold; text-align: center;">${slot.time}</div>
        <div style="background: white; padding: 0.75rem; border-bottom: 1px solid #eee; text-align: center; ${slot.mon === 'BREAK' || slot.mon === 'LUNCH' ? 'background: #fff3cd;' : ''}">${slot.mon}</div>
        <div style="background: white; padding: 0.75rem; border-bottom: 1px solid #eee; text-align: center; ${slot.tue === 'BREAK' || slot.tue === 'LUNCH' ? 'background: #fff3cd;' : ''}">${slot.tue}</div>
        <div style="background: white; padding: 0.75rem; border-bottom: 1px solid #eee; text-align: center; ${slot.wed === 'BREAK' || slot.wed === 'LUNCH' ? 'background: #fff3cd;' : ''}">${slot.wed}</div>
        <div style="background: white; padding: 0.75rem; border-bottom: 1px solid #eee; text-align: center; ${slot.thu === 'BREAK' || slot.thu === 'LUNCH' ? 'background: #fff3cd;' : ''}">${slot.thu}</div>
        <div style="background: white; padding: 0.75rem; border-bottom: 1px solid #eee; text-align: center; ${slot.fri === 'BREAK' || slot.fri === 'LUNCH' ? 'background: #fff3cd;' : ''}">${slot.fri}</div>
    `).join('');
};

window.generateRoomSchedule = function() {
    const timeSlots = [
        { time: '8:00-9:30', mon: 'Grade 10 Science', tue: 'Grade 11 Physics', wed: 'Available', thu: 'Grade 12 Chem', fri: 'Grade 10 Science' },
        { time: '9:30-11:00', mon: 'Available', tue: 'Grade 12 Physics', wed: 'Grade 11 Chem', thu: 'Available', fri: 'Grade 11 Biology' },
        { time: '11:00-12:30', mon: 'Grade 12 Physics', tue: 'Available', wed: 'Grade 10 Chem', thu: 'Grade 11 Physics', fri: 'Available' },
        { time: '12:30-14:00', mon: 'LUNCH', tue: 'LUNCH', wed: 'LUNCH', thu: 'LUNCH', fri: 'LUNCH' },
        { time: '14:00-15:30', mon: 'Available', tue: 'Grade 10 Physics', wed: 'Available', thu: 'Grade 12 Biology', fri: 'Grade 11 Physics' },
    ];
    
    return timeSlots.map(slot => `
        <div style="background: white; padding: 1rem; border-bottom: 1px solid #eee; font-weight: bold;">${slot.time}</div>
        <div style="background: white; padding: 1rem; border-bottom: 1px solid #eee; text-align: center; ${slot.mon === 'Available' ? 'background: #d1edff;' : slot.mon === 'LUNCH' ? 'background: #fff3cd;' : ''}">${slot.mon}</div>
        <div style="background: white; padding: 1rem; border-bottom: 1px solid #eee; text-align: center; ${slot.tue === 'Available' ? 'background: #d1edff;' : slot.tue === 'LUNCH' ? 'background: #fff3cd;' : ''}">${slot.tue}</div>
        <div style="background: white; padding: 1rem; border-bottom: 1px solid #eee; text-align: center; ${slot.wed === 'Available' ? 'background: #d1edff;' : slot.wed === 'LUNCH' ? 'background: #fff3cd;' : ''}">${slot.wed}</div>
        <div style="background: white; padding: 1rem; border-bottom: 1px solid #eee; text-align: center; ${slot.thu === 'Available' ? 'background: #d1edff;' : slot.thu === 'LUNCH' ? 'background: #fff3cd;' : ''}">${slot.thu}</div>
        <div style="background: white; padding: 1rem; border-bottom: 1px solid #eee; text-align: center; ${slot.fri === 'Available' ? 'background: #d1edff;' : slot.fri === 'LUNCH' ? 'background: #fff3cd;' : ''}">${slot.fri}</div>
    `).join('');
};

// Additional helper functions
window.viewTeacherTimetable = function(teacherId) {
    alert(`Viewing timetable for teacher: ${teacherId}`);
};

window.searchTeachers = function(query) {
    console.log('Searching teachers:', query);
};

window.loadRoomSchedule = function(roomId) {
    console.log('Loading schedule for room:', roomId);
};

window.showRoomBooking = function() {
    alert('Opening room booking form...');
};

window.addBreakTime = function() {
    const container = document.getElementById('breakTimes');
    const newBreak = document.createElement('div');
    newBreak.className = 'break-time-input';
    newBreak.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr 100px; gap: 0.5rem; margin-bottom: 0.5rem;';
    newBreak.innerHTML = `
        <input type="text" class="form-input" placeholder="Break name">
        <input type="time" class="form-input">
        <input type="number" class="form-input" placeholder="Min" value="15">
    `;
    container.appendChild(newBreak);
};

window.generateTimetable = function(event) {
    event.preventDefault();
    alert('✅ Timetable generation started! This may take a few moments...');
    // In real implementation, this would call backend service
};

window.switchRequestsTab = function(tab) {
    console.log('Switching to requests tab:', tab);
};

window.approveRequest = function(requestId) {
    if (confirm('Are you sure you want to approve this request?')) {
        alert(`✅ Request ${requestId} approved successfully!`);
    }
};

window.rejectRequest = function(requestId) {
    if (confirm('Are you sure you want to reject this request?')) {
        alert(`❌ Request ${requestId} rejected.`);
    }
};

window.createNewRequest = function() {
    alert('Opening new timetable change request form...');
};

window.uploadTimetableFile = function(event) {
    event.preventDefault();
    alert('✅ Timetable file uploaded successfully!');
    closeTimetablesDynamicContent();
};

window.printTimetable = function() {
    alert('Opening print preview for timetable...');
};

window.exportAllTeacherSchedules = function() {
    alert('Exporting all teacher schedules...');
};

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

// ===== BUDGET SECTION =====
function loadBudgetSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-budget">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-money-bill-wave"></i> Department Budget</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Manage department budget allocation, expenditure tracking, and financial reporting.</p>
                
                <div class="budget-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                    <div class="action-card" onclick="showBudgetOverview()">
                        <i class="fas fa-chart-pie" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h4>Budget Overview</h4>
                        <p>View overall budget status</p>
                    </div>
                    
                    <div class="action-card" onclick="showAllocateBudget()">
                        <i class="fas fa-hand-holding-usd" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                        <h4>Allocate Budget</h4>
                        <p>Assign funds to departments</p>
                    </div>
                    
                    <div class="action-card" onclick="showExpenseTracking()">
                        <i class="fas fa-receipt" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h4>Expense Tracking</h4>
                        <p>Monitor expenditures</p>
                    </div>
                    
                    <div class="action-card" onclick="showBudgetReports()">
                        <i class="fas fa-chart-bar" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                        <h4>Budget Reports</h4>
                        <p>Generate financial reports</p>
                    </div>
                    
                    <div class="action-card" onclick="showVarianceAnalysis()">
                        <i class="fas fa-balance-scale" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                        <h4>Variance Analysis</h4>
                        <p>Compare budget vs actual</p>
                    </div>
                    
                    <div class="action-card" onclick="showBudgetSettings()">
                        <i class="fas fa-cog" style="font-size: 3rem; color: var(--secondary); margin-bottom: 1rem;"></i>
                        <h4>Budget Settings</h4>
                        <p>Configure budget parameters</p>
                    </div>
                </div>
                
                <div id="budget-dynamic-content"></div>
            </div>
        </div>
    `;
}

// Budget Overview Section
window.showBudgetOverview = function() {
    const dynamicContent = document.getElementById('budget-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-chart-pie"></i> Budget Overview - FY 2025</h3>
                <div>
                    <button onclick="refreshBudgetData()" class="btn btn-success btn-sm">
                        <i class="fas fa-sync-alt"></i> Refresh
                    </button>
                    <button onclick="closeBudgetDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="budget-summary" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div class="summary-card" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--primary);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">$500,000</div>
                        <div style="color: #666;">Total Budget</div>
                    </div>
                    <div class="summary-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--warning);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--warning);">$350,000</div>
                        <div style="color: #666;">Allocated</div>
                    </div>
                    <div class="summary-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--success);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--success);">$150,000</div>
                        <div style="color: #666;">Available</div>
                    </div>
                    <div class="summary-card" style="background: #fff5f5; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--danger);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--danger);">70%</div>
                        <div style="color: #666;">Utilization</div>
                    </div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div class="department-allocation">
                    <h4 style="color: var(--primary); margin-bottom: 1rem;">Department Allocation</h4>
                    <div class="allocation-list">
                        <div class="department-item">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                                <span style="font-weight: bold;">Physics Department</span>
                                <span style="color: var(--success);">$125,000</span>
                            </div>
                            <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; background: var(--success); width: 65%;"></div>
                            </div>
                            <div style="display: flex; justify-content: between; font-size: 0.8rem; color: #666; margin-top: 0.25rem;">
                                <span>Spent: $81,250</span>
                                <span>65% used</span>
                            </div>
                        </div>
                        
                        <div class="department-item" style="margin-top: 1rem;">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                                <span style="font-weight: bold;">Chemistry Department</span>
                                <span style="color: var(--info);">$100,000</span>
                            </div>
                            <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; background: var(--info); width: 45%;"></div>
                            </div>
                            <div style="display: flex; justify-content: between; font-size: 0.8rem; color: #666; margin-top: 0.25rem;">
                                <span>Spent: $45,000</span>
                                <span>45% used</span>
                            </div>
                        </div>
                        
                        <div class="department-item" style="margin-top: 1rem;">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                                <span style="font-weight: bold;">Biology Department</span>
                                <span style="color: var(--warning);">$75,000</span>
                            </div>
                            <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; background: var(--warning); width: 80%;"></div>
                            </div>
                            <div style="display: flex; justify-content: between; font-size: 0.8rem; color: #666; margin-top: 0.25rem;">
                                <span>Spent: $60,000</span>
                                <span>80% used</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="expense-breakdown">
                    <h4 style="color: var(--primary); margin-bottom: 1rem;">Expense Categories</h4>
                    <div class="category-list">
                        <div class="category-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Laboratory Equipment</span>
                            <span style="font-weight: bold; color: var(--primary);">$85,000</span>
                        </div>
                        <div class="category-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Chemical Supplies</span>
                            <span style="font-weight: bold; color: var(--info);">$62,500</span>
                        </div>
                        <div class="category-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Teaching Resources</span>
                            <span style="font-weight: bold; color: var(--success);">$43,750</span>
                        </div>
                        <div class="category-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Maintenance</span>
                            <span style="font-weight: bold; color: var(--warning);">$28,500</span>
                        </div>
                        <div class="category-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px;">
                            <span>Professional Development</span>
                            <span style="font-weight: bold; color: var(--danger);">$15,250</span>
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
                        <span style="color: var(--success); font-weight: bold;">Completed</span>
                    </div>
                    
                    <div class="activity-item" style="display: flex; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="background: var(--warning); color: white; padding: 0.5rem; border-radius: 50%; margin-right: 1rem;">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div style="flex: 1;">
                            <strong>Chemical Supplies Q2</strong> pending approval
                            <p style="margin: 0.25rem 0 0 0; color: #666;">$18,500 • ${new Date().toLocaleDateString()}</p>
                        </div>
                        <span style="color: var(--warning); font-weight: bold;">Pending</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Allocate Budget Section
window.showAllocateBudget = function() {
    const dynamicContent = document.getElementById('budget-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-hand-holding-usd"></i> Allocate Budget</h3>
                <button onclick="closeBudgetDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form id="budgetAllocationForm" onsubmit="saveBudgetAllocation(event)">
                <div class="allocation-summary" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <strong>Total Available Budget:</strong>
                            <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">$150,000</div>
                        </div>
                        <div>
                            <strong>Remaining After Allocation:</strong>
                            <div id="remainingBudget" style="font-size: 1.5rem; font-weight: bold; color: var(--success);">$150,000</div>
                        </div>
                    </div>
                </div>
                
                <div class="allocation-items">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-list"></i> Department Allocations
                    </h4>
                    
                    <div class="allocation-table" style="margin-bottom: 1.5rem;">
                        <div class="table-header" style="display: grid; grid-template-columns: 2fr 1fr 1fr 100px; gap: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px 8px 0 0; font-weight: bold;">
                            <div>Department</div>
                            <div>Current Allocation</div>
                            <div>New Allocation ($)</div>
                            <div>Action</div>
                        </div>
                        
                        <div id="allocationItems">
                            <div class="table-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 100px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;">
                                <div>
                                    <strong>Physics Department</strong>
                                    <div style="font-size: 0.8rem; color: #666;">Current: $125,000</div>
                                </div>
                                <div style="color: var(--success); font-weight: bold;">$125,000</div>
                                <input type="number" class="form-input" value="125000" min="0" step="1000" onchange="calculateRemainingBudget()">
                                <button type="button" onclick="removeAllocationItem(this)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                            
                            <div class="table-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 100px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;">
                                <div>
                                    <strong>Chemistry Department</strong>
                                    <div style="font-size: 0.8rem; color: #666;">Current: $100,000</div>
                                </div>
                                <div style="color: var(--info); font-weight: bold;">$100,000</div>
                                <input type="number" class="form-input" value="100000" min="0" step="1000" onchange="calculateRemainingBudget()">
                                <button type="button" onclick="removeAllocationItem(this)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="table-footer" style="padding: 1rem; background: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <button type="button" onclick="addAllocationItem()" class="btn btn-secondary btn-sm">
                                <i class="fas fa-plus"></i> Add Department
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Allocation Justification</label>
                    <textarea class="form-textarea" id="allocationJustification" rows="3" 
                              placeholder="Explain the rationale for these budget allocations..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Effective Date</label>
                    <input type="date" class="form-input" id="effectiveDate" value="${new Date().toISOString().split('T')[0]}">
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" onclick="closeBudgetDynamicContent()" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Allocation
                    </button>
                </div>
            </form>
        </div>
    `;
    
    calculateRemainingBudget();
};

// Expense Tracking Section
window.showExpenseTracking = function() {
    const dynamicContent = document.getElementById('budget-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-receipt"></i> Expense Tracking</h3>
                <div>
                    <button onclick="addNewExpense()" class="btn btn-primary btn-sm">
                        <i class="fas fa-plus"></i> New Expense
                    </button>
                    <button onclick="closeBudgetDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="expense-filters" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 1rem; align-items: end;">
                    <div class="form-group">
                        <label class="form-label">Department</label>
                        <select class="form-select" onchange="filterExpenses()">
                            <option value="">All Departments</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="biology">Biology</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select class="form-select" onchange="filterExpenses()">
                            <option value="">All Categories</option>
                            <option value="equipment">Equipment</option>
                            <option value="supplies">Supplies</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Date Range</label>
                        <select class="form-select" onchange="filterExpenses()">
                            <option value="current_month">Current Month</option>
                            <option value="last_month">Last Month</option>
                            <option value="current_quarter">Current Quarter</option>
                            <option value="current_year">Current Year</option>
                        </select>
                    </div>
                    <button onclick="exportExpenses()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>
            </div>
            
            <div class="expenses-list">
                <div class="expense-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 1rem;">
                    <div style="flex: 1;">
                        <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Laboratory Microscopes</h4>
                        <p style="color: #666; margin-bottom: 0.5rem;">
                            <strong>Department:</strong> Physics • 
                            <strong>Category:</strong> Equipment • 
                            <strong>Date:</strong> ${new Date().toLocaleDateString()}
                        </p>
                        <p style="color: #999;">Advanced research microscopes for physics lab</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--success); margin-bottom: 0.5rem;">$12,500</div>
                        <span style="background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
                            Approved
                        </span>
                    </div>
                </div>
                
                <div class="expense-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 1rem;">
                    <div style="flex: 1;">
                        <h4 style="color: var(--info); margin-bottom: 0.5rem;">Chemical Reagents</h4>
                        <p style="color: #666; margin-bottom: 0.5rem;">
                            <strong>Department:</strong> Chemistry • 
                            <strong>Category:</strong> Supplies • 
                            <strong>Date:</strong> ${new Date().toLocaleDateString()}
                        </p>
                        <p style="color: #999;">Quarterly chemical supplies and reagents</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--info); margin-bottom: 0.5rem;">$8,750</div>
                        <span style="background: var(--warning); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
                            Pending
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="expense-summary" style="margin-top: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="summary-card" style="background: #f0f9ff; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.2rem; font-weight: bold; color: var(--primary);">$186,250</div>
                        <div style="color: #666;">Total Expenses</div>
                    </div>
                    <div class="summary-card" style="background: #f0f9f0; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.2rem; font-weight: bold; color: var(--success);">$153,750</div>
                        <div style="color: #666;">Approved Expenses</div>
                    </div>
                    <div class="summary-card" style="background: #fffbf0; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.2rem; font-weight: bold; color: var(--warning);">$32,500</div>
                        <div style="color: #666;">Pending Approval</div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Budget Reports Section
window.showBudgetReports = function() {
    const dynamicContent = document.getElementById('budget-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-chart-bar"></i> Budget Reports</h3>
                <div>
                    <button onclick="generateCustomReport()" class="btn btn-primary btn-sm">
                        <i class="fas fa-plus"></i> Custom Report
                    </button>
                    <button onclick="closeBudgetDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="reports-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('monthly')">
                    <i class="fas fa-calendar-alt" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Monthly Report</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Monthly budget vs actual analysis</p>
                    <div class="report-info" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 2 days ago</span>
                    </div>
                </div>
                
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('quarterly')">
                    <i class="fas fa-chart-line" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--info); margin-bottom: 0.5rem;">Quarterly Report</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Quarterly performance and trends</p>
                    <div class="report-info" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 1 week ago</span>
                    </div>
                </div>
                
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('department')">
                    <i class="fas fa-building" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--success); margin-bottom: 0.5rem;">Department Report</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Department-wise budget analysis</p>
                    <div class="report-info" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 3 days ago</span>
                    </div>
                </div>
            </div>
            
            <div class="recent-reports">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Recent Reports</h4>
                <div class="reports-list">
                    <div class="report-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div>
                            <strong>Q1 2025 Budget Report</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Generated on March 31, 2025</p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="viewReport('q1_2025')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="downloadReport('q1_2025')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i> PDF
                            </button>
                        </div>
                    </div>
                    
                    <div class="report-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div>
                            <strong>February 2025 Monthly Report</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Generated on March 5, 2025</p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="viewReport('feb_2025')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="downloadReport('feb_2025')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i> PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Variance Analysis Section
window.showVarianceAnalysis = function() {
    const dynamicContent = document.getElementById('budget-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-balance-scale"></i> Variance Analysis</h3>
                <div>
                    <button onclick="exportVarianceReport()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button onclick="closeBudgetDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="variance-summary" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="variance-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--success);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--success);">$15,250</div>
                        <div style="color: #666;">Favorable Variance</div>
                    </div>
                    <div class="variance-card" style="background: #fff5f5; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--danger);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--danger);">$8,750</div>
                        <div style="color: #666;">Unfavorable Variance</div>
                    </div>
                    <div class="variance-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--warning);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--warning);">3.5%</div>
                        <div style="color: #666;">Overall Variance</div>
                    </div>
                </div>
            </div>
            
            <div class="variance-table">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Budget vs Actual - Q1 2025</h4>
                <div class="table-container">
                    <div class="table-header" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px 8px 0 0; font-weight: bold;">
                        <div>Category</div>
                        <div>Budget ($)</div>
                        <div>Actual ($)</div>
                        <div>Variance ($)</div>
                        <div>Variance %</div>
                    </div>
                    
                    ${generateVarianceRows()}
                </div>
            </div>
        </div>
    `;
};

// Budget Settings Section
window.showBudgetSettings = function() {
    const dynamicContent = document.getElementById('budget-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-cog"></i> Budget Settings</h3>
                <button onclick="closeBudgetDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form id="budgetSettingsForm" onsubmit="saveBudgetSettings(event)">
                <div class="settings-section" style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-fiscal-year"></i> Fiscal Year Settings
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div class="form-group">
                            <label class="form-label">Fiscal Year Start</label>
                            <input type="date" class="form-input" id="fiscalYearStart" value="2025-01-01">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Fiscal Year End</label>
                            <input type="date" class="form-input" id="fiscalYearEnd" value="2025-12-31">
                        </div>
                    </div>
                </div>
                
                <div class="settings-section" style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-bell"></i> Notification Settings
                    </h4>
                    
                    <div class="notification-settings">
                        <div class="form-group">
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" id="notifyOverspend" checked>
                                Notify on budget overspend
                            </label>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" id="notifyLargeExpense" checked>
                                Notify on large expenses (> $5,000)
                            </label>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" id="notifyBudgetReview">
                                Notify for monthly budget review
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="settings-section" style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-sliders-h"></i> Budget Thresholds
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div class="form-group">
                            <label class="form-label">Overspend Alert Threshold (%)</label>
                            <input type="number" class="form-input" id="overspendThreshold" value="10" min="0" max="100">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Large Expense Threshold ($)</label>
                            <input type="number" class="form-input" id="largeExpenseThreshold" value="5000" min="0">
                        </div>
                    </div>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" onclick="closeBudgetDynamicContent()" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Settings
                    </button>
                </div>
            </form>
        </div>
    `;
};

// Helper functions for Budget section
window.closeBudgetDynamicContent = function() {
    const dynamicContent = document.getElementById('budget-dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = '';
    }
};

window.calculateRemainingBudget = function() {
    const totalBudget = 150000;
    let allocated = 0;
    
    document.querySelectorAll('#allocationItems input[type="number"]').forEach(input => {
        allocated += parseFloat(input.value) || 0;
    });
    
    const remaining = totalBudget - allocated;
    const remainingElement = document.getElementById('remainingBudget');
    
    remainingElement.textContent = '$' + remaining.toLocaleString();
    
    if (remaining < 0) {
        remainingElement.style.color = 'var(--danger)';
    } else if (remaining < totalBudget * 0.1) {
        remainingElement.style.color = 'var(--warning)';
    } else {
        remainingElement.style.color = 'var(--success)';
    }
};

window.addAllocationItem = function() {
    const container = document.getElementById('allocationItems');
    const newItem = document.createElement('div');
    newItem.className = 'table-row';
    newItem.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 1fr 100px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;';
    newItem.innerHTML = `
        <div>
            <select class="form-select">
                <option value="">Select Department</option>
                <option value="mathematics">Mathematics Department</option>
                <option value="computer_science">Computer Science Department</option>
                <option value="general_science">General Science</option>
            </select>
        </div>
        <div style="color: var(--secondary); font-weight: bold;">$0</div>
        <input type="number" class="form-input" value="0" min="0" step="1000" onchange="calculateRemainingBudget()">
        <button type="button" onclick="removeAllocationItem(this)" class="btn btn-danger btn-sm">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(newItem);
};

window.removeAllocationItem = function(button) {
    const container = document.getElementById('allocationItems');
    if (container.children.length > 1) {
        button.closest('.table-row').remove();
        calculateRemainingBudget();
    } else {
        alert('You must have at least one allocation item.');
    }
};

window.saveBudgetAllocation = function(event) {
    event.preventDefault();
    alert('✅ Budget allocation saved successfully!');
    closeBudgetDynamicContent();
};

window.addNewExpense = function() {
    alert('Opening new expense form...');
};

window.filterExpenses = function() {
    console.log('Filtering expenses...');
};

window.exportExpenses = function() {
    alert('Exporting expenses data...');
};

window.generateReport = function(reportType) {
    alert(`Generating ${reportType} report...`);
};

window.generateCustomReport = function() {
    alert('Opening custom report generator...');
};

window.viewReport = function(reportId) {
    alert(`Viewing report: ${reportId}`);
};

window.downloadReport = function(reportId) {
    alert(`Downloading report: ${reportId}`);
};

window.exportVarianceReport = function() {
    alert('Exporting variance report...');
};

window.saveBudgetSettings = function(event) {
    event.preventDefault();
    alert('✅ Budget settings saved successfully!');
    closeBudgetDynamicContent();
};

window.refreshBudgetData = function() {
    alert('Refreshing budget data...');
};

window.generateVarianceRows = function() {
    const varianceData = [
        { category: 'Laboratory Equipment', budget: 100000, actual: 85000, variance: -15000, percent: -15 },
        { category: 'Chemical Supplies', budget: 75000, actual: 62500, variance: -12500, percent: -16.7 },
        { category: 'Teaching Resources', budget: 50000, actual: 43750, variance: -6250, percent: -12.5 },
        { category: 'Maintenance', budget: 35000, actual: 28500, variance: -6500, percent: -18.6 },
        { category: 'Professional Development', budget: 20000, actual: 15250, variance: -4750, percent: -23.8 },
    ];
    
    return varianceData.map(item => `
        <div class="table-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee;">
            <div>${item.category}</div>
            <div>$${item.budget.toLocaleString()}</div>
            <div>$${item.actual.toLocaleString()}</div>
            <div style="color: ${item.variance < 0 ? 'var(--success)' : 'var(--danger)'}; font-weight: bold;">
                $${Math.abs(item.variance).toLocaleString()} ${item.variance < 0 ? 'F' : 'U'}
            </div>
            <div style="color: ${item.percent < 0 ? 'var(--success)' : 'var(--danger)'}; font-weight: bold;">
                ${Math.abs(item.percent).toFixed(1)}%
            </div>
        </div>
    `).join('');
};

// ===== MARKSHEETS SECTION =====
function loadMarksheetsSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-marksheets">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-file-alt"></i> Student Marksheets</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Manage student marks, generate reports, and track academic performance.</p>
                
                <div class="marksheets-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                    <div class="action-card" onclick="showEnterMarks()">
                        <i class="fas fa-edit" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h4>Enter Marks</h4>
                        <p>Input student marks and grades</p>
                    </div>
                    
                    <div class="action-card" onclick="showViewMarksheets()">
                        <i class="fas fa-search" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                        <h4>View Marksheets</h4>
                        <p>Access student marksheets</p>
                    </div>
                    
                    <div class="action-card" onclick="showGenerateReports()">
                        <i class="fas fa-chart-bar" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h4>Generate Reports</h4>
                        <p>Create academic reports</p>
                    </div>
                    
                    <div class="action-card" onclick="showGradeSetup()">
                        <i class="fas fa-cog" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                        <h4>Grade Setup</h4>
                        <p>Configure grading system</p>
                    </div>
                    
                    <div class="action-card" onclick="showPerformanceAnalysis()">
                        <i class="fas fa-chart-line" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                        <h4>Performance Analysis</h4>
                        <p>Analyze student performance</p>
                    </div>
                    
                    <div class="action-card" onclick="showUploadMarks()">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--secondary); margin-bottom: 1rem;"></i>
                        <h4>Upload Marks</h4>
                        <p>Bulk upload marks data</p>
                    </div>
                </div>
                
                <div id="marksheets-dynamic-content"></div>
            </div>
        </div>
    `;
}

// Enter Marks Section
window.showEnterMarks = function() {
    const dynamicContent = document.getElementById('marksheets-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-edit"></i> Enter Student Marks</h3>
                <button onclick="closeMarksheetsDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form id="enterMarksForm" onsubmit="saveMarks(event)">
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Class *</label>
                        <select class="form-select" id="marksClass" required onchange="loadStudentsForClass()">
                            <option value="">-- Select Class --</option>
                            <option value="grade10">Grade 10</option>
                            <option value="grade11">Grade 11</option>
                            <option value="grade12">Grade 12</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Subject *</label>
                        <select class="form-select" id="marksSubject" required>
                            <option value="">-- Select Subject --</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="biology">Biology</option>
                            <option value="mathematics">Mathematics</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Exam Type *</label>
                        <select class="form-select" id="examType" required>
                            <option value="">-- Select Exam --</option>
                            <option value="midterm">Midterm Exam</option>
                            <option value="final">Final Exam</option>
                            <option value="quiz1">Quiz 1</option>
                            <option value="quiz2">Quiz 2</option>
                            <option value="assignment">Assignment</option>
                        </select>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Maximum Marks *</label>
                        <input type="number" class="form-input" id="maxMarks" value="100" min="1" max="200" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Exam Date *</label>
                        <input type="date" class="form-input" id="examDate" value="${new Date().toISOString().split('T')[0]}" required>
                    </div>
                </div>
                
                <div class="marks-entry-section">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-list"></i> Student Marks Entry
                    </h4>
                    
                    <div class="marks-table" style="margin-bottom: 1.5rem;">
                        <div class="table-header" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px 8px 0 0; font-weight: bold;">
                            <div>Student Name</div>
                            <div>Student ID</div>
                            <div>Marks Obtained</div>
                            <div>Percentage</div>
                            <div>Grade</div>
                        </div>
                        
                        <div id="marksEntryItems">
                            <div class="table-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;">
                                <div>John Smith</div>
                                <div>S1001</div>
                                <input type="number" class="form-input" value="85" min="0" max="100" onchange="calculateGrade(this)">
                                <div class="percentage" style="font-weight: bold; color: var(--info);">85%</div>
                                <div class="grade" style="font-weight: bold; color: var(--success);">A</div>
                            </div>
                            
                            <div class="table-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;">
                                <div>Sarah Johnson</div>
                                <div>S1002</div>
                                <input type="number" class="form-input" value="72" min="0" max="100" onchange="calculateGrade(this)">
                                <div class="percentage" style="font-weight: bold; color: var(--info);">72%</div>
                                <div class="grade" style="font-weight: bold; color: var(--warning);">B</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Remarks</label>
                    <textarea class="form-textarea" id="marksRemarks" rows="3" 
                              placeholder="Any additional remarks about this exam..."></textarea>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" onclick="closeMarksheetsDynamicContent()" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Marks
                    </button>
                </div>
            </form>
        </div>
    `;
};

// View Marksheets Section
window.showViewMarksheets = function() {
    const dynamicContent = document.getElementById('marksheets-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-search"></i> View Student Marksheets</h3>
                <div>
                    <button onclick="printAllMarksheets()" class="btn btn-success btn-sm">
                        <i class="fas fa-print"></i> Print All
                    </button>
                    <button onclick="closeMarksheetsDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="search-filters" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 1rem; align-items: end;">
                    <div class="form-group">
                        <label class="form-label">Class</label>
                        <select class="form-select" onchange="filterMarksheets()">
                            <option value="">All Classes</option>
                            <option value="grade10">Grade 10</option>
                            <option value="grade11">Grade 11</option>
                            <option value="grade12">Grade 12</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Subject</label>
                        <select class="form-select" onchange="filterMarksheets()">
                            <option value="">All Subjects</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="biology">Biology</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Exam Type</label>
                        <select class="form-select" onchange="filterMarksheets()">
                            <option value="">All Exams</option>
                            <option value="midterm">Midterm</option>
                            <option value="final">Final</option>
                            <option value="quiz">Quiz</option>
                        </select>
                    </div>
                    <button onclick="searchMarksheets()" class="btn btn-primary btn-sm">
                        <i class="fas fa-search"></i> Search
                    </button>
                </div>
            </div>
            
            <div class="marksheets-list">
                <div class="marksheet-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--primary);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">John Smith - Grade 10</h4>
                            <p style="color: #666; margin-bottom: 0.5rem;">
                                <strong>Student ID:</strong> S1001 • 
                                <strong>Academic Year:</strong> 2024-2025
                            </p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
                                <div>
                                    <strong>Overall Percentage:</strong>
                                    <div style="font-size: 1.2rem; font-weight: bold; color: var(--success);">87.5%</div>
                                </div>
                                <div>
                                    <strong>Final Grade:</strong>
                                    <div style="font-size: 1.2rem; font-weight: bold; color: var(--success);">A</div>
                                </div>
                                <div>
                                    <strong>Rank:</strong>
                                    <div style="font-size: 1.2rem; font-weight: bold; color: var(--info);">2/45</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <button onclick="viewStudentMarksheet('S1001')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="downloadMarksheet('S1001')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i> PDF
                            </button>
                            <button onclick="printMarksheet('S1001')" class="btn btn-info btn-sm">
                                <i class="fas fa-print"></i> Print
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="marksheet-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--info);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--info); margin-bottom: 0.5rem;">Sarah Johnson - Grade 10</h4>
                            <p style="color: #666; margin-bottom: 0.5rem;">
                                <strong>Student ID:</strong> S1002 • 
                                <strong>Academic Year:</strong> 2024-2025
                            </p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
                                <div>
                                    <strong>Overall Percentage:</strong>
                                    <div style="font-size: 1.2rem; font-weight: bold; color: var(--warning);">76.2%</div>
                                </div>
                                <div>
                                    <strong>Final Grade:</strong>
                                    <div style="font-size: 1.2rem; font-weight: bold; color: var(--warning);">B</div>
                                </div>
                                <div>
                                    <strong>Rank:</strong>
                                    <div style="font-size: 1.2rem; font-weight: bold; color: var(--info);">15/45</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <button onclick="viewStudentMarksheet('S1002')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="downloadMarksheet('S1002')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i> PDF
                            </button>
                            <button onclick="printMarksheet('S1002')" class="btn btn-info btn-sm">
                                <i class="fas fa-print"></i> Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Generate Reports Section
window.showGenerateReports = function() {
    const dynamicContent = document.getElementById('marksheets-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-chart-bar"></i> Generate Academic Reports</h3>
                <div>
                    <button onclick="generateCustomReport()" class="btn btn-primary btn-sm">
                        <i class="fas fa-plus"></i> Custom Report
                    </button>
                    <button onclick="closeMarksheetsDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="reports-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('class_performance')">
                    <i class="fas fa-users" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Class Performance</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Overall class performance analysis</p>
                    <div class="report-info" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 1 week ago</span>
                    </div>
                </div>
                
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('subject_analysis')">
                    <i class="fas fa-book" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--info); margin-bottom: 0.5rem;">Subject Analysis</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Subject-wise performance report</p>
                    <div class="report-info" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 3 days ago</span>
                    </div>
                </div>
                
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('progress_report')">
                    <i class="fas fa-chart-line" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--success); margin-bottom: 0.5rem;">Progress Report</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Student progress over time</p>
                    <div class="report-info" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 2 days ago</span>
                    </div>
                </div>
                
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('ranking_report')">
                    <i class="fas fa-trophy" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--warning); margin-bottom: 0.5rem;">Ranking Report</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Student ranking and merit list</p>
                    <div class="report-info" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 5 days ago</span>
                    </div>
                </div>
            </div>
            
            <div class="recent-reports">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Recent Reports</h4>
                <div class="reports-list">
                    <div class="report-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div>
                            <strong>Grade 10 Final Exam Report - Semester 1</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Generated on March 15, 2025</p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="viewReport('grade10_sem1')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="downloadReport('grade10_sem1')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i> PDF
                            </button>
                        </div>
                    </div>
                    
                    <div class="report-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div>
                            <strong>Physics Subject Analysis - All Grades</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Generated on March 10, 2025</p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="viewReport('physics_analysis')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="downloadReport('physics_analysis')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i> PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Grade Setup Section
window.showGradeSetup = function() {
    const dynamicContent = document.getElementById('marksheets-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-cog"></i> Grade System Setup</h3>
                <button onclick="closeMarksheetsDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form id="gradeSetupForm" onsubmit="saveGradeSystem(event)">
                <div class="grade-system-section" style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-sliders-h"></i> Grading Scale
                    </h4>
                    
                    <div class="grade-table" style="margin-bottom: 1.5rem;">
                        <div class="table-header" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 2fr 80px; gap: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px 8px 0 0; font-weight: bold;">
                            <div>Grade</div>
                            <div>From %</div>
                            <div>To %</div>
                            <div>Grade Point</div>
                            <div>Description</div>
                            <div>Action</div>
                        </div>
                        
                        <div id="gradeScaleItems">
                            <div class="table-row" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 2fr 80px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;">
                                <div><strong>A+</strong></div>
                                <input type="number" class="form-input" value="90" min="0" max="100">
                                <input type="number" class="form-input" value="100" min="0" max="100">
                                <input type="number" class="form-input" value="4.0" step="0.1" min="0">
                                <input type="text" class="form-input" value="Excellent" placeholder="Grade description">
                                <button type="button" onclick="removeGradeItem(this)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                            
                            <div class="table-row" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 2fr 80px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;">
                                <div><strong>A</strong></div>
                                <input type="number" class="form-input" value="80" min="0" max="100">
                                <input type="number" class="form-input" value="89" min="0" max="100">
                                <input type="number" class="form-input" value="3.7" step="0.1" min="0">
                                <input type="text" class="form-input" value="Very Good" placeholder="Grade description">
                                <button type="button" onclick="removeGradeItem(this)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="table-footer" style="padding: 1rem; background: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <button type="button" onclick="addGradeItem()" class="btn btn-secondary btn-sm">
                                <i class="fas fa-plus"></i> Add Grade
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="settings-section" style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-percentage"></i> Passing Criteria
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div class="form-group">
                            <label class="form-label">Minimum Passing Percentage</label>
                            <input type="number" class="form-input" id="passingPercentage" value="40" min="0" max="100">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Minimum Grade Point</label>
                            <input type="number" class="form-input" id="minGradePoint" value="2.0" step="0.1" min="0">
                        </div>
                    </div>
                </div>
                
                <div class="settings-section" style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-calculator"></i> Calculation Method
                    </h4>
                    
                    <div class="form-group">
                        <label class="radio-label" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <input type="radio" name="calculationMethod" value="weighted" checked>
                            Weighted Average (Based on credit hours)
                        </label>
                        <label class="radio-label" style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="radio" name="calculationMethod" value="simple">
                            Simple Average
                        </label>
                    </div>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" onclick="closeMarksheetsDynamicContent()" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Grade System
                    </button>
                </div>
            </form>
        </div>
    `;
};

// Performance Analysis Section
window.showPerformanceAnalysis = function() {
    const dynamicContent = document.getElementById('marksheets-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-chart-line"></i> Performance Analysis</h3>
                <div>
                    <button onclick="exportAnalysisReport()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button onclick="closeMarksheetsDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="analysis-filters" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 1rem; align-items: end;">
                    <div class="form-group">
                        <label class="form-label">Class</label>
                        <select class="form-select" onchange="updateAnalysis()">
                            <option value="grade10">Grade 10</option>
                            <option value="grade11">Grade 11</option>
                            <option value="grade12">Grade 12</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Subject</label>
                        <select class="form-select" onchange="updateAnalysis()">
                            <option value="all">All Subjects</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="biology">Biology</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Time Period</label>
                        <select class="form-select" onchange="updateAnalysis()">
                            <option value="current_semester">Current Semester</option>
                            <option value="last_semester">Last Semester</option>
                            <option value="current_year">Current Year</option>
                        </select>
                    </div>
                    <button onclick="refreshAnalysis()" class="btn btn-primary btn-sm">
                        <i class="fas fa-sync-alt"></i> Refresh
                    </button>
                </div>
            </div>
            
            <div class="performance-stats" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="stat-card" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">78.5%</div>
                        <div style="color: #666;">Average Percentage</div>
                    </div>
                    <div class="stat-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--success);">85%</div>
                        <div style="color: #666;">Pass Rate</div>
                    </div>
                    <div class="stat-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--warning);">12.5%</div>
                        <div style="color: #666;">Improvement Rate</div>
                    </div>
                    <div class="stat-card" style="background: #fff5f5; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--danger);">15%</div>
                        <div style="color: #666;">Students Needing Help</div>
                    </div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div class="grade-distribution">
                    <h4 style="color: var(--primary); margin-bottom: 1rem;">Grade Distribution</h4>
                    <div class="distribution-list">
                        <div class="distribution-item">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                                <span>A+ (90-100%)</span>
                                <span style="font-weight: bold; color: var(--success);">8 students</span>
                            </div>
                            <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; background: var(--success); width: 20%;"></div>
                            </div>
                        </div>
                        
                        <div class="distribution-item" style="margin-top: 1rem;">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                                <span>A (80-89%)</span>
                                <span style="font-weight: bold; color: var(--info);">12 students</span>
                            </div>
                            <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; background: var(--info); width: 30%;"></div>
                            </div>
                        </div>
                        
                        <div class="distribution-item" style="margin-top: 1rem;">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                                <span>B (70-79%)</span>
                                <span style="font-weight: bold; color: var(--warning);">15 students</span>
                            </div>
                            <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; background: var(--warning); width: 37.5%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="subject-performance">
                    <h4 style="color: var(--primary); margin-bottom: 1rem;">Subject-wise Performance</h4>
                    <div class="subject-list">
                        <div class="subject-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Physics</span>
                            <span style="font-weight: bold; color: var(--success);">82.3%</span>
                        </div>
                        <div class="subject-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Chemistry</span>
                            <span style="font-weight: bold; color: var(--info);">79.8%</span>
                        </div>
                        <div class="subject-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Biology</span>
                            <span style="font-weight: bold; color: var(--warning);">75.6%</span>
                        </div>
                        <div class="subject-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px;">
                            <span>Mathematics</span>
                            <span style="font-weight: bold; color: var(--danger);">70.2%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="top-performers">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Top Performers</h4>
                <div class="performers-list">
                    <div class="performer-item" style="display: flex; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="background: var(--warning); color: white; padding: 0.5rem; border-radius: 50%; margin-right: 1rem; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            1
                        </div>
                        <div style="flex: 1;">
                            <strong>Emma Wilson</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Grade 10 • Overall: 94.5% • Rank: 1/40</p>
                        </div>
                        <span style="color: var(--success); font-weight: bold;">A+</span>
                    </div>
                    
                    <div class="performer-item" style="display: flex; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="background: var(--info); color: white; padding: 0.5rem; border-radius: 50%; margin-right: 1rem; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            2
                        </div>
                        <div style="flex: 1;">
                            <strong>John Smith</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Grade 10 • Overall: 92.3% • Rank: 2/40</p>
                        </div>
                        <span style="color: var(--success); font-weight: bold;">A+</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Upload Marks Section
window.showUploadMarks = function() {
    const dynamicContent = document.getElementById('marksheets-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-cloud-upload-alt"></i> Upload Marks Data</h3>
                <button onclick="closeMarksheetsDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form onsubmit="uploadMarksFile(event)">
                <div class="upload-area" style="border: 2px dashed var(--primary); border-radius: 8px; padding: 3rem; text-align: center; margin-bottom: 1.5rem; background: #f8fdff; cursor: pointer;">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <p>Click to browse or drag and drop marks file here</p>
                    <p style="font-size: 0.9rem; color: #666;">Supported formats: Excel (.xlsx, .xls), CSV</p>
                    <input type="file" id="marksFileUpload" accept=".xlsx,.xls,.csv" style="display: none;">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Class *</label>
                        <select class="form-select" id="uploadClass" required>
                            <option value="">-- Select Class --</option>
                            <option value="grade10">Grade 10</option>
                            <option value="grade11">Grade 11</option>
                            <option value="grade12">Grade 12</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Exam Type *</label>
                        <select class="form-select" id="uploadExamType" required>
                            <option value="">-- Select Exam --</option>
                            <option value="midterm">Midterm Exam</option>
                            <option value="final">Final Exam</option>
                            <option value="quiz">Quiz</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" id="uploadDescription" rows="3" 
                              placeholder="Brief description of the marks data..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" id="overwriteExisting">
                        Overwrite existing marks for this exam
                    </label>
                </div>
                
                <div class="upload-instructions" style="background: #fffbf0; padding: 1rem; border-radius: 8px; border-left: 4px solid var(--warning); margin-bottom: 1.5rem;">
                    <h5 style="color: var(--warning); margin-bottom: 0.5rem;">File Format Requirements:</h5>
                    <ul style="margin: 0; padding-left: 1.5rem; color: #666;">
                        <li>First column: Student ID</li>
                        <li>Second column: Student Name</li>
                        <li>Third column: Marks Obtained</li>
                        <li>File should not contain headers</li>
                        <li>Maximum file size: 5MB</li>
                    </ul>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" onclick="closeMarksheetsDynamicContent()" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-upload"></i> Upload Marks
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Add file input handler
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('marksFileUpload');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            uploadArea.querySelector('p').textContent = `Selected: ${this.files[0].name}`;
        }
    });
};

// Helper functions for Marksheets section
window.closeMarksheetsDynamicContent = function() {
    const dynamicContent = document.getElementById('marksheets-dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = '';
    }
};

window.calculateGrade = function(input) {
    const row = input.closest('.table-row');
    const marks = parseFloat(input.value) || 0;
    const maxMarks = parseFloat(document.getElementById('maxMarks').value) || 100;
    const percentage = ((marks / maxMarks) * 100).toFixed(1);
    
    const percentageElement = row.querySelector('.percentage');
    const gradeElement = row.querySelector('.grade');
    
    percentageElement.textContent = percentage + '%';
    
    // Simple grade calculation
    let grade = 'F';
    let color = 'var(--danger)';
    
    if (percentage >= 90) {
        grade = 'A+';
        color = 'var(--success)';
    } else if (percentage >= 80) {
        grade = 'A';
        color = 'var(--success)';
    } else if (percentage >= 70) {
        grade = 'B';
        color = 'var(--warning)';
    } else if (percentage >= 60) {
        grade = 'C';
        color = 'var(--warning)';
    } else if (percentage >= 50) {
        grade = 'D';
        color = 'var(--info)';
    } else if (percentage >= 40) {
        grade = 'E';
        color = 'var(--info)';
    }
    
    gradeElement.textContent = grade;
    gradeElement.style.color = color;
    percentageElement.style.color = color;
};

window.loadStudentsForClass = function() {
    console.log('Loading students for selected class...');
};

window.saveMarks = function(event) {
    event.preventDefault();
    alert('✅ Marks saved successfully!');
    closeMarksheetsDynamicContent();
};

window.filterMarksheets = function() {
    console.log('Filtering marksheets...');
};

window.searchMarksheets = function() {
    console.log('Searching marksheets...');
};

window.viewStudentMarksheet = function(studentId) {
    alert(`Viewing marksheet for student: ${studentId}`);
};

window.downloadMarksheet = function(studentId) {
    alert(`Downloading marksheet for student: ${studentId}`);
};

window.printMarksheet = function(studentId) {
    alert(`Printing marksheet for student: ${studentId}`);
};

window.printAllMarksheets = function() {
    alert('Printing all marksheets...');
};

window.generateReport = function(reportType) {
    alert(`Generating ${reportType} report...`);
};

window.generateCustomReport = function() {
    alert('Opening custom report generator...');
};

window.viewReport = function(reportId) {
    alert(`Viewing report: ${reportId}`);
};

window.downloadReport = function(reportId) {
    alert(`Downloading report: ${reportId}`);
};

window.addGradeItem = function() {
    const container = document.getElementById('gradeScaleItems');
    const newItem = document.createElement('div');
    newItem.className = 'table-row';
    newItem.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 2fr 80px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;';
    newItem.innerHTML = `
        <input type="text" class="form-input" value="B+" placeholder="Grade">
        <input type="number" class="form-input" value="70" min="0" max="100">
        <input type="number" class="form-input" value="79" min="0" max="100">
        <input type="number" class="form-input" value="3.3" step="0.1" min="0">
        <input type="text" class="form-input" value="Good" placeholder="Grade description">
        <button type="button" onclick="removeGradeItem(this)" class="btn btn-danger btn-sm">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(newItem);
};

window.removeGradeItem = function(button) {
    const container = document.getElementById('gradeScaleItems');
    if (container.children.length > 1) {
        button.closest('.table-row').remove();
    } else {
        alert('You must have at least one grade item.');
    }
};

window.saveGradeSystem = function(event) {
    event.preventDefault();
    alert('✅ Grade system saved successfully!');
    closeMarksheetsDynamicContent();
};

window.updateAnalysis = function() {
    console.log('Updating performance analysis...');
};

window.refreshAnalysis = function() {
    alert('Refreshing analysis data...');
};

window.exportAnalysisReport = function() {
    alert('Exporting analysis report...');
};

window.uploadMarksFile = function(event) {
    event.preventDefault();
    alert('✅ Marks file uploaded successfully!');
    closeMarksheetsDynamicContent();
};

// ===== TEACHER APPRAISALS SECTION =====
function loadAppraisalsSection(container) {
    console.log('Loading Teacher Appraisals section...');
    
    // Initialize sample data if not exists
    initializeAppraisalData();
    
    container.innerHTML = `
        <div class="section-content" id="section-appraisals">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-user-check"></i> Teacher Appraisals</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Manage teacher performance evaluations, feedback, and professional development tracking.</p>
                
                <div class="appraisals-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                    <div class="action-card" onclick="showStartAppraisal()">
                        <i class="fas fa-play-circle" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h4>Start Appraisal</h4>
                        <p>Begin new teacher evaluation</p>
                    </div>
                    
                    <div class="action-card" onclick="showOngoingAppraisals()">
                        <i class="fas fa-spinner" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                        <h4>Ongoing Appraisals</h4>
                        <p>View in-progress evaluations</p>
                    </div>
                    
                    <div class="action-card" onclick="showCompletedAppraisals()">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h4>Completed Appraisals</h4>
                        <p>Review finished evaluations</p>
                    </div>
                    
                    <div class="action-card" onclick="showAppraisalTemplates()">
                        <i class="fas fa-copy" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                        <h4>Appraisal Templates</h4>
                        <p>Use evaluation templates</p>
                    </div>
                    
                    <div class="action-card" onclick="showPerformanceTrends()">
                        <i class="fas fa-chart-line" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                        <h4>Performance Trends</h4>
                        <p>Analyze performance data</p>
                    </div>
                    
                    <div class="action-card" onclick="showAppraisalSettings()">
                        <i class="fas fa-cog" style="font-size: 3rem; color: var(--secondary); margin-bottom: 1rem;"></i>
                        <h4>Appraisal Settings</h4>
                        <p>Configure evaluation criteria</p>
                    </div>
                </div>
                
                <div id="appraisals-dynamic-content">
                    <!-- Dynamic content will be loaded here -->
                    <div style="text-align: center; padding: 3rem; color: #999;">
                        <i class="fas fa-user-check" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                        <p>Select an option above to manage teacher appraisals</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    console.log('Teacher Appraisals section loaded successfully');
}

// Initialize sample data
function initializeAppraisalData() {
    if (!localStorage.getItem('ongoingAppraisals')) {
        const sampleAppraisals = [
            {
                id: 'appr_001',
                teacherName: 'Dr. Sarah Johnson',
                type: 'Annual Appraisal',
                startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                dueDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
                progress: 45,
                objectives: 'Comprehensive annual performance review focusing on teaching methodology and student outcomes',
                currentStage: 'Classroom Observation',
                evaluators: ['Head of Department', 'Senior Teacher'],
                department: 'Physics'
            },
            {
                id: 'appr_002',
                teacherName: 'Prof. Michael Chen',
                type: 'Promotion Assessment',
                startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                dueDate: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000).toISOString(),
                progress: 20,
                objectives: 'Assessment for senior lecturer promotion focusing on research and leadership',
                currentStage: 'Document Review',
                evaluators: ['Principal', 'External Evaluator'],
                department: 'Chemistry'
            }
        ];
        localStorage.setItem('ongoingAppraisals', JSON.stringify(sampleAppraisals));
    }

    if (!localStorage.getItem('completedAppraisals')) {
        const sampleCompleted = [
            {
                id: 'comp_001',
                teacherName: 'Dr. Emily Davis',
                type: 'Annual Appraisal',
                completionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                overallRating: 4.7,
                summary: 'Excellent performance across all evaluation criteria with notable achievements in student engagement and research publications.',
                recommendation: 'Promotion Recommended',
                evaluatedBy: 'Head of Department',
                department: 'Biology'
            },
            {
                id: 'comp_002',
                teacherName: 'Mr. Robert Brown',
                type: 'Probation Review',
                completionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                overallRating: 3.8,
                summary: 'Satisfactory performance with areas identified for professional development in classroom management and assessment techniques.',
                recommendation: 'Continue Current Role',
                evaluatedBy: 'Principal',
                department: 'Mathematics'
            }
        ];
        localStorage.setItem('completedAppraisals', JSON.stringify(sampleCompleted));
    }
}

// Start Appraisal Section
window.showStartAppraisal = function() {
    const dynamicContent = document.getElementById('appraisals-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-play-circle"></i> Start New Teacher Appraisal</h3>
                <button onclick="closeAppraisalsDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form id="startAppraisalForm" onsubmit="startAppraisalProcess(event)">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Teacher *</label>
                        <select class="form-select" id="appraisalTeacher" required>
                            <option value="">-- Select Teacher --</option>
                            <option value="sarah_johnson">Dr. Sarah Johnson - Physics</option>
                            <option value="michael_chen">Prof. Michael Chen - Chemistry</option>
                            <option value="emily_davis">Dr. Emily Davis - Biology</option>
                            <option value="robert_brown">Mr. Robert Brown - Mathematics</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Appraisal Type *</label>
                        <select class="form-select" id="appraisalType" required>
                            <option value="">-- Select Type --</option>
                            <option value="annual">Annual Appraisal</option>
                            <option value="probation">Probation Review</option>
                            <option value="promotion">Promotion Assessment</option>
                            <option value="performance">Performance Improvement</option>
                        </select>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Academic Year *</label>
                        <select class="form-select" id="appraisalYear" required>
                            <option value="2024-2025">2024-2025</option>
                            <option value="2025-2026" selected>2025-2026</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Due Date *</label>
                        <input type="date" class="form-input" id="appraisalDueDate" 
                               value="${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Appraisal Template</label>
                    <select class="form-select" id="appraisalTemplate">
                        <option value="">-- Select Template (Optional) --</option>
                        <option value="comprehensive">Comprehensive Evaluation</option>
                        <option value="classroom_observation">Classroom Observation</option>
                        <option value="student_feedback">Student Feedback Focus</option>
                        <option value="professional_growth">Professional Growth</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Appraisal Objectives</label>
                    <textarea class="form-textarea" id="appraisalObjectives" rows="3" 
                              placeholder="Describe the main objectives and focus areas for this appraisal..."></textarea>
                </div>
                
                <div class="evaluators-section">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-users"></i> Appraisal Committee
                    </h4>
                    
                    <div class="evaluators-list" style="margin-bottom: 1.5rem;">
                        <div id="evaluatorItems">
                            <div class="evaluator-item" style="display: grid; grid-template-columns: 2fr 1fr 100px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;">
                                <select class="form-select">
                                    <option value="head_department">Head of Department</option>
                                    <option value="principal">Principal</option>
                                    <option value="senior_teacher">Senior Teacher</option>
                                    <option value="external">External Evaluator</option>
                                </select>
                                <select class="form-select">
                                    <option value="primary">Primary Evaluator</option>
                                    <option value="secondary">Secondary Evaluator</option>
                                    <option value="observer">Observer</option>
                                </select>
                                <button type="button" onclick="removeEvaluator(this)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        
                        <button type="button" onclick="addEvaluator()" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem;">
                            <i class="fas fa-plus"></i> Add Evaluator
                        </button>
                    </div>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" onclick="closeAppraisalsDynamicContent()" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-play"></i> Start Appraisal
                    </button>
                </div>
            </form>
        </div>
    `;
};

// Ongoing Appraisals Section
window.showOngoingAppraisals = function() {
    const appraisals = JSON.parse(localStorage.getItem('ongoingAppraisals')) || [];
    const dynamicContent = document.getElementById('appraisals-dynamic-content');
    
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-spinner"></i> Ongoing Appraisals</h3>
                <div>
                    <button onclick="exportOngoingAppraisals()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button onclick="closeAppraisalsDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            ${appraisals.length === 0 ? 
                '<div class="empty-state" style="text-align: center; padding: 3rem; color: #999;">' +
                    '<i class="fas fa-spinner" style="font-size: 4rem; margin-bottom: 1rem;"></i>' +
                    '<p>No ongoing appraisals found.</p>' +
                    '<button onclick="showStartAppraisal()" class="btn btn-primary">Start First Appraisal</button>' +
                '</div>' :
                `<div class="appraisals-list">
                    ${appraisals.map(appraisal => `
                        <div class="appraisal-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--warning);">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div style="flex: 1;">
                                    <h4 style="color: var(--warning); margin-bottom: 0.5rem;">${appraisal.teacherName} - ${appraisal.type}</h4>
                                    <p style="color: #666; margin-bottom: 0.5rem;">
                                        <strong>Department:</strong> ${appraisal.department} • 
                                        <strong>Started:</strong> ${new Date(appraisal.startDate).toLocaleDateString()} • 
                                        <strong>Due:</strong> ${new Date(appraisal.dueDate).toLocaleDateString()}
                                    </p>
                                    <p style="color: #999; margin-bottom: 0.5rem;">${appraisal.objectives.substring(0, 100)}...</p>
                                    <div style="margin-bottom: 0.5rem;">
                                        <strong>Progress: ${appraisal.progress}%</strong>
                                        <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden; margin-top: 0.5rem;">
                                            <div style="height: 100%; background: var(--warning); width: ${appraisal.progress}%;"></div>
                                        </div>
                                    </div>
                                    <div style="display: flex; gap: 2rem; font-size: 0.9rem;">
                                        <span style="color: #666;">Current Stage: ${appraisal.currentStage}</span>
                                        <span style="color: #666;">Evaluators: ${appraisal.evaluators.length}</span>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                    <button onclick="continueAppraisal('${appraisal.id}')" class="btn btn-primary btn-sm">
                                        <i class="fas fa-edit"></i> Continue
                                    </button>
                                    <button onclick="viewAppraisal('${appraisal.id}')" class="btn btn-info btn-sm">
                                        <i class="fas fa-eye"></i> View
                                    </button>
                                    <button onclick="cancelAppraisal('${appraisal.id}')" class="btn btn-danger btn-sm">
                                        <i class="fas fa-times"></i> Cancel
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

// Completed Appraisals Section
window.showCompletedAppraisals = function() {
    const appraisals = JSON.parse(localStorage.getItem('completedAppraisals')) || [];
    const dynamicContent = document.getElementById('appraisals-dynamic-content');
    
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-check-circle"></i> Completed Appraisals</h3>
                <div>
                    <button onclick="exportCompletedAppraisals()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export All
                    </button>
                    <button onclick="closeAppraisalsDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div class="stat-card" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--primary);">
                    <div style="font-size: 2rem; font-weight: bold; color: var(--primary);">${appraisals.length}</div>
                    <div style="color: #666;">Total Completed</div>
                </div>
                <div class="stat-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--success);">
                    <div style="font-size: 2rem; font-weight: bold; color: var(--success);">${calculateAverageRating(appraisals).toFixed(1)}/5</div>
                    <div style="color: #666;">Average Rating</div>
                </div>
                <div class="stat-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--warning);">
                    <div style="font-size: 2rem; font-weight: bold; color: var(--warning);">${calculateImprovementRate(appraisals)}%</div>
                    <div style="color: #666;">Improvement Rate</div>
                </div>
            </div>
            
            ${appraisals.length === 0 ? 
                '<div class="empty-state" style="text-align: center; padding: 3rem; color: #999;">' +
                    '<i class="fas fa-check-circle" style="font-size: 4rem; margin-bottom: 1rem;"></i>' +
                    '<p>No completed appraisals found.</p>' +
                '</div>' :
                `<div class="appraisals-grid" style="display: grid; gap: 1.5rem;">
                    ${appraisals.map(appraisal => `
                        <div class="appraisal-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--success);">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div style="flex: 1;">
                                    <h4 style="color: var(--success); margin-bottom: 0.5rem;">${appraisal.teacherName} - ${appraisal.type}</h4>
                                    <p style="color: #666; margin-bottom: 0.5rem;">
                                        <strong>Department:</strong> ${appraisal.department} • 
                                        <strong>Completed:</strong> ${new Date(appraisal.completionDate).toLocaleDateString()} • 
                                        <strong>Overall Rating:</strong> 
                                        <span style="color: ${getRatingColor(appraisal.overallRating)}; font-weight: bold;">
                                            ${appraisal.overallRating}/5
                                        </span>
                                    </p>
                                    <p style="color: #999; margin-bottom: 0.5rem;">${appraisal.summary.substring(0, 100)}...</p>
                                    <div style="display: flex; gap: 2rem;">
                                        <div>
                                            <strong>Recommendation:</strong>
                                            <div style="color: ${getRecommendationColor(appraisal.recommendation)}; font-weight: bold;">
                                                ${appraisal.recommendation}
                                            </div>
                                        </div>
                                        <div>
                                            <strong>Evaluated By:</strong>
                                            <div style="color: #666;">${appraisal.evaluatedBy}</div>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                    <button onclick="viewCompletedAppraisal('${appraisal.id}')" class="btn btn-primary btn-sm">
                                        <i class="fas fa-eye"></i> View
                                    </button>
                                    <button onclick="downloadAppraisal('${appraisal.id}')" class="btn btn-success btn-sm">
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

// Appraisal Templates Section
window.showAppraisalTemplates = function() {
    const dynamicContent = document.getElementById('appraisals-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-copy"></i> Appraisal Templates</h3>
                <button onclick="closeAppraisalsDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <div class="templates-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                <div class="template-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px dashed #dee2e6; cursor: pointer;" onclick="useAppraisalTemplate('comprehensive')">
                    <i class="fas fa-clipboard-check" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Comprehensive Evaluation</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Full teacher evaluation covering all performance areas</p>
                    <div class="template-stats" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-list"></i> 8 sections</span>
                        <span style="color: #999;"><i class="fas fa-clock"></i> 45 min</span>
                    </div>
                </div>
                
                <div class="template-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px dashed #dee2e6; cursor: pointer;" onclick="useAppraisalTemplate('classroom')">
                    <i class="fas fa-chalkboard-teacher" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--info); margin-bottom: 0.5rem;">Classroom Observation</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Focus on teaching methodology and classroom management</p>
                    <div class="template-stats" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-list"></i> 5 sections</span>
                        <span style="color: #999;"><i class="fas fa-clock"></i> 30 min</span>
                    </div>
                </div>
                
                <div class="template-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px dashed #dee2e6; cursor: pointer;" onclick="useAppraisalTemplate('student_feedback')">
                    <i class="fas fa-user-graduate" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--success); margin-bottom: 0.5rem;">Student Feedback Focus</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Evaluation based on student feedback and outcomes</p>
                    <div class="template-stats" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-list"></i> 6 sections</span>
                        <span style="color: #999;"><i class="fas fa-clock"></i> 35 min</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Performance Trends Section
window.showPerformanceTrends = function() {
    const dynamicContent = document.getElementById('appraisals-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-chart-line"></i> Performance Trends</h3>
                <div>
                    <button onclick="exportTrendsReport()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button onclick="closeAppraisalsDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="trends-filters" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 1rem; align-items: end;">
                    <div class="form-group">
                        <label class="form-label">Department</label>
                        <select class="form-select" onchange="updateTrends()">
                            <option value="all">All Departments</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="biology">Biology</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Time Period</label>
                        <select class="form-select" onchange="updateTrends()">
                            <option value="current_year">Current Year</option>
                            <option value="last_year">Last Year</option>
                            <option value="last_2_years">Last 2 Years</option>
                        </select>
                    </div>
                    <button onclick="refreshTrends()" class="btn btn-primary btn-sm">
                        <i class="fas fa-sync-alt"></i> Refresh
                    </button>
                </div>
            </div>
            
            <div class="trends-stats" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="stat-card" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">4.2/5</div>
                        <div style="color: #666;">Average Rating</div>
                    </div>
                    <div class="stat-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--success);">12%</div>
                        <div style="color: #666;">Improvement Rate</div>
                    </div>
                    <div class="stat-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--warning);">85%</div>
                        <div style="color: #666;">Satisfactory+</div>
                    </div>
                    <div class="stat-card" style="background: #fff5f5; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--danger);">8%</div>
                        <div style="color: #666;">Need Improvement</div>
                    </div>
                </div>
            </div>
            
            <div class="department-comparison">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Department Comparison</h4>
                <div class="comparison-list">
                    <div class="department-item">
                        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="font-weight: bold;">Physics Department</span>
                            <span style="color: var(--success);">4.5/5</span>
                        </div>
                        <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; background: var(--success); width: 90%;"></div>
                        </div>
                    </div>
                    
                    <div class="department-item" style="margin-top: 1rem;">
                        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="font-weight: bold;">Chemistry Department</span>
                            <span style="color: var(--info);">4.3/5</span>
                        </div>
                        <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; background: var(--info); width: 86%;"></div>
                        </div>
                    </div>
                    
                    <div class="department-item" style="margin-top: 1rem;">
                        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="font-weight: bold;">Biology Department</span>
                            <span style="color: var(--warning);">4.1/5</span>
                        </div>
                        <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; background: var(--warning); width: 82%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Appraisal Settings Section
window.showAppraisalSettings = function() {
    const dynamicContent = document.getElementById('appraisals-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-cog"></i> Appraisal Settings</h3>
                <button onclick="closeAppraisalsDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form id="appraisalSettingsForm" onsubmit="saveAppraisalSettings(event)">
                <div class="settings-section" style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-sliders-h"></i> Rating Scale
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div class="form-group">
                            <label class="form-label">Rating System</label>
                            <select class="form-select" id="ratingSystem">
                                <option value="5_point">5-Point Scale (1-5)</option>
                                <option value="10_point">10-Point Scale (1-10)</option>
                                <option value="percentage">Percentage (0-100%)</option>
                                <option value="descriptive">Descriptive (Poor to Excellent)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Minimum Satisfactory Rating</label>
                            <input type="number" class="form-input" id="minSatisfactory" value="3" min="1" max="5" step="0.1">
                        </div>
                    </div>
                </div>
                
                <div class="settings-section" style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-bell"></i> Notification Settings
                    </h4>
                    
                    <div class="notification-settings">
                        <div class="form-group">
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" id="notifyDueAppraisals" checked>
                                Notify about due appraisals
                            </label>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" id="notifyCompletion" checked>
                                Notify when appraisals are completed
                            </label>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" id="notifyLowRatings">
                                Notify about low ratings
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="settings-section" style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-user-clock"></i> Appraisal Schedule
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div class="form-group">
                            <label class="form-label">Annual Appraisal Period</label>
                            <select class="form-select" id="appraisalPeriod">
                                <option value="jan_mar">January - March</option>
                                <option value="apr_jun" selected>April - June</option>
                                <option value="jul_sep">July - September</option>
                                <option value="oct_dec">October - December</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Default Appraisal Duration (days)</label>
                            <input type="number" class="form-input" id="appraisalDuration" value="30" min="7" max="90">
                        </div>
                    </div>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" onclick="closeAppraisalsDynamicContent()" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Settings
                    </button>
                </div>
            </form>
        </div>
    `;
};

// ===== HELPER FUNCTIONS =====

// Close dynamic content
window.closeAppraisalsDynamicContent = function() {
    const dynamicContent = document.getElementById('appraisals-dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = '<div style="text-align: center; padding: 3rem; color: #999;"><i class="fas fa-user-check" style="font-size: 4rem; margin-bottom: 1rem;"></i><p>Select an option above to manage teacher appraisals</p></div>';
    }
};

// Evaluator management
window.addEvaluator = function() {
    const container = document.getElementById('evaluatorItems');
    const newItem = document.createElement('div');
    newItem.className = 'evaluator-item';
    newItem.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 100px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;';
    newItem.innerHTML = `
        <select class="form-select">
            <option value="head_department">Head of Department</option>
            <option value="principal">Principal</option>
            <option value="senior_teacher">Senior Teacher</option>
            <option value="external">External Evaluator</option>
        </select>
        <select class="form-select">
            <option value="primary">Primary Evaluator</option>
            <option value="secondary">Secondary Evaluator</option>
            <option value="observer">Observer</option>
        </select>
        <button type="button" onclick="removeEvaluator(this)" class="btn btn-danger btn-sm">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(newItem);
};

window.removeEvaluator = function(button) {
    const container = document.getElementById('evaluatorItems');
    if (container.children.length > 1) {
        button.closest('.evaluator-item').remove();
    } else {
        alert('You must have at least one evaluator.');
    }
};

// Form submission handlers
window.startAppraisalProcess = function(event) {
    event.preventDefault();
    
    const teacherSelect = document.getElementById('appraisalTeacher');
    const type = document.getElementById('appraisalType').value;
    const year = document.getElementById('appraisalYear').value;
    const dueDate = document.getElementById('appraisalDueDate').value;
    const template = document.getElementById('appraisalTemplate').value;
    const objectives = document.getElementById('appraisalObjectives').value;
    
    // Get evaluators
    const evaluators = [];
    document.querySelectorAll('#evaluatorItems .evaluator-item').forEach(item => {
        const role = item.querySelector('select:first-child').value;
        evaluators.push(role);
    });
    
    const newAppraisal = {
        id: 'appr_' + Date.now(),
        teacherName: teacherSelect.options[teacherSelect.selectedIndex].text,
        type: type,
        startDate: new Date().toISOString(),
        dueDate: dueDate,
        progress: 0,
        objectives: objectives,
        currentStage: 'Initial Setup',
        evaluators: evaluators,
        template: template,
        academicYear: year,
        department: teacherSelect.options[teacherSelect.selectedIndex].text.includes('Physics') ? 'Physics' : 
                   teacherSelect.options[teacherSelect.selectedIndex].text.includes('Chemistry') ? 'Chemistry' :
                   teacherSelect.options[teacherSelect.selectedIndex].text.includes('Biology') ? 'Biology' : 'Mathematics'
    };
    
    // Save to ongoing appraisals
    let ongoingAppraisals = JSON.parse(localStorage.getItem('ongoingAppraisals')) || [];
    ongoingAppraisals.push(newAppraisal);
    localStorage.setItem('ongoingAppraisals', JSON.stringify(ongoingAppraisals));
    
    alert('✅ Appraisal process started successfully!');
    closeAppraisalsDynamicContent();
    showOngoingAppraisals();
};

// Appraisal actions
window.continueAppraisal = function(appraisalId) {
    alert(`Continuing appraisal: ${appraisalId}\n\nThis would open the appraisal form for completion.`);
};

window.viewAppraisal = function(appraisalId) {
    const ongoingAppraisals = JSON.parse(localStorage.getItem('ongoingAppraisals')) || [];
    const appraisal = ongoingAppraisals.find(a => a.id === appraisalId);
    
    if (appraisal) {
        alert(`Viewing Appraisal: ${appraisal.teacherName}\nType: ${appraisal.type}\nProgress: ${appraisal.progress}%\nCurrent Stage: ${appraisal.currentStage}`);
    }
};

window.viewCompletedAppraisal = function(appraisalId) {
    const completedAppraisals = JSON.parse(localStorage.getItem('completedAppraisals')) || [];
    const appraisal = completedAppraisals.find(a => a.id === appraisalId);
    
    if (appraisal) {
        alert(`Viewing Completed Appraisal: ${appraisal.teacherName}\nRating: ${appraisal.overallRating}/5\nRecommendation: ${appraisal.recommendation}`);
    }
};

window.cancelAppraisal = function(appraisalId) {
    if (confirm('Are you sure you want to cancel this appraisal? This action cannot be undone.')) {
        let ongoingAppraisals = JSON.parse(localStorage.getItem('ongoingAppraisals')) || [];
        ongoingAppraisals = ongoingAppraisals.filter(a => a.id !== appraisalId);
        localStorage.setItem('ongoingAppraisals', JSON.stringify(ongoingAppraisals));
        
        alert('✅ Appraisal cancelled successfully!');
        showOngoingAppraisals();
    }
};

window.downloadAppraisal = function(appraisalId) {
    alert(`Downloading appraisal report for ID: ${appraisalId}`);
};

// Template functions
window.useAppraisalTemplate = function(templateId) {
    alert(`Using appraisal template: ${templateId}\n\nThis would pre-fill the appraisal form with template criteria.`);
    showStartAppraisal();
};

// Settings functions
window.saveAppraisalSettings = function(event) {
    event.preventDefault();
    alert('✅ Appraisal settings saved successfully!');
    closeAppraisalsDynamicContent();
};

// Export functions
window.exportOngoingAppraisals = function() {
    alert('Exporting ongoing appraisals data...');
};

window.exportCompletedAppraisals = function() {
    alert('Exporting completed appraisals data...');
};

window.exportTrendsReport = function() {
    alert('Exporting performance trends report...');
};

// Trends functions
window.updateTrends = function() {
    console.log('Updating performance trends...');
};

window.refreshTrends = function() {
    alert('Refreshing trends data...');
};

// Calculation helper functions
window.calculateAverageRating = function(appraisals) {
    if (!appraisals || appraisals.length === 0) return 0;
    
    const total = appraisals.reduce((sum, appraisal) => sum + appraisal.overallRating, 0);
    return total / appraisals.length;
};

window.calculateImprovementRate = function(appraisals) {
    return appraisals.length > 0 ? 12 : 0;
};

window.getRatingColor = function(rating) {
    if (rating >= 4.5) return 'var(--success)';
    if (rating >= 4.0) return 'var(--info)';
    if (rating >= 3.5) return 'var(--warning)';
    return 'var(--danger)';
};

window.getRecommendationColor = function(recommendation) {
    switch(recommendation) {
        case 'Promotion Recommended':
            return 'var(--success)';
        case 'Continue Current Role':
            return 'var(--info)';
        case 'Development Needed':
            return 'var(--warning)';
        case 'Performance Improvement Plan':
            return 'var(--danger)';
        default:
            return '#666';
    }
};

// ===== INVENTORY SECTION =====
function loadInventorySection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-inventory">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-boxes"></i> Department Inventory</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Manage laboratory equipment, supplies, and inventory tracking across all departments.</p>
                
                <div class="inventory-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                    <div class="action-card" onclick="showInventoryOverview()">
                        <i class="fas fa-chart-bar" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h4>Inventory Overview</h4>
                        <p>View inventory status and analytics</p>
                    </div>
                    
                    <div class="action-card" onclick="showAddItem()">
                        <i class="fas fa-plus-circle" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                        <h4>Add New Item</h4>
                        <p>Add items to inventory</p>
                    </div>
                    
                    <div class="action-card" onclick="showManageInventory()">
                        <i class="fas fa-edit" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h4>Manage Inventory</h4>
                        <p>Update and manage items</p>
                    </div>
                    
                    <div class="action-card" onclick="showCheckInOut()">
                        <i class="fas fa-exchange-alt" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                        <h4>Check In/Out</h4>
                        <p>Track item movements</p>
                    </div>
                    
                    <div class="action-card" onclick="showInventoryReports()">
                        <i class="fas fa-file-alt" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                        <h4>Inventory Reports</h4>
                        <p>Generate inventory reports</p>
                    </div>
                    
                    <div class="action-card" onclick="showSupplierManagement()">
                        <i class="fas fa-truck" style="font-size: 3rem; color: var(--secondary); margin-bottom: 1rem;"></i>
                        <h4>Supplier Management</h4>
                        <p>Manage suppliers and orders</p>
                    </div>
                </div>
                
                <div id="inventory-dynamic-content"></div>
            </div>
        </div>
    `;
}

// Inventory Overview Section
window.showInventoryOverview = function() {
    const dynamicContent = document.getElementById('inventory-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-chart-bar"></i> Inventory Overview</h3>
                <div>
                    <button onclick="refreshInventoryData()" class="btn btn-success btn-sm">
                        <i class="fas fa-sync-alt"></i> Refresh
                    </button>
                    <button onclick="closeInventoryDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="inventory-summary" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="summary-card" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--primary);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">1,247</div>
                        <div style="color: #666;">Total Items</div>
                    </div>
                    <div class="summary-card" style="background: #fffbf0; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--warning);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--warning);">$125,680</div>
                        <div style="color: #666;">Total Value</div>
                    </div>
                    <div class="summary-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--success);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--success);">45</div>
                        <div style="color: #666;">Low Stock Items</div>
                    </div>
                    <div class="summary-card" style="background: #fff5f5; padding: 1.5rem; border-radius: 8px; text-align: center; border-left: 4px solid var(--danger);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--danger);">12</div>
                        <div style="color: #666;">Out of Stock</div>
                    </div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div class="department-inventory">
                    <h4 style="color: var(--primary); margin-bottom: 1rem;">Department-wise Inventory</h4>
                    <div class="department-list">
                        <div class="department-item">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                                <span style="font-weight: bold;">Physics Department</span>
                                <span style="color: var(--success);">425 items</span>
                            </div>
                            <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; background: var(--success); width: 34%;"></div>
                            </div>
                            <div style="display: flex; justify-content: between; font-size: 0.8rem; color: #666; margin-top: 0.25rem;">
                                <span>Value: $45,200</span>
                                <span>34% of total</span>
                            </div>
                        </div>
                        
                        <div class="department-item" style="margin-top: 1rem;">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                                <span style="font-weight: bold;">Chemistry Department</span>
                                <span style="color: var(--info);">380 items</span>
                            </div>
                            <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; background: var(--info); width: 30%;"></div>
                            </div>
                            <div style="display: flex; justify-content: between; font-size: 0.8rem; color: #666; margin-top: 0.25rem;">
                                <span>Value: $52,150</span>
                                <span>30% of total</span>
                            </div>
                        </div>
                        
                        <div class="department-item" style="margin-top: 1rem;">
                            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                                <span style="font-weight: bold;">Biology Department</span>
                                <span style="color: var(--warning);">320 items</span>
                            </div>
                            <div class="progress" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; background: var(--warning); width: 26%;"></div>
                            </div>
                            <div style="display: flex; justify-content: between; font-size: 0.8rem; color: #666; margin-top: 0.25rem;">
                                <span>Value: $28,330</span>
                                <span>26% of total</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="category-breakdown">
                    <h4 style="color: var(--primary); margin-bottom: 1rem;">Inventory by Category</h4>
                    <div class="category-list">
                        <div class="category-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Laboratory Equipment</span>
                            <span style="font-weight: bold; color: var(--primary);">185 items</span>
                        </div>
                        <div class="category-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Chemical Supplies</span>
                            <span style="font-weight: bold; color: var(--info);">420 items</span>
                        </div>
                        <div class="category-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Glassware</span>
                            <span style="font-weight: bold; color: var(--success);">315 items</span>
                        </div>
                        <div class="category-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; margin-bottom: 0.5rem;">
                            <span>Safety Equipment</span>
                            <span style="font-weight: bold; color: var(--warning);">127 items</span>
                        </div>
                        <div class="category-item" style="display: flex; justify-content: between; align-items: center; padding: 0.75rem; background: #f8f9fa; border-radius: 6px;">
                            <span>Teaching Aids</span>
                            <span style="font-weight: bold; color: var(--danger);">200 items</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="low-stock-alerts">
                <h4 style="color: var(--danger); margin-bottom: 1rem;">
                    <i class="fas fa-exclamation-triangle"></i> Low Stock Alerts
                </h4>
                <div class="alerts-list">
                    <div class="alert-item" style="display: flex; align-items: center; padding: 1rem; background: #fff5f5; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="background: var(--danger); color: white; padding: 0.5rem; border-radius: 50%; margin-right: 1rem;">
                            <i class="fas fa-exclamation"></i>
                        </div>
                        <div style="flex: 1;">
                            <strong>Beakers (250ml)</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Physics Department • Current: 5 • Minimum: 20</p>
                        </div>
                        <span style="color: var(--danger); font-weight: bold;">Critical</span>
                    </div>
                    
                    <div class="alert-item" style="display: flex; align-items: center; padding: 1rem; background: #fffbf0; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="background: var(--warning); color: white; padding: 0.5rem; border-radius: 50%; margin-right: 1rem;">
                            <i class="fas fa-exclamation"></i>
                        </div>
                        <div style="flex: 1;">
                            <strong>Hydrochloric Acid</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Chemistry Department • Current: 8 • Minimum: 15</p>
                        </div>
                        <span style="color: var(--warning); font-weight: bold;">Low</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Add New Item Section
window.showAddItem = function() {
    const dynamicContent = document.getElementById('inventory-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-plus-circle"></i> Add New Inventory Item</h3>
                <button onclick="closeInventoryDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form id="addItemForm" onsubmit="saveInventoryItem(event)">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Item Name *</label>
                        <input type="text" class="form-input" id="itemName" required 
                               placeholder="e.g., Digital Microscope">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Category *</label>
                        <select class="form-select" id="itemCategory" required>
                            <option value="">-- Select Category --</option>
                            <option value="equipment">Laboratory Equipment</option>
                            <option value="chemicals">Chemical Supplies</option>
                            <option value="glassware">Glassware</option>
                            <option value="safety">Safety Equipment</option>
                            <option value="teaching">Teaching Aids</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Department *</label>
                        <select class="form-select" id="itemDepartment" required>
                            <option value="">-- Select Department --</option>
                            <option value="physics">Physics Department</option>
                            <option value="chemistry">Chemistry Department</option>
                            <option value="biology">Biology Department</option>
                            <option value="general">General Science</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Location *</label>
                        <input type="text" class="form-input" id="itemLocation" required 
                               placeholder="e.g., Physics Lab 1, Shelf B">
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Quantity *</label>
                        <input type="number" class="form-input" id="itemQuantity" value="1" min="1" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Unit Price ($)</label>
                        <input type="number" class="form-input" id="itemPrice" step="0.01" min="0" 
                               placeholder="0.00">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Minimum Stock Level</label>
                        <input type="number" class="form-input" id="minStock" value="5" min="1">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Supplier Information</label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <input type="text" class="form-input" placeholder="Supplier Name">
                        <input type="text" class="form-input" placeholder="Supplier Contact">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Item Description</label>
                    <textarea class="form-textarea" id="itemDescription" rows="3" 
                              placeholder="Detailed description of the item, specifications, and usage..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Additional Notes</label>
                    <textarea class="form-textarea" id="itemNotes" rows="2" 
                              placeholder="Any special handling instructions or notes..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="checkbox-label" style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" id="requiresMaintenance">
                        Item requires regular maintenance
                    </label>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" onclick="closeInventoryDynamicContent()" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Add Item
                    </button>
                </div>
            </form>
        </div>
    `;
};

// Manage Inventory Section
window.showManageInventory = function() {
    const items = JSON.parse(localStorage.getItem('inventoryItems')) || [];
    const dynamicContent = document.getElementById('inventory-dynamic-content');
    
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-edit"></i> Manage Inventory</h3>
                <div>
                    <button onclick="exportInventory()" class="btn btn-success btn-sm">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button onclick="closeInventoryDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="search-filters" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 1rem; align-items: end;">
                    <div class="form-group">
                        <label class="form-label">Department</label>
                        <select class="form-select" onchange="filterInventory()">
                            <option value="">All Departments</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="biology">Biology</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select class="form-select" onchange="filterInventory()">
                            <option value="">All Categories</option>
                            <option value="equipment">Equipment</option>
                            <option value="chemicals">Chemicals</option>
                            <option value="glassware">Glassware</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Stock Status</label>
                        <select class="form-select" onchange="filterInventory()">
                            <option value="">All Items</option>
                            <option value="low">Low Stock</option>
                            <option value="out">Out of Stock</option>
                            <option value="adequate">Adequate Stock</option>
                        </select>
                    </div>
                    <button onclick="searchInventory()" class="btn btn-primary btn-sm">
                        <i class="fas fa-search"></i> Search
                    </button>
                </div>
            </div>
            
            ${items.length === 0 ? 
                '<div class="empty-state" style="text-align: center; padding: 3rem; color: #999;">' +
                    '<i class="fas fa-box-open" style="font-size: 4rem; margin-bottom: 1rem;"></i>' +
                    '<p>No inventory items found.</p>' +
                    '<button onclick="showAddItem()" class="btn btn-primary">Add First Item</button>' +
                '</div>' :
                `<div class="inventory-table">
                    <div class="table-header" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 120px; gap: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px 8px 0 0; font-weight: bold;">
                        <div>Item Name</div>
                        <div>Category</div>
                        <div>Department</div>
                        <div>Quantity</div>
                        <div>Location</div>
                        <div>Status</div>
                        <div>Actions</div>
                    </div>
                    
                    ${items.map(item => `
                        <div class="table-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 120px; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;">
                            <div>
                                <strong>${item.name}</strong>
                                <div style="font-size: 0.8rem; color: #666;">${item.description.substring(0, 30)}...</div>
                            </div>
                            <div>${getCategoryLabel(item.category)}</div>
                            <div>${getDepartmentLabel(item.department)}</div>
                            <div>
                                <span style="font-weight: bold; color: ${getStockColor(item.quantity, item.minStock)};">
                                    ${item.quantity}
                                </span>
                                ${item.quantity <= item.minStock ? 
                                    `<div style="font-size: 0.7rem; color: var(--danger);">Min: ${item.minStock}</div>` : 
                                    ''
                                }
                            </div>
                            <div style="font-size: 0.9rem; color: #666;">${item.location}</div>
                            <div>
                                <span style="background: ${getStatusColor(item.quantity, item.minStock)}; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
                                    ${getStockStatus(item.quantity, item.minStock)}
                                </span>
                            </div>
                            <div style="display: flex; gap: 0.25rem;">
                                <button onclick="editItem('${item.id}')" class="btn btn-primary btn-sm">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="viewItem('${item.id}')" class="btn btn-info btn-sm">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="deleteItem('${item.id}')" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>`
            }
        </div>
    `;
};

// Check In/Out Section
window.showCheckInOut = function() {
    const dynamicContent = document.getElementById('inventory-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-exchange-alt"></i> Item Check In/Out</h3>
                <div>
                    <button onclick="showCheckoutHistory()" class="btn btn-info btn-sm">
                        <i class="fas fa-history"></i> History
                    </button>
                    <button onclick="closeInventoryDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="checkinout-tabs" style="margin-bottom: 2rem;">
                <div class="tabs" style="display: flex; border-bottom: 2px solid #eee;">
                    <button class="tab-btn active" onclick="switchCheckTab('checkout')" style="padding: 0.75rem 1.5rem; border: none; background: none; border-bottom: 3px solid var(--warning);">
                        Check Out Item
                    </button>
                    <button class="tab-btn" onclick="switchCheckTab('checkin')" style="padding: 0.75rem 1.5rem; border: none; background: none;">
                        Check In Item
                    </button>
                </div>
            </div>
            
            <div id="check-tab-content">
                <form id="checkoutForm" onsubmit="processCheckout(event)">
                    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                        <div class="form-group">
                            <label class="form-label">Select Item *</label>
                            <select class="form-select" id="checkoutItem" required>
                                <option value="">-- Select Item --</option>
                                <option value="microscope_001">Digital Microscope - Physics Lab</option>
                                <option value="beaker_250ml">Beaker 250ml - Chemistry Lab</option>
                                <option value="thermometer">Digital Thermometer - Biology Lab</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Quantity *</label>
                            <input type="number" class="form-input" id="checkoutQuantity" value="1" min="1" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Available Stock</label>
                            <div style="padding: 0.5rem; background: #f8f9fa; border-radius: 4px; text-align: center; font-weight: bold; color: var(--success);">
                                15
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                        <div class="form-group">
                            <label class="form-label">Borrower *</label>
                            <select class="form-select" id="borrower" required>
                                <option value="">-- Select Borrower --</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                                <option value="staff">Staff</option>
                                <option value="external">External User</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Borrower Name *</label>
                            <input type="text" class="form-input" id="borrowerName" required 
                                   placeholder="Full name of borrower">
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                        <div class="form-group">
                            <label class="form-label">Check-out Date *</label>
                            <input type="date" class="form-input" id="checkoutDate" 
                                   value="${new Date().toISOString().split('T')[0]}" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Expected Return Date *</label>
                            <input type="date" class="form-input" id="expectedReturn" 
                                   value="${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Purpose of Use</label>
                        <textarea class="form-textarea" id="checkoutPurpose" rows="2" 
                                  placeholder="Describe the purpose for borrowing this item..."></textarea>
                    </div>
                    
                    <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                        <button type="button" onclick="closeInventoryDynamicContent()" class="btn btn-secondary">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                        <button type="submit" class="btn btn-warning">
                            <i class="fas fa-sign-out-alt"></i> Check Out
                        </button>
                    </div>
                </form>
            </div>
            
            <div class="current-checkouts" style="margin-top: 2rem;">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Currently Checked Out Items</h4>
                <div class="checkouts-list">
                    <div class="checkout-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="flex: 1;">
                            <strong>Digital Microscope</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">
                                Borrowed by: Dr. Sarah Johnson • Due: ${new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                        </div>
                        <span style="color: var(--warning); font-weight: bold;">Due in 2 days</span>
                    </div>
                    
                    <div class="checkout-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <div style="flex: 1;">
                            <strong>Beaker Set (250ml)</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">
                                Borrowed by: Prof. Michael Chen • Due: ${new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                        </div>
                        <span style="color: var(--danger); font-weight: bold;">Overdue</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Inventory Reports Section
window.showInventoryReports = function() {
    const dynamicContent = document.getElementById('inventory-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-file-alt"></i> Inventory Reports</h3>
                <div>
                    <button onclick="generateCustomReport()" class="btn btn-primary btn-sm">
                        <i class="fas fa-plus"></i> Custom Report
                    </button>
                    <button onclick="closeInventoryDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="reports-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('stock_status')">
                    <i class="fas fa-boxes" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Stock Status Report</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Current stock levels and status overview</p>
                    <div class="report-info" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 1 day ago</span>
                    </div>
                </div>
                
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('low_stock')">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--warning); margin-bottom: 0.5rem;">Low Stock Alert</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Items below minimum stock levels</p>
                    <div class="report-info" style="display: flex; justify-content; center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 2 days ago</span>
                    </div>
                </div>
                
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('movement')">
                    <i class="fas fa-exchange-alt" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--info); margin-bottom: 0.5rem;">Movement Report</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Item check-in/out activity</p>
                    <div class="report-info" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 3 days ago</span>
                    </div>
                </div>
                
                <div class="report-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; cursor: pointer;" onclick="generateReport('valuation')">
                    <i class="fas fa-dollar-sign" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                    <h4 style="color: var(--success); margin-bottom: 0.5rem;">Valuation Report</h4>
                    <p style="color: #666; margin-bottom: 1rem;">Total inventory value and depreciation</p>
                    <div class="report-info" style="display: flex; justify-content: center; gap: 1rem;">
                        <span style="color: #999;"><i class="fas fa-clock"></i> Last run: 1 week ago</span>
                    </div>
                </div>
            </div>
            
            <div class="recent-reports">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Recent Reports</h4>
                <div class="reports-list">
                    <div class="report-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div>
                            <strong>Monthly Stock Status - March 2025</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Generated on March 31, 2025</p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="viewReport('stock_mar_2025')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="downloadReport('stock_mar_2025')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i> PDF
                            </button>
                        </div>
                    </div>
                    
                    <div class="report-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div>
                            <strong>Low Stock Alert Report</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">Generated on March 28, 2025</p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="viewReport('low_stock_alert')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="downloadReport('low_stock_alert')" class="btn btn-success btn-sm">
                                <i class="fas fa-download"></i> PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Supplier Management Section
window.showSupplierManagement = function() {
    const dynamicContent = document.getElementById('inventory-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-truck"></i> Supplier Management</h3>
                <div>
                    <button onclick="addNewSupplier()" class="btn btn-primary btn-sm">
                        <i class="fas fa-plus"></i> New Supplier
                    </button>
                    <button onclick="closeInventoryDynamicContent()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
            
            <div class="suppliers-list">
                <div class="supplier-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--primary);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Science Equipment Ltd.</h4>
                            <p style="color: #666; margin-bottom: 0.5rem;">
                                <strong>Contact:</strong> John Smith • 
                                <strong>Phone:</strong> (555) 123-4567 • 
                                <strong>Email:</strong> john@scienceequip.com
                            </p>
                            <p style="color: #999; margin-bottom: 0.5rem;">Specializes in laboratory equipment and scientific instruments</p>
                            <div style="display: flex; gap: 2rem;">
                                <div>
                                    <strong>Items Supplied:</strong>
                                    <div style="color: #666;">25 items</div>
                                </div>
                                <div>
                                    <strong>Last Order:</strong>
                                    <div style="color: #666;">${new Date().toLocaleDateString()}</div>
                                </div>
                                <div>
                                    <strong>Rating:</strong>
                                    <div style="color: var(--success); font-weight: bold;">4.8/5</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <button onclick="viewSupplier('supplier_001')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="placeOrder('supplier_001')" class="btn btn-success btn-sm">
                                <i class="fas fa-shopping-cart"></i> Order
                            </button>
                            <button onclick="editSupplier('supplier_001')" class="btn btn-warning btn-sm">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="supplier-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--info);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--info); margin-bottom: 0.5rem;">Chemical Supplies Inc.</h4>
                            <p style="color: #666; margin-bottom: 0.5rem;">
                                <strong>Contact:</strong> Maria Garcia • 
                                <strong>Phone:</strong> (555) 987-6543 • 
                                <strong>Email:</strong> maria@chemsupplies.com
                            </p>
                            <p style="color: #999; margin-bottom: 0.5rem;">Chemical reagents, solvents, and laboratory consumables</p>
                            <div style="display: flex; gap: 2rem;">
                                <div>
                                    <strong>Items Supplied:</strong>
                                    <div style="color: #666;">42 items</div>
                                </div>
                                <div>
                                    <strong>Last Order:</strong>
                                    <div style="color: #666;">${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                                </div>
                                <div>
                                    <strong>Rating:</strong>
                                    <div style="color: var(--success); font-weight: bold;">4.6/5</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <button onclick="viewSupplier('supplier_002')" class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="placeOrder('supplier_002')" class="btn btn-success btn-sm">
                                <i class="fas fa-shopping-cart"></i> Order
                            </button>
                            <button onclick="editSupplier('supplier_002')" class="btn btn-warning btn-sm">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="pending-orders" style="margin-top: 2rem;">
                <h4 style="color: var(--primary); margin-bottom: 1rem;">Pending Orders</h4>
                <div class="orders-list">
                    <div class="order-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #fffbf0; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="flex: 1;">
                            <strong>Order #ORD-2025-001</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">
                                Science Equipment Ltd. • 15 items • Total: $2,450 • Ordered: ${new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                        </div>
                        <span style="color: var(--warning); font-weight: bold;">Processing</span>
                    </div>
                    
                    <div class="order-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #fffbf0; border-radius: 8px;">
                        <div style="flex: 1;">
                            <strong>Order #ORD-2025-002</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">
                                Chemical Supplies Inc. • 8 items • Total: $1,280 • Ordered: ${new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                        </div>
                        <span style="color: var(--info); font-weight: bold;">Confirmed</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Helper functions for Inventory section
window.closeInventoryDynamicContent = function() {
    const dynamicContent = document.getElementById('inventory-dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = '';
    }
};

window.saveInventoryItem = function(event) {
    event.preventDefault();
    alert('✅ Inventory item added successfully!');
    closeInventoryDynamicContent();
};

window.filterInventory = function() {
    console.log('Filtering inventory...');
};

window.searchInventory = function() {
    console.log('Searching inventory...');
};

window.editItem = function(itemId) {
    alert(`Editing item: ${itemId}`);
};

window.viewItem = function(itemId) {
    alert(`Viewing item: ${itemId}`);
};

window.deleteItem = function(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        alert(`Item ${itemId} deleted.`);
    }
};

window.switchCheckTab = function(tab) {
    console.log('Switching to tab:', tab);
};

window.processCheckout = function(event) {
    event.preventDefault();
    alert('✅ Item checked out successfully!');
    closeInventoryDynamicContent();
};

window.showCheckoutHistory = function() {
    alert('Showing checkout history...');
};

window.generateReport = function(reportType) {
    alert(`Generating ${reportType} report...`);
};

window.generateCustomReport = function() {
    alert('Opening custom report generator...');
};

window.viewReport = function(reportId) {
    alert(`Viewing report: ${reportId}`);
};

window.downloadReport = function(reportId) {
    alert(`Downloading report: ${reportId}`);
};

window.addNewSupplier = function() {
    alert('Adding new supplier...');
};

window.viewSupplier = function(supplierId) {
    alert(`Viewing supplier: ${supplierId}`);
};

window.placeOrder = function(supplierId) {
    alert(`Placing order with supplier: ${supplierId}`);
};

window.editSupplier = function(supplierId) {
    alert(`Editing supplier: ${supplierId}`);
};

window.exportInventory = function() {
    alert('Exporting inventory data...');
};

window.refreshInventoryData = function() {
    alert('Refreshing inventory data...');
};

// Helper functions for inventory management
window.getCategoryLabel = function(category) {
    const categories = {
        'equipment': 'Equipment',
        'chemicals': 'Chemicals',
        'glassware': 'Glassware',
        'safety': 'Safety',
        'teaching': 'Teaching Aids',
        'other': 'Other'
    };
    return categories[category] || category;
};

window.getDepartmentLabel = function(department) {
    const departments = {
        'physics': 'Physics',
        'chemistry': 'Chemistry',
        'biology': 'Biology',
        'general': 'General'
    };
    return departments[department] || department;
};

window.getStockColor = function(quantity, minStock) {
    if (quantity === 0) return 'var(--danger)';
    if (quantity <= minStock) return 'var(--warning)';
    return 'var(--success)';
};

window.getStatusColor = function(quantity, minStock) {
    if (quantity === 0) return 'var(--danger)';
    if (quantity <= minStock) return 'var(--warning)';
    return 'var(--success)';
};

window.getStockStatus = function(quantity, minStock) {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= minStock) return 'Low Stock';
    return 'In Stock';
};

// ===== SUBJECT RESOURCES SECTION =====
function loadSubjectResourcesSection(container) {
    console.log('🔍 Loading Subject Resources section...');
    
    container.innerHTML = `
        <div class="section-content" id="section-subject-resources">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-book-open"></i> Subject Resources</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Access curriculum materials, lesson plans, and teaching resources organized by subject.</p>
                
                <div class="resources-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                    <div class="action-card" onclick="showCurriculumResources()">
                        <i class="fas fa-graduation-cap" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h4>Curriculum</h4>
                        <p>Schemes of work and curriculum planning</p>
                    </div>
                    
                    <div class="action-card" onclick="showAllSubjects()">
                        <i class="fas fa-atom" style="font-size: 3rem; color: var(--info); margin-bottom: 1rem;"></i>
                        <h4>All Subjects</h4>
                        <p>Browse resources by subject</p>
                    </div>
                    
                    <div class="action-card" onclick="showUploadResources()">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h4>Upload Resources</h4>
                        <p>Share new teaching materials</p>
                    </div>
                    
                    <div class="action-card" onclick="showResourceSearch()">
                        <i class="fas fa-search" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
                        <h4>Search Resources</h4>
                        <p>Find specific materials</p>
                    </div>
                </div>
                
                <div id="subject-resources-dynamic-content">
                    <div style="text-align: center; padding: 3rem; color: #999;">
                        <i class="fas fa-book-open" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                        <p>Select an option above to access subject resources</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    console.log('✅ Subject Resources section loaded successfully');
}

// Curriculum Resources
window.showCurriculumResources = function() {
    const dynamicContent = document.getElementById('subject-resources-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-graduation-cap"></i> Curriculum Resources</h3>
                <button onclick="closeSubjectResourcesDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <div class="curriculum-sections" style="display: grid; gap: 2rem;">
                <div class="curriculum-section">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-calendar-alt"></i> Schemes of Work
                    </h4>
                    <div class="resource-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
                        <div class="resource-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; cursor: pointer;" onclick="viewResource('sow_2025')">
                            <i class="fas fa-file-alt" style="font-size: 2rem; color: var(--primary); margin-bottom: 0.5rem;"></i>
                            <h5>2024-2025 Annual Scheme</h5>
                            <p style="color: #666; font-size: 0.9rem;">Complete annual teaching plan</p>
                            <div style="display: flex; justify-content: between; margin-top: 1rem;">
                                <span style="color: #999; font-size: 0.8rem;">Updated: Mar 15, 2025</span>
                                <span style="color: var(--success); font-size: 0.8rem;">PDF</span>
                            </div>
                        </div>
                        
                        <div class="resource-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; cursor: pointer;" onclick="viewResource('sow_term1')">
                            <i class="fas fa-file-alt" style="font-size: 2rem; color: var(--info); margin-bottom: 0.5rem;"></i>
                            <h5>Term 1 Detailed Plan</h5>
                            <p style="color: #666; font-size: 0.9rem;">Weekly breakdown for Term 1</p>
                            <div style="display: flex; justify-content: between; margin-top: 1rem;">
                                <span style="color: #999; font-size: 0.8rem;">Updated: Jan 10, 2025</span>
                                <span style="color: var(--success); font-size: 0.8rem;">DOCX</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="curriculum-section">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
                        <i class="fas fa-clipboard-list"></i> Lesson Plans
                    </h4>
                    <div class="resource-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
                        <div class="resource-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; cursor: pointer;" onclick="viewResource('lesson_template')">
                            <i class="fas fa-clipboard" style="font-size: 2rem; color: var(--success); margin-bottom: 0.5rem;"></i>
                            <h5>Standard Lesson Plan Template</h5>
                            <p style="color: #666; font-size: 0.9rem;">Universal lesson plan format</p>
                            <div style="display: flex; justify-content: between; margin-top: 1rem;">
                                <span style="color: #999; font-size: 0.8rem;">Updated: Feb 1, 2025</span>
                                <span style="color: var(--warning); font-size: 0.8rem;">DOCX</span>
                            </div>
                        </div>
                        
                        <div class="resource-card" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; cursor: pointer;" onclick="viewResource('assessment_rubrics')">
                            <i class="fas fa-check-circle" style="font-size: 2rem; color: var(--danger); margin-bottom: 0.5rem;"></i>
                            <h5>Assessment Rubrics</h5>
                            <p style="color: #666; font-size: 0.9rem;">Grading and evaluation criteria</p>
                            <div style="display: flex; justify-content: between; margin-top: 1rem;">
                                <span style="color: #999; font-size: 0.8rem;">Updated: Mar 1, 2025</span>
                                <span style="color: var(--success); font-size: 0.8rem;">PDF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// All Subjects Overview
window.showAllSubjects = function() {
    const dynamicContent = document.getElementById('subject-resources-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-atom"></i> Resources by Subject</h3>
                <button onclick="closeSubjectResourcesDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <div class="subjects-grid" style="display: grid; gap: 1.5rem;">
                <!-- Integrated Science -->
                <div class="subject-card" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--primary);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">
                                <i class="fas fa-flask"></i> Integrated Science
                            </h4>
                            <p style="color: #666; margin-bottom: 1rem;">General science curriculum resources</p>
                            <div class="resource-types" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <span class="resource-tag" onclick="showSubjectDetail('integrated_science', 'syllabus')" style="background: var(--primary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Syllabus</span>
                                <span class="resource-tag" onclick="showSubjectDetail('integrated_science', 'lesson_plans')" style="background: var(--info); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Lesson Plans</span>
                                <span class="resource-tag" onclick="showSubjectDetail('integrated_science', 'past_papers')" style="background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Past Papers</span>
                                <span class="resource-tag" onclick="showSubjectDetail('integrated_science', 'notes')" style="background: var(--warning); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Notes/Handouts</span>
                                <span class="resource-tag" onclick="showSubjectDetail('integrated_science', 'videos')" style="background: var(--danger); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Videos</span>
                                <span class="resource-tag" onclick="showSubjectDetail('integrated_science', 'powerpoints')" style="background: var(--secondary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">PowerPoints</span>
                            </div>
                        </div>
                        <button onclick="showSubjectDetail('integrated_science', 'all')" class="btn btn-primary btn-sm">
                            <i class="fas fa-folder-open"></i> View All
                        </button>
                    </div>
                </div>
                
                <!-- Agricultural Science -->
                <div class="subject-card" style="background: #f0f9f0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--success);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--success); margin-bottom: 0.5rem;">
                                <i class="fas fa-seedling"></i> Agricultural Science
                            </h4>
                            <p style="color: #666; margin-bottom: 1rem;">Agriculture and farming science resources</p>
                            <div class="resource-types" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <span class="resource-tag" onclick="showSubjectDetail('agricultural_science', 'syllabus')" style="background: var(--primary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Syllabus</span>
                                <span class="resource-tag" onclick="showSubjectDetail('agricultural_science', 'lesson_plans')" style="background: var(--info); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Lesson Plans</span>
                                <span class="resource-tag" onclick="showSubjectDetail('agricultural_science', 'past_papers')" style="background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Past Papers</span>
                                <span class="resource-tag" onclick="showSubjectDetail('agricultural_science', 'notes')" style="background: var(--warning); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Notes/Handouts</span>
                                <span class="resource-tag" onclick="showSubjectDetail('agricultural_science', 'videos')" style="background: var(--danger); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Videos</span>
                                <span class="resource-tag" onclick="showSubjectDetail('agricultural_science', 'powerpoints')" style="background: var(--secondary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">PowerPoints</span>
                            </div>
                        </div>
                        <button onclick="showSubjectDetail('agricultural_science', 'all')" class="btn btn-success btn-sm">
                            <i class="fas fa-folder-open"></i> View All
                        </button>
                    </div>
                </div>
                
                <!-- Human & Social Biology -->
                <div class="subject-card" style="background: #fff0f0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--danger);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--danger); margin-bottom: 0.5rem;">
                                <i class="fas fa-user-friends"></i> Human & Social Biology
                            </h4>
                            <p style="color: #666; margin-bottom: 1rem;">Human biology and social context resources</p>
                            <div class="resource-types" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <span class="resource-tag" onclick="showSubjectDetail('human_biology', 'syllabus')" style="background: var(--primary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Syllabus</span>
                                <span class="resource-tag" onclick="showSubjectDetail('human_biology', 'lesson_plans')" style="background: var(--info); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Lesson Plans</span>
                                <span class="resource-tag" onclick="showSubjectDetail('human_biology', 'past_papers')" style="background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Past Papers</span>
                                <span class="resource-tag" onclick="showSubjectDetail('human_biology', 'notes')" style="background: var(--warning); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Notes/Handouts</span>
                                <span class="resource-tag" onclick="showSubjectDetail('human_biology', 'videos')" style="background: var(--danger); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Videos</span>
                                <span class="resource-tag" onclick="showSubjectDetail('human_biology', 'powerpoints')" style="background: var(--secondary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">PowerPoints</span>
                            </div>
                        </div>
                        <button onclick="showSubjectDetail('human_biology', 'all')" class="btn btn-danger btn-sm">
                            <i class="fas fa-folder-open"></i> View All
                        </button>
                    </div>
                </div>
                
                <!-- Biology -->
                <div class="subject-card" style="background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #28a745;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: #28a745; margin-bottom: 0.5rem;">
                                <i class="fas fa-dna"></i> Biology
                            </h4>
                            <p style="color: #666; margin-bottom: 1rem;">Life sciences and biological systems</p>
                            <div class="resource-types" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <span class="resource-tag" onclick="showSubjectDetail('biology', 'syllabus')" style="background: var(--primary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Syllabus</span>
                                <span class="resource-tag" onclick="showSubjectDetail('biology', 'lesson_plans')" style="background: var(--info); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Lesson Plans</span>
                                <span class="resource-tag" onclick="showSubjectDetail('biology', 'past_papers')" style="background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Past Papers</span>
                                <span class="resource-tag" onclick="showSubjectDetail('biology', 'notes')" style="background: var(--warning); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Notes/Handouts</span>
                                <span class="resource-tag" onclick="showSubjectDetail('biology', 'videos')" style="background: var(--danger); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Videos</span>
                                <span class="resource-tag" onclick="showSubjectDetail('biology', 'powerpoints')" style="background: var(--secondary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">PowerPoints</span>
                            </div>
                        </div>
                        <button onclick="showSubjectDetail('biology', 'all')" class="btn btn-success btn-sm">
                            <i class="fas fa-folder-open"></i> View All
                        </button>
                    </div>
                </div>
                
                <!-- Chemistry -->
                <div class="subject-card" style="background: #fff0f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #e83e8c;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: #e83e8c; margin-bottom: 0.5rem;">
                                <i class="fas fa-vial"></i> Chemistry
                            </h4>
                            <p style="color: #666; margin-bottom: 1rem;">Chemical reactions and properties</p>
                            <div class="resource-types" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <span class="resource-tag" onclick="showSubjectDetail('chemistry', 'syllabus')" style="background: var(--primary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Syllabus</span>
                                <span class="resource-tag" onclick="showSubjectDetail('chemistry', 'lesson_plans')" style="background: var(--info); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Lesson Plans</span>
                                <span class="resource-tag" onclick="showSubjectDetail('chemistry', 'past_papers')" style="background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Past Papers</span>
                                <span class="resource-tag" onclick="showSubjectDetail('chemistry', 'notes')" style="background: var(--warning); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Notes/Handouts</span>
                                <span class="resource-tag" onclick="showSubjectDetail('chemistry', 'videos')" style="background: var(--danger); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Videos</span>
                                <span class="resource-tag" onclick="showSubjectDetail('chemistry', 'powerpoints')" style="background: var(--secondary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">PowerPoints</span>
                            </div>
                        </div>
                        <button onclick="showSubjectDetail('chemistry', 'all')" class="btn btn-sm" style="background: #e83e8c; color: white; border: none;">
                            <i class="fas fa-folder-open"></i> View All
                        </button>
                    </div>
                </div>
                
                <!-- Physics -->
                <div class="subject-card" style="background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #007bff;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: #007bff; margin-bottom: 0.5rem;">
                                <i class="fas fa-atom"></i> Physics
                            </h4>
                            <p style="color: #666; margin-bottom: 1rem;">Physical laws and phenomena</p>
                            <div class="resource-types" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <span class="resource-tag" onclick="showSubjectDetail('physics', 'syllabus')" style="background: var(--primary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Syllabus</span>
                                <span class="resource-tag" onclick="showSubjectDetail('physics', 'lesson_plans')" style="background: var(--info); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Lesson Plans</span>
                                <span class="resource-tag" onclick="showSubjectDetail('physics', 'past_papers')" style="background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Past Papers</span>
                                <span class="resource-tag" onclick="showSubjectDetail('physics', 'notes')" style="background: var(--warning); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Notes/Handouts</span>
                                <span class="resource-tag" onclick="showSubjectDetail('physics', 'videos')" style="background: var(--danger); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Videos</span>
                                <span class="resource-tag" onclick="showSubjectDetail('physics', 'powerpoints')" style="background: var(--secondary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">PowerPoints</span>
                            </div>
                        </div>
                        <button onclick="showSubjectDetail('physics', 'all')" class="btn btn-primary btn-sm">
                            <i class="fas fa-folder-open"></i> View All
                        </button>
                    </div>
                </div>
                
                <!-- Amenity Horticulture -->
                <div class="subject-card" style="background: #fffaf0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ffc107;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: #ffc107; margin-bottom: 0.5rem;">
                                <i class="fas fa-leaf"></i> Amenity Horticulture
                            </h4>
                            <p style="color: #666; margin-bottom: 1rem;">Landscape and ornamental horticulture</p>
                            <div class="resource-types" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <span class="resource-tag" onclick="showSubjectDetail('horticulture', 'syllabus')" style="background: var(--primary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Syllabus</span>
                                <span class="resource-tag" onclick="showSubjectDetail('horticulture', 'clusters')" style="background: var(--info); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Clusters</span>
                                <span class="resource-tag" onclick="showSubjectDetail('horticulture', 'evidence')" style="background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Evidence Upload</span>
                                <span class="resource-tag" onclick="showSubjectDetail('horticulture', 'lesson_plans')" style="background: var(--warning); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Lesson Plans</span>
                                <span class="resource-tag" onclick="showSubjectDetail('horticulture', 'notes')" style="background: var(--danger); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Notes/Handouts</span>
                                <span class="resource-tag" onclick="showSubjectDetail('horticulture', 'powerpoints')" style="background: var(--secondary); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">PowerPoints</span>
                            </div>
                        </div>
                        <button onclick="showSubjectDetail('horticulture', 'all')" class="btn btn-warning btn-sm">
                            <i class="fas fa-folder-open"></i> View All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Upload Resources
window.showUploadResources = function() {
    const dynamicContent = document.getElementById('subject-resources-dynamic-content');
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-cloud-upload-alt"></i> Upload Teaching Resources</h3>
                <button onclick="closeSubjectResourcesDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <form onsubmit="uploadResource(event)">
                <div class="upload-area" style="border: 2px dashed var(--primary); border-radius: 8px; padding: 3rem; text-align: center; margin-bottom: 1.5rem; background: #f8fdff; cursor: pointer;">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <p>Click to browse or drag and drop files here</p>
                    <p style="font-size: 0.9rem; color: #666;">Supported formats: PDF, DOCX, PPT, MP4, JPG</p>
                    <input type="file" id="resourceFileUpload" multiple style="display: none;">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Subject *</label>
                        <select class="form-select" id="resourceSubject" required>
                            <option value="">-- Select Subject --</option>
                            <option value="integrated_science">Integrated Science</option>
                            <option value="agricultural_science">Agricultural Science</option>
                            <option value="human_biology">Human & Social Biology</option>
                            <option value="biology">Biology</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="physics">Physics</option>
                            <option value="horticulture">Amenity Horticulture</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Resource Type *</label>
                        <select class="form-select" id="resourceType" required>
                            <option value="">-- Select Type --</option>
                            <option value="syllabus">Syllabus</option>
                            <option value="lesson_plans">Lesson Plans</option>
                            <option value="past_papers">Past Papers</option>
                            <option value="notes">Notes/Handouts</option>
                            <option value="videos">Videos</option>
                            <option value="powerpoints">PowerPoints</option>
                            <option value="clusters">Clusters (Horticulture)</option>
                            <option value="evidence">Evidence (Horticulture)</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Resource Title *</label>
                    <input type="text" class="form-input" id="resourceTitle" required 
                           placeholder="e.g., Grade 10 Physics Syllabus 2025">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" id="resourceDescription" rows="3" 
                              placeholder="Brief description of the resource..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Grade Level</label>
                    <select class="form-select" id="resourceGrade">
                        <option value="">-- Select Grade --</option>
                        <option value="grade10">Grade 10</option>
                        <option value="grade11">Grade 11</option>
                        <option value="grade12">Grade 12</option>
                        <option value="all">All Grades</option>
                    </select>
                </div>
                
                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" onclick="closeSubjectResourcesDynamicContent()" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-upload"></i> Upload Resource
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Add file input handler
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('resourceFileUpload');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const fileNames = Array.from(this.files).map(file => file.name).join(', ');
            uploadArea.querySelector('p').textContent = `Selected: ${fileNames}`;
        }
    });
};

// Resource Search
window.showResourceSearch = function() {
    const dynamicContent = document.getElementById('subject-resources-dynamic-content');
    
    // Check if element exists
    if (!dynamicContent) {
        console.error('Subject resources dynamic content element not found');
        return;
    }
    
    // Add your actual functionality here
    // For example:
    dynamicContent.innerHTML = '<p>Resource search functionality would go here...</p>';
    
    // Or whatever your intended functionality was
    console.log('Resource search function called');
};
