# MP3 Player

A simple, modern web-based MP3 player that you can host for free on GitHub Pages.

## Features

- ✅ Play, pause, skip songs
- ✅ Clickable playlist
- ✅ Track progress bar
- ✅ Volume control
- ✅ Responsive design (works on mobile & desktop)
- ✅ Upload your own MP3 files

## Setup Instructions

### 1. Add Your MP3 Files
- Place your MP3 files in the `songs/` folder
- Update the `songs` array in `script.js` to match your file names

### 2. Add Album Art (Optional)
- Place a cover image in the `images/` folder
- Name it `cover.jpg` or update the image source in `index.html`

### 3. Test Locally
- Open `index.html` in your web browser
- Make sure all your MP3 files are in the correct location

### 4. Deploy to GitHub Pages
1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Choose "Deploy from a branch" → "main" branch
5. Save and wait for deployment
6. Your MP3 player will be live at: `https://yourusername.github.io/repository-name`

## File Structure
```
mp3-player/
├── index.html         (main page)
├── style.css          (CSS styles)
├── script.js          (JavaScript logic)
├── songs/             (your MP3 files)
│   ├── song1.mp3
│   ├── song2.mp3
│   └── song3.mp3
└── images/            (optional album art)
    └── cover.jpg
```

## Customization

### Adding More Songs
Edit the `songs` array in `script.js`:
```javascript
const songs = [
  { name: "Your Song Name", file: "songs/your-song.mp3" },
  // Add more songs here
];
```

### Changing the Style
Modify `style.css` to change colors, fonts, or layout.

## Browser Compatibility
- Works in all modern browsers
- Requires JavaScript enabled

https://thehut-xbox.github.io/MP3playerdemo/
- MP3 format support required

## License
Free to use and modify!
