"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlitchText } from "@/components/animations/GlitchText";
import {
  Camera,
  Film,
  Zap,
  Award,
  MapPin,
  Calendar,
  ArrowRight,
  Instagram,
  Mail,
  Linkedin,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "Premiere Pro", level: 95 },
  { name: "After Effects", level: 90 },
  { name: "DaVinci Resolve", level: 85 },
  { name: "Cinematography", level: 92 },
  { name: "Sound Design", level: 80 },
  { name: "Color Grading", level: 88 },
];

const MILESTONES = [
  { year: "2020", title: "First Camera", desc: "Started the journey with a basic DSLR and a dream." },
  { year: "2021", title: "First Viral Reel", desc: "Crossed 100K views on a single Instagram reel." },
  { year: "2022", title: "Football Plus Academy", desc: "Official videographer for Football Plus Academy." },
  { year: "2023", title: "Brazil Legends Event", desc: "Covered the Brazil Legends match — 1.4M views." },
  { year: "2024", title: "300+ Videos Delivered", desc: "Milestone of 300+ professional video edits." },
];

const EQUIPMENT = [
  "Sony A7S III",
  "DJI Ronin RS 3",
  "Rode VideoMic Pro+",
  "Aputure Amaran 200D",
  "MacBook Pro M2",
  "Adobe Creative Suite",
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.from(".about-hero-line", {
        y: 120,
        opacity: 0,
        rotateX: -40,
        stagger: 0.12,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.3,
      });

      // Background Parallax
      gsap.to(".about-bg-parallax", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Stats counter
      gsap.from(".about-stat", {
        scrollTrigger: { trigger: ".about-stats", start: "top 80%" },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Skills bar animation
      gsap.from(".skill-fill", {
        scrollTrigger: { trigger: ".skills-section", start: "top 75%" },
        scaleX: 0,
        transformOrigin: "left",
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
      });

      // Philosophy section
      gsap.from(".philosophy-text", {
        scrollTrigger: { trigger: ".philosophy-section", start: "top 70%" },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });

      // Milestones
      gsap.from(".milestone-card", {
        scrollTrigger: { trigger: ".milestones-section", start: "top 70%" },
        x: -60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Equipment
      gsap.from(".equip-item", {
        scrollTrigger: { trigger: ".equipment-section", start: "top 75%" },
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-black min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative h-screen flex items-center px-6 md:px-20 overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,255,65,0.05)_0%,transparent_50%)] pointer-events-none" />
        
        {/* Background Showreel Image with Parallax & UI Elements */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute right-0 top-0 w-full md:w-[60%] h-full opacity-50 md:opacity-70 transition-transform duration-700 ease-out"
            style={{ viewTransitionName: 'about-bg-image' } as any}
          >
            <div className="absolute inset-0 overflow-hidden">
               <img 
                src="/images/hero/showreel.jpg" 
                alt="Background Showreel" 
                className="about-bg-parallax w-full h-full object-cover object-[60%_center] md:object-center scale-110"
              />
            </div>
            
            {/* Complex Fade Mask - Targeted for mobile vs desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 md:via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            
            {/* Mobile-only tint to protect text readability while image is visible */}
            <div className="absolute inset-0 bg-black/20 md:hidden" />
            
            {/* Decorative HUD/Grid Elements */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-40 md:opacity-20 hidden sm:flex">
              <div className="w-24 md:w-32 h-[1px] bg-matrix" />
              <p className="font-mono text-[7px] md:text-[8px] text-matrix uppercase tracking-[0.4em]">Coordinate: 12.9716° N, 80.2023° E</p>
              <p className="font-mono text-[7px] md:text-[8px] text-white uppercase tracking-[0.2em]">Live Render Process: Active</p>
            </div>
          </div>
          
          {/* Subtle Scanning Line */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,255,65,0.03)_50%,transparent_100%)] h-[100px] w-full animate-scan-slow opacity-20 pointer-events-none" />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <div className="overflow-hidden mb-4">
            <h4 className="about-hero-line font-mono text-matrix text-[10px] md:text-xs tracking-[0.5em] uppercase flex items-center gap-2">
              <div className="w-8 md:w-12 h-[1px] bg-matrix/30 mr-2" />
              <GlitchText text="The Architect" />
            </h4>
          </div>
          <div className="overflow-hidden">
             <h1 className="about-hero-line text-[12vw] sm:text-7xl md:text-[10rem] lg:text-[12rem] font-display uppercase tracking-tighter leading-[0.85] text-white">
                <GlitchText text="R. VASANTHAN" />
             </h1>
          </div>
          <div className="overflow-hidden">
            <p className="about-hero-line text-xl md:text-3xl font-body text-white/60 mt-8 max-w-3xl leading-relaxed">
              Engineering <span className="text-white">viral visual experiences</span> that hijack attention and convert viewers into believers.
            </p>
          </div>
          
          <div className="overflow-hidden mt-12">
            <div className="about-hero-line flex items-center gap-6">
              <div className="flex items-center gap-2 text-white/40">
                <MapPin size={14} className="text-matrix" />
                <span className="font-mono text-xs uppercase tracking-widest">Chennai, Tamil Nadu</span>
              </div>
              <div className="w-[1px] h-4 bg-white/10" />
              <div className="flex items-center gap-2 text-white/40">
                <Calendar size={14} className="text-matrix" />
                <span className="font-mono text-xs uppercase tracking-widest">Since 2020</span>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Stats */}
      <section className="about-stats px-6 md:px-20 py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { value: "300+", label: "Videos Delivered" },
            { value: "1.4M+", label: "Peak Views" },
            { value: "50+", label: "Happy Clients" },
            { value: "4+", label: "Years Experience" },
          ].map((stat, i) => (
            <div key={i} className="about-stat text-center">
              <span className="text-5xl md:text-7xl font-display text-white block">{stat.value}</span>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-2 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Content Update */}
      <section className="philosophy-section px-6 md:px-20 py-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-5">
            <h4 className="philosophy-text font-mono text-matrix text-xs tracking-[0.5em] uppercase mb-6 flex items-center gap-2">
              <Film size={14} /> <GlitchText text="Core Philosophy" />
            </h4>
            <h2 className="philosophy-text text-5xl md:text-7xl font-display uppercase tracking-tighter leading-[0.9]">
              <GlitchText text="Engineering" /> <br />
              <span className="text-white/20"><GlitchText text="Dopamine." /></span> <br />
              <GlitchText text="Frame by Frame." />
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center gap-8">
            <p className="philosophy-text text-lg md:text-xl font-body text-white/60 leading-relaxed">
              In an economy where <span className="text-white font-bold">attention is currency</span>, I am your broker. I blend cinematic precision with algorithmic psychology to architect content that doesn't just get watched—it gets felt.
            </p>
            <p className="philosophy-text text-lg md:text-xl font-body text-white/60 leading-relaxed">
              From the raw, unscripted energy of stadium crowds to the calculated precision of brand storytelling, my process is a <span className="text-white font-bold">Protocol of Impact</span>. Every cut is a heartbeat. Every transition is a breath.
            </p>
            <p className="philosophy-text text-lg md:text-xl font-body text-white/60 leading-relaxed border-l-2 border-matrix pl-6">
              "The algorithm doesn't reward content. It rewards retention. And retention is built on emotion."
            </p>
          </div>
        </div>
      </section>

      {/* Skills Headline Update */}
      <section className="skills-section px-6 md:px-20 py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <h4 className="font-mono text-matrix text-xs tracking-[0.5em] uppercase mb-4 flex items-center gap-2">
            <Zap size={14} /> <GlitchText text="Skill Matrix" />
          </h4>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-16">
            <GlitchText text="The Kinetic" /> <span className="text-white/20"><GlitchText text="Arsenal" /></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
            {SKILLS.map((skill, i) => (
              <div key={i} className="group">
                <div className="flex justify-between mb-3">
                  <span className="font-display text-xl uppercase tracking-wider">{skill.name}</span>
                  <span className="font-mono text-xs text-matrix">{skill.level}%</span>
                </div>
                <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="skill-fill h-full bg-matrix rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Headline Update */}
      <section className="milestones-section px-6 md:px-20 py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <h4 className="font-mono text-matrix text-xs tracking-[0.5em] uppercase mb-4 flex items-center gap-2">
            <Award size={14} /> <GlitchText text="Journey" />
          </h4>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-16">
            <GlitchText text="Evolution" /> <span className="text-white/20"><GlitchText text="Protocol" /></span>
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-white/10" />

            <div className="flex flex-col gap-12">
              {MILESTONES.map((m, i) => (
                <div key={i} className="milestone-card flex gap-8 md:gap-12 items-start pl-4">
                  <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full border border-matrix/30 bg-black flex items-center justify-center shrink-0">
                    <span className="font-mono text-matrix text-xs md:text-sm font-bold">{m.year}</span>
                  </div>
                  <div className="pt-2 md:pt-3">
                    <h3 className="text-2xl md:text-4xl font-display uppercase tracking-tight mb-2">{m.title}</h3>
                    <p className="text-white/40 font-body text-sm md:text-base">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section (Unchanged, just bridging) */}
      <section className="equipment-section px-6 md:px-20 py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <h4 className="font-mono text-matrix text-xs tracking-[0.5em] uppercase mb-4 flex items-center gap-2">
            <Camera size={14} /> <GlitchText text="Arsenal" />
          </h4>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-16">
            <GlitchText text="My" /> <span className="text-white/20"><GlitchText text="Gear" /></span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPMENT.map((item, i) => (
              <div
                key={i}
                className="equip-item p-8 border border-white/5 bg-white/[0.02] rounded-2xl hover:border-matrix/30 transition-colors group"
              >
                <span className="font-mono text-matrix/30 text-4xl font-bold block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl md:text-2xl uppercase tracking-wider group-hover:text-matrix transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Update */}
      <section className="px-6 md:px-20 py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display uppercase tracking-tighter mb-8 leading-[0.9]">
            <GlitchText text="Initiate" /> <br />
            <span className="text-matrix"><GlitchText text="Collaboration" /></span>
          </h2>
          <p className="text-white/40 font-body text-base md:text-lg max-w-xl mx-auto mb-12 px-4 md:px-0">
            Ready to deploy cinematic excellence? Let's architect your brand's next viral moment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton>
              <a
                href="/#contact"
                className="px-10 py-4 bg-matrix text-black font-display text-xl uppercase tracking-widest rounded-full hover:bg-white transition-colors flex items-center gap-3"
              >
                Get in Touch <ArrowRight size={20} />
              </a>
            </MagneticButton>

            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 hover:text-matrix transition-colors" data-cursor-text="INSTA">
                <Instagram size={22} />
              </a>
              <a href="#" className="text-white/40 hover:text-matrix transition-colors" data-cursor-text="LINKEDIN">
                <Linkedin size={22} />
              </a>
              <a href="#" className="text-white/40 hover:text-matrix transition-colors" data-cursor-text="EMAIL">
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
