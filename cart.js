        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize components
            initThemeToggle();
            initCart();
            initWishlist();
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
        
        function saveCart(cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        
        function updateCartCount() {
            const cart = getCart();
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCount').textContent = cartCount;
        }
        
        function initCart() {
            const cart = getCart();
            displayCartItems(cart);
            calculateTotals();
            updateCartCount();
            
            // Handle checkout button
            document.getElementById('checkoutBtn').addEventListener('click', function() {
                if (cart.length === 0) {
                    showEmptyCartMessage();
                } else {
                    window.location.href = 'checkout.html';
                }
            });
        }
        
        function displayCartItems(cart) {
            const cartItemsList = document.getElementById('cartItemsList');
            
            if (cart.length === 0) {
                document.getElementById('emptyCart').style.display = 'block';
                document.querySelector('.cart-layout').style.display = 'none';
                return;
            }
            
            cartItemsList.innerHTML = '';
            
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.setAttribute('data-id', item.id);
                cartItem.innerHTML = `
                    <div class="item-info">
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-size">Size: ${item.size}</div>
                            <div class="item-price">$${item.price.toFixed(2)}</div>
                        </div>
                    </div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus-btn">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}">
                        <button class="quantity-btn plus-btn">+</button>
                    </div>
                    <div class="item-subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="item-remove">
                        <div class="remove-btn">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                `;
                cartItemsList.appendChild(cartItem);
                
                // Add event listeners to quantity buttons
                const minusBtn = cartItem.querySelector('.minus-btn');
                const plusBtn = cartItem.querySelector('.plus-btn');
                const quantityInput = cartItem.querySelector('.quantity-input');
                const removeBtn = cartItem.querySelector('.remove-btn');
                
                minusBtn.addEventListener('click', function() {
                    updateQuantity(item.id, item.size, parseInt(quantityInput.value) - 1);
                });
                
                plusBtn.addEventListener('click', function() {
                    updateQuantity(item.id, item.size, parseInt(quantityInput.value) + 1);
                });
                
                quantityInput.addEventListener('change', function() {
                    updateQuantity(item.id, item.size, parseInt(this.value));
                });
                
                removeBtn.addEventListener('click', function() {
                    removeItem(item.id, item.size);
                });
            });
        }
        
        function updateQuantity(productId, size, newQuantity) {
            if (newQuantity < 1) {
                removeItem(productId, size);
                return;
            }
            
            const cart = getCart();
            const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
            
            if (itemIndex !== -1) {
                cart[itemIndex].quantity = newQuantity;
                saveCart(cart);
                displayCartItems(cart);
                calculateTotals();
                updateCartCount();
                
                // Show update animation
                const itemElement = document.querySelector(`.cart-item[data-id="${productId}"]`);
                if (itemElement) {
                    itemElement.classList.add('updated');
                    setTimeout(() => {
                        itemElement.classList.remove('updated');
                    }, 500);
                }
            }
        }
        
        function removeItem(productId, size) {
            const cart = getCart();
            const updatedCart = cart.filter(item => !(item.id === productId && item.size === size));
            saveCart(updatedCart);
            
            // Animate removal
            const itemElement = document.querySelector(`.cart-item[data-id="${productId}"]`);
            if (itemElement) {
                itemElement.style.opacity = '0';
                itemElement.style.transform = 'translateX(-20px)';
                itemElement.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    displayCartItems(updatedCart);
                    calculateTotals();
                    updateCartCount();
                }, 300);
            }
        }
        
        function calculateTotals() {
            const cart = getCart();
            let subtotal = 0;
            
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
            });
            
            const shipping = subtotal > 100 ? 0 : 9.99;
            const tax = subtotal * 0.08; // 8% tax
            const total = subtotal + shipping + tax;
            
            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
            document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('total').textContent = `$${total.toFixed(2)}`;
        }
        
        function showEmptyCartMessage() {
            const successMsg = document.createElement('div');
            successMsg.textContent = `Your cart is empty! Please add items before proceeding.`;
            successMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--accent);
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
        }
        
        // Wishlist Management
        function getWishlist() {
            return JSON.parse(localStorage.getItem('wishlist') || '[]');
        }
        
        function initWishlist() {
            const wishlist = getWishlist();
            document.getElementById('wishlistCount').textContent = wishlist.length;
        }