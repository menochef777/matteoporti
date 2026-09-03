import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SERVICES } from "../data/portfolioData";
import { ServiceItem } from "./ServiceItem";

export const ServicesSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-0"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          className="font-black uppercase text-center text-[#0C0C0C] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28 select-none"
        >
          Services
        </motion.h2>

        {/* Service List */}
        <div className="flex flex-col border-t border-[#0C0C0C]/15 w-full">
          {SERVICES.map((service, index) => (
            <ServiceItem
              key={service.number}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
