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
    specs: [
      ['Model', '5 palang'],
      ['Warna', 'Hitam'],
      ['Pasang', 'Bisa ditunggu'],
    ],
  },
];
