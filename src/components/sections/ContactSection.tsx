"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MessageSquare, Send, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text Reveal
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // Form Stagger
      gsap.from(".form-item", {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="contact"
      className="relative w-full py-32 bg-black px-6 md:px-20 overflow-hidden"
    >
      {/* Decorative Matrix Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-matrix/5 blur-[120px] rounded-[50%] -z-10" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-12 lg:gap-24">
        {/* Left: Headline & Info */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
          <h4 className="font-mono text-matrix text-[10px] tracking-[0.5em] uppercase mb-8">
            Phase 09 // Lead Gen
          </h4>
          <h2 
            ref={headlineRef}
            className="text-6xl md:text-8xl font-display uppercase tracking-tight leading-[0.9] mb-12"
          >
            Let&apos;s Build <br /> 
            <span className="text-matrix">Your Legend.</span>
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-matrix group-hover:text-black transition-all">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-mono text-[8px] text-white/40 uppercase tracking-widest mb-1">Email Me</p>
                <p className="text-xl font-display uppercase tracking-wider group-hover:text-matrix transition-colors">hello@vasanthan.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-matrix group-hover:text-black transition-all">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="font-mono text-[8px] text-white/40 uppercase tracking-widest mb-1">WhatsApp</p>
                <p className="text-xl font-display uppercase tracking-wider group-hover:text-matrix transition-colors">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Cinematic Form */}
        <div className="col-span-12 lg:col-span-6">
          <form 
            ref={formRef}
            className="bg-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-3xl border border-white/10"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="form-item col-span-2 md:col-span-1 flex flex-col gap-2">
                <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="bg-transparent border-b border-white/10 py-4 focus:border-matrix outline-none transition-colors text-white font-body"
                />
              </div>
              <div className="form-item col-span-2 md:col-span-1 flex flex-col gap-2">
                <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  placeholder="Your@email.com"
                  className="bg-transparent border-b border-white/10 py-4 focus:border-matrix outline-none transition-colors text-white font-body"
                />
              </div>
            </div>

            <div className="form-item flex flex-col gap-2 mb-12">
              <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Project Goal</label>
              <textarea 
                rows={4}
                placeholder="Tell me about your viral vision..."
                className="bg-transparent border-b border-white/10 py-4 focus:border-matrix outline-none transition-colors text-white font-body resize-none"
              />
            </div>

            <div className="form-item">
              <MagneticButton className="w-full">
                <button data-cursor-text="SIGNAL" className="w-full group relative py-6 bg-matrix text-black font-display text-2xl uppercase tracking-widest rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,255,65,0.2)]">
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:scale-110 transition-transform">
                    Send Signal <Send size={20} />
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </MagneticButton>
            </div>
            
            <p className="mt-8 text-center font-mono text-[8px] text-white/20 uppercase tracking-[0.3em]">
              Response time: Under 24 Business Hours
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
