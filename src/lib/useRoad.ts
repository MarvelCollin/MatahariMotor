import { useEffect, useState } from 'react';

type Listener = (progress: number) => void;

const listeners = new Set<Listener>();

let started = false;
let frame = 0;
let lastY = 0;
let speed = 0;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const write = (shift: number, velocity: number, progress: number) => {
  const doc = document.documentElement;
  doc.style.setProperty('--road-shift', shift.toFixed(2));
  doc.style.setProperty('--road-speed', velocity.toFixed(3));
  doc.style.setProperty('--road-progress', progress.toFixed(4));
};

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(tick);
};

function tick() {
  frame = 0;

  const y = window.scrollY;
  const span = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(y / span, 0), 1);
  const target = reducedMotion() ? 0 : Math.min(Math.abs(y - lastY) / 110, 1);

  lastY = y;
  speed += (target - speed) * 0.22;
  if (speed < 0.002) speed = 0;

  write(reducedMotion() ? 0 : y * 0.62, speed, progress);
  listeners.forEach((notify) => notify(progress));

  if (speed > 0) schedule();
}

export const startRoad = () => {
  if (started) return;
  started = true;

  lastY = window.scrollY;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
};

export const useRoad = () => {
  useEffect(startRoad, []);
};

export const useRoadProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    listeners.add(setProgress);
    startRoad();
    schedule();
    return () => {
      listeners.delete(setProgress);
    };
  }, []);

  return progress;
};
