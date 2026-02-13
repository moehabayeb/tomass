// IMPORTANT: Polyfill must be first import to prevent crashes on Android
import './lib/speechSynthesisPolyfill'

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload LCP image so the browser discovers it before React renders the <img>
import tomasAvatar from './assets/tomas-avatar-256.webp';
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.as = 'image';
preloadLink.href = tomasAvatar;
preloadLink.setAttribute('fetchpriority', 'high');
document.head.appendChild(preloadLink);

// Version stamp for deployment verification (dev only)
if (import.meta.env.DEV) {
  console.log('TOMASS v3.0 - Development Mode');
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
