import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Magnet } from './Magnet';

interface ContactButtonProps {
  href?: string;
  onClick?: () => void;
  text?: string;
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  href = '#contact',
  onClick,
  text = "GET IN TOUCH",
  variant = 'primary',
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'light':
        return 'bg-[#1C1C1A] text-[#F5F1EA] border-transparent hover:bg-[#2A2A26]';
      case 'secondary':
        return 'bg-transparent text-[#F5F1EA] border-[#8F887E]/30 hover:border-[#F5F1EA]/50 hover:bg-[#F5F1EA]/5';
      case 'primary':
      default:
        return 'bg-[#F5F1EA] text-[#1C1C1A] border-transparent hover:bg-[#FAF9F6]';
    }
  };

  const content = (
    <span
      className={`inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm text-xs sm:text-sm font-inter font-medium uppercase tracking-[0.2em] border transition-all duration-300 group cursor-pointer ${getVariantStyles()} ${className}`}
      onClick={onClick}
    >
      <span>{text}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  );

  return (
    <Magnet strength={15}>
      {href ? (
        <a href={href} className="inline-block">
          {content}
        </a>
      ) : (
        content
      )}
    </Magnet>
  );
};
