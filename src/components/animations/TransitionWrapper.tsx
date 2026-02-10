"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const TransitionWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // General section entrance/exit logic
      gsap.fromTo(
        element,
        {
          opacity: 0,
          scale: 0.95,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      // Section exit logic
      gsap.to(element, {
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        ease: "power3.in",
        scrollTrigger: {
          trigger: element,
          start: "bottom 30%",
          end: "bottom 0%",
          scrub: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};
