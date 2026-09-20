import { shop } from '../data/shop';

export const hoursLine = shop.hours.map((h) => `${h.day}, ${h.time}`).join(' · ');

export const todayStatus = (now = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Pontianak',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);

  if (hour < 7) return { open: false, text: 'Belum buka, buka pukul 07.00' };
  if (hour < 17) return { open: true, text: 'Buka sekarang, tutup pukul 17.00' };
  return { open: false, text: 'Sudah tutup, buka lagi besok 07.00' };
};
