import { shop } from '../data/shop';

export const hoursLine = shop.hours.map((h) => `${h.day}, ${h.time}`).join(' · ');
