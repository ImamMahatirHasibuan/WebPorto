import React, { useEffect } from 'react';

export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    if (!certificate) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.8)',
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: '#222',
          padding: '24px',
          borderRadius: '16px',
          textAlign: 'center',
          maxWidth: '90vw',
          maxHeight: '90vh',
          position: 'relative'
        }}
      >
        <span
          style={{ position: 'absolute', top: 16, right: 24, fontSize: '2em', color: '#fff', cursor: 'pointer' }}
          onClick={onClose}
        >
          &times;
        </span>
        <img
          src={certificate.img}
          alt="Certificate"
          style={{
            maxWidth: '80vw',
            maxHeight: '70vh',
            borderRadius: '12px',
            boxShadow: '0 4px 24px #6366f1'
          }}
        />
        <div style={{ marginTop: 16, fontSize: '1.3em', color: '#fff', fontWeight: 'bold' }}>
          {certificate.title}
        </div>
      </div>
    </div>
  );
}
