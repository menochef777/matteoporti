import React from "react";
import { motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full px-6 md:px-10 pt-6 md:pt-8 z-30 relative"
    >
      <nav className="flex justify-between items-center w-full">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="uppercase font-medium tracking-wide text-[#D7E2EA] text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
};
