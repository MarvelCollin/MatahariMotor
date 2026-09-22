import type { ReactNode } from 'react';
import Eyebrow from '../components/Eyebrow';
import SectionIntro from '../components/SectionIntro';
import StoryBackdrop from '../components/StoryBackdrop';
import { shop } from '../data/shop';
import { hoursLine } from '../lib/hours';
import { useStory } from '../lib/useStory';
import { mapsEmbed, mapsLink, waLink } from '../lib/wa';

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="border-b border-line py-4">
    <Eyebrow as="dt">{label}</Eyebrow>
    <dd className="mt-2 font-head leading-relaxed font-semibold">{children}</dd>
  </div>
);

const Location = () => {
  const root = useStory<HTMLElement>();

  return (
    <section id="location" ref={root} className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28">
      <StoryBackdrop tone="light" pattern="grid" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-16">
        <SectionIntro eyebrow="Kunjungi" title="Lokasi">
          <dl className="mt-8 border-t border-line">
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
              Chat WhatsApp
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
        </SectionIntro>

        <iframe
          title="Peta lokasi Matahari Motor"
          src={mapsEmbed()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="story-map aspect-[4/3] w-full rounded-xl bg-tile ring-1 ring-ink/5 md:aspect-auto md:min-h-[34rem]"
        />
      </div>
    </section>
  );
};

export default Location;
