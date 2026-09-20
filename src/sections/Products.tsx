import Eyebrow from '../components/Eyebrow';
import SectionIntro from '../components/SectionIntro';
import { products } from '../data/products';
import { stagger } from 'animejs';
import { useStory } from '../lib/useStory';
import { waLink } from '../lib/wa';

const Products = () => {
  const root = useStory<HTMLElement>((timeline) => {
    timeline
      .add('.story-eyebrow', { opacity: [0, 1], x: [-16, 0] })
      .add('.story-title', { opacity: [0, 1], y: [28, 0] }, '-=560')
      .add('.story-body', { opacity: [0, 1], y: [20, 0] }, '-=520')
      .add('.story-card', { opacity: [0, 1], y: [32, 0], duration: 720, delay: stagger(95) }, '-=420')
      .add('.story-shot', { scale: [1.08, 1], duration: 900, delay: stagger(95) }, '<<');
  });

  return (
    <section id="products" ref={root} className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-16">
        <SectionIntro eyebrow="Katalog" title="Produk di toko">
          <p className="mt-5 text-lg text-muted">Harga sesuai ukuran &amp; tipe motor. Tanya stok lewat WhatsApp.</p>
          <div className="mt-8 border-t border-line pt-5">
            <Eyebrow>Juga tersedia</Eyebrow>
            <p className="mt-2 text-muted">Oli, aki, busi, kampas rem, rantai &amp; gir, dan lampu.</p>
          </div>
        </SectionIntro>

        <ul className="grid grid-cols-2 gap-x-5 gap-y-10">
          {products.map((p, i) => (
            <li
              key={p.id}
              className="story-card group relative flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-tile ring-1 ring-ink/5 transition-colors duration-200 group-hover:bg-[#e9e9e7]">
                <span className="absolute top-3.5 left-4 font-head text-xs font-bold text-ink/25 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute top-3.5 right-4 text-[0.625rem] font-medium tracking-[0.18em] text-ink/40 uppercase">
                  {p.category}
                </span>
                <img
                  src={p.image}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  className="story-shot absolute inset-[13%] h-[74%] w-[74%] object-contain transition-transform duration-300 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <h3 className="mt-4 text-lg leading-snug font-bold sm:text-xl">{p.name}</h3>
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
      </div>
    </section>
  );
};

export default Products;
