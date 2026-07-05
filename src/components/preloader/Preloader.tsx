import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '@/utils/gsap'

interface PreloaderProps {
  onComplete: () => void
}

const CHARS = 'THE MONOLITH'.split('')

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useLayoutEffect(() => {
    const chars = charsRef.current
    gsap.set(chars, { y: '100%' })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.3,
          ease: 'monolith',
          onComplete,
        })
      },
    })

    tl.to(charsRef.current, {
      y: '0%',
      stagger: 0.015,
      duration: 0.25,
      ease: 'monolith',
    }).to({}, { duration: 0.05 })
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0d141a',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: 'top',
      }}
    >
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {CHARS.map((char, i) => (
          <div
            key={i}
            style={{ overflow: 'hidden', display: 'inline-block' }}
          >
            <span
              ref={(el) => {
                if (el) charsRef.current[i] = el
              }}
              style={{
                display: 'inline-block',
                fontFamily: '"Monument Extended", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 5vw, 72px)',
                letterSpacing: '0.08em',
                color: '#ffffff',
                whiteSpace: 'pre',
              }}
            >
              {char}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
