import { createContext } from "react";
import type { Language, ContentTranslation } from "../data/translations";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ContentTranslation;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
