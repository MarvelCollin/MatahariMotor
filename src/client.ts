const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const menu = () => {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = header?.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = header?.querySelector<HTMLElement>('#mobile-menu');
  if (!header || !toggle || !panel) return;

  const set = (open: boolean) => {
    header.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    panel.inert = !open;
  };

  toggle.addEventListener('click', () => set(!header.hasAttribute('data-open')));
  panel.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) set(false);
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') set(false);
  });
};

const activeLink = () => {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav] a[href^="#"]')];
  const ids = ['top', ...links.map((l) => l.hash.slice(1))];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) =>
          l.hash === `#${e.target.id}` ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current'),
        );
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
};

const waBar = () => {
  const bar = document.querySelector<HTMLElement>('[data-wa-bar]');
  if (!bar) return;

  const set = (show: boolean) => {
    bar.toggleAttribute('data-show', show);
    bar.inert = !show;
  };

  const hero = document.getElementById('top');
  if (!hero) {
    set(true);
    return;
  }

  new IntersectionObserver(([entry]) => set(!entry.isIntersecting), {
    rootMargin: '-72px 0px 0px 0px',
  }).observe(hero);
};

const stories = () => {
  const roots = document.querySelectorAll<HTMLElement>('.story');

  if (reducedMotion()) {
    roots.forEach((el) => (el.dataset.story = 'done'));
    return;
  }

  const seen = new WeakSet<Element>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;

        if (!seen.has(el)) {
          seen.add(el);
          if (entry.boundingClientRect.top < window.innerHeight) {
            observer.unobserve(el);
            el.dataset.story = 'done';
            return;
          }
          ['story-row', 'story-card'].forEach((c) =>
            el.querySelectorAll<HTMLElement>(`.${c}`).forEach((n, i) => n.style.setProperty('--i', String(i))),
          );
          el.dataset.story = 'out';
        }

        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        el.dataset.story = 'in';
        window.setTimeout(() => {
          el.dataset.story = 'done';
        }, 1600);
      });
    },
    { rootMargin: '0px 0px -15% 0px' },
  );

  roots.forEach((el) => observer.observe(el));
};

export const boot = () => {
  menu();
  activeLink();
  waBar();
  stories();
};
