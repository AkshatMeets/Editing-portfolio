import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  yOffset?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = '',
  yOffset = 30,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: yOffset, opacity: 0 };
      case 'down':
        return { y: -yOffset, opacity: 0 };
      case 'left':
        return { x: yOffset, opacity: 0 };
      case 'right':
        return { x: -yOffset, opacity: 0 };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
