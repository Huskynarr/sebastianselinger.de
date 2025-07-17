/**
 * Modern Header JavaScript
 * Enhanced text animation and header functionality
 */

class ModernHeader {
    constructor() {
        this.textElements = document.querySelectorAll('.modern-animated-text .cd-words-wrapper b');
        this.currentIndex = 0;
        this.animationSpeed = 3000; // 3 seconds per text
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        if (this.textElements.length === 0) return;
        
        this.setupTextAnimation();
        this.setupScrollIndicator();
        this.setupHireButton();
        this.startTextRotation();
    }
    
    setupTextAnimation() {
        // Hide all text elements initially except the first one
        this.textElements.forEach((element, index) => {
            if (index === 0) {
                element.classList.add('is-visible');
                element.classList.remove('is-hidden');
            } else {
                element.classList.add('is-hidden');
                element.classList.remove('is-visible');
            }
        });
    }
    
    startTextRotation() {
        if (this.textElements.length <= 1) return;
        
        setInterval(() => {
            this.rotateText();
        }, this.animationSpeed);
    }
    
    rotateText() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Hide current text
        const currentElement = this.textElements[this.currentIndex];
        currentElement.classList.remove('is-visible');
        currentElement.classList.add('is-hidden');
        
        // Move to next text
        this.currentIndex = (this.currentIndex + 1) % this.textElements.length;
        
        // Show next text after a short delay
        setTimeout(() => {
            const nextElement = this.textElements[this.currentIndex];
            nextElement.classList.remove('is-hidden');
            nextElement.classList.add('is-visible');
            
            this.isAnimating = false;
        }, 300);
    }
    
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.modern-scroll-indicator');
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about-me');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    setupHireButton() {
        const hireButtons = document.querySelectorAll('.modern-hire-me, .modern-hire-me-outline');
        
        hireButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Track hire button clicks
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'hire_button_click', {
                        event_category: 'Header',
                        event_label: 'Hire Me Button'
                    });
                }
                
                // Add click animation
                this.animateButtonClick(button);
            });
            
            // Add hover sound effect (optional)
            button.addEventListener('mouseenter', () => {
                this.createSparkleEffect(button);
            });
        });
    }
    
    animateButtonClick(button) {
        button.style.transform = 'scale(0.95) translateY(-1px)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    createSparkleEffect(button) {
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
    
    // Public method to change animation speed
    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
    }
    
    // Public method to pause/resume animation
    pauseAnimation() {
        this.isAnimating = true;
    }
    
    resumeAnimation() {
        this.isAnimating = false;
    }
}

// Enhanced typing cursor animation
class TypingCursor {
    constructor() {
        this.cursor = document.querySelector('.modern-animated-text .cd-words-wrapper::after');
        this.isVisible = true;
        this.blinkSpeed = 1000; // 1 second
        
        this.init();
    }
    
    init() {
        // The cursor animation is handled by CSS, but we can add enhanced effects here
        this.setupCursorEffects();
    }
    
    setupCursorEffects() {
        // Add enhanced cursor behavior during text transitions
        const textWrapper = document.querySelector('.modern-animated-text .cd-words-wrapper');
        if (!textWrapper) return;
        
        // Observer for text changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    this.onTextChange();
                }
            });
        });
        
        observer.observe(textWrapper, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    onTextChange() {
        // Add special cursor behavior during text transitions
        const textWrapper = document.querySelector('.modern-animated-text .cd-words-wrapper');
        if (textWrapper) {
            textWrapper.classList.add('cursor-active');
            setTimeout(() => {
                textWrapper.classList.remove('cursor-active');
            }, 500);
        }
    }
}

// Add enhanced cursor and sparkle styles
const headerStyles = `
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
    
    .modern-animated-text .cd-words-wrapper.cursor-active::after {
        animation: blink 0.5s infinite;
        color: #667eea;
    }
    
    .modern-hire-me,
    .modern-hire-me-outline {
        position: relative;
        overflow: hidden;
    }
    
    /* Enhanced text shadow for better readability */
    .modern-introduction,
    .modern-animated-text .cd-headline {
        text-shadow: 
            2px 2px 4px rgba(0, 0, 0, 0.8),
            0 0 10px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(0, 0, 0, 0.3);
    }
    
    /* Improved button visibility */
    .modern-hire-me {
        box-shadow: 
            0 8px 25px rgba(102, 126, 234, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
    }
    
    .modern-hire-me:hover {
        box-shadow: 
            0 15px 40px rgba(102, 126, 234, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.2);
    }
    
    .modern-hire-me-outline {
        box-shadow: 
            0 8px 25px rgba(255, 255, 255, 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.2);
    }
    
    .modern-hire-me-outline:hover {
        box-shadow: 
            0 15px 40px rgba(255, 255, 255, 0.3),
            inset 0 0 0 1px rgba(255, 255, 255, 0.4);
    }
`;

// Inject enhanced styles
const styleSheet = document.createElement('style');
styleSheet.textContent = headerStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernHeader();
    new TypingCursor();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModernHeader, TypingCursor };
}
