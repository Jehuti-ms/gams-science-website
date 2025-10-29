// ScienceFile Hub JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // File upload functionality
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.background = '#e8f7ff';
        uploadArea.style.borderColor = '#2c8c99';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.background = '#f8fdff';
        uploadArea.style.borderColor = '#1a5f7a';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.background = '#f8fdff';
        uploadArea.style.borderColor = '#1a5f7a';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            alert(`Selected ${e.dataTransfer.files.length} file(s) for upload to ScienceFile Hub`);
        }
    });
    
    uploadBtn.addEventListener('click', () => {
        if (fileInput.files.length === 0) {
            alert('Please select a file to upload to ScienceFile Hub');
            return;
        }
        
        const category = document.getElementById('fileCategory').value;
        const description = document.getElementById('fileDescription').value;
        
        // In a real application, you would upload the file to a server here
        alert(`File uploaded to ${category} category in ScienceFile Hub${description ? ' with description: ' + description : ''}`);
        
        // Reset form
        fileInput.value = '';
        document.getElementById('fileDescription').value = '';
    });
    
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            filterFiles(category);
        });
    });
    
    function filterFiles(category) {
        const fileItems = document.querySelectorAll('.file-item');
        
        fileItems.forEach(item => {
            if (category === 'all') {
                item.style.display = 'flex';
            } else {
                const fileCategory = item.querySelector('.file-meta').textContent;
                if (fileCategory.includes(category)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }
    
    // File search functionality
    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const fileItems = document.querySelectorAll('.file-item');
        
        fileItems.forEach(item => {
            const fileName = item.querySelector('.file-name').textContent.toLowerCase();
            if (fileName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('fileDetailsModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelDetails = document.getElementById('cancelDetails');
    
    // In a real application, you would open the modal when editing a file
    // For demonstration, we'll add a double-click event to file items
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach(item => {
        item.addEventListener('dblclick', () => {
            modal.style.display = 'flex';
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    cancelDetails.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Save file details
    document.getElementById('saveDetails').addEventListener('click', () => {
        alert('File details updated successfully in ScienceFile Hub');
        modal.style.display = 'none';
    });
    
    // Add some sample file interactions
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('title');
            const fileName = this.closest('.file-item').querySelector('.file-name').textContent;
            
            switch(action) {
                case 'Download':
                    alert(`Downloading "${fileName}" from ScienceFile Hub`);
                    break;
                case 'Share':
                    alert(`Sharing "${fileName}" from ScienceFile Hub`);
                    break;
                case 'Delete':
                    if(confirm(`Are you sure you want to delete "${fileName}" from ScienceFile Hub?`)) {
                        this.closest('.file-item').style.display = 'none';
                        alert(`"${fileName}" has been deleted from ScienceFile Hub`);
                    }
                    break;
            }
        });
    });
});
