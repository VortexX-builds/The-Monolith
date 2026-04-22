import { useRef, useState } from 'react'
import { gsap } from '@/utils/gsap'
import { useCursor } from '@/context/CursorContext'
import { ConfigStep } from './ConfigStep'
import { ConfigOutput } from './ConfigOutput'
import { CONFIG_STEPS } from '@/constants/config-options'

export function Config() {
  const [step, setStep] = useState(0)
  const [selections, setSelections] = useState<Record<string, string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const stepRef = useRef<HTMLDivElement>(null)
  const { setLabel } = useCursor()

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
    setTimeout(() => {
      setSubmitted(true)
      setLabel('')
    }, 1200)
  }

  const isLast = step === CONFIG_STEPS.length - 1

  return (
    <section
      id="configure"
      style={{
        backgroundColor: '#1B2228',
        padding: '0 48px 120px',
        minHeight: '100vh',
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
            marginBottom: 24,
          }}
        >
          Configure Your Programme
        </p>

        {!submitted ? (
          <>
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
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#1B2228',
                    color: '#A8A9AD',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'none',
                  }}
                >
                  ← Back
                </button>
              )}
              {!isLast ? (
                <button
                  onClick={() => animateStep(step + 1)}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#2C302E',
                    color: '#ffffff',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'none',
                  }}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#2C302E',
                    color: '#ffffff',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'none',
                  }}
                >
                  Transmit
                </button>
              )}
            </div>
          </>
        ) : (
          <div>
            <h3
              style={{
                fontFamily: '"Monument Extended", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 56px)',
                color: '#ffffff',
                marginBottom: 48,
              }}
            >
              Programme Received.
            </h3>
            <ConfigOutput selections={selections} />
          </div>
        )}
      </div>
    </section>
  )
}
