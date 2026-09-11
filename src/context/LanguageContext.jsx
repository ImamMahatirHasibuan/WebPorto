/**
 * LanguageContext.jsx
 * ====================
 * Context API untuk sistem multi-bahasa (English ↔ Bahasa Indonesia).
 * 
 * KENAPA pakai React Context bukan prop drilling?
 * - Bahasa dipakai di SEMUA komponen (Navbar, About, Projects, Contact, dll)
 * - Prop drilling: harus pass lang & setLang dari App → setiap level → setiap komponen
 * - Context: komponen mana saja bisa langsung akses bahasa tanpa passing props
 * 
 * KENAPA bukan pakai library i18n (react-i18next)?
 * - Portfolio ini hanya punya 2 bahasa (EN/ID)
 * - Library i18n terlalu overkill (~15KB) untuk kebutuhan sederhana
 * - Solusi custom ini cuma ~20 baris, ringan dan mudah dipahami
 * 
 * POLA YANG DIPAKAI:
 * - Provider Pattern: LanguageProvider membungkus seluruh app
 * - Custom Hook Pattern: useLanguage() menyediakan akses mudah + helper t()
 */

import React, { createContext, useContext, useState } from 'react';

// Buat Context object (wadah untuk state global bahasa)
// null = default value jika tidak ada Provider (kita akan handle via error)
const LanguageContext = createContext(null);

/**
 * Provider component — bungkus seluruh app dengan ini
 * Menyediakan state bahasa (lang) dan fungsi pengubah (setLang)
 * ke semua komponen child tanpa perlu prop drilling
 * 
 * Usage: <LanguageProvider><App /></LanguageProvider>
 */
export function LanguageProvider({ children }) {
  // State bahasa aktif: 'en' (English) atau 'id' (Indonesia)
  // Default 'en' karena portfolio ditujukan untuk audiens internasional
  const [lang, setLang] = useState('en');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook untuk mengakses bahasa dari komponen mana saja
 * 
 * Menyediakan:
 * - lang: string bahasa aktif ('en' | 'id')
 * - setLang: fungsi untuk ganti bahasa
 * - t(): helper function untuk translate teks
 * 
 * CARA PAKAI t():
 *   t({ en: 'Hello', id: 'Halo' })
 *   → Jika lang='en', return 'Hello'
 *   → Jika lang='id', return 'Halo'
 * 
 * KENAPA t() bukan objek mapping terpisah?
 * - Inline { en, id } membuat teks dekat dengan konteks penggunaannya
 * - Tidak perlu file terjemahan terpisah yang sulit di-maintain
 * - Cocok untuk project kecil-menengah (< 50 halaman)
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  // Error handling: pastikan hook ini dipakai di dalam LanguageProvider
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  // Helper function: ambil teks sesuai bahasa aktif
  const t = (obj) => (ctx.lang === 'id' ? obj.id : obj.en);
  return { ...ctx, t }; // spread ctx (lang, setLang) + tambah t
}
