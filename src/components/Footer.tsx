import logo from '../assets/logo.webp';
import Eyebrow from './Eyebrow';
import { shop } from '../data/shop';
import { hoursLine } from '../lib/hours';
import { waLink } from '../lib/wa';

const Footer = () => (
  <footer className="border-t border-white/10 bg-ink pb-24 text-white/70 md:pb-0">
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" width={40} height={40} className="h-10 w-10" loading="lazy" />
          <div>
            <p className="font-head font-bold text-white">{shop.name}</p>
            <p className="text-sm">
              {shop.address}, {shop.city}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="#products" className="transition-colors hover:text-white">
            Produk
          </a>
          <a href="#services" className="transition-colors hover:text-white">
            Servis
          </a>
          <a href="#location" className="transition-colors hover:text-white">
            Lokasi
          </a>
        </nav>

        <div>
          <Eyebrow as="p" tone="dark">
            Jam buka
          </Eyebrow>
          <p className="mt-2 text-sm text-white">{hoursLine}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm">
        <a
          href={waLink('Halo Matahari Motor, saya mau tanya.')}
          target="_blank"
          rel="noreferrer"
          className="text-white transition-colors hover:text-sun"
        >
          WhatsApp {shop.phoneDisplay}
        </a>
        <span>
          © {new Date().getFullYear()} {shop.name}
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
