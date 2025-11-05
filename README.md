# AI Fix Pro Website

Complete website package for AI Fix Pro - Business Automation Solutions

## 📁 Structure

```
aifixpro-website/
├── index.html              # Homepage with services overview
├── automation.html         # Automation services page
├── consultancy.html        # Business consultancy page
├── development.html        # Development services page
├── design.html             # Design services page
├── contact.html            # Contact form page
├── industry-style.css      # Shared stylesheet for industry pages
└── Industry Pages:
    ├── garage.html         # Automotive garage solutions
    ├── optician.html       # Optician practice solutions
    ├── airbnb.html         # Property management solutions
    ├── letting-agents.html # Letting agent solutions
    ├── law-firms.html      # Law firm solutions
    └── restaurant.html     # Restaurant solutions
```

## 🎨 Features

- ✅ Animated spiral border and background effects
- ✅ Responsive design for all devices
- ✅ Video placeholders on every page
- ✅ Full navigation between all pages
- ✅ Contact form with Google Sheets integration ready
- ✅ Service-specific pages (Automation, Consultancy, Development, Design)
- ✅ Industry-specific pages (6 industries covered)
- ✅ Consistent branding and color scheme
- ✅ Professional animations and hover effects

## 🚀 Quick Start

1. **Extract the files:**
   ```bash
   tar -xzf aifixpro-website.tar.gz
   cd aifixpro-website
   ```

2. **Host the website:**
   - Upload all files to your web hosting
   - Or use a local server for testing:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit http://localhost:8000

## 📧 Contact Form Setup

The contact form is ready to integrate with Google Sheets:

### Google Sheets Integration Steps:

1. Create a new Google Sheet for form responses

2. Go to **Extensions > Apps Script**

3. Paste this code:
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(data.timestamp),
    data.name,
    data.email,
    data.phone,
    data.company,
    data.service,
    data.message
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy as **Web App**
   - Execute as: Me
   - Who has access: Anyone

5. Copy the Web App URL

6. In `contact.html`, replace line 236:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
```

## 🎥 Video Integration

Each page has a video placeholder. To add real videos:

1. Replace the `.video-placeholder` div with:
```html
<video controls width="900" height="500" style="border-radius: 20px;">
  <source src="your-video.mp4" type="video/mp4">
  Your browser doesn't support video.
</video>
```

Or embed from YouTube/Vimeo:
```html
<iframe width="900" height="500" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" 
  style="border-radius: 20px;">
</iframe>
```

## 🎨 Customization

### Colors
Main color scheme defined in CSS:
- Primary Orange: `#ff6b35`
- Secondary Blue: `#00d4ff`
- Accent Teal: `#4ecdc4`
- Dark Background: `#1a1a2e` and `#16213e`

### Logo
Replace the text logo in the nav with your image:
```html
<div class="logo">
  <img src="your-logo.png" alt="AI Fix Pro" style="height: 40px;">
</div>
```

### Contact Information
Update contact details in `contact.html`:
- Email
- Phone number
- Address
- Business hours

## 📱 Mobile Responsive

The website is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (375px)

## 🔧 Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## 📄 Pages Overview

### Main Pages
- **Homepage**: Overview of services and industries
- **Automation**: Detailed automation features
- **Consultancy**: Business consultancy services
- **Development**: Custom development offerings
- **Design**: Design services (CX, UX, Brand, UI)
- **Contact**: Contact form and information

### Industry Pages
- **Garage**: Automotive garage solutions
- **Optician**: Optical practice automation
- **Airbnb**: Property management automation
- **Letting Agents**: Property viewing automation
- **Law Firms**: Client intake automation
- **Restaurant**: Reservation and order management

## 🚀 Deployment Options

### Option 1: Traditional Web Hosting
Upload files via FTP to your hosting provider

### Option 2: GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```
Enable GitHub Pages in repository settings

### Option 3: Netlify (Recommended)
1. Drag and drop the folder to netlify.com/drop
2. Get instant HTTPS URL
3. Connect custom domain if desired

### Option 4: Vercel
```bash
npm i -g vercel
vercel
```

### Option 5: Google Cloud Platform
```bash
gsutil -m cp -r * gs://your-bucket-name
```

## 🔐 Security Notes

- No sensitive data is stored in frontend code
- Contact form uses POST requests
- All external links should use HTTPS
- Consider adding CAPTCHA to contact form for production

## 💡 Next Steps

1. Add your real content and videos
2. Set up Google Sheets integration
3. Add your logo and branding
4. Update contact information
5. Test on mobile devices
6. Deploy to production
7. Set up Google Analytics (optional)
8. Configure SEO meta tags

## 📞 Support

For questions or customization requests:
- Email: info@aifixpro.com
- Website: www.aifixpro.com

## 📝 License

© 2025 AI Fix Pro. All rights reserved.

---

**Built with modern web technologies:**
- Pure HTML5, CSS3, JavaScript
- No frameworks required
- Lightweight and fast
- SEO-friendly structure
