import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const NAV_ITEMS = [
  { id: 'about', en: 'About', id_: 'Tentang' },
  { id: 'projects', en: 'Projects', id_: 'Proyek' },
  { id: 'certificates', en: 'Certificates', id_: 'Sertifikat' },
  { id: 'contact', en: 'Contact', id_: 'Kontak' }
];

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [active, setActive] = useState('about');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.id;
        }
      });
      if (current) setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav id="navbar" style={{ background: scrolled ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.3)' }}>
      <div className="nav-container">
        <h1 className="logo">Imam Mahatir Hasibuan</h1>

        <div className="nav-items">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link${active === item.id ? ' active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {lang === 'id' ? item.id_ : item.en}
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
