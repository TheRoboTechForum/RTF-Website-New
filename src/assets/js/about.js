// Create subtle floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 8 + 's';

        // Smaller, more subtle particles
        const size = Math.random() * 2 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particlesContainer.appendChild(particle);
    }
}

// Animate numbers on scroll/load
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                let currentNumber = 0;
                const increment = finalNumber / 60;

                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        target.textContent = finalNumber + (target.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentNumber) + (target.textContent.includes('+') ? '+' : '');
                    }
                }, 50);

                observer.unobserve(target);
            }
        });
    });

    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

// Mobile menu functionality
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const navbar = document.querySelector('.navbar-div');
const overlay = document.getElementById('menu-overlay');

if (bar) {
    bar.addEventListener('click', () => {
        navbar.classList.add('active');
        overlay.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        navbar.classList.remove('active');
        overlay.classList.remove('active');
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        navbar.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// Close menu when clicking on a nav link (mobile)
const navLinks = document.querySelectorAll('#navbar li a:not(#close)');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateNumbers();
});

// Professional hover effects for cards
document.querySelectorAll('.content-card, .stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'rgba(59, 130, 246, 0.4)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'rgba(59, 130, 246, 0.2)';
    });
});
