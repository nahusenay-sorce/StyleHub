document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.querySelector('.auth-form');
    
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Check if email is already registered
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
            alert('Email already registered. Please login instead.');
            return;
        }
        
        // Create new user
        const newUser = {
            email,
            password,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    });
});



// For signin.js
const username = document.getElementById('username').value;
// Add username to the newUser object


