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

  useLayoutEffect(() => {
    const els = [
      labelRef.current,
      defineRef.current,
      taglineRef.current,
      descRef.current,
      ctaRef.current,
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
      className="hero-headline"
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
        <div className="hero-tagline-block" style={{ overflow: 'hidden', lineHeight: 1, marginBottom: 28 }}>
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
        <div className="hero-desc-block" style={{ overflow: 'hidden', marginBottom: 40 }}>
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
        <div style={{ overflow: 'hidden', pointerEvents: 'auto' }}>
          <div
            ref={ctaRef}
            className="hero-ctas"
            style={{
              display: 'flex',
              gap: 40,
              alignItems: 'center',
            }}
          >
            <a
              href="#contact"
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              Join Now &rarr;
            </a>
            <a
              href="#arsenal"
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A8A9AD',
                textDecoration: 'none',
              }}
            >
              Explore the Facility &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Bottom spacer — holds space-between vertical distribution after stats strip removal */}
      <div aria-hidden="true" />
    </div>
  )
}
