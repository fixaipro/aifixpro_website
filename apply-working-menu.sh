#!/bin/bash

# This script applies the WORKING mega menu code to all pages

for file in automation.html consultancy.html development.html design.html contact.html data-tech.html marketing.html branding.html app-development.html web-development.html brand-guidelines.html garage.html optician.html airbnb.html letting-agents.html law-firms.html restaurant.html; do
  
  echo "Updating $file with working mega menu..."
  
  # Create new file with working code
  cat > "${file}.new" << 'EOFHTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TITLE_PLACEHOLDER - AI Fix Pro</title>
    <link rel="stylesheet" href="industry-style.css">
    <link rel="stylesheet" href="animations.css">
    <style>
        /* Mega Menu Styles */
        .has-dropdown {
            position: relative;
        }

        .dropdown-arrow {
            font-size: 0.8rem;
            margin-left: 5px;
        }

        .mega-menu {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(26, 26, 46, 0.98);
            border: 2px solid #4ecdc4;
            border-radius: 15px;
            padding: 2rem;
            min-width: 800px;
            display: none;
            margin-top: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 2000;
        }

        .mega-menu.active {
            display: block;
        }

        .mega-menu-content {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
        }

        .mega-menu-column h4 {
            color: #4ecdc4;
            font-size: 1.1rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #4ecdc4;
        }

        .mega-menu-column a {
            display: block;
            color: #fff;
            text-decoration: none;
            padding: 0.5rem 0.75rem;
            margin: 0.25rem 0;
            border-radius: 6px;
            transition: all 0.3s;
            font-size: 0.95rem;
        }

        .mega-menu-column a:hover {
            background: rgba(78, 205, 196, 0.2);
            color: #4ecdc4;
            padding-left: 1rem;
        }

        @media (max-width: 968px) {
            .mega-menu {
                position: static;
                transform: none;
                min-width: auto;
                width: 100%;
                margin-top: 0.5rem;
                padding: 1rem;
            }

            .mega-menu-content {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="container">
            <a href="index.html" class="logo">
                <img src="logo.png" alt="AI Fix Pro" style="height: 65px; width: auto;">
            </a>
            <div class="menu-toggle" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html">Home</a></li>
                <li class="has-dropdown">
                    <a href="#" id="servicesBtn">
                        Services <span class="dropdown-arrow">▼</span>
                    </a>
                    <div class="mega-menu" id="servicesMenu">
                        <div class="mega-menu-content">
                            <div class="mega-menu-column">
                                <h4>🤖 AI Solutions</h4>
                                <a href="automation.html">AI Automation</a>
                                <a href="consultancy.html">AI Consultancy</a>
                                <a href="development.html">AI Development</a>
                            </div>
                            <div class="mega-menu-column">
                                <h4>💻 Development</h4>
                                <a href="app-development.html">App Development</a>
                                <a href="web-development.html">Web Development</a>
                                <a href="data-tech.html">Data & Tech</a>
                            </div>
                            <div class="mega-menu-column">
                                <h4>🎨 Creative</h4>
                                <a href="design.html">Design Services</a>
                                <a href="branding.html">Branding</a>
                                <a href="brand-guidelines.html">Brand Guidelines</a>
                                <a href="marketing.html">Marketing</a>
                            </div>
                            <div class="mega-menu-column">
                                <h4>🏢 Industries</h4>
                                <a href="garage.html">Automotive</a>
                                <a href="optician.html">Healthcare</a>
                                <a href="airbnb.html">Hospitality</a>
                                <a href="letting-agents.html">Real Estate</a>
                                <a href="law-firms.html">Legal</a>
                                <a href="restaurant.html">Food Service</a>
                            </div>
                        </div>
                    </div>
                </li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
    </nav>

CONTENT_PLACEHOLDER

    <script>
        // Hamburger Menu Toggle
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        // Mega Menu Toggle - WORKING VERSION
        const servicesBtn = document.getElementById('servicesBtn');
        const servicesMenu = document.getElementById('servicesMenu');

        if (servicesBtn) {
            servicesBtn.addEventListener('click', function(e) {
                e.preventDefault();
                servicesMenu.classList.toggle('active');
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.has-dropdown')) {
                if (servicesMenu) {
                    servicesMenu.classList.remove('active');
                }
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.mega-menu a').forEach(link => {
            link.addEventListener('click', function() {
                servicesMenu.classList.remove('active');
                document.getElementById('navLinks').classList.remove('active');
            });
        });
    </script>
    <script src="animations.js"></script>
</body>
</html>
EOFHTML

  # Extract title and content from original file
  TITLE=$(grep -o '<title>.*</title>' "$file" | sed 's/<[^>]*>//g' | head -1)
  
  # Extract content between <body> and </body>, excluding nav and scripts
  CONTENT=$(awk '/<body>/,/<\/body>/' "$file" | sed '1d;$d' | awk '/<!-- Navigation -->/,/<\/nav>/{next} /<script>/,/<\/script>/{next} /<\/body>/{next} {print}')
  
  # Replace placeholders
  sed -i "s|TITLE_PLACEHOLDER|${TITLE}|g" "${file}.new"
  sed -i "/CONTENT_PLACEHOLDER/r /dev/stdin" "${file}.new" <<< "$CONTENT"
  sed -i '/CONTENT_PLACEHOLDER/d' "${file}.new"
  
  # Replace old file with new one
  mv "${file}.new" "$file"
  
done

echo "All pages updated with working mega menu!"
