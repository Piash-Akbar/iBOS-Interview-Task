"use client";

import { useCallback } from "react";

export function useFullscreen() {
  const enterFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.().catch(() => {
      // fullscreen might be denied
    });
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {
        // exit might fail
      });
    }
  }, []);

  return { enterFullscreen, exitFullscreen };
}
