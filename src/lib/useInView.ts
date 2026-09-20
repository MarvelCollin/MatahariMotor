import { useEffect, useRef, useState } from 'react';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const MOVE = 'transition-[opacity,translate,scale,transform] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

export const useInView = <T extends HTMLElement>(rootMargin = '0px 0px -12% 0px') => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion()) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
};

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (reducedMotion()) {
      setMounted(true);
      return;
    }
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
};

export const revealClass = (visible: boolean, near = false) =>
  `${MOVE} duration-[800ms] ${visible ? 'translate-y-0 opacity-100' : `${near ? 'translate-y-3' : 'translate-y-6'} opacity-0`}`;

export const zoomClass = (visible: boolean) =>
  `${MOVE} duration-[1100ms] ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`;
