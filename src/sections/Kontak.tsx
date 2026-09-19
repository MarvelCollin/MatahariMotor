import { useState, type FormEvent } from 'react';
import { shop } from '../data/shop';
import { mapsLink, waLink } from '../lib/wa';

const topics = ['Tanya stok & harga', 'Booking servis', 'Lainnya'];

type Errors = Partial<Record<'nama' | 'pesan', string>>;

const field =
  'mt-2 block w-full border-2 border-ink bg-paper px-3 py-3 text-base outline-none transition-colors focus:bg-white aria-[invalid=true]:border-merah';

const Kontak = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nama = String(data.get('nama') ?? '').trim();
    const motor = String(data.get('motor') ?? '').trim();
    const topik = String(data.get('topik') ?? '');
    const pesan = String(data.get('pesan') ?? '').trim();

    const next: Errors = {};
    if (!nama) next.nama = 'Isi nama Anda dulu.';
    if (pesan.length < 5) next.pesan = 'Tulis pesan minimal 5 huruf.';
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(next.nama ? 'f-nama' : 'f-pesan')?.focus();
      return;
    }

    const head = [`Halo ${shop.name}, saya ${nama}.`, `Keperluan: ${topik}`];
    if (motor) head.push(`Motor: ${motor}`);
    const text = `${head.join('\n')}\n\n${pesan}`;
    window.open(waLink(text), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section id="kontak" className="border-b-2 border-ink bg-sun">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-6xl font-black uppercase leading-[0.9] sm:text-7xl">
            Mampir
            <br />
            atau chat
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed">
            Isi formulir ini, pesannya langsung terbuka di WhatsApp. Kami balas di jam buka toko.
          </p>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="font-mono text-sm">Alamat</dt>
              <dd className="mt-1 text-lg">
                {shop.address}
                <br />
                {shop.city}
                <br />
                <a
                  href={mapsLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block font-medium underline decoration-2 underline-offset-4 hover:text-merah"
                >
                  Buka di Google Maps
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-sm">Jam buka</dt>
              <dd className="mt-1">
                <table className="w-full max-w-xs text-lg">
                  <tbody>
                    {shop.hours.map((h) => (
                      <tr key={h.day}>
                        <th scope="row" className="py-0.5 pr-6 text-left font-normal">
                          {h.day}
                        </th>
                        <td className="py-0.5 text-right font-mono">{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-sm">WhatsApp &amp; telepon</dt>
              <dd className="mt-1 text-lg">
                <a href={`tel:+${shop.whatsapp}`} className="underline decoration-2 underline-offset-4 hover:text-merah">
                  {shop.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
          noValidate
          onSubmit={submit}
          className="border-2 border-ink bg-paper p-5 shadow-[8px_8px_0_var(--color-ink)] sm:p-8 lg:col-span-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="f-nama" className="font-medium">
                Nama
              </label>
              <input
                id="f-nama"
                name="nama"
                autoComplete="name"
                className={field}
                aria-invalid={!!errors.nama}
                aria-describedby={errors.nama ? 'err-nama' : undefined}
              />
              {errors.nama && (
                <span id="err-nama" className="mt-1 block text-sm text-merah">
                  {errors.nama}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="f-motor" className="font-medium">
                Motor <span className="font-normal text-ink-soft">(opsional)</span>
              </label>
              <input id="f-motor" name="motor" placeholder="Contoh: Vario 125 2019" className={field} />
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="font-medium">Keperluan</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {topics.map((t, i) => (
                <label key={t} className="cursor-pointer">
                  <input type="radio" name="topik" value={t} defaultChecked={i === 0} className="peer sr-only" />
                  <span className="block border-2 border-ink px-3 py-2 transition-colors peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-merah hover:bg-sun/40">
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <label htmlFor="f-pesan" className="font-medium">
              Pesan
            </label>
            <textarea
              id="f-pesan"
              name="pesan"
              rows={5}
              placeholder="Contoh: Ada ban Corsa ring 14 untuk belakang? Bisa dipasang hari Sabtu?"
              className={`${field} resize-y`}
              aria-invalid={!!errors.pesan}
              aria-describedby={errors.pesan ? 'err-pesan' : undefined}
            />
            {errors.pesan && (
              <span id="err-pesan" className="mt-1 block text-sm text-merah">
                {errors.pesan}
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="bg-ink px-6 py-4 font-medium text-paper transition-colors hover:bg-merah"
            >
              Kirim lewat WhatsApp
            </button>
            <p role="status" className="text-sm text-ink-soft">
              {sent ? 'WhatsApp sudah dibuka di tab baru. Tinggal tekan kirim.' : ''}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Kontak;
