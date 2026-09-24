import React, { useRef, useEffect } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, Play, Pause } from 'lucide-react';

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
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onSelect: (project: ProjectData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  scrollYProgress,
  onSelect,
}) => {
  // Compute scale-down stacking effect based on scroll progress
  const start = index / total;
  const scale = useTransform(scrollYProgress, [start, 1], [1, 1 - (total - index - 1) * 0.035]);

  const isVerticalVideo = project.video && project.aspectRatio === '9/16';
  const isHorizontalVideo = project.video && project.aspectRatio === '16/9';

  return (
    <div className="sticky top-20 sm:top-24 mb-12 sm:mb-16">
      <motion.article
        style={{ scale }}
        className="w-full bg-[#242420] border border-[#8F887E]/15 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden transition-colors hover:border-[#8F887E]/30"
      >
        {/* Project Meta Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#8F887E]/15 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-inter uppercase tracking-[0.2em] text-[#8F887E] mb-2">
              <span className="font-semibold text-[#F5F1EA]">{project.number}</span>
              <span className="text-[#8F887E]/40">/</span>
              <span>{project.category}</span>
              <span className="text-[#8F887E]/40">·</span>
              <span className="text-[#EDE7DD]">{project.year}</span>
              {project.videoRatio && (
                <>
                  <span className="text-[#8F887E]/40">·</span>
                  <span className="text-[#A58B68]">{project.videoRatio}</span>
                </>
              )}
            </div>
            <h3 className="font-kanit font-black text-2xl sm:text-4xl text-[#F5F1EA] uppercase tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-inter text-[#8F887E] mt-1">
              Role: <span className="text-[#F5F1EA] font-medium">{project.role}</span>
            </p>
          </div>

          <button
            onClick={() => onSelect(project)}
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-inter font-medium uppercase tracking-[0.2em] bg-[#F5F1EA]/10 hover:bg-[#F5F1EA] hover:text-[#1C1C1A] text-[#F5F1EA] border border-[#8F887E]/20 transition-all duration-300 group cursor-pointer"
          >
            <span>VIEW PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* ── MEDIA SECTION ─────────────────────────────────────────────── */}

        {isHorizontalVideo ? (
          /* ── 16:9 HORIZONTAL VIDEO LAYOUT ────────────────────────────── */
          /* Reference images side-by-side on top, full-width cinematic video below */
          <div className="space-y-4 sm:space-y-6">
            {/* Two reference images side-by-side */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#242420] border border-[#8F887E]/15 group">
                <img
                  src={project.images.stack1}
                  alt={`${project.title} — reference detail`}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1C1C1A]/70 backdrop-blur-md px-2.5 py-0.5 rounded-sm text-[9px] font-inter uppercase tracking-wider text-[#EDE7DD] border border-[#8F887E]/15">
                  REFERENCE
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#242420] border border-[#8F887E]/15 group">
                <img
                  src={project.images.stack2}
                  alt={`${project.title} — process`}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1C1C1A]/70 backdrop-blur-md px-2.5 py-0.5 rounded-sm text-[9px] font-inter uppercase tracking-wider text-[#EDE7DD] border border-[#8F887E]/15">
                  PROCESS
                </div>
              </div>
            </div>

            {/* Full-width 16:9 cinematic video */}
            <div className="relative rounded-lg overflow-hidden bg-[#1C1C1A] border border-[#8F887E]/15">
              <ProjectVideo
                src={project.video!}
                poster={project.poster || project.images.tall}
                alt={`${project.title} — campaign video`}
                aspectRatio="16/9"
              />
              <div className="absolute top-4 left-4 z-10 bg-[#1C1C1A]/70 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-inter font-medium uppercase tracking-widest text-[#F5F1EA] border border-[#8F887E]/15">
                VIDEO
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-inter uppercase tracking-wider text-[#F5F1EA] bg-[#1C1C1A]/60 backdrop-blur-md px-4 py-2 rounded-sm border border-[#8F887E]/15">
                <span>DELIVERED</span>
                <span className="text-[#8F887E]">COMMERCIAL READY</span>
              </div>
            </div>
          </div>

        ) : isVerticalVideo ? (
          /* ── 9:16 VERTICAL VIDEO LAYOUT ──────────────────────────────── */
          /* Stacked images left, centered vertical video right */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

            {/* Left: Two Stacked Images (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#242420] border border-[#8F887E]/15 group">
                <img
                  src={project.images.stack1}
                  alt={`${project.title} — reference detail`}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1C1C1A]/70 backdrop-blur-md px-2.5 py-0.5 rounded-sm text-[9px] font-inter uppercase tracking-wider text-[#EDE7DD] border border-[#8F887E]/15">
                  REFERENCE
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#242420] border border-[#8F887E]/15 group">
                <img
                  src={project.images.stack2}
                  alt={`${project.title} — process`}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1C1C1A]/70 backdrop-blur-md px-2.5 py-0.5 rounded-sm text-[9px] font-inter uppercase tracking-wider text-[#EDE7DD] border border-[#8F887E]/15">
                  PROCESS
                </div>
              </div>
            </div>

            {/* Right: Centered 9:16 vertical video (7 cols) */}
            <div className="lg:col-span-7 relative rounded-lg overflow-hidden bg-[#1C1C1A] border border-[#8F887E]/15 flex items-center justify-center min-h-[400px] sm:min-h-[460px] lg:min-h-[500px]">
              <div className="h-full w-auto max-h-[400px] sm:max-h-[460px] lg:max-h-[500px]" style={{ aspectRatio: '9/16' }}>
                <ProjectVideo
                  src={project.video!}
                  poster={project.poster || project.images.tall}
                  alt={`${project.title} — fashion reel`}
                  aspectRatio="9/16"
                />
              </div>
              <div className="absolute top-4 left-4 z-10 bg-[#1C1C1A]/70 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-inter font-medium uppercase tracking-widest text-[#F5F1EA] border border-[#8F887E]/15">
                VIDEO
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-inter uppercase tracking-wider text-[#F5F1EA] bg-[#1C1C1A]/60 backdrop-blur-md px-4 py-2 rounded-sm border border-[#8F887E]/15">
                <span>DELIVERED</span>
                <span className="text-[#8F887E]">COMMERCIAL READY</span>
              </div>
            </div>
          </div>

        ) : (
          /* ── NO VIDEO: ORIGINAL 3-IMAGE LAYOUT ──────────────────────── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 h-auto lg:h-[460px]">

            {/* Left: Two Stacked Images (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 h-full">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[calc(50%-12px)] rounded-lg overflow-hidden bg-[#242420] border border-[#8F887E]/15 group">
                <img
                  src={project.images.stack1}
                  alt={`${project.title} — reference detail`}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1C1C1A]/70 backdrop-blur-md px-2.5 py-0.5 rounded-sm text-[9px] font-inter uppercase tracking-wider text-[#EDE7DD] border border-[#8F887E]/15">
                  REFERENCE
                </div>
              </div>
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[calc(50%-12px)] rounded-lg overflow-hidden bg-[#242420] border border-[#8F887E]/15 group">
                <img
                  src={project.images.stack2}
                  alt={`${project.title} — process`}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1C1C1A]/70 backdrop-blur-md px-2.5 py-0.5 rounded-sm text-[9px] font-inter uppercase tracking-wider text-[#EDE7DD] border border-[#8F887E]/15">
                  PROCESS
                </div>
              </div>
            </div>

            {/* Right: One Tall Image (7 cols) */}
            <div className="lg:col-span-7 h-[320px] sm:h-[400px] lg:h-full relative rounded-lg overflow-hidden bg-[#242420] border border-[#8F887E]/15 group">
              <img
                src={project.images.tall}
                alt={`${project.title} — final result`}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#1C1C1A]/70 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-inter font-medium uppercase tracking-widest text-[#F5F1EA] border border-[#8F887E]/15">
                FINAL RESULT
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-inter uppercase tracking-wider text-[#F5F1EA] bg-[#1C1C1A]/60 backdrop-blur-md px-4 py-2 rounded-sm border border-[#8F887E]/15">
                <span>DELIVERED</span>
                <span className="text-[#8F887E]">COMMERCIAL READY</span>
              </div>
            </div>
          </div>
        )}

        {/* Project Card Footer: Deliverables & CTA */}
        <div className="mt-6 pt-5 border-t border-[#8F887E]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-inter uppercase tracking-widest text-[#8F887E] mr-1">
              DELIVERABLES:
            </span>
            {project.deliverables.slice(0, 3).map((item, i) => (
              <span
                key={i}
                className="text-[10px] font-inter px-2.5 py-0.5 rounded-sm bg-[#F5F1EA]/5 border border-[#8F887E]/15 text-[#EDE7DD]"
              >
                {item}
              </span>
            ))}
            {project.deliverables.length > 3 && (
              <span className="text-[10px] font-inter text-[#8F887E]">
                +{project.deliverables.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-inter uppercase tracking-[0.2em] font-medium text-[#EDE7DD] hover:text-[#A58B68] transition-colors"
            >
              <span>DISCUSS A SIMILAR PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A58B68]" />
            </a>

            <button
              onClick={() => onSelect(project)}
              className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-inter uppercase tracking-wider bg-[#F5F1EA]/10 text-[#F5F1EA]"
            >
              DETAILS
            </button>
          </div>
        </div>

      </motion.article>
    </div>
  );
};

// ─── Viewport-Aware Video Player ───────────────────────────────────────────

interface ProjectVideoProps {
  src: string;
  poster: string;
  alt: string;
  aspectRatio: string;
}

const ProjectVideo: React.FC<ProjectVideoProps> = ({ src, poster, alt, aspectRatio }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Intersection Observer: play when 40% visible, pause when not
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className="w-full h-full object-contain"
        style={{ aspectRatio }}
      />
      {/* Subtle play/pause toggle */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute bottom-4 right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1C1C1A]/60 backdrop-blur-md border border-[#8F887E]/20 flex items-center justify-center text-[#F5F1EA] hover:bg-[#1C1C1A]/80 transition-colors cursor-pointer"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>
    </div>
  );
};
