import { ToggleButton } from './ToggleButton'
import type { ConfigStepDef } from '@/constants/config-options'

interface ConfigStepProps {
  step: ConfigStepDef
  active: boolean
  selections: string[]
  onToggle: (id: string) => void
}

export function ConfigStep({ step, active, selections, onToggle }: ConfigStepProps) {
  return (
    <div style={{ display: active ? 'block' : 'none' }}>
      <h3
        className="config-step-title"
        style={{
          fontFamily: '"Monument Extended", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(28px, 4vw, 56px)',
          color: '#ffffff',
          letterSpacing: '-0.01em',
          marginBottom: 48,
        }}
      >
        {step.title}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {step.options.map((option) => (
          <ToggleButton
            key={option.id}
            id={option.id}
            label={option.label}
            selected={selections.includes(option.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}
