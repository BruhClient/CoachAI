import { useEffect, useMemo, useRef, useState } from "react";

export function useSessionTimer(durationSeconds: number, isRunning: boolean) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    setTimeLeft(durationSeconds); // reset when session starts

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, durationSeconds]);

  return {
    timeLeft,
    minutes: Math.floor(timeLeft / 60),
    seconds: timeLeft % 60,
    formatted: `${Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`,
  };
}
