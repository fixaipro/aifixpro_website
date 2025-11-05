# Google Sheets Integration Setup Guide

## Your Google Sheet
https://docs.google.com/spreadsheets/d/1ttctOWhnzsEX_QSMrRV2fTCDZwS82awkHsIn4W5DFpM/edit

---

## Quick Setup (10 Minutes)

### Step 1: Prepare Your Sheet

1. Open your Google Sheet using the link above
2. Make sure Row 1 has these headers (in this exact order):

```
| Timestamp | Full Name | Email | Phone | Company | Service | Message |
```

### Step 2: Create Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('1ttctOWhnzsEX_QSMrRV2fTCDZwS82awkHsIn4W5DFpM').getActiveSheet();
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
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy the Script

1. Click **"Deploy"** button (top right)
2. Select **"New deployment"**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **"Web app"**
5. Configure settings:
   - **Description:** Contact Form Handler
   - **Execute as:** Me (your-email@gmail.com)
   - **Who has access:** Anyone
6. Click **"Deploy"**
7. You may need to authorize permissions - click through the warnings

### Step 4: Get Your Web App URL

1. After deployment, you'll see a "Web app URL"
2. It will look like: `https://script.google.com/macros/s/AKfycby.../exec`
3. **Copy this entire URL**

### Step 5: Update contact.html

1. Open `contact.html` in a text editor
2. Find line 318 (search for `GOOGLE_SCRIPT_URL`)
3. Replace this:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
   
   With your URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec';
   ```

4. Save the file

### Step 6: Test It!

1. Upload your updated website
2. Go to the contact page
3. Fill out the form and submit
4. Check your Google Sheet - a new row should appear within seconds!

---

## Troubleshooting

### Form submits but no data appears in sheet

**Solution 1:** Check the Sheet ID
- Make sure the ID in the Apps Script matches your sheet
- Your Sheet ID: `1ttctOWhnzsEX_QSMrRV2fTCDZwS82awkHsIn4W5DFpM`

**Solution 2:** Check Permissions
- Go to Apps Script
- Click Deploy > Manage deployments
- Verify "Who has access" is set to "Anyone"

**Solution 3:** Check Column Headers
- Row 1 must have exactly these headers:
  `Timestamp | Full Name | Email | Phone | Company | Service | Message`

### Permission Errors

If you see "Authorization required":
1. In Apps Script, click the "Run" button (▶️) next to `doPost`
2. Authorize the script when prompted
3. Complete the security warnings
4. Redeploy the script

### Script Errors

To view errors:
1. In Apps Script, go to **Executions** (clock icon on left)
2. Check recent execution logs
3. Look for error messages

---

## Testing Checklist

- [ ] Column headers set in Row 1
- [ ] Apps Script code pasted and saved
- [ ] Script deployed as Web app
- [ ] Permissions set to "Anyone"
- [ ] Web app URL copied
- [ ] URL added to contact.html
- [ ] Website uploaded to server
- [ ] Test form submission
- [ ] Check Google Sheet for new row

---

## Email Notifications (Optional)

Want to get email alerts when someone submits the form?

Add this function to your Apps Script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('1ttctOWhnzsEX_QSMrRV2fTCDZwS82awkHsIn4W5DFpM').getActiveSheet();
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
    
    // Send email notification
    const emailBody = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company}
Service: ${data.service}
Message: ${data.message}
    `;
    
    MailApp.sendEmail({
      to: 'admin@aifixpro.co.uk',
      subject: 'New Contact Form Submission',
      body: emailBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Save and redeploy!

---

## Support

If you need help:
- Email: admin@aifixpro.co.uk
- Phone: +44 7459 750559

---

**That's it! Your contact form is now saving to Google Sheets!** 📊✨
