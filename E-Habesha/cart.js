document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Display cart items
    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            subtotalElement.textContent = '0 ETB';
            totalElement.textContent = '0 ETB';
            updateCartCounter(0);
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            const totalPrice = price * item.quantity;
            subtotal += totalPrice;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML =// In the displayCartItems function, modify the cartItemElement.innerHTML
cartItemElement.innerHTML = `
    <div class="item-details">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="rating" data-index="${index}">
            <i class="far fa-star" data-rating="1"></i>
            <i class="far fa-star" data-rating="2"></i>
            <i class="far fa-star" data-rating="3"></i>
            <i class="far fa-star" data-rating="4"></i>
            <i class="far fa-star" data-rating="5"></i>
            <span class="rating-text">${item.rating ? 'Rated: ' + item.rating + '/5' : 'Not rated yet'}</span>
        </div>
        <textarea class="comment-box" placeholder="Add your comment..." data-index="${index}">${item.comment || ''}</textarea>
    </div>
    <div class="item-actions">
        <div class="quantity-control">
            <button class="decrease-quantity" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-quantity" data-index="${index}">+</button>
        </div>
        <p class="item-price">${totalPrice.toLocaleString()} ETB</p>
        <p class="remove-item" data-index="${index}">Remove</p>
    </div>
`;
            
            cartItemsContainer.appendChild(cartItemElement);
            
            // Initialize rating stars if item has rating
            if (item.rating) {
                const stars = cartItemElement.querySelectorAll('.rating i');
                stars.forEach((star, i) => {
                    if (i < item.rating) {
                        star.classList.remove('far');
                        star.classList.add('fas');
                    }
                });
            }
        });
        
        subtotalElement.textContent = subtotal.toLocaleString() + ' ETB';
        totalElement.textContent = subtotal.toLocaleString() + ' ETB';
        updateCartCounter(cart.reduce((total, item) => total + item.quantity, 0));
    }
    
    // Update cart counter in header
    function updateCartCounter(count) {
        document.querySelectorAll('.cart-counter').forEach(counter => {
            counter.textContent = count;
        });
    }
    
    // Event delegation for quantity controls and remove buttons
    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('decrease-quantity')) {
            const index = e.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            }
        }
        
        if (e.target.classList.contains('increase-quantity')) {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        }
        
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        }
        
        // Rating stars
        if (e.target.classList.contains('fa-star')) {
            const rating = parseInt(e.target.getAttribute('data-rating'));
            const index = e.target.closest('.rating').getAttribute('data-index');
            cart[index].rating = rating;
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update star display
            const stars = e.target.closest('.rating').querySelectorAll('i');
            stars.forEach((star, i) => {
                if (i < rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                } else {
                    star.classList.remove('fas');
                    star.classList.add('far');
                }
            });
            
            // Update rating text
            e.target.closest('.rating').querySelector('.rating-text').textContent = `Rated: ${rating}/5`;
        }
    });
    
    // Save comments when changed
    cartItemsContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('comment-box')) {
            const index = e.target.getAttribute('data-index');
            cart[index].comment = e.target.value;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });
    
    // Initialize cart display
    displayCartItems();
});



