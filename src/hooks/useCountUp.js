import { useEffect, useState } from "react";

/**
 * Animate a number from 0 to `end` when `active` becomes true.
 */
export const useCountUp = (end, { duration = 1200, active = true } = {}) => {
  const target = Number(end) || 0;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (target === 0) {
      setValue(0);
      return;
    }

    let start = null;
    let raf = null;

    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, active]);

  return value;
};
