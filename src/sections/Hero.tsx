import { useEffect, useRef } from 'react';
import velg from '../assets/products/velg-vnd.webp';
import { categories, shop } from '../data/shop';
import { mapsLink, waLink } from '../lib/wa';

const Sun = () => {
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
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="200" cy="200" r="196" fill="var(--color-ink)" />
        <path d="M200 22 A178 178 0 0 1 378 200" fill="none" stroke="var(--color-sun)" strokeWidth="14" />
        <path d="M378 200 A178 178 0 0 1 200 378" fill="none" stroke="var(--color-merah)" strokeWidth="14" />
        <path d="M200 378 A178 178 0 0 1 22 200" fill="none" stroke="var(--color-sun)" strokeWidth="14" />
        <path d="M22 200 A178 178 0 0 1 200 22" fill="none" stroke="var(--color-merah)" strokeWidth="14" />
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
        ref={rim}
        src={velg}
        alt="Velg racing VND lima palang"
        width={277}
        height={278}
        className="absolute inset-[17%] h-[66%] w-[66%] object-contain drop-shadow-[6px_8px_0_rgba(23,20,15,0.35)]"
      />
      <p className="absolute -bottom-2 left-0 bg-paper px-2 py-1 font-mono text-xs sm:text-sm">
        Velg VND · ada di toko
      </p>
    </div>
  );
};

const Hero = () => (
  <section id="top" className="border-b-2 border-ink">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-12 md:items-center md:pt-16 md:pb-20">
      <div className="md:col-span-7">
        <p className="font-mono text-sm text-ink-soft">
          Onderdil &amp; bengkel motor · {shop.city}
        </p>
        <h1 className="mt-4 font-display text-[clamp(3.75rem,11vw,8.5rem)] font-black uppercase leading-[0.86] tracking-tight">
          Beli onderdil,
          <br />
          <span className="text-merah">pasang</span> di tempat.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          Ban, velg, shock, stang, oli. Pilih di etalase, mekanik kami yang pasang.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={waLink('Halo Matahari Motor, saya mau tanya stok onderdil.')}
            target="_blank"
            rel="noreferrer"
            className="bg-ink px-6 py-4 font-medium text-paper shadow-[5px_5px_0_var(--color-sun)] transition-[background-color,box-shadow,translate] hover:bg-merah active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Tanya stok via WhatsApp
          </a>
          <a href="#katalog" className="font-medium underline decoration-2 underline-offset-[6px] hover:text-merah">
            Lihat katalog
          </a>
        </div>
        <a
          href={mapsLink()}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-baseline gap-2 font-mono text-sm text-ink-soft hover:text-ink"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-merah" aria-hidden="true" />
          <span>
            Jl. Lintas Melawi, {shop.city} · <span className="whitespace-nowrap">{shop.phoneDisplay}</span>
          </span>
        </a>
      </div>
      <div className="md:col-span-5">
        <Sun />
      </div>
    </div>

    <div className="overflow-hidden border-t-2 border-ink bg-ink py-3 text-paper" aria-hidden="true">
      <div className="marquee flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {categories.map((c) => (
              <span key={c} className="flex items-center font-display text-2xl font-bold uppercase">
                <span className="px-6">{c}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-sun" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
