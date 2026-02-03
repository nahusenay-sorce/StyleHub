        //localstorage use
        const products = [
            {
                id: 1,
                name: "Urban Dusk Hoodie",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Premium cotton blend hoodie with modern silhouette",
                category: "Jackets"
            },
            {
                id: 2,
                name: "Noir Flex Jacket",
                price: 149.99,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Water-resistant jacket with stretch technology",
                category: "Jackets"
            },
            {
                id: 3,
                name: "Stealth Chino Pants",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Tailored chinos with modern slim fit",
                category: "Pants"
            },
            {
                id: 4,
                name: "Velocity Track Pants",
                price: 74.99,
                image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb4.0.3&id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Performance track pants with moisture-wicking technology",
                category: "Pants"
            }
        ];
        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize components
            initThemeToggle();
            checkLogin();
            initWishlist();
            initCart();
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
                }
                    localStorage.setItem('theme', 'light');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
            });
        }
        // Check if user is logged in
        function checkLogin() {
            const user = localStorage.getItem('user');
            if (!user) {
                document.getElementById('loginOverlay').classList.add('active');
            }
        }
        // Wishlist Management
        function getWishlist() {
            return JSON.parse(localStorage.getItem('wishlist') || '[]');
        }
        function saveWishlist(wishlist) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
        function updateWishlistCount() {
            const wishlist = getWishlist();
            document.getElementById('wishlistCount').textContent = wishlist.length;
        }
        function initWishlist() {
            const wishlist = getWishlist();
            displayWishlistItems(wishlist);
            updateWishlistCount();
        }
        function displayWishlistItems(wishlist) {
            const wishlistGrid = document.getElementById('wishlistGrid');
            if (wishlist.length === 0) {
                wishlistGrid.innerHTML = `
                    <div class="empty-wishlist">
                        <div class="empty-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <h3 class="empty-title">You haven't saved anything yet 
�
�
 </h3>
                        <p class="empty-text">Explore our collection and add items to your wishlist to save them for later.</p>
                        <a href="#" class="btn btn-addtocart">
                            <i class="fas fa-bag-shopping"></i> Discover New Styles
                        </a>
                    </div>
                `;
                return;
            }
            wishlistGrid.innerHTML = '';
            wishlist.forEach(itemId => {
                const product = products.find(p => p.id === itemId);
                if (!product) return;
                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'wishlist-card';
                wishlistItem.innerHTML = `
                    <div class="wishlist-img-container">
                        <img src="${product.image}" alt="${product.name}" class="wishlist-img">
                        <div class="wishlist-actions">
                            <div class="wishlist-action heart" data-id="${product.id}">
                                <i class="fas fa-heart"></i>
                            </div>
                        </div>
                    </div>
                    <div class="wishlist-details">
                        <h3 class="wishlist-name">${product.name}</h3>
                        <p class="wishlist-desc">${product.description}</p>
                        <div class="wishlist-price">$${product.price.toFixed(2)}</div>
                        <div class="wishlist-buttons">
                            <button class="btn btn-addtocart" data-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn btn-view" data-id="${product.id}">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                `;
                wishlistGrid.appendChild(wishlistItem);
                // Add event listeners to action buttons
                const removeBtn = wishlistItem.querySelector('.heart');
                const addToCartBtn = wishlistItem.querySelector('.btn-addtocart');
                const viewBtn = wishlistItem.querySelector('.btn-view');
                removeBtn.addEventListener('click', function() {
                    removeFromWishlist(product.id, wishlistItem);
                });
        
                addToCartBtn.addEventListener('click', function() {
                    addToCart(product.id);
                });
            });
        }
        function removeFromWishlist(productId, element) {
            const wishlist = getWishlist();
            const updatedWishlist = wishlist.filter(id => id !== productId);
            saveWishlist(updatedWishlist);
            // Animate removal
            element.style.opacity = '0';
            element.style.transform = 'scale(0.8)';
            element.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                displayWishlistItems(updatedWishlist);
                updateWishlistCount();
            }, 300);
            // Show animation on heart
            const heartIcon = element.querySelector('.heart i');
            heartIcon.style.animation = 'heartBeat 0.6s ease';
            setTimeout(() => {
                heartIcon.style.animation = '';
            }, 600);
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
            updateCartCount();
        }
        function addToCart(productId) {
            const cart = getCart();
            const product = products.find(p => p.id === productId);
            if (product) {
                // Check if product is already in cart
                const existingItem = cart.find(item => item.id === product.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                }
                saveCart(cart);
                updateCartCount();
                showToast(`${product.name} added to cart!`);
            }
        }
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.querySelector('.toast-message').textContent = message;
            toast.classList.add('visible');
            setTimeout(() => {
                toast.classList.remove('visible');
            }, 3000);
        }