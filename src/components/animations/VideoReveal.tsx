"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type MaskShape = "circle" | "horizontal" | "vertical" | "diamond" | "diagonal";

interface VideoRevealProps {
  /** Video source URL */
  src: string;
  /** Poster image fallback */
  poster?: string;
  /** Mask reveal shape. Default: "circle" */
  shape?: MaskShape;
  /** Additional className for the container */
  className?: string;
  /** Height of the section. Default: "100vh" */
  height?: string;
  /** ScrollTrigger start. Default: "top center" */
  start?: string;
  /** ScrollTrigger end. Default: "bottom center" */
  end?: string;
  /** Whether to scrub the reveal with scroll. Default: true */
  scrub?: boolean;
  /** Overlay content on top of the video */
  children?: React.ReactNode;
  /** Overlay gradient direction. Default: "to-t" */
  overlayDirection?: string;
}

/**
 * VideoReveal — Scroll-triggered video reveal with mask animation
 *
 * The video is hidden behind a mask that expands/wipes on scroll,
 * creating a cinematic reveal effect.
 *
 * Usage:
 *   <VideoReveal src="/videos/showreel.mp4" shape="circle">
 *     <h2>My Content</h2>
 *   </VideoReveal>
 */
export const VideoReveal = ({
  src,
  poster,
  shape = "circle",
  className,
  height = "100vh",
  start = "top center",
  end = "bottom center",
  scrub = true,
  children,
  overlayDirection = "to-t",
}: VideoRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = videoWrapperRef.current;
    const video = videoRef.current;
    if (!container || !wrapper || !video) return;

    // Initial clip-path state based on shape
    const clips = getMaskClips(shape);
    gsap.set(wrapper, { clipPath: clips.from });

    const ctx = gsap.context(() => {
      // Main reveal animation
      gsap.to(wrapper, {
        clipPath: clips.to,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: container,
          start,
          end,
          scrub: scrub ? 1 : false,
          onEnter: () => {
            video.play().catch(() => {});
          },
          onLeaveBack: () => {
            video.pause();
          },
        },
      });

      // Subtle parallax on the video
      gsap.to(video, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, container);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ height }}
    >
      {/* Video wrapper with mask */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 overflow-hidden"
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
          src={src}
        />
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-${overlayDirection} from-black/80 via-transparent to-transparent pointer-events-none`}
        />
      </div>

      {/* Border frame when mask is active */}
      <div className="absolute inset-4 md:inset-8 border border-white/5 rounded-3xl pointer-events-none z-10" />

      {/* Content overlay */}
      {children && (
        <div className="relative z-20 flex items-center justify-center h-full">
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * Returns from/to clip-path strings for each mask shape
 */
function getMaskClips(shape: MaskShape): { from: string; to: string } {
  switch (shape) {
    case "circle":
      return {
        from: "circle(0% at 50% 50%)",
        to: "circle(75% at 50% 50%)",
      };
    case "horizontal":
      return {
        from: "inset(0 50% 0 50%)",
        to: "inset(0 0% 0 0%)",
      };
    case "vertical":
      return {
        from: "inset(50% 0 50% 0)",
        to: "inset(0% 0 0% 0)",
      };
    case "diamond":
      return {
        from: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        to: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      };
    case "diagonal":
      return {
        from: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        to: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      };
    default:
      return {
        from: "circle(0% at 50% 50%)",
        to: "circle(75% at 50% 50%)",
      };
  }
}
