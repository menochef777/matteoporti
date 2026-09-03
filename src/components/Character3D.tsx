import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

interface Character3DProps {
  src: string;
  alt: string;
  className?: string;
}

export const Character3D: React.FC<Character3DProps> = ({
  src,
  alt,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Mouse normalized positions (-1 to 1)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring physics for natural, fluid 3D tracking
  const springConfig = { stiffness: 120, damping: 14, mass: 0.8 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Continuous extra spin for 360 degree spins on click
  const spinY = useMotionValue(0);

  // 3D Rotations and Parallax
  const tiltY = useTransform(smoothX, [-1, 1], [-24, 24]);
  const tiltX = useTransform(smoothY, [-1, 1], [14, -14]);
  const posX = useTransform(smoothX, [-1, 1], [-28, 28]);
  const posY = useTransform(smoothY, [-1, 1], [-18, 18]);

  // Combined rotation Y (tilt + full 360 spin)
  const combinedRotateY = useTransform(
    [tiltY, spinY],
    ([latestTilt, latestSpin]: number[]) => latestTilt + latestSpin
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate cursor relative to viewport center
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const normY = (e.clientY / innerHeight) * 2 - 1; // -1 to 1
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

  // Trigger 360 degree spin on click
  const handleSpinClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const current = spinY.get();
    animate(spinY, current + 360, {
      duration: 1.1,
      ease: [0.34, 1.56, 0.64, 1], // bouncy spring ease
      onComplete: () => setIsSpinning(false),
    });
  };

  return (
    <div
      ref={containerRef}
      style={{ perspective: 1200 }}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* 3D Floating + Tilting Wrapper */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotateZ: [-1, 1, -1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateX: tiltX,
          rotateY: combinedRotateY,
          x: posX,
          y: posY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onClick={handleSpinClick}
        className="cursor-pointer relative flex justify-center items-center group pointer-events-auto"
        title="Clique para um giro 360°!"
      >
        {/* Glow ambient light behind character */}
        <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent blur-2xl pointer-events-none -z-10" />

        {/* Character image with reactive 3D drop shadow */}
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-auto object-contain select-none transition-filter duration-300"
          style={{
            filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.85))",
          }}
          draggable={false}
          loading="eager"
        />

        {/* Subtle interactive hint */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 whitespace-nowrap pointer-events-none hidden sm:block"
        >
          ✦ clique para girar 360°
        </motion.span>
      </motion.div>
    </div>
  );
};
