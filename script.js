// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message, my dude! We will get back to you soon.');
        this.reset();
    });
}

// Add animation to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Update button icon
    darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
});

// Interactive counter functionality
const counterValue = document.getElementById('counter-value');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');

// Load counter value from localStorage or default to 0
let count = parseInt(localStorage.getItem('counter') || '0');
counterValue.textContent = count;

// Update counter display
function updateCounter() {
    counterValue.textContent = count;
    localStorage.setItem('counter', count.toString());
    
    // Add animation effect
    counterValue.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counterValue.style.transform = 'scale(1)';
    }, 200);
}

// Increment button
if (incrementBtn) {
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();
    });
}

// Decrement button
if (decrementBtn) {
    decrementBtn.addEventListener('click', function() {
        count--;
        updateCounter();
    });
}

// Reset button
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
    });
} 