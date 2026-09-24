import React from 'react';
import { FadeIn } from './FadeIn';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  lightTheme?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = false,
  lightTheme = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 sm:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      {badge && (
        <FadeIn delay={0.1}>
          <span
            className={`inline-block text-[11px] sm:text-xs font-inter font-medium uppercase tracking-[0.3em] px-3.5 py-1 rounded-sm border mb-4 ${
              lightTheme
                ? 'border-[#B8AEA0]/30 text-[#8F887E] bg-[#EDE7DD]/50'
                : 'border-[#8F887E]/20 text-[#8F887E] bg-[#F5F1EA]/5'
            }`}
          >
            {badge}
          </span>
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
        <h2
          className={`font-kanit font-black uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl leading-none mb-4 ${
            lightTheme ? 'text-[#1C1C1A]' : 'hero-heading'
          }`}
        >
          {title}
        </h2>
      </FadeIn>

      {subtitle && (
        <FadeIn delay={0.3}>
          <p
            className={`text-xs sm:text-sm md:text-base font-inter max-w-2xl leading-relaxed ${
              centered ? 'mx-auto' : ''
            } ${lightTheme ? 'text-[#8F887E]' : 'text-[#8F887E]'}`}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
};
