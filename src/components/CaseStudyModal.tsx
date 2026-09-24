import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectData } from './ProjectCard';
import { BeforeAfter } from './BeforeAfter';

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1C1C1A]/90 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#242420] border border-[#8F887E]/20 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-[#F5F1EA]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-6 right-6 p-2 rounded-sm bg-[#F5F1EA]/10 hover:bg-[#F5F1EA]/20 text-[#F5F1EA] transition-colors focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="mb-8 pb-6 border-b border-[#8F887E]/15 pr-12">
            <div className="flex items-center gap-3 text-xs font-inter uppercase tracking-[0.2em] text-[#8F887E] mb-2">
              <span className="font-semibold text-[#F5F1EA]">{project.number}</span>
              <span>·</span>
              <span>{project.category}</span>
              <span>·</span>
              <span className="text-[#EDE7DD]">{project.year}</span>
              {project.videoRatio && (
                <>
                  <span>·</span>
                  <span className="text-[#A58B68]">{project.videoRatio}</span>
                </>
              )}
            </div>
            <h2 className="font-kanit font-black text-3xl sm:text-5xl text-[#F5F1EA] uppercase tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm font-inter text-[#8F887E] mt-2">
              Role: <span className="text-[#F5F1EA] font-semibold">{project.role}</span>
            </p>
          </div>

          {/* Project Video Showcase */}
          {project.video && (
            <div className={`mb-8 relative rounded-lg overflow-hidden border border-[#8F887E]/15 bg-[#1C1C1A] ${
              project.aspectRatio === '9/16' ? 'flex items-center justify-center py-4' : ''
            }`}>
              {project.aspectRatio === '9/16' ? (
                /* Vertical video — centered, constrained height */
                <video
                  src={project.video}
                  poster={project.poster || project.images.tall}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={`${project.title} — project video`}
                  className="max-h-[60vh] w-auto object-contain rounded-sm"
                  style={{ aspectRatio: '9/16' }}
                />
              ) : (
                /* Horizontal video — full-width cinematic */
                <video
                  src={project.video}
                  poster={project.poster || project.images.tall}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={`${project.title} — project video`}
                  className="w-full object-contain"
                  style={{ aspectRatio: '16/9' }}
                />
              )}
              <div className="absolute top-3 left-3 z-10 bg-[#1C1C1A]/70 backdrop-blur-md px-2.5 py-0.5 rounded-sm text-[9px] font-inter uppercase tracking-wider text-[#F5F1EA] border border-[#8F887E]/15">
                PROJECT VIDEO
              </div>
            </div>
          )}

          {/* 3-Part Project Video Overview: Reference / Process / Final */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="rounded-lg overflow-hidden bg-[#1C1C1A] border border-[#8F887E]/15 p-3 flex flex-col justify-between">
              <div className="aspect-[4/3] rounded overflow-hidden relative mb-3 bg-[#242420]">
                <img src={project.images.stack1} alt="Reference" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 bg-[#1C1C1A]/80 px-2 py-0.5 rounded-sm text-[9px] font-inter uppercase tracking-wider text-[#EDE7DD]">
                  1. REFERENCE
                </span>
              </div>
              {project.projectOverview?.reference && (
                <p className="text-[11px] font-inter text-[#8F887E] leading-relaxed">
                  {project.projectOverview.reference}
                </p>
              )}
            </div>

            <div className="rounded-lg overflow-hidden bg-[#1C1C1A] border border-[#8F887E]/15 p-3 flex flex-col justify-between">
              <div className="aspect-[4/3] rounded overflow-hidden relative mb-3 bg-[#242420]">
                <img src={project.images.stack2} alt="Process" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 bg-[#1C1C1A]/80 px-2 py-0.5 rounded-sm text-[9px] font-inter uppercase tracking-wider text-[#EDE7DD]">
                  2. PROCESS
                </span>
              </div>
              {project.projectOverview?.process && (
                <p className="text-[11px] font-inter text-[#8F887E] leading-relaxed">
                  {project.projectOverview.process}
                </p>
              )}
            </div>

            <div className="rounded-lg overflow-hidden bg-[#1C1C1A] border border-[#8F887E]/15 p-3 flex flex-col justify-between">
              <div className="aspect-[4/3] rounded overflow-hidden relative mb-3 bg-[#242420]">
                <img src={project.images.tall} alt="Final" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 bg-[#1C1C1A]/80 px-2 py-0.5 rounded-sm text-[9px] font-inter uppercase tracking-wider text-[#F5F1EA]">
                  3. FINAL
                </span>
              </div>
              {project.projectOverview?.final && (
                <p className="text-[11px] font-inter text-[#8F887E] leading-relaxed">
                  {project.projectOverview.final}
                </p>
              )}
            </div>
          </div>

          {/* Detailed Attribute Sections */}
          <div className="space-y-6 text-sm font-inter">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-lg bg-[#F5F1EA]/[0.03] border border-[#8F887E]/15">
                <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
                  PROJECT OBJECTIVE
                </h4>
                <p className="text-[#8F887E] text-xs sm:text-sm leading-relaxed">
                  {project.objective}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#F5F1EA]/[0.03] border border-[#8F887E]/15">
                <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
                  TECHNICAL CHALLENGE
                </h4>
                <p className="text-[#8F887E] text-xs sm:text-sm leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            </div>

            {/* Creative Concept (if present) */}
            {project.creativeConcept && (
              <div className="p-5 rounded-lg bg-[#F5F1EA]/[0.03] border border-[#8F887E]/15">
                <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#A58B68] mb-2">
                  CREATIVE CONCEPT
                </h4>
                <p className="text-[#EDE7DD] text-xs sm:text-sm leading-relaxed font-medium">
                  {project.creativeConcept}
                </p>
              </div>
            )}

            {/* Production Pipeline Details */}
            <div className="p-5 rounded-lg bg-[#F5F1EA]/[0.03] border border-[#8F887E]/15 space-y-4">
              <div>
                <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#F5F1EA] mb-1">
                  REFERENCE & INGESTION
                </h4>
                <p className="text-[#8F887E] text-xs sm:text-sm leading-relaxed">
                  {project.reference}
                </p>
              </div>

              <div className="border-t border-[#8F887E]/15 pt-4">
                <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#F5F1EA] mb-1">
                  {project.aiOutputLabel || 'AI GENERATION'}
                </h4>
                <p className="text-[#8F887E] text-xs sm:text-sm leading-relaxed">
                  {project.aiOutput}
                </p>
              </div>

              {/* Typography Direction (if present) */}
              {project.typographyDirection && (
                <div className="border-t border-[#8F887E]/15 pt-4">
                  <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#F5F1EA] mb-1">
                    TYPOGRAPHY DIRECTION
                  </h4>
                  <p className="text-[#8F887E] text-xs sm:text-sm leading-relaxed">
                    {project.typographyDirection}
                  </p>
                </div>
              )}

              {/* Motion & Editing (if present) */}
              {project.motionEditing && (
                <div className="border-t border-[#8F887E]/15 pt-4">
                  <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#F5F1EA] mb-1">
                    MOTION & EDITING
                  </h4>
                  <p className="text-[#8F887E] text-xs sm:text-sm leading-relaxed">
                    {project.motionEditing}
                  </p>
                </div>
              )}

              <div className="border-t border-[#8F887E]/15 pt-4">
                <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#F5F1EA] mb-1">
                  POST-PRODUCTION & REFINEMENT
                </h4>
                <p className="text-[#8F887E] text-xs sm:text-sm leading-relaxed">
                  {project.corrections}
                </p>
              </div>

              <div className="border-t border-[#8F887E]/15 pt-4">
                <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#F5F1EA] mb-1">
                  FINAL RESULT
                </h4>
                <p className="text-[#8F887E] text-xs sm:text-sm leading-relaxed">
                  {project.finalOutput}
                </p>
              </div>
            </div>

            {/* Deliverables */}
            <div className="p-5 rounded-lg bg-[#F5F1EA]/[0.03] border border-[#8F887E]/15">
              <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#F5F1EA] mb-3">
                DELIVERABLES
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {project.deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#F5F1EA]/5 border border-[#8F887E]/20 text-xs font-inter text-[#F5F1EA]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A58B68] flex-shrink-0" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Before / After in Modal */}
            <div className="mt-8 pt-6 border-t border-[#8F887E]/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h4 className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#F5F1EA]">
                  BEFORE / AFTER COMPARISON
                </h4>
                {project.beforeAfterComparison && (
                  <p className="text-[11px] font-inter text-[#8F887E]">
                    {project.beforeAfterComparison}
                  </p>
                )}
              </div>
              <BeforeAfter
                beforeImage={project.images.stack1}
                afterImage={project.images.tall}
                beforeLabel="REFERENCE / INPUT"
                afterLabel="FINAL AI RESULT"
              />
            </div>

          </div>

          {/* Modal Footer */}
          <div className="mt-8 pt-6 border-t border-[#8F887E]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-inter uppercase tracking-[0.2em] font-medium text-[#F5F1EA] hover:text-[#A58B68] transition-colors"
            >
              <span>{project.ctaText || 'DISCUSS A SIMILAR PROJECT'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-sm bg-[#F5F1EA] text-[#1C1C1A] text-xs font-inter font-medium uppercase tracking-widest hover:bg-[#FAF9F6] transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
