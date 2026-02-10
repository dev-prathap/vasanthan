"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(3);
  const [loadingText, setLoadingText] = useState("LOADING ASSETS");
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressInnerRef = useRef<HTMLDivElement>(null);
  const { progress } = useProgress(); // Track 3D assets loading

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Final curtain rise
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      },
    });

    // 1. Film Countdown (3... 2... 1...)
    tl.to({}, { duration: 0.8, onStart: () => setCount(3) })
      .to({}, { duration: 0.8, onStart: () => setCount(2) })
      .to({}, { duration: 0.8, onStart: () => setCount(1) });

    // 2. Progress Phase
    tl.to({}, { 
      duration: 2, 
      onStart: () => setLoadingText("RENDERING TIMELINE"),
      onUpdate: function() {
        const p = Math.round(this.progress() * 100);
        if (progressInnerRef.current) {
          progressInnerRef.current.style.width = `${p}%`;
        }
        const percentEl = document.getElementById("progress-percent");
        if (percentEl) percentEl.innerText = `${p}%`;
      }
    });

    tl.to({}, { duration: 0.1, onStart: () => setLoadingText("SYNCING FRAMES") });
    tl.to({}, { duration: 0.5, onStart: () => setLoadingText("ACTION!") });

  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />

      {/* Countdown Number */}
      <div className="relative z-20 overflow-hidden h-[200px] flex items-center">
        <span className="text-[150px] font-display text-white animate-glitch-text">
          {count}
        </span>
      </div>

      {/* Progress Container */}
      <div className="mt-12 w-[300px] flex flex-col items-center gap-4">
        <div className="w-full flex justify-between items-end mb-1">
          <p className="text-[10px] font-mono tracking-[0.3em] text-matrix uppercase">
            {loadingText}
          </p>
          <p id="progress-percent" className="text-[10px] font-mono text-white/50">0%</p>
        </div>
        
        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
          <div
            ref={progressInnerRef}
            className="absolute top-0 left-0 h-full bg-matrix shadow-[0_0_15px_#00FF41]"
          />
        </div>
        
        <div className="mt-4 flex flex-col items-center gap-1">
          <p className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">
             Vasanthan Portfolio // System Boot
          </p>
        </div>
      </div>

      {/* Film Grain (SVG Overlay) */}
      <svg className="hidden">
        <filter id="noise">
          <feTurbulence baseFrequency="0.7,0.8" seed="0" type="fractalNoise">
            <animate attributeName="seed" dur="1s" repeatCount="indefinite" values="0;100" />
          </feTurbulence>
          <feColorMatrix values="0 0 0 9 0 0 0 0 9 0 0 0 0 9 0 0 0 0 1 0" />
        </filter>
      </svg>
    </div>
  );
};
