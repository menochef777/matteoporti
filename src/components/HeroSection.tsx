import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { ContactButton } from "./ContactButton";
import { Magnet } from "./Magnet";
import { HERO_ASSETS } from "../data/portfolioData";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#0C0C0C]">
      {/* 01: Top Navigation */}
      <Navbar />

      {/* 02: Massive Hero Title */}
      <div className="w-full overflow-hidden flex justify-center z-10 pointer-events-none mt-6 sm:mt-4 md:-mt-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full text-center"
        >
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] select-none">
            Hi, I’m Matteo
          </h1>
        </motion.div>
      </div>

      {/* 03: Central 3D Portrait */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:bottom-0 z-20 pointer-events-none w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <Magnet padding={150} strength={3} className="w-full">
          <motion.img
            src={HERO_ASSETS.portrait}
            alt="Matteo - 3D Creator"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-auto object-contain pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            loading="eager"
          />
        </Magnet>
      </div>

      {/* 04: Bottom Information Bar */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-30 relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          className="uppercase font-light tracking-wide leading-snug text-[#D7E2EA] max-w-[160px] sm:max-w-[220px] md:max-w-[260px] select-none"
        >
          a 3d creator driven by crafting striking and unforgettable projects
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactButton />
        </motion.div>
      </div>
    </section>
  );
};
