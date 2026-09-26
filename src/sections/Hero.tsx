import type { ReactNode } from 'react';
import Eyebrow from '../components/Eyebrow';
import StoryBackdrop from '../components/StoryBackdrop';
import rim from '../assets/products/rim-vnd.webp';
import { shop } from '../data/shop';
import { hoursLine } from '../lib/hours';
import { waLink } from '../lib/wa';

const arcs = [
  { d: 'M200 20 A180 180 0 0 1 380 200', stroke: 'var(--color-sun)' },
  { d: 'M380 200 A180 180 0 0 1 200 380', stroke: 'var(--color-brand)' },
  { d: 'M200 380 A180 180 0 0 1 20 200', stroke: 'var(--color-sun)' },
  { d: 'M20 200 A180 180 0 0 1 200 20', stroke: 'var(--color-brand)' },
];

const Speedo = () => (
  <div className="speedo relative aspect-square w-full">
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {arcs.map((a, i) => (
        <path
          key={a.d}
          className="arc"
          d={a.d}
          pathLength={1}
          fill="none"
          stroke={a.stroke}
          strokeWidth="12"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
      {Array.from({ length: 60 }).map((_, i) => (
        <line
          key={i}
          className="tick"
          x1="200"
          y1="38"
          x2="200"
          y2={i % 5 === 0 ? 56 : 46}
          stroke={i % 5 === 0 ? '#fff' : 'rgba(255,255,255,0.35)'}
          strokeWidth={i % 5 === 0 ? 2.5 : 1.25}
          transform={`rotate(${i * 6} 200 200)`}
          style={{ animationDelay: `${340 + i * 10}ms` }}
        />
      ))}
      <circle className="hub" cx="200" cy="200" r="132" fill="var(--color-sun)" />
    </svg>
    <img
      src={rim}
      alt="Velg racing VND, dijual di toko"
      width={277}
      height={278}
      className="rim absolute inset-[19%] h-[62%] w-[62%] object-contain will-change-transform"
    />
  </div>
);

type FactProps = { label: string; delay: number; align?: 'left' | 'right'; children: ReactNode };

const Fact = ({ label, delay, align = 'left', children }: FactProps) => (
  <div
    style={{ animationDelay: `${delay}ms` }}
    className={`hero-rise hero-rise-near ${align === 'right' ? 'md:text-right [&_dt]:md:justify-end' : ''}`}
  >
    <Eyebrow as="dt" tone="dark">
      {label}
    </Eyebrow>
    <dd className="mt-2 font-head text-base leading-snug font-semibold">{children}</dd>
  </div>
);

const Hero = () => {
  const step = (i: number) => ({ animationDelay: `${i * 90}ms` });

  return (
    <section id="top" className="relative overflow-hidden bg-ink text-white">
      <StoryBackdrop pattern="dots" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 text-center sm:px-6 md:pt-20">
        <h1
          style={step(1)}
          className="hero-rise mx-auto max-w-5xl text-[clamp(2.75rem,9vw,7.25rem)] leading-[0.92] font-extrabold tracking-[-0.02em] uppercase"
        >
          Sparepart <span className="text-sun">&amp;</span> bengkel motor{' '}
          <span className="text-sun">{shop.city}</span>
        </h1>

        <p style={step(2)} className="hero-rise mx-auto mt-6 max-w-md text-lg text-white/70">
          Ban, velg, shock, stang, oli, dan lainnya. Beli di toko, bisa langsung dipasang.
        </p>

        <div style={step(3)} className="hero-rise mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={waLink('Halo Matahari Motor, saya mau tanya stok sparepart.')}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-brand px-5 py-3 font-medium transition-colors hover:bg-brand-dark"
          >
            Tanya stok via WhatsApp
          </a>
          <a
            href="#products"
            className="rounded-md px-5 py-3 font-medium ring-1 ring-white/30 transition-colors hover:bg-white/10"
          >
            Lihat produk
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 max-w-6xl px-4 sm:px-6 md:mt-16">
        <div className="grid items-end gap-x-10 md:grid-cols-[1fr_auto_1fr]">
          <div style={step(2)} className="hero-zoom md:order-2">
            <div className="mx-auto aspect-[2/1] w-[clamp(18rem,58vw,34rem)] overflow-hidden">
              <Speedo />
            </div>
          </div>
          <dl className="grid gap-6 border-t border-white/15 py-6 text-left md:order-1 md:border-t-0 md:pb-8">
            <Fact label="Alamat" delay={420}>
              {shop.address}, {shop.city}
            </Fact>
          </dl>
          <dl className="grid gap-6 pb-8 text-left md:order-3 md:py-6 md:pb-8">
            <Fact label="Jam buka" delay={500} align="right">
              {hoursLine}
            </Fact>
            <Fact label="WhatsApp" delay={580} align="right">
              <a href={`tel:+${shop.whatsapp}`} className="transition-colors hover:text-sun">
                {shop.phoneDisplay}
              </a>
            </Fact>
          </dl>
        </div>
      </div>
      <div className="relative z-10 h-px bg-white/15" aria-hidden="true" />
    </section>
  );
};

export default Hero;
