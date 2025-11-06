// Navigation JavaScript - ES5 Compatible Version
// Improved for responsiveness and mobile
// Works even during page transitions

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
    
    function initNavigation() {
        console.log('Navigation initialized');
        
        // Get elements
        var servicesBtn = document.getElementById('servicesBtn');
        var servicesMenu = document.getElementById('servicesMenu');
        var dropdown = document.querySelector('.has-dropdown');
        var menuToggle = document.querySelector('.menu-toggle');
        var navLinks = document.getElementById('navLinks');
        
        // Services Mega Menu - Desktop
        if (servicesBtn && servicesMenu && dropdown) {
            
            // Click handler for Services button
            servicesBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Services clicked');
                servicesMenu.classList.toggle('active');
            });
            
            // Click outside to close
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    servicesMenu.classList.remove('active');
                }
            });
            
            // Prevent closing when clicking inside menu
            servicesMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Close menu when clicking on a menu item
            var menuLinks = servicesMenu.querySelectorAll('a');
            for (var i = 0; i < menuLinks.length; i++) {
                menuLinks[i].addEventListener('click', function() {
                    servicesMenu.classList.remove('active');
                });
            }
        }
        
        // Hamburger Menu - Mobile
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('Hamburger clicked');
                navLinks.classList.toggle('active');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            });
            
            // Close mobile menu when clicking a link
            var allNavLinks = navLinks.querySelectorAll('a');
            for (var j = 0; j < allNavLinks.length; j++) {
                (function(link) {
                    link.addEventListener('click', function() {
                        // Don't close if it's the Services button on mobile
                        if (this.id !== 'servicesBtn') {
                            navLinks.classList.remove('active');
                        }
                    });
                })(allNavLinks[j]);
            }
        }
        
        // Handle window resize
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Close all menus on resize
                if (servicesMenu) {
                    servicesMenu.classList.remove('active');
                }
                if (navLinks && window.innerWidth > 968) {
                    navLinks.classList.remove('active');
                }
            }, 250);
        });
        
        // Hide navigation on scroll down (Mobile only)
        var lastScrollTop = 0;
        var nav = document.querySelector('nav');
        var scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
        
        window.addEventListener('scroll', function() {
            // Only apply on mobile
            if (window.innerWidth <= 968) {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // When scrolling (down or up), make nav transparent
                if (scrollTop > 50) {
                    nav.style.background = 'rgba(26, 26, 46, 0.3)';
                    nav.style.backdropFilter = 'blur(5px)';
                    nav.style.transition = 'all 0.3s ease-in-out';
                }
                // At top of page, make nav solid again
                else {
                    nav.style.background = 'rgba(26, 26, 46, 0.95)';
                    nav.style.backdropFilter = 'blur(10px)';
                    nav.style.transition = 'all 0.3s ease-in-out';
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            } else {
                // Desktop - always solid nav
                nav.style.background = 'rgba(26, 26, 46, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
            }
        });
        
        // Keyboard accessibility
        if (servicesBtn) {
            servicesBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    servicesMenu.classList.toggle('active');
                }
                if (e.key === 'Escape') {
                    servicesMenu.classList.remove('active');
                }
            });
        }
        
        console.log('Navigation ready!');
    }
    
    // Re-initialize on page show (for back/forward navigation)
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            console.log('Page from cache, re-initializing');
            initNavigation();
        }
    });
    
})();
