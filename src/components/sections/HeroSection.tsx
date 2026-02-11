"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ManagedVideo } from "@/components/ui/ManagedVideo";
import { GlitchText } from "@/components/animations/GlitchText";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Reduced for better sync
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Zoom transition
      tl.to("#hero-mask-text", {
        scale: 50,
        transformOrigin: "center center",
        ease: "power2.inOut",
      }, 0);

      tl.to("#hero-mask-rect", {
        opacity: 0,
        duration: 0.5,
      }, 0.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} data-cursor-text="EXPLORE" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Layer 1: Background Video - click to unmute */}
      <div className="absolute inset-0 z-0">
        <ManagedVideo
          videoId="hero-showreel"
          className="h-full w-full object-cover"
          src="/SHOW_REEL_2.mp4"
          hideIndicator
          wrapperClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Layer 2: SVG Video Mask */}
      <svg className="absolute inset-0 z-10 w-full h-full pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="hero-mask">
            <rect width="1000" height="1000" fill="white" />
            <text
              id="hero-mask-text"
              x="500"
              y="500"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-display font-black uppercase"
              fill="black"
              style={{ 
                fontSize: 'clamp(80px, 15vw, 150px)',
                fontFamily: 'var(--font-display), "Bebas Neue", sans-serif'
              }}
            >
              VASANTHAN
            </text>
          </mask>
        </defs>
        <rect id="hero-mask-rect" width="1000" height="1000" fill="black" mask="url(#hero-mask)" />
      </svg>

      {/* Layer 3: Secondary Content */}
      <div className="absolute bottom-10 left-6 md:left-10 z-20 flex flex-col gap-2 max-w-[80vw] md:max-w-none">
        <div className="flex flex-col">
            <p className="font-mono text-matrix text-[8px] md:text-[10px] tracking-[0.5em] uppercase">
                Phase 01 // Origin
            </p>
            <p className="font-mono text-white/30 text-[7px] md:text-[8px] tracking-[0.2em] uppercase">
                Viral Content Architect
            </p>
        </div>
        <h2 className="font-display text-3xl md:text-5xl leading-none uppercase">
          <GlitchText text="Architecting" /> <br /> 
          <GlitchText text="Viral Reality." />
        </h2>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex flex-col items-center gap-4">
        <div className="w-[1px] h-[40px] md:h-[60px] bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-matrix animate-pulse" />
        </div>
        <p className="font-mono text-[7px] md:text-[8px] uppercase tracking-widest vertical-text opacity-40">
          Scroll to Explore
        </p>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
};
