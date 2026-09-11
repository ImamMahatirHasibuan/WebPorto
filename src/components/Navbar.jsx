/**
 * Navbar.jsx
 * ==========
 * Komponen navigasi utama yang fixed di atas halaman.
 * 
 * FITUR:
 * 1. 4 link navigasi (About, Projects, Certificates, Contact) dengan ikon
 * 2. Highlight halaman aktif dengan gradient background
 * 3. Tombol switch bahasa (EN/ID)
 * 4. Hamburger menu untuk tampilan mobile/responsive
 * 
 * KENAPA navigasi di-handle via props (activePage, onNavigate)?
 * - "Lifting state up" pattern: state halaman dikelola di App.jsx
 * - Navbar hanya MENAMPILKAN state dan MEMINTA perubahan via callback
 * - Ini membuat Navbar reusable dan mudah di-test
 * - Single source of truth: hanya App.jsx yang tahu halaman mana yang aktif
 */

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Array konfigurasi item navigasi
// KENAPA pakai array bukan hardcode di JSX?
// - Mudah ditambah/dikurangi menu tanpa ubah JSX structure
// - Bisa di-map untuk render → kode DRY (Don't Repeat Yourself)
// - Konsisten: setiap item punya struktur yang sama
const NAV_ITEMS = [
  { id: 'about', en: 'About', id_: 'Tentang', icon: 'fas fa-user' },
  { id: 'projects', en: 'Projects', id_: 'Proyek', icon: 'fas fa-code' },
  { id: 'certificates', en: 'Certificates', id_: 'Sertifikat', icon: 'fas fa-certificate' },
  { id: 'contact', en: 'Contact', id_: 'Kontak', icon: 'fas fa-envelope' }
];
// CATATAN: 'id_' (dengan underscore) karena 'id' sudah dipakai sebagai identifier
// Tidak bisa pakai { id: 'about', id: 'Tentang' } — key duplikat!

/**
 * @param {string} activePage - Halaman yang sedang aktif ('about'|'projects'|...)
 * @param {function} onNavigate - Callback saat user klik menu: onNavigate('projects')
 */
export default function Navbar({ activePage, onNavigate }) {
  const { lang, setLang } = useLanguage();
  // State untuk toggle hamburger menu di mobile
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Handler klik navigasi
   * - preventDefault: mencegah browser scroll ke anchor (#about, #projects, dll)
   * - onNavigate: panggil callback dari App.jsx untuk ganti halaman
   * - setMenuOpen(false): tutup menu mobile setelah navigasi
   */
  const handleNavClick = (e, id) => {
    e.preventDefault();
    onNavigate(id);
    setMenuOpen(false); // tutup hamburger menu jika terbuka
  };

  return (
    // KENAPA className bukan id?
    // - id hanya boleh 1 per halaman, className bisa multiple
    // - Lebih mudah di-style dan di-override dengan CSS
    <nav id="navbar" className="navbar-fixed">
      <div className="nav-container">
        {/* Logo — klik untuk kembali ke About */}
        <h1 className="logo" onClick={(e) => handleNavClick(e, 'about')} style={{ cursor: 'pointer' }}>
          Imam Mahatir Hasibuan
        </h1>

        {/* ====== HAMBURGER BUTTON (Mobile Only) ====== */}
        {/* KENAPA hamburger manual bukan library?
            - Hanya butuh 3 span + CSS animation
            - Library (react-hamburger) = ~5KB untuk fitur yang bisa dibuat 10 baris
            - Kontrol penuh atas animasi open/close */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu" // aksesibilitas: screen reader bisa baca tombol ini
        >
          {/* 3 garis horizontal — saat 'open':
              - Garis 1: rotate 45° (menjadi \)
              - Garis 2: opacity 0 (hilang)
              - Garis 3: rotate -45° (menjadi /)
              Hasilnya: ☰ → ✕ */}
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* ====== MENU ITEMS ====== */}
        {/* Class 'show' ditambahkan saat hamburger open (mobile)
            Di desktop: selalu terlihat via CSS (display: flex) */}
        <div className={`nav-items${menuOpen ? ' show' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}  // fallback href jika JS disabled
              // Class 'active' ditambahkan ke halaman yang sedang aktif
              // CSS: gradient background + glow effect
              className={`nav-link${activePage === item.id ? ' active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {/* Ikon Font Awesome di samping teks */}
              <i className={item.icon}></i>
              {/* Teks label — otomatis switch bahasa via lang state */}
              <span>{lang === 'id' ? item.id_ : item.en}</span>
            </a>
          ))}

          {/* ====== LANGUAGE SWITCHER ====== */}
          {/* KENAPA 2 tombol bukan dropdown?
              - Hanya 2 opsi (EN/ID) — tombol lebih cepat diakses
              - Dropdown membutuhkan 2 klik (buka → pilih), tombol cuma 1 klik
              - Visual lebih jelas: langsung terlihat bahasa mana yang aktif */}
          <div className="language-switcher">
            <button
              className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              className={`lang-btn${lang === 'id' ? ' active' : ''}`}
              onClick={() => setLang('id')}
            >
              ID
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
