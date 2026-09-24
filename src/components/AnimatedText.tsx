import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const AnimatedChar: React.FC<CharProps> = ({ char, range, progress }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block transition-colors">
      {char}
    </motion.span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p ref={containerRef} className={`leading-relaxed select-none ${className}`}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
            {wordChars.map((char, charIndex) => {
              const start = charCounter / totalChars;
              const end = (charCounter + 1) / totalChars;
              charCounter++;
              return (
                <AnimatedChar
                  key={charIndex}
                  char={char}
                  range={[start, end]}
                  progress={scrollYProgress}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};
