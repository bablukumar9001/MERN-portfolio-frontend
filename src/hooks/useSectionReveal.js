import { useEffect, useState } from "react";

/**
 * Reveals a section when it enters the viewport.
 * @param {string} sectionId - DOM id without '#'
 * @param {{ threshold?: number, fallbackMs?: number }} options
 */
export function useSectionReveal(sectionId, options = {}) {
  const { threshold = 0.1, fallbackMs = 2500 } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold }
    );

    observer.observe(section);
    const timer = setTimeout(() => setIsVisible(true), fallbackMs);

    return () => {
      observer.unobserve(section);
      clearTimeout(timer);
    };
  }, [sectionId, threshold, fallbackMs]);

  return isVisible;
}
