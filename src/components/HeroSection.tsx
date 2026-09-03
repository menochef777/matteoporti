import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { ContactButton } from "./ContactButton";
import { Character3D } from "./Character3D";
import { HERO_ASSETS } from "../data/portfolioData";
import { useLanguage } from "../context/useLanguage";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#0C0C0C]">
      {/* 01: Top Navigation */}
      <Navbar />

      {/* 02: Hero Title — Positioned high up and dynamically translated */}
      <div className="w-full overflow-hidden flex justify-center z-10 pointer-events-none mt-2 sm:mt-1 md:-mt-8 lg:-mt-14">
        <motion.div
          key={t.hero.greeting}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full text-center"
        >
          <h1
            style={{ fontSize: "clamp(2.4rem, 7vw, 105px)" }}
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full select-none"
          >
            {t.hero.greeting}
          </h1>
        </motion.div>
      </div>

      {/* 03: Central 3D Portrait with Mouse Tracking, Float & 360 Spin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:bottom-0 z-20 w-[340px] sm:w-[440px] md:w-[560px] lg:w-[680px] xl:w-[760px] max-w-[95vw] pointer-events-none">
        <Character3D
          src={HERO_ASSETS.portrait}
          alt="Matteo - Website Creator"
          className="w-full"
        />
      </div>

      {/* 04: Bottom Information Bar */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-30 relative pointer-events-auto">
        <motion.p
          key={t.hero.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontSize: "clamp(0.75rem, 1.1vw, 1.15rem)" }}
          className="uppercase font-light tracking-wide leading-snug text-[#D7E2EA] max-w-[180px] sm:max-w-[240px] md:max-w-[320px] select-none"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactButton />
        </motion.div>
      </div>
    </section>
  );
};
