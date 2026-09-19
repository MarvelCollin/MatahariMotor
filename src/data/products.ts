import ban from '../assets/products/ban-corsa.webp';
import shock from '../assets/products/shock-realjump.webp';
import stang from '../assets/products/stang-protaper.webp';
import velg from '../assets/products/velg-vnd.webp';

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  width: number;
  height: number;
};

export const products: Product[] = [
  {
    id: 'ban-corsa',
    name: 'Ban luar Corsa',
    category: 'Ban',
    image: ban,
    width: 284,
    height: 467,
  },
  {
    id: 'shock-realjump',
    name: 'Shock depan USD Realjump',
    category: 'Shock',
    image: shock,
    width: 138,
    height: 489,
  },
  {
    id: 'stang-protaper',
    name: 'Stang fat bar ProTaper',
    category: 'Stang',
    image: stang,
    width: 464,
    height: 76,
  },
  {
    id: 'velg-vnd',
    name: 'Velg racing VND',
    category: 'Velg',
    image: velg,
    width: 277,
    height: 278,
  },
];
