const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Function to create uwucord icon
function createUwucordIcon(size, isTemplate = false) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Background gradient (purple to pink uwu theme)
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#8B5CF6'); // Purple
    gradient.addColorStop(1, '#EC4899'); // Pink
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Add some cute uwu elements
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.3;
    
    // Main circle (chat bubble)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add uwu text
    ctx.fillStyle = '#8B5CF6';
    ctx.font = `bold ${size * 0.25}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('uwu', centerX, centerY);
    
    // Add cute dots for eyes
    ctx.fillStyle = '#EC4899';
    const eyeSize = size * 0.08;
    ctx.beginPath();
    ctx.arc(centerX - size * 0.15, centerY - size * 0.1, eyeSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + size * 0.15, centerY - size * 0.1, eyeSize, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add a small heart
    ctx.fillStyle = '#EC4899';
    const heartSize = size * 0.1;
    const heartX = centerX;
    const heartY = centerY + size * 0.2;
    
    // Simple heart shape
    ctx.beginPath();
    ctx.arc(heartX - heartSize/2, heartY - heartSize/2, heartSize/2, 0, Math.PI, true);
    ctx.arc(heartX + heartSize/2, heartY - heartSize/2, heartSize/2, 0, Math.PI, true);
    ctx.lineTo(heartX, heartY + heartSize);
    ctx.closePath();
    ctx.fill();
    
    // If template, make it monochrome
    if (isTemplate) {
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha > 0) {
                data[i] = 255;     // R
                data[i + 1] = 255; // G
                data[i + 2] = 255; // B
                data[i + 3] = alpha; // A
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
    
    return canvas;
}

// Function to save canvas as PNG
function saveCanvas(canvas, filename) {
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filename, buffer);
    console.log(`Generated: ${filename}`);
}

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
}

// Generate main icon (512x512)
const mainIcon = createUwucordIcon(512);
saveCanvas(mainIcon, path.join(assetsDir, 'icon.png'));

// Generate tray icon (32x32)
const trayIcon = createUwucordIcon(32);
saveCanvas(trayIcon, path.join(assetsDir, 'trayIcon.png'));

// Generate template tray icon (32x32, monochrome)
const templateIcon = createUwucordIcon(32, true);
saveCanvas(templateIcon, path.join(assetsDir, 'trayIconTemplate.png'));

// Generate high-res template tray icon (64x64, monochrome)
const templateIcon2x = createUwucordIcon(64, true);
saveCanvas(templateIcon2x, path.join(assetsDir, 'trayIconTemplate@2x.png'));

console.log('All uwucord icons generated successfully! 🎉'); 