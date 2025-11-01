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
        try {
            // Load content based on section
            switch(sectionId) {
                case 'meetings':
                    if (typeof loadMeetingsSection === 'function') {
                        loadMeetingsSection(sectionContainer);
                    } else {
                        throw new Error('loadMeetingsSection function not found');
                    }
                    break;
                case 'documents':
                    if (typeof loadDocumentsSection === 'function') {
                        loadDocumentsSection(sectionContainer);
                    } else {
                        throw new Error('loadDocumentsSection function not found');
                    }
                    break;
                case 'timetables':
                    if (typeof loadTimetablesSection === 'function') {
                        loadTimetablesSection(sectionContainer);
                    } else {
                        throw new Error('loadTimetablesSection function not found');
                    }
                    break;
                case 'estimates':
                    if (typeof loadEstimatesSection === 'function') {
                        loadEstimatesSection(sectionContainer);
                    } else {
                        throw new Error('loadEstimatesSection function not found');
                    }
                    break;
                case 'budget':
                    if (typeof loadBudgetSection === 'function') {
                        loadBudgetSection(sectionContainer);
                    } else {
                        throw new Error('loadBudgetSection function not found');
                    }
                    break;
                case 'marksheets':
                    if (typeof loadMarksheetsSection === 'function') {
                        loadMarksheetsSection(sectionContainer);
                    } else {
                        throw new Error('loadMarksheetsSection function not found');
                    }
                    break;
                case 'appraisals':
                    if (typeof loadAppraisalsSection === 'function') {
                        loadAppraisalsSection(sectionContainer);
                    } else {
                        throw new Error('loadAppraisalsSection function not found');
                    }
                    break;
                case 'inventory':
                    if (typeof loadInventorySection === 'function') {
                        loadInventorySection(sectionContainer);
                    } else {
                        throw new Error('loadInventorySection function not found');
                    }
                    break;
                default:
                    sectionContainer.innerHTML = '<div class="drive-section"><p style="text-align: center; color: #999; padding: 2rem;">Section not found.</p></div>';
            }
        } catch (error) {
            console.error('Error loading section:', error);
            sectionContainer.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 2rem; color: #d32f2f;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem;"></i>
                    <p>Error loading content: ${error.message}</p>
                </div>
            `;
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

// ===== MOBILE MENU FUNCTIONALITY =====
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
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
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

// ===== MISSING FUNCTION IMPLEMENTATIONS =====

// Resource Search Function
window.showResourceSearch = function() {
    const dynamicContent = document.getElementById('subject-resources-dynamic-content');
    
    // Check if element exists
    if (!dynamicContent) {
        console.error('Subject resources dynamic content element not found');
        return;
    }
    
    dynamicContent.innerHTML = `
        <div class="form-container" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3><i class="fas fa-search"></i> Search Resources</h3>
                <button onclick="closeSubjectResourcesDynamicContent()" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <div class="search-form">
                <div class="form-group">
                    <input type="text" class="form-input" id="resourceSearch" placeholder="Search for resources..." 
                           style="width: 100%; padding: 1rem; font-size: 1.1rem;">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
                    <div class="form-group">
                        <label class="form-label">Subject</label>
                        <select class="form-select" id="searchSubject">
                            <option value="">All Subjects</option>
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
                        <label class="form-label">Resource Type</label>
                        <select class="form-select" id="searchType">
                            <option value="">All Types</option>
                            <option value="syllabus">Syllabus</option>
                            <option value="lesson_plans">Lesson Plans</option>
                            <option value="past_papers">Past Papers</option>
                            <option value="notes">Notes/Handouts</option>
                            <option value="videos">Videos</option>
                            <option value="powerpoints">PowerPoints</option>
                        </select>
                    </div>
                </div>
                
                <button onclick="performResourceSearch()" class="btn btn-primary" style="width: 100%; padding: 1rem;">
                    <i class="fas fa-search"></i> Search Resources
                </button>
            </div>
            
            <div id="search-results" style="margin-top: 2rem;">
                <div style="text-align: center; padding: 2rem; color: #999;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Enter search criteria to find resources</p>
                </div>
            </div>
        </div>
    `;
};

// Close Subject Resources Dynamic Content
window.closeSubjectResourcesDynamicContent = function() {
    const dynamicContent = document.getElementById('subject-resources-dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = '<div style="text-align: center; padding: 3rem; color: #999;"><i class="fas fa-book-open" style="font-size: 4rem; margin-bottom: 1rem;"></i><p>Select an option above to access subject resources</p></div>';
    }
};

// Perform Resource Search
window.performResourceSearch = function() {
    const searchTerm = document.getElementById('resourceSearch').value;
    const subject = document.getElementById('searchSubject').value;
    const type = document.getElementById('searchType').value;
    
    // Simulate search results
    const results = [
        { title: 'Grade 10 Physics Syllabus', subject: 'physics', type: 'syllabus', date: '2025-03-15' },
        { title: 'Chemical Reactions Lesson Plan', subject: 'chemistry', type: 'lesson_plans', date: '2025-03-10' },
        { title: 'Biology Past Papers 2024', subject: 'biology', type: 'past_papers', date: '2025-02-28' }
    ].filter(item => {
        return (!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
               (!subject || item.subject === subject) &&
               (!type || item.type === type);
    });
    
    const resultsContainer = document.getElementById('search-results');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #999;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>No resources found matching your criteria</p>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = `
            <h4 style="color: var(--primary); margin-bottom: 1rem;">Search Results (${results.length})</h4>
            <div class="results-list">
                ${results.map(item => `
                    <div class="result-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="flex: 1;">
                            <strong>${item.title}</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #666;">
                                ${item.subject} • ${item.type} • ${new Date(item.date).toLocaleDateString()}
                            </p>
                        </div>
                        <button onclick="viewResource('${item.title.replace(/\s+/g, '_')}')" class="btn btn-primary btn-sm">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// View Resource Function
window.viewResource = function(resourceId, resourceName, resourceType) {
    console.log('Viewing resource:', resourceId, resourceName, resourceType);
    
    // Show a modal or navigate to resource view
    alert(`Opening resource: ${resourceName || resourceId}\n\nIn a real implementation, this would open the resource viewer.`);
    
    // Or implement your actual view logic here, for example:
    // openResourceModal(resourceId);
    // navigateToResourceView(resourceId);
    // previewResourceFile(resourceId);
};

// Upload Resource Function
window.uploadResource = function(event) {
    event.preventDefault();
    alert('✅ Resource uploaded successfully!');
    closeSubjectResourcesDynamicContent();
};

// Show Subject Detail
window.showSubjectDetail = function(subject, type) {
    alert(`Showing ${type} resources for ${subject}`);
};

// ===== PLACEHOLDER FUNCTIONS FOR MISSING SECTIONS =====

// These functions need to be implemented based on your specific requirements

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
                <p>Documents section - Implementation needed</p>
            </div>
        </div>
    `;
}

function loadTimetablesSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-timetables">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-clock"></i> Timetables</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Timetables section - Implementation needed</p>
            </div>
        </div>
    `;
}

function loadEstimatesSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-estimates">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-calculator"></i> Estimates</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Estimates section - Implementation needed</p>
            </div>
        </div>
    `;
}

function loadBudgetSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-budget">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-money-bill-wave"></i> Budget</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Budget section - Implementation needed</p>
            </div>
        </div>
    `;
}

function loadMarksheetsSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-marksheets">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-file-alt"></i> Marksheets</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Marksheets section - Implementation needed</p>
            </div>
        </div>
    `;
}

function loadAppraisalsSection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-appraisals">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-user-check"></i> Appraisals</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Appraisals section - Implementation needed</p>
            </div>
        </div>
    `;
}

function loadInventorySection(container) {
    container.innerHTML = `
        <div class="section-content" id="section-inventory">
            <div class="drive-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3><i class="fas fa-boxes"></i> Inventory</h3>
                    <button onclick="returnToOverview()" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Back to Overview
                    </button>
                </div>
                <p>Inventory section - Implementation needed</p>
            </div>
        </div>
    `;
}

// ===== MEETINGS SECTION FUNCTIONS =====

// These are the meeting-related functions that were referenced but not defined
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
            <p>Draft agenda functionality would go here...</p>
        </div>
    `;
};

window.showPastAgendas = function() {
    alert('Showing past agendas...');
};

window.showPastMinutes = function() {
    alert('Showing past minutes...');
};

window.showUploadDocument = function(type) {
    alert(`Uploading ${type} document...`);
};

window.closeDynamicContent = function() {
    const dynamicContent = document.getElementById('meetings-dynamic-content');
    if (dynamicContent) {
        dynamicContent.innerHTML = '';
    }
};

// ===== ADDITIONAL MISSING FUNCTIONS =====

// Add any other missing functions that were referenced but not defined
window.addAgendaItem = function() {
    console.log('Adding agenda item...');
};

window.removeAgendaItem = function(button) {
    console.log('Removing agenda item...');
};

window.saveAgenda = function(event) {
    event.preventDefault();
    alert('Agenda saved successfully!');
};

// ===== ERROR HANDLING =====

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

console.log('✅ GAMS Science Department JavaScript loaded successfully');
