import { useEffect, useRef } from 'react';
import velg from '../assets/products/velg-vnd.webp';
import { shop } from '../data/shop';
import { todayStatus } from '../lib/hours';
import { waLink } from '../lib/wa';

const Speedo = () => {
  const rim = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (rim.current) rim.current.style.transform = `rotate(${Math.min(window.scrollY, 1500) / 3}deg)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M200 20 A180 180 0 0 1 380 200" fill="none" stroke="var(--color-sun)" strokeWidth="12" />
        <path d="M380 200 A180 180 0 0 1 200 380" fill="none" stroke="var(--color-merah)" strokeWidth="12" />
        <path d="M200 380 A180 180 0 0 1 20 200" fill="none" stroke="var(--color-sun)" strokeWidth="12" />
        <path d="M20 200 A180 180 0 0 1 200 20" fill="none" stroke="var(--color-merah)" strokeWidth="12" />
        {Array.from({ length: 60 }).map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="38"
            x2="200"
            y2={i % 5 === 0 ? 56 : 46}
            stroke={i % 5 === 0 ? '#fff' : 'rgba(255,255,255,0.35)'}
            strokeWidth={i % 5 === 0 ? 2.5 : 1.25}
            transform={`rotate(${i * 6} 200 200)`}
          />
        ))}
        <circle cx="200" cy="200" r="132" fill="var(--color-sun)" />
      </svg>
      <img
        ref={rim}
        src={velg}
        alt="Velg racing VND, dijual di toko"
        width={277}
        height={278}
        className="absolute inset-[19%] h-[62%] w-[62%] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]"
      />
    </div>
  );
};

const Hero = () => {
  const status = todayStatus();

  return (
    <section id="top">
      <div className="overflow-hidden bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:py-20">
          <div>
            <h1 className="text-[clamp(2.6rem,7vw,4.75rem)] leading-[1.02] font-extrabold">
              Sparepart &amp; bengkel motor di <span className="text-sun">{shop.city}</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Ban, velg, shock, stang, oli, dan lainnya. Beli di toko, bisa langsung dipasang.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink('Halo Matahari Motor, saya mau tanya stok sparepart.')}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-merah px-5 py-3 font-medium transition-colors hover:bg-merah-dark"
              >
                Tanya stok via WhatsApp
              </a>
              <a
                href="#produk"
                className="rounded-md px-5 py-3 font-medium ring-1 ring-white/30 transition-colors hover:bg-white/10"
              >
                Lihat produk
              </a>
            </div>
            <p className="mt-7 flex items-center gap-2 text-sm text-white/80">
              <span className={`h-2 w-2 rounded-full ${status.open ? 'bg-green-500' : 'bg-white/40'}`} aria-hidden="true" />
              {status.text}
            </p>
          </div>

          <Speedo />
        </div>
      </div>

      <div className="border-b border-line">
        <dl className="mx-auto grid max-w-6xl gap-4 px-4 py-5 text-sm sm:grid-cols-3 sm:px-6">
          <div>
            <dt className="text-muted">Alamat</dt>
            <dd className="font-medium">
              {shop.address}, {shop.city}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Jam buka</dt>
            <dd className="font-medium">Senin – Sabtu, 08.00 – 17.00</dd>
          </div>
          <div>
            <dt className="text-muted">WhatsApp</dt>
            <dd className="font-medium">
              <a href={`tel:+${shop.whatsapp}`} className="hover:text-merah">
                {shop.phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Hero;
