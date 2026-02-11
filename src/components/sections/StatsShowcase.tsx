"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Film, Eye, Calendar, Users } from "lucide-react";
import { GlitchText } from "@/components/animations/GlitchText";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Assets Deployed", value: "300", suffix: "+", icon: <Film className="text-matrix" /> },
  { label: "Visual Impressions", value: "1.4", suffix: "M+", icon: <Eye className="text-matrix" /> },
  { label: "Ops Cycle (Mo)", value: "6", suffix: "", icon: <Calendar className="text-matrix" /> },
  { label: "Strategic Partners", value: "3", suffix: "", icon: <Users className="text-matrix" /> }
];

export const StatsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      const counterEls = gsap.utils.toArray(".stat-number");
      counterEls.forEach((el: any) => {
        const value = el.getAttribute("data-value");
        gsap.from(el, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          innerHTML: 0,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: value.includes(".") ? 0.1 : 1 },
        });
      });

      // Progress bars
      gsap.from(".progress-fill", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <section 
      ref={containerRef}
      data-cursor-text="STATS"
      className="py-32 bg-black overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="font-mono text-matrix text-xs tracking-[0.5em] uppercase mb-4">
            <GlitchText text="Phase 03 // Scale Protocol" />
          </h4>
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter">
            <GlitchText text="The" /> <span className="text-white/20"><GlitchText text="Kinetic" /></span> <GlitchText text="Arsenal" />
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center mb-32">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-6 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                {stat.icon}
              </div>
              <div className="flex items-baseline gap-1">
                <span 
                  className="stat-number text-6xl md:text-8xl font-display text-white tracking-tighter"
                  data-value={stat.value}
                >
                  {stat.value}
                </span>
                <span className="text-2xl md:text-3xl font-display text-matrix">{stat.suffix}</span>
              </div>
              <p className="mt-2 font-mono text-[8px] md:text-[10px] text-white/40 uppercase tracking-[0.4em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Secondary Stats: Progress Bars */}
        <div className="max-w-4xl mx-auto space-y-12">
          {[
            { label: "Client Satisfaction", value: "100%", color: "bg-matrix" },
            { label: "On-Time Delivery", value: "95%", color: "bg-blue-500" },
            { label: "Viral Intent Accuracy", value: "88%", color: "bg-viral" }
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <div className="flex justify-between items-end px-2">
                <span className="font-display text-2xl uppercase tracking-widest">{item.label}</span>
                <span className="font-mono text-matrix italic">{item.value}</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`progress-fill h-full ${item.color} rounded-full`}
                  style={{ width: item.value }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
