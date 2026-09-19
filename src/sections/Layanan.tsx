import rantai from '../assets/photos/rantai.webp';
import { services } from '../data/services';
import { waLink } from '../lib/wa';

const Layanan = () => (
  <section id="layanan" className="border-b-2 border-ink">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-12 md:py-24">
      <div className="md:col-span-5">
        <div className="md:sticky md:top-24">
          <h2 className="font-display text-6xl font-black uppercase leading-[0.9] sm:text-7xl">
            Servis di
            <br />
            bengkel kami
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink-soft">Datang langsung atau booking via WhatsApp.</p>
          <figure className="mt-8 hidden md:block">
            <img
              src={rantai}
              alt="Mekanik mengecek rantai motor"
              loading="lazy"
              className="aspect-[4/3] w-full border-2 border-ink object-cover grayscale-[35%]"
            />
          </figure>
        </div>
      </div>

      <ol className="md:col-span-7">
        {services.map((s, i) => (
          <li key={s.name} className="group grid grid-cols-[3rem_1fr] gap-x-4 border-t-2 border-ink py-7 last:border-b-2 sm:grid-cols-[4rem_1fr]">
            <span className="font-mono text-sm text-ink-soft">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="font-display text-4xl font-extrabold uppercase leading-none">{s.name}</h3>
                <a
                  href={waLink(`Halo Matahari Motor, saya mau booking ${s.name.toLowerCase()}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-merah underline decoration-2 underline-offset-4 hover:text-ink"
                >
                  Booking
                </a>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li key={it} className="border border-ink/40 px-2.5 py-1 text-sm">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Layanan;
