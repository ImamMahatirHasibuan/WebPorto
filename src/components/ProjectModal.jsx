import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectData, projectCards } from '../data/projects';

// Readable, bilingual labels for the category keys stored on projectCards.
const CATEGORY_LABELS = {
  web: { en: 'Web Development', id: 'Pengembangan Web' },
  ml: { en: 'Machine Learning', id: 'Machine Learning' },
  gis: { en: 'Web GIS', id: 'Web GIS' },
  other: { en: 'Others', id: 'Lainnya' }
};

// Ordered list of project ids (drives Previous / Next navigation).
const ORDER = projectCards.map((c) => c.id);

/**
 * Full-page Project Detail view.
 * Props:
 *  - projectId: active project id (null = closed)
 *  - onClose: back to the projects list
 *  - onNavigate(id): optional, switch to another project (prev/next)
 */
export default function ProjectModal({ projectId, onClose, onNavigate }) {
  const { lang, t } = useLanguage();
  const [imageIndex, setImageIndex] = useState(0);

  const project = projectId ? projectData[projectId] : null;
  const card = projectId ? projectCards.find((c) => c.id === projectId) : null;

  useEffect(() => {
    setImageIndex(0);
    // Scroll the detail view to the top when switching projects.
    const el = document.getElementById('projectDetail');
    if (el) el.scrollTop = 0;
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKey);
    };
  }, [projectId, onClose]);

  if (!project) return null;

  const images = project.images || [];
  const hasMultiple = images.length > 1;

  const changeImage = (direction) => {
    setImageIndex((prev) => {
      let next = prev + direction;
      if (next >= images.length) next = 0;
      if (next < 0) next = images.length - 1;
      return next;
    });
  };

  // Prev / next within the authoritative project order.
  const currentIndex = ORDER.indexOf(projectId);
  const prevId = currentIndex > 0 ? ORDER[currentIndex - 1] : null;
  const nextId = currentIndex >= 0 && currentIndex < ORDER.length - 1 ? ORDER[currentIndex + 1] : null;
  const goTo = (id) => {
    if (id && onNavigate) onNavigate(id);
  };

  // Split the title so the last word can take the violet accent.
  const fullTitle = project.title[lang];
  const titleWords = fullTitle.trim().split(' ');
  const titleHead = titleWords.slice(0, -1).join(' ');
  const titleTail = titleWords[titleWords.length - 1];

  const categoryLabel = card && CATEGORY_LABELS[card.category];
  const showGithub = project.githubLink && projectId !== 'project7';

  return (
    <div
      id="projectDetail"
      className="pd-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={fullTitle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pd-container" role="document">
        {/* ---- Header ---- */}
        <header className="pd-header">
          <div className="pd-header__text">
            <div className="pd-eyebrow">
              <span className="pd-eyebrow__dot" aria-hidden="true" />
              <span>{t({ en: 'FEATURED PROJECT', id: 'PROYEK UNGGULAN' })}</span>
            </div>

            <h1 className="pd-title">
              {titleHead && <>{titleHead} </>}
              <span className="pd-title__accent">{titleTail}</span>
            </h1>

            {categoryLabel && (
              <span className="pd-header__category">{t(categoryLabel)}</span>
            )}
          </div>

          <button
            className="pd-close"
            onClick={onClose}
            aria-label={t({ en: 'Close', id: 'Tutup' })}
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </header>

        {/* Scrollable body wrapper */}
        <div className="pd-scroll">
        <p className="pd-lead">{project.description[lang]}</p>

        <div className="pd-badges">
          {project.technologies.map((tech) => (
            <span className="pd-badge" key={tech}>{tech}</span>
          ))}
        </div>

        {/* ---- Main two-column ---- */}
        <div className="pd-body">
          {/* Gallery */}
          <div className="pd-gallery">
            <div className="pd-gallery__main">
              <img src={images[imageIndex]} alt={`${fullTitle} — ${imageIndex + 1}`} />
              {hasMultiple && (
                <>
                  <button
                    className="pd-gallery__nav prev"
                    onClick={() => changeImage(-1)}
                    aria-label={t({ en: 'Previous image', id: 'Gambar sebelumnya' })}
                  >
                    <i className="fas fa-chevron-left" aria-hidden="true"></i>
                  </button>
                  <button
                    className="pd-gallery__nav next"
                    onClick={() => changeImage(1)}
                    aria-label={t({ en: 'Next image', id: 'Gambar berikutnya' })}
                  >
                    <i className="fas fa-chevron-right" aria-hidden="true"></i>
                  </button>
                  <span className="pd-gallery__counter">
                    {imageIndex + 1} / {images.length}
                  </span>
                </>
              )}
            </div>

            {hasMultiple && (
              <div className="pd-thumbs">
                {images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    className={`pd-thumb${i === imageIndex ? ' active' : ''}`}
                    onClick={() => setImageIndex(i)}
                    aria-label={`${t({ en: 'View screenshot', id: 'Lihat tangkapan layar' })} ${i + 1}`}
                    aria-current={i === imageIndex}
                  >
                    <img src={img} alt={`${fullTitle} thumbnail ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <aside className="pd-info">
            <section className="pd-panel">
              <h2 className="pd-panel__title">
                {t({ en: 'Project Information', id: 'Informasi Proyek' })}
              </h2>
              <dl className="pd-meta">
                {categoryLabel && (
                  <div className="pd-meta__row">
                    <dt><i className="fas fa-folder" aria-hidden="true"></i> {t({ en: 'Category', id: 'Kategori' })}</dt>
                    <dd><span className="pd-meta__tag">{t(categoryLabel)}</span></dd>
                  </div>
                )}
                <div className="pd-meta__row">
                  <dt><i className="fas fa-code" aria-hidden="true"></i> {t({ en: 'Technologies', id: 'Teknologi' })}</dt>
                  <dd>{project.technologies.join(', ')}</dd>
                </div>
                {project.date && (
                  <div className="pd-meta__row">
                    <dt><i className="fas fa-calendar" aria-hidden="true"></i> {t({ en: 'Date', id: 'Tanggal' })}</dt>
                    <dd>{project.date}</dd>
                  </div>
                )}
                {project.duration && (
                  <div className="pd-meta__row">
                    <dt><i className="fas fa-clock" aria-hidden="true"></i> {t({ en: 'Duration', id: 'Durasi' })}</dt>
                    <dd>{t(project.duration)}</dd>
                  </div>
                )}
              </dl>
            </section>

            <section className="pd-panel">
              <h2 className="pd-panel__title">{t({ en: 'Overview', id: 'Gambaran' })}</h2>
              <p className="pd-overview">{project.description[lang]}</p>
            </section>

            <section className="pd-panel">
              <h2 className="pd-panel__title">{t({ en: 'Key Features', id: 'Fitur Utama' })}</h2>
              <ul className="pd-features">
                {project.features.map((feature) => (
                  <li className="pd-feature" key={feature.title.en}>
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                    <span>{feature.title[lang]}</span>
                  </li>
                ))}
              </ul>
            </section>

            {(showGithub || project.demoLink) && (
              <div className="pd-actions">
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="pd-action pd-action--primary">
                    <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                    {t({ en: 'Live Demo', id: 'Demo Langsung' })}
                  </a>
                )}
                {showGithub && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="pd-action">
                    <i className="fab fa-github" aria-hidden="true"></i>
                    {t({ en: 'View Source Code', id: 'Lihat Kode Sumber' })}
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>

        {/* ---- Prev / Next ---- */}
        <nav className="pd-nav" aria-label={t({ en: 'Project navigation', id: 'Navigasi proyek' })}>
          {prevId ? (
            <button className="pd-nav__btn prev" onClick={() => goTo(prevId)}>
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
              <span>
                <small>{t({ en: 'Previous Project', id: 'Proyek Sebelumnya' })}</small>
                <strong>{projectData[prevId].title[lang]}</strong>
              </span>
            </button>
          ) : <span />}

          {nextId ? (
            <button className="pd-nav__btn next" onClick={() => goTo(nextId)}>
              <span>
                <small>{t({ en: 'Next Project', id: 'Proyek Berikutnya' })}</small>
                <strong>{projectData[nextId].title[lang]}</strong>
              </span>
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          ) : <span />}
        </nav>
        </div>
      </div>
    </div>
  );
}
