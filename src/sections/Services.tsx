import Eyebrow from '../components/Eyebrow';
import { services } from '../data/services';
import { waLink } from '../lib/wa';

const Services = () => (
  <section id="services" className="bg-tile">
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <Eyebrow>Bengkel</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Servis</h2>
        </div>
        <a
          href={waLink('Halo Matahari Motor, saya mau booking servis.')}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
        >
          Booking via WhatsApp
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          >
            →
          </span>
        </a>
      </header>

      <dl className="mt-10 grid gap-x-12 sm:grid-cols-2">
        {services.map((s, i) => (
          <div key={s.name} className="flex gap-4 border-t border-ink/15 py-5">
            <span className="mt-1.5 font-head text-xs font-bold text-ink/30 tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <dt className="font-head text-lg leading-snug font-bold">{s.name}</dt>
              <dd className="mt-1.5 text-muted">{s.items.join(' · ')}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Services;
