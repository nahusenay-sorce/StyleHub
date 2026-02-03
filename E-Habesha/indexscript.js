document.addEventListener('DOMContentLoaded', function() {
    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.product-card a');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            const productPrice = this.closest('.product-card').querySelector('.price').textContent;
            
            // Create cart item
            const cartItem = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
            
            // Get existing cart or create new one
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(cartItem);
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Show confirmation
            alert(`${productName} added to cart!`);
        });
    });

    // Search functionality
    const searchForm = document.querySelector('.search-bar');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = this.querySelector('input').value.toLowerCase();
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productDesc = product.querySelector('p').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Hero buttons
    const shopNowBtn = document.querySelector('.hero-buttons button');
    shopNowBtn.addEventListener('click', function() {
        window.location.href = '#products';
    });
});


const productImage = this.closest('.product-card').querySelector('img').src;
const productDescription = this.closest('.product-card').querySelector('p').textContent;

const cartItem = {
    name: productName,
    price: productPrice,
    quantity: 1,
    image: productImage,
    description: productDescription
};

// theme.js (include in all pages)
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.querySelector('header').appendChild(themeToggle);
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    // Mobile menu toggle
    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('header').prepend(menuToggle);
        
        const nav = document.querySelector('nav');
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        // Hide nav when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }
    
    // Update cart counter on page load
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-counter').forEach(counter => {
        counter.textContent = totalItems;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(cart.reduce((total, item) => total + item.quantity, 0));

    // Add to cart buttons functionality
    const addToCartButtons = document.querySelectorAll('.product-card a');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product details
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent.replace(/[^0-9]/g, '');
            const productImage = productCard.querySelector('img').src;
            const productDesc = productCard.querySelector('p').textContent;
            
            // Check if product already in cart
            let existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    description: productDesc,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount(cart.reduce((total, item) => total + item.quantity, 0));
        });
    });

    function updateCartCount(count) {
        document.querySelector('.cart-count').textContent = count;
    }
});

