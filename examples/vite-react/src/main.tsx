import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

const rootEl = document.getElementById('root')

if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
