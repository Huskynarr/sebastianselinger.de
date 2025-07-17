/**
 * Modern Navigation Menu JavaScript
 * Enhanced functionality for the navigation menu
 */

class ModernMenu {
    constructor() {
        this.menu = document.querySelector('.modern-menu');
        this.mobileToggle = document.querySelector('.modern-mobile-toggle');
        this.mobileNav = document.querySelector('.modern-mobile-nav');
        this.navLinks = document.querySelectorAll('.modern-nav-link, .modern-mobile-nav-link');
        this.scrollTopBtn = document.querySelector('.modern-scroll-top');
        this.progressBar = document.querySelector('.modern-menu-progress');
        
        this.isMenuOpen = false;
        this.currentSection = 'home';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupActiveSection();
        this.setupProgressBar();
        this.setupScrollToTop();
    }
    
    setupEventListeners() {
        // Mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.classList.contains('modern-mobile-nav-link')) {
                    this.closeMobileMenu();
                }
                this.handleNavClick(e, link);
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.mobileNav.contains(e.target) && !this.mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    setupScrollEffects() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        const aboutMeSection = document.getElementById('about-me');

        // Menu background effect - Übergang zum schwarzen Hintergrund wenn "Who I am" erreicht wird
        if (aboutMeSection && scrollY > aboutMeSection.offsetTop - 100) {
            this.menu.classList.add('scrolled');
            this.menu.classList.remove('transparent');
        } else {
            this.menu.classList.remove('scrolled');
            this.menu.classList.add('transparent');
        }

        // Update active section
        this.updateActiveSection();

        // Update progress bar
        this.updateProgressBar();

        // Show/hide scroll to top button
        this.updateScrollToTop(scrollY);
    }
    
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                if (this.currentSection !== sectionId) {
                    this.currentSection = sectionId;
                    this.updateActiveNavLinks(sectionId);
                }
            }
        });
    }
    
    updateActiveNavLinks(activeSection) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupSmoothScrolling() {
        // Enhanced smooth scrolling with easing
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        this.smoothScrollTo(targetElement);
                        
                        // Track navigation clicks
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'navigation_click', {
                                event_category: 'Navigation',
                                event_label: targetId
                            });
                        }
                    }
                });
            }
        });
    }
    
    smoothScrollTo(element) {
        const targetPosition = element.offsetTop - 80; // Account for fixed menu
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.isMenuOpen = true;
        this.mobileToggle.classList.add('active');
        this.mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add stagger animation to menu items
        const menuItems = this.mobileNav.querySelectorAll('.modern-mobile-nav-item');
        menuItems.forEach((item, index) => {
            item.style.transitionDelay = `${0.1 + index * 0.1}s`;
        });
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileToggle.classList.remove('active');
        this.mobileNav.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset transition delays
        const menuItems = this.mobileNav.querySelectorAll('.modern-mobile-nav-item');
        menuItems.forEach(item => {
            item.style.transitionDelay = '';
        });
    }
    
    handleNavClick(e, link) {
        // Add ripple effect
        this.createRippleEffect(e, link);
        
        // Update active state immediately for better UX
        this.navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    }
    
    createRippleEffect(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    setupProgressBar() {
        if (!this.progressBar) return;
        
        this.updateProgressBar();
    }
    
    updateProgressBar() {
        if (!this.progressBar) return;
        
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        this.progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
    
    setupScrollToTop() {
        if (!this.scrollTopBtn) return;
        
        this.scrollTopBtn.addEventListener('click', () => {
            this.smoothScrollTo(document.body);
        });
    }
    
    updateScrollToTop(scrollY) {
        if (!this.scrollTopBtn) return;
        
        if (scrollY > 300) {
            this.scrollTopBtn.classList.add('visible');
        } else {
            this.scrollTopBtn.classList.remove('visible');
        }
    }
    
    // Public methods for external use
    setActiveSection(sectionId) {
        this.currentSection = sectionId;
        this.updateActiveNavLinks(sectionId);
    }
    
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            this.smoothScrollTo(element);
        }
    }
}

// Add ripple animation CSS
const rippleStyles = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .modern-nav-link,
    .modern-mobile-nav-link {
        position: relative;
        overflow: hidden;
    }
`;

// Inject ripple styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Initialize the modern menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.modernMenu = new ModernMenu();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernMenu;
}
