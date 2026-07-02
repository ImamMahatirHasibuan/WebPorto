import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import IdCard from './IdCard';
import PhotoGallery from './PhotoGallery';
import ZoomCard from './ZoomCard';
import { educationList, skillsList, activities } from '../data/projects';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section">
      <div className="container">
        <IdCard />

        <ZoomCard className="description-card">
          <p className="description">
            {t({
              en: 'I am a Computer Science (Software Engineering) student at Binus University with a strong interest in technology and software development. I have studied several programming languages such as Java, Python, SQL, HTML, CSS, and the React framework, while also understanding the fundamentals of UI/UX design using Figma. Although still in the learning stage, I am highly motivated to keep growing, with a particular passion for data and web development. I enjoy working in teams, collaborating effectively, and building good connections with others.',
              id: 'Saya adalah mahasiswa Binus University jurusan Computer Science (Software Engineering) dengan minat besar pada teknologi dan pengembangan perangkat lunak. Saya memiliki pengalaman mempelajari berbagai bahasa pemrograman seperti Java, Python, SQL, HTML, CSS, serta framework React, dan juga memahami dasar-dasar perancangan UI/UX menggunakan Figma. Meskipun masih dalam tahap pembelajaran, saya memiliki semangat tinggi untuk terus berkembang, dengan ketertarikan khusus pada bidang data dan web development. Saya juga senang bekerja dalam tim, berkolaborasi, dan mudah bergaul dengan lingkungan baru.'
            })}
          </p>
        </ZoomCard>

        {/* Education */}
        <div className="section-content">
          <h3 className="section-title">{t({ en: 'Education', id: 'Pendidikan' })}</h3>
          <div className="education-grid">
            {educationList.map((edu) => (
              <ZoomCard as="div" className="education-card" key={edu.name}>
                <h4>{edu.name}</h4>
                <p>{edu.years}</p>
              </ZoomCard>
            ))}
          </div>
        </div>

        {/* Programming Languages */}
        <div className="section-content">
          <h3 className="section-title">{t({ en: 'Programming Languages', id: 'Bahasa Pemrograman' })}</h3>
          <div className="skills-grid">
            {skillsList.map((skill) => (
              <ZoomCard as="div" className="skill-card" key={skill.name}>
                <i className={skill.icon}></i>
                <span>{skill.name}</span>
              </ZoomCard>
            ))}
          </div>
        </div>

        {/* Campus Activities */}
        <div className="section-content">
          <h3 className="section-title">{t({ en: 'Campus Activities', id: 'Aktivitas Kampus' })}</h3>
          <div className="activities-grid">
            {activities.map((activity) => (
              <ZoomCard as="div" className="activity-card" key={activity.title}>
                <h4>{activity.title}</h4>
                <PhotoGallery images={activity.images} />
                <div className="activity-desc">{t(activity.desc)}</div>
              </ZoomCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
