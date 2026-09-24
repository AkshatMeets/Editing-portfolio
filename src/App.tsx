import React, { useState, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  Send,
  Camera,
  Code,
  Palette,
  Lightbulb
} from 'lucide-react';

import { FadeIn } from './components/FadeIn';
import { Magnet } from './components/Magnet';
import { ContactButton } from './components/ContactButton';
import { AnimatedText } from './components/AnimatedText';
import { SectionHeading } from './components/SectionHeading';
import { MarqueeWall } from './components/MarqueeWall';
import { ProjectCard, ProjectData } from './components/ProjectCard';
import { CaseStudyModal } from './components/CaseStudyModal';
import { BeforeAfter } from './components/BeforeAfter';
import { projectsData } from './data/projects';

// ─── HERO VIDEO ────────────────────────────────────────────────────────────────
// Replace this URL with your final luxury cinematic video.
// Suggested direction: architectural interiors, premium materials, soft fabric
// movement, brushed metal, shadows, natural sunlight, slow camera movement.
const HERO_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4";

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    service: 'Digital Design',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll container ref for sticky project cards
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsContainerRef,
    offset: ['start start', 'end end'],
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        service: 'Digital Design',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#1C1C1A] text-[#F5F1EA] font-kanit overflow-x-clip selection:bg-[#F5F1EA] selection:text-[#1C1C1A]">
      
      {/* ── 1. NAVBAR ───────────────────────────────────────────────────────── */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 bg-[#1C1C1A]/80 backdrop-blur-md border-b border-[#8F887E]/10"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand on Left */}
          <a 
            href="#" 
            className="font-kanit font-black text-xl sm:text-2xl tracking-wider text-[#F5F1EA] uppercase hover:opacity-80 transition-opacity"
          >
            AKSHAT MEHTA
          </a>

          {/* Center Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 text-xs font-inter font-medium uppercase tracking-[0.2em] text-[#F5F1EA]/70">
            <a href="#work" className="hover:text-[#F5F1EA] transition-colors">Work</a>
            <a href="#about" className="hover:text-[#F5F1EA] transition-colors">About</a>
            <a href="#experience" className="hover:text-[#F5F1EA] transition-colors">Experience</a>
            <a href="#contact" className="hover:text-[#F5F1EA] transition-colors">Contact</a>
          </nav>

          {/* Right CTA / Contact Button */}
          <div className="hidden md:flex items-center">
            <Magnet strength={12}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-inter font-medium uppercase tracking-[0.2em] border border-[#8F887E]/25 text-[#F5F1EA] hover:border-[#F5F1EA]/40 hover:bg-[#F5F1EA]/5 transition-all group"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnet>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className="md:hidden p-2 text-[#F5F1EA] hover:text-[#EDE7DD] focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </motion.header>

      {/* ── MOBILE MENU (FULLSCREEN FIXED OVERLAY) ─────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#1C1C1A]/95 backdrop-blur-sm flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#8F887E]/15 pb-5">
              <span className="font-kanit font-black text-2xl uppercase tracking-wider text-[#F5F1EA]">
                AKSHAT MEHTA
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close mobile navigation menu"
                className="p-2 text-[#F5F1EA] hover:text-[#EDE7DD] focus:outline-none"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Centered Large Navigation */}
            <nav className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 my-auto text-center">
              {[
                { name: 'Work', href: '#work' },
                { name: 'About', href: '#about' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' },
                { name: 'Get In Touch', href: '#contact' },
              ].map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                  className="font-kanit font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F1EA] hover:text-[#A58B68] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Bottom Meta */}
            <div className="text-center border-t border-[#8F887E]/15 pt-5 text-xs text-[#8F887E] tracking-widest uppercase font-inter">
              <span>CREATIVE TECHNOLOGY · DIGITAL DESIGN · AI · AKSHATMEHTA220@GMAIL.COM</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECTION 1: HERO (VIEWPORT HEIGHT CINEMATIC) ────────────────────── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden px-4 sm:px-6">
        
        {/* Fullscreen Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={HERO_VIDEO_URL}
        />

        {/* Warm Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A] via-[#1C1C1A]/60 to-[#1C1C1A]/75 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto py-12 text-center flex flex-col items-center justify-center min-w-0">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex items-center gap-2 border border-[#8F887E]/20 bg-[#1C1C1A]/50 backdrop-blur-md px-3.5 py-1.5 rounded-sm mb-6 sm:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A58B68] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-inter font-medium uppercase tracking-[0.3em] text-[#EDE7DD]">
              CREATIVE TECHNOLOGY · DIGITAL DESIGN · AI
            </span>
          </motion.div>

          {/* Main Heading: CREATE. REFINE. DELIVER. */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading font-kanit font-black uppercase text-center tracking-tight leading-none text-[clamp(2.75rem,9.5vw,7.5rem)] mb-6 sm:mb-8 select-none break-words"
          >
            CREATE.<br />
            REFINE.<br />
            DELIVER.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-inter text-[#EDE7DD]/90 text-xs sm:text-base md:text-lg max-w-2xl leading-relaxed text-center mb-8 sm:mb-10 px-2"
          >
            I create refined digital experiences, visual systems and AI-powered creative work where design meets technology.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-12"
          >
            <ContactButton href="#work" text="VIEW MY WORK" variant="primary" />
            <ContactButton href="#contact" text="GET IN TOUCH" variant="secondary" />
          </motion.div>

          {/* Hero Support Text */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex items-center justify-center gap-4 text-[10px] sm:text-xs font-inter uppercase tracking-[0.3em] text-[#8F887E] border-t border-[#8F887E]/15 pt-5 sm:pt-6 w-full max-w-xs sm:max-w-md"
          >
            <span>DESIGN</span>
            <span className="text-[#8F887E]/40">·</span>
            <span>TECHNOLOGY</span>
            <span className="text-[#8F887E]/40">·</span>
            <span>AI</span>
          </motion.div>

        </div>

        {/* Subtle Bottom Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#8F887E] opacity-70 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.3em] font-inter">SCROLL</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#A58B68] to-transparent" />
        </div>

      </section>

      {/* ── SECTION 2: MARQUEE / WORK WALL ─────────────────────────────── */}
      <MarqueeWall />

      {/* ── SECTION 3: ABOUT ───────────────────────────────────────────── */}
      <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto bg-[#1C1C1A]">
        
        <SectionHeading
          badge="ABOUT"
          title="ABOUT AKSHAT"
          subtitle="Creative professional working at the intersection of digital design, technology and AI-powered creativity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          
          {/* Left Column: Portrait & Card */}
          <div className="lg:col-span-5">
            <FadeIn direction="right" delay={0.2}>
              <div className="relative rounded-lg overflow-hidden border border-[#8F887E]/15 bg-[#242420] shadow-2xl group">
                <img
                  src="/images/profileimage.jpeg"
                  alt="Akshat Mehta"
                  loading="eager"
                  className="w-full aspect-[3/4] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A] via-[#1C1C1A]/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-[#1C1C1A]/60 backdrop-blur-md border border-[#8F887E]/15">
                  <div className="flex items-center gap-2 text-[10px] font-inter uppercase tracking-widest text-[#8F887E] mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A58B68]" />
                    <span>OPEN TO OPPORTUNITIES</span>
                  </div>
                  <h4 className="font-kanit font-black text-xl text-[#F5F1EA] uppercase tracking-wider">
                    AKSHAT MEHTA
                  </h4>
                  <p className="text-xs font-inter text-[#8F887E]">
                    Creative Technologist · Digital Design
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Character-by-Character Scroll Reveal & Facts */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            
            {/* Scroll-driven character-by-character text reveal */}
            <div className="p-6 sm:p-8 rounded-lg bg-[#F5F1EA]/[0.02] border border-[#8F887E]/10">
              <AnimatedText
                text="I'm Akshat Mehta, a creative professional working at the intersection of digital design, technology and AI-powered creativity. I enjoy turning ideas into refined visual experiences — from brand visuals and digital interfaces to AI-assisted creative production and web experiences."
                className="font-kanit text-lg sm:text-2xl md:text-3xl text-[#F5F1EA] font-semibold"
              />
            </div>

            {/* Grounded Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <FadeIn delay={0.1}>
                <div className="p-4 rounded-lg bg-[#242420] border border-[#8F887E]/10 text-center">
                  <div className="font-kanit font-black text-2xl sm:text-3xl text-[#F5F1EA]">06</div>
                  <div className="text-[10px] font-inter uppercase tracking-wider text-[#8F887E] mt-1">MONTHS EXPERIENCE</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="p-4 rounded-lg bg-[#242420] border border-[#8F887E]/10 text-center">
                  <div className="font-kanit font-black text-2xl sm:text-3xl text-[#F5F1EA]">—</div>
                  <div className="text-[10px] font-inter uppercase tracking-wider text-[#8F887E] mt-1">SELECTED WORK</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="p-4 rounded-lg bg-[#242420] border border-[#8F887E]/10 text-center">
                  <div className="font-kanit font-black text-2xl sm:text-3xl text-[#F5F1EA]">AI</div>
                  <div className="text-[10px] font-inter uppercase tracking-wider text-[#8F887E] mt-1">+ CODE STACK</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="p-4 rounded-lg bg-[#242420] border border-[#8F887E]/10 text-center">
                  <div className="font-kanit font-black text-2xl sm:text-3xl text-[#F5F1EA]">∞</div>
                  <div className="text-[10px] font-inter uppercase tracking-wider text-[#8F887E] mt-1">CURIOSITY</div>
                </div>
              </FadeIn>
            </div>

            {/* CTA */}
            <FadeIn delay={0.45}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ContactButton href="#contact" text="GET IN TOUCH" variant="primary" />
                <a
                  href="mailto:akshatmehta220@gmail.com"
                  className="inline-flex items-center gap-2 text-xs font-inter uppercase tracking-widest text-[#8F887E] hover:text-[#F5F1EA] transition-colors py-3 px-4"
                >
                  <Mail className="w-4 h-4" />
                  <span>AKSHATMEHTA220@GMAIL.COM</span>
                </a>
              </div>
            </FadeIn>

          </div>

        </div>

      </section>

      {/* ── SECTION 4: EXPERIENCE (WARM CREAM SECTION) ──────────────────── */}
      <section 
        id="experience" 
        className="relative bg-[#FAF9F6] text-[#1C1C1A] rounded-t-[40px] md:rounded-t-[60px] py-24 sm:py-32 px-4 sm:px-6 -mt-8 z-20"
      >
        <div className="max-w-6xl mx-auto">
          
          <SectionHeading
            badge="EXPERTISE"
            title="WHAT I DO"
            subtitle="Working across digital design, creative technology, AI-powered workflows and web development to create refined visual experiences."
            lightTheme={true}
          />

          <div className="divide-y divide-[#B8AEA0]/20">
            {[
              {
                num: '01',
                title: 'DIGITAL DESIGN',
                desc: 'Creating visual systems, brand identities, and digital interfaces with a focus on refined aesthetics and intentional composition.',
                icon: Palette,
              },
              {
                num: '02',
                title: 'AI CREATIVE WORKFLOWS',
                desc: 'Leveraging AI generation tools for creative production — from fashion imagery and product visuals to campaign content.',
                icon: Sparkles,
              },
              {
                num: '03',
                title: 'WEB DEVELOPMENT',
                desc: 'Building responsive, performant web experiences using modern frameworks, clean code, and thoughtful interaction design.',
                icon: Code,
              },
              {
                num: '04',
                title: 'BRAND VISUALS',
                desc: 'Developing cohesive visual languages for brands — including photography direction, color systems, and editorial layouts.',
                icon: Camera,
              },
              {
                num: '05',
                title: 'CREATIVE TECHNOLOGY',
                desc: 'Exploring the intersection of design and engineering — combining creative direction with technical implementation.',
                icon: Lightbulb,
              },
            ].map((service, index) => {
              const IconComp = service.icon;
              return (
                <FadeIn key={service.num} delay={index * 0.1}>
                  <div className="py-8 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start group hover:bg-[#EDE7DD]/50 px-3 sm:px-6 rounded-lg transition-colors">
                    
                    {/* Number */}
                    <div className="md:col-span-2">
                      <span className="font-kanit font-black text-3xl sm:text-5xl text-[#B8AEA0] group-hover:text-[#1C1C1A] transition-colors">
                        {service.num}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-5 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#EDE7DD] text-[#8F887E] group-hover:bg-[#1C1C1A] group-hover:text-[#F5F1EA] transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-kanit font-black text-xl sm:text-2xl text-[#1C1C1A] uppercase tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-5">
                      <p className="text-xs sm:text-sm font-inter text-[#8F887E] leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-[#B8AEA0]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-kanit font-black text-xl text-[#1C1C1A] uppercase">
                HAVE A PROJECT IN MIND?
              </h4>
              <p className="text-xs sm:text-sm font-inter text-[#8F887E]">
                I'm always open to discussing new creative opportunities and collaborations.
              </p>
            </div>
            <ContactButton href="#contact" text="GET IN TOUCH" variant="light" />
          </div>

        </div>
      </section>

      {/* ── SECTION 5: PROJECTS (STICKY STACKING CARDS) ───────────────────── */}
      <section 
        id="work" 
        ref={projectsContainerRef}
        className="relative bg-[#1C1C1A] rounded-t-[40px] md:rounded-t-[60px] py-24 sm:py-32 px-4 sm:px-6 -mt-8 z-30"
      >
        <div className="max-w-6xl mx-auto">
          
          <SectionHeading
            badge="SELECTED WORK"
            title="PROJECTS"
            subtitle="A curated selection of creative projects spanning AI-generated fashion imagery, brand visuals, and digital production."
          />

          {/* Sticky Stacking Project Cards Container */}
          <div className="relative pt-4 pb-12">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projectsData.length}
                scrollYProgress={projectsScrollProgress}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 6: CREATIVE PROCESS ────────────────────────────────────── */}
      <section id="process" className="py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#8F887E]/10">
        
        <SectionHeading
          badge="CREATIVE PROCESS"
          title="HOW I WORK"
          subtitle="From initial concept through AI generation to refined final output — a methodical approach to creative production."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mb-14">
          {[
            {
              step: '01',
              title: 'DISCOVER',
              detail: 'Understand the brief, gather references, research direction, and establish creative constraints.',
            },
            {
              step: '02',
              title: 'GENERATE',
              detail: 'Explore concepts using AI tools, design systems, and rapid prototyping to find the right direction.',
            },
            {
              step: '03',
              title: 'REFINE',
              detail: 'Review outputs critically — correct artifacts, adjust composition, and align with the creative vision.',
            },
            {
              step: '04',
              title: 'POLISH',
              detail: 'Precision editing, color grading, texture refinement, and ensuring every detail is intentional.',
            },
            {
              step: '05',
              title: 'DELIVER',
              detail: 'Export production-ready assets formatted for the intended platform — web, print, social, or e-commerce.',
            },
          ].map((item, idx) => (
            <FadeIn key={item.step} delay={idx * 0.1}>
              <div className="p-6 rounded-lg bg-[#242420] border border-[#8F887E]/10 h-full flex flex-col justify-between hover:border-[#8F887E]/25 transition-colors">
                <div>
                  <span className="text-xs font-inter font-medium text-[#8F887E] tracking-widest block mb-3">
                    STEP {item.step}
                  </span>
                  <h4 className="font-kanit font-black text-lg text-[#F5F1EA] uppercase mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs font-inter text-[#8F887E] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Draggable Before / After Section */}
        <FadeIn delay={0.2}>
          <div className="p-6 sm:p-10 rounded-lg bg-[#242420] border border-[#8F887E]/10">
            <div className="mb-6">
              <span className="text-xs font-inter font-medium uppercase tracking-[0.2em] text-[#8F887E]">
                PRECISION EDITING
              </span>
              <h3 className="font-kanit font-black text-2xl sm:text-3xl text-[#F5F1EA] uppercase mt-1">
                RAW OUTPUT VS REFINED RESULT
              </h3>
              <p className="text-xs sm:text-sm font-inter text-[#8F887E] mt-1">
                Drag the center divider to compare raw AI output against the final refined edit.
              </p>
            </div>
            <BeforeAfter />
          </div>
        </FadeIn>

      </section>

      {/* ── SECTION 7: CONTACT CTA ────────────────────────────────────────── */}
      <section id="contact" className="py-24 sm:py-36 px-4 sm:px-6 border-t border-[#8F887E]/10 bg-[#1C1C1A]">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow */}
          <FadeIn delay={0.1}>
            <span className="inline-block text-xs font-inter font-medium uppercase tracking-[0.3em] px-3.5 py-1 rounded-sm border border-[#8F887E]/20 text-[#8F887E] bg-[#F5F1EA]/5 mb-6">
              GET IN TOUCH
            </span>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.2}>
            <h2 className="hero-heading font-kanit font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-6 select-none">
              LET'S CREATE<br />
              SOMETHING<br />
              REFINED.
            </h2>
          </FadeIn>

          {/* Supporting Text */}
          <FadeIn delay={0.3}>
            <p className="font-inter text-[#EDE7DD]/90 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Have a project, idea, or collaboration in mind? I'd love to hear about it.
            </p>
          </FadeIn>

          {/* Inquiry Form */}
          <FadeIn delay={0.4}>
            <form 
              onSubmit={handleFormSubmit}
              className="w-full max-w-2xl mx-auto text-left p-6 sm:p-10 rounded-lg bg-[#242420] border border-[#8F887E]/15 shadow-2xl space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-inter uppercase tracking-wider text-[#8F887E] mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm bg-[#F5F1EA]/5 border border-[#8F887E]/15 text-[#F5F1EA] placeholder-[#8F887E]/40 focus:outline-none focus:border-[#A58B68] text-sm font-inter"
                  />
                </div>

                <div>
                  <label className="block text-xs font-inter uppercase tracking-wider text-[#8F887E] mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm bg-[#F5F1EA]/5 border border-[#8F887E]/15 text-[#F5F1EA] placeholder-[#8F887E]/40 focus:outline-none focus:border-[#A58B68] text-sm font-inter"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-inter uppercase tracking-wider text-[#8F887E] mb-2">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Project Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm bg-[#F5F1EA]/5 border border-[#8F887E]/15 text-[#F5F1EA] placeholder-[#8F887E]/40 focus:outline-none focus:border-[#A58B68] text-sm font-inter"
                  />
                </div>

                <div>
                  <label className="block text-xs font-inter uppercase tracking-wider text-[#8F887E] mb-2">
                    AREA OF INTEREST
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm bg-[#2A2A26] border border-[#8F887E]/15 text-[#F5F1EA] focus:outline-none focus:border-[#A58B68] text-sm font-inter"
                  >
                    <option value="Digital Design">Digital Design</option>
                    <option value="AI Creative Workflows">AI Creative Workflows</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Brand Visuals">Brand Visuals</option>
                    <option value="Creative Technology">Creative Technology</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-inter uppercase tracking-wider text-[#8F887E] mb-2">
                  YOUR MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project, idea, or how I can help..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-sm bg-[#F5F1EA]/5 border border-[#8F887E]/15 text-[#F5F1EA] placeholder-[#8F887E]/40 focus:outline-none focus:border-[#A58B68] text-sm font-inter"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-sm bg-[#F5F1EA] hover:bg-[#FAF9F6] text-[#1C1C1A] font-inter font-medium text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND MESSAGE</span>
                </button>
              </div>

              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-sm bg-[#A58B68]/10 border border-[#A58B68]/30 text-[#A58B68] text-xs font-inter flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#A58B68] flex-shrink-0" />
                  <span>Message received! I'll review your inquiry and respond within 24 hours.</span>
                </motion.div>
              )}

              <div className="text-center pt-2">
                <span className="text-xs font-inter text-[#8F887E]">
                  Or reach me directly:{' '}
                  <a href="mailto:akshatmehta220@gmail.com" className="text-[#F5F1EA] hover:text-[#A58B68] hover:underline font-medium transition-colors">
                    akshatmehta220@gmail.com
                  </a>
                </span>
              </div>

            </form>
          </FadeIn>

        </div>
      </section>

      {/* ── 8. MINIMAL EDITORIAL FOOTER ───────────────────────────────────── */}
      <footer className="border-t border-[#8F887E]/10 py-12 px-4 sm:px-6 bg-[#18181A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <span className="font-kanit font-black text-xl uppercase tracking-wider text-[#F5F1EA]">
              AKSHAT MEHTA
            </span>
            <span className="text-[#8F887E]/30">|</span>
            <span className="text-xs font-inter uppercase tracking-widest text-[#8F887E]">
              CREATIVE TECHNOLOGY · DIGITAL DESIGN · AI
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs font-inter uppercase tracking-widest text-[#8F887E]">
            <a href="#work" className="hover:text-[#F5F1EA] transition-colors">Work</a>
            <a href="#about" className="hover:text-[#F5F1EA] transition-colors">About</a>
            <a href="#experience" className="hover:text-[#F5F1EA] transition-colors">Experience</a>
            <a href="#contact" className="hover:text-[#F5F1EA] transition-colors">Contact</a>
          </div>

          <div className="text-xs font-inter text-[#8F887E]">
            © {new Date().getFullYear()} AKSHAT MEHTA. ALL RIGHTS RESERVED.
          </div>

        </div>
      </footer>

      {/* ── CASE STUDY MODAL ──────────────────────────────────────────────── */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}
export default App;
