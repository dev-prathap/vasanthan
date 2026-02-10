"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Smartphone, Eye, Zap, Instagram } from "lucide-react";
import { ManagedVideo } from "@/components/ui/ManagedVideo";

gsap.registerPlugin(ScrollTrigger);

// Use real vertical reels instead of project data
const REEL_VIDEOS = [
  { id: "reel-1", title: "Football Plus Academy", category: "Sports Videography", views: "1.4M", videoUrl: "/videos/reels/reel-1.mp4" },
  { id: "reel-2", title: "Vasi Yoga Astrology", category: "Viral Reels", views: "1M", videoUrl: "/videos/reels/reel-2.mp4" },
  { id: "reel-3", title: "Fitness Motivation", category: "Viral Vertical", views: "850K", videoUrl: "/videos/reels/reel-3.mp4" },
  { id: "reel-4", title: "Brazil Legends Recap", category: "Event Coverage", views: "500K", videoUrl: "/videos/reels/reel-4.mp4" },
  { id: "reel-5", title: "Brand Promo Edit", category: "Commercial", views: "320K", videoUrl: "/videos/reels/reel-5.mp4" },
];

export const VerticalReels = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const scrollContainer = scrollRef.current!;
      const totalSlides = scrollContainer.children.length;
      const scrollDistance = scrollContainer.scrollWidth - window.innerWidth;

      // Horizontal scroll pinned section
      gsap.to(scrollContainer, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          pinSpacing: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (totalSlides - 1),
            duration: { min: 0.15, max: 0.4 },
            delay: 0,
            ease: "power1.inOut",
          },
        },
      });

      // View count counting animation (scoped to this container)
      const viewCounts = containerRef.current!.querySelectorAll(".view-count");
      if (viewCounts.length > 0) {
        gsap.from(viewCounts, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
          },
          innerHTML: 0,
          duration: 2,
          snap: { innerHTML: 1 },
          stagger: 0.2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen bg-space overflow-hidden flex items-center"
      data-cursor-text="SCROLL"
    >
      {/* Background Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[1px] border-white/5 rounded-full pointer-events-none" />
      
      <div className="flex h-[80vh] px-[10vw] gap-[5vw]" ref={scrollRef}>
        {/* Intro Slide */}
        <div className="reel-card min-w-[40vw] flex flex-col justify-center" id="services">
          <h4 className="font-mono text-matrix text-xs tracking-[0.5em] uppercase mb-6 flex items-center gap-2">
            <Zap size={14} /> Phase 04 // Viral Pulse
          </h4>
          <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter leading-none">
            The <br /> 
            <span className="text-white/20">9:16</span> <br /> 
            Revolution.
          </h2>
          <p className="mt-8 text-white/40 font-body text-lg max-w-sm leading-relaxed">
            optimized for the finite attention span. 300+ vertical edits that have generated millions of organic views across Instagram and TikTok.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-4xl font-display text-white">1.4M+</span>
              <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest text-center">Peak Views</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-4xl font-display text-white">300+</span>
              <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest text-center">Videos Delivered</span>
            </div>
          </div>
        </div>

        {/* Dynamic Reels Slides */}
        {REEL_VIDEOS.map((reel) => (
          <div 
            key={reel.id} 
            className="reel-card min-w-[30vw] h-full relative group rounded-[2rem] overflow-hidden border border-white/10"
            data-cursor-text="PLAY"
          >
            <ManagedVideo
              videoId={reel.id}
              className="w-full h-full object-cover"
              src={reel.videoUrl}
              wrapperClassName="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            
            {/* View Counter Badge */}
            <div className="absolute top-8 right-8 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
              <Eye size={12} className="text-matrix" />
              <span className="font-mono text-[10px] text-white tracking-widest view-count">
                {reel.views}
              </span>
            </div>

            {/* Title & Smartphone Icon */}
            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex items-center gap-3 mb-2">
                <Smartphone size={16} className="text-white/40" />
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">
                  {reel.category}
                </span>
              </div>
              <h3 className="text-3xl font-display uppercase text-white group-hover:text-matrix transition-colors">
                {reel.title}
              </h3>
            </div>

            {/* Action Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-16 h-16 rounded-full bg-matrix flex items-center justify-center text-black">
                  <Instagram size={30} />
               </div>
            </div>
          </div>
        ))}

        {/* Final CTA Slide */}
        <div className="reel-card min-w-[30vw] flex flex-col justify-center items-center text-center">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-8 animate-spin-slow">
               <Zap size={40} className="text-matrix" />
            </div>
            <h3 className="text-4xl font-display uppercase mb-4">Ready to go Viral?</h3>
            <button className="px-8 py-3 bg-white text-black font-display text-xl uppercase tracking-widest rounded-full hover:bg-matrix transition-all">
              Book a Strategy Call
            </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  );
};
