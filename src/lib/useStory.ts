import { useLayoutEffect, useRef } from 'react';
import { animate, createScope, createTimeline, onScroll, type Scope, type Timeline } from 'animejs';

export const storyIntro = (timeline: Timeline) =>
  timeline
    .add('.story-eyebrow', { opacity: [0, 1], x: [-16, 0] })
    .add('.story-title', { opacity: [0, 1], y: [28, 0] }, '-=560')
    .add('.story-body', { opacity: [0, 1], y: [20, 0] }, '-=520');

export const animateBackdrop = (el: HTMLElement) => {
  if (!el.querySelector('.story-backdrop')) return;

  const pass = (sync: number) =>
    onScroll({ target: el, sync, enter: 'bottom top', leave: 'top bottom' });

  animate('.story-glow', {
    y: ['-12%', '12%'],
    ease: 'linear',
    autoplay: pass(0.4),
  });

  animate('.story-grid', {
    y: ['-5%', '5%'],
    ease: 'linear',
    autoplay: pass(0.18),
  });
};

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

      if (el.querySelector('.story-rule')) {
        timeline.add('.story-rule', { scaleX: [0, 1], ease: 'inOut(3)', duration: 1200 }, 0);
      }

      animateBackdrop(el);

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
