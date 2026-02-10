"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useVideoAudio } from "@/context/VideoAudioContext";

interface ManagedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** Unique identifier for this video */
  videoId: string;
  /** Hide the mute indicator (e.g. for hero background video) */
  hideIndicator?: boolean;
  /** Custom class for the wrapper div */
  wrapperClassName?: string;
}

/**
 * Click-to-play video component.
 * - All videos autoplay muted (silent background)
 * - Click a video to unmute it (plays with sound)
 * - Click again to mute it back
 * - Only ONE video has audio at any time
 */
export const ManagedVideo = React.forwardRef<HTMLVideoElement, ManagedVideoProps>(
  ({ videoId, hideIndicator = false, wrapperClassName = "", className, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLVideoElement>(null);
    const { registerVideo, unregisterVideo, playVideo, pauseVideo, getActiveId } = useVideoAudio();
    const [isActive, setIsActive] = useState(false);

    // Merge forwarded ref with internal ref
    const setRef = (el: HTMLVideoElement | null) => {
      (internalRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
      if (typeof forwardedRef === "function") {
        forwardedRef(el);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
      }
    };

    // Register/unregister with audio context
    useEffect(() => {
      const video = internalRef.current;
      if (!video) return;

      registerVideo(videoId, video);
      return () => unregisterVideo(videoId);
    }, [videoId, registerVideo, unregisterVideo]);

    // Listen for muted changes from context (when another video takes over)
    useEffect(() => {
      const video = internalRef.current;
      if (!video) return;

      const handleVolumeChange = () => {
        setIsActive(!video.muted);
      };

      video.addEventListener("volumechange", handleVolumeChange);
      return () => video.removeEventListener("volumechange", handleVolumeChange);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      
      if (getActiveId() === videoId && isActive) {
        // Currently playing with sound -> mute it
        pauseVideo(videoId);
        setIsActive(false);
      } else {
        // Not active -> unmute this, mute all others
        playVideo(videoId);
        setIsActive(true);
      }
    };

    return (
      <div className={`relative cursor-pointer ${wrapperClassName}`} onClick={handleClick}>
        <video
          ref={setRef}
          className={className}
          {...props}
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Subtle mute/unmute indicator */}
        {!hideIndicator && (
          <div className={`absolute bottom-4 right-4 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isActive 
              ? "bg-matrix/20 backdrop-blur-sm border border-matrix/30" 
              : "bg-black/20 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-60"
          }`}>
            {isActive ? (
              <Volume2 size={14} className="text-matrix" />
            ) : (
              <VolumeX size={14} className="text-white/50" />
            )}
          </div>
        )}
      </div>
    );
  }
);

ManagedVideo.displayName = "ManagedVideo";
