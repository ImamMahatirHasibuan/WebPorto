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
const STAGE_WIDTH = 300;     // lebar area keseluruhan
const LANYARD_HEIGHT = 140;  // tinggi area lanyard (tali di atas kartu)

export default function IdCard() {
  const { t } = useLanguage(); // helper translate EN/ID

  // Hook drag elastis — memberikan posisi, binding events, dan status drag
  // maxPull: 130px = batas tarik maksimal
  // stiffness: 0.18 = kekakuan pegas (makin besar = makin cepat balik)
  // damping: 0.8 = redaman (makin besar = makin cepat berhenti memantul)
  const { pos, bind, dragging } = useElasticDrag({ maxPull: 130, stiffness: 0.18, damping: 0.8 });

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
  // KENAPA pakai array bukan hardcode?
  // - Mudah ditambah/dikurangi baris
  // - Bisa di-map untuk render → kode lebih DRY
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
  // 
  // KONSEP: Dua tali menggantung dari titik tetap (anchor) di atas,
  // bertemu di sebuah clip (penjepit) yang bergerak bersama kartu.
  // Saat kartu ditarik, tali membentuk kurva Bezier yang ikut meregang.
  
  const cx = STAGE_WIDTH / 2;          // titik tengah horizontal
  const leftAnchorX = cx - 52;         // anchor tali kiri (52px dari tengah)
  const rightAnchorX = cx + 52;        // anchor tali kanan
  const clipX = cx + pos.x;            // posisi clip mengikuti drag X
  const clipY = LANYARD_HEIGHT + pos.y * 0.85; // posisi clip Y (85% dari drag Y)
  // KENAPA 0.85 bukan 1.0?
  // - Agar tali tidak sepenuhnya lurus saat ditarik (masih ada sedikit lengkungan)
  const midY = clipY * 0.55;           // titik kontrol kurva Bezier (55% dari clipY)

  // Path SVG menggunakan Quadratic Bezier Curve (Q command)
  // Format: M startX startY Q controlX controlY endX endY
  // KENAPA Bezier bukan garis lurus?
  // - Garis lurus tidak realistis — tali asli selalu melengkung karena gravitasi
  // - Quadratic Bezier = 1 titik kontrol, cukup untuk simulasi tali sederhana
  const leftPath = `M ${leftAnchorX} 0 Q ${(leftAnchorX + clipX) / 2 - 14} ${midY} ${clipX - 7} ${clipY}`;
  const rightPath = `M ${rightAnchorX} 0 Q ${(rightAnchorX + clipX) / 2 + 14} ${midY} ${clipX + 7} ${clipY}`;

  return (
    // Stage: area yang menampung lanyard + kartu
    <div className="idcard-stage" style={{ width: STAGE_WIDTH }}>

      {/* ====== SVG LANYARD (Tali) ====== */}
      {/* KENAPA SVG bukan Canvas?
          - SVG mendukung CSS transition (untuk smooth return)
          - Path SVG bisa diubah via props React (reactive)
          - Canvas perlu manual redraw setiap frame */}
      <svg
        className="lanyard-svg"
        viewBox={`0 0 ${STAGE_WIDTH} ${LANYARD_HEIGHT + 30}`}
        width={STAGE_WIDTH}
        height={LANYARD_HEIGHT + 30}
        // Saat drag: no transition (ikut real-time)
        // Saat release: smooth bounce via cubic-bezier (overshooting curve)
        style={{ transition: dragging ? 'none' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {/* Gradient warna tali: ungu → pink */}
        <defs>
          <linearGradient id="strapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {/* Tali kiri dan kanan — menggunakan path Bezier yang dihitung di atas */}
        <path d={leftPath} stroke="url(#strapGrad)" strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d={rightPath} stroke="url(#strapGrad)" strokeWidth="13" fill="none" strokeLinecap="round" />
        {/* Clip/penjepit hitam — persegi panjang kecil tempat tali bertemu kartu */}
        <rect
          x={clipX - 15}
          y={clipY - 4}
          width="30"
          height="16"
          rx="4"
          fill="#1a1a1a"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
        {/* Bagian bawah clip yang menghubungkan ke kartu */}
        <rect x={clipX - 6} y={clipY + 8} width="12" height="10" rx="2" fill="#1a1a1a" />
      </svg>

      {/* ====== KARTU ID (Plastic Holder) ====== */}
      <div
        className={`idcard-plastic${glitch ? ' glitch-effect' : ''}`}
        style={{
          // Transform: geser sesuai drag + sedikit rotasi berdasarkan posisi X
          // KENAPA rotate pos.x * 0.035?
          // - Memberi efek "miring" saat ditarik ke samping (seperti kartu digantung)
          // - 0.035 = sedikit rotasi, tidak terlalu berlebihan
          transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.x * 0.035}deg)`,
          // Transition matching dengan lanyard SVG
          transition: dragging ? 'none' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: dragging ? 'grabbing' : 'grab'
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
              <img src="asset/PPportodangithub.jpg" alt="Profile" />
            </div>
            <h2 className="card-name">Imam Mahatir Hasibuan</h2>
            <p className="card-major">
              {t({ en: 'Computer Science - Software Engineering', id: 'Ilmu Komputer - Rekayasa Perangkat Lunak' })}
            </p>
            <p className="card-gpa">GPA: 3.04</p>
          </div>

          {/* Panel info putih — render baris info dari array */}
          <div className="idcard-info">
            {infoRows.map((row) => (
              <div className="idcard-info-row" key={row.label}>
                <i className={row.icon}></i>
                <div className="idcard-info-text">
                  <span className="idcard-info-label">{row.label}</span>
                  <span className="idcard-info-value">{row.value}</span>
                </div>
              </div>
            ))}
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
