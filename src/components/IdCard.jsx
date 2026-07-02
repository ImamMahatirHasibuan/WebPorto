import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useElasticDrag } from '../hooks/useElasticDrag';

const STAGE_WIDTH = 300;
const LANYARD_HEIGHT = 140;

export default function IdCard() {
  const { t } = useLanguage();
  const { pos, bind, dragging } = useElasticDrag({ maxPull: 130, stiffness: 0.18, damping: 0.8 });
  const [glitch, setGlitch] = useState(false);
  const clickCount = useRef(0);

  const handleClick = () => {
    clickCount.current += 1;
    if (clickCount.current >= 5) {
      setGlitch(true);
      clickCount.current = 0;
      setTimeout(() => setGlitch(false), 900);
    }
    setTimeout(() => {
      if (clickCount.current > 0) clickCount.current -= 1;
    }, 2000);
  };

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

  // Lanyard geometry: two straps hang from fixed top anchors and converge
  // on a clip that moves together with the card (same pos.x / pos.y),
  // so pulling the card visually stretches and bends the straps.
  const cx = STAGE_WIDTH / 2;
  const leftAnchorX = cx - 52;
  const rightAnchorX = cx + 52;
  const clipX = cx + pos.x;
  const clipY = LANYARD_HEIGHT + pos.y * 0.85;
  const midY = clipY * 0.55;

  const leftPath = `M ${leftAnchorX} 0 Q ${(leftAnchorX + clipX) / 2 - 14} ${midY} ${clipX - 7} ${clipY}`;
  const rightPath = `M ${rightAnchorX} 0 Q ${(rightAnchorX + clipX) / 2 + 14} ${midY} ${clipX + 7} ${clipY}`;

  return (
    <div className="idcard-stage" style={{ width: STAGE_WIDTH }}>
      <svg
        className="lanyard-svg"
        viewBox={`0 0 ${STAGE_WIDTH} ${LANYARD_HEIGHT + 30}`}
        width={STAGE_WIDTH}
        height={LANYARD_HEIGHT + 30}
        style={{ transition: dragging ? 'none' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        <defs>
          <linearGradient id="strapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <path d={leftPath} stroke="url(#strapGrad)" strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d={rightPath} stroke="url(#strapGrad)" strokeWidth="13" fill="none" strokeLinecap="round" />
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
        <rect x={clipX - 6} y={clipY + 8} width="12" height="10" rx="2" fill="#1a1a1a" />
      </svg>

      <div
        className={`idcard-plastic${glitch ? ' glitch-effect' : ''}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.x * 0.035}deg)`,
          transition: dragging ? 'none' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: dragging ? 'grabbing' : 'grab'
        }}
        {...bind}
        onClick={handleClick}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="idcard-holes">
          <span></span>
          <span className="wide"></span>
          <span></span>
        </div>

        <div className="idcard-insert">
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

      <p className="swipe-hint">
        {t({ en: 'Swipe or drag the card to move.', id: 'Geser atau tarik kartu untuk menggerakkan.' })}
      </p>
    </div>
  );
}
