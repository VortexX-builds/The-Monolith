import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '@/utils/gsap'
import { useCursor } from '@/context/CursorContext'

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const xGroupRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const { label } = useCursor()
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })

  useLayoutEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const setX = gsap.quickSetter(ring, 'x', 'px')
    const setY = gsap.quickSetter(ring, 'y', 'px')

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener('pointermove', onMove)

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1
      setX(pos.current.x)
      setY(pos.current.y)
    }
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  useEffect(() => {
    if (!labelRef.current || !xGroupRef.current) return
    if (label) {
      gsap.to(xGroupRef.current, { opacity: 0, duration: 0.2, ease: 'monolith' })
      gsap.to(labelRef.current, { opacity: 1, duration: 0.2, ease: 'monolith' })
    } else {
      gsap.to(xGroupRef.current, { opacity: 1, duration: 0.2, ease: 'monolith' })
      gsap.to(labelRef.current, { opacity: 0, duration: 0.2, ease: 'monolith' })
    }
  }, [label])

  const bracket: React.CSSProperties = {
    fontFamily: '"Space Mono", monospace',
    fontSize: 13,
    color: '#ffffff',
    lineHeight: 1,
    userSelect: 'none',
  }

  return (
    <div
      ref={ringRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
      }}
    >
      <div
        style={{
          transform: 'translate(-50%, -50%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Default state: [ × ] */}
        <div
          ref={xGroupRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          <span style={bracket}>[</span>
          <div style={{ position: 'relative', width: 10, height: 10 }}>
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 10, height: 1,
              background: '#ffffff',
              transform: 'translate(-50%, -50%) rotate(45deg)',
            }} />
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 10, height: 1,
              background: '#ffffff',
              transform: 'translate(-50%, -50%) rotate(-45deg)',
            }} />
          </div>
          <span style={bracket}>]</span>
        </div>

        {/* Hover state: label already contains brackets e.g. "[ EXPLORE ]" */}
        <span
          ref={labelRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.12em',
            color: '#ffffff',
            whiteSpace: 'nowrap',
            opacity: 0,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
