import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ZoomCard from './ZoomCard';
import { projectCards } from '../data/projects';

export default function ProjectsSection({ onOpenProject }) {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="main-title">{t({ en: 'Projects', id: 'Proyek' })}</h2>
        <div className="projects-grid">
          {projectCards.map((card) => (
            <ZoomCard
              as="div"
              className="project-card"
              key={card.id}
              onClick={() => onOpenProject(card.id)}
            >
              <img src={card.img} alt={card.title} />
              <div className="project-content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="project-links">
                  {card.github && (
                    <a
                      href={card.github}
                      className="project-link"
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i>
                      <span>GitHub</span>
                    </a>
                  )}
                  {card.demo && (
                    <a
                      href={card.demo}
                      className="project-link"
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      <span>Demo</span>
                    </a>
                  )}
                </div>
                <div className="view-details">
                  <i className="fas fa-eye"></i>
                  <span>{t({ en: 'Click to view details', id: 'Klik untuk melihat detail' })}</span>
                </div>
              </div>
            </ZoomCard>
          ))}
        </div>
      </div>
    </section>
  );
}
