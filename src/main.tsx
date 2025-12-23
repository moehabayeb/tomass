// IMPORTANT: Polyfill must be first import to prevent crashes on Android
import './lib/speechSynthesisPolyfill'

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Version stamp for deployment verification (dev only)
if (import.meta.env.DEV) {
  console.log('TOMASS v3.0 - Development Mode');
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
