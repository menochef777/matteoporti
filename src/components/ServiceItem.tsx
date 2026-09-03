import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "../data/portfolioData";

interface ServiceItemProps {
  service: Service;
  index: number;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ service, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="w-full py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 flex flex-col md:flex-row md:items-baseline gap-4 sm:gap-6 md:gap-12 lg:gap-20 text-[#0C0C0C]"
    >
      {/* Number */}
      <div
        style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
        className="font-black leading-none shrink-0 select-none w-auto md:w-[180px] lg:w-[240px]"
      >
        {service.number}
      </div>

      {/* Name + Description */}
      <div className="flex flex-col gap-2 sm:gap-3 flex-1">
        <h3
          style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
          className="font-medium uppercase tracking-wide leading-tight text-[#0C0C0C]"
        >
          {service.name}
        </h3>
        <p
          style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
          className="font-light leading-relaxed text-[#0C0C0C]/60 max-w-2xl"
        >
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};
