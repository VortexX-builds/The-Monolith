import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { ParticleSystem } from './ParticleSystem'
import { HeroFigure } from './HeroFigure'
import { useMousePosition } from '@/hooks/useMousePosition'

export function HeroCanvas() {
  const mouseRef = useMousePosition()
  const isMobile = window.innerWidth < 1024
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setVisible(true)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 2.5s ease-in',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ pointerEvents: 'none' }}
      >
        <ParticleSystem mouseRef={mouseRef} />
        <HeroFigure mouseRef={mouseRef} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
