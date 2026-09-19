import Eyebrow from '../components/Eyebrow';
import { products } from '../data/products';
import { waLink } from '../lib/wa';

const Products = () => (
  <section id="products" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
    <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <Eyebrow>Katalog</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Produk di toko</h2>
      </div>
      <p className="text-muted">Harga sesuai ukuran &amp; tipe motor.</p>
    </header>

    <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
      {products.map((p, i) => (
        <li key={p.id} className="group relative flex flex-col">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-tile ring-1 ring-ink/5 transition-colors duration-200 group-hover:bg-[#e9e9e7]">
            <span className="absolute top-3 left-3.5 font-head text-xs font-bold text-ink/25 tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <img
              src={p.image}
              alt={p.name}
              width={p.width}
              height={p.height}
              loading="lazy"
              className="absolute inset-[12%] h-[76%] w-[76%] object-contain transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
          <p className="mt-4 text-[0.6875rem] font-medium tracking-[0.18em] text-muted uppercase">{p.category}</p>
          <h3 className="mt-1.5 text-lg leading-snug font-bold">{p.name}</h3>
          <a
            href={waLink(`Halo Matahari Motor, saya mau tanya harga dan stok ${p.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-1.5 pt-3 font-medium text-brand group-hover:underline after:absolute after:inset-0"
          >
            Tanya harga
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </a>
        </li>
      ))}
    </ul>

    <div className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-t border-line pt-5">
      <Eyebrow>Juga tersedia</Eyebrow>
      <p className="text-muted">Oli, aki, busi, kampas rem, rantai &amp; gir, dan lampu.</p>
    </div>
  </section>
);

export default Products;
