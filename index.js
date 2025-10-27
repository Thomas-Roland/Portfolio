document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}

function handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.borderBottomColor = '#ff6b6b';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.borderBottomColor = '#333';
    }
}

function handleFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }

            alert('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
            this.reset();
        });
    }
}

function initSkillCards() {
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}
function initProjectCards() {
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function handleMenuToggle() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    toggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

function handleProjectFiltering() {
    const buttons = document.querySelectorAll('.project-nav-btn');
    const categories = document.querySelectorAll('.project-category');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selected = btn.dataset.category;

            categories.forEach(cat => {
                if (selected === 'all' || cat.classList.contains(selected)) {
                    cat.classList.add('active');
                } else {
                    cat.classList.remove('active');
                }
            });
        });
    });
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.scrollToTop = scrollToTop;

document.addEventListener('DOMContentLoaded', function () {
    handleFormSubmission();
    handleMenuToggle();
    initSkillCards();
    initProjectCards();
    animateOnScroll();
    handleProjectFiltering();
});

// Debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    animateOnScroll();
    handleScroll();
}, 10));
