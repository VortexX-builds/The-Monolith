# Performance Skill — Sloak Project

## Image Handling
- All <img> tags must have loading="lazy"
- Use width and height attributes to prevent layout shift
- Place images in /public/assets/ organized by section
- Prefer webp format where possible

## Code Splitting
- App.jsx must use React.lazy() + Suspense for all page-level components
- Example:
  const Home = React.lazy(() => import('./pages/Home'))
  const About = React.lazy(() => import('./pages/About'))

## Bundle Size
- No UI component libraries (no MUI, no Chakra, no Radix)
- Lucide React: import individual icons only, never the whole package
  ✓ import { Shield } from 'lucide-react'
  ✗ import * as Icons from 'lucide-react'
- Framer Motion: import only what is used
  ✓ import { motion, AnimatePresence } from 'framer-motion'

## Lenis Setup
- Initialize once in App.jsx, not in individual pages
- Destroy on unmount

## Tailwind
- Do not use @apply excessively — use utility classes directly in JSX
- Purge is automatic via Vite + Tailwind v3 content config
