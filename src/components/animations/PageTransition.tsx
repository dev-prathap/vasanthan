"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * PageTransition — Cinematic curtain-wipe transition between routes
 *
 * Wrap your page content with this component in layout.tsx.
 * It listens to pathname changes and plays a curtain animation.
 *
 * Usage:
 *   <PageTransition>{children}</PageTransition>
 */
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const isFirstRender = useRef(true);
  const isAnimating = useRef(false);

  const getPageLabel = useCallback((path: string) => {
    if (path === "/") return "HOME";
    if (path.startsWith("/about")) return "ABOUT";
    if (path.startsWith("/work/")) return "PROJECT";
    return "LOADING";
  }, []);

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayChildren(children);
      return;
    }

    // Don't re-trigger if already animating
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    const label = getPageLabel(pathname);

    // Phase 1: Curtains close (cover the screen)
    tl.set(curtainRef.current, { display: "flex" })
      .set([topRef.current, bottomRef.current], { scaleY: 0 })
      .set(labelRef.current, { opacity: 0, y: 20 })
      .to(topRef.current, {
        scaleY: 1,
        transformOrigin: "top",
        duration: 0.5,
        ease: "power4.inOut",
      })
      .to(
        bottomRef.current,
        {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 0.5,
          ease: "power4.inOut",
        },
        "<"
      )
      // Phase 2: Show label
      .call(() => {
        if (labelRef.current) labelRef.current.innerText = label;
      })
      .to(labelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
      // Phase 3: Swap content while curtains are closed
      .call(() => {
        setDisplayChildren(children);
        window.scrollTo(0, 0);
      })
      .to(labelRef.current, { opacity: 0, y: -20, duration: 0.2, delay: 0.3 })
      // Phase 4: Curtains open (reveal new page)
      .to(topRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.6,
        ease: "power4.inOut",
      })
      .to(
        bottomRef.current,
        {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 0.6,
          ease: "power4.inOut",
        },
        "<"
      )
      // Phase 5: Fade in new content
      .from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3")
      .set(curtainRef.current, { display: "none" });

    return () => {
      tl.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[2000] pointer-events-none hidden flex-col items-center justify-center"
      >
        {/* Top curtain */}
        <div
          ref={topRef}
          className="absolute top-0 left-0 right-0 h-1/2 bg-black origin-top scale-y-0"
        />
        {/* Bottom curtain */}
        <div
          ref={bottomRef}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-black origin-bottom scale-y-0"
        />
        {/* Center label */}
        <span
          ref={labelRef}
          className="relative z-10 font-display text-4xl md:text-6xl text-matrix uppercase tracking-[0.3em] opacity-0"
        />
        {/* Center line decoration */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[1px] bg-matrix/30 -z-0" />
      </div>

      {/* Page content */}
      <div ref={contentRef}>{displayChildren}</div>
    </>
  );
};
