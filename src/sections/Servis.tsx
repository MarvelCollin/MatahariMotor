import { services } from '../data/services';
import { waLink } from '../lib/wa';

const Servis = () => (
  <section id="servis" className="bg-tile">
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Servis</h2>
        <a
          href={waLink('Halo Matahari Motor, saya mau booking servis.')}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-merah hover:underline"
        >
          Booking via WhatsApp →
        </a>
      </div>

      <dl className="mt-8 grid gap-x-12 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.name} className="border-t border-ink/15 py-5">
            <dt className="text-lg font-bold">{s.name}</dt>
            <dd className="mt-1 text-muted">{s.items.map((it, i) => (i ? it[0].toLowerCase() + it.slice(1) : it)).join(', ')}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Servis;
