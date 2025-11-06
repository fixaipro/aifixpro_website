#!/bin/bash

echo "Fixing all issues..."

# Fix contact.html text cutoff
echo "1. Fixing contact.html text cutoff..."
sed -i 's/font-size: 3.5rem;/font-size: 3rem;/g' contact.html
sed -i 's/padding: 3rem 2rem;/padding: 3rem 2rem 3rem;/g' contact.html

# Fix consultancy, development, design pages - replace them completely
for page in consultancy development design; do
  echo "2. Fixing ${page}.html..."
  
  # Copy the working automation.html structure
  cat automation.html | sed "s/AI Automation/${page^}/g" | \
    sed "s/automation/${page}/g" | \
    sed "s/🤖/💡/g" > ${page}.html.tmp
  
  mv ${page}.html.tmp ${page}.html
done

echo "All fixes applied!"
