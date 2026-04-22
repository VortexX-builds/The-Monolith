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
      style={{
        display: 'inline-block',
        padding: '14px 24px',
        backgroundColor: selected ? '#2C302E' : '#1B2228',
        color: selected ? '#ffffff' : '#A8A9AD',
        fontFamily: '"Space Mono", monospace',
        fontSize: 12,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        border: 'none',
        cursor: 'none',
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      {label}
    </button>
  )
}
