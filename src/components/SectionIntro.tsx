import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  tone?: 'light' | 'dark';
  children?: ReactNode;
};

const SectionIntro = ({ eyebrow, title, tone = 'light', children }: SectionIntroProps) => (
  <div className="md:sticky md:top-24 md:self-start">
    <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    <h2 className={`mt-4 text-4xl font-extrabold sm:text-5xl ${tone === 'dark' ? 'text-white' : ''}`}>{title}</h2>
    {children}
  </div>
);

export default SectionIntro;
