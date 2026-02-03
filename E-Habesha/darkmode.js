


    // Dark mode toggle with localStorage persistence
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = localStorage.getItem('darkMode') === 'enabled' ? '☀️ Light Mode' : '🌙 Dark Mode';
darkModeToggle.style.position = 'fixed';
darkModeToggle.style.bottom = '20px';
darkModeToggle.style.right = '20px';
darkModeToggle.style.zIndex = '1000';
darkModeToggle.style.padding = '10px 15px';
darkModeToggle.style.borderRadius = '5px';
darkModeToggle.style.border = 'none';
darkModeToggle.style.backgroundColor = '#D4AF37';
darkModeToggle.style.color = '#121212';
darkModeToggle.style.cursor = 'pointer';

document.body.appendChild(darkModeToggle);

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '🌙 Dark Mode';
    }
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



