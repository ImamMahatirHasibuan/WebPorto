import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ZoomCard from './ZoomCard';
import { certificates } from '../data/projects';

export default function CertificatesSection({ onOpenCertificate }) {
  const { t } = useLanguage();

  return (
    <section id="certificates" className="section">
      <div className="container">
        <h2 className="main-title">{t({ en: 'Certificates', id: 'Sertifikat' })}</h2>
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <ZoomCard as="div" className="certificate-card" key={cert.img}>
              <img
                src={cert.img}
                alt={cert.title}
                style={{ cursor: 'pointer' }}
                onClick={() => onOpenCertificate(cert.img, cert.title)}
              />
              <h3>{cert.title}</h3>
            </ZoomCard>
          ))}
        </div>
      </div>
    </section>
  );
}
