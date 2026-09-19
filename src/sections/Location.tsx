import { shop } from '../data/shop';
import { mapsEmbed, mapsLink, waLink } from '../lib/wa';

const Location = () => (
  <section id="location" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
    <div className="grid gap-10 md:grid-cols-5">
      <div className="md:col-span-2">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Lokasi</h2>
        <address className="mt-6 text-lg not-italic">
          {shop.address}
          <br />
          {shop.district}
          <br />
          {shop.region}
        </address>

        <table className="mt-6 text-left">
          <tbody>
            {shop.hours.map((h) => (
              <tr key={h.day}>
                <th scope="row" className="py-1 pr-6 font-normal text-muted">
                  {h.day}
                </th>
                <td className="py-1 font-medium">{h.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

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
        className="aspect-[4/3] w-full rounded-xl bg-tile md:col-span-3 md:aspect-auto md:min-h-96"
      />
    </div>
  </section>
);

export default Location;
