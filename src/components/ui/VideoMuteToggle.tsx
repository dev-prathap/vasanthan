"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useVideoAudio } from "@/context/VideoAudioContext";

/**
 * Global mute/unmute toggle.
 * Only one video plays audio at a time (managed by VideoAudioContext).
 * Default: muted. Subtle UI so it doesn't distract.
 */
export const VideoMuteToggle: React.FC = () => {
  const { isAudioEnabled, toggleAudio } = useVideoAudio();

  return (
    <button
      onClick={toggleAudio}
      className="group fixed bottom-6 right-6 z-[999] w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/8 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
      aria-label={isAudioEnabled ? "Mute" : "Unmute"}
      data-cursor-hide
    >
      {isAudioEnabled ? (
        <Volume2 size={16} className="text-white/70 group-hover:text-matrix transition-colors" />
      ) : (
        <VolumeX size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
      )}
      
      {/* Small green dot when audio is on */}
      {isAudioEnabled && (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-matrix rounded-full" />
      )}
    </button>
  );
};
