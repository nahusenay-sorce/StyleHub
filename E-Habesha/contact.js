document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            date: new Date().toISOString()
        };
        
        // Save to localStorage (in a real app, you would send this to a server)
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(formData);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
});


