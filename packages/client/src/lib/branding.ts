export const BRANDING = {
  // App name and title
  name: "uwucord",
  fullName: "uwucord Chat",
  description: "User-first, privacy focused chat platform",
  
  // URLs
  website: "https://uwucord.chat",
  github: "https://github.com/uwucord",
  
  // Colors (you can customize these)
  primary: "#0F1823",
  accent: "#FF6B6B",
  
  // Logo paths
  logo: "/assets/icons/uwucord.svg",
  favicon: "/assets/icons/uwucord.svg",
  
  // Social links
  social: {
    twitter: "https://twitter.com/uwucord",
    discord: "https://discord.gg/uwucord",
    github: "https://github.com/uwucord"
  },
  
  // Features
  features: {
    privacy: true,
    openSource: true,
    selfHosted: true
  }
} as const;
