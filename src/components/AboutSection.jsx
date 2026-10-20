import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import IdCard from './IdCard';
import PhotoGallery from './PhotoGallery';
import ZoomCard from './ZoomCard';
import { educationList, skillsData, activities } from '../data/projects';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section about-section">
      <div className="container about-container">

        {/* 1. HERO / ABOUT ME — 2-Column Editorial Composition */}
        <ZoomCard as="div" className="about-hero">
          {/* Left: Interactive ID Card */}
          <div className="about-hero__card-col">
            <IdCard />
          </div>

          {/* Right: Authentic Narrative Profile */}
          <div className="about-hero__content-col">
            <div className="about-hero__eyebrow">
              <span className="about-hero__eyebrow-dot" aria-hidden="true"></span>
              <span>
                {t({
                  en: 'ABOUT ME / SOFTWARE DEVELOPER',
                  id: 'TENTANG SAYA / PENGEMBANG PERANGKAT LUNAK'
                })}
              </span>
            </div>

            <h1 className="about-hero__title">
              {t({ en: "Hi, I'm ", id: 'Halo, Saya ' })}
              <span className="about-hero__name-accent">Imam Mahatir Hasibuan</span>
            </h1>

            <p className="about-hero__subtitle">
              {t({
                en: 'Computer Science Student · Software Engineering',
                id: 'Mahasiswa Ilmu Komputer · Software Engineering'
              })}
            </p>

            <p className="about-hero__lead">
              {t({
                en: 'I am a Computer Science student at Binus University specializing in Software Engineering. My core focus centers on developing reliable, accessible web applications and data systems, with a strong emphasis on clean code and practical architecture.',
                id: 'Saya adalah mahasiswa Ilmu Komputer di Binus University dengan spesialisasi Rekayasa Perangkat Lunak. Fokus utama saya berpusat pada pembangunan aplikasi web dan sistem data yang andal serta mudah diakses, dengan penekanan pada kode bersih dan arsitektur praktis.'
              })}
            </p>

            <p className="about-hero__text">
              {t({
                en: 'Through academic coursework and hands-on projects, I work with modern stacks including React, Laravel, and Python, engineering interactive Web GIS geodashboards and machine learning solutions. I thrive in collaborative engineering teams, value disciplined craftsmanship, and enjoy solving real-world challenges.',
                id: 'Melalui perkuliahan dan berbagai proyek mandiri, saya terbiasa menggunakan stack modern seperti React, Laravel, dan Python, membangun geodashboard Web GIS interaktif hingga solusi machine learning. Saya berkembang dalam kerja tim yang kolaboratif, menghargai keahlian teknis yang disiplin, dan antusias memecahkan tantangan dunia nyata.'
              })}
            </p>

            {/* Clean, Non-Dashboard Horizontal Statistics */}
            <div className="about-hero__stats">
              <div className="about-stat-item">
                <span className="about-stat-num">10+</span>
                <span className="about-stat-lbl">
                  {t({ en: 'Projects Built', id: 'Proyek Selesai' })}
                </span>
              </div>
              <div className="about-stat-divider" aria-hidden="true" />
              <div className="about-stat-item">
                <span className="about-stat-num">3.04</span>
                <span className="about-stat-lbl">
                  {t({ en: 'Current GPA', id: 'IPK Kumulatif' })}
                </span>
              </div>
              <div className="about-stat-divider" aria-hidden="true" />
              <div className="about-stat-item">
                <span className="about-stat-num">9</span>
                <span className="about-stat-lbl">
                  {t({ en: 'Certifications', id: 'Sertifikasi' })}
                </span>
              </div>
            </div>
          </div>
        </ZoomCard>

        {/* 2. EDUCATION — Minimalist Vertical Timeline */}
        <ZoomCard as="div" className="about-section-block">
          <div className="about-block-header">
            <span className="about-block-tag">
              {t({ en: 'Milestones', id: 'Pendidikan' })}
            </span>
            <h2 className="about-block-title">
              {t({ en: 'Education Journey', id: 'Riwayat Pendidikan' })}
            </h2>
          </div>

          <div className="about-timeline">
            {educationList.map((edu, index) => (
              <div
                className={`about-timeline__item${edu.current ? ' is-current' : ''}`}
                key={edu.name}
              >
                {/* Node & vertical line */}
                <div className="about-timeline__track">
                  <div className="about-timeline__node" aria-hidden="true" />
                  {index < educationList.length - 1 && (
                    <div className="about-timeline__line" aria-hidden="true" />
                  )}
                </div>

                {/* Content */}
                <div className="about-timeline__body">
                  <div className="about-timeline__header">
                    <span className="about-timeline__year">{edu.years}</span>
                    {edu.current && (
                      <span className="about-timeline__badge">
                        {t({ en: 'Current', id: 'Sedang Berjalan' })}
                      </span>
                    )}
                  </div>
                  <h3 className="about-timeline__name">{edu.name}</h3>
                  {edu.level && (
                    <p className="about-timeline__level">{t(edu.level)}</p>
                  )}
                  {edu.major && (
                    <p className="about-timeline__major">{t(edu.major)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ZoomCard>

        {/* 3. TECHNICAL SKILLS & STACK — Categorised Groups */}
        <ZoomCard as="div" className="about-section-block">
          <div className="about-block-header">
            <span className="about-block-tag">
              {t({ en: 'Stack & Tooling', id: 'Teknologi & Keahlian' })}
            </span>
            <h2 className="about-block-title">
              {t({ en: 'Technical Expertise', id: 'Keahlian Teknis' })}
            </h2>
          </div>

          <div className="about-skills-grid">
            {/* Programming Languages */}
            <div className="about-skills-group">
              <div className="about-skills-group__header">
                <i className="fas fa-terminal" aria-hidden="true"></i>
                <h3>{t({ en: 'Programming Languages', id: 'Bahasa Pemrograman' })}</h3>
              </div>
              <div className="about-skills-chips">
                {skillsData.programmingLanguages.map((skill) => (
                  <div className="about-skill-chip" key={skill.name}>
                    <i className={skill.icon} aria-hidden="true"></i>
                    <span className="about-skill-chip__name">{skill.name}</span>
                    {skill.tag && <span className="about-skill-chip__tag">{skill.tag}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className="about-skills-group">
              <div className="about-skills-group__header">
                <i className="fas fa-cubes" aria-hidden="true"></i>
                <h3>{t({ en: 'Frameworks', id: 'Framework' })}</h3>
              </div>
              <div className="about-skills-chips">
                {skillsData.frameworks.map((skill) => (
                  <div className="about-skill-chip" key={skill.name}>
                    <i className={skill.icon} aria-hidden="true"></i>
                    <span className="about-skill-chip__name">{skill.name}</span>
                    {skill.tag && <span className="about-skill-chip__tag">{skill.tag}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Libraries & Tools */}
            <div className="about-skills-group">
              <div className="about-skills-group__header">
                <i className="fas fa-layer-group" aria-hidden="true"></i>
                <h3>{t({ en: 'Libraries & Tools', id: 'Library & Tools' })}</h3>
              </div>
              <div className="about-skills-chips">
                {skillsData.librariesAndTools.map((skill) => (
                  <div className="about-skill-chip" key={skill.name}>
                    <i className={skill.icon} aria-hidden="true"></i>
                    <span className="about-skill-chip__name">{skill.name}</span>
                    {skill.tag && <span className="about-skill-chip__tag">{skill.tag}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Web Technologies & Databases */}
            <div className="about-skills-group">
              <div className="about-skills-group__header">
                <i className="fas fa-database" aria-hidden="true"></i>
                <h3>{t({ en: 'Web Technologies & Databases', id: 'Teknologi Web & Basis Data' })}</h3>
              </div>
              <div className="about-skills-chips">
                {skillsData.webAndDatabase.map((skill) => (
                  <div className="about-skill-chip" key={skill.name}>
                    <i className={skill.icon} aria-hidden="true"></i>
                    <span className="about-skill-chip__name">{skill.name}</span>
                    {skill.tag && <span className="about-skill-chip__tag">{skill.tag}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ZoomCard>

        {/* 4. CAMPUS ACTIVITIES — Authentic Photo & Documentation Cards */}
        <ZoomCard as="div" className="about-section-block">
          <div className="about-block-header">
            <span className="about-block-tag">
              {t({ en: 'Experience & Leadership', id: 'Pengalaman & Kepemimpinan' })}
            </span>
            <h2 className="about-block-title">
              {t({ en: 'Campus Activities', id: 'Aktivitas Kampus' })}
            </h2>
          </div>

          <div className="about-activities-grid">
            {activities.map((activity, index) => {
              const title = typeof activity.title === 'object' ? t(activity.title) : activity.title;
              const isLastOdd = index === activities.length - 1 && activities.length % 2 !== 0;

              return (
                <article
                  className={`about-activity-card${isLastOdd ? ' is-featured' : ''}`}
                  key={index}
                >
                  <div className="about-activity-card__gallery">
                    <PhotoGallery images={activity.images} />
                  </div>
                  <div className="about-activity-card__body">
                    <h3 className="about-activity-card__title">{title}</h3>
                    <p className="about-activity-card__desc">
                      {t(activity.desc)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </ZoomCard>

      </div>
    </section>
  );
}
