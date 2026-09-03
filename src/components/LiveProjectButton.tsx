import React from "react";
import { useLanguage } from "../context/useLanguage";

interface LiveProjectButtonProps {
  className?: string;
  onClick?: () => void;
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  className = "",
  onClick,
  label,
}) => {
  const { t } = useLanguage();
  const buttonLabel = label || t.projects.liveBtn;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 text-xs sm:text-sm md:text-base transition-colors duration-200 hover:bg-[#D7E2EA]/10 active:scale-[0.98] select-none whitespace-nowrap cursor-pointer ${className}`}
    >
      {buttonLabel}
    </button>
  );
};
