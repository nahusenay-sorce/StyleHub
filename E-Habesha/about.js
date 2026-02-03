document.addEventListener('DOMContentLoaded', function() {
    // Animate value cards on scroll
    const valueCards = document.querySelectorAll('.value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Auth buttons
    const authButtons = document.querySelectorAll('.hero-button');
    authButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.7)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
        });
    });
});


    


// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    let cartCount = localStorage.getItem('cartCount') || 0;
    updateCartCount(cartCount);

    // Add to cart buttons functionality
    const addToCartButtons = document.querySelectorAll('.product-card a');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            updateCartCount(cartCount);
        });
    });

    function updateCartCount(count) {
        document.querySelector('.cart-count').textContent = count;
    }
});

