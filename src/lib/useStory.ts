import { useLayoutEffect, useRef } from 'react';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const staggered = ['story-row', 'story-card'];

export const useStory = <T extends HTMLElement>() => {
  const root = useRef<T>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (reducedMotion()) {
      el.dataset.story = 'done';
      return;
    }

    if (el.dataset.story === 'done') return;

    staggered.forEach((c) =>
      el.querySelectorAll<HTMLElement>(`.${c}`).forEach((n, i) => n.style.setProperty('--i', String(i))),
    );
    el.dataset.story = 'out';

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.dataset.story = 'in';
        timer = window.setTimeout(() => {
          el.dataset.story = 'done';
        }, 1600);
      },
      { rootMargin: '0px 0px -15% 0px' },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return root;
};
