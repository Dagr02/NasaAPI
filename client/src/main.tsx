import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { HeroUIProvider } from '@heroui/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <HeroUIProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HeroUIProvider>
      </ThemeProvider>
  </StrictMode>,
)
