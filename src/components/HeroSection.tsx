import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Navbar } from "./Navbar";
import { HERO_ASSETS } from "../data/portfolioData";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse normalized positions (-1 to 1) for micro-parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseSpring = { stiffness: 60, damping: 20 };
  const smoothX = useSpring(rawX, mouseSpring);
  const smoothY = useSpring(rawY, mouseSpring);

  const posX = useTransform(smoothX, [-1, 1], [-14, 14]);
  const posY = useTransform(smoothY, [-1, 1], [-10, 10]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll animations: scale and opacity transitions on scroll down
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.6, 0.3]);

  const scrollSpring = { stiffness: 90, damping: 22 };
  const scale = useSpring(rawScale, scrollSpring);
  const opacity = useSpring(rawOpacity, scrollSpring);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;
      rawX.set(Math.max(-1, Math.min(1, normX)));
      rawY.set(Math.max(-1, Math.min(1, normY)));
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawX, rawY]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[100svh] min-h-[100dvh] bg-black overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 01: 3D Character Front View Stage with Mouse Parallax & Scroll Motion */}
      <motion.div
        style={{
          scale,
          opacity,
          x: posX,
          y: posY,
        }}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0"
      >
        <img
          src={HERO_ASSETS.portrait}
          alt="Matteo 3D Character Front"
          className="w-full h-full object-cover select-none pointer-events-none scale-[1.03]"
          draggable={false}
          loading="eager"
        />
      </motion.div>

      {/* 02: Dot Grid Overlay */}
      <div
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
      />

      {/* 03: Top & Bottom Seamless Dark Gradients */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent pointer-events-none z-10" />

      {/* 04: Fixed/Top Navigation */}
      <div className="relative z-30 w-full">
        <Navbar />
      </div>

      {/* 05: Spacer */}
      <div className="w-full h-20 pointer-events-none relative z-20" />
    </section>
  );
};
