"use client";

import React, { useRef, useState } from "react";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import gsap from "gsap";

import Link from "next/link";

export const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
    gsap.to(cardRef.current, { scale: 0.98, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
    gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
  };

  const sizeClasses = {
    small: "col-span-12 md:col-span-4 h-[300px]",
    medium: "col-span-12 md:col-span-6 lg:col-span-4 h-[400px]",
    large: "col-span-12 md:col-span-8 h-[600px]",
    wide: "col-span-12 h-[400px]",
  };

  return (
    <Link 
      href={`/work/${project.id}`}
      data-cursor-text="VIEW"
      className={cn(
        "relative rounded-3xl overflow-hidden group bg-space border border-white/5 cursor-pointer block",
        sizeClasses[project.size]
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="h-full w-full"
      >
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          style={{ viewTransitionName: `project-video-${project.id}` } as any}
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 ease-out",
            isHovered ? "scale-110" : "scale-100"
          )}
          src={project.videoUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-matrix/20 border border-matrix/30 text-matrix text-[10px] font-mono tracking-widest uppercase rounded">
            {project.category}
          </span>
          <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">
            {project.views}
          </span>
        </div>
        
        <h3 className="text-2xl font-display uppercase tracking-wider text-white group-hover:text-matrix transition-colors">
          {project.title}
        </h3>
        
        {/* Animated Line */}
        <div className="w-0 group-hover:w-full h-[1px] bg-matrix mt-4 transition-all duration-500 ease-in-out" />
      </div>

      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};
