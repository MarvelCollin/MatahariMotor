import tire from '../assets/products/tire-corsa.webp';
import fork from '../assets/products/fork-realjump.webp';
import handlebar from '../assets/products/handlebar-protaper.webp';
import rim from '../assets/products/rim-vnd.webp';

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
    id: 'tire-corsa',
    name: 'Ban luar Corsa',
    category: 'Ban',
    image: tire,
    width: 284,
    height: 467,
  },
  {
    id: 'fork-realjump',
    name: 'Shock depan USD Realjump',
    category: 'Shock',
    image: fork,
    width: 138,
    height: 489,
  },
  {
    id: 'handlebar-protaper',
    name: 'Stang fat bar ProTaper',
    category: 'Stang',
    image: handlebar,
    width: 464,
    height: 76,
  },
  {
    id: 'rim-vnd',
    name: 'Velg racing VND',
    category: 'Velg',
    image: rim,
    width: 277,
    height: 278,
  },
];
