"use client";

import React, { useEffect, useRef } from "react";
import { PROJECTS } from "@/types/project";
import { useParams, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowLeft, ArrowRight, Play, Share2, ExternalLink } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlitchText } from "@/components/animations/GlitchText";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage() {
  const { slug } = useParams();
  const router = useRouter();
  const project = PROJECTS.find((p) => p.id === slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get related projects (same category or next/prev)
  const currentIndex = PROJECTS.findIndex((p) => p.id === slug);
  const relatedProjects = PROJECTS.filter(
    (p) => p.id !== slug && (p.category === project?.category || true)
  ).slice(0, 3);

  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  useEffect(() => {
    if (!project || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".detail-hero-content", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.3,
      });

      // Meta grid reveal
      gsap.from(".meta-item", {
        scrollTrigger: { trigger: ".meta-grid", start: "top 80%" },
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
      });

      // Narrative text
      gsap.from(".narrative-text", {
        scrollTrigger: { trigger: ".narrative-section", start: "top 75%" },
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
      });

      // Process cards
      gsap.from(".process-card", {
        scrollTrigger: { trigger: ".process-section", start: "top 70%" },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Outcome section
      gsap.from(".outcome-content", {
        scrollTrigger: { trigger: ".outcome-section", start: "top 75%" },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Related projects
      gsap.from(".related-card", {
        scrollTrigger: { trigger: ".related-section", start: "top 80%" },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });

      // Next project reveal
      gsap.from(".next-project-content", {
        scrollTrigger: { trigger: ".next-project-section", start: "top 70%" },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-display uppercase">Project Not Found</h1>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-matrix text-black font-display uppercase tracking-widest rounded-full"
        >
          Go Home
        </button>
      </div>
    );
  }

  const metaItems = [
    { label: "Client", value: project.client || "—" },
    { label: "Role", value: project.role || "Lead Editor" },
    { label: "Timeline", value: project.timeline || "3 Weeks" },
    { label: "Format", value: project.format || "9:16 Vertical" },
    { label: "Tools", value: project.tools || "Premiere Pro, AE" },
    { label: "Views", value: project.views },
  ];

  const processSteps = project.process || [
    { step: "01", title: "Pre-Production", desc: "Storyboarding viral hooks and planning high-fps movements for maximum impact." },
    { step: "02", title: "Production", desc: "4K 60fps cinematography using the Sony A7SIII and DJI Ronin for buttery smooth motion." },
    { step: "03", title: "Post-Production", desc: "Precision editing in Premiere Pro, custom sound design, and viral-ready color grading." },
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Hero Video Section */}
      <section className="relative h-[80vh] w-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          src={project.videoUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
        
        {/* Navigation */}
        <div className="absolute top-10 left-6 md:left-10 right-6 md:right-10 z-50 flex items-center justify-between">
          <MagneticButton>
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-matrix hover:text-black transition-all group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-display uppercase tracking-widest text-sm">Back</span>
            </button>
          </MagneticButton>

          <div className="flex items-center gap-3">
            <Link
              href={`/work/${prevProject.id}`}
              prefetch={true}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-matrix hover:text-black hover:border-matrix transition-all"
            >
              <ArrowLeft size={16} />
            </Link>
            <Link
              href={`/work/${nextProject.id}`}
              prefetch={true}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-matrix hover:text-black hover:border-matrix transition-all"
            >
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Project Header */}
        <div className="absolute bottom-12 md:bottom-20 left-6 md:left-20 right-6 md:right-20 z-20">
          <span className="detail-hero-content px-4 py-1.5 bg-matrix text-black text-[10px] font-mono tracking-widest uppercase rounded-full mb-4 inline-block">
            <GlitchText text={project.category} />
          </span>
          <h1 className="detail-hero-content text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display uppercase tracking-tighter leading-[0.85] mb-4">
            <GlitchText text={project.title} />
          </h1>
          <p className="detail-hero-content font-mono text-matrix tracking-[0.5em] uppercase text-xs md:text-sm">
            <GlitchText text={project.views} />
          </p>
        </div>
      </section>

      {/* Meta Grid */}
      <section className="meta-grid relative z-10 px-6 md:px-20 py-16 bg-black border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {metaItems.map((item, i) => (
            <div key={i} className="meta-item">
              <p className="font-mono text-[8px] text-matrix uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-lg font-display uppercase text-white">{item.value}</p>
            </div>
          ))}
      </div>
      </section>

      {/* Narrative */}
      <section className="narrative-section relative z-10 px-6 md:px-20 py-24 bg-black">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-8">
            <h3 className="narrative-text text-sm font-mono text-white/40 uppercase tracking-[0.5em] mb-8">
            The Narrative
          </h3>
            <p className="narrative-text text-2xl md:text-4xl font-body text-white/80 leading-snug mb-12">
              {project.description || "This project pushed the boundaries of social media storytelling. Using high-energy pacing, custom sound design, and experimental color grades to capture the attention of millions."}
            </p>
        </div>

          {/* Sidebar Actions */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <button
              className="w-full py-6 bg-white text-black font-display text-xl uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-matrix transition-colors rounded-xl"
              data-cursor-text="PLAY"
            >
              Play Full Edit <Play size={22} fill="currentColor" />
          </button>
          
          <div className="grid grid-cols-2 gap-4">
              <button className="py-4 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                <Share2 size={16} />
                <span className="font-mono text-[10px] uppercase tracking-wider">Share</span>
            </button>
              <button className="py-4 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                <ExternalLink size={16} />
                <span className="font-mono text-[10px] uppercase tracking-wider">Live</span>
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section relative z-10 px-6 md:px-20 py-24 bg-black border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h3 className="text-sm font-mono text-white/40 uppercase tracking-[0.5em] mb-4">
              Behind the Frames
            </h3>
            <h2 className="text-4xl md:text-7xl font-display uppercase tracking-tighter">
              The <span className="text-matrix">Process</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((phase, i) => (
              <div
                key={i}
                className="process-card p-8 md:p-10 border border-white/5 bg-white/[0.02] rounded-[2rem] hover:border-matrix/20 transition-colors group"
              >
                <span className="text-5xl font-display text-matrix/20 block mb-6 italic group-hover:text-matrix/40 transition-colors">
                  {phase.step}
                </span>
                <h4 className="text-2xl md:text-3xl font-display uppercase mb-4 group-hover:text-matrix transition-colors">
                  {phase.title}
                </h4>
                <p className="font-body text-white/40 leading-relaxed text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="outcome-section relative z-10 px-6 md:px-20 py-24 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="outcome-content p-12 md:p-16 border border-matrix/20 bg-matrix/[0.03] rounded-[3rem] text-center">
            <h4 className="font-mono text-matrix text-[10px] uppercase tracking-[0.5em] mb-6">
              Project Outcome
            </h4>
            <p className="text-2xl md:text-5xl font-display uppercase max-w-3xl mx-auto leading-tight">
              {project.outcome || (
                <>Generated over <span className="text-matrix font-mono">{project.views}</span> organic views and increased client engagement by 200%.</>
              )}
             </p>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="related-section relative z-10 px-6 md:px-20 py-24 bg-black border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <h3 className="text-sm font-mono text-white/40 uppercase tracking-[0.5em] mb-4">
            More Work
          </h3>
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter mb-12">
            Related <span className="text-white/20">Projects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((rp) => (
              <Link
                key={rp.id}
                href={`/work/${rp.id}`}
                prefetch={true}
                className="related-card group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 hover:border-matrix/30 transition-all"
                data-cursor-text="VIEW"
              >
                {/* Use thumbnail instead of autoplay video for performance */}
                {rp.thumbnailUrl ? (
                  <img
                    src={rp.thumbnailUrl}
                    alt={rp.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <video
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={rp.videoUrl}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-mono text-[9px] text-matrix uppercase tracking-widest block mb-1">
                    {rp.category}
                  </span>
                  <h3 className="text-2xl font-display uppercase group-hover:text-matrix transition-colors">
                    {rp.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="next-project-section relative z-10 px-6 md:px-20 py-32 bg-black border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href={`/work/${nextProject.id}`}
            prefetch={true}
            className="next-project-content group flex flex-col md:flex-row items-center justify-between gap-8"
            data-cursor-text="NEXT"
          >
            <div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-4">
                Next Project
              </span>
              <h2 className="text-5xl md:text-8xl font-display uppercase tracking-tighter group-hover:text-matrix transition-colors">
                {nextProject.title}
              </h2>
            </div>
            <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-matrix group-hover:border-matrix transition-all shrink-0">
              <ArrowRight size={28} className="group-hover:text-black transition-colors" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
