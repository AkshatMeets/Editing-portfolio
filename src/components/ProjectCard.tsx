import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  role: string;
  video: string;
  aspectRatio: '9/16' | '16/9';
  videoRatio?: string;
  projectOverview?: {
    reference: string;
    process: string;
    final: string;
  };
  objective: string;
  creativeConcept?: string;
  challenge: string;
  reference: string;
  aiOutput: string;
  aiOutputLabel?: string;
  typographyDirection?: string;
  motionEditing?: string;
  corrections: string;
  finalOutput: string;
  deliverables: string[];
  beforeAfterComparison?: string;
  ctaText?: string;
  poster?: string;
  images: {
    stack1: string;
    stack2: string;
    tall: string;
  };
  // New fields for simplified display
  simpleCategory?: string;
  simpleDescription?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  onSelect: (project: ProjectData) => void;
}

// Category mapping for simple display
const getCategoryLabel = (project: ProjectData): string => {
  if (project.simpleCategory) return project.simpleCategory;
  const cat = project.category.toLowerCase();
  if (cat.includes('motion graphics')) return 'Motion Graphics';
  if (cat.includes('storytelling')) return 'AI Video';
  if (cat.includes('transformation')) return 'AI Video';
  if (cat.includes('product')) return 'Product Video';
  if (cat.includes('fashion') && cat.includes('film')) return 'Fashion Video';
  if (cat.includes('yacht')) return 'Fashion Video';
  if (cat.includes('fashion')) return 'AI Video';
  if (cat.includes('model')) return 'AI Video';
  return 'Video Editing';
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  const isHorizontalVideo = project.aspectRatio === '16/9';

  return (
    <div className="project-card-snap">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#242420] border border-[#8F887E]/15 rounded-2xl sm:rounded-3xl overflow-hidden transition-colors hover:border-[#8F887E]/30 shadow-2xl"
      >
        {/* Video Section - The Hero Element */}
        <div
          className="relative cursor-pointer group"
          onClick={() => onSelect(project)}
          role="button"
          tabIndex={0}
          aria-label={`Play ${project.title} video`}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(project); } }}
        >
          <ProjectVideo
            src={project.video}
            poster={project.poster || project.images.tall}
            alt={`${project.title} — project video`}
            aspectRatio={project.aspectRatio}
            isHorizontal={isHorizontalVideo}
          />

          {/* Play overlay hint on hover */}
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F5F1EA]/15 backdrop-blur-sm flex items-center justify-center border border-[#F5F1EA]/20">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#F5F1EA] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Project number badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-[#1C1C1A]/70 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] sm:text-[11px] font-inter font-semibold uppercase tracking-widest text-[#F5F1EA] border border-[#8F887E]/15">
            PROJECT {project.number}
          </div>

          {/* Category badge */}
          <div className="absolute top-3 right-14 sm:top-4 sm:right-16 z-20 bg-[#A58B68]/20 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] sm:text-[11px] font-inter font-medium uppercase tracking-wider text-[#A58B68] border border-[#A58B68]/20">
            {getCategoryLabel(project)}
          </div>
        </div>

        {/* Project Info Bar */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-kanit font-black text-xl sm:text-2xl lg:text-3xl text-[#F5F1EA] uppercase tracking-tight leading-tight">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm font-inter text-[#8F887E] mt-1.5 line-clamp-2">
                {project.simpleDescription || project.role}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {project.videoRatio && (
                <span className="text-[10px] font-inter font-medium uppercase tracking-wider text-[#A58B68] bg-[#A58B68]/10 px-2 py-0.5 rounded-sm border border-[#A58B68]/15">
                  {project.videoRatio}
                </span>
              )}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-inter uppercase tracking-[0.15em] font-medium text-[#EDE7DD] hover:text-[#A58B68] transition-colors"
              >
                <span className="hidden sm:inline">DISCUSS PROJECT</span>
                <span className="sm:hidden">DISCUSS</span>
                <ArrowUpRight className="w-3 h-3 text-[#A58B68]" />
              </a>
            </div>
          </div>

          {/* Deliverables tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#8F887E]/10">
            {project.deliverables.slice(0, 3).map((item, i) => (
              <span
                key={i}
                className="text-[9px] sm:text-[10px] font-inter px-2 py-0.5 rounded-sm bg-[#F5F1EA]/5 border border-[#8F887E]/10 text-[#EDE7DD]/80"
              >
                {item}
              </span>
            ))}
            {project.deliverables.length > 3 && (
              <span className="text-[9px] sm:text-[10px] font-inter text-[#8F887E]">
                +{project.deliverables.length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
};

// ─── Viewport-Aware Video Player with Volume Control ───────────────────────

interface ProjectVideoProps {
  src: string;
  poster: string;
  alt: string;
  aspectRatio: string;
  isHorizontal: boolean;
}

const ProjectVideo: React.FC<ProjectVideoProps> = ({ src, poster, alt, aspectRatio, isHorizontal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  // Intersection Observer: play when 50% visible, pause when not
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          // Mute when leaving viewport to avoid surprise audio
          video.muted = true;
          setIsMuted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !video.muted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-[#1A1A18] ${
        isHorizontal
          ? 'aspect-video'
          : 'aspect-[9/16] max-h-[70vh] sm:max-h-[75vh]'
      } flex items-center justify-center overflow-hidden`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className={`${
          isHorizontal
            ? 'w-full h-full object-contain'
            : 'h-full w-auto max-w-full object-contain'
        }`}
        style={{ aspectRatio }}
      />

      {/* Volume / Mute button - positioned at top-right */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1C1C1A]/70 backdrop-blur-md border border-[#8F887E]/25 flex items-center justify-center text-[#F5F1EA] hover:bg-[#1C1C1A]/90 hover:border-[#F5F1EA]/30 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#A58B68]"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};
