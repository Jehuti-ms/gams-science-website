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

// Show notification (could be enhanced with a toast library)
function showNotification(message, type = 'info') {
    alert(message); // Simple version - could be replaced with toast notifications
}

// Debug mode - press Ctrl+Shift+D to see debug info
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        console.log('🔍 Debug Info:');
        console.log('Current Page:', window.location.pathname);
        console.log('Cart Items:', JSON.parse(localStorage.getItem('shopCart') || '[]'));
        console.log('Events:', JSON.parse(localStorage.getItem('departmentEvents') || '[]'));
    }
});

console.log('✨ Gams Science Department - Scripts loaded successfully!');
