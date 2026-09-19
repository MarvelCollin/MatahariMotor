import { products } from '../data/products';
import { waLink } from '../lib/wa';

const Produk = () => (
  <section id="produk" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h2 className="text-3xl font-extrabold sm:text-4xl">Produk di toko</h2>
      <p className="text-muted">Harga sesuai ukuran &amp; tipe motor.</p>
    </div>

    <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
      {products.map((p) => (
        <li key={p.id} className="flex flex-col">
          <div className="relative aspect-square rounded-xl bg-tile">
            <img
              src={p.image}
              alt={p.name}
              width={p.width}
              height={p.height}
              loading="lazy"
              className="absolute inset-[12%] h-[76%] w-[76%] object-contain"
            />
          </div>
          <p className="mt-3 text-sm text-muted">{p.category}</p>
          <h3 className="text-lg leading-snug font-bold">{p.name}</h3>
          <a
            href={waLink(`Halo Matahari Motor, saya mau tanya harga dan stok ${p.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-auto pt-3 font-medium text-merah hover:underline"
          >
            Tanya harga →
          </a>
        </li>
      ))}
    </ul>

    <p className="mt-10 text-muted">Juga ada oli, aki, busi, kampas rem, rantai &amp; gir, dan lampu.</p>
  </section>
);

export default Produk;
