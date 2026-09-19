import { useEffect, useRef, useState } from 'react';

export const useInView = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};

export const revealClass = (inView: boolean) =>
  `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
    inView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
  }`;
