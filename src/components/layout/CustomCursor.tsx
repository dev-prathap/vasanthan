"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

/**
 * Custom Cursor with context-aware states
 *
 * Usage: Add data attributes to any element:
 *   data-cursor-text="PLAY"     → Shows text label (PLAY, VIEW, DRAG, SCROLL, etc.)
 *   data-cursor-scale           → Enlarges cursor on hover (links, buttons)
 *   data-cursor-hide            → Hides cursor (e.g. over video players)
 *   data-cursor-invert          → Inverts cursor colors for light backgrounds
 */
export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const isVisible = useRef(true);

  const resetFollower = useCallback(() => {
    if (!followerRef.current || !textRef.current) return;
    gsap.to(followerRef.current, {
      scale: 1,
      width: 32,
      height: 32,
      background: "transparent",
      border: "1px solid #00ff41",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(textRef.current, { opacity: 0, scale: 0, duration: 0.2 });
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const text = textRef.current;
    if (!cursor || !follower || !text) return;

    // Detect touch device — hide cursor entirely
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = "none";
      follower.style.display = "none";
      document.documentElement.style.cursor = "auto";
      return;
    }

    let currentTarget: Element | null = null;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const target = e.target as HTMLElement;

      // Move dot and follower
      gsap.set(cursor, { x: clientX, y: clientY });
      gsap.to(follower, { x: clientX, y: clientY, duration: 0.3, ease: "power3.out", overwrite: "auto" });

      // Closest interactive parent
      const textEl = target?.closest("[data-cursor-text]");
      const scaleEl = target?.closest("a, button, [data-cursor-scale]");
      const hideEl = target?.closest("[data-cursor-hide]");
      const invertEl = target?.closest("[data-cursor-invert]");

      // Determine active element
      const activeEl = textEl || scaleEl || hideEl || invertEl || null;

      // Only update if target changed
      if (activeEl === currentTarget) return;
      currentTarget = activeEl;

      // Reset mix-blend-mode by default
      gsap.set(follower, { mixBlendMode: "normal" });

      // ── HIDDEN STATE ──
      if (hideEl) {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
        gsap.to(follower, { opacity: 0, scale: 0.5, duration: 0.2 });
        isVisible.current = false;
        return;
      }

      // Restore visibility
      if (!isVisible.current) {
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
        gsap.to(follower, { opacity: 1, scale: 1, duration: 0.2 });
        isVisible.current = true;
      }

      // ── TEXT STATE (PLAY, VIEW, DRAG, SCROLL, etc.) ──
      if (textEl) {
        const cursorText = textEl.getAttribute("data-cursor-text") || "";
        gsap.to(follower, {
          scale: 1,
          width: 80,
          height: 80,
          background: "rgba(0, 255, 65, 0.15)",
          border: "1px solid rgba(0, 255, 65, 0.4)",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(cursor, { scale: 0, duration: 0.2 });
        text.innerText = cursorText;
        gsap.to(text, { opacity: 1, scale: 1, duration: 0.3 });
        return;
      }

      // Restore dot
      gsap.to(cursor, { scale: 1, duration: 0.2 });

      // ── INVERT STATE ──
      if (invertEl) {
        gsap.to(follower, {
          scale: 1.5,
          width: 32,
          height: 32,
          background: "#fff",
          border: "none",
          duration: 0.3,
          mixBlendMode: "difference",
        });
        gsap.to(cursor, { background: "#fff", duration: 0.2 });
        gsap.to(text, { opacity: 0, scale: 0, duration: 0.2 });
        return;
      }

      // Restore colors
      gsap.to(cursor, { background: "#00ff41", duration: 0.2 });

      // ── SCALE STATE (links, buttons) ──
      if (scaleEl) {
        gsap.to(follower, {
          scale: 1.5,
          width: 32,
          height: 32,
          border: "1px solid rgba(0, 255, 65, 0.8)",
          background: "transparent",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(text, { opacity: 0, scale: 0, duration: 0.2 });
        return;
      }

      // ── DEFAULT STATE ──
      resetFollower();
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
      gsap.to(follower, { opacity: 1, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
      gsap.to(follower, { opacity: 0, duration: 0.3 });
    };

    // Mouse down / up for "clicking" feel
    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.1 });
      gsap.to(follower, { scale: 0.8, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.3)" });
      gsap.to(follower, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)" });
    };

    const onWindowBlur = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
      gsap.to(follower, { opacity: 0, duration: 0.3 });
    };

    const onWindowFocus = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
      gsap.to(follower, { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
    };
  }, [resetFollower]);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-matrix rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      {/* Follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-matrix rounded-full pointer-events-none z-[9998] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <span
          ref={textRef}
          className="text-[8px] font-mono font-bold text-matrix uppercase tracking-wider opacity-0 scale-0 whitespace-nowrap"
        />
      </div>
    </>
  );
};
