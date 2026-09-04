import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { ContactButton } from "./ContactButton";
import { useLanguage } from "../context/useLanguage";

const DESKTOP_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4";
const MOBILE_VIDEO_URL = "/herovideoaguia.mp4";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile device breakpoint on mount (avoids loading both videos simultaneously)
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

  // --- SCRUBBING ENGINE (DESKTOP MOUSE & MOBILE TOUCH) ---
  const isSeekingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const lastXRef = useRef<number | null>(null);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const isHorizontalDragRef = useRef<boolean | null>(null);

  // Setup video initialization & seek synchronization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const handleReady = () => {
      video.pause();
    };

    video.addEventListener("loadedmetadata", handleReady);
    video.addEventListener("loadeddata", handleReady);

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };
    video.addEventListener("seeked", handleSeeked);

    // Smooth animation frame loop
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
      video.removeEventListener("loadedmetadata", handleReady);
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [isMobile]);

  // Desktop Mouse Scrubbing
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      if (lastXRef.current === null) {
        lastXRef.current = e.clientX;
        return;
      }

      const deltaX = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;

      const sensitivity = (video.duration / window.innerWidth) * 0.8;
      let nextTime = targetTimeRef.current + deltaX * sensitivity;
      nextTime = Math.max(0, Math.min(video.duration, nextTime));
      targetTimeRef.current = nextTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = nextTime;
      }
    };

    const handleMouseLeave = () => {
      lastXRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  // Mobile Touch Scrubbing Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    startXRef.current = touch.clientX;
    startYRef.current = touch.clientY;
    lastXRef.current = touch.clientX;
    isHorizontalDragRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const video = videoRef.current;
    if (!touch || !video || !video.duration || isNaN(video.duration)) return;

    const currentX = touch.clientX;
    const currentY = touch.clientY;

    if (startXRef.current === null || startYRef.current === null) {
      startXRef.current = currentX;
      startYRef.current = currentY;
      lastXRef.current = currentX;
      return;
    }

    const diffX = currentX - startXRef.current;
    const diffY = currentY - startYRef.current;

    // Detect horizontal vs vertical intent
    if (isHorizontalDragRef.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalDragRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    // Preserve normal vertical page scrolling
    if (isHorizontalDragRef.current === false) return;

    if (lastXRef.current !== null) {
      const deltaX = currentX - lastXRef.current;
      const sensitivity = (video.duration / window.innerWidth) * 0.9;
      let nextTime = targetTimeRef.current + deltaX * sensitivity;
      nextTime = Math.max(0, Math.min(video.duration, nextTime));
      targetTimeRef.current = nextTime;
    }

    lastXRef.current = currentX;
  };

  const handleTouchEnd = () => {
    startXRef.current = null;
    startYRef.current = null;
    lastXRef.current = null;
    isHorizontalDragRef.current = null;
  };

  const currentVideoSrc = isMobile ? MOBILE_VIDEO_URL : DESKTOP_VIDEO_URL;

  return (
    <section
      id="hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative w-full min-h-[100svh] min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-black select-none touch-pan-y"
    >
      {/* 01: Interactive Eagle Video Background (Only requested asset loaded) */}
      <video
        ref={videoRef}
        key={currentVideoSrc}
        src={currentVideoSrc}
        playsInline
        muted
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
      />

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

      {/* 04: Top Navigation */}
      <div className="relative z-30 w-full">
        <Navbar />
      </div>

      {/* 05: Hero Title — Positioned high up and dynamically translated */}
      <div className="w-full overflow-hidden flex justify-center z-20 pointer-events-none mt-2 sm:mt-1 md:-mt-8 lg:-mt-14">
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

      {/* 06: Bottom Information Bar with Subtitle and Contact Button */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-30 relative pointer-events-auto">
        <motion.p
          key={t.hero.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ fontSize: "clamp(0.75rem, 1.1vw, 1.15rem)" }}
          className="uppercase font-light tracking-wide leading-snug text-[#D7E2EA] max-w-[180px] sm:max-w-[240px] md:max-w-[320px] select-none"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <ContactButton />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
