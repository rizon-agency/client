import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const RouteLoadingBar = () => {
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const raf = requestAnimationFrame(() => {
        setVisible(true);
        setProgress(15);
      });

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          const remaining = 90 - prev;
          return prev + Math.max(remaining * 0.1, 0.5);
        });
      }, 200);

      return () => {
        cancelAnimationFrame(raf);
        clearInterval(interval);
      };
    }

    const completeTimer = setTimeout(() => setProgress(100), 0);
    const fadeTimer = setTimeout(() => setVisible(false), 200);
    const resetTimer = setTimeout(() => setProgress(0), 600);

    return () => {
      clearTimeout(completeTimer);
      clearTimeout(fadeTimer);
      clearTimeout(resetTimer);
    };
  }, [isLoading]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-1 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-primary"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          transition: visible
            ? "width 200ms ease-out, opacity 0ms"
            : "opacity 200ms ease-out",
        }}
      />
    </div>
  );
};
