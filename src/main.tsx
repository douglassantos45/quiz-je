import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route } from './routes';
import { ModalProvider } from './contexts/ModalContexts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ModalProvider>
      <Route />
    </ModalProvider>
  </React.StrictMode>,
);
