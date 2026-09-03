import React from "react";
import { useLanguage } from "../context/useLanguage";

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className = "",
  onClick,
  label,
}) => {
  const { t } = useLanguage();
  const buttonLabel = label || t.hero.contactBtn;

  return (
    <a
      href="#contact"
      onClick={onClick}
      style={{
        background:
          "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow:
          "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
        outline: "2px solid #FFFFFF",
        outlineOffset: "-3px",
      }}
      className={`inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-all duration-300 hover:brightness-115 active:scale-[0.98] cursor-pointer select-none whitespace-nowrap ${className}`}
    >
      {buttonLabel}
    </a>
  );
};
