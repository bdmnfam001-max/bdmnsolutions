import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Tracks which section is currently in view to drive the active nav state.
 */
export function useScrollSpy(ids: string[], offset = 120): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveId(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}

/**
 * Reveal-on-scroll: adds `is-visible` to elements with the `animate-on-scroll`
 * class when they enter the viewport. Honors reduced-motion.
 */
export function useScrollReveal(): RefObject<IntersectionObserver | null> {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    observerRef.current = observer;

    if (prefersReduced) {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return observerRef;
}

/** Returns true once the page has been scrolled past `threshold` px. */
export function useScrolledPast(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}
