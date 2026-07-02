import React, { useState } from 'react';
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
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);

  useMouseTrail();

  return (
    <>
      <GalaxyBackground />
      <Navbar />

      <AboutSection />
      <ProjectsSection onOpenProject={setActiveProjectId} />
      <CertificatesSection
        onOpenCertificate={(img, title) => setActiveCertificate({ img, title })}
      />
      <CvSection />
      <ContactSection />

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
