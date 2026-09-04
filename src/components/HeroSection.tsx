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

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Smooth organic spring physics
  const springConfig = { stiffness: 85, damping: 18, mass: 0.8 };
  const smoothNormX = useSpring(normX, springConfig);
  const smoothNormY = useSpring(normY, springConfig);

  // Natural head/neck rotational transforms (anchored at body base)
  const headRotateY = useTransform(smoothNormX, [-1, 1], [-14, 14]);
  const headRotateX = useTransform(smoothNormY, [-1, 1], [7, -7]);
  const headRotateZ = useTransform(smoothNormX, [-1, 1], [-2, 2]);
  const headShiftX = useTransform(smoothNormX, [-1, 1], [-12, 12]);
  const headShiftY = useTransform(smoothNormY, [-1, 1], [-8, 8]);

  // Scroll reactions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.6, 0.3]);
  const smoothScale = useSpring(scrollScale, { stiffness: 90, damping: 22 });
  const smoothOpacity = useSpring(scrollOpacity, { stiffness: 90, damping: 22 });

  // Desktop Mouse Movement
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      normX.set(Math.max(-1, Math.min(1, x)));
      normY.set(Math.max(-1, Math.min(1, y)));
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
  }, [isMobile, normX, normY]);

  // Mobile Touch Gesture Handling (horizontal drag turns head, vertical scrolls page)
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const currentDragValRef = useRef<number>(0);
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

    // Detect gesture direction intent
    if (isHorizontalDragRef.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalDragRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    // If vertical scroll intent, allow normal page scroll
    if (isHorizontalDragRef.current === false) return;

    // Map horizontal swipe across screen width to normalized [-1, 1]
    const dragRatio = diffX / (window.innerWidth * 0.45);
    const targetNormX = Math.max(-1, Math.min(1, currentDragValRef.current + dragRatio));
    normX.set(targetNormX);

    // Minor vertical gaze response
    const verticalRatio = diffY / (window.innerHeight * 0.4);
    normY.set(Math.max(-0.5, Math.min(0.5, verticalRatio)));
  };

  const handleTouchEnd = () => {
    normX.set(0);
    normY.set(0);
    currentDragValRef.current = 0;
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
          transformOrigin: isMobile ? "50% 88%" : "50% 82%",
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
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent pointer-events-none z-10" />

      {/* 05: Top Navigation */}
      <div className="relative z-30 w-full">
        <Navbar />
      </div>

      {/* 06: Bottom Spacer */}
      <div className="w-full h-20 pointer-events-none relative z-20" />
    </section>
  );
};

export default HeroSection;
