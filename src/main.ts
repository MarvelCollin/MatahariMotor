import './index.css';
import { boot } from './client';

if (import.meta.env.DEV) {
  import('./dev').then(({ render }) => {
    render();
    boot();
  });
} else {
  boot();
}
