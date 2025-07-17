/**
 * Modern Contact Form JavaScript
 * Enhanced functionality for the contact form
 */

class ModernContactForm {
    constructor() {
        this.form = document.getElementById('modern-contact-form');
        this.submitBtn = document.getElementById('modern-submit-btn');
        this.successMessage = document.getElementById('form-success-message');
        this.errorMessage = document.getElementById('form-error-message');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupFloatingLabels();
    }
    
    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('.modern-form-input, .modern-form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        // Floating labels
        inputs.forEach(input => {
            input.addEventListener('focus', () => this.handleFocus(input));
            input.addEventListener('blur', () => this.handleBlur(input));
        });
    }
    
    setupFormValidation() {
        // Custom validation messages
        this.validationRules = {
            username: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-ZäöüÄÖÜß\s]+$/,
                message: 'Bitte geben Sie einen gültigen Namen ein (mindestens 2 Zeichen)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
            },
            message: {
                required: true,
                minLength: 10,
                message: 'Ihre Nachricht sollte mindestens 10 Zeichen lang sein'
            }
        };
    }
    
    setupFloatingLabels() {
        const inputs = this.form.querySelectorAll('.modern-form-input, .modern-form-textarea');
        inputs.forEach(input => {
            // Check if input has value on page load
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            }
        });
    }
    
    handleFocus(input) {
        input.classList.add('focused');
    }
    
    handleBlur(input) {
        input.classList.remove('focused');
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
    }
    
    validateField(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        const rules = this.validationRules[fieldName];
        
        if (!rules) return true;
        
        // Clear previous errors
        this.clearFieldError(input);
        
        // Required validation
        if (rules.required && !value) {
            this.showFieldError(input, 'Dieses Feld ist erforderlich');
            return false;
        }
        
        // Minimum length validation
        if (rules.minLength && value.length < rules.minLength) {
            this.showFieldError(input, rules.message);
            return false;
        }
        
        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            this.showFieldError(input, rules.message);
            return false;
        }
        
        // Show success state
        this.showFieldSuccess(input);
        return true;
    }
    
    showFieldError(input, message) {
        input.classList.add('error');
        input.classList.remove('success');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
    
    showFieldSuccess(input) {
        input.classList.remove('error');
        input.classList.add('success');
        
        // Remove error message
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    clearFieldError(input) {
        input.classList.remove('error');
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('.modern-form-input, .modern-form-textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Hide previous messages
        this.hideMessages();
        
        // Validate form
        if (!this.validateForm()) {
            this.showError('Bitte korrigieren Sie die Fehler im Formular');
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Prepare form data
            const formData = new FormData(this.form);
            
            // Submit to Formspree
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showSuccess('Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.');
                this.resetForm();
                
                // Track successful form submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'Contact',
                        event_label: 'Contact Form Submission'
                    });
                }
            } else {
                throw new Error('Fehler beim Senden der Nachricht');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Wird gesendet...';
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Nachricht senden';
        }
    }
    
    showSuccess(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = 'block';
        this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 5000);
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.errorMessage.style.display = 'none';
        }, 5000);
    }
    
    hideMessages() {
        this.successMessage.style.display = 'none';
        this.errorMessage.style.display = 'none';
    }
    
    resetForm() {
        this.form.reset();
        
        // Reset field states
        const inputs = this.form.querySelectorAll('.modern-form-input, .modern-form-textarea');
        inputs.forEach(input => {
            input.classList.remove('has-value', 'focused', 'error', 'success');
            this.clearFieldError(input);
        });
    }
}

// Additional CSS for field validation states
const validationStyles = `
    .modern-form-input.error,
    .modern-form-textarea.error {
        border-color: #f44336;
        box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
    }
    
    .modern-form-input.success,
    .modern-form-textarea.success {
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }
    
    .field-error {
        color: #f44336;
        font-size: 14px;
        margin-top: 8px;
        padding-left: 25px;
        animation: slideInDown 0.3s ease;
    }
    
    .modern-form-input.has-value + .modern-form-label,
    .modern-form-textarea.has-value + .modern-form-label {
        top: -8px;
        left: 20px;
        font-size: 12px;
        color: #667eea;
        font-weight: 600;
    }
    
    .modern-form-input.focused + .modern-form-label,
    .modern-form-textarea.focused + .modern-form-label {
        color: #667eea;
    }
`;

// Inject validation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = validationStyles;
document.head.appendChild(styleSheet);

// Initialize the contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernContactForm();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernContactForm;
}
