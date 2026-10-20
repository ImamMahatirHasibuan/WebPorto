import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectData } from '../data/projects';

export default function ProjectModal({ projectId, onClose }) {
  const { lang, t } = useLanguage();
  const [imageIndex, setImageIndex] = useState(0);

  const project = projectId ? projectData[projectId] : null;

  useEffect(() => {
    setImageIndex(0);
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

  const handleOverlayClick = (e) => {
    if (e.target.id === 'projectModal') onClose();
  };

  return (
    <div
      id="projectModal"
      className="modal"
      style={{ display: 'block' }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={project.title[lang]}
    >
      <div className="modal-content">
        <button className="close close-modal" onClick={onClose} aria-label={t({ en: 'Close', id: 'Tutup' })}>
          &times;
        </button>

        <div className="modal-project">
          {/* Header */}
          <div className="modal-header">
            <h2>{project.title[lang]}</h2>
            <div className="project-meta">
              <span>
                <i className="fas fa-code" aria-hidden="true"></i>{' '}
                {project.technologies.length}{' '}
                {t({ en: 'Technologies', id: 'Teknologi' })}
              </span>
              <span>
                <i className="fas fa-image" aria-hidden="true"></i>{' '}
                {images.length}{' '}
                {t({ en: 'Screenshots', id: 'Tangkapan Layar' })}
              </span>
            </div>
            <div className="project-tech">
              {project.technologies.map((tech) => (
                <span className="tech-tag" key={tech}>{tech}</span>
              ))}
            </div>
          </div>

          {/* Two-column body on desktop: gallery + info */}
          <div className="modal-body">
            <div className="modal-gallery">
              <div className="modal-gallery-main">
                <img src={images[imageIndex]} alt={`${project.title[lang]} — ${imageIndex + 1}`} />
                {hasMultiple && (
                  <>
                    <button
                      className="modal-gallery-nav prev"
                      onClick={() => changeImage(-1)}
                      aria-label={t({ en: 'Previous image', id: 'Gambar sebelumnya' })}
                    >
                      &#10094;
                    </button>
                    <button
                      className="modal-gallery-nav next"
                      onClick={() => changeImage(1)}
                      aria-label={t({ en: 'Next image', id: 'Gambar berikutnya' })}
                    >
                      &#10095;
                    </button>
                    <span className="modal-gallery-counter">
                      {imageIndex + 1} / {images.length}
                    </span>
                  </>
                )}
              </div>
              {hasMultiple && (
                <div className="modal-gallery-thumbs">
                  {images.map((img, i) => (
                    <img
                      key={img}
                      src={img}
                      alt={`Screenshot ${i + 1}`}
                      className={i === imageIndex ? 'active' : ''}
                      onClick={() => setImageIndex(i)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="modal-info">
              <div className="modal-description">
                <h3>{t({ en: 'Project Overview', id: 'Gambaran Proyek' })}</h3>
                <p>{project.description[lang]}</p>
              </div>

              {(project.githubLink && projectId !== 'project7') || project.demoLink ? (
                <div className="modal-links">
                  {project.githubLink && projectId !== 'project7' && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="modal-link">
                      <i className="fab fa-github" aria-hidden="true"></i>
                      {t({ en: 'View Source Code', id: 'Lihat Kode Sumber' })}
                    </a>
                  )}
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="modal-link modal-link--accent">
                      <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                      {t({ en: 'Live Demo', id: 'Demo Langsung' })}
                    </a>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* Features */}
          <div className="modal-features">
            {project.features.map((feature) => (
              <div className="feature-item" key={feature.title.en}>
                <h4>{feature.title[lang]}</h4>
                <p>{feature.description[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
