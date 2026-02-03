        // Product Data
        const products = [
            { id: 1, name: "Urban Dusk Hoodie", price: 89.99, category: "jackets", rating: 4.5, image: "hoodie-1.jpg", description: "Premium cotton blend hoodie with a modern silhouette. Features a kangaroo pocket and adjustable drawstring hood for comfort and style.", badge: "New", date: "2023-10-15" },
            { id: 2, name: "Noir Flex Jacket", price: 149.99, category: "jackets", rating: 4.8, image: "jacket-2 (2).jpg", description: "Water-resistant jacket with stretch technology for ultimate mobility. Perfect for transitional weather with its lightweight yet warm construction.", badge: "Best Seller", date: "2023-09-20" },
            { id: 3, name: "Stealth Chino Pants", price: 79.99, category: "pants", rating: 4.3, image: "pants-1.jpg", description: "Tailored chinos with a modern slim fit. Made from premium cotton twill with just the right amount of stretch for all-day comfort.", badge: "", date: "2023-10-05" },
            { id: 4, name: "Horizon Denim Shirt", price: 69.99, category: "shirts", rating: 4.6, image: "shirt-4.jpg", description: "Classic denim shirt with a contemporary fit. Features pearl snap buttons and reinforced stitching for durability.", badge: "", date: "2023-09-12" },
            { id: 5, name: "Apex Performance Shirt", price: 39.99, category: "shirts", rating: 4.4, image: "shirt-3.jpg", description: "Moisture-wicking performance tee designed for active lifestyles. Breathable fabric with odor control technology.", badge: "New", date: "2023-10-18" },
            { id: 6, name: "Terra Cargo Shorts", price: 64.99, category: "pants", rating: 4.2, image: "short.jpg", description: "Functional cargo shorts with a modern tailored fit. Multiple pockets provide utility without sacrificing style.", badge: "", date: "2023-08-22" },
            { id: 7, name: "Mariner Sweater", price: 99.99, category: "shirts", rating: 4.7, image: "sweater.jpg", description: "Premium merino wool sweater with a classic crew neck. Soft, warm, and naturally temperature regulating.", badge: "Best Seller", date: "2023-09-28" },
            { id: 8, name: "Velocity Track Pants", price: 74.99, category: "pants", rating: 4.5, image: "pants-2.jpg", description: "Performance track pants with moisture-wicking technology. Elastic waistband and tapered legs for a modern look.", badge: "", date: "2023-10-10" },
            { id: 9, name: "Shoes", price: 119.99, category: "accessories", rating: 4.9, image: "shoes-2.jpg", description: "Experience unmatched comfort with these stylish sneakers—featuring cushioned soles, breathable fabric, and a modern design for all-day wear. Perfect for any occasion!", badge: "New", date: "2023-10-22" },
            { id: 10, name: "Classic Oxford Shirt", price: 59.99, category: "shirts", rating: 4.6, image: "oxford-1.jpg", description: "Traditional oxford shirt in a modern slim fit. Made from premium cotton with a soft texture and durable construction.", badge: "", date: "2023-09-15" },
            { id: 11, name: "Nomad Travel Blazer", price: 179.99, category: "jackets", rating: 4.8, image: "blazer.jpg", description: "Wrinkle-resistant travel blazer with stretch for comfort. Features multiple interior pockets and a modern tailored fit.", badge: "Best Seller", date: "2023-08-30" },
            { id: 12, name: "Canyon Bootcut Jeans", price: 89.99, category: "pants", rating: 4.4, image: "jeans-b.jpg", description: "Premium denim jeans with a comfortable bootcut silhouette. Stretch fabric provides mobility while maintaining shape.", badge: "", date: "2023-10-08" },
            { id: 13, name: "Alpine Fleece Jacket", price: 109.99, category: "jackets", rating: 4.7, image: "jacket-a.jpg", description: "Warm fleece jacket with a full-zip front and stand collar. Brushed interior for maximum warmth and comfort.", badge: "", date: "2023-09-25" },
            { id: 14, name: "Belts", price: 54.99, category: "accessories", rating: 4.3, image: "belts.jpg", description: " Stylish and durable, this belt features a sleek design with a sturdy buckle, perfect for both casual and formal outfits.", badge: "New", date: "2023-10-20" },
            { id: 15, name: "Cap", price: 69.99, category: "accessories", rating: 4.6, image: "cap.jpg", description: "Sporty and trendy, this cap offers a snug fit, breathable fabric, and a curved brim for ultimate comfort and style.", badge: "", date: "2023-09-18" },
            { id: 16, name: "Metro Slim Suit", price: 349.99, category: "jackets", rating: 4.9, image: "suit.jpg", description: "Modern slim-fit suit with premium wool blend fabric. Features a notch lapel, two-button closure, and functional buttons.", badge: "Best Seller", date: "2023-10-05" },
            { id: 17, name: "Trail Hiking Boots", price: 129.99, category: "footwear", rating: 4.7, image: "leather-boots.jpg", description: "Durable hiking boots with waterproof membrane and Vibram outsole. Ankle support and cushioned footbed for all-day comfort.", badge: "New", date: "2023-10-12" },
            { id: 18, name: "Urban Sneakers", price: 89.99, category: "footwear", rating: 4.5, image: "urban.jpg", description: "Stylish urban sneakers with memory foam insoles. Lightweight and flexible for everyday wear with a modern design.", badge: "", date: "2023-09-22" },
            { id: 19, name: "Leather Belt", price: 49.99, category: "accessories", rating: 4.3, image: "closeup-belt.jpg", description: "Genuine leather belt with brushed nickel buckle. Available in multiple colors with a classic design that pairs with any outfit.", badge: "", date: "2023-10-14" },
            { id: 20, name: "Premium Watch", price: 199.99, category: "accessories", rating: 4.8, image: "hand-watch.jpg", description: "Minimalist premium watch with sapphire crystal glass. Water-resistant to 100m with a genuine leather strap.", badge: "Best Seller", date: "2023-09-10" }
        ];

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize components
            initThemeToggle();
            initProducts();
            initFilters();
            initPagination(1);
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

        // Products
        function initProducts() {
            displayProducts(products);
        }
        
        function generateRatingStars(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            if (halfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            return stars;
        }
        
        function displayProducts(productsToDisplay) {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = '';
            
            productsToDisplay.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    <div class="product-img-container">
                        <img src="${product.image}" alt="${product.name}" class="product-img">
                        <div class="product-actions">
                            <div class="product-action view-product" data-id="${product.id}">
                                <i class="fas fa-eye"></i>
                            </div>
                            <div class="product-action wishlist-product" data-id="${product.id}">
                                <i class="far fa-heart"></i>
                            </div>
                        </div>
                    </div>
                    <div class="product-details">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-rating">
                            ${generateRatingStars(product.rating)}
                        </div>
                        <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
            
            // Add event listeners to product actions
            document.querySelectorAll('.view-product').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    openProductModal(productId);
                });
            });
            
            document.querySelectorAll('.wishlist-product').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    toggleWishlist(productId, this);
                });
            });
            
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    addToCart(productId);
                });
            });
        }

        // Filters
        function initFilters() {
            const categoryFilter = document.getElementById('categoryFilter');
            const priceRange = document.getElementById('priceRange');
            const priceDisplay = document.getElementById('priceDisplay');
            const sortBy = document.getElementById('sortBy');
            const itemsPerPageButtons = document.querySelectorAll('.items-btn');
            const searchInput = document.getElementById('shopSearch');
            
            // Update price display
            priceRange.addEventListener('input', function() {
                priceDisplay.value = `$${this.value}`;
                filterProducts();
            });
            
            // Category filter
            categoryFilter.addEventListener('change', filterProducts);
            
            // Sort by
            sortBy.addEventListener('change', filterProducts);
            
            // Items per page
            itemsPerPageButtons.forEach(button => {
                button.addEventListener('click', function() {
                    itemsPerPageButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    filterProducts();
                });
            });
            
            // Search input
            searchInput.addEventListener('input', filterProducts);
        }
        
        function filterProducts() {
            const category = document.getElementById('categoryFilter').value;
            const maxPrice = document.getElementById('priceRange').value;
            const sortBy = document.getElementById('sortBy').value;
            const searchTerm = document.getElementById('shopSearch').value.toLowerCase();
            const itemsPerPage = document.querySelector('.items-btn.active').getAttribute('data-items');
            
            // Filter by category
            let filteredProducts = category === 'all' 
                ? [...products] 
                : products.filter(p => p.category === category);
            
            // Filter by price
            filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
            
            // Filter by search term
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(p => 
                    p.name.toLowerCase().includes(searchTerm) || 
                    p.description.toLowerCase().includes(searchTerm)
                );
            }
            
            // Sort products
            switch(sortBy) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case 'rating':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    // Default sorting (by ID)
                    filteredProducts.sort((a, b) => a.id - b.id);
            }
            
            // Update pagination with filtered products
            initPagination(1, filteredProducts);
        }

        // Pagination
        function initPagination(currentPage, productsToPaginate = products) {
            const itemsPerPage = parseInt(document.querySelector('.items-btn.active').getAttribute('data-items'));
            const totalPages = Math.ceil(productsToPaginate.length / itemsPerPage);
            const paginationContainer = document.getElementById('pagination');
            
            // Clear existing pagination
            paginationContainer.innerHTML = '';
            
            // Previous button
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.classList.add('pagination-prev');
            if (currentPage === 1) prevButton.classList.add('disabled');
            
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    initPagination(currentPage - 1, productsToPaginate);
                }
            });
            
            paginationContainer.appendChild(prevButton);
            
            // Page numbers
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);
            
            for (let i = startPage; i <= endPage; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                if (i === currentPage) pageButton.classList.add('active');
                
                pageButton.addEventListener('click', () => {
                    initPagination(i, productsToPaginate);
                });
                
                paginationContainer.appendChild(pageButton);
            }
            
            // Next button
            const nextButton = document.createElement('button');
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.classList.add('pagination-next');
            if (currentPage === totalPages) nextButton.classList.add('disabled');
            
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    initPagination(currentPage + 1, productsToPaginate);
                }
            });
            
            paginationContainer.appendChild(nextButton);
            
            // Display current page products
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, productsToPaginate.length);
            const currentProducts = productsToPaginate.slice(startIndex, endIndex);
            
            displayProducts(currentProducts);
        }

        // Product Modal
        function openProductModal(productId) {
            const product = products.find(p => p.id === parseInt(productId));
            if (!product) return;
            
            // Populate modal with product data
            document.getElementById('modalImg').src = product.image;
            document.getElementById('modalTitle').textContent = product.name;
            document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
            document.getElementById('modalRating').innerHTML = generateRatingStars(product.rating);
            document.getElementById('modalDescription').textContent = product.description;
            
            // Check if product is in wishlist
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            const isInWishlist = wishlist.includes(product.id);
            const wishlistBtn = document.getElementById('modalWishlist');
            
            if (isInWishlist) {
                wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
                wishlistBtn.classList.add('active');
            } else {
                wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
                wishlistBtn.classList.remove('active');
            }
            
            // Add event listeners to modal buttons
            wishlistBtn.addEventListener('click', function() {
                toggleWishlist(product.id, this);
            });
            
            document.querySelector('.btn-addtocart').addEventListener('click', function() {
                addToCart(product.id);
                // Close modal after adding to cart
                document.getElementById('productModal').classList.remove('active');
            });
            
            // Size selection
            document.querySelectorAll('.size-option').forEach(option => {
                option.addEventListener('click', function() {
                    document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });
            
            // Show modal
            document.getElementById('productModal').classList.add('active');
            
            // Close modal
            document.getElementById('closeModal').addEventListener('click', function() {
                document.getElementById('productModal').classList.remove('active');
            });
        }

        // Wishlist
        function initWishlist() {
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            document.getElementById('wishlistCount').textContent = wishlist.length;
            
            // Update wishlist icons
            document.querySelectorAll('.wishlist-product').forEach(button => {
                const productId = button.getAttribute('data-id');
                if (wishlist.includes(parseInt(productId))) {
                    button.innerHTML = '<i class="fas fa-heart"></i>';
                }
            });
        }
        
        function toggleWishlist(productId, element) {
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            const index = wishlist.indexOf(parseInt(productId));
            
            if (index === -1) {
                // Add to wishlist
                wishlist.push(parseInt(productId));
                element.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                // Remove from wishlist
                wishlist.splice(index, 1);
                element.innerHTML = '<i class="far fa-heart"></i>';
            }
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            document.getElementById('wishlistCount').textContent = wishlist.length;
        }

        // Cart
        function initCart() {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            document.getElementById('cartCount').textContent = cart.length;
        }
        
        function addToCart(productId) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const product = products.find(p => p.id === parseInt(productId));
            
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
                
                localStorage.setItem('cart', JSON.stringify(cart));
                document.getElementById('cartCount').textContent = cart.length;
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.textContent = `${product.name} added to cart!`;
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
            }
        }