/* =============================
   Modern Certifications JavaScript
=============================== */

(function() {
    'use strict';
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initCertifications();
    });
    
    function initCertifications() {
        // Animation on scroll
        initScrollAnimations();
        
        // Certificate verification
        initCertificateVerification();
        
        // Update certification status
        updateCertificationStatus();
    }
    
    // Scroll animations for certification cards
    function initScrollAnimations() {
        const cards = document.querySelectorAll('.certification-card');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up', 'visible');
                }
            });
        }, observerOptions);
        
        cards.forEach(function(card) {
            card.classList.add('fade-in-up');
            observer.observe(card);
        });
    }
    
    // Certificate verification functionality
    function initCertificateVerification() {
        const verifyButtons = document.querySelectorAll('.certification-link[data-verify]');
        
        verifyButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const certId = this.getAttribute('data-verify');
                const originalText = this.textContent;
                
                // Show loading state
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifiziere...';
                this.style.pointerEvents = 'none';
                
                // Simulate verification process
                setTimeout(function() {
                    button.innerHTML = '<i class="fas fa-check"></i> Verifiziert';
                    button.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
                    
                    // Reset after 3 seconds
                    setTimeout(function() {
                        button.textContent = originalText;
                        button.style.pointerEvents = 'auto';
                        button.style.backgroundColor = '';
                    }, 3000);
                }, 1500);
            });
        });
    }
    
    // Update certification status based on expiry dates
    function updateCertificationStatus() {
        const certifications = document.querySelectorAll('.certification-card');
        const currentDate = new Date();
        
        certifications.forEach(function(cert) {
            const expiryDateElement = cert.querySelector('[data-expiry]');
            if (expiryDateElement) {
                const expiryDate = new Date(expiryDateElement.getAttribute('data-expiry'));
                const statusElement = cert.querySelector('.certification-status');
                
                if (currentDate > expiryDate) {
                    statusElement.classList.remove('valid');
                    statusElement.classList.add('expired');
                    statusElement.innerHTML = '<i class="fas fa-times-circle"></i> Abgelaufen';
                } else {
                    statusElement.classList.remove('expired');
                    statusElement.classList.add('valid');
                    statusElement.innerHTML = '<i class="fas fa-check-circle"></i> Gültig';
                }
            }
        });
    }
    
    // Utility function to format dates
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Smooth scroll to certification section
    function scrollToCertifications() {
        const certificationsSection = document.getElementById('certifications');
        if (certificationsSection) {
            certificationsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Export functions for global access
    window.CertificationsModule = {
        scrollTo: scrollToCertifications,
        updateStatus: updateCertificationStatus
    };
    
})();
