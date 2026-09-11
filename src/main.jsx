/**
 * main.jsx
 * ========
 * Entry point (titik masuk) aplikasi React.
 * File ini adalah yang PERTAMA dijalankan oleh Vite bundler.
 * 
 * KENAPA ReactDOM.createRoot bukan ReactDOM.render?
 * - createRoot = React 18 API (Concurrent Mode)
 * - Mendukung fitur baru: automatic batching, transitions, Suspense
 * - ReactDOM.render sudah deprecated di React 18+
 * 
 * KENAPA React.StrictMode?
 * - Mendeteksi masalah potensial di development (double-render untuk cek side effects)
 * - Tidak mempengaruhi production build (dihapus otomatis)
 * - Membantu menemukan bug seperti missing cleanup di useEffect
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'       // Komponen utama aplikasi
import './index.css'              // Global stylesheet (semua style CSS)

// Mount aplikasi React ke elemen <div id="root"> di index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
