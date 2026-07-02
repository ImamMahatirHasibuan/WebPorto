import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Small helper hook: t({en: '...', id: '...'}) -> current language string
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  const t = (obj) => (ctx.lang === 'id' ? obj.id : obj.en);
  return { ...ctx, t };
}
