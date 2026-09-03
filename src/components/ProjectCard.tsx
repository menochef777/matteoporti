import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Project } from "../data/portfolioData";
import { LiveProjectButton } from "./LiveProjectButton";
import { useLanguage } from "../context/useLanguage";

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Calculate target scale: 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const topOffset = index * 28;
  const categoryLabel =
    project.category === "Client"
      ? t.projects.categoryClient
      : t.projects.categoryPersonal;

  return (
    <div
      ref={containerRef}
      className="h-[85vh] min-h-[640px] flex items-start justify-center w-full"
    >
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          top: `calc(5rem + ${topOffset}px)`,
          willChange: "transform",
        }}
        className="sticky w-full max-w-6xl bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden"
      >
        {/* Top Row Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[#D7E2EA]/20">
          {/* Left info: Number, Category, Name */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-[#D7E2EA] leading-none select-none">
              {project.number}
            </span>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <span className="text-[11px] sm:text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 select-none">
                {categoryLabel}
              </span>
              <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium uppercase text-[#D7E2EA] tracking-wide leading-tight">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Right Button */}
          <LiveProjectButton />
        </div>

        {/* Asymmetric Image Grid (40% / 60%) */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4 md:mt-6 w-full flex-1">
          {/* Left Column — 40% */}
          <div className="w-full md:w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-6">
            <div
              style={{ height: "clamp(130px, 16vw, 230px)" }}
              className="w-full rounded-[24px] sm:rounded-[36px] md:rounded-[46px] overflow-hidden bg-[#161616]"
            >
              <img
                src={project.images[0]}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[24px] sm:rounded-[36px] md:rounded-[46px]"
              />
            </div>
            <div
              style={{ height: "clamp(160px, 22vw, 340px)" }}
              className="w-full rounded-[24px] sm:rounded-[36px] md:rounded-[46px] overflow-hidden bg-[#161616]"
            >
              <img
                src={project.images[1]}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[24px] sm:rounded-[36px] md:rounded-[46px]"
              />
            </div>
          </div>

          {/* Right Column — 60% */}
          <div className="w-full md:w-[60%] flex flex-1 rounded-[24px] sm:rounded-[36px] md:rounded-[46px] overflow-hidden bg-[#161616] min-h-[220px] sm:min-h-[280px] md:min-h-0">
            <img
              src={project.images[2]}
              alt={`${project.name} preview 3`}
              loading="lazy"
              className="w-full h-full object-cover rounded-[24px] sm:rounded-[36px] md:rounded-[46px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
