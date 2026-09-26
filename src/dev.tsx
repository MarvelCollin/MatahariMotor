import { StrictMode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

export const render = () => {
  const root = createRoot(document.getElementById('root')!);
  flushSync(() =>
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  );
};
