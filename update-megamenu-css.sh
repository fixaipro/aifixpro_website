#!/bin/bash

# Update CSS in all non-homepage files
for file in automation.html consultancy.html development.html design.html contact.html data-tech.html marketing.html branding.html app-development.html web-development.html brand-guidelines.html garage.html optician.html airbnb.html letting-agents.html law-firms.html restaurant.html; do
  
  echo "Updating CSS in $file..."
  
  # Check if mega menu CSS already exists
  if ! grep -q "\.mega-menu {" "$file"; then
    # Add mega menu CSS after the nav-links hover styles
    sed -i '/\.nav-links a:hover {/,/}/ {
      /}/a\
\
        /* Mega Menu Styles */\
        .has-dropdown {\
            position: relative;\
        }\
\
        .dropdown-arrow {\
            font-size: 0.8rem;\
            margin-left: 5px;\
            transition: transform 0.3s;\
        }\
\
        .has-dropdown:hover .dropdown-arrow {\
            transform: rotate(180deg);\
        }\
\
        .mega-menu {\
            position: absolute;\
            top: 100%;\
            left: 50%;\
            transform: translateX(-50%);\
            background: rgba(26, 26, 46, 0.98);\
            border: 2px solid #4ecdc4;\
            border-radius: 15px;\
            padding: 2rem;\
            min-width: 800px;\
            opacity: 0;\
            visibility: hidden;\
            transition: all 0.3s;\
            margin-top: 15px;\
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);\
            z-index: 2000;\
        }\
\
        .mega-menu.active {\
            opacity: 1;\
            visibility: visible;\
            margin-top: 10px;\
        }\
\
        .mega-menu-content {\
            display: grid;\
            grid-template-columns: repeat(4, 1fr);\
            gap: 2rem;\
        }\
\
        .mega-menu-column h4 {\
            color: #4ecdc4;\
            font-size: 1.1rem;\
            margin-bottom: 1rem;\
            padding-bottom: 0.5rem;\
            border-bottom: 2px solid #4ecdc4;\
        }\
\
        .mega-menu-column a {\
            display: block;\
            color: #fff;\
            text-decoration: none;\
            padding: 0.5rem 0.75rem;\
            margin: 0.25rem 0;\
            border-radius: 6px;\
            transition: all 0.3s;\
            font-size: 0.95rem;\
        }\
\
        .mega-menu-column a:hover {\
            background: rgba(78, 205, 196, 0.2);\
            color: #4ecdc4;\
            padding-left: 1rem;\
        }
    }' "$file"
  fi
  
done

echo "All files updated with mega menu CSS!"
