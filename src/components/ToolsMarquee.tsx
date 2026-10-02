import React from 'react';
import { FadeIn } from './FadeIn';
import { SectionHeading } from './SectionHeading';

// Tool data with SVG icons based on official brand logos
interface ToolItem {
  name: string;
  icon: React.ReactNode;
}

// Minimal recognizable SVG icons for each tool
const PremiereSVG = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
    <rect width="32" height="32" rx="6" fill="#00005B"/>
    <text x="6" y="22" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill="#9999FF">Pr</text>
  </svg>
);

const AfterEffectsSVG = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
    <rect width="32" height="32" rx="6" fill="#00005B"/>
    <text x="5" y="22" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill="#9999FF">Ae</text>
  </svg>
);

const PhotoshopSVG = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
    <rect width="32" height="32" rx="6" fill="#001E36"/>
    <text x="6" y="22" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill="#31A8FF">Ps</text>
  </svg>
);

const CapCutSVG = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
    <rect width="32" height="32" rx="6" fill="#000000"/>
    <text x="3" y="21" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="11" fill="#FFFFFF">Cap</text>
  </svg>
);

const HiggsfieldSVG = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
    <rect width="32" height="32" rx="6" fill="#1A1A2E"/>
    <text x="8" y="22" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16" fill="#E94560">H</text>
  </svg>
);

const KlingSVG = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
    <rect width="32" height="32" rx="6" fill="#0F0F23"/>
    <text x="9" y="22" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16" fill="#7C3AED">K</text>
  </svg>
);

const ElevenLabsSVG = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
    <rect width="32" height="32" rx="6" fill="#000000"/>
    <rect x="11" y="7" width="3" height="18" rx="1" fill="#FFFFFF"/>
    <rect x="18" y="7" width="3" height="18" rx="1" fill="#FFFFFF"/>
  </svg>
);

const ChatGPTSVG = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
    <rect width="32" height="32" rx="6" fill="#10A37F"/>
    <circle cx="16" cy="14" r="5" stroke="#FFFFFF" strokeWidth="2" fill="none"/>
    <line x1="16" y1="19" x2="16" y2="25" stroke="#FFFFFF" strokeWidth="2"/>
  </svg>
);

const ClaudeSVG = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
    <rect width="32" height="32" rx="6" fill="#D97757"/>
    <circle cx="16" cy="16" r="6" fill="#FFFFFF" opacity="0.9"/>
  </svg>
);

const AIImageSVG = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
    <rect width="32" height="32" rx="6" fill="#1C1C1A"/>
    <rect x="3" y="3" width="26" height="26" rx="4" stroke="#A58B68" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="3" fill="#A58B68" opacity="0.7"/>
    <path d="M5 24l7-8 4 5 4-3 7 6" stroke="#A58B68" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const tools: ToolItem[] = [
  { name: 'Premiere Pro', icon: <PremiereSVG /> },
  { name: 'After Effects', icon: <AfterEffectsSVG /> },
  { name: 'Photoshop', icon: <PhotoshopSVG /> },
  { name: 'CapCut', icon: <CapCutSVG /> },
  { name: 'Higgsfield', icon: <HiggsfieldSVG /> },
  { name: 'Kling', icon: <KlingSVG /> },
  { name: 'ElevenLabs', icon: <ElevenLabsSVG /> },
  { name: 'ChatGPT', icon: <ChatGPTSVG /> },
  { name: 'Claude', icon: <ClaudeSVG /> },
  { name: 'AI Image Gen', icon: <AIImageSVG /> },
];

const ToolChip: React.FC<{ tool: ToolItem }> = ({ tool }) => (
  <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-[#242420] border border-[#8F887E]/15 flex-shrink-0 hover:border-[#8F887E]/30 transition-colors">
    {tool.icon}
    <span className="text-xs sm:text-sm font-inter font-medium text-[#F5F1EA] whitespace-nowrap tracking-wide">
      {tool.name}
    </span>
  </div>
);

export const ToolsMarquee: React.FC = () => {
  // Duplicate tools for seamless loop
  const duplicatedTools = [...tools, ...tools, ...tools];

  return (
    <section id="tools" className="py-20 sm:py-28 bg-[#1C1C1A] overflow-hidden border-t border-[#8F887E]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="TOOLS"
          title="TOOLS I USE"
          subtitle="Tools I use for video editing, AI creation, image generation, and creative work."
        />
      </div>

      {/* Marquee container */}
      <FadeIn delay={0.3}>
        <div className="tools-marquee-wrapper relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#1C1C1A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#1C1C1A] to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div className="tools-marquee-track flex gap-3 sm:gap-4">
            {duplicatedTools.map((tool, i) => (
              <ToolChip key={`${tool.name}-${i}`} tool={tool} />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};
