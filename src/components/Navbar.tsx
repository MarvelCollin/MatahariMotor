import { useEffect, useState } from 'react';
import logo from '../assets/logo.webp';
import { waLink } from '../lib/wa';

const links = [
  { label: 'Layanan', href: '#layanan' },
  { label: 'Katalog', href: '#katalog' },
  { label: 'Bengkel', href: '#bengkel' },
  { label: 'Kontak', href: '#kontak' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3" aria-label="Matahari Motor, ke atas">
          <img src={logo} alt="" width={40} height={40} className="h-10 w-10" />
          <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight">
            Matahari<span className="text-merah"> Motor</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Utama">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-medium decoration-2 underline-offset-4 hover:underline">
              {l.label}
            </a>
          ))}
          <a
            href={waLink('Halo Matahari Motor, saya mau tanya.')}
            target="_blank"
            rel="noreferrer"
            className="bg-ink px-4 py-2 font-medium text-paper transition-colors hover:bg-merah"
          >
            Chat WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setOpen(!open)}
        >
          <span className={`h-0.5 w-6 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div id="menu-mobile" className="fixed inset-x-0 top-16 bottom-0 bg-paper md:hidden">
          <nav className="flex flex-col px-4 pt-4" aria-label="Menu mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/20 py-4 font-display text-4xl font-bold uppercase"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink('Halo Matahari Motor, saya mau tanya.')}
              target="_blank"
              rel="noreferrer"
              className="mt-6 bg-ink py-4 text-center font-medium text-paper"
            >
              Chat WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
