import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const NAV_ITEMS = [
  { id: 'about', en: 'About', id_: 'Tentang', icon: 'fas fa-user' },
  { id: 'projects', en: 'Projects', id_: 'Proyek', icon: 'fas fa-code' },
  { id: 'certificates', en: 'Certificates', id_: 'Sertifikat', icon: 'fas fa-certificate' },
  { id: 'contact', en: 'Contact', id_: 'Kontak', icon: 'fas fa-envelope' }
];

export default function Navbar({ activePage, onNavigate }) {
  const { lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <nav id="navbar" className="navbar-fixed">
      <div className="nav-container">
        <h1 className="logo" onClick={(e) => handleNavClick(e, 'about')} style={{ cursor: 'pointer' }}>
          Imam Mahatir Hasibuan
        </h1>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-items${menuOpen ? ' show' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link${activePage === item.id ? ' active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              <i className={item.icon}></i>
              <span>{lang === 'id' ? item.id_ : item.en}</span>
            </a>
          ))}

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
