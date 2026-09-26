import SectionIntro from '../components/SectionIntro';
import Sprocket from '../components/Sprocket';
import StoryBackdrop from '../components/StoryBackdrop';
import { services } from '../data/services';
import { waLink } from '../lib/wa';

const Services = () => (
  <section id="services" className="story relative overflow-clip bg-ink text-white">
    <StoryBackdrop pattern="grid" />
    <Sprocket className="gear pointer-events-none absolute -top-40 -right-56 z-0 w-[25rem] text-sun/20 md:top-auto md:-bottom-64 md:-left-48 md:right-auto md:w-[44rem]" />
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-16">
        <SectionIntro eyebrow="Bengkel" title="Servis" tone="dark">
          <p className="mt-5 text-lg text-white/60">
            Semua servis dikerjakan di toko, sparepart-nya tinggal ambil dari rak.
          </p>
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

        <ul>
          {services.map((s, i) => (
            <li key={s.name} className="story-row flex gap-5 border-t border-white/10 py-5 last:border-b">
              <span aria-hidden="true" className="mt-1 font-head text-sm font-bold text-sun tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-head text-xl leading-snug font-bold sm:text-2xl">{s.name}</h3>
                <p className="mt-1.5 text-white/60">{s.items.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Services;
