import { useEffect, useState } from 'react';
import logo from '../assets/logo.webp';
import { waLink } from '../lib/wa';

const links = [
  { label: 'Produk', href: '#produk' },
  { label: 'Servis', href: '#servis' },
  { label: 'Lokasi', href: '#lokasi' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
            <a key={l.href} href={l.href} className="text-white/80 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
          <a
            href={waLink('Halo Matahari Motor, saya mau tanya.')}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-merah px-4 py-2 font-medium transition-colors hover:bg-merah-dark"
          >
            Chat WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="rounded-md px-3 py-2 text-sm font-medium ring-1 ring-white/30 md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Tutup' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" className="border-t border-white/15 px-4 pb-4 md:hidden" aria-label="Menu mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 py-3.5 text-lg"
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
