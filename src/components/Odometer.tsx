import { useEffect, useState } from 'react';
import { useRoadProgress } from '../lib/useRoad';

const chapters = [
  { id: 'top', label: 'Berangkat', tone: 'dark' },
  { id: 'services', label: 'Bengkel', tone: 'dark' },
  { id: 'products', label: 'Katalog', tone: 'light' },
  { id: 'location', label: 'Sampai', tone: 'light' },
] as const;

const TRIP = 12.4;

const Odometer = () => {
  const progress = useRoadProgress();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = chapters.findIndex((c) => c.id === entry.target.id);
          if (index >= 0) setActive(index);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const chapter = chapters[active];
  const dark = chapter.tone === 'dark';

  return (
    <div
      className={`pointer-events-none fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 lg:block ${
        dark ? 'text-white' : 'text-ink'
      } transition-colors duration-500`}
    >
      <div className={`h-40 w-px ${dark ? 'bg-white/20' : 'bg-ink/15'}`}>
        <div
          style={{ height: `${progress * 100}%` }}
          className="w-px bg-brand transition-[height] duration-150 ease-linear"
        />
      </div>

      <div className="mt-4 -ml-px flex items-center gap-2">
        <span className="h-px w-3 bg-sun" />
        <span className="font-head text-xs font-bold tracking-[0.18em] uppercase tabular-nums">
          {(progress * TRIP).toFixed(1)} km
        </span>
      </div>

      <p className={`mt-1 text-[0.6875rem] tracking-[0.2em] uppercase ${dark ? 'text-white/45' : 'text-muted'}`}>
        {String(active + 1).padStart(2, '0')} · {chapter.label}
      </p>
    </div>
  );
};

export default Odometer;
