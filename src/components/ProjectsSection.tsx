import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS, PROJECTS_ASSETS } from "../data/portfolioData";
import { ProjectCard } from "./ProjectCard";
import { useLanguage } from "../context/useLanguage";

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-36 overflow-hidden"
    >
      {/* 01: Background Layer with dark overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <img
          src={PROJECTS_ASSETS.characterBack}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-center opacity-30 filter blur-[1px] scale-105"
        />
        {/* Black visual overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C] via-[#0C0C0C]/85 to-[#0C0C0C]" />
      </div>

      {/* 02: Heading */}
      <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 relative z-20">
        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontSize: "clamp(2rem, 5.5vw, 80px)" }}
          className="hero-heading font-black uppercase text-center leading-none tracking-tight select-none"
        >
          {t.projects.heading}
        </motion.h2>
      </div>

      {/* 03: Sticky Stacking Cards */}
      <div className="flex flex-col w-full relative z-20">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
