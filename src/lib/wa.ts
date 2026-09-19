import { shop } from '../data/shop';

export const waLink = (text: string) =>
  `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapsLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.mapsQuery)}`;

export const mapsEmbed = () =>
  `https://maps.google.com/maps?q=${encodeURIComponent(shop.mapsQuery)}&z=16&output=embed`;
