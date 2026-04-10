"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

export function useExamTimer(
  durationMinutes: number,
  onTimeout: () => void
) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          onTimeoutRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [durationMinutes]);

  const formatted = useMemo(() => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, [timeLeft]);

  const isUrgent = timeLeft < 60;

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { timeLeft, formatted, isUrgent, stop };
}
