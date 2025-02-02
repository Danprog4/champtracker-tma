import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { mockTelegramEnv, init } from '@telegram-apps/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

if (import.meta.env.DEV) {
  mockTelegramEnv({
    // important part
    initDataRaw: import.meta.env.VITE_MOCK_INIT_DATA,

    // do not care about this part
    themeParams: {},
    version: '7.2',
    platform: 'tdesktop',
  });
}

init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
