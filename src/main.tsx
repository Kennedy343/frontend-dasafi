import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Antes: import './index.css';
import './index.css'; // 💡 Actualiza la ruta
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
