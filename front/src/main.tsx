import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { mockTelegramEnv, init } from '@telegram-apps/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import './index.css';

const queryClient = new QueryClient();

// if (import.meta.env.DEV) {
//   mockTelegramEnv({
//     // important part
//     initDataRaw: import.meta.env.VITE_MOCK_INIT_DATA,

//     // do not care about this part
//     themeParams: {},
//     version: '7.2',
//     platform: 'tdesktop',
//   });
// }

init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
