        // Product Data
        const products = [
            {
                id: 1,
                name: "Urban Dusk Hoodie",
                price: 89.99,
                image: "hoodie-1.jpg",
                rating: 4.5,
                description: "Premium cotton blend hoodie with a modern silhouette. Features a kangaroo pocket and adjustabledrawstring hood for comfort and style.",
                badge: "New"
            },
            {
                id: 2,
                name: "Noir Flex Jacket",
                price: 149.99,
                image: "jacket-2 (2).jpg",
                rating: 4.8,
                description: "Water-resistant jacket with stretch technology for ultimate mobility. Perfect for transitional weatherwith its lightweight yet warm construction.",
                badge: "Best Seller"
            },
            {
                id: 3,
                name: "Stealth Chino Pants",
                price: 79.99,
                image: "pants-1.jpg",
                rating: 4.3,
                description: "Tailored chinos with a modern slim fit. Made from premium cotton twill with just the right amountof stretch for all-day comfort.",
                badge: ""
            },
            {
                id: 4,
                name: "Horizon Denim Shirt",
                price: 69.99,
                image: "shirt-4.jpg",
                rating: 4.6,
                description: "Classic denim shirt with a contemporary fit. Features pearl snap buttons and reinforced stitching fordurability.",
                badge: ""
            },
            {
                id: 5,
                name: "Apex Performance Tee",
                price: 39.99,
                image: "shirt-3.jpg",
                rating: 4.4,
                description: "Moisture-wicking performance tee designed for active lifestyles. Breathable fabric with odor controltechnology.",
                badge: "New"
            },
            {
                id: 6,
                name: "Terra Cargo Shorts",
                price: 64.99,
                image: "short.jpg",
                rating: 4.2,
                description: "Functional cargo shorts with a modern tailored fit. Multiple pockets provide utility withoutsacrificing style.",
                badge: ""
            },
            {
                id: 7,
                name: "Mariner Sweater",
                price: 99.99,
                image: "sweater.jpg",
                rating: 4.7,
                description: "Premium merino wool sweater with a classic crew neck. Soft, warm, and naturally temperatureregulating.",
                badge: "Best Seller"
            },
            {
                id: 8,
                name: "Velocity Track Pants",
                price: 74.99,
                image: "pants-2.jpg",
                rating: 4.5,
                description: "Performance track pants with moisture-wicking technology. Elastic waistband and tapered legs for amodern look.",
                badge: ""
            },
            {
                id: 9,
                name: "shoe",
                price: 119.99,
                image: "shoes-2.jpg",
                rating: 4.9,
                description: "Experience unmatched comfort with these stylish sneakers—featuring cushioned soles, breathable fabric, and a modern design for all-day wear. Perfect for any occasion!",
                badge: "New"
            },
            {
                id: 10,
                name: "Classic Oxford Shirt",
                price: 59.99,
                image: "oxford-1.jpg",
                rating: 4.6,
                description: "Traditional oxford shirt in a modern slim fit. Made from premium cotton with a soft texture anddurable construction.",
                badge: ""
            },
            {
                id: 11,
                name: "Nomad Travel Blazer",
                price: 179.99,
                image: "blazer.jpg",
                rating: 4.8,
                description: "Wrinkle-resistant travel blazer with stretch for comfort. Features multiple interior pockets and amodern tailored fit.",
                badge: "Best Seller"
            },
            {
                id: 12,
                name: "Canyon Bootcut Jeans",
                price: 89.99,
                image: "jeans-b.jpg",
                rating: 4.4,
                description: "Premium denim jeans with a comfortable bootcut silhouette. Stretch fabric provides mobility whilemaintaining shape.",
                badge: ""
            },
            {
                id: 13,
                name: "Alpine Fleece Jacket",
                price: 109.99,
                image: "jacket-a.jpg",
                rating: 4.7,
                description: "Warm fleece jacket with a full-zip front and stand collar. Brushed interior for maximum warmthand comfort.",
                badge: ""
            },
            {
                id: 14,
                name: "Belts",
                price: 54.99,
                image: "belts.jpg",
                rating: 4.3,
                description: "Stylish and durable, this belt features a sleek design with a sturdy buckle, perfect for both casual and formal outfits.",
                badge: "New"
            },
            {
                id: 15,
                name: "Cap",
                price: 69.99,
                image: "cap.jpg",
                rating: 4.6,
                description: "Sporty and trendy, this cap offers a snug fit, breathable fabric, and a curved brim for ultimate comfort and style.",
                badge: ""
            },
            {
                id: 16,
                name: "Metro Slim Suit",
                price: 349.99,
                image: "suit.jpg",
                rating: 4.9,
                description: "Modern slim-fit suit with premium wool blend fabric. Features a notch lapel, two-button closure,and functional buttons.",
                badge: "Best Seller"
            }
        ];
        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Check for existing session
            checkSession();
            // Initialize components
            initLogin();
            initCarousel();
            initThemeToggle();
            initProducts();
            initTestimonials();
            initPromoTimer();
        });
        // Session Management
        function checkSession() {
            const user = localStorage.getItem('user');
            if (user) {
                document.getElementById('loginModal').classList.remove('active');
                document.getElementById('homepageContent').style.display = 'block';
            }
        }
        // Login System
        function initLogin() {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const loginBtn = document.getElementById('loginBtn');
            const closeLogin = document.getElementById('closeLogin');
            const signupLink = document.getElementById('signupLink');
            // Email validation
            emailInput.addEventListener('input', function() {
                const email = emailInput.value.trim();
                if (!validateEmail(email)) {
                    emailError.style.display = 'block';
                } else {
                    emailError.style.display = 'none';
                }
            });
            // Password validation
            passwordInput.addEventListener('input', function() {
                const password = passwordInput.value;
                if (password.length < 6) {
                    passwordError.style.display = 'block';
                } else {
                    passwordError.style.display = 'none';
                }
            });
            // Login button click
            loginBtn.addEventListener('click', function() {
                const email = emailInput.value.trim();
                const password = passwordInput.value;
                if (!validateEmail(email)) {
                    emailError.style.display = 'block';
                    return;
                }
                if (password.length < 6) {
                    passwordError.style.display = 'block';
                    return;
                }
                // Save user to localStorage
                localStorage.setItem('user', JSON.stringify({ email }));
                // Hide login modal and show homepage
                document.getElementById('loginModal').classList.remove('active');
                document.getElementById('homepageContent').style.display = 'block';
                // Initialize cart and wishlist
                initCart();
                initWishlist();
            });
            // Close modal button
            closeLogin.addEventListener('click', function() {
                document.getElementById('loginModal').classList.remove('active');
            });
            // Signup link
            signupLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Sign up functionality would be implemented here. For this demo, you can use any valid email and passwordwith at least 6 characters to login.');
            });
        }
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
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
                })
            };
        // Carousel
        function initCarousel() {
            const carouselItems = document.querySelectorAll('.carousel-item');
            const dots = document.querySelectorAll('.carousel-dot');
            const prevBtn = document.querySelector('.carousel-prev');
            const nextBtn = document.querySelector('.carousel-next');
            let currentIndex = 0;
            let interval;
            // Show slide
            function showSlide(index) {
                carouselItems.forEach(item => item.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                carouselItems[index].classList.add('active');
                dots[index].classList.add('active');
                currentIndex = index;
            }
            // Next slide
            function nextSlide() {
                let newIndex = currentIndex + 1;
                if (newIndex >= carouselItems.length) newIndex = 0;
                showSlide(newIndex);
            }
            // Previous slide
            function prevSlide() {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = carouselItems.length - 1;
                showSlide(newIndex);
            }
            // Start auto rotation
            function startCarousel() {
                interval = setInterval(nextSlide, 5000);
            }
            // Stop auto rotation
            function stopCarousel() {
                clearInterval(interval);
            }
            // Event listeners
            prevBtn.addEventListener('click', function() {
                prevSlide();
                stopCarousel();
                startCarousel();
            });
            nextBtn.addEventListener('click', function() {
                nextSlide();
                stopCarousel();
                startCarousel();
            });
            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    showSlide(index);
                    stopCarousel();
                    startCarousel();
                });
            });
            // Start the carousel
            showSlide(0);
            startCarousel();
        }
        // Products
        function initProducts() {
            const productsGrid = document.getElementById('productsGrid');
            // Generate product cards
            products.forEach(product => {
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
            // Initialize search functionality
            const searchInput = document.querySelector('.search-input');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
 filterProducts(searchTerm);
            });
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
        function filterProducts(searchTerm) {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
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
            }
                element.innerHTML = '<i class="far fa-heart"></i>';
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
        // Testimonials
        function initTestimonials() {
            const testimonialSlides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.testimonial-dot');
            let currentIndex = 0;
            // Show slide
            function showSlide(index) {
                testimonialSlides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                testimonialSlides[index].classList.add('active');
                dots[index].classList.add('active');
                currentIndex = index;
            }
            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    showSlide(index);
                });
            });
            // Auto rotate
            setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonialSlides.length) newIndex = 0;
                showSlide(newIndex);
            }, 5000);
            // Show first slide
            showSlide(0);
        }
        // Promo Timer
        function initPromoTimer() {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            // Set end date (3 days from now)
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 3);
            function updateTimer() {
                const now = new Date();
                const diff = endDate - now;
                if (diff <= 0) {
                    // Sale has ended
                    daysEl.textContent = '00';
                    hoursEl.textContent = '00';
                    minutesEl.textContent = '00';
                    secondsEl.textContent = '00';
                    return;
                }
                // Calculate time remaining
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                // Update elements
                daysEl.textContent = days.toString().padStart(2, '0');
                hoursEl.textContent = hours.toString().padStart(2, '0');
                minutesEl.textContent = minutes.toString().padStart(2, '0');
                secondsEl.textContent = seconds.toString().padStart(2, '0');
            }
            // Update timer every second
            setInterval(updateTimer, 1000);
            updateTimer();
        }
        