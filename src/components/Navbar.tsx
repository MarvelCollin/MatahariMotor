import { useEffect, useState } from 'react';
import logo from '../assets/logo-80.webp?no-inline';
import { waLink } from '../lib/wa';

const links = [
  { label: 'Produk', href: '#products' },
  { label: 'Servis', href: '#services' },
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
    <header className="sticky top-0 z-50 bg-ink text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="" width={36} height={36} className="h-9 w-9" />
          <span className="font-head text-lg font-bold [font-stretch:112%]">Matahari Motor</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Utama">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'true' : undefined}
              className="relative text-white/70 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] after:content-[''] hover:text-white motion-reduce:after:transition-none aria-[current=true]:text-white aria-[current=true]:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink('Halo Matahari Motor, saya mau tanya.')}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-brand px-4 py-2 font-medium transition-colors hover:bg-brand-dark"
          >
            Chat WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="rounded-md px-3 py-2 text-sm font-medium ring-1 ring-white/30 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Tutup' : 'Menu'}
        </button>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <nav id="mobile-menu" className="min-h-0 overflow-hidden" aria-label="Menu mobile">
          <div className="border-t border-white/15 px-4 pb-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                tabIndex={open ? undefined : -1}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-3.5 text-lg last:border-b-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
