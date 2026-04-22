const MONOLITH_EASE = 'cubic-bezier(0.8, 0, 0.1, 1)'

interface ToggleButtonProps {
  id: string
  label: string
  selected: boolean
  onToggle: (id: string) => void
}

export function ToggleButton({ id, label, selected, onToggle }: ToggleButtonProps) {
  return (
    <button
      onClick={() => onToggle(id)}
      onMouseEnter={e => {
        if (!selected) {
          e.currentTarget.style.background = '#2C302E'
          e.currentTarget.style.color = '#ffffff'
          e.currentTarget.style.borderColor = '#2C302E'
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#A8A9AD'
          e.currentTarget.style.borderColor = '#2C302E'
        }
      }}
      style={{
        display: 'inline-block',
        padding: '20px 32px',
        backgroundColor: selected ? '#ffffff' : 'transparent',
        color: selected ? '#0d141a' : '#A8A9AD',
        fontFamily: '"Space Mono", monospace',
        fontSize: 12,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        border: `1px solid ${selected ? '#ffffff' : '#2C302E'}`,
        cursor: 'none',
        transition: `background-color 0.3s ${MONOLITH_EASE}, color 0.3s ${MONOLITH_EASE}, border-color 0.3s ${MONOLITH_EASE}`,
      }}
    >
      {label}
    </button>
  )
}
