import type { ComponentType, SVGProps } from 'react';
import IconBattery from '~icons/mdi/car-battery';
import IconBrake from '~icons/mdi/car-brake-alert';
import IconCogs from '~icons/mdi/cogs';
import IconOil from '~icons/mdi/oil';
import IconTire from '~icons/mdi/tire';
import IconShock from '~icons/solar/shock-absorber-bold';
import { services, type Part } from '../data/services';
import { waLink } from '../lib/wa';

const icons: Record<Part, ComponentType<SVGProps<SVGSVGElement>>> = {
  engine: IconOil,
  cvt: IconCogs,
  wheels: IconTire,
  suspension: IconShock,
  brakes: IconBrake,
  electrical: IconBattery,
};

const Services = () => (
  <section id="services" className="border-b-2 border-ink">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-12 md:py-24">
      <div className="md:col-span-5">
        <div className="md:sticky md:top-24">
          <h2 className="font-display text-6xl leading-[0.9] font-black uppercase sm:text-7xl">
            Servis di
            <br />
            bengkel kami
          </h2>
          <p className="mt-5 max-w-sm text-lg text-ink-soft">Datang langsung atau booking dulu lewat WhatsApp.</p>
        </div>
      </div>

      <ul className="md:col-span-7">
        {services.map((s) => {
          const PartIcon = icons[s.part];
          return (
            <li key={s.part} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t-2 border-ink py-6 last:border-b-2 sm:grid-cols-[3.5rem_1fr]">
              <PartIcon aria-hidden="true" className="h-10 w-10 text-brand sm:h-11 sm:w-11" />
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-4xl leading-none font-extrabold uppercase">{s.name}</h3>
                  <a
                    href={waLink(`Halo Matahari Motor, saya mau booking ${s.name.toLowerCase()}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-brand underline decoration-2 underline-offset-4 hover:text-ink"
                  >
                    Booking
                  </a>
                </div>
                <p className="mt-2 text-ink-soft">
                  {s.items.map((it, i) => (i ? it[0].toLowerCase() + it.slice(1) : it)).join(', ')}.
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Services;
