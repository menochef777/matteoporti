import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
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
  const springConfig = { stiffness: 90, damping: 18, mass: 0.9 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Continuous extra spin for 360 degree spins on click
  const spinY = useMotionValue(0);

  // Subtle 3D Rotations and Parallax
  const tiltY = useTransform(smoothX, [-1, 1], [-14, 14]);
  const tiltX = useTransform(smoothY, [-1, 1], [8, -8]);
  const posX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const posY = useTransform(smoothY, [-1, 1], [-12, 12]);

  // Combined rotation Y (tilt + full 360 spin)
  const combinedRotateY = useTransform(
    [tiltY, spinY],
    ([latestTilt, latestSpin]: number[]) => latestTilt + latestSpin
  );

  // Scroll reactions: scale slightly upward, move subtly upward, fade gradually
  const { scrollY } = useScroll();
  const scrollScale = useTransform(scrollY, [0, 500], [1, 1.08]);
  const scrollYOffset = useTransform(scrollY, [0, 500], [0, -50]);
  const scrollOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
      duration: 1.2,
      ease: [0.34, 1.3, 0.64, 1],
      onComplete: () => setIsSpinning(false),
    });
  };

  return (
    <motion.div
      ref={containerRef}
      style={{
        perspective: 1200,
        scale: scrollScale,
        y: scrollYOffset,
        opacity: scrollOpacity,
      }}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* 3D Floating + Tilting Wrapper */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotateZ: [-0.6, 0.6, -0.6],
        }}
        transition={{
          duration: 5,
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
        {/* Neon magenta / purple atmosphere glow behind the character */}
        <div className="absolute inset-[-15%] bg-[radial-gradient(circle_at_50%_40%,rgba(244,63,94,0.3)_0%,rgba(168,85,247,0.18)_35%,rgba(0,0,0,0)_70%)] blur-3xl pointer-events-none -z-10" />

        {/* 3D Character visual with cinematic edge blending and drop shadow */}
        <div className="relative w-full overflow-hidden rounded-[42px] sm:rounded-[56px] [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)]">
          <motion.img
            src={src}
            alt={alt}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-auto object-contain select-none transition-filter duration-300 scale-[1.02]"
            style={{
              filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.95))",
            }}
            draggable={false}
            loading="eager"
          />
        </div>

        {/* Subtle interactive hint */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 2.5 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-[#F43F5E]/70 whitespace-nowrap pointer-events-none hidden sm:block"
        >
          ✦ clique para girar 360°
        </motion.span>
      </motion.div>
    </motion.div>
  );
};
