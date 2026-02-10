"use client";

import React, { createContext, useContext, useCallback, useRef } from "react";

interface VideoAudioContextType {
  /** Register a video element to be managed */
  registerVideo: (id: string, video: HTMLVideoElement) => void;
  /** Unregister a video element */
  unregisterVideo: (id: string) => void;
  /** Play & unmute this video, mute all others */
  playVideo: (id: string) => void;
  /** Pause & mute this video */
  pauseVideo: (id: string) => void;
  /** Get the currently playing video id */
  getActiveId: () => string | null;
}

const VideoAudioContext = createContext<VideoAudioContextType>({
  registerVideo: () => {},
  unregisterVideo: () => {},
  playVideo: () => {},
  pauseVideo: () => {},
  getActiveId: () => null,
});

export const useVideoAudio = () => useContext(VideoAudioContext);

export const VideoAudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const videosRef = useRef<Map<string, HTMLVideoElement>>(new Map());
  const activeIdRef = useRef<string | null>(null);

  const registerVideo = useCallback((id: string, video: HTMLVideoElement) => {
    videosRef.current.set(id, video);
    // All videos start muted, autoplay silently
    video.muted = true;
  }, []);

  const unregisterVideo = useCallback((id: string) => {
    videosRef.current.delete(id);
    if (activeIdRef.current === id) {
      activeIdRef.current = null;
    }
  }, []);

  const playVideo = useCallback((id: string) => {
    // Mute all other videos
    videosRef.current.forEach((video, videoId) => {
      if (videoId !== id) {
        video.muted = true;
      }
    });

    // Unmute and play the clicked video
    const target = videosRef.current.get(id);
    if (target) {
      target.muted = false;
      target.play().catch(() => {
        // Autoplay policy may block unmuted play; stay muted
        target.muted = true;
        target.play().catch(() => {});
      });
    }

    activeIdRef.current = id;
  }, []);

  const pauseVideo = useCallback((id: string) => {
    const target = videosRef.current.get(id);
    if (target) {
      target.muted = true;
    }
    if (activeIdRef.current === id) {
      activeIdRef.current = null;
    }
  }, []);

  const getActiveId = useCallback(() => {
    return activeIdRef.current;
  }, []);

  return (
    <VideoAudioContext.Provider
      value={{
        registerVideo,
        unregisterVideo,
        playVideo,
        pauseVideo,
        getActiveId,
      }}
    >
      {children}
    </VideoAudioContext.Provider>
  );
};
