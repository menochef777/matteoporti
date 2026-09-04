import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/useLanguage";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

export const ServicesSection: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Subtle accent gradients for each card in the stack
  const cardAccents = [
    "from-pink-500/10 via-purple-500/5 to-transparent",
    "from-purple-500/10 via-indigo-500/5 to-transparent",
    "from-indigo-500/10 via-blue-500/5 to-transparent",
    "from-cyan-500/10 via-teal-500/5 to-transparent",
    "from-amber-500/10 via-rose-500/5 to-transparent",
  ];

  return (
    <section
      id="services"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-32 z-10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading */}
        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontSize: "clamp(2rem, 5.5vw, 80px)" }}
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-12 sm:mb-16 md:mb-20 select-none"
        >
          {t.services.heading}
        </motion.h2>

        {/* React Bits ScrollStack Integration */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={60}
          itemScale={0.035}
          itemStackDistance={24}
          stackPosition="22%"
          scaleEndPosition="10%"
          baseScale={0.88}
        >
          {t.services.items.map((service, index) => (
            <ScrollStackItem
              key={service.number}
              itemClassName="bg-[#121212] border border-white/15 hover:border-white/30 transition-colors duration-300 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle background ambient gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  cardAccents[index % cardAccents.length]
                } pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 sm:gap-8 h-full">
                {/* Left: Big Number */}
                <div
                  style={{ fontSize: "clamp(2.5rem, 6vw, 80px)" }}
                  className="font-black leading-none shrink-0 select-none text-white/30"
                >
                  {service.number}
                </div>

                {/* Center / Right: Name + Description */}
                <div className="flex flex-col gap-3 sm:gap-4 flex-1 max-w-2xl">
                  <h3
                    style={{ fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)" }}
                    className="font-medium uppercase tracking-wide leading-tight text-white"
                  >
                    {service.name}
                  </h3>
                  <p
                    style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.15rem)" }}
                    className="font-light leading-relaxed text-[#D7E2EA]/70"
                  >
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Bottom decorative bar */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-widest text-[#D7E2EA]/40">
                <span>MATTEO · 3D & WEB CREATOR</span>
                <span>0{index + 1} / 05</span>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default ServicesSection;
