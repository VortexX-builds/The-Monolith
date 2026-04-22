import React, { useRef, useEffect, useState } from 'react'
import { gsap } from '@/utils/gsap'
import { subscribeToLenisScroll } from '@/hooks/useLenis'
import { useCursor } from '@/context/CursorContext'
import { useNavigation } from '@/context/NavigationContext'

const NAV_LINKS = [
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Roster', href: '#roster' },
  { label: 'Configure', href: '#configure' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const hiddenRef = useRef(false)
  const isMenuOpenRef = useRef(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setLabel } = useCursor()
  const { navigateTo } = useNavigation()

  useEffect(() => {
    const unsub = subscribeToLenisScroll(({ velocity }) => {
      if (!navRef.current) return
      if (velocity > 0.2 && !hiddenRef.current) {
        hiddenRef.current = true
        if (isMenuOpenRef.current && overlayRef.current) {
          gsap.to(overlayRef.current, { autoAlpha: 0, y: -16, duration: 0.2, ease: 'monolith' })
          isMenuOpenRef.current = false
          setIsMenuOpen(false)
        }
        gsap.to(navRef.current, { y: '-100%', duration: 0.4, ease: 'monolith' })
      } else if (velocity < -0.2 && hiddenRef.current) {
        hiddenRef.current = false
        gsap.to(navRef.current, { y: '0%', duration: 0.4, ease: 'monolith' })
      }
    })
    return unsub
  }, [])

  const openMenu = () => {
    setIsMenuOpen(true)
    isMenuOpenRef.current = true
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0, y: -16 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'monolith' }
      )
    }
  }

  const closeMenu = () => {
    isMenuOpenRef.current = false
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        y: -16,
        duration: 0.3,
        ease: 'monolith',
        onComplete: () => setIsMenuOpen(false),
      })
    } else {
      setIsMenuOpen(false)
    }
  }

  const handleMobileLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    closeMenu()
    setTimeout(() => navigateTo(href.slice(1)), 350)
  }

  return (
    <>
      <nav
        ref={navRef}
        className="nav-shell"
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

        {/* Desktop links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); navigateTo(href.slice(1)) }}
              onMouseEnter={() => { setHoveredLink(href); setLabel('[ NAVIGATE ]') }}
              onMouseLeave={() => { setHoveredLink(null); setLabel('') }}
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
          className="nav-date"
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

        {/* Mobile hamburger */}
        <button
          className={`nav-hamburger${isMenuOpen ? ' is-open' : ''}`}
          onClick={isMenuOpen ? closeMenu : openMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          style={{ display: 'none' }}
        >
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 490,
          backgroundColor: 'rgba(13, 20, 26, 0.98)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '120px 32px 60px',
          gap: 8,
          visibility: 'hidden',
          opacity: 0,
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleMobileLinkClick(e, href)}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 13,
              letterSpacing: '0.18em',
              color: '#A8A9AD',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '16px 0',
              display: 'block',
              minHeight: 44,
              width: '100%',
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
