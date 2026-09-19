import logo from '../assets/logo.webp';
import { shop } from '../data/shop';
import { waLink } from '../lib/wa';

const Footer = () => (
  <footer className="bg-ink pb-24 text-paper/70 md:pb-0">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-10 text-sm sm:px-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="" width={40} height={40} className="h-10 w-10" loading="lazy" />
        <div>
          <p className="font-display text-xl leading-none font-extrabold text-paper uppercase">
            Matahari <span className="text-brand">Motor</span>
          </p>
          <p className="mt-1">
            {shop.address}, {shop.city}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <a href={waLink('Halo Matahari Motor, saya mau tanya.')} target="_blank" rel="noreferrer" className="hover:text-sun">
          WhatsApp {shop.phoneDisplay}
        </a>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  </footer>
);

export default Footer;
