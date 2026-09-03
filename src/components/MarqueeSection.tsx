import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from "../data/portfolioData";

export const MarqueeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Row 1 moves right as user scrolls down
  const x1 = useTransform(scrollYProgress, [0, 1], ["-18%", "4%"]);
  // Row 2 moves left as user scrolls down
  const x2 = useTransform(scrollYProgress, [0, 1], ["2%", "-20%"]);

  // We duplicate array once for a clean seamless track without DOM bloat
  const row1Images = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1];
  const row2Images = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1 — Moves Right */}
        <div className="overflow-hidden w-full flex">
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : x1,
              willChange: "transform",
            }}
            className="flex gap-3 flex-nowrap"
          >
            {row1Images.map((src, i) => (
              <div
                key={`row1-${i}`}
                className="w-[280px] sm:w-[350px] md:w-[420px] h-[180px] sm:h-[225px] md:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#161616]"
              >
                <img
                  src={src}
                  alt={`Creative 3D Project ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-2xl pointer-events-none"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 — Moves Left */}
        <div className="overflow-hidden w-full flex">
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : x2,
              willChange: "transform",
            }}
            className="flex gap-3 flex-nowrap"
          >
            {row2Images.map((src, i) => (
              <div
                key={`row2-${i}`}
                className="w-[280px] sm:w-[350px] md:w-[420px] h-[180px] sm:h-[225px] md:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#161616]"
              >
                <img
                  src={src}
                  alt={`Creative 3D Project ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-2xl pointer-events-none"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
