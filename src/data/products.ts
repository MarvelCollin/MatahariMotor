import ban from '../assets/products/ban-corsa.webp';
import shock from '../assets/products/shock-realjump.webp';
import stang from '../assets/products/stang-protaper.webp';
import velg from '../assets/products/velg-vnd.webp';

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  width: number;
  height: number;
  summary: string;
  specs: [string, string][];
};

export const products: Product[] = [
  {
    id: 'ban-corsa',
    name: 'Ban luar Corsa',
    brand: 'Corsa',
    category: 'Ban',
    image: ban,
    width: 284,
    height: 467,
    summary: 'Ban tubeless pola sport untuk matic dan motor sport. Dipasang sekalian dengan pentil baru.',
    specs: [
      ['Jenis', 'Tubeless'],
      ['Ring', '14 & 17'],
      ['Pasang', 'Bisa ditunggu'],
    ],
  },
  {
    id: 'shock-realjump',
    name: 'Shock depan USD Realjump',
    brand: 'Realjump',
    category: 'Shock',
    image: shock,
    width: 138,
    height: 489,
    summary: 'Shock depan upside down lengkap dengan segitiga. Kecocokan dengan motor Anda kami cek dulu sebelum dipasang.',
    specs: [
      ['Jenis', 'Upside down'],
      ['Warna', 'Gold'],
      ['Pasang', 'Booking dulu'],
    ],
  },
  {
    id: 'stang-protaper',
    name: 'Stang fat bar ProTaper',
    brand: 'ProTaper',
    category: 'Stang',
    image: stang,
    width: 464,
    height: 76,
    summary: 'Stang fat bar diameter besar dengan busa pelindung. Umum dipakai di motor trail dan supermoto.',
    specs: [
      ['Diameter', '28,6 mm'],
      ['Bahan', 'Aluminium'],
      ['Pasang', 'Bisa ditunggu'],
    ],
  },
  {
    id: 'velg-vnd',
    name: 'Velg racing VND',
    brand: 'VND',
    category: 'Velg',
    image: velg,
    width: 277,
    height: 278,
    summary: 'Velg racing lima palang warna hitam. Sebutkan ukuran dan tipe motor, kami cek stoknya.',
    specs: [
      ['Model', '5 palang'],
      ['Warna', 'Hitam'],
      ['Pasang', 'Bisa ditunggu'],
    ],
  },
];
