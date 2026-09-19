import { useEffect, useRef } from 'react';
import velg from '../assets/products/velg-vnd.webp';
import { shop } from '../data/shop';
import { waLink } from '../lib/wa';

const Hero = () => {
  const rim = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (rim.current) rim.current.style.transform = `rotate(${Math.min(window.scrollY, 1200) / 4}deg)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="top">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-6xl">
            Onderdil &amp; bengkel motor di {shop.city}
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            Ban, velg, shock, stang, oli, dan lainnya. Beli di toko, bisa langsung dipasang.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink('Halo Matahari Motor, saya mau tanya stok onderdil.')}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-merah px-5 py-3 font-medium text-white transition-colors hover:bg-merah-dark"
            >
              Tanya stok via WhatsApp
            </a>
            <a
              href="#produk"
              className="rounded-md px-5 py-3 font-medium ring-1 ring-ink/25 transition-colors hover:bg-tile"
            >
              Lihat produk
            </a>
          </div>
        </div>

        <div className="flex aspect-[16/10] items-center justify-center rounded-xl bg-tile md:aspect-[5/4]">
          <img
            ref={rim}
            src={velg}
            alt="Velg racing VND warna hitam"
            width={277}
            height={278}
            className="h-[78%] w-auto max-w-[300px] md:h-auto md:w-[58%]"
          />
        </div>
      </div>

      <div className="border-y border-line">
        <dl className="mx-auto grid max-w-6xl gap-4 px-4 py-5 text-sm sm:grid-cols-3 sm:px-6">
          <div>
            <dt className="text-muted">Alamat</dt>
            <dd className="font-medium">
              {shop.address}, {shop.city}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Jam buka</dt>
            <dd className="font-medium">Senin – Sabtu, tutup 17.00</dd>
          </div>
          <div>
            <dt className="text-muted">WhatsApp</dt>
            <dd className="font-medium">
              <a href={`tel:+${shop.whatsapp}`} className="hover:text-merah">
                {shop.phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Hero;
