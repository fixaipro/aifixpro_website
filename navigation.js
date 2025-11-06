// Navigation JavaScript - Complete Version with All Features
// Async, non-blocking, works on iPhone and desktop
(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        // Use setTimeout for async initialization
        setTimeout(initNavigation, 0);
    }
    
    function initNavigation() {
        console.log('🚀 Navigation initialized');
        
        // Get elements
        var servicesBtn = document.getElementById('servicesBtn');
        var servicesMenu = document.getElementById('servicesMenu');
        var dropdown = document.querySelector('.has-dropdown');
        var menuToggle = document.querySelector('.menu-toggle');
        var navLinks = document.getElementById('navLinks');
        var nav = document.querySelector('nav');
        
        // Services Mega Menu - Desktop
        if (servicesBtn && servicesMenu && dropdown) {
            // Click handler for Services button
            servicesBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                requestAnimationFrame(function() {
                    servicesMenu.classList.toggle('active');
                });
            });
            
            // Click outside to close
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    requestAnimationFrame(function() {
                        servicesMenu.classList.remove('active');
                    });
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
                    requestAnimationFrame(function() {
                        servicesMenu.classList.remove('active');
                    });
                });
            }
            
            // Keyboard accessibility
            servicesBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    requestAnimationFrame(function() {
                        servicesMenu.classList.toggle('active');
                    });
                }
                if (e.key === 'Escape') {
                    requestAnimationFrame(function() {
                        servicesMenu.classList.remove('active');
                    });
                }
            });
        }
        
        // Hamburger Menu - Mobile (with iPhone support)
        if (menuToggle && navLinks) {
            var toggleMenu = function(e) {
                e.preventDefault();
                e.stopPropagation();
                requestAnimationFrame(function() {
                    navLinks.classList.toggle('active');
                });
            };
            
            // Add both click and touchstart for better mobile support
            menuToggle.addEventListener('click', toggleMenu);
            menuToggle.addEventListener('touchstart', toggleMenu, { passive: false });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    requestAnimationFrame(function() {
                        navLinks.classList.remove('active');
                    });
                }
            });
            
            // Close mobile menu when clicking a link
            var allNavLinks = navLinks.querySelectorAll('a');
            for (var j = 0; j < allNavLinks.length; j++) {
                (function(link) {
                    link.addEventListener('click', function() {
                        // Don't close if it's the Services button on mobile
                        if (this.id !== 'servicesBtn') {
                            requestAnimationFrame(function() {
                                navLinks.classList.remove('active');
                            });
                        }
                    });
                })(allNavLinks[j]);
            }
        }
        
        // Handle window resize - async
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                requestAnimationFrame(function() {
                    // Close all menus on resize
                    if (servicesMenu) {
                        servicesMenu.classList.remove('active');
                    }
                    if (navLinks && window.innerWidth > 968) {
                        navLinks.classList.remove('active');
                    }
                });
            }, 250);
        });
        
        // Scroll transparency for mobile - async and throttled
        if (nav) {
            var lastScrollTop = 0;
            var scrollTicking = false;
            
            function updateNavOnScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Only apply on mobile
                if (window.innerWidth <= 968) {
                    if (scrollTop > 50) {
                        nav.style.background = 'rgba(26, 26, 46, 0.15)';
                        nav.style.backdropFilter = 'blur(2px)';
                        nav.style.transition = 'all 0.3s ease-in-out';
                    } else {
                        nav.style.background = 'rgba(26, 26, 46, 0.15)';
                        nav.style.backdropFilter = 'blur(2px)';
                        nav.style.transition = 'all 0.3s ease-in-out';
                    }
                } else {
                    // Desktop - always solid nav
                    nav.style.background = 'rgba(26, 26, 46, 0.95)';
                    nav.style.backdropFilter = 'blur(10px)';
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                scrollTicking = false;
            }
            
            window.addEventListener('scroll', function() {
                if (!scrollTicking) {
                    requestAnimationFrame(updateNavOnScroll);
                    scrollTicking = true;
                }
            });
        }
        
        console.log('✅ Navigation ready!');
    }
    
    // Re-initialize on page show (for back/forward navigation)
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            console.log('📄 Page from cache, re-initializing');
            setTimeout(initNavigation, 0);
        }
    });
    
})();