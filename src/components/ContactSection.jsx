import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="main-title">{t({ en: 'Contact', id: 'Kontak' })}</h2>
        <div className="contact-grid">
          <a href="https://wa.me/6289513730840" className="contact-card whatsapp" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
          </a>
          <a
            href="https://www.instagram.com/imamahatir?igsh=MWVyNjlwcDhpZWRxMQ%3D%3D&utm_source=qr"
            className="contact-card instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=imamahatir@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card email"
          >
            <i className="fas fa-envelope"></i>
            <span>Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/imam-mahatir-75169a2a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            className="contact-card linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
