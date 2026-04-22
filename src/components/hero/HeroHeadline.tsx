import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/utils/gsap'

interface HeroHeadlineProps {
  visible: boolean
}

export function HeroHeadline({ visible }: HeroHeadlineProps) {
  const labelRef   = useRef<HTMLSpanElement>(null)
  const defineRef  = useRef<HTMLSpanElement>(null)
  const taglineRef = useRef<HTMLSpanElement>(null)
  const descRef    = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const els = [
      labelRef.current,
      defineRef.current,
      taglineRef.current,
      descRef.current,
      ctaRef.current,
      statsRef.current,
    ]
    gsap.set(els, { y: '100%', opacity: 0 })
  }, [])

  useLayoutEffect(() => {
    if (!visible) return
    const els = [
      labelRef.current,
      defineRef.current,
      taglineRef.current,
      descRef.current,
      ctaRef.current,
      statsRef.current,
    ]
    gsap.to(els, {
      y: '0%',
      opacity: 1,
      stagger: 0.09,
      duration: 0.75,
      ease: 'monolith',
      delay: 0.1,
    })
  }, [visible])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '96px 64px 52px',
        pointerEvents: 'none',
        maxWidth: '54%',
      }}
    >
      {/* Label */}
      <div style={{ overflow: 'hidden' }}>
        <span
          ref={labelRef}
          style={{
            display: 'block',
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#A8A9AD',
            textTransform: 'uppercase',
          }}
        >
          Elite Strength &amp; Conditioning
        </span>
      </div>

      {/* Main content block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* DEFINE. */}
        <div style={{ overflow: 'hidden', lineHeight: 1 }}>
          <span
            ref={defineRef}
            style={{
              display: 'block',
              fontFamily: '"Monument Extended", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(64px, 9vw, 144px)',
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            DEFINE.
          </span>
        </div>

        {/* YOUR LIMITS. */}
        <div style={{ overflow: 'hidden', lineHeight: 1, marginBottom: 28 }}>
          <span
            ref={taglineRef}
            style={{
              display: 'block',
              fontFamily: '"Monument Extended", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(28px, 3.8vw, 62px)',
              letterSpacing: '-0.02em',
              color: '#c5c6ca',
            }}
          >
            YOUR LIMITS.
          </span>
        </div>

        {/* Descriptor */}
        <div style={{ overflow: 'hidden', marginBottom: 40 }}>
          <p
            ref={descRef}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 13,
              lineHeight: 1.7,
              color: '#A8A9AD',
              letterSpacing: '0.02em',
            }}
          >
            Built for the serious.<br />
            Trained for the relentless.
          </p>
        </div>

        {/* CTAs */}
        <div style={{ overflow: 'hidden' }}>
          <div
            ref={ctaRef}
            style={{
              display: 'flex',
              gap: 40,
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              Join Now &rarr;
            </span>
            <span
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A8A9AD',
              }}
            >
              Explore the Facility &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={statsRef}
          style={{
            display: 'flex',
            gap: 32,
            alignItems: 'center',
          }}
        >
          {['5 ZONES', '24K SQ FT', 'OPEN 24/7', 'EST. 2024'].map((stat, i, arr) => (
            <span
              key={stat}
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 11,
                letterSpacing: '0.14em',
                color: i < arr.length - 1 ? '#A8A9AD' : '#555b62',
                textTransform: 'uppercase',
              }}
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
