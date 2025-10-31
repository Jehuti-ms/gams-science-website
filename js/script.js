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

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getDate() === day && 
                       eventDate.getMonth() === currentDate.getMonth() && 
                       eventDate.getFullYear() === currentDate.getFullYear();
            });

            if (dayEvents.length > 0) {
                const eventIndicator = document.createElement('div');
                eventIndicator.className = 'event-indicator';
                eventIndicator.textContent = `${dayEvents.length} event(s)`;
                dayElement.appendChild(eventIndicator);
            }

            if (day === new Date().getDate() && 
                currentDate.getMonth() === new Date().getMonth() && 
                currentDate.getFullYear() === new Date().getFullYear()) {
                dayElement.classList.add('today');
            }

            dayElement.addEventListener('click', () => showDayEvents(day, dayEvents));
            calendar.appendChild(dayElement);
        }
    }

    function showDayEvents(day, events) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3>Events for ${currentDate.toLocaleDateString('en-US', { month: 'long' })} ${day}</h3>
                <div id="day-events">
                    ${events.length === 0 ? '<p>No events scheduled</p>' : events.map(event => `
                        <div class="event-item">
                            <strong>${event.title}</strong>
                            <p>${event.description}</p>
                            <small>${new Date(event.date).toLocaleTimeString()}</small>
                        </div>
                    `).join('')}
                </div>
                <button onclick="showAddEventForm(${day})" class="btn btn-primary">Add Event</button>
            </div>
        `;

        modal.querySelector('.close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        document.body.appendChild(modal);
    }

    window.showAddEventForm = function(day) {
        const eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        
        const formModal = document.createElement('div');
        formModal.className = 'modal';
        formModal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3>Add Event for ${eventDate.toLocaleDateString()}</h3>
                <form id="addEventForm" onsubmit="handleAddEvent(event, ${day})">
                    <div class="form-group">
                        <label class="form-label">Event Title</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Time</label>
                        <input type="time" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-success">Add Event</button>
                </form>
            </div>
        `;

        formModal.querySelector('.close').addEventListener('click', () => {
            document.body.removeChild(formModal);
        });

        formModal.addEventListener('click', (e) => {
            if (e.target === formModal) {
                document.body.removeChild(formModal);
            }
        });

        document.body.appendChild(formModal);
    };

    window.handleAddEvent = function(e, day) {
        e.preventDefault();
        const form = e.target;
        const title = form.querySelector('input[type="text"]').value;
        const description = form.querySelector('textarea').value;
        const time = form.querySelector('input[type="time"]').value;

        const eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const [hours, minutes] = time.split(':');
        eventDate.setHours(parseInt(hours), parseInt(minutes));

        const newEvent = {
            id: Date.now(),
            title,
            description,
            date: eventDate.toISOString()
        };

        events.push(newEvent);
        localStorage.setItem('departmentEvents', JSON.stringify(events));

        // Close modal and refresh calendar
        document.body.removeChild(form.closest('.modal'));
        document.querySelectorAll('.modal').forEach(modal => document.body.removeChild(modal));
        
        generateCalendar();
        alert('Event added successfully!');
    };

    // Navigation buttons
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar();
        });
    }

    generateCalendar();
}

function initializeFileDownloads() {
    const fileItems = document.querySelectorAll('.file-item');
    
    fileItems.forEach(item => {
        item.addEventListener('click', function() {
            const fileName = this.querySelector('.file-name').textContent;
            const fileType = this.querySelector('.file-meta').textContent.split(' • ')[0];
            
            // Simulate file download
            alert(`Downloading: ${fileName}\nFile Type: ${fileType}`);
            
            // In a real implementation, this would trigger an actual file download
            // window.location.href = `/download/${encodeURIComponent(fileName)}`;
        });
    });
}

function initializeShop() {
    const shopItems = document.querySelectorAll('.shop-item');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
    }
    
    shopItems.forEach(item => {
        const addToCartBtn = item.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const itemName = item.querySelector('.item-name').textContent;
                const itemPrice = item.querySelector('.item-price').textContent;
                
                const cartItem = {
                    id: Date.now(),
                    name: itemName,
                    price: itemPrice,
                    quantity: 1
                };
                
                cartItems.push(cartItem);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCartCount();
                
                // Show confirmation
                const confirmation = document.createElement('div');
                confirmation.className = 'cart-confirmation';
                confirmation.textContent = `${itemName} added to cart!`;
                document.body.appendChild(confirmation);
                
                setTimeout(() => {
                    document.body.removeChild(confirmation);
                }, 2000);
            });
        }
    });
    
    updateCartCount();
    
    // Initialize cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', showCart);
    }
}

function showCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>Shopping Cart</h3>
            <div id="cart-items">
                ${cartItems.length === 0 ? '<p>Your cart is empty</p>' : cartItems.map(item => `
                    <div class="cart-item">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">${item.price}</span>
                        <button onclick="removeFromCart(${item.id})" class="btn btn-danger btn-sm">Remove</button>
                    </div>
                `).join('')}
            </div>
            ${cartItems.length > 0 ? `
                <div class="cart-total">
                    <strong>Total: $${calculateCartTotal(cartItems).toFixed(2)}</strong>
                </div>
                <button onclick="checkout()" class="btn btn-success">Checkout</button>
            ` : ''}
        </div>
    `;

    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    document.body.appendChild(modal);
}

window.removeFromCart = function(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Refresh cart display
    document.querySelectorAll('.modal').forEach(modal => document.body.removeChild(modal));
    showCart();
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
};

function calculateCartTotal(cartItems) {
    return cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return total + price;
    }, 0);
}

window.checkout = function() {
    alert('Thank you for your purchase! This is a demo - no actual transaction will occur.');
    localStorage.removeItem('cartItems');
    
    // Close modal and update cart
    document.querySelectorAll('.modal').forEach(modal => document.body.removeChild(modal));
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = '0';
    }
};

// Initialize any other required components
document.addEventListener('DOMContentLoaded', function() {
    // Add any additional initialization code here
});
