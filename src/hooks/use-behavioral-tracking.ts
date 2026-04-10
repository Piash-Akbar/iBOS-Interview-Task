"use client";

import { useEffect } from "react";
import { useExamStore } from "@/stores/exam-store";
import { toast } from "sonner";

export function useBehavioralTracking() {
  const incrementTabSwitch = useExamStore((s) => s.incrementTabSwitch);
  const incrementFullscreenExit = useExamStore(
    (s) => s.incrementFullscreenExit
  );
  const tabSwitches = useExamStore((s) => s.tabSwitches);
  const fullscreenExits = useExamStore((s) => s.fullscreenExits);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        incrementTabSwitch();
        toast.warning("Tab switch detected!", {
          description:
            "Switching tabs during the exam is being monitored.",
        });
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        incrementFullscreenExit();
        toast.warning("Fullscreen exit detected!", {
          description:
            "Please stay in fullscreen mode during the exam.",
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, [incrementTabSwitch, incrementFullscreenExit]);

  return { tabSwitches, fullscreenExits };
}
