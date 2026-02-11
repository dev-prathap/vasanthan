"use client";

import React from "react";
import { ArrowUpRight, Instagram, Mail, Linkedin, ArrowUp } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-space py-20 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Background Text */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none select-none opacity-[0.02] hidden lg:flex items-end">
        <span className="text-[200px] font-display uppercase leading-none translate-y-1/2">
          VASANTHAN
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        {/* Left: Branding */}
        <div className="col-span-1 lg:col-span-5 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
            <div className="w-8 h-8 bg-matrix flex items-center justify-center font-display text-base text-black rounded">
              V
            </div>
            <span className="font-display text-3xl tracking-tighter">
              VASANTHAN
            </span>
          </div>
          <p className="text-white/40 font-body text-lg md:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed">
            Crafting viral narratives for brands and athletes worldwide. Based in Chennai, working globally.
          </p>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center lg:justify-start gap-8">
            <a href="#" className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-matrix transition-colors">
              <Instagram size={16} /> @vasanthan_edits
            </a>
            <a href="#" className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-matrix transition-colors">
              <Mail size={16} /> hello@vasanthan.com
            </a>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="col-span-1 lg:col-span-3 text-center lg:text-left">
          <h4 className="font-mono text-[10px] text-matrix uppercase tracking-[0.5em] mb-8">Navigate</h4>
          <ul className="flex flex-col gap-4">
            {["Work", "About", "Services", "Archive", "Contact"].map((link) => (
              <li key={link}>
                <a href="#" className="font-display text-xl md:text-2xl uppercase text-white/60 hover:text-white flex items-center justify-center lg:justify-start gap-2 group transition-all">
                  {link}
                  <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-matrix" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: CTA & Back to top */}
        <div className="col-span-1 lg:col-span-4 flex flex-col items-center lg:items-end">
          <h4 className="font-mono text-[10px] text-matrix uppercase tracking-[0.5em] mb-8 hidden lg:block text-right">Start a project</h4>
          <div className="flex-1 flex flex-col items-center lg:items-end gap-12 w-full">
            <button className="text-center lg:text-right group">
               <span className="block text-4xl lg:text-6xl font-display uppercase leading-tight hover:text-matrix transition-colors">
                 GET IN <br /> TOUCH
               </span>
            </button>

            <div className="mt-auto">
              <MagneticButton>
                <button 
                  onClick={scrollToTop}
                  className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-matrix hover:text-black transition-all group"
                >
                  <ArrowUp />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="font-mono text-[8px] text-white/20 uppercase tracking-[0.5em]">
          © 2024 VASANTHAN EDITS. ALL RIGHTS RESERVED.
        </p>
        <p className="font-mono text-[8px] text-white/20 uppercase tracking-[0.5em]">
          BUILT BY <a href="https://devprathap.online" target="_blank" rel="noopener noreferrer" className="hover:text-matrix transition-colors">DEV-PRATHAP</a>
        </p>
      </div>
    </footer>
  );
};
