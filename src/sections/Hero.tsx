import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { animate, createScope, createDrawable, stagger, onScroll, type Scope } from 'animejs';
import { animateBackdrop } from '../lib/useStory';
import Eyebrow from '../components/Eyebrow';
import StoryBackdrop from '../components/StoryBackdrop';
import rim from '../assets/products/rim-vnd.webp';
import { shop } from '../data/shop';
import { hoursLine } from '../lib/hours';
import { revealClass, useMounted, zoomClass } from '../lib/useInView';
import { waLink } from '../lib/wa';

const Speedo = () => {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope | null>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.story = 'in';
      return;
    }

    if (el.dataset.story === 'in') return;
    el.dataset.story = 'out';

    scope.current = createScope({ root }).add(() => {
      animate(el, {
        opacity: [0, 1],
        duration: 420,
        ease: 'out(2)',
        onComplete: () => {
          el.dataset.story = 'in';
        },
      });

      animate(createDrawable('.arc'), {
        draw: ['0 0', '0 1'],
        duration: 1000,
        delay: stagger(120),
        ease: 'inOut(3)',
      });

      animate('.tick', {
        opacity: [0, 1],
        duration: 500,
        delay: stagger(10, { start: 340 }),
        ease: 'out(3)',
      });

      animate('.hub', {
        r: [0, 132],
        duration: 1100,
        delay: 300,
        ease: 'out(4)',
      });

      animate('.rim', {
        rotate: 540,
        ease: 'linear',
        autoplay: onScroll({ sync: 0.35, enter: 'bottom top', leave: 'top bottom' }),
      });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <div ref={root} className="story-speedo relative aspect-square w-full">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path className="arc" d="M200 20 A180 180 0 0 1 380 200" fill="none" stroke="var(--color-sun)" strokeWidth="12" />
        <path className="arc" d="M380 200 A180 180 0 0 1 200 380" fill="none" stroke="var(--color-brand)" strokeWidth="12" />
        <path className="arc" d="M200 380 A180 180 0 0 1 20 200" fill="none" stroke="var(--color-sun)" strokeWidth="12" />
        <path className="arc" d="M20 200 A180 180 0 0 1 200 20" fill="none" stroke="var(--color-brand)" strokeWidth="12" />
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
};

type FactProps = { label: string; visible: boolean; delay: number; align?: 'left' | 'right'; children: ReactNode };

const Fact = ({ label, visible, delay, align = 'left', children }: FactProps) => (
  <div
    style={{ transitionDelay: `${delay}ms` }}
    className={`${align === 'right' ? 'md:text-right [&_dt]:md:justify-end' : ''} ${revealClass(visible, true)}`}
  >
    <Eyebrow as="dt" tone="dark">
      {label}
    </Eyebrow>
    <dd className="mt-2 font-head text-base leading-snug font-semibold">{children}</dd>
  </div>
);

const Hero = () => {
  const mounted = useMounted();
  const heroRef = useRef<HTMLElement>(null);
  const heroScope = useRef<Scope | null>(null);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    heroScope.current = createScope({ root: heroRef }).add(() => {
      animateBackdrop(el);
      animate('.story-rule', { scaleX: [0, 1], ease: 'inOut(3)', duration: 1200, delay: 200 });
    });

    return () => heroScope.current?.revert();
  }, []);

  const step = (i: number) => ({ transitionDelay: `${i * 90}ms` });

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden bg-ink text-white">
      <StoryBackdrop pattern="dots" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 text-center sm:px-6 md:pt-20">
        <h1
          style={step(1)}
          className={`mx-auto max-w-5xl text-[clamp(2.75rem,9vw,7.25rem)] leading-[0.92] font-extrabold tracking-[-0.02em] uppercase ${revealClass(mounted)}`}
        >
          Sparepart <span className="text-sun">&amp;</span> bengkel motor{' '}
          <span className="text-sun">{shop.city}</span>
        </h1>

        <p style={step(2)} className={`mx-auto mt-6 max-w-md text-lg text-white/70 ${revealClass(mounted)}`}>
          Ban, velg, shock, stang, oli, dan lainnya. Beli di toko, bisa langsung dipasang.
        </p>

        <div style={step(3)} className={`mt-8 flex flex-wrap justify-center gap-3 ${revealClass(mounted)}`}>
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
          <div style={step(2)} className={`md:order-2 ${zoomClass(mounted)}`}>
            <div className="mx-auto aspect-[2/1] w-[clamp(18rem,58vw,34rem)] overflow-hidden">
              <Speedo />
            </div>
          </div>
          <dl className="grid gap-6 border-t border-white/15 py-6 text-left md:order-1 md:border-t-0 md:pb-8">
            <Fact label="Alamat" visible={mounted} delay={420}>
              {shop.address}, {shop.city}
            </Fact>
          </dl>
          <dl className="grid gap-6 pb-8 text-left md:order-3 md:py-6 md:pb-8">
            <Fact label="Jam buka" visible={mounted} delay={500} align="right">
              {hoursLine}
            </Fact>
            <Fact label="WhatsApp" visible={mounted} delay={580} align="right">
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
