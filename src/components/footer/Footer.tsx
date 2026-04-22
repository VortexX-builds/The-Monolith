import type React from 'react'

export function Footer() {
  const year = new Date().getFullYear()

  const linkStyle: React.CSSProperties = {
    fontFamily: '"Space Mono", monospace',
    fontSize: 10,
    letterSpacing: '0.14em',
    color: '#A8A9AD',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'none',
    transition: 'color 0.3s cubic-bezier(0.8, 0, 0.1, 1)',
  }

  return (
    <footer
      className="footer-shell"
      style={{
        backgroundColor: '#0d141a',
        padding: '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <p
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.14em',
          color: '#4B5563',
          textTransform: 'uppercase',
        }}
      >
        © {year} The Monolith Athletic Club™. All rights reserved.
      </p>

      <div className="footer-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <a
          href="/terms"
          style={linkStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#A8A9AD' }}
        >
          Terms of Service
        </a>
        <a
          href="/privacy"
          style={linkStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#A8A9AD' }}
        >
          Privacy Policy
        </a>
        <a
          href="/cookies"
          style={linkStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#A8A9AD' }}
        >
          Cookie Policy
        </a>
      </div>
    </footer>
  )
}
