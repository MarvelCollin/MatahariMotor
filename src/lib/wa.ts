import { shop } from '../data/shop';

export const waLink = (text: string) =>
  `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapsLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.address}, ${shop.city}`)}`;
