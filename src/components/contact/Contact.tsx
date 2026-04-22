import { useState } from 'react'
import { useCursor } from '@/context/CursorContext'

const MONOLITH_EASE = 'cubic-bezier(0.8, 0, 0.1, 1)'

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
      <div style={{ marginBottom: 72 }}>
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

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 40 }}
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
              const btn = e.currentTarget
              btn.style.background = '#ffffff'
              btn.style.color = '#0d141a'
            }}
            onMouseOut={e => {
              const btn = e.currentTarget
              btn.style.background = 'transparent'
              btn.style.color = '#ffffff'
            }}
          >
            Transmit &rarr;
          </button>
        </div>
      </form>
    </section>
  )
}
