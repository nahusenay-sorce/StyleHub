        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize components
            initThemeToggle();
            initForm();
            initFAQ();
            initCart();
            initWishlist();
            initFileUpload();
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

        // Form Handling
        function initForm() {
            const form = document.getElementById('contactForm');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset previous errors
                resetErrors();
                
                // Validate form
                const isValid = validateForm();
                
                if (isValid) {
                    // Show loading state
                    const submitBtn = document.getElementById('submitBtn');
                    submitBtn.innerHTML = '<span class="loading"></span> Sending your message...';
                    submitBtn.disabled = true;
                    
                    // Simulate form submission
                    setTimeout(function() {
                        // Store in localStorage
                        storeSubmission();
                        
                        // Show success message
                        document.getElementById('successMessage').style.display = 'block';
                        document.getElementById('replyPreview').style.display = 'block';
                        
                        // Reset form
                        form.reset();
                        document.getElementById('fileName').textContent = 'No file selected';
                        
                        // Reset button
                        submitBtn.innerHTML = '<span id="submitText">Send Message</span>';
                        submitBtn.disabled = false;
                    }, 2000);
                }
            });
        }
        
        function validateForm() {
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('fullName').value.trim();
            if (name === '') {
                showError('nameError');
                isValid = false;
            }
            
            // Validate email
            const email = document.getElementById('email').value.trim();
            if (!validateEmail(email)) {
                showError('emailError');
                isValid = false;
            }
            
            // Validate subject
            const subject = document.getElementById('subject').value;
            if (subject === '') {
                showError('subjectError');
                isValid = false;
            }
            
            // Validate message
            const message = document.getElementById('message').value.trim();
            if (message.length < 20) {
                showError('messageError');
                isValid = false;
            }
            
            // Validate file
            const fileInput = document.getElementById('attachment');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
                const maxSize = 3 * 1024 * 1024; // 3MB
                
                if (!validTypes.includes(file.type)) {
                    showError('fileError');
                    isValid = false;
                }
                
                if (file.size > maxSize) {
                    showError('fileError');
                    isValid = false;
                }
            }
            
            return isValid;
        }
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function showError(id) {
            document.getElementById(id).style.display = 'block';
        }
        
        function resetErrors() {
            const errors = document.querySelectorAll('.error-message');
            errors.forEach(error => {
                error.style.display = 'none';
            });
        }
        
        function storeSubmission() {
            const formData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // Get existing submissions or create new array
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            
            // Add new submission
            submissions.push(formData);
            
            // Save to localStorage
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        }
        
        // FAQ Accordion
        function initFAQ() {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', function() {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            });
        }
        
        // File Upload
        function initFileUpload() {
            const fileInput = document.getElementById('attachment');
            const fileName = document.getElementById('fileName');
            
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    fileName.textContent = this.files[0].name;
                } else {
                    fileName.textContent = 'No file selected';
                }
            });
        }
        
        // Cart and Wishlist
        function getCart() {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        }
        
        function getWishlist() {
            return JSON.parse(localStorage.getItem('wishlist') || '[]');
        }
        
        function initCart() {
            const cart = getCart();
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCount').textContent = cartCount;
        }
        
        function initWishlist() {
            const wishlist = getWishlist();
            document.getElementById('wishlistCount').textContent = wishlist.length;
        }