# Matahari Motor

Website for **Matahari Motor**, a motorcycle parts shop and workshop (toko sparepart & bengkel motor) on Jl. Lintas Melawi, Kel. Ladang, Sintang, Kalimantan Barat.

**Live site: [mataharimotor.site](https://mataharimotor.site)**

- Ban, velg, shock, stang, oli and more, installed on the spot
- Servis rutin, CVT matic, suspensi, rem and kelistrikan
- Open every day 07.00 – 17.00 · WhatsApp [0821-1175-0238](https://wa.me/6282111750238)

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

## How it works

- Components are written in React and rendered to static HTML at build time by `scripts/prerender.js`, so the page shows its full content without JavaScript.
- Browser behaviour (mobile menu, active nav link, WhatsApp bar, scroll reveals) lives in `src/client.ts`, a script of about 1 KB.
- Animations and parallax use CSS scroll-driven animations, so scrolling stays off the main thread.
- Every push to `main` builds and deploys to GitHub Pages.
