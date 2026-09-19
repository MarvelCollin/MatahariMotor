import type { ReactNode } from 'react';

type EyebrowProps = {
  as?: 'p' | 'dt';
  tone?: 'light' | 'dark';
  children: ReactNode;
};

const Eyebrow = ({ as: Tag = 'p', tone = 'light', children }: EyebrowProps) => (
  <Tag
    className={`flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.2em] uppercase ${
      tone === 'dark' ? 'text-white/45' : 'text-muted'
    }`}
  >
    <span className={`h-px w-3 ${tone === 'dark' ? 'bg-sun' : 'bg-brand'}`} aria-hidden="true" />
    {children}
  </Tag>
);

export default Eyebrow;
