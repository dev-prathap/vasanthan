"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";

const navItems = [
  { name: "Work", href: "/#work" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      gsap.to(".mobile-menu", { x: 0, duration: 0.5, ease: "power3.out" });
      gsap.from(".mobile-nav-item", { 
        x: 50, 
        opacity: 0, 
        duration: 0.4, 
        stagger: 0.1, 
        delay: 0.2, 
        ease: "power2.out" 
      });
    } else {
      gsap.to(".mobile-menu", { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 py-6 transition-all duration-300",
          isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" prefetch={true} className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-matrix flex items-center justify-center font-display text-black text-xl rounded">
              V
            </div>
            <span className="font-display text-2xl tracking-tighter group-hover:text-matrix transition-colors">
              VASANTHAN
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-matrix transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-matrix transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-6">
            <MagneticButton className="hidden md:block">
              <Link href="/#contact" prefetch={true}>
                <button className="px-6 py-2 bg-matrix text-black font-display text-lg uppercase tracking-wider rounded hover:bg-white transition-colors">
                  Hire Me
                </button>
              </Link>
            </MagneticButton>

            {/* Mobile Menu Trigger */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:text-matrix transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu fixed inset-0 z-[1100] bg-black translate-x-full md:hidden">
        <div className="flex flex-col h-full p-12">
          <div className="flex justify-end">
            <button onClick={toggleMenu} className="p-2 text-white hover:text-matrix">
              <X size={32} />
            </button>
          </div>
          
          <div className="flex flex-col gap-8 mt-20">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={toggleMenu}
                className="mobile-nav-item font-display text-6xl uppercase text-white hover:text-matrix transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto">
            <button className="w-full py-6 bg-matrix text-black font-display text-2xl uppercase tracking-widest rounded">
              Hire Me
            </button>
            <div className="flex gap-6 mt-8 justify-center">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Instagram</span>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">LinkedIn</span>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Email</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
