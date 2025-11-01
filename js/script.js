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

// ===== DOCUMENTS SECTION =====
function loadDocumentsSection(container) {
    console.log('📄 Documents section function called');
    
    try {
        container.innerHTML = `
            <div class="section-content">
                <div class="drive-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h3><i class="fas fa-file-alt"></i> Department Documents</h3>
                        <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                            <i class="fas fa-arrow-left"></i> Back to Overview
                        </button>
                    </div>
                    <p>Access national// ===== GAMS SCIENCE DEPARTMENT - ENHANCED JAVASCRIPT =====

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
    console.log('🔍 Navigating to section:', sectionId);
    
    // Hide the welcome section
    const welcomeSection = document.getElementById('welcome-section');
    if (welcomeSection) {
        welcomeSection.style.display = 'none';
        console.log('✅ Welcome section hidden');
    }
    
    // Get or create the section content container
    let sectionContainer = document.getElementById('section-content-container');
    if (!sectionContainer) {
        const contentArea = document.querySelector('.content');
        sectionContainer = document.createElement('div');
        sectionContainer.id = 'section-content-container';
        contentArea.appendChild(sectionContainer);
        console.log('✅ Section container created');
    }
    
    // Clear existing content
    sectionContainer.innerHTML = '';
    
    // Load the appropriate section
    console.log('📂 Loading section content for:', sectionId);
    loadSectionContent(sectionId);
    
    // Scroll to the section
    setTimeout(() => {
        sectionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ===== LOAD SECTION CONTENT =====
function loadSectionContent(sectionId) {
    const sectionContainer = document.getElementById('section-content-container');
    if (!sectionContainer) {
        console.error('❌ Section container not found!');
        return;
    }
    
    // Check if we're on department-admin page
    const currentPage = window.location.pathname.split('/').pop();
    console.log('📄 Current page:', currentPage);
    
    if (currentPage !== 'department-admin.html' && currentPage !== '') {
        console.log('⚠️ Not on department-admin page, skipping load');
        return;
    }
    
    // Show loading state
    sectionContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i><p>Loading...</p></div>';
    
    // Small delay for smooth loading effect
    setTimeout(() => {
        console.log('🚀 Loading section:', sectionId);
        
        // Load content based on section
        switch(sectionId) {
            case 'meetings':
                console.log('📅 Loading Meetings section');
                loadMeetingsSection(sectionContainer);
                break;
            case 'documents':
                console.log('📄 Loading Documents section');
                loadDocumentsSection(sectionContainer);
                break;
            case 'timetables':
                console.log('🗓️ Loading Timetables section');
                loadTimetablesSection(sectionContainer);
                break;
            case 'estimates':
                console.log('💰 Loading Estimates section');
                loadEstimatesSection(sectionContainer);
                break;
            case 'budget':
                console.log('💵 Loading Budget section');
                loadBudgetSection(sectionContainer);
                break;
            case 'marksheets':
                console.log('📋 Loading Marksheets section');
                loadMarksheetsSection(sectionContainer);
                break;
            case 'appraisals':
                console.log('✅ Loading Appraisals section');
                loadAppraisalsSection(sectionContainer);
                break;
            case 'inventory':
                console.log('📦 Loading Inventory section');
                loadInventorySection(sectionContainer);
                break;
            default:
                console.error('❌ Unknown section:', sectionId);
                sectionContainer.innerHTML = '<div class="drive-section"><p style="text-align: center; color: #999; padding: 2rem;">Section not found.</p></div>';
        }
        
        console.log('✅ Section loaded successfully');
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
