import cvt from '../assets/photos/bengkel-cvt.webp';
import suzuki from '../assets/photos/bengkel-suzuki.webp';

const Bengkel = () => (
  <section id="bengkel" className="border-b-2 border-ink">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-6xl font-black uppercase leading-[0.9] sm:text-7xl">
          Toko &amp;
          <br />
          <span className="text-merah">bengkel</span>
        </h2>
        <p className="max-w-xs text-lg text-ink-soft">Beli barangnya, langsung dipasang di tempat. Jl. Lintas Melawi, Sintang.</p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-12">
        <img
          src={cvt}
          alt="Mekanik membongkar CVT motor matic"
          loading="lazy"
          className="aspect-[16/10] w-full border-2 border-ink object-cover md:col-span-8"
        />
        <img
          src={suzuki}
          alt="Mekanik memperbaiki motor trail"
          loading="lazy"
          className="aspect-[16/10] w-full border-2 border-ink object-cover md:col-span-4 md:aspect-auto md:h-full"
        />
      </div>
    </div>
  </section>
);

export default Bengkel;
