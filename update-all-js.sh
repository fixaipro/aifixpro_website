#!/bin/bash

# This script adds the WORKING JavaScript to ALL pages

for file in automation.html consultancy.html development.html design.html contact.html data-tech.html marketing.html branding.html app-development.html web-development.html brand-guidelines.html garage.html optician.html airbnb.html letting-agents.html law-firms.html restaurant.html; do
  
  echo "Fixing JavaScript in $file..."
  
  # Remove old script section and add new working one
  sed -i '/<script>/,/<\/script>/{//!d}' "$file"
  sed -i 's|<script>|<script>\n        // Hamburger Menu Toggle\n        function toggleMenu() {\n            const navLinks = document.getElementById('\''navLinks'\'');\n            navLinks.classList.toggle('\''active'\'');\n        }\n\n        // WORKING Services Menu - Simple and Reliable\n        document.addEventListener('\''DOMContentLoaded'\'', function() {\n            const servicesBtn = document.getElementById('\''servicesBtn'\'');\n            const servicesMenu = document.getElementById('\''servicesMenu'\'');\n            const hasDropdown = document.querySelector('\''.has-dropdown'\'');\n\n            if (servicesBtn && servicesMenu) {\n                // Click on Services button\n                servicesBtn.addEventListener('\''click'\'', function(e) {\n                    e.preventDefault();\n                    e.stopPropagation();\n                    console.log('\''Services button clicked!'\'');\n                    servicesMenu.classList.toggle('\''active'\'');\n                });\n\n                // Click outside to close\n                document.addEventListener('\''click'\'', function(e) {\n                    if (!hasDropdown.contains(e.target)) {\n                        servicesMenu.classList.remove('\''active'\'');\n                    }\n                });\n\n                // Close when clicking a link\n                servicesMenu.querySelectorAll('\''a'\'').forEach(function(link) {\n                    link.addEventListener('\''click'\'', function() {\n                        servicesMenu.classList.remove('\''active'\'');\n                        document.getElementById('\''navLinks'\'').classList.remove('\''active'\'');\n                    });\n                });\n            }\n        });|' "$file"
  
done

echo "All files updated with WORKING JavaScript!"
