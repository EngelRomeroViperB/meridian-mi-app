"use client";

import { useCallback, useRef, useState } from "react";

interface SwipeOptions {
  onSwipeRight: () => void;
  onSwipeLeft?: () => void;
  threshold?: number;
}

export function useSwipeComplete({ onSwipeRight, onSwipeLeft, threshold = 80 }: SwipeOptions) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const [deltaX, setDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    setIsSwiping(true);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (startX.current === null || startY.current === null) return;
      const dx = e.clientX - startX.current;
      const dy = Math.abs(e.clientY - startY.current);
      if (dy > 20) {
        startX.current = null;
        setDeltaX(0);
        setIsSwiping(false);
        return;
      }
      const clamped = Math.max(-120, Math.min(120, dx));
      setDeltaX(clamped);
    },
    []
  );

  const onPointerUp = useCallback(() => {
    if (startX.current === null) return;
    if (deltaX > threshold) {
      onSwipeRight();
    } else if (deltaX < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }
    startX.current = null;
    startY.current = null;
    setDeltaX(0);
    setIsSwiping(false);
  }, [deltaX, threshold, onSwipeRight, onSwipeLeft]);

  const onPointerCancel = useCallback(() => {
    startX.current = null;
    startY.current = null;
    setDeltaX(0);
    setIsSwiping(false);
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, deltaX, isSwiping };
}
