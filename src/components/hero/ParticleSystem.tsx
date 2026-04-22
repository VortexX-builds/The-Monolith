import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import vertSrc from '@/gl/shaders/particle.vert.glsl?raw'
import fragSrc from '@/gl/shaders/particle.frag.glsl?raw'
import type { MutableRefObject } from 'react'

const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uPixelRatio: Math.min(window.devicePixelRatio, 1.5),
    uSize: 32,
  },
  vertSrc,
  fragSrc,
)

extend({ ParticleMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    particleMaterial: React.ComponentPropsWithRef<typeof ParticleMaterial>
  }
}

const PARTICLE_COUNT = 1400

interface ParticleSystemProps {
  mouseRef: MutableRefObject<{ x: number; y: number }>
}

export function ParticleSystem({ mouseRef }: ParticleSystemProps) {
  const matRef = useRef<THREE.ShaderMaterial & {
    uTime: number
    uMouse: THREE.Vector2
  }>(null)

  const { width, height } = useThree((s) => s.viewport)

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * width * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * height * 2
      positions[i * 3 + 2] = -2 - Math.random() * 3
      sizes[i] = Math.random() * 1.5 + 0.5
    }

    return { positions, sizes }
  }, [width, height])

  useFrame(({ clock }) => {
    const mat = matRef.current
    if (!mat) return
    mat.uTime = clock.getElapsedTime()
    mat.uMouse.set(mouseRef.current.x, mouseRef.current.y)
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <particleMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}
