export const todayStatus = (now = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Pontianak',
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const day = parts.find((p) => p.type === 'weekday')?.value;
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);

  if (day === 'Sun') return { open: false, text: 'Minggu, tanya dulu via WhatsApp' };
  if (hour < 17) return { open: true, text: 'Hari ini tutup pukul 17.00' };
  return { open: false, text: day === 'Sat' ? 'Sudah tutup, buka lagi Senin' : 'Sudah tutup, buka lagi besok' };
};
