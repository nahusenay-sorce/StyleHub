        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize components
            initThemeToggle();
            initTabs();
            initTooltips();
            initSizeRecommender();
            initUnitToggle();
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

        // Category Tabs
        function initTabs() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const chartContainers = document.querySelectorAll('.chart-container');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Hide all chart containers
                    chartContainers.forEach(container => container.classList.remove('active'));
                    
                    // Show the selected chart
                    const category = this.getAttribute('data-category');
                    document.getElementById(`${category}-chart`).classList.add('active');
                });
            });
        }

        // Measurement Tooltips
        function initTooltips() {
            const measurePoints = document.querySelectorAll('.measure-point');
            
            measurePoints.forEach(point => {
                point.addEventListener('mouseenter', function() {
                    const tooltip = this.querySelector('.tooltip');
                    tooltip.style.display = 'block';
                    
                    // Position tooltip
                    const rect = this.getBoundingClientRect();
                    tooltip.style.left = rect.width + 10 + 'px';
                    tooltip.style.top = '50%';
                    tooltip.style.transform = 'translateY(-50%)';
                });
                
                point.addEventListener('mouseleave', function() {
                    const tooltip = this.querySelector('.tooltip');
                    tooltip.style.display = 'none';
                });
                
                // For touch devices
                point.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    const tooltip = this.querySelector('.tooltip');
                    tooltip.style.display = 'block';
                    
                    // Position tooltip
                    const rect = this.getBoundingClientRect();
                    tooltip.style.left = rect.width + 10 + 'px';
                    tooltip.style.top = '50%';
                    tooltip.style.transform = 'translateY(-50%)';
                });
            });
            
            // Hide tooltips when clicking elsewhere
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.measure-point')) {
                    document.querySelectorAll('.tooltip').forEach(tooltip => {
                        tooltip.style.display = 'none';
                    });
                }
            });
        }

        // Unit Toggle
        function initUnitToggle() {
            const unitButtons = document.querySelectorAll('.unit-btn');
            
            unitButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    unitButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get the unit type
                    const unit = this.getAttribute('data-unit');
                    
                    // Toggle visibility of units in tables
                    const tables = document.querySelectorAll('.size-table');
                    
                    tables.forEach(table => {
                        const cells = table.querySelectorAll('td');
                        cells.forEach(cell => {
                            const content = cell.textContent;
                            if (content.includes('/')) {
                                if (unit === 'cm') {
                                    cell.textContent = content.split('/')[0] + ' cm';
                                } else {
                                    cell.textContent = content.split('/')[1] + ' in';
                                }
                            }
                        });
                    });
                });
            });
        }

        // Size Recommender
        function initSizeRecommender() {
            const form = document.getElementById('sizeRecommender');
            const resultDiv = document.getElementById('recommendationResult');
            const resultText = document.getElementById('resultText');
            const viewProductsBtn = document.getElementById('viewProductsBtn');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const height = document.getElementById('height').value;
                const weight = document.getElementById('weight').value;
                const fit = document.getElementById('fit').value;
                
                // Simple recommendation logic
                let recommendedSize = 'M'; // Default
                
                if (height === 'short' && weight === 'light') {
                    recommendedSize = 'S';
                } else if (height === 'short' && weight === 'heavy') {
                    recommendedSize = fit === 'slim' ? 'M' : 'L';
                } else if (height === 'average' && weight === 'light') {
                    recommendedSize = fit === 'oversized' ? 'M' : 'S';
                } else if (height === 'average' && weight === 'medium') {
                    recommendedSize = 'M';
                } else if (height === 'average' && weight === 'heavy') {
                    recommendedSize = fit === 'slim' ? 'L' : 'XL';
                } else if (height === 'tall' && weight === 'light') {
                    recommendedSize = fit === 'slim' ? 'M' : 'L';
                } else if (height === 'tall' && weight === 'medium') {
                    recommendedSize = 'L';
                } else if (height === 'tall' && weight === 'heavy') {
                    recommendedSize = fit === 'slim' ? 'XL' : 'XXL';
                }
                
                // Show result
                resultText.textContent = `We recommend size ${recommendedSize} based on your input`;
                resultDiv.style.display = 'block';
                
                // Set the view products button to filter by size
                viewProductsBtn.addEventListener('click', function() {
                    localStorage.setItem('sizeFilter', recommendedSize);
                    window.location.href = 'shop.html';
                });
            });
        }