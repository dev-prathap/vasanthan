"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = "up" | "down" | "left" | "right" | "none";
type RevealPreset = "fade" | "slide" | "scale" | "clip" | "rotate" | "blur";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Animation preset. Default: "fade" */
  preset?: RevealPreset;
  /** Direction for slide/clip animations. Default: "up" */
  direction?: RevealDirection;
  /** Animation duration in seconds. Default: 1 */
  duration?: number;
  /** Delay in seconds. Default: 0 */
  delay?: number;
  /** Stagger children elements (pass a CSS selector). Default: undefined */
  stagger?: string;
  /** Stagger delay between children. Default: 0.1 */
  staggerDelay?: number;
  /** ScrollTrigger start position. Default: "top 85%" */
  start?: string;
  /** ScrollTrigger end position (for scrub). Default: undefined */
  end?: string;
  /** Whether animation is scrubbed to scroll. Default: false */
  scrub?: boolean;
  /** Whether animation plays once or every time. Default: true (once) */
  once?: boolean;
  /** Additional className */
  className?: string;
  /** HTML tag to render. Default: "div" */
  as?: keyof React.JSX.IntrinsicElements;
 }

export const ScrollReveal = ({
  children,
  preset = "fade",
  direction = "up",
  duration = 1,
  delay = 0,
  stagger,
  staggerDelay = 0.1,
  start = "top 85%",
  end,
  scrub = false,
  once = true,
  className,
  as: Tag = "div",
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? el.querySelectorAll(stagger) : el;

    // Build "from" vars based on preset + direction
    const fromVars: gsap.TweenVars = {};
    const toVars: gsap.TweenVars = {
      duration,
      delay,
      ease: "power3.out",
    };

    // Direction offsets
    const offset = 60;
    const dirMap: Record<RevealDirection, { x?: number; y?: number }> = {
      up: { y: offset },
      down: { y: -offset },
      left: { x: offset },
      right: { x: -offset },
      none: {},
    };

    switch (preset) {
      case "fade":
        fromVars.opacity = 0;
        fromVars.y = dirMap[direction].y ?? 0;
        fromVars.x = dirMap[direction].x ?? 0;
        toVars.opacity = 1;
        toVars.y = 0;
        toVars.x = 0;
        break;

      case "slide":
        fromVars.opacity = 0;
        fromVars.y = dirMap[direction].y ?? 0;
        fromVars.x = dirMap[direction].x ?? 0;
        toVars.opacity = 1;
        toVars.y = 0;
        toVars.x = 0;
        toVars.ease = "power4.out";
        break;

      case "scale":
        fromVars.opacity = 0;
        fromVars.scale = 0.8;
        toVars.opacity = 1;
        toVars.scale = 1;
        toVars.ease = "back.out(1.7)";
        break;

      case "clip":
        // Clip-path reveal
        {
          const clipDirections: Record<RevealDirection, { from: string; to: string }> = {
            up: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
            down: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
            left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
            right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
            none: { from: "inset(50% 50% 50% 50%)", to: "inset(0% 0% 0% 0%)" },
          };
          fromVars.clipPath = clipDirections[direction].from;
          toVars.clipPath = clipDirections[direction].to;
          toVars.ease = "power4.inOut";
        }
        break;

      case "rotate":
        fromVars.opacity = 0;
        fromVars.rotateX = direction === "up" || direction === "down" ? 30 : 0;
        fromVars.rotateY = direction === "left" || direction === "right" ? 30 : 0;
        fromVars.y = dirMap[direction].y ?? 0;
        toVars.opacity = 1;
        toVars.rotateX = 0;
        toVars.rotateY = 0;
        toVars.y = 0;
        toVars.ease = "power3.out";
        break;

      case "blur":
        fromVars.opacity = 0;
        fromVars.filter = "blur(20px)";
        fromVars.y = dirMap[direction].y ?? 0;
        toVars.opacity = 1;
        toVars.filter = "blur(0px)";
        toVars.y = 0;
        break;
    }

    // ScrollTrigger config
    const scrollConfig: ScrollTrigger.Vars = {
      trigger: el,
      start,
      toggleActions: once ? "play none none none" : "play reverse play reverse",
    };
    if (end) scrollConfig.end = end;
    if (scrub) {
      scrollConfig.scrub = typeof scrub === "boolean" ? 1 : scrub;
      delete toVars.duration;
      delete toVars.delay;
    }

    toVars.scrollTrigger = scrollConfig;

    // Stagger support
    if (stagger && targets instanceof NodeList && targets.length > 0) {
      toVars.stagger = staggerDelay;
      gsap.fromTo(targets, fromVars, toVars);
    } else {
      gsap.fromTo(targets, fromVars, toVars);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = Tag as any;

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
};
