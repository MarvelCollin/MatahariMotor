const TEETH = 42;
const TIP = 200;
const ROOT = 184;

const point = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;
};

const teeth = () => {
  const pitch = 360 / TEETH;
  const seat = ((ROOT * Math.PI * pitch * 0.42) / 180 / 2).toFixed(2);
  let d = `M${point(ROOT, 0)}`;
  for (let i = 0; i < TEETH; i++) {
    const a = i * pitch;
    d += ` L${point(TIP, a + pitch * 0.22)} A${TIP} ${TIP} 0 0 1 ${point(TIP, a + pitch * 0.36)}`;
    d += ` L${point(ROOT, a + pitch * 0.58)} A${seat} ${seat} 0 0 0 ${point(ROOT, a + pitch)}`;
  }
  return `${d} Z`;
};

const cutout = (start: number, sweep: number, inner: number, outer: number) =>
  `M${point(outer, start)} A${outer} ${outer} 0 0 1 ${point(outer, start + sweep)} L${point(inner, start + sweep)} A${inner} ${inner} 0 0 0 ${point(inner, start)} Z`;

const outline = teeth();
const windows = Array.from({ length: 6 }, (_, i) => cutout(i * 60 + 12, 36, 82, 132));
const bolts = Array.from({ length: 5 }, (_, i) => point(64, i * 72).split(' '));

const Sprocket = ({ className = '' }: { className?: string }) => (
  <svg viewBox="-210 -210 420 420" className={className} aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
      <path d={outline} vectorEffect="non-scaling-stroke" />
      <circle r="164" vectorEffect="non-scaling-stroke" />
      <circle r="150" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />
      {windows.map((d) => (
        <path key={d} d={d} vectorEffect="non-scaling-stroke" />
      ))}
      <circle r="46" vectorEffect="non-scaling-stroke" />
      <circle r="24" vectorEffect="non-scaling-stroke" />
      {bolts.map(([x, y]) => (
        <circle key={x + y} cx={x} cy={y} r="6" vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  </svg>
);

export default Sprocket;
