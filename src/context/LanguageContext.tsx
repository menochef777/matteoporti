import React, { useState } from "react";
import {
  type Language,
  TRANSLATIONS,
  detectUserLanguage,
} from "../data/translations";
import { LanguageContext } from "./languageContextDefinition";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => detectUserLanguage());

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("matteo_portfolio_lang", lang);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
