import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ReservationProvider } from './ReservationContext.tsx';
import { ContactProvider } from './ContactContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ReservationProvider>
        <ContactProvider>
          <App />
        </ContactProvider>
      </ReservationProvider>
    </BrowserRouter>
  </StrictMode>,
);
