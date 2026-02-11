"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Milestone, Calendar, TrendingUp, Award } from "lucide-react";
import { GlitchText } from "@/components/animations/GlitchText";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2023",
    title: "The Genesis",
    desc: "Started professional editing journey. Focused on local content and brand storytelling.",
    icon: <Calendar className="text-matrix" />,
    stat: "50+ VIDEOS",
    image: "/images/timeline/early-editing.jpg"
  },
  {
    year: "2024 (MAY)",
    title: "Viral Spark",
    desc: "The Yoga-Astrology Reel hit 1M views in 7 days. Viral content architecture begins.",
    icon: <TrendingUp className="text-matrix" />,
    stat: "1M VIEWS",
    image: "/images/timeline/first-camera-work.jpg"
  },
  {
    year: "2024 (AUG)",
    title: "The Arena",
    desc: "Collaborated with Football Plus Academy. Crafted the 1.4M view sports promo.",
    icon: <Award className="text-matrix" />,
    stat: "ELITE SPORTS",
    image: "/images/timeline/brazil-legends-team.jpg"
  },
  {
    year: "2024 (OCT)",
    title: "Global Legacy",
    desc: "Covered the Brazil Legends Match. 300+ videos delivered. The journey continues.",
    icon: <Milestone className="text-matrix" />,
    stat: "300+ DELIVERED",
    image: "/images/timeline/stadium-pass.jpg"
  }
];

export const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line growth
      gsap.to(".timeline-line", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      // Milestone stagger
      gsap.from(".milestone-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-6 md:px-20 bg-black overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h4 className="font-mono text-matrix text-xs tracking-[0.5em] uppercase mb-6">
              <GlitchText text="Phase 06 // Legacy" />
            </h4>
            <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter">
              <GlitchText text="The Journey" /> <br /> <span className="text-white/20"><GlitchText text="of 300 Frames." /></span>
            </h2>
          </div>
          <p className="text-white/40 font-body text-xl max-w-sm">
            Consistency meets viral potential. A roadmap of precision and millions of views.
          </p>
        </div>

        {/* The Timeline Line */}
        <div className="hidden md:block relative w-full h-[1px] bg-white/10 mb-20 origin-left timeline-line scale-x-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative">
          {/* Vertical Timeline Line for Mobile */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-[1px] bg-white/10" />

          {MILESTONES.map((item, i) => (
            <div key={i} className="milestone-card relative group pl-12 md:pl-0">
              {/* Connector Dot */}
              <div className="absolute top-2 left-3 md:-top-[84px] md:left-0 w-3 h-3 rounded-full bg-white group-hover:bg-matrix group-hover:scale-150 transition-all z-10" />
              
              {/* Milestone Image */}
              <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-matrix/30 transition-all">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <span className="font-mono text-matrix text-sm tracking-widest mb-4 block">
                {item.year}
              </span>
              <div className="flex items-center gap-3 mb-4">
                {item.icon}
                <h3 className="text-xl md:text-2xl font-display uppercase text-white group-hover:text-matrix transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-white/40 font-body text-sm leading-relaxed mb-6">
                {item.desc}
              </p>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                 <span className="font-mono text-[8px] text-matrix uppercase tracking-widest block mb-1">Checkpoint</span>
                 <span className="text-lg md:text-xl font-display uppercase">{item.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
