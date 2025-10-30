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
    
    if (currentPage === 'shop.html') {
        initializeShop();
    }
    
    // Initialize file downloads on all pages
    if (document.querySelector('.file-item')) {
        initializeFileDownloads();
    }
    
    console.log('✅ Initialization complete!');
});

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
        
        // Highlight active submenu items
        if (submenu) {
            const submenuLinks = submenu.querySelectorAll('a');
            submenuLinks.forEach(subLink => {
                if (window.location.hash && subLink.getAttribute('href') === window.location.hash) {
                    subLink.style.color = 'white';
                    subLink.style.background = 'rgba(255, 255, 255, 0.1)';
                }
            });
        }
    });
}

// ===== MOBILE MENU TOGGLE =====
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

        // Clear calendar
        calendar.innerHTML = '';

        // Add day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });

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
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);

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
                const eventDot = document.createElement('div');
                eventDot.className = 'event-dot';
                eventDot.title = dayEvents.map(e => e.title).join(', ');
                dayElement.appendChild(eventDot);
                
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
