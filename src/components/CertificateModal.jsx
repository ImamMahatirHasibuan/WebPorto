import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CertificateModal({ certificate, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!certificate) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const { img, title, issuer, date, desc } = certificate;
  const description = desc ? t(desc) : null;

  return (
    <div
      className="cert-modal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cert-modal__panel">
        <button
          type="button"
          className="cert-modal__close"
          onClick={onClose}
          aria-label={t({ en: 'Close', id: 'Tutup' })}
        >
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>

        <div className="cert-modal__figure">
          <img src={img} alt={title} />
        </div>

        <div className="cert-modal__info">
          <h2 className="cert-modal__title">{title}</h2>
          {(issuer || date) && (
            <div className="cert-modal__meta">
              {issuer && (
                <span><i className="fas fa-building" aria-hidden="true"></i> {issuer}</span>
              )}
              {date && (
                <span><i className="fas fa-calendar" aria-hidden="true"></i> {date}</span>
              )}
            </div>
          )}
          {description && <p className="cert-modal__desc">{description}</p>}
        </div>
      </div>
    </div>
  );
}
