import { useEffect, useRef } from 'react';
import rim from '../assets/products/rim-vnd.webp';
import { shop } from '../data/shop';
import { todayStatus } from '../lib/hours';
import { waLink } from '../lib/wa';

const Sun = () => {
  const rimRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (rimRef.current) rimRef.current.style.transform = `rotate(${Math.min(window.scrollY, 1500) / 3}deg)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="200" cy="200" r="196" fill="var(--color-ink)" />
        <path d="M200 22 A178 178 0 0 1 378 200" fill="none" stroke="var(--color-sun)" strokeWidth="14" />
        <path d="M378 200 A178 178 0 0 1 200 378" fill="none" stroke="var(--color-brand)" strokeWidth="14" />
        <path d="M200 378 A178 178 0 0 1 22 200" fill="none" stroke="var(--color-sun)" strokeWidth="14" />
        <path d="M22 200 A178 178 0 0 1 200 22" fill="none" stroke="var(--color-brand)" strokeWidth="14" />
        <circle cx="200" cy="200" r="150" fill="var(--color-sun)" />
        {Array.from({ length: 60 }).map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="36"
            x2="200"
            y2={i % 5 === 0 ? 50 : 44}
            stroke="var(--color-paper)"
            strokeWidth={i % 5 === 0 ? 2 : 1}
            transform={`rotate(${i * 6} 200 200)`}
          />
        ))}
      </svg>
      <img
        ref={rimRef}
        src={rim}
        alt="Velg racing VND, dijual di toko"
        width={277}
        height={278}
        className="absolute inset-[17%] h-[66%] w-[66%] object-contain"
      />
    </div>
  );
};

const Hero = () => {
  const status = todayStatus();

  return (
    <section id="top" className="border-b-2 border-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-12 md:items-center md:pt-16 md:pb-20">
        <div className="md:col-span-7">
          <p className="text-ink-soft">Sparepart &amp; bengkel motor · {shop.city}</p>
          <h1 className="mt-3 font-display text-[clamp(3.75rem,11vw,8.5rem)] leading-[0.86] font-black tracking-tight uppercase">
            Beli sparepart,
            <br />
            <span className="text-brand">pasang</span> di tempat.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Ban, velg, shock, stang, oli, dan lainnya. Pilih di etalase, mekanik kami yang pasang.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={waLink('Halo Matahari Motor, saya mau tanya stok sparepart.')}
              target="_blank"
              rel="noreferrer"
              className="bg-ink px-6 py-4 font-medium text-paper transition-colors hover:bg-brand"
            >
              Tanya stok via WhatsApp
            </a>
            <a href="#products" className="font-medium underline decoration-2 underline-offset-[6px] hover:text-brand">
              Lihat produk
            </a>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm">
            <span className={`h-2 w-2 rounded-full ${status.open ? 'bg-green-600' : 'bg-ink-soft'}`} aria-hidden="true" />
            {status.text}
          </p>
        </div>
        <div className="md:col-span-5">
          <Sun />
        </div>
      </div>

      <dl className="border-t-2 border-ink bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6">
          <div>
            <dt className="text-sm text-paper/60">Alamat</dt>
            <dd className="font-medium">
              {shop.address}, {shop.city}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-paper/60">Jam buka</dt>
            <dd className="font-medium">Senin – Sabtu, 08.00 – 17.00</dd>
          </div>
          <div>
            <dt className="text-sm text-paper/60">WhatsApp</dt>
            <dd className="font-medium">
              <a href={`tel:+${shop.whatsapp}`} className="hover:text-sun">
                {shop.phoneDisplay}
              </a>
            </dd>
          </div>
        </div>
      </dl>
    </section>
  );
};

export default Hero;
