import type { ReactNode } from 'react';
import Eyebrow from '../components/Eyebrow';
import { shop } from '../data/shop';
import { hoursLine } from '../lib/hours';
import { mapsEmbed, mapsLink, waLink } from '../lib/wa';

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="border-b border-line py-4">
    <Eyebrow as="dt">{label}</Eyebrow>
    <dd className="mt-2 font-head leading-relaxed font-semibold">{children}</dd>
  </div>
);

const Location = () => (
  <section id="location" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
    <header>
      <Eyebrow>Kunjungi</Eyebrow>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Lokasi</h2>
    </header>

    <div className="mt-10 grid gap-10 md:grid-cols-5">
      <div className="md:col-span-2">
        <dl className="border-t border-line">
          <Row label="Alamat">
            <address className="not-italic">
              {shop.address}
              <br />
              {shop.district}
              <br />
              {shop.region}
            </address>
          </Row>
          <Row label="Jam buka">{hoursLine}</Row>
          <Row label="WhatsApp">
            <a href={`tel:+${shop.whatsapp}`} className="transition-colors hover:text-brand">
              {shop.phoneDisplay}
            </a>
          </Row>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink('Halo Matahari Motor, saya mau tanya.')}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-brand px-5 py-3 font-medium text-white transition-colors hover:bg-brand-dark"
          >
            WhatsApp {shop.phoneDisplay}
          </a>
          <a
            href={mapsLink()}
            target="_blank"
            rel="noreferrer"
            className="rounded-md px-5 py-3 font-medium ring-1 ring-ink/25 transition-colors hover:bg-tile"
          >
            Petunjuk arah
          </a>
        </div>
      </div>

      <iframe
        title="Peta lokasi Matahari Motor"
        src={mapsEmbed()}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[4/3] w-full rounded-xl bg-tile ring-1 ring-ink/5 md:col-span-3 md:aspect-auto md:min-h-96"
      />
    </div>
  </section>
);

export default Location;
