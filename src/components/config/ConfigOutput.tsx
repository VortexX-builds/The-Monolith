import { useMemo } from 'react'
import { CONFIG_STEPS } from '@/constants/config-options'

interface ConfigOutputProps {
  selections: Record<string, string[]>
}

export function ConfigOutput({ selections }: ConfigOutputProps) {
  const output = useMemo(() => {
    return CONFIG_STEPS.map((step) => {
      const chosen = selections[step.key] ?? []
      const labels = chosen.map(
        (id) => step.options.find((o) => o.id === id)?.label ?? id,
      )
      return `${step.title.toUpperCase()}: ${labels.length ? labels.join(', ') : '—'}`
    }).join('\n')
  }, [selections])

  return (
    <pre
      style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: 13,
        color: '#c5c6ca',
        lineHeight: 2,
        whiteSpace: 'pre-wrap',
        letterSpacing: '0.04em',
      }}
    >
      {output}
    </pre>
  )
}
