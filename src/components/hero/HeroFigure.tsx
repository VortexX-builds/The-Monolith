import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Html } from '@react-three/drei'
import type { Group } from 'three'
import type { MutableRefObject } from 'react'

const COLOR_ORBIT = '#A8A9AD'
const ORBIT_RADIUS = 1.85
const ORBIT_TILT = Math.PI / 7
const REVOLUTION_DURATION = 32

const DISCIPLINES = [
  'STRENGTH', 'POWER', 'ENDURANCE', 'DISCIPLINE',
  'FOCUS', 'RECOVERY', 'SPEED', 'FORM',
]

type P3 = [number, number, number]

interface HeroFigureProps {
  mouseRef: MutableRefObject<{ x: number; y: number }>
  isMobile?: boolean
}

export function HeroFigure({ mouseRef, isMobile = false }: HeroFigureProps) {
  const groupRef = useRef<Group>(null)
  const orbitRef = useRef<Group>(null)
  const lerpedRot = useRef({ x: 0, y: 0 })

  const orbitWords = useMemo(() =>
    DISCIPLINES.map((word, i) => {
      const angle = (i / DISCIPLINES.length) * Math.PI * 2
      return {
        word,
        position: [
          Math.cos(angle) * (ORBIT_RADIUS + 0.22),
          0,
          Math.sin(angle) * (ORBIT_RADIUS + 0.22),
        ] as P3,
      }
    }),
    [])

  const ringPoints = useMemo<P3[]>(() => {
    const N = 96
    const pts: P3[] = []
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2
      pts.push([Math.cos(a) * ORBIT_RADIUS, 0, Math.sin(a) * ORBIT_RADIUS])
    }
    return pts
  }, [])

  const tickPairs = useMemo<[P3, P3][]>(() => {
    const pairs: [P3, P3][] = []
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      pairs.push([
        [Math.cos(a) * ORBIT_RADIUS, 0, Math.sin(a) * ORBIT_RADIUS],
        [Math.cos(a) * (ORBIT_RADIUS + 0.12), 0, Math.sin(a) * (ORBIT_RADIUS + 0.12)],
      ])
    }
    return pairs
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (orbitRef.current) {
      orbitRef.current.rotation.y = (t / REVOLUTION_DURATION) * Math.PI * 2
    }

    if (!isMobile && groupRef.current) {
      const tx = mouseRef.current.y * -0.16
      const ty = mouseRef.current.x * 0.14
      lerpedRot.current.x += (tx - lerpedRot.current.x) * 0.04
      lerpedRot.current.y += (ty - lerpedRot.current.y) * 0.04
      groupRef.current.rotation.x = lerpedRot.current.x
      groupRef.current.rotation.y = lerpedRot.current.y
    }
  })

  const position: P3 = isMobile ? [1.6, -0.45, 0] : [2.9, -0.1, 0]
  const mobileScale = isMobile ? 1.2 : 1
  const glowOpacity = isMobile ? 0.15 : 0.08
  const lineOpacity = isMobile ? 0.50 : 0.9
  const tickOpacity = isMobile ? 0.38 : 0.85

  return (
    <group ref={groupRef} position={position} scale={mobileScale}>
      <group ref={orbitRef} rotation={[ORBIT_TILT, 0, 0]}>
        <Line
          points={ringPoints}
          color="#c5c6ca"
          lineWidth={8}
          opacity={glowOpacity}
          transparent
        />
        <Line
          points={ringPoints}
          color={COLOR_ORBIT}
          lineWidth={1.5}
          opacity={lineOpacity}
          transparent
        />

        {tickPairs.map((seg, i) => (
          <Line
            key={`tick-${i}`}
            points={seg}
            color={COLOR_ORBIT}
            lineWidth={2}
            opacity={tickOpacity}
            transparent
          />
        ))}

        {orbitWords.map(({ word, position }) => (
          <Html key={word} position={position} center style={{ pointerEvents: 'none' }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.13em',
                color: '#c5c6ca',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              {word}
            </span>
          </Html>
        ))}
      </group>
    </group>
  )
}
