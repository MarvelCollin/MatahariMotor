import { useLayoutEffect, useRef } from 'react';
import { createScope, createTimeline, type Scope, type Timeline } from 'animejs';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useStory = <T extends HTMLElement>(build: (timeline: Timeline) => void) => {
  const root = useRef<T>(null);
  const scope = useRef<Scope | null>(null);
  const builder = useRef(build);
  builder.current = build;

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (reducedMotion()) {
      el.dataset.story = 'in';
      return;
    }

    if (el.dataset.story === 'in') return;
    el.dataset.story = 'out';

    scope.current = createScope({ root }).add(() => {
      const timeline = createTimeline({
        defaults: { ease: 'out(3)', duration: 760 },
        autoplay: false,
        onComplete: () => {
          el.dataset.story = 'in';
        },
      });
      builder.current(timeline);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          timeline.play();
          observer.disconnect();
        },
        { rootMargin: '0px 0px -15% 0px' },
      );

      observer.observe(el);
      return () => observer.disconnect();
    });

    return () => scope.current?.revert();
  }, []);

  return root;
};
