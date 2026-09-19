import { shop } from '../data/shop';
import { mapsEmbed, mapsLink, waLink } from '../lib/wa';

const Location = () => (
  <section id="location" className="border-b-2 border-ink bg-sun">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h2 className="font-display text-6xl leading-[0.9] font-black uppercase sm:text-7xl">
          Mampir
          <br />
          ke toko
        </h2>
        <address className="mt-8 text-lg not-italic">
          {shop.address}
          <br />
          {shop.district}
          <br />
          {shop.region}
        </address>
        <table className="mt-6 text-lg">
          <tbody>
            {shop.hours.map((h) => (
              <tr key={h.day}>
                <th scope="row" className="py-0.5 pr-8 text-left font-normal">
                  {h.day}
                </th>
                <td className="py-0.5 font-medium">{h.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={waLink('Halo Matahari Motor, saya mau tanya.')}
            target="_blank"
            rel="noreferrer"
            className="bg-ink px-6 py-4 font-medium text-paper transition-colors hover:bg-brand"
          >
            WhatsApp {shop.phoneDisplay}
          </a>
          <a
            href={mapsLink()}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline decoration-2 underline-offset-[6px] hover:text-brand"
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
        className="aspect-[4/3] w-full border-2 border-ink bg-paper lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]"
      />
    </div>
  </section>
);

export default Location;
