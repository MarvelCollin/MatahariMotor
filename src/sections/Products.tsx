import { useRef, useState } from 'react';
import { products } from '../data/products';
import { waLink } from '../lib/wa';

const Products = () => {
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
    <section id="products" className="border-b-2 border-ink bg-paper-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-6xl leading-[0.9] font-black uppercase sm:text-7xl">
            Ada di
            <br />
            etalase
          </h2>
          <p className="max-w-xs text-ink-soft">Harga sesuai ukuran dan tipe motor.</p>
        </div>

        <div className="mt-12 grid border-2 border-ink bg-paper lg:grid-cols-12">
          <div className="border-b-2 border-ink lg:col-span-5 lg:border-r-2 lg:border-b-0" role="tablist" aria-label="Produk">
            {products.map((p) => {
              const selected = p.id === active.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls="product-panel"
                  onClick={() => choose(p.id)}
                  className={`flex w-full items-center justify-between gap-3 border-ink/25 px-5 py-5 text-left transition-colors not-last:border-b ${
                    selected ? 'bg-ink text-paper' : 'hover:bg-sun/30'
                  }`}
                >
                  <span>
                    <span className="block font-display text-2xl leading-tight font-bold uppercase sm:text-3xl">{p.name}</span>
                    <span className={`text-sm ${selected ? 'text-paper/70' : 'text-ink-soft'}`}>{p.category}</span>
                  </span>
                  <span aria-hidden="true" className={`text-2xl ${selected ? 'text-sun' : 'opacity-0'}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="product-panel"
            ref={panelRef}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className="flex flex-col lg:col-span-7"
          >
            <div className="flex min-h-80 flex-1 items-center justify-center p-10">
              <img
                key={active.id}
                src={active.image}
                alt={active.name}
                width={active.width}
                height={active.height}
                className={`object-contain ${landscape ? 'h-auto w-full max-w-md' : 'max-h-80 w-auto'}`}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink p-5 sm:p-6">
              <div>
                <h3 className="font-display text-3xl leading-none font-extrabold uppercase">{active.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{active.category} · bisa langsung dipasang</p>
              </div>
              <a
                href={waLink(`Halo Matahari Motor, saya mau tanya harga dan stok ${active.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="bg-ink px-5 py-3 font-medium text-paper transition-colors hover:bg-brand"
              >
                Tanya harga &amp; stok
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-ink-soft">Juga ada oli, aki, busi, kampas rem, rantai &amp; gir, dan lampu.</p>
      </div>
    </section>
  );
};

export default Products;
