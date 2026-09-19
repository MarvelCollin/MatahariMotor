import { useEffect, useState } from 'react';
import logo from '../assets/logo.webp';
import { waLink } from '../lib/wa';

const links = [
  { label: 'Servis', href: '#services' },
  { label: 'Produk', href: '#products' },
  { label: 'Lokasi', href: '#location' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ['top', ...links.map((l) => l.href.slice(1))].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="" width={40} height={40} className="h-10 w-10" />
          <span className="font-display text-2xl leading-none font-extrabold tracking-tight uppercase">
            Matahari<span className="text-brand"> Motor</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Utama">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'true' : undefined}
              className="font-medium decoration-brand decoration-2 underline-offset-[6px] hover:underline aria-[current=true]:underline"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink('Halo Matahari Motor, saya mau tanya.')}
            target="_blank"
            rel="noreferrer"
            className="bg-ink px-4 py-2 font-medium text-paper transition-colors hover:bg-brand"
          >
            Chat WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setOpen(!open)}
        >
          <span className={`h-0.5 w-6 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t-2 border-ink px-4 pb-4 md:hidden" aria-label="Menu mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-ink/20 py-4 font-display text-4xl font-bold uppercase"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
