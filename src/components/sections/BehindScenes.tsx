"use client";

import React, { useEffect, useRef } from "react";
import { Scene3D } from "@/components/3d/Scene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { GlitchText } from "@/components/animations/GlitchText";

gsap.registerPlugin(ScrollTrigger);

export const BehindScenes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-black flex flex-col md:grid md:grid-cols-2 overflow-hidden border-t border-white/5"
    >
      {/* Left: Content */}
      <div 
        ref={textRef}
        className="flex flex-col justify-center px-6 md:px-20 z-10 py-20 md:py-0"
      >
        <h4 className="font-mono text-matrix text-xs tracking-[0.5em] uppercase mb-6">
          <GlitchText text="Phase 08 // Workflow" />
        </h4>
        <h2 className="text-4xl md:text-7xl font-display uppercase tracking-tighter leading-[0.9]">
          <GlitchText text="Behind the" /> <br /> 
          <span className="text-white/20"><GlitchText text="Timeline" /></span>
        </h2>
        
        <p className="mt-8 text-white/40 font-body text-base md:text-lg max-w-md">
          Editing is not just cutting clips. It&apos;s about rhythm, color science, and spatial storytelling. Every project is crafted in a 3D-optimized environment to ensure surgical precision.
        </p>

        <div className="mt-12 flex flex-col gap-6">
          {[
            { label: "Hardware", value: "3D Optimized Workstation" },
            { label: "Software", value: "Premiere Pro + After Effects" },
            { label: "Color", value: "DaVinci Resolve Monitoring" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-mono text-[8px] text-matrix uppercase tracking-widest">{item.label}</span>
              <span className="font-display text-lg md:text-xl uppercase text-white/80">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: 3D Visualization */}
      <div 
        className="relative h-[50vh] md:h-full w-full"
        data-cursor-text="EXPLORE"
      >
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>
        
        {/* Subtle UI Overlay in 3D Space */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[400px] h-[400px] border border-matrix/10 rounded-full animate-pulse-glow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[200px] h-[200px] border border-matrix/5 rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>

      {/* Corner Stats */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <p className="font-mono text-[8px] text-white/20 uppercase tracking-[0.5em]">
          RENDER STATUS: ACTIVE <br />
          GPU USAGE: 84% <br />
          LATENCY: 1.2ms
        </p>
      </div>
    </section>
  );
};
