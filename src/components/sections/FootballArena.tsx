"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Trophy, Target, Play, ShieldCheck } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ManagedVideo } from "@/components/ui/ManagedVideo";

gsap.registerPlugin(ScrollTrigger);

export const FootballArena = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the video cards
      gsap.to(".football-card", {
        y: (i) => -150 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Stats reveal
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] py-40 px-6 md:px-20 overflow-hidden"
    >
      {/* Stadium Light Effect */}
      <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-full h-full bg-matrix/5 blur-[200px] rounded-full" />
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-12 items-center">
        {/* Left: Content */}
        <div className="col-span-12 lg:col-span-6 z-10">
          <h4 className="font-mono text-matrix text-xs tracking-[0.5em] uppercase mb-8 flex items-center gap-2">
            <Trophy size={14} /> Phase 05 // Sports Specialist
          </h4>
          <h2 className="text-6xl md:text-9xl font-display uppercase tracking-tighter leading-[0.8] italic">
            THE <br /> 
            <span className="text-white/10">STADIUM</span> <br /> 
            FEEL.
          </h2>
          <p className="mt-8 text-white/40 font-body text-xl max-w-md leading-relaxed">
            From the Brazil Legends match to the Football Plus Academy, I capture the raw energy of the pitch. High-frame-rate tracking and sports-sync editing.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-12">
            {[
              { label: "Viral Record", value: "1.4M VIEWS", icon: <Target className="text-matrix" /> },
              { label: "Elite Partners", value: "BRAZIL LEGENDS", icon: <ShieldCheck className="text-matrix" /> }
            ].map((stat, i) => (
              <div key={i} className="stat-item flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {stat.icon}
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{stat.label}</span>
                </div>
                <span className="text-3xl font-display text-white">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <MagneticButton>
              <button className="flex items-center gap-4 group">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-matrix group-hover:border-matrix transition-all">
                   <Play size={20} className="group-hover:text-black fill-current" />
                </div>
                <span className="font-display text-2xl uppercase tracking-widest group-hover:text-matrix">Watch Stadium Showreel</span>
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Right: Immersive Video Stack */}
        <div className="col-span-12 lg:col-span-6 relative min-h-[700px] lg:h-[900px] mt-12 lg:mt-0" ref={videoStackRef}>
          <div className="football-card absolute top-0 lg:right-0 right-4 w-[75%] md:w-[60%] lg:w-[70%] aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-30">
            <ManagedVideo videoId="football-1" className="w-full h-full object-cover" src="/videos/football/clip-2.mp4" wrapperClassName="w-full h-full" />
            <div className="absolute bottom-6 left-6 z-40 bg-matrix px-3 py-1 text-black font-mono text-[10px] uppercase tracking-widest font-bold">
               Sports Videography
            </div>
          </div>
          <div className="football-card absolute top-1/4 left-4 lg:left-0 w-[65%] md:w-[50%] lg:w-[65%] aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20 grayscale hover:grayscale-0 transition-all duration-700">
             <ManagedVideo videoId="football-2" className="w-full h-full object-cover" src="/videos/football/clip-3.mp4" wrapperClassName="w-full h-full" />
             <div className="absolute bottom-6 left-6 z-40 bg-white px-3 py-1 text-black font-mono text-[10px] uppercase tracking-widest font-bold">
               Football Plus Academy
            </div>
          </div>
          <div className="football-card absolute top-1/2 right-4 lg:right-12 w-[55%] md:w-[45%] lg:w-[60%] aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10">
             <ManagedVideo videoId="football-3" className="w-full h-full object-cover" src="/videos/football/clip-1.mp4" wrapperClassName="w-full h-full" />
             <div className="absolute bottom-6 left-6 z-40 bg-matrix/20 backdrop-blur-md px-3 py-1 text-white font-mono text-[10px] uppercase tracking-widest font-bold border border-white/10">
               Brazil Legends Event
            </div>
          </div>
        </div>
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
    </section>
  );
};
