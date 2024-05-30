import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const appEl = document.getElementById('app')

if (appEl) {
  createRoot(appEl).render(<App />)
}
