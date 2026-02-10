"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  { name: "Football Plus", logo: "/images/clients/football-plus.png" },
  { name: "Vels F.C.", logo: "/images/clients/vels-fc.png" },
  { name: "Cake Square", logo: "/images/clients/cake-square.png" },
  { name: "Wonkrew", logo: "/images/clients/wonkrew.png" },
  { name: "GMW", logo: "/images/clients/gmw.png" },
  { name: "Fluent French", logo: "/images/clients/fluent-french.png" },
  { name: "SBBS", logo: "/images/clients/sbbs.png" },
  { name: "SPR Living", logo: "/images/clients/spr-living.png" },
  { name: "Gaming Studio", logo: "/images/clients/gaming-studio.png" },
  { name: "BigNBash Events", logo: "/images/clients/bignbash-events.png" },
  { name: "Directions", logo: "/images/clients/directions.png" },
  { name: "Z1 Study Abroad", logo: "/images/clients/z1-study-abroad.png" },
];

export const ClientWall = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const logos = gridRef.current.querySelectorAll(".logo-item");
    if (logos.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(logos, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      data-cursor-text="TRUST"
      className="py-32 bg-black border-y border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-6" id="about">
        <div className="text-center mb-16">
          <h4 className="font-mono text-matrix text-xs tracking-[0.5em] uppercase mb-4">
            Phase 07 // Legitimacy
          </h4>
          <h2 className="text-4xl md:text-6xl font-display uppercase">
            Brands <span className="text-white/20">&</span> Creators
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center">
          {CLIENTS.map((client, i) => (
            <div 
              key={i} 
              className="logo-item group flex flex-col items-center gap-3"
            >
              <div className="relative w-32 h-32 rounded-2xl bg-white overflow-hidden group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(0,255,65,0.15)] transition-all duration-500">
                <Image 
                  src={client.logo} 
                  alt={client.name}
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest text-center group-hover:text-matrix transition-colors">
                {client.name}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial Highlight */}
        <div className="mt-32 max-w-4xl mx-auto text-center">
            <div className="w-12 h-1 bg-matrix mx-auto mb-8" />
            <p className="text-2xl md:text-4xl font-display uppercase leading-tight italic">
              &quot;Vasanthan transformed our vision into a viral sensation. His understanding of sports storytelling is unmatched.&quot;
            </p>
            <div className="mt-8">
              <span className="block font-display text-xl text-white">Coach Ramesh</span>
              <span className="block font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
                Founder, Football Plus Academy
              </span>
            </div>
        </div>
      </div>
    </section>
  );
};
