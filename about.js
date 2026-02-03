        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize components
            initThemeToggle();
            initTimeline();
            initContactForm();
            initCartCount();
            initWishlistCount();
        });
        // Theme Toggle
        function initThemeToggle() {
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle.querySelector('i');
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark-theme');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            // Toggle theme
            themeToggle.addEventListener('click', function() {
                document.documentElement.classList.toggle('dark-theme');
                if (document.documentElement.classList.contains('dark-theme')) {
                    localStorage.setItem('theme', 'dark');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    localStorage.setItem('theme', 'light');
                    themeIcon.classList.remove('fa-sun');
                 themeIcon.classList.add('fa-moon');
                }
            });
        }
        // Timeline Animation
        function initTimeline() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.3 });
            timelineItems.forEach(item => {
                observer.observe(item);
            });
        }
        // Contact Form
        function initContactForm() {
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                // Simple validation
                if (!name || !email || !message) {
                    alert('Please fill in all fields');
                    return;
                }
                // In a real application, you would send the data to a server here
                // For this demo, we'll just show a success message
                // Reset form
                contactForm.reset();
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.textContent = 'Thanks for reaching out! We\'ll get back to you shortly.';
                successMsg.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--success);
                    color: white;
                    padding: 15px 25px;
                    border-radius: 5px;
                    z-index: 1000;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    animation: slideIn 0.3s, fadeOut 0.5s 2.5s;
                `;
                document.body.appendChild(successMsg);
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            });
        }
        // Cart and Wishlist Count (from localStorage)
        function initCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCount').textContent = cartCount;
        }
        function initWishlistCount() {
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            document.getElementById('wishlistCount').textContent = wishlist.length;
        }