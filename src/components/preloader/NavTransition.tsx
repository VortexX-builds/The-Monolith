import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '@/utils/gsap'
import { lenisScrollTo } from '@/hooks/useLenis'

interface NavTransitionProps {
  targetId: string
  onComplete: () => void
}

const CHARS = 'THE MONOLITH'.split('')

export function NavTransition({ targetId, onComplete }: NavTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useLayoutEffect(() => {
    gsap.set(charsRef.current, { y: '100%' })
    gsap.set(containerRef.current, { scaleY: 0, transformOrigin: 'bottom' })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const chars = charsRef.current
    if (!container) return

    const tl = gsap.timeline()

    tl.to(container, { scaleY: 1, duration: 0.35, ease: 'monolith' })
      .to(chars, { y: '0%', stagger: 0.02, duration: 0.25, ease: 'monolith' }, '-=0.15')
      .call(() => {
        lenisScrollTo(`#${targetId}`, { immediate: true })
      })
      .set(container, { transformOrigin: 'top' })
      .to(container, { scaleY: 0, duration: 0.4, ease: 'monolith', delay: 0.08, onComplete })

    return () => { tl.kill() }
  }, [targetId, onComplete])

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
        transformOrigin: 'bottom',
      }}
    >
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        {CHARS.map((char, i) => (
          <div key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <span
              ref={(el) => { if (el) charsRef.current[i] = el }}
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
