"use client";

import React, { useEffect, useRef } from "react";
import { PROJECTS } from "@/types/project";
import { ProjectCard } from "@/components/ui/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Staggered Cards Entry
      gsap.from(".project-card-trigger", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-32 px-4 md:px-10 bg-black overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-matrix/5 blur-[150px] -z-10" />
      
      <div ref={titleRef} id="work" className="max-w-[1400px] mx-auto mb-20 text-center md:text-left">
        <h2 className="text-sm font-mono text-matrix tracking-[0.5em] uppercase mb-4">
          Phase 02 // Showcase
        </h2>
        <h3 className="text-5xl md:text-7xl font-display uppercase tracking-tighter">
          Viral Content <br /> <span className="text-white/20">Portfolio</span>
        </h3>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
        {PROJECTS.map((project) => (
          <div key={project.id} className="project-card-trigger col-span-12 md:col-span-12 lg:contents">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <button className="group relative px-8 py-4 bg-transparent border border-white/20 hover:border-matrix rounded-full overflow-hidden transition-all">
          <span className="relative z-10 font-mono text-xs uppercase tracking-widest group-hover:text-black transition-colors">
            View All Projects
          </span>
          <div className="absolute inset-0 bg-matrix translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </section>
  );
};
