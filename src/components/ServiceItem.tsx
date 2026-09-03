import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ServiceTranslation } from "../data/translations";

interface ServiceItemProps {
  service: ServiceTranslation;
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
      className="w-full py-6 sm:py-8 md:py-10 border-b border-[#0C0C0C]/15 flex flex-col md:flex-row md:items-baseline gap-3 sm:gap-5 md:gap-10 lg:gap-14 text-[#0C0C0C]"
    >
      {/* Number */}
      <div
        style={{ fontSize: "clamp(1.8rem, 4.5vw, 60px)" }}
        className="font-black leading-none shrink-0 select-none w-auto md:w-[100px] lg:w-[130px]"
      >
        {service.number}
      </div>

      {/* Name + Description */}
      <div className="flex flex-col gap-1.5 sm:gap-2.5 flex-1">
        <h3
          style={{ fontSize: "clamp(1rem, 1.6vw, 1.45rem)" }}
          className="font-medium uppercase tracking-wide leading-tight text-[#0C0C0C]"
        >
          {service.name}
        </h3>
        <p
          style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)" }}
          className="font-light leading-relaxed text-[#0C0C0C]/60 max-w-2xl"
        >
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};
