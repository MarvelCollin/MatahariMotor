import SectionIntro from '../components/SectionIntro';
import { services } from '../data/services';
import { stagger } from 'animejs';
import { useStory } from '../lib/useStory';
import { waLink } from '../lib/wa';

const Services = () => {
  const root = useStory<HTMLElement>((timeline) => {
    timeline
      .add('.story-eyebrow', { opacity: [0, 1], x: [-16, 0] })
      .add('.story-title', { opacity: [0, 1], y: [28, 0] }, '-=560')
      .add('.story-body', { opacity: [0, 1], y: [20, 0] }, '-=520')
      .add('.story-row', { opacity: [0, 1], y: [24, 0], duration: 680, delay: stagger(90) }, '-=420')
      .add('.story-num', { opacity: [0, 1], scale: [0.4, 1], duration: 520, delay: stagger(90) }, '<<+=120');
  });

  return (
    <section id="services" ref={root} className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-16">
          <SectionIntro eyebrow="Bengkel" title="Servis" tone="dark">
            <p className="mt-5 text-lg text-white/60">Semua servis dikerjakan di toko, sparepart-nya tinggal ambil dari rak.</p>
            <a
              href={waLink('Halo Matahari Motor, saya mau booking servis.')}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 font-medium transition-colors hover:bg-brand-dark"
            >
              Booking via WhatsApp
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              >
                →
              </span>
            </a>
          </SectionIntro>

          <dl>
            {services.map((s, i) => (
              <div key={s.name} className="story-row flex gap-5 border-t border-white/10 py-5 last:border-b">
                <span className="story-num mt-1.5 font-head text-xs font-bold text-sun tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <dt className="font-head text-lg leading-snug font-bold sm:text-xl">{s.name}</dt>
                  <dd className="mt-1.5 text-white/60">{s.items.join(' · ')}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Services;
