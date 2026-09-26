import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const server = `${root}dist-ssr`;
const page = `${root}dist/index.html`;

const { render } = await import(`${new URL('../dist-ssr/entry-server.js', import.meta.url)}`);

const html = readFileSync(page, 'utf8');
const marker = '<div id="root"></div>';

if (!html.includes(marker)) throw new Error('root container not found in dist/index.html');

writeFileSync(page, html.replace(marker, `<div id="root">${render()}</div>`));
if (existsSync(`${server}/assets`)) cpSync(`${server}/assets`, `${root}dist/assets`, { recursive: true });

const sitemap = `${root}dist/sitemap.xml`;
const today = new Date().toISOString().slice(0, 10);
writeFileSync(sitemap, readFileSync(sitemap, 'utf8').replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${today}</lastmod>`));
rmSync(server, { recursive: true, force: true });

console.log('prerendered dist/index.html');
