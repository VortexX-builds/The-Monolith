import { useRef, useState } from 'react'
import type React from 'react'
import { gsap } from '@/utils/gsap'
import { useCursor } from '@/context/CursorContext'
import { useNavigation } from '@/context/NavigationContext'
import { ConfigStep } from './ConfigStep'
import { CONFIG_STEPS } from '@/constants/config-options'

interface ConfigProps {
  onProgrammeComplete: (selections: Record<string, string[]>) => void
}

export function Config({ onProgrammeComplete }: ConfigProps) {
  const [step, setStep] = useState(0)
  const [selections, setSelections] = useState<Record<string, string[]>>({})
  const stepRef = useRef<HTMLDivElement>(null)
  const { setLabel } = useCursor()
  const { navigateTo } = useNavigation()

  const currentKey = CONFIG_STEPS[step].key

  const handleToggle = (id: string) => {
    setSelections((prev) => {
      const current = prev[currentKey] ?? []
      return {
        ...prev,
        [currentKey]: current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id],
      }
    })
  }

  const animateStep = (next: number) => {
    const el = stepRef.current
    if (!el) { setStep(next); return }
    const dir = next > step ? -1 : 1
    gsap.to(el, {
      x: dir * 80,
      opacity: 0,
      duration: 0.3,
      ease: 'monolith',
      onComplete: () => {
        setStep(next)
        gsap.fromTo(el, { x: -dir * 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'monolith' })
      },
    })
  }

  const handleSubmit = () => {
    setLabel('[ TRANSMIT ]')
    onProgrammeComplete(selections)
    setTimeout(() => {
      setLabel('')
      navigateTo('contact')
    }, 800)
  }

  const isLast = step === CONFIG_STEPS.length - 1

  const MONOLITH_EASE = 'cubic-bezier(0.8, 0, 0.1, 1)'

  const navBtnBase: React.CSSProperties = {
    padding: '18px 40px',
    background: 'transparent',
    fontFamily: '"Space Mono", monospace',
    fontSize: 11,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    cursor: 'none',
    transition: `background 0.3s ${MONOLITH_EASE}, color 0.3s ${MONOLITH_EASE}`,
  }

  return (
    <section
      id="configure"
      style={{
        backgroundColor: '#1B2228',
        padding: '120px 48px',
      }}
    >
      <div style={{ maxWidth: 900 }}>
        <p
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#A8A9AD',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Configure Your Programme
        </p>
        <p
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#4B5563',
            textTransform: 'uppercase',
            marginBottom: 48,
          }}
        >
          STEP {String(step + 1).padStart(2, '0')} / {String(CONFIG_STEPS.length).padStart(2, '0')}
        </p>

        <div ref={stepRef}>
          {CONFIG_STEPS.map((s, i) => (
            <ConfigStep
              key={s.key}
              step={s}
              active={i === step}
              selections={selections[s.key] ?? []}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 64 }}>
          {step > 0 && (
            <button
              onClick={() => animateStep(step - 1)}
              onMouseOver={e => {
                e.currentTarget.style.background = '#2C302E'
                e.currentTarget.style.color = '#ffffff'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#A8A9AD'
              }}
              style={{
                ...navBtnBase,
                border: '1px solid #2C302E',
                color: '#A8A9AD',
              }}
            >
              ← Back
            </button>
          )}
          {!isLast ? (
            <button
              onClick={() => animateStep(step + 1)}
              onMouseOver={e => {
                e.currentTarget.style.background = '#ffffff'
                e.currentTarget.style.color = '#0d141a'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#ffffff'
              }}
              style={{
                ...navBtnBase,
                border: '1px solid #ffffff',
                color: '#ffffff',
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              onMouseOver={e => {
                e.currentTarget.style.background = '#ffffff'
                e.currentTarget.style.color = '#0d141a'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#ffffff'
              }}
              style={{
                ...navBtnBase,
                border: '1px solid #ffffff',
                color: '#ffffff',
              }}
            >
              Transmit →
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
