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
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // --- MOBILE TOUCH SCRUB STATE & REFS ---
  const isSeekingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const startTouchXRef = useRef<number | null>(null);
  const startTouchYRef = useRef<number | null>(null);
  const lastTouchXRef = useRef<number | null>(null);
  const isHorizontalDragRef = useRef<boolean | null>(null);

  // --- DESKTOP MOUSE PARALLAX & SCROLL ---
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

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.6, 0.3]);

  const scrollSpring = { stiffness: 90, damping: 22 };
  const scale = useSpring(rawScale, scrollSpring);
  const opacity = useSpring(rawOpacity, scrollSpring);

  // Desktop Mouse move listener
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

  // Mobile Video Touch Scrub Setup
  useEffect(() => {
    const video = mobileVideoRef.current;
    if (!video) return;

    // Ensure video is paused at start
    video.pause();
    video.currentTime = 0;

    const handleLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
    };
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };
    video.addEventListener("seeked", handleSeeked);

    // Frame-sync loop for smooth timeline updates
    let rafId: number;
    const syncTime = () => {
      if (video && !isSeekingRef.current && video.duration) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.02) {
          isSeekingRef.current = true;
          video.currentTime = targetTimeRef.current;
        }
      }
      rafId = requestAnimationFrame(syncTime);
    };
    rafId = requestAnimationFrame(syncTime);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  // Touch Handlers for Mobile Video Scrubbing
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    startTouchXRef.current = touch.clientX;
    startTouchYRef.current = touch.clientY;
    lastTouchXRef.current = touch.clientX;
    isHorizontalDragRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const video = mobileVideoRef.current;
    if (!touch || !video || !video.duration || isNaN(video.duration)) return;

    const currentX = touch.clientX;
    const currentY = touch.clientY;

    if (startTouchXRef.current === null || startTouchYRef.current === null) {
      startTouchXRef.current = currentX;
      startTouchYRef.current = currentY;
      lastTouchXRef.current = currentX;
      return;
    }

    const diffX = currentX - startTouchXRef.current;
    const diffY = currentY - startTouchYRef.current;

    // Detect horizontal vs vertical gesture intent
    if (isHorizontalDragRef.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalDragRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    // Allow normal vertical page scrolling
    if (isHorizontalDragRef.current === false) return;

    // Scrub video on horizontal swipe
    if (lastTouchXRef.current !== null) {
      const deltaX = currentX - lastTouchXRef.current;
      // Arrastar para a direita (deltaX > 0) -> avança; Arrastar para a esquerda (deltaX < 0) -> volta
      const sensitivity = (video.duration / window.innerWidth) * 0.9;
      let nextTime = targetTimeRef.current + deltaX * sensitivity;
      nextTime = Math.max(0, Math.min(video.duration, nextTime));
      targetTimeRef.current = nextTime;
    }

    lastTouchXRef.current = currentX;
  };

  const handleTouchEnd = () => {
    startTouchXRef.current = null;
    startTouchYRef.current = null;
    lastTouchXRef.current = null;
    isHorizontalDragRef.current = null;
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[100svh] min-h-[100dvh] bg-black overflow-hidden flex flex-col justify-between select-none"
    >
      {/* ========================================================================= */}
      {/* 01: MOBILE ONLY — 9:16 INTERACTIVE TOUCH-SCRUBBED EAGLE VIDEO             */}
      {/* ========================================================================= */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="block md:hidden absolute inset-0 w-full h-full z-0 touch-pan-y"
      >
        <video
          ref={mobileVideoRef}
          src="/herovideoaguia.mp4"
          playsInline
          muted
          preload="auto"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />
      </div>

      {/* ========================================================================= */}
      {/* 02: DESKTOP ONLY — 3D FRONT CHARACTER WITH MOUSE PARALLAX & SCROLL MOTION  */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          scale,
          opacity,
          x: posX,
          y: posY,
        }}
        className="hidden md:flex absolute inset-0 w-full h-full items-center justify-center pointer-events-none z-0"
      >
        <img
          src={HERO_ASSETS.portrait}
          alt="Matteo 3D Character Front"
          className="w-full h-full object-cover select-none pointer-events-none scale-[1.03]"
          draggable={false}
          loading="eager"
        />
      </motion.div>

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

      {/* 05: Fixed/Top Navigation */}
      <div className="relative z-30 w-full">
        <Navbar />
      </div>

      {/* 06: Spacer */}
      <div className="w-full h-20 pointer-events-none relative z-20" />
    </section>
  );
};
