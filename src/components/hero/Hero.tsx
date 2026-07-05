import { lazy, Suspense, useState, useEffect } from 'react'
import { HeroHeadline } from './HeroHeadline'

const HeroCanvas = lazy(() => import('./HeroCanvas').then(m => ({ default: m.HeroCanvas })))

interface HeroProps {
  visible: boolean
}

export function Hero({ visible }: HeroProps) {
  const [loadCanvas, setLoadCanvas] = useState(false)

  useEffect(() => {
    if (!visible) return

    const triggerLoad = () => {
      setLoadCanvas(true)
      cleanup()
    }

    const cleanup = () => {
      window.removeEventListener('mousemove', triggerLoad)
      window.removeEventListener('scroll', triggerLoad)
      window.removeEventListener('touchstart', triggerLoad)
      window.removeEventListener('keydown', triggerLoad)
    }

    // Load after 5 seconds fallback if no interaction happens
    const safetyTimeout = setTimeout(triggerLoad, 5000)

    window.addEventListener('mousemove', triggerLoad, { passive: true })
    window.addEventListener('scroll', triggerLoad, { passive: true })
    window.addEventListener('touchstart', triggerLoad, { passive: true })
    window.addEventListener('keydown', triggerLoad, { passive: true })

    return () => {
      cleanup()
      clearTimeout(safetyTimeout)
    }
  }, [visible])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100svh',
        width: '100%',
        backgroundColor: '#0d141a',
        overflow: 'hidden',
      }}
    >
      {loadCanvas && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}
      <HeroHeadline visible={visible} />
    </section>
  )
}
