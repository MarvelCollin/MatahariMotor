import { useEffect, useState } from 'react';
import { shop } from '../data/shop';
import { waLink } from '../lib/wa';

const WaBar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) {
      setShow(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), {
      rootMargin: '-72px 0px 0px 0px',
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white p-3 transition-[translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href={waLink('Halo Matahari Motor, saya mau tanya.')}
        target="_blank"
        rel="noreferrer"
        tabIndex={show ? undefined : -1}
        className="flex items-center justify-center gap-2 rounded-md bg-brand py-3.5 font-medium text-white active:bg-brand-dark"
      >
        Chat WhatsApp
        <span className="text-white/75">{shop.phoneDisplay}</span>
      </a>
    </div>
  );
};

export default WaBar;
