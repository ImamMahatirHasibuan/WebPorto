/**
 * Navbar.jsx
 * ==========
 * Komponen navigasi utama yang fixed di atas halaman.
 *
 * STRUKTUR:
 * - Desktop (> 768px): link navigasi + language switcher tampil inline (.nav-items).
 * - Mobile (<= 768px): tombol hamburger membuka drawer kanan (.nav-drawer)
 *   dengan overlay (.nav-overlay). Drawer punya header brand + tombol close,
 *   daftar navigasi, dan segmented control EN/ID.
 *
 * KENAPA drawer dipisah dari .nav-items desktop?
 * - Menghindari konflik state antara layout inline desktop dan panel mobile.
 * - Desktop tidak pernah me-render overlay/drawer; mobile menyembunyikan
 *   .nav-items via CSS. Satu sumber state (menuOpen) tetap dipakai keduanya.
 *
 * State halaman tetap dikelola di App.jsx (lifting state up). Navbar hanya
 * menampilkan activePage dan meminta perubahan via onNavigate.
 */

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';

const NAV_ITEMS = [
  { id: 'about', en: 'About', id_: 'Tentang', icon: 'fas fa-user' },
  { id: 'projects', en: 'Projects', id_: 'Proyek', icon: 'fas fa-code' },
  { id: 'certificates', en: 'Certificates', id_: 'Sertifikat', icon: 'fas fa-certificate' },
  { id: 'contact', en: 'Contact', id_: 'Kontak', icon: 'fas fa-envelope' }
];

export default function Navbar({ activePage, onNavigate }) {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const hamburgerRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    onNavigate(id);
    closeMenu();
  };

  // Escape to close + body scroll lock while the mobile drawer is open.
  // Listeners are cleaned up on unmount / state change.
  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    // Move focus into the drawer for keyboard users.
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Return focus to the hamburger button after the drawer closes.
  useEffect(() => {
    if (!menuOpen) hamburgerRef.current?.blur?.();
  }, [menuOpen]);

  const label = (item) => (lang === 'id' ? item.id_ : item.en);

  return (
    <>
    <nav id="navbar" className="navbar-fixed">
      <div className="nav-container">
        <h1
          className="logo"
          onClick={(e) => handleNavClick(e, 'about')}
          style={{ cursor: 'pointer' }}
        >
          Imam Mahatir Hasibuan
        </h1>

        {/* ====== DESKTOP NAV (inline) ====== */}
        <div className="nav-items">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link${activePage === item.id ? ' active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              <i className={item.icon} aria-hidden="true"></i>
              <span>{label(item)}</span>
            </a>
          ))}

          <div className="language-switcher">
            <button
              className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <button
              className={`lang-btn${lang === 'id' ? ' active' : ''}`}
              onClick={() => setLang('id')}
              aria-pressed={lang === 'id'}
            >
              ID
            </button>
          </div>
        </div>

        {/* ====== HAMBURGER (mobile only) ====== */}
        <button
          ref={hamburgerRef}
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen
            ? t({ en: 'Close navigation menu', id: 'Tutup menu navigasi' })
            : t({ en: 'Open navigation menu', id: 'Buka menu navigasi' })}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    {/* ====== MOBILE OVERLAY + DRAWER ======
        Rendered via portal to <body> so `position: fixed` resolves against the
        viewport, not the navbar. The navbar uses backdrop-filter which would
        otherwise become the containing block and trap these layers inside its
        70px box (causing the page to show through below the panel). */}
    {createPortal(
      <>
      <div
        className={`nav-overlay${menuOpen ? ' show' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        id="mobile-drawer"
        className={`nav-drawer${menuOpen ? ' show' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-drawer__header">
          <span className="nav-drawer__brand">Imam Mahatir Hasibuan</span>
          <button
            ref={closeBtnRef}
            className="nav-drawer__close"
            onClick={closeMenu}
            aria-label={t({ en: 'Close menu', id: 'Tutup menu' })}
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <nav className="nav-drawer__nav" aria-label={t({ en: 'Mobile navigation', id: 'Navigasi mobile' })}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-drawer__link${activePage === item.id ? ' active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
              aria-current={activePage === item.id ? 'page' : undefined}
              tabIndex={menuOpen ? 0 : -1}
            >
              <i className={item.icon} aria-hidden="true"></i>
              <span>{label(item)}</span>
            </a>
          ))}
        </nav>

        <div className="nav-drawer__footer">
          <span className="nav-drawer__footer-label">
            {t({ en: 'Language', id: 'Bahasa' })}
          </span>
          <div className="nav-drawer__lang" role="group" aria-label={t({ en: 'Language', id: 'Bahasa' })}>
            <button
              className={`nav-drawer__lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              tabIndex={menuOpen ? 0 : -1}
            >
              EN
            </button>
            <button
              className={`nav-drawer__lang-btn${lang === 'id' ? ' active' : ''}`}
              onClick={() => setLang('id')}
              aria-pressed={lang === 'id'}
              tabIndex={menuOpen ? 0 : -1}
            >
              ID
            </button>
          </div>
        </div>
      </aside>
      </>,
      document.body
    )}
    </>
  );
}
