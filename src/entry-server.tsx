import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
