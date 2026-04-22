import { Canvas } from '@react-three/fiber'
import { ParticleSystem } from './ParticleSystem'
import { HeroFigure } from './HeroFigure'
import { useMousePosition } from '@/hooks/useMousePosition'

export function HeroCanvas() {
  const mouseRef = useMousePosition()
  const isMobile = window.innerWidth < 1024

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ pointerEvents: 'none' }}
      >
        <ParticleSystem mouseRef={mouseRef} />
        {!isMobile && <HeroFigure mouseRef={mouseRef} />}
      </Canvas>
    </div>
  )
}
