#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Branding configuration
const BRANDING = {
  name: 'uwucord',
  fullName: 'uwucord Chat',
  description: 'User-first, privacy focused chat platform',
  website: 'https://uwucord.chat',
  colors: {
    primary: '#0F1823',
    accent: '#FF6B6B'
  }
};

// Files to customize
const filesToCustomize = [
  'packages/client/index.html',
  'packages/client/package.json',
  'README.md',
  'package.json'
];

// Text replacements
const replacements = [
  { from: /revolt\.chat/g, to: 'uwucord.chat' },
  { from: /Revolt/g, to: 'uwucord' },
  { from: /revolt/g, to: 'uwucord' },
  { from: /REVOLT/g, to: 'UWUCORD' },
  { from: 'User-first, privacy focused chat platform', to: BRANDING.description },
  { from: 'https://revolt.chat', to: BRANDING.website }
];

console.log('🎨 Customizing uwucord branding...');

// Customize files
filesToCustomize.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    replacements.forEach(replacement => {
      content = content.replace(replacement.from, replacement.to);
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${filePath}`);
  }
});

// Create branding configuration
const brandingConfig = `export const BRANDING = ${JSON.stringify(BRANDING, null, 2)};`;

if (!fs.existsSync('packages/client/src/lib')) {
  fs.mkdirSync('packages/client/src/lib', { recursive: true });
}

fs.writeFileSync('packages/client/src/lib/branding.ts', brandingConfig);
console.log('✅ Created branding configuration');

console.log('🎉 uwucord branding customization complete!');
console.log('📦 Ready to deploy to Vercel'); 