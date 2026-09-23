import logo from '../assets/logo-80.webp?no-inline';
import { shop } from '../data/shop';
import { hoursLine } from '../lib/hours';
import { useStory } from '../lib/useStory';
import { waLink } from '../lib/wa';
import Eyebrow from './Eyebrow';
import StoryBackdrop from './StoryBackdrop';

const links = [
  { label: 'Produk', href: '#products' },
  { label: 'Servis', href: '#services' },
  { label: 'Lokasi', href: '#location' },
];

const Footer = () => {
  const root = useStory<HTMLElement>();

  return (
    <footer ref={root} className="relative overflow-hidden bg-ink pb-24 text-white/70 md:pb-0">
      <StoryBackdrop pattern="dots" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 py-14">
          <div>
            <Eyebrow tone="dark" className="story-eyebrow">
              Siap bantu
            </Eyebrow>
            <p className="story-title mt-4 font-head text-3xl leading-tight font-extrabold text-white sm:text-4xl">
              Butuh sparepart <span className="text-sun">atau servis?</span>
            </p>
          </div>
          <a
            href={waLink('Halo Matahari Motor, saya mau tanya.')}
            target="_blank"
            rel="noreferrer"
            className="story-body group inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3.5 font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Chat WhatsApp <span className="hidden sm:inline">{shop.phoneDisplay}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </a>
        </div>

        <div className="grid gap-8 border-t border-white/10 py-10 sm:grid-cols-3">
          <div className="story-row flex items-center gap-3">
            <img src={logo} alt="" width={40} height={40} className="h-10 w-10" loading="lazy" />
            <div className="text-sm">
              <p className="font-head font-bold text-white">{shop.name}</p>
              <p>
                {shop.address}, {shop.city}
              </p>
            </div>
          </div>

          <nav className="story-row flex flex-wrap gap-x-6 gap-y-2 text-sm sm:justify-center" aria-label="Footer">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="story-row sm:text-right">
            <div className="flex sm:justify-end">
              <Eyebrow tone="dark">Jam buka</Eyebrow>
            </div>
            <p className="mt-2 text-sm text-white">{hoursLine}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-sm">
          <a href={`tel:+${shop.whatsapp}`} className="text-white transition-colors hover:text-sun">
            {shop.phoneDisplay}
          </a>
          <span>
            © {new Date().getFullYear()} {shop.name}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
