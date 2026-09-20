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
    <Eyebrow tone={tone} className="story-eyebrow">
      {eyebrow}
    </Eyebrow>
    <h2 className={`story-title mt-4 text-4xl font-extrabold sm:text-5xl ${tone === 'dark' ? 'text-white' : ''}`}>
      {title}
    </h2>
    <div className="story-body">{children}</div>
  </div>
);

export default SectionIntro;
