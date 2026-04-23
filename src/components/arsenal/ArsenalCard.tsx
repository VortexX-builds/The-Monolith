import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsap'
import { useCursor } from '@/context/CursorContext'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'

interface ArsenalCardProps {
  title: string
  category: string
  imageSrc: string
  index: number
}

export function ArsenalCard({ title, category, imageSrc, index }: ArsenalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const categoryRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const { setLabel } = useCursor()
  const isTouch = useIsTouchDevice()
  const [isActive, setIsActive] = useState(false)

  useLayoutEffect(() => {
    const card = cardRef.current
    const categoryEl = categoryRef.current
    const titleEl = titleRef.current
    if (!card || !categoryEl || !titleEl) return

    gsap.set(card, { y: 50, opacity: 0 })
    gsap.set([categoryEl, titleEl], { y: 20, opacity: 0 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(card, { y: 0, opacity: 1, duration: 0.7, ease: 'monolith' })
          gsap.to([categoryEl, titleEl], {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'monolith',
            stagger: 0.07,
            delay: 0.15,
          })
        },
      })
    }, card)

    return () => ctx.revert()
  }, [])

  const activate = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1.02, duration: 0.4, ease: 'monolith' })
      cardRef.current.style.willChange = 'transform'
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, { filter: 'grayscale(0)', duration: 0.4, ease: 'monolith' })
    }
    setLabel('[ EXPLORE ]')
  }

  const deactivate = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: 'monolith' })
      cardRef.current.style.willChange = 'auto'
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, { filter: 'grayscale(1)', duration: 0.4, ease: 'monolith' })
    }
    setLabel('')
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
        overflow: 'hidden',
        backgroundColor: '#1B2228',
      }}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt={title}
        style={{
          width: '100%',
          aspectRatio: '4/5',
          objectFit: 'cover',
          display: 'block',
          filter: 'grayscale(1)',
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          fontFamily: '"Monument Extended", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(80px, 10vw, 140px)',
          color: '#A8A9AD',
          opacity: 0.06,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          padding: '0 12px 4px 0',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div style={{ padding: '20px 24px', backgroundColor: '#1B2228' }}>
        <p
          ref={categoryRef}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.18em',
            color: '#A8A9AD',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          {category}
        </p>
        <h3
          ref={titleRef}
          style={{
            fontFamily: '"Monument Extended", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(18px, 2vw, 28px)',
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  )
}
