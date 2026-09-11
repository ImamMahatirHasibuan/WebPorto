/**
 * App.jsx
 * =======
 * Komponen utama yang mengatur SELURUH struktur aplikasi portfolio.
 * 
 * ARSITEKTUR:
 * - Menggunakan state-based routing (bukan react-router)
 * - Setiap halaman (About, Projects, Certificates, Contact) dirender berdasarkan state
 * - Transisi antar halaman menggunakan CSS fade in/out
 * 
 * KENAPA state-based routing bukan React Router?
 * - Portfolio ini single-page, tidak butuh URL routing (/about, /projects, dll)
 * - React Router menambah ~13KB bundle size untuk fitur yang tidak perlu
 * - State-based lebih simpel: ganti state → ganti tampilan → selesai
 * 
 * LAYER RENDERING (dari belakang ke depan):
 * 1. GalaxyBackground (z-index paling rendah) - langit berbintang
 * 2. Page Content (konten halaman aktif)
 * 3. Navbar (fixed di atas, z-index 1000)
 * 4. Modals (z-index 2000) - popup detail project/sertifikat
 * 5. Mouse Trail Canvas (z-index 9998) - efek partikel cursor
 */

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

/**
 * PortfolioApp — komponen inner yang berisi semua logika routing & state
 * Dipisahkan dari App() karena useMouseTrail() harus dipakai DI DALAM LanguageProvider
 */
function PortfolioApp() {
  // ========================================
  // STATE MANAGEMENT
  // ========================================

  // Halaman aktif yang sedang ditampilkan
  const [activePage, setActivePage] = useState('about');

  // Flag transisi: true saat sedang animasi fade out/in
  // KENAPA perlu flag ini?
  // - Mencegah user klik navbar berkali-kali saat transisi sedang jalan
  // - Tanpa ini, rapid clicks bisa menyebabkan state race condition
  const [transitioning, setTransitioning] = useState(false);

  // Halaman yang SAAT INI di-render (bisa berbeda dari activePage saat transisi)
  // KENAPA pisah dari activePage?
  // - activePage langsung berubah (untuk highlight navbar)
  // - displayPage berubah SETELAH fade-out selesai (agar konten lama masih terlihat saat fade)
  const [displayPage, setDisplayPage] = useState('about');

  // State untuk modal project (null = tertutup, string = ID project terbuka)
  const [activeProjectId, setActiveProjectId] = useState(null);

  // State untuk modal sertifikat (null = tertutup, object = sertifikat terbuka)
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Aktifkan efek partikel cursor
  useMouseTrail();

  /**
   * Fungsi navigasi antar halaman dengan efek transisi
   * 
   * ALUR TRANSISI:
   * 1. Set transitioning=true → CSS class 'page-exit' (opacity: 0, translateY: 20px)
   * 2. Tunggu 300ms (durasi fade-out CSS)
   * 3. Ganti displayPage → konten berubah (tapi masih opacity 0)
   * 4. Set transitioning=false → CSS class 'page-enter' (opacity: 1, translateY: 0)
   * 5. Scroll ke atas halaman
   * 
   * KENAPA setTimeout bukan CSS animationend event?
   * - animationend tidak reliable di semua browser
   * - setTimeout lebih predictable dan mudah di-debug
   * - 300ms = sesuai dengan transition duration di CSS
   */
  const navigateTo = (page) => {
    if (page === activePage || transitioning) return; // cegah double-click
    setTransitioning(true);
    // Fase 1: Fade out (300ms)
    setTimeout(() => {
      setDisplayPage(page);    // ganti konten
      setActivePage(page);     // update navbar highlight
      window.scrollTo({ top: 0 }); // scroll ke atas
      // Fase 2: Fade in (50ms delay agar browser sempat render konten baru)
      setTimeout(() => {
        setTransitioning(false);
      }, 50);
    }, 300);
  };

  /**
   * Render halaman berdasarkan displayPage state
   * 
   * KENAPA switch-case bukan object mapping?
   * - Switch lebih jelas untuk developer lain yang membaca kode
   * - Beberapa case perlu render multiple komponen (certificates + CV)
   * - Object mapping tidak bisa handle JSX Fragment (<></>) dengan bersih
   */
  const renderPage = () => {
    switch (displayPage) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        // onOpenProject: callback untuk buka modal detail project
        return <ProjectsSection onOpenProject={setActiveProjectId} />;
      case 'certificates':
        // Sertifikat dan CV digabung di satu halaman karena keduanya
        // berkaitan dengan "credential" / bukti kompetensi
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
        return <AboutSection />; // fallback ke About
    }
  };

  return (
    <>
      {/* Background galaxy — selalu terlihat di belakang semua halaman */}
      <GalaxyBackground />

      {/* Navbar — fixed di atas, menerima state halaman aktif dan fungsi navigasi */}
      <Navbar activePage={activePage} onNavigate={navigateTo} />

      {/* Konten halaman — dibungkus <main> dengan class transisi */}
      {/* page-exit: opacity 0 + translateY 20px (fade out ke bawah) */}
      {/* page-enter: opacity 1 + translateY 0 (fade in dari bawah) */}
      <main className={`page-content${transitioning ? ' page-exit' : ' page-enter'}`}>
        {renderPage()}
      </main>

      {/* Tombol scroll to top — muncul saat user scroll ke bawah */}
      <ScrollToTop />

      {/* Modal project — overlay fullscreen untuk detail project */}
      {/* Dirender di luar <main> agar tidak ikut transisi halaman */}
      <ProjectModal projectId={activeProjectId} onClose={() => setActiveProjectId(null)} />

      {/* Modal sertifikat — overlay fullscreen untuk lihat sertifikat besar */}
      <CertificateModal certificate={activeCertificate} onClose={() => setActiveCertificate(null)} />
    </>
  );
}

/**
 * App — komponen root yang membungkus semua dengan LanguageProvider
 * 
 * KENAPA LanguageProvider di sini bukan di main.jsx?
 * - Memisahkan concern: main.jsx hanya untuk React bootstrap
 * - App.jsx mengatur "apa yang dibungkus apa" (provider hierarchy)
 * - Jika nanti ada provider lain (ThemeProvider, AuthProvider), ditambah di sini
 */
export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
}
