import { shop } from '../data/shop';
import { mapsLink, waLink } from '../lib/wa';

const Footer = () => (
  <footer className="bg-ink text-paper">
    <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <p className="max-w-xs text-paper/75 md:col-span-2">Onderdil &amp; bengkel motor, {shop.city}.</p>
        <nav aria-label="Footer">
          <p className="font-mono text-sm text-sun">Halaman</p>
          <ul className="mt-3 space-y-1">
            {[
              ['Layanan', '#layanan'],
              ['Katalog', '#katalog'],
              ['Bengkel', '#bengkel'],
              ['Kontak', '#kontak'],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="inline-block py-1 hover:text-sun hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-sm text-sun">Hubungi</p>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={waLink('Halo Matahari Motor, saya mau tanya.')} target="_blank" rel="noreferrer" className="inline-block py-1 hover:text-sun hover:underline">
                WhatsApp {shop.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={mapsLink()} target="_blank" rel="noreferrer" className="inline-block py-1 hover:text-sun hover:underline">
                Google Maps
              </a>
            </li>
            <li className="text-paper/75">
              {shop.address}, {shop.city}
            </li>
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-14 font-display text-[clamp(2rem,13.5vw,12.5rem)] font-black uppercase leading-[0.8] tracking-tight whitespace-nowrap"
      >
        Matahari <span className="text-merah">Motor</span>
      </p>

      <div className="mt-8 flex flex-wrap justify-between gap-4 border-t border-paper/20 pt-6 text-sm text-paper/60">
        <p>© {new Date().getFullYear()} {shop.name}</p>
        <p>
          Foto bengkel dari{' '}
          <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline hover:text-sun">
            Unsplash
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
