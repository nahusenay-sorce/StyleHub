        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize components
            initThemeToggle();
            initAccordions();
            initSearch();
            initBackToTop();
            initContactForm();
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
        // Accordion Functionality
        function initAccordions() {
            const questions = document.querySelectorAll('.faq-question');
            questions.forEach(question => {
                question.addEventListener('click', function() {
                    const answer = this.nextElementSibling;
                    const isActive = this.classList.contains('active');
                    // Close all accordions
                    questions.forEach(q => {
                        q.classList.remove('active');
                        q.nextElementSibling.classList.remove('active');
                    });
                    // Open clicked accordion if it was closed
                    if (!isActive) {
                        this.classList.add('active');
                        answer.classList.add('active');
                    }
                });
            });
        }
        // Search Functionality
        function initSearch() {
            const searchInput = document.getElementById('faqSearch');
            const searchResults = document.getElementById('searchResults');
            const questions = document.querySelectorAll('.faq-question');
            const answers = document.querySelectorAll('.faq-answer');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.trim().toLowerCase();
                searchResults.innerHTML = '';
                if (searchTerm.length < 2) {
                    searchResults.classList.remove('active');
                    return;
                }
                
                let hasResults = false;
                
                // Search through questions and answers
                questions.forEach((question, index) => {
                    const questionText = question.textContent.toLowerCase();
                    const answer = answers[index];
                    const answerText = answer.textContent.toLowerCase();
                    
                    if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                        hasResults = true;
                        
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result-item';
                        
                        // Highlight matching text
                        const highlightedQuestion = highlightText(questionText, searchTerm);
                        const highlightedAnswer = highlightText(answerText.substring(0, 150) + '...', searchTerm);
                        
                        resultItem.innerHTML = `
                            <h4>${highlightedQuestion}</h4>
                            <p>${highlightedAnswer}</p>
                        `;
                        
                        resultItem.addEventListener('click', function() {
                            // Close all accordions
                            questions.forEach(q => {
                                q.classList.remove('active');
                                q.nextElementSibling.classList.remove('active');
                            });
                            
                            // Open the selected accordion
                            question.classList.add('active');
                            answer.classList.add('active');
                            
                            // Scroll to the question
                            question.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            
                            // Clear search and hide results
                            searchInput.value = '';
                            searchResults.classList.remove('active');
                        });
                        
                        searchResults.appendChild(resultItem);
                    }
                });
                if (hasResults) {
                    searchResults.classList.add('active');
                } else {
                    searchResults.innerHTML = '<div class="no-results">We couldn\'t find that. Try a different keyword or contactus directly.</div>';
                    searchResults.classList.add('active');
                }
            });
            // Close search results when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchResults.contains(e.target) && e.target !== searchInput) {
                    searchResults.classList.remove('active');
                }
            });
        }
        function highlightText(text, searchTerm) {
            if (!searchTerm) return text;
            const regex = new RegExp(searchTerm, 'gi');
            return text.replace(regex, match => `<span class="highlight">${match}</span>`);
        }
        // Back to Top Button
        function initBackToTop() {
            const backToTopBtn = document.getElementById('backToTop');
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        // Contact Form Validation
        function initContactForm() {
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Simple validation
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                if (name && email && subject && message) {
                    // Form is valid - in a real app you would submit to a server
                    alert('Thank you for your message! Our support team will respond within 24 hours.');
                    contactForm.reset();
                } else {
                    alert('Please fill in all fields.');
                }
            });
        }