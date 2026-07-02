import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CvSection() {
  const { t } = useLanguage();

  return (
    <section id="cv" className="section cv-section">
      <div className="container">
        <h2 className="main-title">{t({ en: 'Curriculum Vitae', id: 'Curriculum Vitae' })}</h2>
        <div className="cv-card">
          <p className="cv-text">
            {t({ en: 'Download my latest CV in PDF format.', id: 'Unduh CV terbaru saya dalam format PDF.' })}
          </p>
          <a className="cv-download-btn" href="asset/CV  Imam Mahatir Hasibuan.pdf" download>
            <i className="fas fa-download"></i>
            <span>{t({ en: 'Download CV', id: 'Unduh CV' })}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
