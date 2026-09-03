import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS } from "../data/portfolioData";
import { ProjectCard } from "./ProjectCard";
import { useLanguage } from "../context/useLanguage";

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-32"
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontSize: "clamp(2rem, 5.5vw, 80px)" }}
          className="hero-heading font-black uppercase text-center leading-none tracking-tight select-none"
        >
          {t.projects.heading}
        </motion.h2>
      </div>

      {/* Sticky Stacking Cards */}
      <div className="flex flex-col w-full">
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
