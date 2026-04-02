// Language Toggle
let isEnglish = false;

function toggleLanguage() {
    isEnglish = !isEnglish;
    const langText = document.getElementById('lang-text');
    langText.textContent = isEnglish ? 'ES' : 'EN';
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-es]').forEach(el => {
        if (isEnglish) {
            el.textContent = el.getAttribute('data-en');
        } else {
            el.textContent = el.getAttribute('data-es');
        }
    });
    
    // Store preference
    localStorage.setItem('alebrije_lang', isEnglish ? 'en' : 'es');
}

// Load language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('alebrije_lang');
    if (savedLang === 'en') {
        toggleLanguage();
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Nav Toggle
function toggleNav() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    
    // Toggle hamburger animation
    const toggle = document.querySelector('.nav-toggle');
    toggle.classList.toggle('active');
}

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
    
    // Close other open items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Stats Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('social-proof')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for reveal animation
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Also observe sections
document.querySelectorAll('section').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Form Submission
function sendMessage(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const checkin = document.getElementById('checkin').value;
    const guests = document.getElementById('guests').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp message
    const whatsappMessage = `Hola! Me llamo ${name}.%0AEmail: ${email}%0ATeléfono: ${phone}%0AFecha de llegada: ${checkin}%0ANúmero de huéspedes: ${guests}%0A%0AMensaje: ${message}`;
    
    const whatsappUrl = `https://wa.me/529992160066?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert(isEnglish ? 'Message sent! We will contact you soon.' : '¡Mensaje enviado! Te contactaremos pronto.');
    
    // Reset form
    document.getElementById('bookingForm').reset();
}

// Add stagger animation to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card-flip');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Parallax effect for hero visual
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-img');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize animations on load
window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero .hero-label, .hero .hero-title, .hero .hero-subtitle, .hero .hero-buttons').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
});

// Service card touch support for mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.service-card-flip').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.toggle('hovered');
        });
    });
}

// Navbar link active state on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth reveal on scroll
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal, .service-card-flip, .testimonial-card, .gallery-item');
    
    reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial call
revealElements();

// Add scroll listener
window.addEventListener('scroll', revealElements);

// Set initial styles for animation
document.querySelectorAll('.reveal, .service-card-flip, .testimonial-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Add staggered animation to gallery items
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Add staggered animation to testimonial cards
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});
