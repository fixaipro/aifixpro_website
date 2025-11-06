// IMPROVED Services Menu - Debounced and more reliable
let servicesMenuOpen = false;
let menuTimeout = null;

function initServicesMenu() {
    const servicesBtn = document.getElementById('servicesBtn');
    const servicesMenu = document.getElementById('servicesMenu');
    const hasDropdown = document.querySelector('.has-dropdown');

    if (!servicesBtn || !servicesMenu) return;

    // Click handler with debounce
    servicesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Clear any pending timeout
        if (menuTimeout) {
            clearTimeout(menuTimeout);
        }
        
        // Toggle menu
        servicesMenuOpen = !servicesMenuOpen;
        
        if (servicesMenuOpen) {
            servicesMenu.classList.add('active');
        } else {
            servicesMenu.classList.remove('active');
        }
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (servicesMenuOpen && !hasDropdown.contains(e.target)) {
            servicesMenuOpen = false;
            servicesMenu.classList.remove('active');
        }
    });

    // Close when clicking a menu link
    servicesMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            servicesMenuOpen = false;
            servicesMenu.classList.remove('active');
            const navLinks = document.getElementById('navLinks');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Prevent menu from closing when clicking inside it
    servicesMenu.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A') {
            e.stopPropagation();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServicesMenu);
} else {
    initServicesMenu();
}
