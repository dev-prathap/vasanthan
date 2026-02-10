"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Preloader } from "@/components/layout/Preloader";
import { HeroSection } from "@/components/sections/HeroSection";
import { VideoAudioProvider } from "@/context/VideoAudioContext";

// Lazy load all below-fold sections — they load in background after hero renders
const StatsShowcase = dynamic(() => import("@/components/sections/StatsShowcase").then(m => ({ default: m.StatsShowcase })), { ssr: false });
const VerticalReels = dynamic(() => import("@/components/sections/VerticalReels").then(m => ({ default: m.VerticalReels })), { ssr: false });
const FootballArena = dynamic(() => import("@/components/sections/FootballArena").then(m => ({ default: m.FootballArena })), { ssr: false });
const JourneyTimeline = dynamic(() => import("@/components/sections/JourneyTimeline").then(m => ({ default: m.JourneyTimeline })), { ssr: false });
const ClientWall = dynamic(() => import("@/components/sections/ClientWall").then(m => ({ default: m.ClientWall })), { ssr: false });
const BehindScenes = dynamic(() => import("@/components/sections/BehindScenes").then(m => ({ default: m.BehindScenes })), { ssr: false });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })), { ssr: false });
const TransitionWrapper = dynamic(() => import("@/components/animations/TransitionWrapper").then(m => ({ default: m.TransitionWrapper })), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <VideoAudioProvider>
          <main className="relative w-full">
            <HeroSection />
            
            <TransitionWrapper>
              <StatsShowcase />
            </TransitionWrapper>

            <VerticalReels />

            <TransitionWrapper>
              <FootballArena />
            </TransitionWrapper>

            <TransitionWrapper>
              <JourneyTimeline />
            </TransitionWrapper>

            <TransitionWrapper>
              <ClientWall />
            </TransitionWrapper>
            
            <TransitionWrapper>
              <BehindScenes />
            </TransitionWrapper>
            
            <TransitionWrapper>
              <ContactSection />
            </TransitionWrapper>
          </main>
        </VideoAudioProvider>
      )}
    </>
  );
}
