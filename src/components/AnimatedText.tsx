import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useReducedMotion,
} from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
}

const Char: React.FC<CharProps> = ({
  children,
  range,
  progress,
  shouldReduceMotion,
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  if (shouldReduceMotion) {
    return <span>{children}</span>;
  }

  return (
    <motion.span style={{ opacity }} className="inline">
      {children}
    </motion.span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p
      ref={containerRef}
      className={`text-center font-medium leading-relaxed select-none ${className}`}
    >
      {words.map((word, wordIndex) => {
        const characters = word.split("");
        return (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {characters.map((char, charIndex) => {
              const start = charCounter / totalChars;
              const end = (charCounter + 1) / totalChars;
              charCounter++;

              return (
                <Char
                  key={`char-${wordIndex}-${charIndex}`}
                  range={[start, end]}
                  progress={scrollYProgress}
                  shouldReduceMotion={shouldReduceMotion}
                >
                  {char}
                </Char>
              );
            })}
            {wordIndex < words.length - 1 && (
              <Char
                range={[
                  charCounter / totalChars,
                  (charCounter + 1) / totalChars,
                ]}
                progress={scrollYProgress}
                shouldReduceMotion={shouldReduceMotion}
              >
                {"\u00A0"}
              </Char>
            )}
            {/* Increment for space */}
            {(() => {
              if (wordIndex < words.length - 1) charCounter++;
              return null;
            })()}
          </span>
        );
      })}
    </p>
  );
};
