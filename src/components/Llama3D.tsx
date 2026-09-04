import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";

interface Llama3DProps {
  src: string;
  alt?: string;
  className?: string;
}

export const Llama3D: React.FC<Llama3DProps> = ({
  src,
  alt = "Cinematic 3D Llama Render - Back View",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse normalized positions (-1 to 1) for micro-parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring physics for natural, fluid 3D tracking
  const mouseSpring = { stiffness: 75, damping: 22, mass: 1 };
  const smoothX = useSpring(rawX, mouseSpring);
  const smoothY = useSpring(rawY, mouseSpring);

  // Subtle 3D Rotations and Parallax (llama moving away from viewer)
  const tiltY = useTransform(smoothX, [-1, 1], [-10, 10]);
  const tiltX = useTransform(smoothY, [-1, 1], [6, -6]);
  const posX = useTransform(smoothX, [-1, 1], [-14, 14]);
  const posY = useTransform(smoothY, [-1, 1], [-10, 10]);

  // Section scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Precise scroll transformations specified:
  // Entrance (0 -> 0.45): scale 1.08 -> 1, blur 5px -> 0, opacity 0.5 -> 1, translateY 40px -> 0
  // Centered (0.45 -> 0.55): scale 1, blur 0, opacity 1, translateY 0
  // Exit (0.55 -> 1.0): scale 1 -> 1.06, blur 0 -> 4px, opacity 1 -> 0.45, translateY 0 -> -30px
  const rawScale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [1.08, 1, 1, 1.06]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.5, 1, 1, 0.45]);
  const rawTranslateY = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [40, 0, 0, -30]);
  const rawBlur = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [5, 0, 0, 4]);

  const scrollSpring = { stiffness: 90, damping: 20 };
  const scale = useSpring(rawScale, scrollSpring);
  const opacity = useSpring(rawOpacity, scrollSpring);
  const translateY = useSpring(rawTranslateY, scrollSpring);
  const blur = useSpring(rawBlur, scrollSpring);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

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
    <div
      ref={containerRef}
      style={{ perspective: 1400 }}
      className={`relative w-full flex items-center justify-center select-none ${className}`}
    >
      {/* Scroll-driven + Spring-smoothed Cinematic Stage */}
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          opacity: shouldReduceMotion ? 1 : opacity,
          y: shouldReduceMotion ? 0 : translateY,
          filter: shouldReduceMotion ? "none" : filter,
        }}
        className="relative w-full max-w-[620px] sm:max-w-[720px] md:max-w-[820px] lg:max-w-[920px] flex items-center justify-center"
      >
        {/* Subtle continuous floating motion + mouse parallax */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -8, 0],
                  rotateZ: [-0.4, 0.4, -0.4],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            rotateX: shouldReduceMotion ? 0 : tiltX,
            rotateY: shouldReduceMotion ? 0 : tiltY,
            x: shouldReduceMotion ? 0 : posX,
            y: shouldReduceMotion ? 0 : posY,
            transformStyle: "preserve-3d",
            willChange: "transform, filter, opacity",
          }}
          className="relative w-full flex justify-center items-center"
        >
          {/* Volumetric warm golden / dark amber glow behind the Llama */}
          <div className="absolute inset-[-10%] bg-[radial-gradient(ellipse_at_50%_45%,rgba(217,119,6,0.22)_0%,rgba(146,64,14,0.12)_35%,rgba(0,0,0,0)_75%)] blur-3xl pointer-events-none -z-10" />

          {/* Llama 3D Image with seamless radial vignette blending and drop shadow */}
          <div className="relative w-full overflow-hidden rounded-[36px] sm:rounded-[48px] md:rounded-[60px] [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)]">
            <motion.img
              src={src}
              alt={alt}
              className="w-full h-auto object-contain select-none transition-filter duration-300 scale-[1.02]"
              style={{
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.95))",
              }}
              draggable={false}
              loading="lazy"
            />
          </div>

          {/* Editorial subtle caption indicator */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#F59E0B]/50 whitespace-nowrap pointer-events-none select-none">
            <span className="w-6 h-[1px] bg-[#F59E0B]/30" />
            <span>LLAMA · 3D UNIVERSE</span>
            <span className="w-6 h-[1px] bg-[#F59E0B]/30" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
