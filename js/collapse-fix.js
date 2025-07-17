// Fix for collapse button preventing page scroll
document.addEventListener('DOMContentLoaded', function() {
    // Find all collapse buttons
    const collapseButtons = document.querySelectorAll('[data-toggle="collapse"]');
    
    collapseButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            e.stopPropagation();
            
            // Get the target collapse element
            const targetId = this.getAttribute('data-target') || this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Toggle the collapse manually using Bootstrap's collapse method
                $(targetElement).collapse('toggle');
                
                // Update aria-expanded attribute
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                
                // Rotate the icon
                const icon = this.querySelector('i');
                if (icon) {
                    if (isExpanded) {
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        icon.style.transform = 'rotate(180deg)';
                    }
                }
            }
            
            return false;
        });
    });
    
    // Prevent any scroll-to-top behavior on collapse events
    $('.collapse').on('show.bs.collapse hide.bs.collapse', function(e) {
        e.stopPropagation();
    });
    
    // Smooth scroll prevention for any remaining anchor links
    $('a[href^="#"]').not('[data-toggle="collapse"]').on('click', function(e) {
        const href = $(this).attr('href');
        if (href === '#' || href === '#collapseExperience') {
            e.preventDefault();
            return false;
        }
    });
});