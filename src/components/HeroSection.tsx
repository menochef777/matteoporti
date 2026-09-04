import React, { useRef, useEffect } from "react";
import { Navbar } from "./Navbar";

import { Character3D } from "./Character3D";
import { HERO_ASSETS } from "../data/portfolioData";

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isSeekingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const lastMouseXRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video starts paused at time 0
    video.pause();
    video.currentTime = 0;

    const handleLoadedMetadata = () => {
      video.pause();
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

    const handleMouseMove = (e: MouseEvent) => {
      if (lastMouseXRef.current === null) {
        lastMouseXRef.current = e.clientX;
        return;
      }
      const deltaX = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;

      if (!video.duration || isNaN(video.duration)) return;

      // scrub speed sensitivity factor 0.8 based on viewport width
      const scrubSpeed = (video.duration / window.innerWidth) * 0.8;
      let nextTime = targetTimeRef.current + deltaX * scrubSpeed;
      nextTime = Math.max(0, Math.min(video.duration, nextTime));
      targetTimeRef.current = nextTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = nextTime;
      }
    };

    const handleMouseLeave = () => {
      lastMouseXRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[100svh] min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* 01: Mouse-Scrubbed Full Viewport Video Background */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4"
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* 02: Dot Grid Overlay */}
      <div
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-10"
      />

      {/* 03: Soft Dark Edge Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none z-10" />

      {/* 04: Fixed/Top Navigation */}
      <div className="relative z-30 w-full">
        <Navbar />
      </div>

      {/* 05: Central 3D Front Character with Mouse Parallax & 360 Spin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:bottom-2 z-20 w-[340px] sm:w-[440px] md:w-[540px] lg:w-[640px] xl:w-[720px] max-w-[95vw] pointer-events-none">
        <Character3D
          src={HERO_ASSETS.portrait}
          alt="Matteo 3D Character Front"
          className="w-full"
        />
      </div>

      {/* 06: Spacer to maintain full-screen feel */}
      <div className="w-full h-20 pointer-events-none relative z-20" />
    </section>
  );
};
