import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { useMouseTrail } from './hooks/useMouseTrail';
import GalaxyBackground from './components/GalaxyBackground';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import CertificatesSection from './components/CertificatesSection';
import CertificateModal from './components/CertificateModal';
import CvSection from './components/CvSection';
import ContactSection from './components/ContactSection';
import ScrollToTop from './components/ScrollToTop';

function PortfolioApp() {
  const [activePage, setActivePage] = useState('about');
  const [transitioning, setTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState('about');
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);

  useMouseTrail();

  const navigateTo = (page) => {
    if (page === activePage || transitioning) return;
    setTransitioning(true);
    // Fade out
    setTimeout(() => {
      setDisplayPage(page);
      setActivePage(page);
      window.scrollTo({ top: 0 });
      // Fade in
      setTimeout(() => {
        setTransitioning(false);
      }, 50);
    }, 300);
  };

  const renderPage = () => {
    switch (displayPage) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection onOpenProject={setActiveProjectId} />;
      case 'certificates':
        return (
          <>
            <CertificatesSection
              onOpenCertificate={(img, title) => setActiveCertificate({ img, title })}
            />
            <CvSection />
          </>
        );
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <>
      <GalaxyBackground />
      <Navbar activePage={activePage} onNavigate={navigateTo} />

      <main className={`page-content${transitioning ? ' page-exit' : ' page-enter'}`}>
        {renderPage()}
      </main>

      <ScrollToTop />

      <ProjectModal projectId={activeProjectId} onClose={() => setActiveProjectId(null)} />
      <CertificateModal certificate={activeCertificate} onClose={() => setActiveCertificate(null)} />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
}
