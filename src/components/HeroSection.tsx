import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { Navbar } from "./Navbar";
import { HERO_ASSETS } from "../data/portfolioData";
import { useLanguage } from "../context/useLanguage";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Responsive device check
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // --- 3D INTERACTIVE HEAD / NECK TRACKING ENGINE ---
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Responsive organic spring physics with snappy response
  const springConfig = { stiffness: 120, damping: 22, mass: 0.6 };
  const smoothNormX = useSpring(normX, springConfig);
  const smoothNormY = useSpring(normY, springConfig);

  // Natural head/neck rotational transforms (anchored at body base)
  const headRotateY = useTransform(smoothNormX, [-1, 1], [-20, 20]);
  const headRotateX = useTransform(smoothNormY, [-1, 1], [9, -9]);
  const headRotateZ = useTransform(smoothNormX, [-1, 1], [-3, 3]);
  const headShiftX = useTransform(smoothNormX, [-1, 1], [-16, 16]);
  const headShiftY = useTransform(smoothNormY, [-1, 1], [-9, 9]);

  // Scroll reactions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.6, 0.3]);
  const smoothScale = useSpring(scrollScale, { stiffness: 100, damping: 25 });
  const smoothOpacity = useSpring(scrollOpacity, { stiffness: 100, damping: 25 });

  // Desktop Mouse Movement
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      normX.set(Math.max(-1, Math.min(1, x * 1.15)));
      normY.set(Math.max(-1, Math.min(1, y * 1.15)));
      if (!hasInteracted) setHasInteracted(true);
    };

    const handleMouseLeave = () => {
      normX.set(0);
      normY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile, normX, normY, hasInteracted]);

  // Mobile Touch Gesture Handling (horizontal drag turns head, vertical scrolls page)
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const isHorizontalDragRef = useRef<boolean | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    startXRef.current = touch.clientX;
    startYRef.current = touch.clientY;
    isHorizontalDragRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;

    const currentX = touch.clientX;
    const currentY = touch.clientY;

    if (startXRef.current === null || startYRef.current === null) {
      startXRef.current = currentX;
      startYRef.current = currentY;
      return;
    }

    const diffX = currentX - startXRef.current;
    const diffY = currentY - startYRef.current;

    // Detect gesture direction intent early
    if (isHorizontalDragRef.current === null) {
      if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
        isHorizontalDragRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    // If vertical scroll intent, allow normal page scroll
    if (isHorizontalDragRef.current === false) return;

    // Map horizontal swipe across screen width to normalized [-1, 1]
    const sensitivity = 0.35; // Responsive sweep
    const targetNormX = Math.max(-1, Math.min(1, diffX / (window.innerWidth * sensitivity)));
    normX.set(targetNormX);

    // Minor vertical gaze response
    const verticalRatio = diffY / (window.innerHeight * 0.35);
    normY.set(Math.max(-0.6, Math.min(0.6, verticalRatio)));

    if (!hasInteracted) setHasInteracted(true);
  };

  const handleTouchEnd = () => {
    normX.set(0);
    normY.set(0);
    startXRef.current = null;
    startYRef.current = null;
    isHorizontalDragRef.current = null;
  };

  const currentPortrait = isMobile
    ? HERO_ASSETS.mobilePortrait
    : HERO_ASSETS.portrait;

  return (
    <section
      id="hero"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ perspective: 1200 }}
      className="relative w-full h-screen min-h-[100svh] min-h-[100dvh] bg-black overflow-hidden flex flex-col justify-between select-none touch-pan-y"
    >
      {/* 01: 3D Eagle Head/Neck Interactive Stage */}
      <motion.div
        style={{
          scale: smoothScale,
          opacity: smoothOpacity,
          rotateY: headRotateY,
          rotateX: headRotateX,
          rotateZ: headRotateZ,
          x: headShiftX,
          y: headShiftY,
          transformOrigin: isMobile ? "50% 88%" : "50% 84%",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0"
      >
        <img
          src={currentPortrait}
          alt="Matteo 3D Eagle"
          className="w-full h-full object-cover object-center select-none pointer-events-none scale-[1.04]"
          draggable={false}
          loading="eager"
        />
      </motion.div>

      {/* 02: Neon Magenta / Purple Ambient Glow behind the Visor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.18)_0%,rgba(168,85,247,0.08)_40%,transparent_70%)] blur-3xl pointer-events-none z-0" />

      {/* 03: Dot Grid Overlay */}
      <div
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
      />

      {/* 04: Top & Bottom Seamless Dark Gradients */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent pointer-events-none z-10" />

      {/* 05: Top Navigation */}
      <div className="relative z-30 w-full">
        <Navbar />
      </div>

      {/* 06: Interactive Visual Cue / Floating Badge */}
      <div className="relative z-20 w-full pb-8 sm:pb-12 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0C0C0C]/75 backdrop-blur-xl border border-white/20 shadow-2xl text-white/90 text-[11px] sm:text-xs font-medium uppercase tracking-widest select-none"
        >
          <motion.div
            animate={{ x: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex items-center text-[#F43F5E]"
          >
            <span className="text-sm">‹</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] mx-1 shadow-[0_0_8px_#F43F5E]" />
            <span className="text-sm">›</span>
          </motion.div>
          <span className="text-[#D7E2EA]/90">
            {isMobile ? t.hero.dragHintMobile : t.hero.dragHintDesktop}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
