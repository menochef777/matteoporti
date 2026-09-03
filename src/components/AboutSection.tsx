import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_DECORATIVE } from "../data/portfolioData";
import { AnimatedText } from "./AnimatedText";
import { ContactButton } from "./ContactButton";

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const ease = [0.25, 0.1, 0.25, 1];

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-[#0C0C0C] flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* 01: Top Left — Moon */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -80, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.9, delay: 0.1, ease }}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none z-10 select-none"
      >
        <img
          src={ABOUT_DECORATIVE.moon}
          alt=""
          loading="lazy"
          className="w-full h-auto object-contain opacity-90"
        />
      </motion.div>

      {/* 02: Bottom Left — 3D Object */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.9, delay: 0.25, ease }}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none z-10 select-none"
      >
        <img
          src={ABOUT_DECORATIVE.object3d}
          alt=""
          loading="lazy"
          className="w-full h-auto object-contain opacity-90"
        />
      </motion.div>

      {/* 03: Top Right — Lego */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.9, delay: 0.15, ease }}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none z-10 select-none"
      >
        <img
          src={ABOUT_DECORATIVE.lego}
          alt=""
          loading="lazy"
          className="w-full h-auto object-contain opacity-90"
        />
      </motion.div>

      {/* 04: Bottom Right — 3D Group */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.9, delay: 0.3, ease }}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none z-10 select-none"
      >
        <img
          src={ABOUT_DECORATIVE.group3d}
          alt=""
          loading="lazy"
          className="w-full h-auto object-contain opacity-90"
        />
      </motion.div>

      {/* Center Content Container */}
      <div className="flex flex-col items-center justify-center max-w-2xl w-full z-20 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, delay: 0, ease }}
          className="w-full"
        >
          <h2
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            className="hero-heading font-black uppercase text-center leading-none tracking-tight select-none"
          >
            About me
          </h2>
        </motion.div>

        {/* Spacing: Heading -> paragraph (gap-10 sm:gap-14 md:gap-16) */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Animated Paragraph */}
        <div className="max-w-[560px] px-4">
          <AnimatedText
            text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
            className="text-[#D7E2EA]"
          />
        </div>

        {/* Spacing: Paragraph -> Contact button (gap-16 sm:gap-20 md:gap-24) */}
        <div className="h-16 sm:h-20 md:h-24" />

        {/* Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <ContactButton />
        </motion.div>
      </div>
    </section>
  );
};
