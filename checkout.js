        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize components
            initThemeToggle();
            initCart();
            initPaymentMethods();
            initFormValidation();
            initPlaceOrder();
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

        // Cart Management
        function getCart() {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        }
        
        function updateCartCount() {
            const cart = getCart();
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCount').textContent = cartCount;
        }
        
        function initCart() {
            const cart = getCart();
            
            if (cart.length === 0) {
                // Redirect to cart page if cart is empty
                window.location.href = 'cart.html';
                return;
            }
            
            displayOrderItems(cart);
            calculateTotals();
            updateCartCount();
        }
        
        function displayOrderItems(cart) {
            const orderItemsContainer = document.getElementById('orderItems');
            orderItemsContainer.innerHTML = '';
            
            cart.forEach(item => {
                const orderItem = document.createElement('div');
                orderItem.className = 'order-item';
                orderItem.innerHTML = `
                    <div class="item-info">
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-size">Size: ${item.size} • Qty: ${item.quantity}</div>
                        </div>
                    </div>
                    <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                `;
                orderItemsContainer.appendChild(orderItem);
            });
        }
        
        function calculateTotals() {
            const cart = getCart();
            let subtotal = 0;
            
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
            });
            
            // Calculate shipping based on country
            const country = document.getElementById('country').value;
            let shipping = 0;
            
            if (country === 'us') {
                shipping = 9.99;
            } else if (country === 'ca' || country === 'uk') {
                shipping = 14.99;
            } else if (country === 'au') {
                shipping = 19.99;
            } else {
                shipping = 24.99;
            }
            
            // Calculate tax
            const tax = subtotal * 0.08; // 8% tax
            const total = subtotal + shipping + tax;
            
            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
            document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('total').textContent = `$${total.toFixed(2)}`;
            
            return { subtotal, shipping, tax, total };
        }
        
        // Payment Methods
        function initPaymentMethods() {
            const cardMethod = document.getElementById('cardMethod');
            const codMethod = document.getElementById('codMethod');
            const cardDetails = document.getElementById('cardDetails');
            
            cardMethod.addEventListener('click', function() {
                cardMethod.classList.add('active');
                codMethod.classList.remove('active');
                cardDetails.style.display = 'block';
            });
            
            codMethod.addEventListener('click', function() {
                codMethod.classList.add('active');
                cardMethod.classList.remove('active');
                cardDetails.style.display = 'none';
            });
            
            // Update shipping on country change
            document.getElementById('country').addEventListener('change', function() {
                calculateTotals();
            });
        }
        
        // Form Validation
        function initFormValidation() {
            const requiredFields = [
                'fullName', 'email', 'phone', 'address', 'country', 'city', 'zip'
            ];
            
            // Add blur event listeners to all required fields
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                field.addEventListener('blur', function() {
                    validateField(fieldId);
                });
            });
            
            // Card fields
            const cardFields = ['cardNumber', 'expDate', 'cvv', 'cardName'];
            cardFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                field.addEventListener('blur', function() {
                    if (document.getElementById('cardMethod').classList.contains('active')) {
                        validateField(fieldId);
                    }
                });
            });
            
            // Validate all fields on input change
            document.querySelectorAll('.form-input, .form-select').forEach(field => {
                field.addEventListener('input', function() {
                    validateForm();
                });
            });
        }
        
        function validateField(fieldId) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(`${fieldId}Error`);
            let isValid = true;
            
            // Reset error
            errorElement.style.display = 'none';
            field.classList.remove('error');
            
            // Check if field is empty
            if (!field.value.trim()) {
                showError(field, errorElement, 'This field is required');
                return false;
            }
            
            // Field-specific validation
            switch(fieldId) {
                case 'email':
                    if (!validateEmail(field.value)) {
                        showError(field, errorElement, 'Please enter a valid email');
                        isValid = false;
                    }
                    break;
                    
                case 'phone':
                    if (!validatePhone(field.value)) {
                        showError(field, errorElement, 'Please enter a valid phone number');
                        isValid = false;
                    }
                    break;
                    
                case 'cardNumber':
                    if (!validateCardNumber(field.value)) {
                        showError(field, errorElement, 'Please enter a valid card number');
                        isValid = false;
                    }
                    break;
                    
                case 'expDate':
                    if (!validateExpDate(field.value)) {
                        showError(field, errorElement, 'Please enter a valid expiration date (MM/YY)');
                        isValid = false;
                    }
                    break;
                    
                case 'cvv':
                    if (!validateCVV(field.value)) {
                        showError(field, errorElement, 'Please enter a valid CVV (3-4 digits)');
                        isValid = false;
                    }
                    break;
                    
                case 'zip':
                    if (!validateZip(field.value)) {
                        showError(field, errorElement, 'Please enter a valid ZIP code');
                        isValid = false;
                    }
                    break;
            }
            
            return isValid;
        }
        
        function validateForm() {
            let isValid = true;
            const requiredFields = [
                'fullName', 'email', 'phone', 'address', 'country', 'city', 'zip'
            ];
            
            // Validate required fields
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    isValid = false;
                }
            });
            
            // Validate card fields if card payment is selected
            if (document.getElementById('cardMethod').classList.contains('active')) {
                const cardFields = ['cardNumber', 'expDate', 'cvv', 'cardName'];
                cardFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (!field.value.trim()) {
                        isValid = false;
                    }
                });
            }
            
            // Enable/disable place order button
            const placeOrderBtn = document.getElementById('placeOrderBtn');
            placeOrderBtn.disabled = !isValid;
            
            return isValid;
        }
        
        function showError(field, errorElement, message) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            field.classList.add('error');
        }
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function validatePhone(phone) {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return re.test(phone);
        }
        
        function validateCardNumber(cardNumber) {
            // Simple validation - just check if it's 16 digits
            const re = /^[0-9]{16}$/;
            return re.test(cardNumber.replace(/\s+/g, ''));
        }
        
        function validateExpDate(expDate) {
            const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
            return re.test(expDate);
        }
        
        function validateCVV(cvv) {
            const re = /^[0-9]{3,4}$/;
            return re.test(cvv);
        }
        
        function validateZip(zip) {
            // Simple validation - just check if it's 5 digits
            const re = /^[0-9]{5}$/;
            return re.test(zip);
        }
        
        // Place Order
        function initPlaceOrder() {
            const placeOrderBtn = document.getElementById('placeOrderBtn');
            
            placeOrderBtn.addEventListener('click', function() {
                if (validateForm()) {
                    // Process the order
                    processOrder();
                }
            });
        }
        
        function processOrder() {
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            
            // Generate random order ID
            const orderId = 'VG-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
            
            // Update confirmation modal
            document.getElementById('orderId').textContent = '#' + orderId;
            document.getElementById('confirmEmail').textContent = email;
            
            // Show confirmation modal
            document.getElementById('confirmationModal').classList.add('active');
            
            // Clear cart
            localStorage.removeItem('cart');
            
            // Update cart count
            updateCartCount();
            
            // Close modal
            document.getElementById('closeModal').addEventListener('click', function() {
                document.getElementById('confirmationModal').classList.remove('active');
            });
        }