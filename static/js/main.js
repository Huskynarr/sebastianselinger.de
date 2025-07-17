// Smooth scrolling für Navigation-Links
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

// Header Transparenz beim Scrollen
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Formular-Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        
        try {
            submitBtn.textContent = 'Wird gesendet...';
            submitBtn.disabled = true;
            
            // Hier würde die tatsächliche API-Anfrage erfolgen
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulierte Verzögerung
            
            // Erfolgsmeldung
            alert('Vielen Dank für Ihre Nachricht! Ich werde mich in Kürze bei Ihnen melden.');
            contactForm.reset();
        } catch (error) {
            alert('Es gab einen Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.');
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer für Fade-In Animationen
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Beobachte alle Sektionen
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Technologie-Stack Hover-Effekte
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'none';
    });
});

// Mobile Navigation Toggle
const createMobileNav = () => {
    const nav = document.querySelector('.nav-content');
    const navLinks = document.querySelector('.nav-links');
    
    const mobileNavBtn = document.createElement('button');
    mobileNavBtn.className = 'mobile-nav-btn';
    mobileNavBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    nav.insertBefore(mobileNavBtn, navLinks);
    
    mobileNavBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
};

// Initialisiere mobile Navigation
if (window.innerWidth <= 768) {
    createMobileNav();
}

// Aktualisiere mobile Navigation bei Größenänderung
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-nav-btn')) {
            createMobileNav();
        }
    } else {
        const mobileNavBtn = document.querySelector('.mobile-nav-btn');
        if (mobileNavBtn) {
            mobileNavBtn.remove();
        }
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    }
}); 