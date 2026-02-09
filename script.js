document.addEventListener('DOMContentLoaded', () => {
    // Navigation Burger Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }

                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.padding = '15px 50px';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.padding = '20px 50px';
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate (e.g., cards coming into view)
    const cards = document.querySelectorAll('.club-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`; // Staggered delay
        observer.observe(card);
    });

    // Helper to trigger animation when visible
    const triggerAnimation = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const cardObserver = new IntersectionObserver(triggerAnimation, observerOptions);
    cards.forEach(card => cardObserver.observe(card));
});


// Countdown Timer Logic
function updateCountdowns() {
    const eventCards = document.querySelectorAll('.event-card[data-event-date]');

    eventCards.forEach(card => {
        const dateString = card.getAttribute('data-event-date');
        const targetDate = new Date(dateString).getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        const timerDisplay = card.querySelector('.countdown-timer');
        if (!timerDisplay) return; // Only update if element exists

        if (distance < 0) {
            timerDisplay.innerHTML = 'Event Started';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        timerDisplay.innerHTML = `<span>${days}d</span> : <span>${hours}h</span> : <span>${minutes}m</span>`;
    });
}

// Run countdown immediately and then every minute
updateCountdowns();
setInterval(updateCountdowns, 60000);

