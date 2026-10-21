import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ZoomCard from './ZoomCard';
import { certificates } from '../data/projects';

// Filter definitions. `key` matches certificates[].category ('all' shows every
// item). Labels are localised via the language helper. An icon per category is
// reused from the Font Awesome set already loaded by the project.
const FILTERS = [
  { key: 'all', label: { en: 'All', id: 'Semua' }, icon: 'fas fa-layer-group' },
  { key: 'programming', label: { en: 'Programming', id: 'Pemrograman' }, icon: 'fas fa-code' },
  { key: 'web', label: { en: 'Web Development', id: 'Pengembangan Web' }, icon: 'fab fa-js' },
  { key: 'data-ai', label: { en: 'Data & AI', id: 'Data & AI' }, icon: 'fas fa-brain' },
  { key: 'language', label: { en: 'Language', id: 'Bahasa' }, icon: 'fas fa-language' }
];

// Short badge label per category shown on each card.
const CATEGORY_BADGE = {
  programming: { label: { en: 'Programming', id: 'Pemrograman' }, icon: 'fas fa-code' },
  web: { label: { en: 'Web', id: 'Web' }, icon: 'fab fa-js' },
  'data-ai': { label: { en: 'Data & AI', id: 'Data & AI' }, icon: 'fas fa-brain' },
  language: { label: { en: 'Language', id: 'Bahasa' }, icon: 'fas fa-language' }
};

export default function CertificatesSection({ onOpenCertificate }) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  // Only expose filters that actually have at least one matching certificate.
  const availableFilters = useMemo(
    () =>
      FILTERS.filter(
        (f) => f.key === 'all' || certificates.some((c) => c.category === f.key)
      ),
    []
  );

  const visibleCerts = useMemo(
    () =>
      activeFilter === 'all'
        ? certificates
        : certificates.filter((c) => c.category === activeFilter),
    [activeFilter]
  );

  return (
    <section id="certificates" className="section certs-section">
      <div className="container">

        {/* ---- Hero ---- */}
        <header className="certs-header">
          <div className="certs-eyebrow">
            <span className="certs-eyebrow__dot" aria-hidden="true" />
            <span>{t({ en: 'MY CERTIFICATES', id: 'SERTIFIKAT SAYA' })}</span>
          </div>

          <h2 className="certs-title">
            {t({ en: 'My Professional ', id: 'Sertifikat ' })}
            <span className="certs-title__accent">
              {t({ en: 'Certificates', id: 'Profesional Saya' })}
            </span>
          </h2>

          <p className="certs-intro">
            {t({
              en: 'A collection of certifications and achievements that reflect my learning journey in computer science, software engineering, and technology.',
              id: 'Kumpulan sertifikasi dan pencapaian yang merefleksikan perjalanan belajar saya di bidang ilmu komputer, rekayasa perangkat lunak, dan teknologi.'
            })}
          </p>

          <span className="certs-tagline" aria-hidden="true">
            Learn · Grow · Achieve
          </span>
        </header>

        {/* ---- Filter ---- */}
        <div
          className="certs-filter"
          role="tablist"
          aria-label={t({ en: 'Filter certificates by category', id: 'Filter sertifikat berdasarkan kategori' })}
        >
          {availableFilters.map((f) => {
            const isActive = activeFilter === f.key;
            const count =
              f.key === 'all'
                ? certificates.length
                : certificates.filter((c) => c.category === f.key).length;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`certs-filter__pill${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                <i className={f.icon} aria-hidden="true"></i>
                <span>{t(f.label)}</span>
                <span className="certs-filter__count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* ---- Grid ---- */}
        {visibleCerts.length === 0 ? (
          <div className="certs-empty">
            <i className="fas fa-folder-open" aria-hidden="true"></i>
            <p>{t({ en: 'No certificates in this category yet.', id: 'Belum ada sertifikat pada kategori ini.' })}</p>
          </div>
        ) : (
          <div className="certs-grid">
            {visibleCerts.map((cert) => {
              const badge = CATEGORY_BADGE[cert.category];
              return (
                <ZoomCard as="article" className="cert-card" key={cert.id || cert.img}>
                  <button
                    type="button"
                    className="cert-card__preview"
                    onClick={() => onOpenCertificate(cert)}
                    aria-label={t({ en: `Open ${cert.title}`, id: `Buka ${cert.title}` })}
                  >
                    <img
                      src={cert.img}
                      alt={cert.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.classList.add('is-broken');
                        e.currentTarget.alt = t({
                          en: 'Certificate image unavailable',
                          id: 'Gambar sertifikat tidak tersedia'
                        });
                      }}
                    />
                  </button>

                  <div className="cert-card__body">
                    {badge && (
                      <span className="cert-badge">
                        <i className={badge.icon} aria-hidden="true"></i>
                        {t(badge.label)}
                      </span>
                    )}

                    <h3 className="cert-card__title">{cert.title}</h3>

                    {cert.issuer && (
                      <p className="cert-card__issuer">
                        <i className="fas fa-building" aria-hidden="true"></i>
                        {cert.issuer}
                      </p>
                    )}

                    {cert.date && (
                      <p className="cert-card__date">
                        <i className="fas fa-calendar" aria-hidden="true"></i>
                        {cert.date}
                      </p>
                    )}

                    {cert.desc && (
                      <p className="cert-card__desc">{t(cert.desc)}</p>
                    )}

                    <button
                      type="button"
                      className="cert-card__details"
                      onClick={() => onOpenCertificate(cert)}
                    >
                      <span>{t({ en: 'View Details', id: 'Lihat Detail' })}</span>
                      <i className="fas fa-arrow-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </ZoomCard>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
