import '@/utils/gsap'
import '@/styles/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

history.scrollRestoration = 'manual'
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname)
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
