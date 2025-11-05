# YouTube Video Integration Guide

## Quick Setup (2 Minutes)

### Step 1: Upload Your Video to YouTube

1. Go to YouTube Studio: https://studio.youtube.com
2. Click "Create" → "Upload videos"
3. Upload your demo video
4. Set title, description, and visibility (Public/Unlisted)
5. Click "Publish"

### Step 2: Get the Embed Code

1. Go to your video on YouTube
2. Click the "Share" button below the video
3. Click "Embed"
4. Copy the `<iframe>` code

It will look like this:
```html
<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen>
</iframe>
```

### Step 3: Add to Your Website

1. Open `index.html` in a text editor
2. Find the video section (around line 385)
3. Look for the comment: `<!-- TO ADD YOUR YOUTUBE VIDEO:`
4. Paste your iframe code there
5. Update the dimensions to match our design:
   - Change `width="560"` to `width="900"`
   - Change `height="315"` to `height="500"`

### Example:

**Before:**
```html
<div class="video-placeholder" id="videoPlaceholder">
    <!-- TO ADD YOUR YOUTUBE VIDEO:
         Instructions here...
    -->
</div>
```

**After:**
```html
<div class="video-placeholder has-video" id="videoPlaceholder">
    <iframe width="900" height="500" 
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
        title="AI Fix Pro Demo" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>
</div>
```

**Note:** Add the `has-video` class to remove the placeholder play button.

---

## For Other Pages

If you want to add videos to other pages:

1. Find the video placeholder section
2. Replace the content with your YouTube iframe
3. Add `has-video` class to the video-placeholder div

---

## Video Best Practices

### Video Specs:
- **Resolution:** 1920x1080 (Full HD) recommended
- **Length:** 1-3 minutes for homepage demo
- **Format:** MP4, MOV, or AVI

### Content Suggestions:
- Show AI automation in action
- Demo of chatbot/voice assistant
- Client testimonials
- Screen recording of dashboard
- Before/after comparisons

### YouTube Settings:
- **Title:** Clear and descriptive (e.g., "AI Fix Pro - Business Automation Demo")
- **Description:** Include your website link and contact info
- **Thumbnail:** Custom thumbnail with your logo
- **Visibility:** 
  - "Public" - Anyone can find it
  - "Unlisted" - Only people with link can view (recommended)

---

## Troubleshooting

### Video Not Showing?
- Check that the iframe code is complete
- Ensure the video is not set to "Private"
- Verify the video ID in the URL is correct
- Add `has-video` class to remove placeholder

### Video Too Small/Large?
- Adjust `width="900"` and `height="500"` in the iframe
- Keep aspect ratio 16:9 for best results

### Want Multiple Videos?
- Copy the video section
- Add different video IDs
- Adjust section titles

---

## Alternative: Vimeo

If you prefer Vimeo:

1. Upload video to Vimeo
2. Click "Share"
3. Copy embed code
4. Paste in same location as YouTube

Vimeo iframe example:
```html
<iframe src="https://player.vimeo.com/video/YOUR_VIDEO_ID" 
    width="900" height="500" 
    frameborder="0" 
    allow="autoplay; fullscreen; picture-in-picture" 
    allowfullscreen>
</iframe>
```

---

## Need Help?

Contact: admin@aifixpro.co.uk  
Phone: +44 7459 750559

---

**That's it! Your video will now play directly on your website.** 🎬
