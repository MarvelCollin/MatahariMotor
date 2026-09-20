import { useEffect, useRef, type ReactNode } from 'react';
import Eyebrow from '../components/Eyebrow';
import rim from '../assets/products/rim-vnd.webp';
import { shop } from '../data/shop';
import { hoursLine, todayStatus } from '../lib/hours';
import { revealClass, useMounted, zoomClass } from '../lib/useInView';
import { waLink } from '../lib/wa';

const Speedo = () => {
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
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M200 20 A180 180 0 0 1 380 200" fill="none" stroke="var(--color-sun)" strokeWidth="12" />
        <path d="M380 200 A180 180 0 0 1 200 380" fill="none" stroke="var(--color-brand)" strokeWidth="12" />
        <path d="M200 380 A180 180 0 0 1 20 200" fill="none" stroke="var(--color-sun)" strokeWidth="12" />
        <path d="M20 200 A180 180 0 0 1 200 20" fill="none" stroke="var(--color-brand)" strokeWidth="12" />
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
        ref={rimRef}
        src={rim}
        alt="Velg racing VND, dijual di toko"
        width={277}
        height={278}
        className="absolute inset-[19%] h-[62%] w-[62%] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]"
      />
    </div>
  );
};

type FactProps = { label: string; visible: boolean; delay: number; children: ReactNode };

const Fact = ({ label, visible, delay, children }: FactProps) => (
  <div
    style={{ transitionDelay: `${delay}ms` }}
    className={`border-t border-white/10 py-5 first:border-t-0 sm:border-t-0 sm:border-l sm:py-6 sm:pl-6 sm:first:border-l-0 sm:first:pl-0 ${revealClass(visible, true)}`}
  >
    <Eyebrow as="dt" tone="dark">
      {label}
    </Eyebrow>
    <dd className="mt-2 font-head text-base leading-snug font-semibold">{children}</dd>
  </div>
);

const Hero = () => {
  const status = todayStatus();
  const mounted = useMounted();
  const step = (i: number) => ({ transitionDelay: `${i * 90}ms` });

  return (
    <section id="top" className="bg-ink text-white">
      <div className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-20 md:pb-16">
          <div>
            <h1
              style={step(0)}
              className={`text-[clamp(2.6rem,7vw,4.75rem)] leading-[1.02] font-extrabold ${revealClass(mounted)}`}
            >
              Sparepart &amp; bengkel motor di <span className="text-sun">{shop.city}</span>
            </h1>
            <p style={step(1)} className={`mt-6 max-w-md text-lg text-white/70 ${revealClass(mounted)}`}>
              Ban, velg, shock, stang, oli, dan lainnya. Beli di toko, bisa langsung dipasang.
            </p>
            <div style={step(2)} className={`mt-8 flex flex-wrap gap-3 ${revealClass(mounted)}`}>
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
            <div style={step(3)} className={`mt-7 ${revealClass(mounted)}`}>
              <p className="inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-3 text-sm text-white/80 ring-1 ring-white/15">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  {status.open && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:hidden" />
                  )}
                  <span className={`relative h-2 w-2 rounded-full ${status.open ? 'bg-green-400' : 'bg-white/40'}`} />
                </span>
                {status.text}
              </p>
            </div>
          </div>

          <div style={step(1)} className={zoomClass(mounted)}>
            <Speedo />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <dl className="mx-auto grid max-w-6xl px-4 sm:grid-cols-3 sm:px-6">
          <Fact label="Alamat" visible={mounted} delay={420}>
            {shop.address}, {shop.city}
          </Fact>
          <Fact label="Jam buka" visible={mounted} delay={500}>
            {hoursLine}
          </Fact>
          <Fact label="WhatsApp" visible={mounted} delay={580}>
            <a href={`tel:+${shop.whatsapp}`} className="transition-colors hover:text-sun">
              {shop.phoneDisplay}
            </a>
          </Fact>
        </dl>
      </div>
    </section>
  );
};

export default Hero;
