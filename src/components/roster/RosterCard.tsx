import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsap'
import { useCursor } from '@/context/CursorContext'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'

interface RosterCardProps {
  name: string
  role: string
  metric: string
  metricLabel: string
  imageSrc: string
}

export function RosterCard({ name, role, metric, metricLabel, imageSrc }: RosterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const noiseRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const roleLabelRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const metricNumberRef = useRef<HTMLSpanElement>(null)
  const metricLabelRef = useRef<HTMLSpanElement>(null)
  const { setLabel } = useCursor()
  const isTouch = useIsTouchDevice()
  const [isActive, setIsActive] = useState(false)

  useLayoutEffect(() => {
    const card = cardRef.current
    const roleLabelEl = roleLabelRef.current
    const nameEl = nameRef.current
    const metricNumberEl = metricNumberRef.current
    const metricLabelEl = metricLabelRef.current
    if (!card || !roleLabelEl || !nameEl || !metricNumberEl || !metricLabelEl) return

    gsap.set(card, { clipPath: 'inset(0 0 100% 0)' })
    gsap.set([roleLabelEl, nameEl, metricNumberEl, metricLabelEl], { y: 20, opacity: 0 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(card, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'monolith' })
          gsap.to([roleLabelEl, nameEl, metricNumberEl, metricLabelEl], {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'monolith',
            stagger: 0.07,
            delay: 0.25,
          })
        },
      })
    }, card)

    return () => ctx.revert()
  }, [])

  const activate = () => {
    setLabel('[ EXPLORE ]')
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1.02, duration: 0.4, ease: 'monolith' })
      cardRef.current.style.willChange = 'transform'
    }
    if (noiseRef.current) {
      gsap.to(noiseRef.current, { opacity: 0.08, duration: 0.4, ease: 'monolith' })
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, { filter: 'grayscale(0)', duration: 0.4, ease: 'monolith' })
    }
  }

  const deactivate = () => {
    setLabel('')
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: 'monolith' })
      cardRef.current.style.willChange = 'auto'
    }
    if (noiseRef.current) {
      gsap.to(noiseRef.current, { opacity: 0, duration: 0.4, ease: 'monolith' })
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, { filter: 'grayscale(1)', duration: 0.4, ease: 'monolith' })
    }
  }

  const handleTap = () => {
    if (isActive) {
      deactivate()
      setIsActive(false)
    } else {
      activate()
      setIsActive(true)
    }
  }

  return (
    <div
      ref={cardRef}
      className="roster-card"
      onMouseEnter={!isTouch ? activate : undefined}
      onMouseLeave={!isTouch ? deactivate : undefined}
      onPointerDown={isTouch ? handleTap : undefined}
      style={{
        position: 'relative',
        aspectRatio: '3/4',
        overflow: 'hidden',
      }}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt={name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(1)',
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #0d141a 0%, rgba(13,20,26,0.7) 45%, transparent 100%)',
          zIndex: 1,
        }}
      />

      <div
        ref={noiseRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/textures/noise-tile.png)',
          backgroundSize: '256px 256px',
          mixBlendMode: 'overlay',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '28px 24px',
          zIndex: 3,
        }}
      >
        <p
          ref={roleLabelRef}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.18em',
            color: '#A8A9AD',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          {role}
        </p>
        <h3
          ref={nameRef}
          style={{
            fontFamily: '"Monument Extended", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(22px, 2.5vw, 34px)',
            color: '#ffffff',
            letterSpacing: '-0.01em',
            marginBottom: 20,
          }}
        >
          {name}
        </h3>
        <span
          ref={metricNumberRef}
          style={{
            display: 'block',
            fontFamily: '"Monument Extended", sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(52px, 6vw, 80px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {metric}
        </span>
        <span
          ref={metricLabelRef}
          style={{
            display: 'block',
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            color: '#A8A9AD',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginTop: 6,
          }}
        >
          {metricLabel}
        </span>
      </div>
    </div>
  )
}
