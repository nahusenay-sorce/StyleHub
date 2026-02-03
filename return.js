        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize components
            initThemeToggle();
            initCollapsibleSections();
            initFAQAccordion();
            initFileUpload();
            initFormValidation();
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

        // Collapsible Sections
        function initCollapsibleSections() {
            const sections = [
                { header: 'returnsHeader', content: 'returnsContent' },
                { header: 'refundsHeader', content: 'refundsContent' }
            ];
            
            sections.forEach(section => {
                const header = document.getElementById(section.header);
                const content = document.getElementById(section.content);
                const icon = header.querySelector('.collapsible-icon');
                
                // Open the first section by default
                if (section.header === 'returnsHeader') {
                    content.classList.add('active');
                    icon.classList.add('fa-chevron-up');
                    icon.classList.remove('fa-chevron-down');
                }
                
                header.addEventListener('click', function() {
                    content.classList.toggle('active');
                    icon.classList.toggle('fa-chevron-up');
                    icon.classList.toggle('fa-chevron-down');
                });
            });
        }

        // FAQ Accordion
        function initFAQAccordion() {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const icon = question.querySelector('i');
                
                question.addEventListener('click', function() {
                    // Close all other answers
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.querySelector('.faq-answer').classList.remove('active');
                            otherItem.querySelector('.faq-question i').classList.remove('fa-chevron-up');
                            otherItem.querySelector('.faq-question i').classList.add('fa-chevron-down');
                        }
                    });
                    
                    // Toggle current answer
                    answer.classList.toggle('active');
                    icon.classList.toggle('fa-chevron-up');
                    icon.classList.toggle('fa-chevron-down');
                });
            });
        }

        // File Upload
        function initFileUpload() {
            const fileInput = document.getElementById('photoUpload');
            const fileName = document.getElementById('fileName');
            
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    fileName.textContent = this.files[0].name;
                } else {
                    fileName.textContent = 'No file chosen';
                }
            });
        }

        // Form Validation
        function initFormValidation() {
            const form = document.querySelector('.return-form');
            const submitBtn = document.getElementById('submitReturn');
            
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const fullName = document.getElementById('fullName');
                const email = document.getElementById('email');
                const orderNumber = document.getElementById('orderNumber');
                const productName = document.getElementById('productName');
                const reason = document.getElementById('reason');
                
                let isValid = true;
                
                // Reset errors
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('error');
                });
                
                // Validate fields
                if (!fullName.value.trim()) {
                    isValid = false;
                    showError(fullName, 'Please enter your full name');
                }
                
                if (!email.value.trim() || !validateEmail(email.value)) {
                    isValid = false;
                    showError(email, 'Please enter a valid email address');
                }
                
                if (!orderNumber.value.trim()) {
                    isValid = false;
                    showError(orderNumber, 'Please enter your order number');
                }
                
                if (!productName.value.trim()) {
                    isValid = false;
                    showError(productName, 'Please enter the product name');
                }
                
                if (!reason.value) {
                    isValid = false;
                    showError(reason, 'Please select a reason for return');
                }
                
                // Submit if valid
                if (isValid) {
                    // In a real app, this would submit to a server
                    alert('Your return request has been submitted successfully! Our team will contact you within 24 business hours.');
                    form.reset();
                    document.getElementById('fileName').textContent = 'No file chosen';
                }
            });
        }
        
        function showError(field, message) {
            const formGroup = field.closest('.form-group');
            formGroup.classList.add('error');
            
            let errorElement = formGroup.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = 'var(--accent)';
                errorElement.style.marginTop = '5px';
                errorElement.style.fontSize = '0.9rem';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
        }
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }