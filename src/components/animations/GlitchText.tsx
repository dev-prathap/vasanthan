"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface GlitchTextProps {
  /** The final resolved text */
  text: string;
  /** HTML tag. Default: "span" */
  as?: keyof JSX.IntrinsicElements;
  /** Additional className */
  className?: string;
  /** Trigger on scroll (true) or on mount (false). Default: true */
  scrollTrigger?: boolean;
  /** Trigger on hover. Default: false */
  hoverTrigger?: boolean;
  /** Duration of the scramble in ms. Default: 1500 */
  duration?: number;
  /** Characters to scramble with. Default: matrix-style chars */
  charset?: string;
  /** Speed of character cycling in ms. Default: 40 */
  speed?: number;
  /** Glitch color flash. Default: "#00ff41" (matrix green) */
  glitchColor?: string;
  /** Whether to add CSS glitch flicker overlay. Default: true */
  flicker?: boolean;
}

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?/<>[]{}";

/**
 * GlitchText — Matrix-style text scramble/reveal animation
 *
 * Characters cycle through random glyphs before settling to the final text.
 * Can be triggered on scroll, on mount, or on hover.
 *
 * Usage:
 *   <GlitchText text="VASANTHAN" className="text-6xl font-display" />
 *   <GlitchText text="Loading..." hoverTrigger scrollTrigger={false} />
 */
export const GlitchText = ({
  text,
  as: Tag = "span",
  className,
  scrollTrigger: useScrollTrigger = true,
  hoverTrigger = false,
  duration = 1500,
  speed = 40,
  charset = DEFAULT_CHARSET,
  glitchColor = "#00ff41",
  flicker = true,
}: GlitchTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState(useScrollTrigger ? "" : text);
  const [isGlitching, setIsGlitching] = useState(false);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasPlayed = useRef(false);

  const scramble = useCallback(() => {
    if (animationRef.current) clearInterval(animationRef.current);

    setIsGlitching(true);
    const chars = text.split("");
    const totalChars = chars.length;
    const revealOrder = Array.from({ length: totalChars }, (_, i) => i);

    // Randomize reveal order
    for (let i = revealOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [revealOrder[i], revealOrder[j]] = [revealOrder[j], revealOrder[i]];
    }

    const resolved = new Array(totalChars).fill(false);
    const startTime = Date.now();

    animationRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Determine how many characters should be resolved
      const resolvedCount = Math.floor(progress * totalChars);

      // Reveal characters in random order
      for (let i = 0; i < resolvedCount; i++) {
        resolved[revealOrder[i]] = true;
      }

      // Build display string
      const display = chars
        .map((char, idx) => {
          if (char === " ") return " ";
          if (resolved[idx]) return char;
          return charset[Math.floor(Math.random() * charset.length)];
        })
        .join("");

      setDisplayText(display);

      if (progress >= 1) {
        if (animationRef.current) clearInterval(animationRef.current);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, speed);
  }, [text, duration, speed, charset]);

  // Scroll trigger
  useEffect(() => {
    if (!useScrollTrigger || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => {
        if (!hasPlayed.current) {
          hasPlayed.current = true;
          scramble();
        }
      },
    });

    return () => {
      trigger.kill();
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [useScrollTrigger, scramble]);

  // Mount trigger (no scroll)
  useEffect(() => {
    if (useScrollTrigger || hoverTrigger) return;
    scramble();
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [useScrollTrigger, hoverTrigger, scramble]);

  const handleMouseEnter = () => {
    if (hoverTrigger) {
      scramble();
    }
  };

  const Component = Tag as React.ElementType;

  return (
    <div
      ref={containerRef}
      className="inline-block relative"
      onMouseEnter={handleMouseEnter}
    >
      <Component
        className={`${className || ""} ${isGlitching ? "select-none" : ""}`}
        style={{
          color: isGlitching ? glitchColor : undefined,
          transition: "color 0.3s ease",
        }}
      >
        {displayText || text}
      </Component>

      {/* CSS Glitch flicker overlay */}
      {flicker && isGlitching && (
        <>
          <Component
            className={`${className || ""} absolute inset-0 pointer-events-none`}
            style={{
              color: glitchColor,
              clipPath: "inset(20% 0 40% 0)",
              transform: "translate(-2px, 1px)",
              opacity: 0.7,
            }}
            aria-hidden
          >
            {displayText}
          </Component>
          <Component
            className={`${className || ""} absolute inset-0 pointer-events-none`}
            style={{
              color: "#ff007a",
              clipPath: "inset(60% 0 10% 0)",
              transform: "translate(2px, -1px)",
              opacity: 0.5,
            }}
            aria-hidden
          >
            {displayText}
          </Component>
        </>
      )}
    </div>
  );
};
