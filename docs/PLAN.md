# 🎯 PLAN: VASANTHAN PORTFOLIO - PHASE 1 & 2

## 📋 Project Overview

Implementation of an ultra-advanced cinematic portfolio for R. Vasanthan using Next.js 14, GSAP, and Three.js. Focus on "High-Budget Motion Graphic" aesthetics and viral content showcase.

---

## 🏗️ PHASE 1: FOUNDATION & SETUP (Days 1-3)

### 1.1 Project Scaffolding

- [ ] Initialize Next.js 14.2 (App Router) with TypeScript & Tailwind CSS.
- [ ] Setup folder structure per `Vasanthan.md` specs.
- [ ] Configure `tsconfig.json` paths (`@/components`, `@/lib`, `@/types`).
- [ ] Initialize `pnpm` workspace and install core packages:
  - Animation: `gsap`, `framer-motion`, `lenis` (smooth scroll).
  - 3D: `three`, `@react-three/fiber`, `@react-three/drei`.
  - UI Utils: `clsx`, `tailwind-merge`, `class-variance-authority`.

### 1.2 Design System Core

- [ ] **Colors:** Pitch Black (#000000), Matrix Green (#00FF41), Deep Space (#0A0A0A).
- [ ] **Typography:**
  - Display: `Bebas Neue` / `Oswald` (via Google Fonts).
  - Body: `Inter`.
- [ ] **Tailwind Config:** Custom spacing, animations (glitch, pulse), and `clamp()` fluid typography.
- [ ] **Global CSS:** Custom cursor resets, smooth scroll baseline, selection colors.

### 1.3 Layout Primitives

- [ ] Create `Navigation.tsx`: Glassmorphism + Magnetic CTA.
- [ ] Create `Footer.tsx`: Animated social grid + Scroll-to-top.
- [ ] Create `CustomCursor.tsx`: Multi-layered lag cursor with blend modes.

---

## 🎬 PHASE 2: PRELOADER & HERO MASK (Days 4-10)

### 2.1 The Preloader

- [ ] Implement "Film Countdown" (3-2-1) with glitch effects.
- [ ] Setup Asset Loader state using Drei's `useProgress`.
- [ ] Add "Curtain Rise" GSAP transition to reveal the Hero.

### 2.2 Hero Video Mask (The "WOW" Factor)

- [ ] Implement ScrollTrigger pinning for the Hero section.
- [ ] Create the SVG/Canvas zoom mask: "VASANTHAN" text scaling 1x → 50x.
- [ ] Integrate background cinematic reel (auto-play, muted).
- [ ] Add kinetic typography layers with parallax offsets.

---

## 🧪 VERIFICATION & STANDARDS

- [ ] **Performance:** < 2s LCP on desktop (simulated).
- [ ] **Accessibility:** Full keyboard nav for skip-links and menu.
- [ ] **Responsive:** Mobile-first simplified animations (<768px).

## 📅 Roadmap Post-Phase 2

- Phase 3: Bento Grid Showcase.
- Phase 4: 3D Workspace Visualization.
- Phase 5: Form & Lead Gen.
