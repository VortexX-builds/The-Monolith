import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsap'

const STATEMENTS = [
  'NO SHORTCUTS',
  'NO EXCUSES',
  'NO LIMITS',
]

export function Ethos() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const inner = innerRef.current
    const track = trackRef.current
    if (!section || !inner || !track) return

    const isMobile = window.innerWidth < 1024

    const ctx = gsap.context(() => {
      if (isMobile) {
        const panels = track.querySelectorAll<HTMLElement>('.ethos-panel')
        panels.forEach((panel) => {
          gsap.set(panel, { opacity: 0, y: 40 })
          ScrollTrigger.create({
            trigger: panel,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(panel, { opacity: 1, y: 0, duration: 0.6, ease: 'monolith' })
            },
          })
        })
      } else {
        const trackWidth = track.scrollWidth - inner.offsetWidth
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: inner,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set(track, { x: -self.progress * trackWidth })
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="ethos-section"
      style={{ height: '300vh', backgroundColor: '#0d141a' }}
    >
      <div
        ref={innerRef}
        className="ethos-inner"
        style={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          ref={trackRef}
          className="ethos-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12vw',
            paddingLeft: '10vw',
            paddingRight: '10vw',
            whiteSpace: 'nowrap',
          }}
        >
          {STATEMENTS.map((statement) => (
            <div key={statement} className="ethos-panel">
              <span
                style={{
                  fontFamily: '"Monument Extended", sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(48px, 8vw, 120px)',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  display: 'block',
                }}
              >
                {statement}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
