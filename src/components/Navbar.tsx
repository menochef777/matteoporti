import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/useLanguage";
import type { Language } from "../data/translations";

import { CONTACT_INFO } from "../data/portfolioData";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t.nav.about, href: "#about", external: false },
    { label: t.nav.services, href: "#services", external: false },
    { label: t.nav.projects, href: "#projects", external: false },
    { label: t.nav.contact, href: CONTACT_INFO.whatsappUrl, external: true },
  ];

  const languages: Language[] = ["pt", "en", "es"];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full px-6 md:px-10 pt-6 md:pt-8 z-30 relative"
    >
      <nav className="flex justify-between items-center w-full flex-wrap gap-y-3">
        {/* Nav Links */}
        <div className="flex items-center gap-5 sm:gap-8 md:gap-12">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="uppercase font-medium tracking-wider text-[#D7E2EA] text-xs sm:text-sm md:text-[0.95rem] lg:text-[1.05rem] transition-opacity duration-200 hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Language Selector: PT | EN | ES */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium tracking-wider select-none bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
          {languages.map((lang, idx) => {
            const isActive = language === lang;
            return (
              <React.Fragment key={lang}>
                <button
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`uppercase transition-all duration-200 px-1.5 py-0.5 rounded cursor-pointer ${
                    isActive
                      ? "text-white font-bold bg-white/15 shadow-sm"
                      : "text-[#D7E2EA]/50 hover:text-[#D7E2EA]"
                  }`}
                  aria-label={`Mudar idioma para ${lang.toUpperCase()}`}
                >
                  {lang}
                </button>
                {idx < languages.length - 1 && (
                  <span className="text-white/20">|</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
};
