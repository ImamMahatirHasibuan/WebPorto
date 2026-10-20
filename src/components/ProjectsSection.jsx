import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ZoomCard from './ZoomCard';
import { projectCards, projectData } from '../data/projects';

// Maximum number of tech badges rendered on a card before collapsing the rest
// into a "+N" indicator. The full list always stays available in the modal.
const MAX_BADGES = 3;

// Filter definitions. `key` matches projectCards[].category ('all' shows every
// project). Labels are localised via the language helper.
const FILTERS = [
  { key: 'all', label: { en: 'All', id: 'Semua' } },
  { key: 'web', label: { en: 'Web Apps', id: 'Aplikasi Web' } },
  { key: 'ml', label: { en: 'Machine Learning', id: 'Machine Learning' } },
  { key: 'gis', label: { en: 'Web GIS', id: 'Web GIS' } },
  { key: 'other', label: { en: 'Others', id: 'Lainnya' } }
];

export default function ProjectsSection({ onOpenProject }) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  // Only expose filters that actually have at least one matching project, so
  // the segmented control never shows an empty category.
  const availableFilters = useMemo(
    () =>
      FILTERS.filter(
        (f) => f.key === 'all' || projectCards.some((c) => c.category === f.key)
      ),
    []
  );

  const visibleCards = useMemo(
    () =>
      activeFilter === 'all'
        ? projectCards
        : projectCards.filter((c) => c.category === activeFilter),
    [activeFilter]
  );

  return (
    <section id="projects" className="section projects-section">
      <div className="container">

        {/* ---- Header ---- */}
        <header className="projects-header">
          <div className="projects-eyebrow">
            <span className="projects-eyebrow__dot" aria-hidden="true" />
            <span>{t({ en: 'MY PROJECTS', id: 'PROYEK SAYA' })}</span>
          </div>

          <h2 className="projects-title">
            {t({ en: "Projects I've ", id: 'Proyek yang Saya ' })}
            <span className="projects-title__accent">
              {t({ en: 'Built', id: 'Bangun' })}
            </span>
          </h2>

          <p className="projects-intro">
            {t({
              en: "A collection of applications and systems I've developed through coursework and hands-on projects, covering web development, data, and software engineering.",
              id: 'Kumpulan aplikasi dan sistem yang saya kembangkan melalui perkuliahan dan proyek langsung, mulai dari pengembangan web, pengolahan data, hingga rekayasa perangkat lunak.'
            })}
          </p>

          <span className="projects-tagline" aria-hidden="true">
            Build · Solve · Improve
          </span>
        </header>

        {/* ---- Category filter ---- */}
        <div
          className="projects-filter"
          role="tablist"
          aria-label={t({ en: 'Filter projects by category', id: 'Filter proyek berdasarkan kategori' })}
        >
          {availableFilters.map((f) => {
            const isActive = activeFilter === f.key;
            const count =
              f.key === 'all'
                ? projectCards.length
                : projectCards.filter((c) => c.category === f.key).length;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`projects-filter__pill${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                <span>{t(f.label)}</span>
                <span className="projects-filter__count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* ---- Grid ---- */}
        <div className="projects-grid">
          {visibleCards.map((card) => {
            // Authoritative record drives links + tech badges so the card can
            // never render a stale/placeholder URL.
            const data = projectData[card.id] || {};
            const github = data.githubLink;
            const demo = data.demoLink;
            const technologies = data.technologies || [];
            const shownTech = technologies.slice(0, MAX_BADGES);
            const extraTech = technologies.length - shownTech.length;
            const title = data.title ? t(data.title) : card.title;

            return (
              <ZoomCard
                as="article"
                className="project-card"
                key={card.id}
                onClick={() => onOpenProject(card.id)}
                role="button"
                tabIndex={0}
                aria-label={t({ en: `View details for ${title}`, id: `Lihat detail ${title}` })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProject(card.id);
                  }
                }}
              >
                <div className="project-card__preview">
                  <img src={card.img} alt={title} loading="lazy" />
                </div>

                <div className="project-content">
                  <h3 className="project-card__title">{title}</h3>

                  {technologies.length > 0 && (
                    <div className="project-card__tech">
                      {shownTech.map((tech) => (
                        <span className="project-badge" key={tech}>
                          {tech}
                        </span>
                      ))}
                      {extraTech > 0 && (
                        <span className="project-badge project-badge--more">
                          +{extraTech}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="project-card__desc">{card.desc}</p>

                  <div className="project-card__footer">
                    <div className="project-links">
                      {github && (
                        <a
                          href={github}
                          className="project-link"
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${title} GitHub repository`}
                        >
                          <i className="fab fa-github" aria-hidden="true"></i>
                          <span>GitHub</span>
                        </a>
                      )}
                      {demo && (
                        <a
                          href={demo}
                          className="project-link"
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${title} live demo`}
                        >
                          <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                          <span>Demo</span>
                        </a>
                      )}
                    </div>

                    <span className="view-details">
                      <span>{t({ en: 'View Details', id: 'Lihat Detail' })}</span>
                      <i className="fas fa-arrow-right" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </ZoomCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
