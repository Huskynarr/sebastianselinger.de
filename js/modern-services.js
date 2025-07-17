/**
 * Modern Services JavaScript
 * Enhanced functionality for services section
 */

class ModernServices {
    constructor() {
        this.servicesSection = document.querySelector('.modern-services');
        this.serviceCards = document.querySelectorAll('.modern-service-card');
        this.statNumbers = document.querySelectorAll('.modern-stat-number');
        this.ctaButtons = document.querySelectorAll('.modern-cta-button');
        
        this.isVisible = false;
        this.animationTriggered = false;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupServiceCardInteractions();
        this.setupCTAButtons();
        this.setupStatCounters();
        this.setupServiceModal();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animationTriggered) {
                    this.triggerAnimations();
                    this.animationTriggered = true;
                }
            });
        }, options);
        
        if (this.servicesSection) {
            observer.observe(this.servicesSection);
        }
    }
    
    triggerAnimations() {
        // Animate service cards
        this.serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Start stat counters
        setTimeout(() => {
            this.animateStatCounters();
        }, 500);
    }
    
    setupServiceCardInteractions() {
        this.serviceCards.forEach(card => {
            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', () => {
                this.createRippleEffect(card);
            });
            
            // Add click tracking
            card.addEventListener('click', (e) => {
                const serviceTitle = card.querySelector('.modern-service-title')?.textContent;
                
                // Track service interest
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'service_interest', {
                        event_category: 'Services',
                        event_label: serviceTitle
                    });
                }
                
                this.showServiceDetails(card);
            });
            
            // Add keyboard navigation
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }
    
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            animation: ripple 0.8s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }
    
    setupCTAButtons() {
        this.ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent.trim();
                
                // Track CTA clicks
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'cta_click', {
                        event_category: 'Services',
                        event_label: buttonText
                    });
                }
                
                // Add click animation
                this.animateButtonClick(button);
            });
            
            // Add hover effect
            button.addEventListener('mouseenter', () => {
                this.createButtonHoverEffect(button);
            });
        });
    }
    
    animateButtonClick(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    createButtonHoverEffect(button) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkle 1s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;
        
        button.style.position = 'relative';
        button.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    setupStatCounters() {
        const stats = [
            { element: document.querySelector('[data-stat="projects"]'), target: 150, suffix: '+' },
            { element: document.querySelector('[data-stat="clients"]'), target: 50, suffix: '+' },
            { element: document.querySelector('[data-stat="experience"]'), target: 8, suffix: ' Years' },
            { element: document.querySelector('[data-stat="satisfaction"]'), target: 100, suffix: '%' }
        ];
        
        this.stats = stats.filter(stat => stat.element);
    }
    
    animateStatCounters() {
        this.stats.forEach(stat => {
            this.animateCounter(stat.element, 0, stat.target, 2000, stat.suffix);
        });
    }
    
    animateCounter(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const range = end - start;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + range * easeOutCubic);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    setupServiceModal() {
        // Create modal for service details
        this.createServiceModal();
    }
    
    createServiceModal() {
        const modal = document.createElement('div');
        modal.className = 'modern-service-modal';
        modal.innerHTML = `
            <div class="modern-service-modal-overlay">
                <div class="modern-service-modal-content">
                    <button class="modern-service-modal-close" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modern-service-modal-body">
                        <!-- Content will be populated dynamically -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.modal = modal;
        
        // Setup modal events
        modal.querySelector('.modern-service-modal-close').addEventListener('click', () => {
            this.hideServiceModal();
        });
        
        modal.querySelector('.modern-service-modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideServiceModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.hideServiceModal();
            }
        });
    }
    
    showServiceDetails(card) {
        const title = card.querySelector('.modern-service-title')?.textContent;
        const description = card.querySelector('.modern-service-description')?.textContent;
        const features = Array.from(card.querySelectorAll('.modern-service-features li')).map(li => li.textContent);
        
        const modalBody = this.modal.querySelector('.modern-service-modal-body');
        modalBody.innerHTML = `
            <div class="service-detail-header">
                <div class="service-detail-icon">
                    ${card.querySelector('.modern-service-icon').innerHTML}
                </div>
                <h2>${title}</h2>
            </div>
            <div class="service-detail-content">
                <p class="service-detail-description">${description}</p>
                <div class="service-detail-features">
                    <h3>What's Included:</h3>
                    <ul>
                        ${features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="service-detail-cta">
                    <a href="#contact" class="modern-cta-button primary">
                        <i class="fas fa-envelope"></i>
                        Get Started
                    </a>
                    <a href="#portfolio" class="modern-cta-button">
                        <i class="fas fa-eye"></i>
                        View Examples
                    </a>
                </div>
            </div>
        `;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    hideServiceModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Add modal and animation styles
const serviceStyles = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-20px);
        }
    }
    
    .modern-service-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .modern-service-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modern-service-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .modern-service-modal-content {
        background: white;
        border-radius: 20px;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .modern-service-modal.active .modern-service-modal-content {
        transform: scale(1);
    }
    
    .modern-service-modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #666;
        cursor: pointer;
        z-index: 10;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .modern-service-modal-close:hover {
        background: #f0f0f0;
        color: #333;
    }
    
    .service-detail-header {
        text-align: center;
        padding: 40px 40px 20px;
        border-bottom: 1px solid #eee;
    }
    
    .service-detail-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
    }
    
    .service-detail-header h2 {
        font-size: 2rem;
        color: #333;
        margin: 0;
    }
    
    .service-detail-content {
        padding: 30px 40px 40px;
    }
    
    .service-detail-description {
        font-size: 1.1rem;
        color: #666;
        line-height: 1.6;
        margin-bottom: 30px;
    }
    
    .service-detail-features h3 {
        color: #333;
        margin-bottom: 15px;
        font-size: 1.3rem;
    }
    
    .service-detail-features ul {
        list-style: none;
        padding: 0;
    }
    
    .service-detail-features li {
        padding: 8px 0;
        color: #555;
        position: relative;
        padding-left: 25px;
    }
    
    .service-detail-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #667eea;
        font-weight: bold;
    }
    
    .service-detail-cta {
        margin-top: 30px;
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
        .modern-service-modal-content {
            margin: 20px;
            max-height: 90vh;
        }
        
        .service-detail-header,
        .service-detail-content {
            padding: 30px 25px;
        }
        
        .service-detail-cta {
            flex-direction: column;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = serviceStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernServices();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernServices;
}
