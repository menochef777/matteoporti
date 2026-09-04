import React from "react";
import { useLanguage } from "../context/useLanguage";
import { CONTACT_INFO } from "../data/portfolioData";

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
      href={CONTACT_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      style={{
        background:
          "linear-gradient(123deg, #1C1304 7%, #D97706 37%, #B45309 72%, #F59E0B 100%)",
        boxShadow:
          "0px 4px 14px rgba(245, 158, 11, 0.35), 2px 2px 10px #D97706 inset",
        outline: "2px solid #FFFFFF",
        outlineOffset: "-3px",
      }}
      className={`inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-all duration-300 hover:brightness-115 active:scale-[0.98] cursor-pointer select-none whitespace-nowrap ${className}`}
    >
      {buttonLabel}
    </a>
  );
};
