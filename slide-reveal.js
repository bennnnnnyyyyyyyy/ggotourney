(function($) {
    'use strict';

    // Wait for GSAP to be available
    function initSlideReveal() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            setTimeout(initSlideReveal, 100);
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Find all sections with slide reveal classes
        const slideElements = document.querySelectorAll('.pxl-slide-reveal');
        
        if (slideElements.length === 0) return;

        slideElements.forEach(function(element) {
            // Skip if mobile animations are disabled
            if (window.innerWidth <= 767 && element.classList.contains('disable-mobile')) {
                return;
            }

            // Determine animation type
            let animationProps = {};
            let duration = 1;
            let ease = "power2.out";

            if (element.classList.contains('pxl-slide-up')) {
                animationProps = { y: 0, opacity: 1 };
            } else if (element.classList.contains('pxl-slide-down')) {
                animationProps = { y: 0, opacity: 1 };
            } else if (element.classList.contains('pxl-slide-left')) {
                animationProps = { x: 0, opacity: 1 };
            } else if (element.classList.contains('pxl-slide-right')) {
                animationProps = { x: 0, opacity: 1 };
            } else if (element.classList.contains('pxl-slide-scale')) {
                animationProps = { y: 0, scale: 1, opacity: 1 };
                ease = "back.out(1.7)";
            } else if (element.classList.contains('pxl-slide-fade')) {
                animationProps = { y: 0, opacity: 1 };
                duration = 0.8;
            }

            // Apply animation
            gsap.to(element, {
                ...animationProps,
                duration: duration,
                ease: ease,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    end: "top 15%",
                    toggleActions: "play none none reverse",
                    once: false
                }
            });
        });

        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();
    }

    // Initialize when document is ready
    $(document).ready(function() {
        // Small delay to ensure all scripts are loaded
        setTimeout(initSlideReveal, 500);
    });

    // Re-initialize on Elementor frontend load (for editing mode)
    $(window).on('elementor/frontend/init', function() {
        setTimeout(initSlideReveal, 1000);
    });

})(jQuery); 