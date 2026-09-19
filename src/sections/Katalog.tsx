import { useRef, useState } from 'react';
import { products } from '../data/products';
import { categories } from '../data/shop';
import { waLink } from '../lib/wa';

const grid = {
  backgroundImage:
    'linear-gradient(var(--color-paper-deep) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper-deep) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
};

const Katalog = () => {
  const [activeId, setActiveId] = useState(products[0].id);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = products.find((p) => p.id === activeId) ?? products[0];
  const landscape = active.width > active.height * 2;

  const choose = (id: string) => {
    setActiveId(id);
    if (window.matchMedia('(max-width: 1023px)').matches) {
      panelRef.current?.scrollIntoView({ block: 'start' });
    }
  };

  return (
    <section id="katalog" className="border-b-2 border-ink bg-paper-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-6xl font-black uppercase leading-[0.9] sm:text-7xl">
            Ada di
            <br />
            etalase
          </h2>
          <p className="max-w-sm text-ink-soft">
            Sebagian barang yang sering dicari. Harga mengikuti ukuran dan tipe motor, jadi tanya dulu lewat WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid border-2 border-ink bg-paper lg:grid-cols-12">
          <div className="border-b-2 border-ink lg:col-span-5 lg:border-r-2 lg:border-b-0" role="tablist" aria-label="Produk">
            {products.map((p, i) => {
              const selected = p.id === active.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls="panel-produk"
                  onClick={() => choose(p.id)}
                  className={`grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-ink/25 px-5 py-5 text-left transition-colors not-last:border-b ${
                    selected ? 'bg-ink text-paper' : 'hover:bg-sun/30'
                  }`}
                >
                  <span className={`font-mono text-sm ${selected ? 'text-sun' : 'text-ink-soft'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-bold uppercase leading-tight sm:text-3xl">{p.name}</span>
                    <span className={`text-sm ${selected ? 'text-paper/70' : 'text-ink-soft'}`}>{p.category}</span>
                  </span>
                  <span aria-hidden="true" className={`text-2xl ${selected ? '' : 'opacity-0'}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="panel-produk"
            ref={panelRef}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className="grid sm:grid-cols-2 lg:col-span-7"
          >
            <div
              className="relative flex min-h-72 items-center justify-center border-b-2 border-ink p-8 sm:border-r-2 sm:border-b-0"
              style={grid}
            >
              <img
                key={active.id}
                src={active.image}
                alt={active.name}
                width={active.width}
                height={active.height}
                className={`object-contain ${landscape ? 'h-auto w-full max-w-sm' : 'max-h-80 w-auto'}`}
              />
              <span className="absolute top-3 left-3 bg-sun px-2 py-0.5 font-mono text-xs">{active.brand}</span>
            </div>
            <div className="flex flex-col p-6 sm:p-8">
              <h3 className="font-display text-4xl font-extrabold uppercase leading-none">{active.name}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{active.summary}</p>
              <dl className="mt-6 border-t border-ink/25">
                {active.specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-ink/25 py-2.5 text-sm">
                    <dt className="text-ink-soft">{k}</dt>
                    <dd className="font-mono">{v}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={waLink(`Halo Matahari Motor, saya mau tanya harga dan stok ${active.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-8 bg-ink px-5 py-4 text-center font-medium text-paper transition-colors hover:bg-merah"
              >
                Tanya harga &amp; stok
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-3xl leading-relaxed">
          <span className="font-medium">Juga tersedia:</span>{' '}
          <span className="text-ink-soft">
            {categories.slice(4).join(', ').toLowerCase()}. Kalau barangnya tidak ada di daftar, tetap tanyakan saja.
          </span>
        </p>
      </div>
    </section>
  );
};

export default Katalog;
