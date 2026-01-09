import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { fetchFactory } from '../shared/api/fetch-factory'
import { setupAuthInterceptor } from '../entities/session'

// Setup global interceptors
setupAuthInterceptor(fetchFactory.getInstance());


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
