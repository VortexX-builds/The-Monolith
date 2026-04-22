import { useRef } from 'react'
import { gsap } from '@/utils/gsap'
import { useCursor } from '@/context/CursorContext'

interface ArsenalCardProps {
  title: string
  category: string
  imageSrc: string
}

export function ArsenalCard({ title, category, imageSrc }: ArsenalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const { setLabel } = useCursor()

  const handleEnter = () => {
    setLabel('[ EXPLORE ]')
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1.02, duration: 0.4, ease: 'monolith' })
      cardRef.current.style.willChange = 'transform'
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, { filter: 'grayscale(0)', duration: 0.4, ease: 'monolith' })
    }
  }

  const handleLeave = () => {
    setLabel('')
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: 'monolith' })
      cardRef.current.style.willChange = 'auto'
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, { filter: 'grayscale(1)', duration: 0.4, ease: 'monolith' })
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
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
        style={{
          padding: '20px 24px',
          backgroundColor: '#1B2228',
        }}
      >
        <p
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
