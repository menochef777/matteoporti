import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { PROJECTS_ASSETS } from "../data/portfolioData";

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse normalized positions (-1 to 1) for micro-parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseSpring = { stiffness: 60, damping: 20 };
  const smoothX = useSpring(rawX, mouseSpring);
  const smoothY = useSpring(rawY, mouseSpring);

  const posX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const posY = useTransform(smoothY, [-1, 1], [-8, 8]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll animations: scale and opacity transitions
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [1.08, 1, 1, 1.06]
  );
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.4, 1, 1, 0.35]
  );

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
      id="projects"
      ref={containerRef}
      className="relative w-full min-h-[100svh] min-h-[100dvh] bg-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* 01: 3D Character Back View Visual Stage */}
      <motion.div
        style={{
          scale,
          opacity,
          x: posX,
          y: posY,
        }}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
      >
        <img
          src={PROJECTS_ASSETS.characterBack}
          alt="Matteo 3D Character Back"
          className="w-full h-full object-cover select-none pointer-events-none scale-[1.03]"
          draggable={false}
        />
      </motion.div>

      {/* 02: Top & Bottom Seamless Dark Gradients */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent pointer-events-none z-10" />

      {/* 03: Dot Grid Overlay */}
      <div
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
      />
    </section>
  );
};
