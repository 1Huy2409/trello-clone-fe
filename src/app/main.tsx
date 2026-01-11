import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { fetchFactory } from '../shared/api/fetch-factory'
import { setupAuthInterceptor } from '../entities/session'

// Setup global interceptors
setupAuthInterceptor(fetchFactory.getInstance());

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/api/query-client'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
