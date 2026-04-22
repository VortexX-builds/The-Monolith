import { useRef, useEffect, useState } from 'react'
import { gsap } from '@/utils/gsap'
import { subscribeToLenisScroll } from '@/hooks/useLenis'

const NAV_LINKS = [
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Roster', href: '#roster' },
  { label: 'Configure', href: '#configure' },
]

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const hiddenRef = useRef(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  useEffect(() => {
    const unsub = subscribeToLenisScroll(({ velocity }) => {
      if (!navRef.current) return
      if (velocity > 0.2 && !hiddenRef.current) {
        hiddenRef.current = true
        gsap.to(navRef.current, { y: '-100%', duration: 0.4, ease: 'monolith' })
      } else if (velocity < -0.2 && hiddenRef.current) {
        hiddenRef.current = false
        gsap.to(navRef.current, { y: '0%', duration: 0.4, ease: 'monolith' })
      }
    })
    return unsub
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: '24px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(13, 20, 26, 0.95)',
      }}
    >
      <span
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.15em',
          color: '#A8A9AD',
          textTransform: 'uppercase',
        }}
      >
        The Monolith
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onMouseEnter={() => setHoveredLink(href)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 11,
              letterSpacing: '0.15em',
              color: hoveredLink === href ? '#ffffff' : '#A8A9AD',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.15s ease',
            }}
          >
            {label}
          </a>
        ))}
      </div>

      <span
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.15em',
          color: '#A8A9AD',
          textTransform: 'uppercase',
        }}
      >
        Est. 2024
      </span>
    </nav>
  )
}
