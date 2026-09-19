import cvt from '../assets/photos/bengkel-cvt.webp';
import suzuki from '../assets/photos/bengkel-suzuki.webp';

const notes = [
  {
    title: 'Barang dan jasa di satu tempat',
    body: 'Beli onderdil di etalase, pasang di bengkel sebelah. Tidak perlu bawa barang dari toko lain.',
  },
  {
    title: 'Harga disebut di depan',
    body: 'Sebelum mulai, mekanik menjelaskan apa yang rusak dan berapa biayanya. Anda yang putuskan.',
  },
  {
    title: 'Barang lama dikembalikan',
    body: 'Onderdil yang diganti kami serahkan ke Anda, supaya jelas apa yang sudah dikerjakan.',
  },
];

const Bengkel = () => (
  <section id="bengkel" className="border-b-2 border-ink">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <div className="grid gap-10 md:grid-cols-12">
        <h2 className="font-display text-6xl font-black uppercase leading-[0.9] sm:text-7xl md:col-span-5">
          Tentang
          <br />
          <span className="text-merah">Matahari</span> Motor
        </h2>
        <p className="text-xl leading-relaxed md:col-span-7 md:pt-2">
          Toko onderdil yang sekaligus punya bengkel, di Jalan Lintas Melawi, Ladang, Sintang. Banyak pelanggan datang
          untuk beli satu barang lalu minta sekalian dipasang. Dari situ bengkelnya tumbuh: servis rutin, CVT, suspensi,
          sampai kelistrikan.
        </p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-12">
        <figure className="md:col-span-8">
          <img
            src={cvt}
            alt="Mekanik membongkar CVT motor matic di lantai bengkel"
            loading="lazy"
            className="aspect-[16/10] w-full border-2 border-ink object-cover"
          />
        </figure>
        <figure className="md:col-span-4">
          <img
            src={suzuki}
            alt="Mekanik memperbaiki motor trail di bengkel"
            loading="lazy"
            className="aspect-[16/10] w-full border-2 border-ink object-cover md:aspect-auto md:h-full"
          />
        </figure>
      </div>

      <dl className="mt-14 grid gap-x-10 md:grid-cols-3">
        {notes.map((n) => (
          <div key={n.title} className="border-t-2 border-ink py-6">
            <dt className="font-display text-3xl font-extrabold uppercase leading-none">{n.title}</dt>
            <dd className="mt-3 leading-relaxed text-ink-soft">{n.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Bengkel;
