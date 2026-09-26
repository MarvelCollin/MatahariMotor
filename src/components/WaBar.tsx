import { shop } from '../data/shop';
import { waLink } from '../lib/wa';

const WaBar = () => (
  <div
    data-wa-bar
    inert
    className="fixed inset-x-0 bottom-0 z-40 translate-y-full border-t border-line bg-white p-3 transition-[translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-show:translate-y-0 motion-reduce:transition-none md:hidden"
  >
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
