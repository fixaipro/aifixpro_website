// Navigation JavaScript - Universal Mobile Fix
// Works on iOS, Android, and Desktop
// Prevents hanging, memory leaks, and event stacking

(function() {
    'use strict';
    
    // Global flag to prevent multiple initializations
    var NAVIGATION_INITIALIZED = false;
    
    // Store handlers for cleanup
    var eventHandlers = {
        menuToggle: null,
        closeOutside: null,
        resize: null,
        scroll: null
    };
    
    function cleanupEventListeners() {
        console.log('🧹 Cleaning up old event listeners');
        
        var menuToggle = document.querySelector('.menu-toggle');
        var navLinks = document.getElementById('navLinks');
        
        // Remove old event listeners if they exist
        if (menuToggle && eventHandlers.menuToggle) {
            menuToggle.removeEventListener('click', eventHandlers.menuToggle);
            menuToggle.removeEventListener('touchstart', eventHandlers.menuToggle);
        }
        
        if (eventHandlers.closeOutside) {
            document.removeEventListener('click', eventHandlers.closeOutside);
        }
        
        if (eventHandlers.resize) {
            window.removeEventListener('resize', eventHandlers.resize);
        }
        
        if (eventHandlers.scroll) {
            window.removeEventListener('scroll', eventHandlers.scroll);
        }
    }
    
    function initNavigation() {
        // Prevent multiple initializations (Android/iOS bug fix)
        if (NAVIGATION_INITIALIZED) {
            console.log('⚠️ Navigation already initialized - skipping to prevent duplicates');
            return;
        }
        
        console.log('🚀 Initializing navigation (Universal Mobile)');
        
        // Clean up any existing listeners first
        cleanupEventListeners();
        
        // Get elements
        var servicesBtn = document.getElementById('servicesBtn');
        var servicesMenu = document.getElementById('servicesMenu');
        var dropdown = document.querySelector('.has-dropdown');
        var menuToggle = document.querySelector('.menu-toggle');
        var navLinks = document.getElementById('navLinks');
        var nav = document.querySelector('nav');
        
        if (!menuToggle || !navLinks) {
            console.error('❌ Navigation elements not found');
            return;
        }
        
        // Menu state tracker
        var isMenuOpen = false;
        
        // === HAMBURGER MENU - MOBILE (Android + iOS Fix) ===
        eventHandlers.menuToggle = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle state
            isMenuOpen = !isMenuOpen;
            
            console.log('📱 Menu toggle clicked - Open:', isMenuOpen);
            
            // Update classes based on state
            if (isMenuOpen) {
                navLinks.classList.add('active');
            } else {
                navLinks.classList.remove('active');
            }
        };
        
        // Add event listeners (both click and touchstart for mobile compatibility)
        menuToggle.addEventListener('click', eventHandlers.menuToggle);
        menuToggle.addEventListener('touchstart', eventHandlers.menuToggle, { passive: false });
        
        // === CLOSE MENU WHEN CLICKING OUTSIDE ===
        eventHandlers.closeOutside = function(e) {
            if (isMenuOpen && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                isMenuOpen = false;
                console.log('📱 Menu closed (clicked outside)');
            }
        };
        
        document.addEventListener('click', eventHandlers.closeOutside);
        document.addEventListener('touchstart', eventHandlers.closeOutside, { passive: true });
        
        // === CLOSE MENU WHEN CLICKING A LINK ===
        var allNavLinks = navLinks.querySelectorAll('a');
        for (var i = 0; i < allNavLinks.length; i++) {
            (function(link) {
                link.addEventListener('click', function() {
                    if (this.id !== 'servicesBtn') {
                        navLinks.classList.remove('active');
                        isMenuOpen = false;
                        console.log('📱 Menu closed (link clicked)');
                    }
                });
            })(allNavLinks[i]);
        }
        
        // === SERVICES MEGA MENU - DESKTOP ===
        if (servicesBtn && servicesMenu && dropdown) {
            servicesBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                servicesMenu.classList.toggle('active');
            });
            
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    servicesMenu.classList.remove('active');
                }
            });
            
            servicesMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            var menuLinks = servicesMenu.querySelectorAll('a');
            for (var j = 0; j < menuLinks.length; j++) {
                menuLinks[j].addEventListener('click', function() {
                    servicesMenu.classList.remove('active');
                });
            }
        }
        
        // === WINDOW RESIZE HANDLER ===
        var resizeTimer;
        eventHandlers.resize = function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (servicesMenu) {
                    servicesMenu.classList.remove('active');
                }
                if (navLinks && window.innerWidth > 968) {
                    navLinks.classList.remove('active');
                    isMenuOpen = false;
                }
            }, 250);
        };
        
        window.addEventListener('resize', eventHandlers.resize);
        
        // === SCROLL TRANSPARENCY - MOBILE ===
        if (nav) {
            var scrollTicking = false;
            
            eventHandlers.scroll = function() {
                if (!scrollTicking) {
                    window.requestAnimationFrame(function() {
                        if (window.innerWidth <= 968) {
                            nav.style.background = 'rgba(26, 26, 46, 0.15)';
                            nav.style.backdropFilter = 'blur(2px)';
                        } else {
                            nav.style.background = 'rgba(26, 26, 46, 0.95)';
                            nav.style.backdropFilter = 'blur(10px)';
                        }
                        scrollTicking = false;
                    });
                    scrollTicking = true;
                }
            };
            
            window.addEventListener('scroll', eventHandlers.scroll, { passive: true });
        }
        
        // Mark as initialized
        NAVIGATION_INITIALIZED = true;
        console.log('✅ Navigation ready (Android + iOS compatible)');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        setTimeout(initNavigation, 0);
    }
    
    // Handle back/forward navigation (mobile browsers)
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            console.log('📄 Page from cache - resetting navigation state');
            NAVIGATION_INITIALIZED = false;
            cleanupEventListeners();
            setTimeout(initNavigation, 0);
        }
    });
    
})();