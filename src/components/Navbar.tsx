import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/useLanguage";
import type { Language } from "../data/translations";
import { CONTACT_INFO } from "../data/portfolioData";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.about, href: "#about", external: false },
    { label: t.nav.services, href: "#services", external: false },
    { label: t.nav.projects, href: "#projects", external: false },
  ];

  const languages: Language[] = ["pt", "en", "es"];

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-4 sm:top-6 inset-x-0 z-50 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-auto"
    >
      {/* Brand Capsule Pill */}
      <a
        href="#hero"
        className="group flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#0C0C0C]/80 backdrop-blur-xl border border-white/15 shadow-xl transition-all duration-300 hover:border-white/30 hover:bg-[#141414]/90"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F43F5E] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F43F5E]" />
        </span>
        <span className="font-bold tracking-wider text-xs sm:text-sm text-white uppercase select-none">
          Matteo
        </span>
      </a>

      {/* Desktop Navigation Links Pill */}
      <nav className="hidden md:flex items-center gap-8 px-7 py-2.5 rounded-full bg-[#0C0C0C]/80 backdrop-blur-xl border border-white/15 shadow-xl">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-xs lg:text-sm uppercase tracking-wider text-[#D7E2EA]/75 hover:text-white font-medium transition-colors duration-200 select-none relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#F43F5E] group-hover:w-full transition-all duration-300" />
          </a>
        ))}
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs lg:text-sm uppercase tracking-wider text-white font-semibold px-4 py-1.5 rounded-full bg-white/10 hover:bg-[#F43F5E] transition-all duration-300 select-none"
        >
          {t.nav.contact}
        </a>
      </nav>

      {/* Right Group: Language Switcher + Mobile Menu Toggle */}
      <div className="flex items-center gap-2.5">
        {/* Language Switcher Capsule */}
        <div className="flex items-center p-1 rounded-full bg-[#0C0C0C]/80 backdrop-blur-xl border border-white/15 shadow-xl select-none">
          {languages.map((lang) => {
            const isActive = language === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`relative px-2.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-200 cursor-pointer ${
                  isActive ? "text-white" : "text-[#D7E2EA]/50 hover:text-white"
                }`}
                aria-label={`Mudar idioma para ${lang.toUpperCase()}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeLangPill"
                    className="absolute inset-0 bg-white/20 rounded-full border border-white/20 shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{lang}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden flex-col justify-center items-center w-10 h-10 rounded-full bg-[#0C0C0C]/80 backdrop-blur-xl border border-white/15 text-white gap-1 p-2 focus:outline-none"
          aria-label="Abrir menu de navegação"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="w-4 h-[1.5px] bg-white rounded-full transition-transform"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-4 h-[1.5px] bg-white rounded-full transition-opacity"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="w-4 h-[1.5px] bg-white rounded-full transition-transform"
          />
        </button>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden absolute top-14 inset-x-4 bg-[#0C0C0C]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 z-50"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base uppercase tracking-wider text-[#D7E2EA] hover:text-white font-medium py-2 border-b border-white/10 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs text-white/40">→</span>
              </a>
            ))}
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 text-center text-sm uppercase tracking-wider font-semibold py-3 rounded-full bg-[#F43F5E] text-white shadow-lg transition-transform active:scale-95"
            >
              {t.nav.contact}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
