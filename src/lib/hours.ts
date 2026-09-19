export const todayStatus = (now = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Pontianak',
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const day = parts.find((p) => p.type === 'weekday')?.value;
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);

  if (day === 'Sun') return { open: false, text: 'Minggu tutup, buka lagi Senin 08.00' };
  if (hour < 8) return { open: false, text: 'Belum buka, buka pukul 08.00' };
  if (hour < 17) return { open: true, text: 'Buka sekarang, tutup pukul 17.00' };
  return { open: false, text: day === 'Sat' ? 'Sudah tutup, buka lagi Senin 08.00' : 'Sudah tutup, buka lagi besok 08.00' };
};
