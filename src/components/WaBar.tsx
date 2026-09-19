import { shop } from '../data/shop';
import { waLink } from '../lib/wa';

const WaBar = () => (
  <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-paper p-3 md:hidden">
    <a
      href={waLink('Halo Matahari Motor, saya mau tanya.')}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center gap-2 bg-ink py-3.5 font-medium text-paper active:bg-brand"
    >
      Chat WhatsApp
      <span className="text-paper/70">{shop.phoneDisplay}</span>
    </a>
  </div>
);

export default WaBar;
