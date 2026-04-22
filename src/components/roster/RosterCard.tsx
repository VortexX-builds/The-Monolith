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
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const noiseRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const { setLabel } = useCursor()
  const isTouch = useIsTouchDevice()
  const [isActive, setIsActive] = useState(false)

  useLayoutEffect(() => {
    const card = cardRef.current
    const nameEl = nameRef.current
    const roleEl = roleRef.current
    if (!card || !nameEl || !roleEl) return

    gsap.set([nameEl, roleEl], { y: 40, opacity: 0 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(nameEl, { y: 0, opacity: 1, duration: 0.6, ease: 'monolith' })
          gsap.to(roleEl, { y: 0, opacity: 1, duration: 0.6, ease: 'monolith', delay: 0.08 })
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
      onMouseEnter={!isTouch ? activate : undefined}
      onMouseLeave={!isTouch ? deactivate : undefined}
      onPointerDown={isTouch ? handleTap : undefined}
      style={{
        position: 'relative',
        padding: '40px',
        backgroundColor: '#1B2228',
        overflow: 'hidden',
      }}
    >
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
        }}
      />
      <img
        ref={imgRef}
        src={imageSrc}
        alt={name}
        style={{
          width: '100%',
          aspectRatio: '4/3',
          objectFit: 'cover',
          display: 'block',
          filter: 'grayscale(1)',
          marginBottom: 32,
        }}
      />
      <p
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.18em',
          color: '#A8A9AD',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        {role}
      </p>
      <h3
        ref={nameRef}
        style={{
          fontFamily: '"Monument Extended", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(24px, 3vw, 42px)',
          color: '#ffffff',
          letterSpacing: '-0.01em',
          marginBottom: 32,
        }}
      >
        {name}
      </h3>
      <p
        ref={roleRef}
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 11,
          color: '#A8A9AD',
        }}
      >
        <span style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: '#ffffff', fontFamily: '"Monument Extended", sans-serif', fontWeight: 400 }}>
          {metric}
        </span>
        {' '}{metricLabel}
      </p>
    </div>
  )
}
