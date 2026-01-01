"use client";

import { ReactNode, useEffect, useState } from "react";

type InitialLoaderProps = {
  children: ReactNode;
};

export default function InitialLoader({ children }: InitialLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000;
    const interval = 40;
    const increment = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + increment, 100));
    }, interval);

    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(progressTimer);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute inset-0 bg-glow" />

          <div className="scene">
            <div className="cube-3d">
              <div className="face front">🧠</div>
              <div className="face back">📘</div>
              <div className="face right">🤖</div>
              <div className="face left">🎓</div>
              <div className="face top">💡</div>
              <div className="face bottom">📊</div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 w-[70%] max-w-md -translate-x-1/2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="progress-bar h-full rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-2 text-center text-xs text-white/60">
              Loading Page......
            </p>
          </div>
        </div>
      )}

      {!loading && children}
    </>
  );
}