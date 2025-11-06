#!/bin/bash

# For each non-homepage file, replace the entire nav-links section
for file in automation.html consultancy.html development.html design.html contact.html data-tech.html marketing.html branding.html app-development.html web-development.html brand-guidelines.html garage.html optician.html airbnb.html letting-agents.html law-firms.html restaurant.html; do
  
  echo "Processing $file..."
  
  # Create a temporary file with the correct navigation
  awk '
  /<ul class="nav-links" id="navLinks">/ {
    print "            <ul class=\"nav-links\" id=\"navLinks\">"
    print "                <li><a href=\"index.html\">Home</a></li>"
    print "                <li class=\"has-dropdown\">"
    print "                    <a href=\"#\" onclick=\"event.preventDefault(); toggleServicesMenu()\">"
    print "                        Services <span class=\"dropdown-arrow\">▼</span>"
    print "                    </a>"
    print "                    <div class=\"mega-menu\" id=\"servicesMenu\">"
    print "                        <div class=\"mega-menu-content\">"
    print "                            <div class=\"mega-menu-column\">"
    print "                                <h4>🤖 AI Solutions</h4>"
    print "                                <a href=\"automation.html\">AI Automation</a>"
    print "                                <a href=\"consultancy.html\">AI Consultancy</a>"
    print "                                <a href=\"development.html\">AI Development</a>"
    print "                            </div>"
    print "                            <div class=\"mega-menu-column\">"
    print "                                <h4>💻 Development</h4>"
    print "                                <a href=\"app-development.html\">App Development</a>"
    print "                                <a href=\"web-development.html\">Web Development</a>"
    print "                                <a href=\"data-tech.html\">Data &amp; Tech</a>"
    print "                            </div>"
    print "                            <div class=\"mega-menu-column\">"
    print "                                <h4>🎨 Creative</h4>"
    print "                                <a href=\"design.html\">Design Services</a>"
    print "                                <a href=\"branding.html\">Branding</a>"
    print "                                <a href=\"brand-guidelines.html\">Brand Guidelines</a>"
    print "                                <a href=\"marketing.html\">Marketing</a>"
    print "                            </div>"
    print "                            <div class=\"mega-menu-column\">"
    print "                                <h4>🏢 Industries</h4>"
    print "                                <a href=\"garage.html\">Automotive</a>"
    print "                                <a href=\"optician.html\">Healthcare</a>"
    print "                                <a href=\"airbnb.html\">Hospitality</a>"
    print "                                <a href=\"letting-agents.html\">Real Estate</a>"
    print "                                <a href=\"law-firms.html\">Legal</a>"
    print "                                <a href=\"restaurant.html\">Food Service</a>"
    print "                            </div>"
    print "                        </div>"
    print "                    </div>"
    print "                </li>"
    print "                <li><a href=\"contact.html\">Contact</a></li>"
    print "            </ul>"
    skip = 1
    next
  }
  skip && /<\/ul>/ {
    skip = 0
    next
  }
  !skip { print }
  ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  
done

echo "All files updated!"
