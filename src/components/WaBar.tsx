import { shop } from '../data/shop';
import { waLink } from '../lib/wa';

const WaBar = () => (
  <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white p-3 md:hidden">
    <a
      href={waLink('Halo Matahari Motor, saya mau tanya.')}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center gap-2 rounded-md bg-brand py-3.5 font-medium text-white active:bg-brand-dark"
    >
      Chat WhatsApp
      <span className="text-white/75">{shop.phoneDisplay}</span>
    </a>
  </div>
);

export default WaBar;
