import { useState } from 'react'
import type React from 'react'
import { useCursor } from '@/context/CursorContext'
import logoSrc from '@/assets/logo-removebg.png'

const MONOLITH_EASE = 'cubic-bezier(0.8, 0, 0.1, 1)'

const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/themonolith',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/themonolith',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/themonolith',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
]

export function Contact() {
  const { setLabel } = useCursor()
  const [focused, setFocused] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('MONOLITH — NEW ENQUIRY')
    const body = encodeURIComponent(
      `NAME: ${form.name}\nNUMBER: ${form.phone}\n\nMESSAGE:\n${form.message}`
    )
    window.location.href = `mailto:info@themonolith.com?subject=${subject}&body=${body}`
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === name ? '#ffffff' : '#2C302E'}`,
    color: '#ffffff',
    fontFamily: '"Space Mono", monospace',
    fontSize: 13,
    letterSpacing: '0.05em',
    padding: '14px 0',
    width: '100%',
    outline: 'none',
    borderRadius: 0,
    transition: `border-color 0.3s ${MONOLITH_EASE}`,
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: '"Space Mono", monospace',
    fontSize: 10,
    letterSpacing: '0.18em',
    color: '#A8A9AD',
    textTransform: 'uppercase',
    marginBottom: 8,
  }

  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#1B2228',
        padding: '120px 48px',
      }}
    >
      <div style={{ marginBottom: 80 }}>
        <p
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#A8A9AD',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Make Contact
        </p>
        <h2
          style={{
            fontFamily: '"Monument Extended", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 90px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}
        >
          Get In.
        </h2>
        <p
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 12,
            letterSpacing: '0.1em',
            color: '#A8A9AD',
            textTransform: 'uppercase',
          }}
        >
          Send a message — we'll be in touch.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        {/* Left — Brand / About */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <img
            src={logoSrc}
            alt="The Monolith"
            style={{
              width: 100,
              filter: 'grayscale(1)',
              display: 'block',
            }}
          />

          <div>
            <p
              style={{
                fontFamily: '"Monument Extended", sans-serif',
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: '0.08em',
                color: '#ffffff',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              The Monolith
            </p>
            <p
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: '#A8A9AD',
                textTransform: 'uppercase',
              }}
            >
              Athletic Club — Est. 2024
            </p>
          </div>

          <div style={{ height: 1, backgroundColor: '#2C302E' }} />

          <div style={{ display: 'flex', gap: 24 }}>
            {SOCIALS.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#A8A9AD'
                }}
                style={{
                  color: '#A8A9AD',
                  transition: `color 0.3s ${MONOLITH_EASE}`,
                  cursor: 'none',
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 40 }}
        >
          <div>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              onFocus={() => { setFocused('name'); setLabel('[ IDENTIFY ]') }}
              onBlur={() => { setFocused(null); setLabel('') }}
              style={fieldStyle('name')}
            />
          </div>

          <div>
            <label style={labelStyle}>Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              onFocus={() => { setFocused('phone'); setLabel('[ IDENTIFY ]') }}
              onBlur={() => { setFocused(null); setLabel('') }}
              style={fieldStyle('phone')}
            />
          </div>

          <div>
            <label style={labelStyle}>Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              onFocus={() => { setFocused('message'); setLabel('[ TRANSMIT ]') }}
              onBlur={() => { setFocused(null); setLabel('') }}
              style={{
                ...fieldStyle('message'),
                resize: 'none',
                display: 'block',
              }}
            />
          </div>

          <div>
            <button
              type="submit"
              onMouseEnter={() => setLabel('[ TRANSMIT ]')}
              onMouseLeave={() => setLabel('')}
              style={{
                background: 'transparent',
                border: '1px solid #ffffff',
                color: '#ffffff',
                fontFamily: '"Space Mono", monospace',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '18px 40px',
                cursor: 'none',
                borderRadius: 0,
                transition: `background 0.3s ${MONOLITH_EASE}, color 0.3s ${MONOLITH_EASE}`,
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#ffffff'
                e.currentTarget.style.color = '#0d141a'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#ffffff'
              }}
            >
              Transmit &rarr;
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
