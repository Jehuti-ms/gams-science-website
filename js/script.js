// Enhanced Multi-page navigation with dynamic content loading
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSidebar();
    initializeMobileMenu();
    initializeDynamicContent();
    
    // Page-specific initializations
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        initializeCalendar();
        initializeFileDownloads();
    }
    
    if (currentPage === 'shop.html') {
        initializeShop();
    }
    
    if (document.querySelector('.file-item')) {
        initializeFileDownloads();
    }
});

// ===== DYNAMIC CONTENT LOADING SYSTEM =====
function initializeDynamicContent() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'department-admin.html') {
        setupDepartmentAdminSections();
    } else if (currentPage === 'subject-resources.html') {
        setupSubjectResourcesSections();
    } else if (currentPage === 'examinations.html') {
        setupExaminationsSections();
    }
}

// ===== DEPARTMENT ADMIN SECTIONS =====
function setupDepartmentAdminSections() {
    const hash = window.location.hash.substring(1);
    const container = document.getElementById('section-content-container');
    
    if (!container) return;
    
    // Handle hash navigation
    if (hash) {
        loadDepartmentSection(hash, container);
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash.substring(1);
        if (newHash) {
            loadDepartmentSection(newHash, container);
        } else {
            container.innerHTML = '';
        }
    });
}

function loadDepartmentSection(section, container) {
    switch(section) {
        case 'meetings':
            loadMeetingsSection(container);
            break;
        case 'documents':
            loadDocumentsSection(container);
            break;
        case 'timetables':
            loadTimetablesSection(container);
            break;
        case 'estimates':
            loadEstimatesSection(container);
            break;
        case 'budget':
            loadBudgetSection(container);
            break;
        case 'marksheets':
            loadMarksheetsSection(container);
            break;
        case 'appraisals':
            loadAppraisalsSection(container);
            break;
        case 'inventory':
            loadInventorySection(container);
            break;
    }
}

// MEETINGS SECTION
function loadMeetingsSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-users"></i> Department Meetings</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                            <h4><i class="fas fa-calendar-plus"></i> Schedule New Meeting</h4>
                        </div>
                        <div class="card-body">
                            <form id="meetingForm" onsubmit="handleMeetingSubmit(event)">
                                <div class="form-group">
                                    <label class="form-label">Meeting Title</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Date & Time</label>
                                    <input type="datetime-local" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Agenda</label>
                                    <textarea class="form-control" rows="4" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-success">Schedule Meeting</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
                            <h4><i class="fas fa-file-alt"></i> Meeting Minutes</h4>
                        </div>
                        <div class="card-body">
                            <p>Access and upload meeting minutes</p>
                            <button class="btn btn-primary" onclick="showMeetingMinutes()">View All Minutes</button>
                        </div>
                    </div>
                </div>
                
                <div class="file-grid" id="meetingFiles" style="margin-top: 2rem;">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">Meeting Minutes - March 2024</div>
                        <div class="file-meta">PDF • 1.2 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// DOCUMENTS SECTION
function loadDocumentsSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-file-alt"></i> Department Documents</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
                            <h4><i class="fas fa-upload"></i> Upload Document</h4>
                        </div>
                        <div class="card-body">
                            <form id="documentUploadForm" onsubmit="handleDocumentUpload(event)">
                                <div class="form-group">
                                    <label class="form-label">Document Type</label>
                                    <select class="form-control" required>
                                        <option value="">Select Type</option>
                                        <option>Policy</option>
                                        <option>Report</option>
                                        <option>Form</option>
                                        <option>Memo</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">File</label>
                                    <input type="file" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Description</label>
                                    <textarea class="form-control" rows="3"></textarea>
                                </div>
                                <button type="submit" class="btn btn-success">Upload Document</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">
                            <h4><i class="fas fa-search"></i> Search Documents</h4>
                        </div>
                        <div class="card-body">
                            <input type="text" class="form-control" placeholder="Search documents..." onkeyup="searchDocuments(this.value)">
                        </div>
                    </div>
                </div>
                
                <h4 style="margin-top: 2rem; color: #1a5f7a;">Recent Documents</h4>
                <div class="file-grid" id="documentFiles">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-word"></i></div>
                        <div class="file-name">Department Policy 2024</div>
                        <div class="file-meta">DOCX • 0.8 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">Annual Report</div>
                        <div class="file-meta">PDF • 2.4 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// TIMETABLES SECTION
function loadTimetablesSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-calendar-alt"></i> Class Timetables</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #fa709a, #fee140);">
                            <h4><i class="fas fa-plus-circle"></i> Create Timetable</h4>
                        </div>
                        <div class="card-body">
                            <form id="timetableForm" onsubmit="handleTimetableSubmit(event)">
                                <div class="form-group">
                                    <label class="form-label">Class/Form</label>
                                    <select class="form-control" required>
                                        <option value="">Select Form</option>
                                        <option>Form 1</option>
                                        <option>Form 2</option>
                                        <option>Form 3</option>
                                        <option>Form 4</option>
                                        <option>Form 5</option>
                                        <option>L6</option>
                                        <option>U6</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Term</label>
                                    <select class="form-control" required>
                                        <option>Term 1</option>
                                        <option>Term 2</option>
                                        <option>Term 3</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-success">Generate Timetable</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #30cfd0, #330867);">
                            <h4><i class="fas fa-download"></i> Download Timetables</h4>
                        </div>
                        <div class="card-body">
                            <p>Download current timetables for all forms</p>
                            <button class="btn btn-primary">Download All</button>
                        </div>
                    </div>
                </div>
                
                <h4 style="margin-top: 2rem; color: #1a5f7a;">Current Timetables</h4>
                <div class="file-grid" id="timetableFiles">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-excel"></i></div>
                        <div class="file-name">Form 4 Timetable</div>
                        <div class="file-meta">XLSX • 0.5 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-excel"></i></div>
                        <div class="file-name">Form 5 Timetable</div>
                        <div class="file-meta">XLSX • 0.5 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ESTIMATES SECTION
function loadEstimatesSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-calculator"></i> Budget Estimates</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #f79d00, #64f38c);">
                            <h4><i class="fas fa-file-invoice-dollar"></i> Create Estimate</h4>
                        </div>
                        <div class="card-body">
                            <form id="estimateForm" onsubmit="handleEstimateSubmit(event)">
                                <div class="form-group">
                                    <label class="form-label">Item/Category</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Estimated Cost</label>
                                    <input type="number" step="0.01" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Description</label>
                                    <textarea class="form-control" rows="3"></textarea>
                                </div>
                                <button type="submit" class="btn btn-success">Submit Estimate</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #fccb90, #d57eeb);">
                            <h4><i class="fas fa-chart-line"></i> Budget Summary</h4>
                        </div>
                        <div class="card-body">
                            <div class="stat-item">
                                <div class="stat-value">$45,000</div>
                                <div class="stat-label">Total Budget</div>
                            </div>
                            <div class="stat-item" style="margin-top: 1rem;">
                                <div class="stat-value">$32,500</div>
                                <div class="stat-label">Allocated</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// BUDGET SECTION
function loadBudgetSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-dollar-sign"></i> Department Budget</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                            <h4><i class="fas fa-wallet"></i> Budget Overview</h4>
                        </div>
                        <div class="card-body">
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <div class="stat-value">$50,000</div>
                                    <div class="stat-label">Annual Budget</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">$38,200</div>
                                    <div class="stat-label">Spent</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">$11,800</div>
                                    <div class="stat-label">Remaining</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
                            <h4><i class="fas fa-receipt"></i> Record Expense</h4>
                        </div>
                        <div class="card-body">
                            <form id="expenseForm" onsubmit="handleExpenseSubmit(event)">
                                <div class="form-group">
                                    <label class="form-label">Expense Description</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Amount</label>
                                    <input type="number" step="0.01" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Category</label>
                                    <select class="form-control" required>
                                        <option>Equipment</option>
                                        <option>Supplies</option>
                                        <option>Maintenance</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-success">Record Expense</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// MARKSHEETS SECTION
function loadMarksheetsSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-clipboard-list"></i> Student Marksheets</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
                            <h4><i class="fas fa-upload"></i> Upload Marksheet</h4>
                        </div>
                        <div class="card-body">
                            <form id="marksheetForm" onsubmit="handleMarksheetUpload(event)">
                                <div class="form-group">
                                    <label class="form-label">Class/Subject</label>
                                    <select class="form-control" required>
                                        <option>Biology Form 4</option>
                                        <option>Chemistry Form 5</option>
                                        <option>Physics L6</option>
                                        <option>Integrated Science Form 3</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Assessment Type</label>
                                    <select class="form-control" required>
                                        <option>Test</option>
                                        <option>Assignment</option>
                                        <option>Exam</option>
                                        <option>Project</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">File</label>
                                    <input type="file" class="form-control" accept=".xlsx,.xls,.csv" required>
                                </div>
                                <button type="submit" class="btn btn-success">Upload Marksheet</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">
                            <h4><i class="fas fa-chart-bar"></i> Grade Analytics</h4>
                        </div>
                        <div class="card-body">
                            <p>View class performance statistics</p>
                            <button class="btn btn-primary">View Analytics</button>
                        </div>
                    </div>
                </div>
                
                <h4 style="margin-top: 2rem; color: #1a5f7a;">Recent Marksheets</h4>
                <div class="file-grid">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-excel"></i></div>
                        <div class="file-name">Biology Form 4 - Term 2 Test</div>
                        <div class="file-meta">XLSX • 0.3 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-excel"></i></div>
                        <div class="file-name">Chemistry Form 5 - Project Grades</div>
                        <div class="file-meta">XLSX • 0.2 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// APPRAISALS SECTION
function loadAppraisalsSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-user-check"></i> Teacher Appraisals</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #fa709a, #fee140);">
                            <h4><i class="fas fa-star"></i> Create Appraisal</h4>
                        </div>
                        <div class="card-body">
                            <form id="appraisalForm" onsubmit="handleAppraisalSubmit(event)">
                                <div class="form-group">
                                    <label class="form-label">Teacher Name</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Appraisal Period</label>
                                    <input type="text" class="form-control" placeholder="e.g., 2023-2024" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Performance Rating</label>
                                    <select class="form-control" required>
                                        <option>Exceptional</option>
                                        <option>Above Expectations</option>
                                        <option>Meets Expectations</option>
                                        <option>Needs Improvement</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Comments</label>
                                    <textarea class="form-control" rows="4"></textarea>
                                </div>
                                <button type="submit" class="btn btn-success">Submit Appraisal</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #30cfd0, #330867);">
                            <h4><i class="fas fa-folder-open"></i> View Appraisals</h4>
                        </div>
                        <div class="card-body">
                            <p>Access past teacher appraisals and performance records</p>
                            <button class="btn btn-primary">View All Appraisals</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// INVENTORY SECTION
function loadInventorySection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-boxes"></i> Laboratory Inventory</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #f79d00, #64f38c);">
                            <h4><i class="fas fa-plus-square"></i> Add Inventory Item</h4>
                        </div>
                        <div class="card-body">
                            <form id="inventoryForm" onsubmit="handleInventorySubmit(event)">
                                <div class="form-group">
                                    <label class="form-label">Item Name</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Category</label>
                                    <select class="form-control" required>
                                        <option>Glassware</option>
                                        <option>Chemicals</option>
                                        <option>Equipment</option>
                                        <option>Safety Gear</option>
                                        <option>Consumables</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Quantity</label>
                                    <input type="number" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Location</label>
                                    <input type="text" class="form-control" placeholder="e.g., Biology Lab, Cabinet A">
                                </div>
                                <button type="submit" class="btn btn-success">Add Item</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #fccb90, #d57eeb);">
                            <h4><i class="fas fa-clipboard-check"></i> Inventory Status</h4>
                        </div>
                        <div class="card-body">
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <div class="stat-value">247</div>
                                    <div class="stat-label">Total Items</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">18</div>
                                    <div class="stat-label">Low Stock</div>
                                </div>
                            </div>
                            <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;">View Full Inventory</button>
                        </div>
                    </div>
                </div>
                
                <h4 style="margin-top: 2rem; color: #1a5f7a;">Recent Inventory Updates</h4>
                <div class="file-grid">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-excel"></i></div>
                        <div class="file-name">Lab Equipment Inventory</div>
                        <div class="file-meta">XLSX • 0.6 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">Chemical Stock Report</div>
                        <div class="file-meta">PDF • 0.4 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== SUBJECT RESOURCES SECTIONS =====
function setupSubjectResourcesSections() {
    const hash = window.location.hash.substring(1);
    const container = document.getElementById('section-content-container');
    
    if (!container) return;
    
    if (hash) {
        loadSubjectSection(hash, container);
    }
    
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash.substring(1);
        if (newHash) {
            loadSubjectSection(newHash, container);
        } else {
            container.innerHTML = '';
        }
    });
}

function loadSubjectSection(section, container) {
    const subjectMap = {
        'curriculum': 'Curriculum Documents',
        'schemes': 'Schemes of Work',
        'syllabus': 'Syllabus Materials',
        'lesson-plans': 'Lesson Plans',
        'work-log': 'Work Log',
        'integrated-science': 'Integrated Science',
        'biology': 'Biology',
        'chemistry': 'Chemistry',
        'physics': 'Physics',
        'agricultural': 'Agricultural Science',
        'hsb': 'Human & Social Biology',
        'horticulture': 'Amenity Horticulture'
    };
    
    const sectionTitle = subjectMap[section] || section;
    
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-book"></i> ${sectionTitle}</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                            <h4><i class="fas fa-upload"></i> Upload Resource</h4>
                        </div>
                        <div class="card-body">
                            <form onsubmit="handleResourceUpload(event, '${section}')">
                                <div class="form-group">
                                    <label class="form-label">Resource Title</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">File</label>
                                    <input type="file" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Description</label>
                                    <textarea class="form-control" rows="3"></textarea>
                                </div>
                                <button type="submit" class="btn btn-success">Upload Resource</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
                            <h4><i class="fas fa-folder-open"></i> Browse Resources</h4>
                        </div>
                        <div class="card-body">
                            <p>Access ${sectionTitle.toLowerCase()} materials and documents</p>
                            <button class="btn btn-primary">View All Resources</button>
                        </div>
                    </div>
                </div>
                
                <h4 style="margin-top: 2rem; color: #1a5f7a;">Available Resources</h4>
                <div class="file-grid">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">${sectionTitle} - Part 1</div>
                        <div class="file-meta">PDF • 2.1 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-word"></i></div>
                        <div class="file-name">${sectionTitle} - Guide</div>
                        <div class="file-meta">DOCX • 1.5 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== EXAMINATIONS SECTIONS =====
function setupExaminationsSections() {
    const hash = window.location.hash.substring(1);
    const container = document.getElementById('section-content-container');
    
    if (!container) return;
    
    if (hash) {
        loadExaminationSection(hash, container);
    }
    
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash.substring(1);
        if (newHash) {
            loadExaminationSection(newHash, container);
        } else {
            container.innerHTML = '';
        }
    });
}

function loadExaminationSection(section, container) {
    switch(section) {
        case 'admin':
            loadExamAdminSection(container);
            break;
        case 'internal':
            loadInternalExamsSection(container);
            break;
        case 'external':
            loadExternalExamsSection(container);
            break;
        case 'ccslc':
            loadCCSLCSection(container);
            break;
        case 'csec':
            loadCSECSection(container);
            break;
        case 'ccslc-sba':
            loadCCSLCSBASection(container);
            break;
        case 'csec-sba':
            loadCSECSBASection(container);
            break;
    }
}

function loadExamAdminSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-cog"></i> Examination Administration</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
                            <h4><i class="fas fa-calendar-plus"></i> Schedule Examination</h4>
                        </div>
                        <div class="card-body">
                            <form onsubmit="handleExamSchedule(event)">
                                <div class="form-group">
                                    <label class="form-label">Exam Type</label>
                                    <select class="form-control" required>
                                        <option>Internal Test</option>
                                        <option>Mid-term Exam</option>
                                        <option>Final Exam</option>
                                        <option>Mock Exam</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Subject</label>
                                    <select class="form-control" required>
                                        <option>Biology</option>
                                        <option>Chemistry</option>
                                        <option>Physics</option>
                                        <option>Integrated Science</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Date & Time</label>
                                    <input type="datetime-local" class="form-control" required>
                                </div>
                                <button type="submit" class="btn btn-success">Schedule Exam</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">
                            <h4><i class="fas fa-users-cog"></i> Exam Settings</h4>
                        </div>
                        <div class="card-body">
                            <p>Configure exam administration settings and policies</p>
                            <button class="btn btn-primary">Manage Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadInternalExamsSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-file-alt"></i> Internal Examinations</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #fa709a, #fee140);">
                            <h4><i class="fas fa-file-upload"></i> Upload Exam Paper</h4>
                        </div>
                        <div class="card-body">
                            <form onsubmit="handleInternalExamUpload(event)">
                                <div class="form-group">
                                    <label class="form-label">Subject</label>
                                    <select class="form-control" required>
                                        <option>Biology</option>
                                        <option>Chemistry</option>
                                        <option>Physics</option>
                                        <option>Integrated Science</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Form/Year</label>
                                    <select class="form-control" required>
                                        <option>Form 1</option>
                                        <option>Form 2</option>
                                        <option>Form 3</option>
                                        <option>Form 4</option>
                                        <option>Form 5</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Exam Paper</label>
                                    <input type="file" class="form-control" required>
                                </div>
                                <button type="submit" class="btn btn-success">Upload Paper</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #30cfd0, #330867);">
                            <h4><i class="fas fa-clipboard-list"></i> View Past Papers</h4>
                        </div>
                        <div class="card-body">
                            <p>Access previous internal examination papers</p>
                            <button class="btn btn-primary">Browse Papers</button>
                        </div>
                    </div>
                </div>
                
                <h4 style="margin-top: 2rem; color: #1a5f7a;">Recent Internal Exams</h4>
                <div class="file-grid">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">Biology Form 4 - Term 2 Exam</div>
                        <div class="file-meta">PDF • 1.8 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">Chemistry Form 5 - Mock Exam</div>
                        <div class="file-meta">PDF • 2.2 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadExternalExamsSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-graduation-cap"></i> External Examinations</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #f79d00, #64f38c);">
                            <h4><i class="fas fa-info-circle"></i> CSEC Information</h4>
                        </div>
                        <div class="card-body">
                            <p>Caribbean Secondary Education Certificate exam information and resources</p>
                            <button class="btn btn-primary">View CSEC Info</button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #fccb90, #d57eeb);">
                            <h4><i class="fas fa-info-circle"></i> CCSLC Information</h4>
                        </div>
                        <div class="card-body">
                            <p>Caribbean Certificate of Secondary Level Competence exam information</p>
                            <button class="btn btn-primary">View CCSLC Info</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadCCSLCSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-certificate"></i> CCSLC Resources</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                            <h4><i class="fas fa-book"></i> CCSLC Syllabus</h4>
                        </div>
                        <div class="card-body">
                            <p>Access CCSLC syllabus documents and guidelines</p>
                            <button class="btn btn-primary">View Syllabus</button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
                            <h4><i class="fas fa-file-pdf"></i> Past Papers</h4>
                        </div>
                        <div class="card-body">
                            <p>Download CCSLC past examination papers</p>
                            <button class="btn btn-primary">Browse Papers</button>
                        </div>
                    </div>
                </div>
                
                <h4 style="margin-top: 2rem; color: #1a5f7a;">CCSLC Resources</h4>
                <div class="file-grid">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">CCSLC Integrated Science Syllabus</div>
                        <div class="file-meta">PDF • 3.2 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">CCSLC Past Papers 2023</div>
                        <div class="file-meta">PDF • 4.5 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadCSECSection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-certificate"></i> CSEC Resources</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
                            <h4><i class="fas fa-book"></i> CSEC Syllabus</h4>
                        </div>
                        <div class="card-body">
                            <p>Access CSEC syllabus documents for all science subjects</p>
                            <button class="btn btn-primary">View Syllabus</button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">
                            <h4><i class="fas fa-file-pdf"></i> Past Papers</h4>
                        </div>
                        <div class="card-body">
                            <p>Download CSEC past papers with mark schemes</p>
                            <button class="btn btn-primary">Browse Papers</button>
                        </div>
                    </div>
                </div>
                
                <h4 style="margin-top: 2rem; color: #1a5f7a;">CSEC Resources by Subject</h4>
                <div class="file-grid">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">CSEC Biology Syllabus 2024</div>
                        <div class="file-meta">PDF • 2.8 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">CSEC Chemistry Past Papers</div>
                        <div class="file-meta">PDF • 5.2 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">CSEC Physics Syllabus 2024</div>
                        <div class="file-meta">PDF • 2.5 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadCCSLCSBASection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-tasks"></i> CCSLC SBA Resources</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #fa709a, #fee140);">
                            <h4><i class="fas fa-file-upload"></i> Upload SBA</h4>
                        </div>
                        <div class="card-body">
                            <form onsubmit="handleSBAUpload(event, 'ccslc')">
                                <div class="form-group">
                                    <label class="form-label">Student Name</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">SBA Type</label>
                                    <select class="form-control" required>
                                        <option>Project</option>
                                        <option>Practical</option>
                                        <option>Investigation</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">File</label>
                                    <input type="file" class="form-control" required>
                                </div>
                                <button type="submit" class="btn btn-success">Upload SBA</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #30cfd0, #330867);">
                            <h4><i class="fas fa-book-open"></i> SBA Guidelines</h4>
                        </div>
                        <div class="card-body">
                            <p>Access CCSLC SBA guidelines and assessment criteria</p>
                            <button class="btn btn-primary">View Guidelines</button>
                        </div>
                    </div>
                </div>
                
                <h4 style="margin-top: 2rem; color: #1a5f7a;">SBA Templates & Resources</h4>
                <div class="file-grid">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-word"></i></div>
                        <div class="file-name">CCSLC SBA Template</div>
                        <div class="file-meta">DOCX • 0.5 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">SBA Assessment Guidelines</div>
                        <div class="file-meta">PDF • 1.2 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadCSECSBASection(container) {
    container.innerHTML = `
        <div class="section-content">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-tasks"></i> CSEC SBA Resources</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #f79d00, #64f38c);">
                            <h4><i class="fas fa-file-upload"></i> Upload SBA</h4>
                        </div>
                        <div class="card-body">
                            <form onsubmit="handleSBAUpload(event, 'csec')">
                                <div class="form-group">
                                    <label class="form-label">Subject</label>
                                    <select class="form-control" required>
                                        <option>Biology</option>
                                        <option>Chemistry</option>
                                        <option>Physics</option>
                                        <option>Agricultural Science</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Student Name</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">File</label>
                                    <input type="file" class="form-control" required>
                                </div>
                                <button type="submit" class="btn btn-success">Upload SBA</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header" style="background: linear-gradient(135deg, #fccb90, #d57eeb);">
                            <h4><i class="fas fa-book-open"></i> SBA Guidelines</h4>
                        </div>
                        <div class="card-body">
                            <p>Access CSEC SBA guidelines and marking schemes</p>
                            <button class="btn btn-primary">View Guidelines</button>
                        </div>
                    </div>
                </div>
                
                <h4 style="margin-top: 2rem; color: #1a5f7a;">SBA Templates & Resources</h4>
                <div class="file-grid">
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-word"></i></div>
                        <div class="file-name">CSEC Biology SBA Template</div>
                        <div class="file-meta">DOCX • 0.6 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-word"></i></div>
                        <div class="file-name">CSEC Chemistry SBA Template</div>
                        <div class="file-meta">DOCX • 0.6 MB</div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="file-name">SBA Marking Scheme</div>
                        <div class="file-meta">PDF • 1.5 MB</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== UTILITY FUNCTIONS =====
function returnToOverview() {
    window.location.hash = '';
    const container = document.getElementById('section-content-container');
    if (container) {
        container.innerHTML = '';
    }
}

// Form submission handlers
function handleMeetingSubmit(e) {
    e.preventDefault();
    alert('Meeting scheduled successfully!');
    e.target.reset();
}

function handleDocumentUpload(e) {
    e.preventDefault();
    alert('Document uploaded successfully!');
    e.target.reset();
}

function handleTimetableSubmit(e) {
    e.preventDefault();
    alert('Timetable generated successfully!');
    e.target.reset();
}

function handleEstimateSubmit(e) {
    e.preventDefault();
    alert('Estimate submitted successfully!');
    e.target.reset();
}

function handleExpenseSubmit(e) {
    e.preventDefault();
    alert('Expense recorded successfully!');
    e.target.reset();
}

function handleMarksheetUpload(e) {
    e.preventDefault();
    alert('Marksheet uploaded successfully!');
    e.target.reset();
}

function handleAppraisalSubmit(e) {
    e.preventDefault();
    alert('Appraisal submitted successfully!');
    e.target.reset();
}

function handleInventorySubmit(e) {
    e.preventDefault();
    alert('Inventory item added successfully!');
    e.target.reset();
}

function handleResourceUpload(e, section) {
    e.preventDefault();
    alert(`Resource uploaded to ${section} successfully!`);
    e.target.reset();
}

function handleExamSchedule(e) {
    e.preventDefault();
    alert('Examination scheduled successfully!');
    e.target.reset();
}

function handleInternalExamUpload(e) {
    e.preventDefault();
    alert('Exam paper uploaded successfully!');
    e.target.reset();
}

function handleSBAUpload(e, type) {
    e.preventDefault();
    alert(`${type.toUpperCase()} SBA uploaded successfully!');
    e.target.reset();
}

function searchDocuments(query) {
    console.log('Searching for:', query);
    // Implement search functionality
}

function showMeetingMinutes() {
    alert('Displaying meeting minutes...');
}

// ===== EXISTING FUNCTIONS (from original script.js) =====

function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializeSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.sidebar-submenu');
        
        if (submenu) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href.startsWith('#')) {
                    e.preventDefault();
                    
                    sidebarItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    item.classList.toggle('active');
                }
            });
        }
    });
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const sidebarLinks = document.querySelectorAll('.sidebar-item > a');
    
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.parentElement.classList.add('active');
        }
    });
}

function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                }
            });
        });
    }
}

function initializeCalendar() {
    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem('departmentEvents')) || [];

    function generateCalendar() {
        const calendar = document.getElementById('calendar');
        const currentMonth = document.getElementById('currentMonth');
        
        if (!calendar || !currentMonth) return;
        
        currentMonth.textContent = currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });

        calendar.innerHTML = '';

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const totalDays = lastDay.getDate();
        const startingDay = firstDay.getDay();

        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);

            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getDate() === day && 
                       eventDate.getMonth() === currentDate.getMonth() && 
                       eventDate.getFullYear() === currentDate.getFullYear();
            });

            if (dayEvents.length > 0) {
                const eventDot = document.createElement('div');
                eventDot.className = 'event-dot';
                eventDot.title = dayEvents.map(event => event.title).join(', ');
                dayElement.appendChild(eventDot);
            }

            calendar.appendChild(dayElement);
        }
    }

    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('eventTitle').value;
            const date = document.getElementById('eventDate').value;

            const newEvent = {
                id: Date.now().toString(),
                title: title,
                date: date
            };

            events.push(newEvent);
            localStorage.setItem('departmentEvents', JSON.stringify(events));
            this.reset();
            generateCalendar();
            alert('Event added successfully!');
        });
    }

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

    generateCalendar();
}

function initializeShop() {
    let shopItems = {
        vegetables: [
            { id: 1, name: "Fresh Tomatoes", price: 2.50, unit: "per lb", image: "🥬", description: "Freshly harvested tomatoes from our garden", available: true },
            { id: 2, name: "Carrots", price: 1.75, unit: "per lb", image: "🥕", description: "Organic carrots, crisp and sweet", available: true },
            { id: 3, name: "Lettuce", price: 1.50, unit: "per head", image: "🥬", description: "Fresh green lettuce", available: true },
            { id: 4, name: "Bell Peppers", price: 3.00, unit: "per lb", image: "🫑", description: "Colorful bell peppers", available: false },
            { id: 5, name: "Cucumbers", price: 1.25, unit: "each", image: "🥒", description: "Fresh cucumbers", available: true }
        ],
        plants: [
            { id: 1, name: "Orchid Plant", price: 15.00, unit: "each", image: "🌸", description: "Beautiful flowering orchid", available: true },
            { id: 2, name: "Succulent Set", price: 8.50, unit: "set of 3", image: "🌵", description: "Low maintenance succulent plants", available: true },
            { id: 3, name: "Herb Garden Kit", price: 12.00, unit: "kit", image: "🌿", description: "Basil, mint, and parsley starter kit", available: true },
            { id: 4, name: "Rose Bush", price: 18.00, unit: "each", image: "🌹", description: "Red rose bush", available: false }
        ],
        chickens: [
            { id: 1, name: "Fresh Eggs", price: 4.00, unit: "per dozen", image: "🥚", description: "Farm fresh eggs from our chickens", available: true },
            { id: 2, name: "Whole Chicken", price: 12.00, unit: "each", image: "🐔", description: "Fresh whole chicken", available: true },
            { id: 3, name: "Chicken Feed", price: 8.50, unit: "20lb bag", image: "🌾", description: "Organic chicken feed", available: true }
        ]
    };

    let cart = JSON.parse(localStorage.getItem('shopCart')) || [];

    showShopCategory('vegetables');
    updateCartDisplay();

    window.showShopCategory = function(category) {
        document.querySelectorAll('.shop-category').forEach(cat => {
            cat.classList.remove('active');
        });
        
        const categoryElement = document.getElementById(category + '-shop');
        if (categoryElement) {
            categoryElement.classList.add('active');
        }
        
        document.querySelectorAll('.shop-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = document.querySelector(`.shop-tab[data-category="${category}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        renderShopItems(category);
    }

    function renderShopItems(category) {
        const container = document.getElementById(category + '-items');
        const items = shopItems[category];
        
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <div class="shop-item-card ${!item.available ? 'out-of-stock' : ''}">
                <div class="shop-item-image">${item.image}</div>
                <div class="shop-item-info">
                    <h4>${item.name}</h4>
                    <p class="shop-item-description">${item.description}</p>
                    <div class="shop-item-price">${item.price} <span>${item.unit}</span></div>
                    <div class="shop-item-availability ${item.available ? 'in-stock' : 'out-of-stock'}">
                        ${item.available ? 'In Stock' : 'Out of Stock'}
                    </div>
                </div>
                <div class="shop-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id}, '${category}')">-</button>
                        <span class="quantity-display" id="quantity-${category}-${item.id}">0</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id}, '${category}')">+</button>
                    </div>
                    <button class="btn btn-primary add-to-cart-btn" 
                            onclick="addToCart(${item.id}, '${category}')"
                            ${!item.available ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    window.increaseQuantity = function(itemId, category) {
        const quantityDisplay = document.getElementById(`quantity-${category}-${itemId}`);
        if (quantityDisplay) {
            let quantity = parseInt(quantityDisplay.textContent) || 0;
            quantityDisplay.textContent = quantity + 1;
        }
    }

    window.decreaseQuantity = function(itemId, category) {
        const quantityDisplay = document.getElementById(`quantity-${category}-${itemId}`);
        if (quantityDisplay) {
            let quantity = parseInt(quantityDisplay.textContent) || 0;
            if (quantity > 0) {
                quantityDisplay.textContent = quantity - 1;
            }
        }
    }

    window.addToCart = function(itemId, category) {
        const quantityDisplay = document.getElementById(`quantity-${category}-${itemId}`);
        if (!quantityDisplay) return;
        
        const quantity = parseInt(quantityDisplay.textContent) || 0;
        
        if (quantity === 0) {
            alert('Please select quantity first');
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
        
        quantityDisplay.textContent = '0';
        localStorage.setItem('shopCart', JSON.stringify(cart));
        updateCartDisplay();
        alert(`Added ${quantity} ${item.name} to cart!`);
    }

    function updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartCount || !cartItems || !cartTotal) return;
        
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '0.00';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price} ${item.unit}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, '${item.category}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, '${item.category}', 1)">+</button>
                    </div>
                    <div class="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id}, '${item.category}')">
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
    }

    window.removeFromCart = function(itemId, category) {
        cart = cart.filter(item => !(item.id === itemId && item.category === category));
        localStorage.setItem('shopCart', JSON.stringify(cart));
        updateCartDisplay();
    }

    window.clearCart = function() {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            localStorage.setItem('shopCart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }

    window.checkout = function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Thank you for your order! This would proceed to checkout in a real application.');
        cart = [];
        localStorage.setItem('shopCart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function initializeFileDownloads() {
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const fileName = this.querySelector('.file-name').textContent;
            alert('This would download: ' + fileName + '\n\nFor now, this is a demo. When you add real files, this will work!');
        });
    });
}

// Make all functions globally available
window.returnToOverview = returnToOverview;
window.handleMeetingSubmit = handleMeetingSubmit;
window.handleDocumentUpload = handleDocumentUpload;
window.handleTimetableSubmit = handleTimetableSubmit;
window.handleEstimateSubmit = handleEstimateSubmit;
window.handleExpenseSubmit = handleExpenseSubmit;
window.handleMarksheetUpload = handleMarksheetUpload;
window.handleAppraisalSubmit = handleAppraisalSubmit;
window.handleInventorySubmit = handleInventorySubmit;
window.handleResourceUpload = handleResourceUpload;
window.handleExamSchedule = handleExamSchedule;
window.handleInternalExamUpload = handleInternalExamUpload;
window.handleSBAUpload = handleSBAUpload;
window.searchDocuments = searchDocuments;
window.showMeetingMinutes = showMeetingMinutes;
