/**
 * IdCard.jsx
 * ==========
 * Komponen kartu ID interaktif yang mirip kartu identitas fisik dengan lanyard.
 * 
 * FITUR:
 * 1. Drag & drop dengan efek elastis (spring physics)
 * 2. SVG lanyard yang ikut bergerak saat kartu ditarik
 * 3. Plastic holder dengan lubang tali
 * 4. Panel info (ROLE, UNIVERSITY, GPA, EMAIL, LOCATION)
 * 5. Easter egg: klik 5x cepat → efek glitch
 * 
 * KENAPA desain ID Card fisik?
 * - Lebih memorable dan unik dibanding portfolio card biasa
 * - Interaksi drag memberikan kesan playful dan engaging
 * - Menunjukkan kemampuan teknis (physics simulation, SVG animation)
 */

import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useElasticDrag } from '../hooks/useElasticDrag';

// Konstanta dimensi stage (area lanyard + kartu)
const STAGE_WIDTH = 260;     // lebar area keseluruhan
const LANYARD_HEIGHT = 96;   // tinggi area lanyard (dipersingkat ~40% agar proporsional dan realistis)

export default function IdCard() {
  const { t } = useLanguage(); // helper translate EN/ID

  // Hook drag elastis — memberikan posisi, binding events, dan status drag
  // Menggunakan parameter default dari hook (stiffness: 0.12, damping: 0.85) untuk physics yg lebih berat
  const { pos, bind, dragging } = useElasticDrag();

  // ========================================
  // EASTER EGG: Glitch Effect
  // ========================================
  // Jika user klik kartu 5x dalam waktu singkat → efek glitch (getaran visual)
  const [glitch, setGlitch] = useState(false);
  const clickCount = useRef(0); // useRef bukan useState karena tidak perlu re-render

  const handleClick = () => {
    clickCount.current += 1;
    if (clickCount.current >= 5) {
      setGlitch(true);          // aktifkan CSS animation 'glitch'
      clickCount.current = 0;   // reset counter
      setTimeout(() => setGlitch(false), 900); // matikan setelah 900ms
    }
    // Auto-reset counter setelah 2 detik tidak diklik
    // KENAPA? Agar user harus klik cepat (bukan klik lambat 5x kapan saja)
    setTimeout(() => {
      if (clickCount.current > 0) clickCount.current -= 1;
    }, 2000);
  };

  // ========================================
  // DATA INFO PANEL
  // ========================================
  // Array baris informasi yang ditampilkan di panel putih bawah kartu
  const infoRows = [
    {
      icon: 'fas fa-user',
      label: t({ en: 'ROLE', id: 'PERAN' }),
      value: t({ en: 'Computer Science - Software Engineering', id: 'Ilmu Komputer - Rekayasa Perangkat Lunak' })
    },
    { icon: 'fas fa-graduation-cap', label: t({ en: 'UNIVERSITY', id: 'UNIVERSITAS' }), value: 'Binus University' },
    { icon: 'fas fa-star', label: 'GPA', value: '3.04' },
    { icon: 'fas fa-envelope', label: 'EMAIL', value: 'imamahatir@gmail.com' },
    { icon: 'fas fa-globe', label: t({ en: 'LOCATION', id: 'LOKASI' }), value: 'Indonesia' }
  ];

  // ========================================
  // GEOMETRI LANYARD (SVG Tali)
  // ========================================
  // Menghitung posisi tali berdasarkan posisi drag kartu
  // Proporsi lanyard diperpendek agar kartu tidak menggantung terlalu jauh.
  
  const cx = STAGE_WIDTH / 2;          // titik tengah horizontal (130)
  const leftAnchorX = cx - 20;         // anchor tali kiri (110)
  const rightAnchorX = cx + 20;        // anchor tali kanan (150)
  const clipX = cx + pos.x;            // posisi clip mengikuti drag X
  const clipY = LANYARD_HEIGHT + pos.y * 0.88; // posisi clip Y
  const midY = clipY * 0.42;           // titik kontrol kurva Bezier

  // Path SVG menggunakan Quadratic Bezier Curve (Q command)
  const leftPath = `M ${leftAnchorX} -12 Q ${(leftAnchorX + clipX) / 2 - 5} ${midY} ${clipX - 4} ${clipY}`;
  const rightPath = `M ${rightAnchorX} -12 Q ${(rightAnchorX + clipX) / 2 + 5} ${midY} ${clipX + 4} ${clipY}`;

  return (
    // Stage: area yang menampung lanyard + kartu
    <div className="idcard-stage" style={{ width: STAGE_WIDTH }}>

      {/* ====== SVG LANYARD (Tali) ====== */}
      <svg
        className="lanyard-svg"
        viewBox={`0 0 ${STAGE_WIDTH} ${LANYARD_HEIGHT + 24}`}
        width={STAGE_WIDTH}
        height={LANYARD_HEIGHT + 24}
        // Saat release: smooth bounce via cubic-bezier
        style={{ transition: dragging ? 'none' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: 0 }}
      >
        {/* Gradient tali woven fabric & metal loop */}
        <defs>
          {/* Base electric lavender gradient with tonal depth */}
          <linearGradient id="strapGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A78DFF" />
            <stop offset="35%" stopColor="#B8A1FF" />
            <stop offset="70%" stopColor="#C6B2FF" />
            <stop offset="100%" stopColor="#9D80F7" />
          </linearGradient>
          {/* Muted silver metal connector ring */}
          <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7F7E91" />
            <stop offset="50%" stopColor="#D5D4E2" />
            <stop offset="100%" stopColor="#A8A7B8" />
          </linearGradient>
        </defs>
        
        {/* 1. Deep violet edge shadow untuk kontras dan efek tebal kain */}
        <path d={leftPath} stroke="#5941A9" strokeWidth="15" fill="none" strokeLinecap="round" />
        <path d={rightPath} stroke="#5941A9" strokeWidth="15" fill="none" strokeLinecap="round" />
        
        {/* 2. Badan utama kain: electric lavender */}
        <path d={leftPath} stroke="url(#strapGrad)" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d={rightPath} stroke="url(#strapGrad)" strokeWidth="12" fill="none" strokeLinecap="round" />
        
        {/* 3. Soft ice blue inner highlight line (#DCE6FF) untuk karakter woven fabric */}
        <path d={leftPath} stroke="#DCE6FF" strokeWidth="2" strokeOpacity="0.8" fill="none" strokeLinecap="round" />
        <path d={rightPath} stroke="#DCE6FF" strokeWidth="2" strokeOpacity="0.8" fill="none" strokeLinecap="round" />

        {/* 4. Clip buckle: dark graphite (#272635) dengan kontras tegas */}
        <rect
          x={clipX - 11}
          y={clipY - 9}
          width="22"
          height="16"
          rx="3"
          fill="#272635"
          stroke="#171622"
          strokeWidth="1"
        />
        {/* Detail metal & grip pada buckle */}
        <line x1={clipX - 6} y1={clipY - 3} x2={clipX + 6} y2={clipY - 3} stroke="#A8A7B8" strokeWidth="1" strokeOpacity="0.8" />
        <line x1={clipX - 6} y1={clipY + 1} x2={clipX + 6} y2={clipY + 1} stroke="#3E3B50" strokeWidth="1" />

        {/* 5. Muted silver connector loop (#A8A7B8) yang menghubungkan ke kartu */}
        <rect x={clipX - 4} y={clipY + 7} width="8" height="11" rx="4" fill="url(#metalGrad)" stroke="#1a1924" strokeWidth="1" />
      </svg>

      {/* ====== KARTU ID (Plastic Holder) ====== */}
      <div
        className={`idcard-plastic${glitch ? ' glitch-effect' : ''}`}
        style={{
          // Transform: geser sesuai drag + sedikit rotasi natural. Default tilt +0.8deg.
          // Rotasi dikurangi faktornya (0.02) agar tidak terlalu ekstrem saat ditarik.
          transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.x * 0.02 + 0.8}deg)`,
          // Transition matching dengan lanyard SVG
          transition: dragging ? 'none' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: dragging ? 'grabbing' : 'grab',
          zIndex: 10
        }}
        {...bind}  // spread event handlers dari useElasticDrag (onMouseDown, onTouchStart)
        onClick={handleClick}
        onContextMenu={(e) => e.preventDefault()} // cegah right-click menu
      >
        {/* Lubang tali di atas kartu — 3 slot oval (kiri, tengah lebar, kanan) */}
        <div className="idcard-holes">
          <span></span>
          <span className="wide"></span>
          <span></span>
        </div>

        {/* Isi kartu */}
        <div className="idcard-insert">
          {/* Header: foto profil, nama, jurusan, GPA */}
          <div className="idcard-header">
            <div className="profile-image">
              <img src="asset/PPportodangithub.jpeg" alt="Profile" />
            </div>
            <h2 className="card-name">Imam Mahatir Hasibuan</h2>
            <p className="card-major">
              {t({ en: 'Computer Science - Software Engineering', id: 'Ilmu Komputer - Rekayasa Perangkat Lunak' })}
            </p>
            <p className="card-gpa">GPA: 3.04</p>
          </div>

          {/* Panel info putih — render baris info terstruktur & kompak */}
          <div className="idcard-info">
            {/* Row 1: Role */}
            <div className="idcard-info-row">
              <i className="fas fa-user" aria-hidden="true"></i>
              <div className="idcard-info-text">
                <span className="idcard-info-label">{t({ en: 'ROLE', id: 'PERAN' })}</span>
                <span className="idcard-info-value">
                  {t({ en: 'Computer Science - Software Engineering', id: 'Ilmu Komputer - Rekayasa Perangkat Lunak' })}
                </span>
              </div>
            </div>

            {/* Row 2: University */}
            <div className="idcard-info-row">
              <i className="fas fa-graduation-cap" aria-hidden="true"></i>
              <div className="idcard-info-text">
                <span className="idcard-info-label">{t({ en: 'UNIVERSITY', id: 'UNIVERSITAS' })}</span>
                <span className="idcard-info-value">Binus University</span>
              </div>
            </div>

            {/* Row 3: Dual Column (GPA & Location) */}
            <div className="idcard-info-row is-dual">
              <div className="idcard-info-col">
                <i className="fas fa-star" aria-hidden="true"></i>
                <div className="idcard-info-text">
                  <span className="idcard-info-label">GPA</span>
                  <span className="idcard-info-value">3.04</span>
                </div>
              </div>
              <div className="idcard-info-col">
                <i className="fas fa-globe" aria-hidden="true"></i>
                <div className="idcard-info-text">
                  <span className="idcard-info-label">{t({ en: 'LOCATION', id: 'LOKASI' })}</span>
                  <span className="idcard-info-value">Indonesia</span>
                </div>
              </div>
            </div>

            {/* Row 4: Email */}
            <div className="idcard-info-row">
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <div className="idcard-info-text">
                <span className="idcard-info-label">EMAIL</span>
                <span className="idcard-info-value">imamahatir@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hint text di bawah kartu */}
      <p className="swipe-hint">
        {t({ en: 'Swipe or drag the card to move.', id: 'Geser atau tarik kartu untuk menggerakkan.' })}
      </p>
    </div>
  );
}
