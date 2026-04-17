// Duplicate photos for seamless scrolling
const photoTracks = document.querySelectorAll('.photo-track');
photoTracks.forEach(track => {
    const photos = track.innerHTML;
    track.innerHTML = photos + photos;
});

// Pause animation on hover
photoTracks.forEach(track => {
    const carousel = track.closest('.photo-carousel');
    carousel.addEventListener('mouseenter', () => {
        track.classList.add('paused');
    });
    carousel.addEventListener('mouseleave', () => {
        track.classList.remove('paused');
    });
});

// Mobile menu functionality - FIXED VERSION
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const navbar = document.querySelector('#navbar');
const overlay = document.getElementById('menu-overlay');

// Function to close mobile menu
function closeMobileMenu() {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Open mobile menu
if (bar) {
    bar.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navbar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close mobile menu
if (close) {
    close.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
    });
}

// Close menu when clicking on overlay
if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking on a nav link (mobile only)
const navLinks = document.querySelectorAll('#navbar li a:not(#close)');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Prevent clicks inside the navbar from closing the menu
if (navbar) {
    navbar.addEventListener('click', (e) => {
        if (e.target.id !== 'close' && !e.target.closest('#close')) {
            e.stopPropagation();
        }
    });
}
