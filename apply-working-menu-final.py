#!/usr/bin/env python3
import re

# The WORKING JavaScript code
working_js = '''    <script>
        console.log('Script loaded!');
        
        // Get elements
        var servicesBtn = document.getElementById('servicesBtn');
        var servicesMenu = document.getElementById('servicesMenu');
        var dropdown = document.querySelector('.has-dropdown');
        
        console.log('servicesBtn:', servicesBtn);
        console.log('servicesMenu:', servicesMenu);
        
        // Click on Services button
        if (servicesBtn && servicesMenu) {
            servicesBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Services button clicked!');
                servicesMenu.classList.toggle('show');
            });
            
            // Click outside to close
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    servicesMenu.classList.remove('show');
                }
            });
            
            // Don't close when clicking inside menu
            servicesMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
        
        // Hamburger menu
        function toggleMenu() {
            document.getElementById('navLinks').classList.toggle('active');
        }
        
        console.log('Event listeners attached!');
    </script>'''

# CSS update - change display: none to opacity
css_update = '''        .mega-menu {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(26, 26, 46, 0.98);
            border: 2px solid #4ecdc4;
            border-radius: 15px;
            padding: 2rem;
            min-width: 800px;
            margin-top: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .mega-menu.show {
            opacity: 1;
            visibility: visible;
        }

        .mega-menu.active {
            opacity: 1;
            visibility: visible;
        }'''

files = [
    'automation.html', 'consultancy.html', 'development.html', 'design.html', 
    'contact.html', 'data-tech.html', 'marketing.html', 'branding.html',
    'app-development.html', 'web-development.html', 'brand-guidelines.html',
    'garage.html', 'optician.html', 'airbnb.html', 'letting-agents.html',
    'law-firms.html', 'restaurant.html'
]

for filename in files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove old script tags
        content = re.sub(r'<script>.*?</script>', '', content, flags=re.DOTALL)
        
        # Update mega-menu CSS
        content = re.sub(
            r'\.mega-menu \{[^}]*display: none;[^}]*\}',
            css_update,
            content,
            flags=re.DOTALL
        )
        
        # Add working script before </body>
        content = content.replace('</body>', working_js + '\n    <script src="animations.js"></script>\n</body>')
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'✅ Fixed {filename}')
    except Exception as e:
        print(f'❌ Error with {filename}: {e}')

print('\n🎉 All files updated with WORKING JavaScript!')
