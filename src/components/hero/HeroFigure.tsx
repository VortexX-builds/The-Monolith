import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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

const CAMERA_HALF_HEIGHT = 5 * Math.tan(Math.PI / 6) // camera Z=5, FOV=60° → ≈2.887 world units
const RING_PIXEL_Y = 560 // pixel from top that looks right on iPhone SE (667px reference)

export function HeroFigure({ mouseRef, isMobile = false }: HeroFigureProps) {
  const groupRef = useRef<Group>(null)
  const orbitRef = useRef<Group>(null)
  const lerpedRot = useRef({ x: 0, y: 0 })
  const { size } = useThree()
  // Freeze the height at first valid render — size.height updates reactively when the
  // mobile browser's address bar collapses, which would cause mobileY and orbitTilt
  // to instantly recalculate and produce a visible jerk.
  const frozenHeight = useRef(0)
  if (size.height > 0 && !frozenHeight.current) frozenHeight.current = size.height
  const stableHeight = frozenHeight.current || size.height

  const wordOffset = isMobile ? 0.26 : 0.22
  const orbitWords = useMemo(() =>
    DISCIPLINES.map((word, i) => {
      const angle = (i / DISCIPLINES.length) * Math.PI * 2
      return {
        word,
        position: [
          Math.cos(angle) * (ORBIT_RADIUS + wordOffset),
          0,
          Math.sin(angle) * (ORBIT_RADIUS + wordOffset),
        ] as P3,
      }
    }),
    [wordOffset])

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

  const mobileY = Math.max(-1.6, CAMERA_HALF_HEIGHT * (1 - 2 * (RING_PIXEL_Y / stableHeight)))
  const position: P3 = isMobile ? [1.6, mobileY, 0] : [2.75, -0.1, 0]
  const mobileScale = isMobile ? 1.2 : 1
  const glowOpacity = isMobile ? 0.15 : 0.08
  const lineOpacity = isMobile ? 0.50 : 0.9
  const tickOpacity = isMobile ? 0.38 : 0.85

  return (
    <group ref={groupRef} position={position} scale={mobileScale}>
      <group ref={orbitRef} rotation={[isMobile ? ORBIT_TILT + 0.2 * Math.max(0, (stableHeight - 667) / 265) : ORBIT_TILT, 0, 0]}>
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
                fontSize: isMobile ? '10px' : '11px',
                letterSpacing: '0.13em',
                color: isMobile ? '#A8A9AD' : '#c5c6ca',
                opacity: isMobile ? 0.85 : 1,
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
