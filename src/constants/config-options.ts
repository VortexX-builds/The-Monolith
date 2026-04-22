export interface ConfigOption {
  id: string
  label: string
}

export interface ConfigStepDef {
  key: string
  title: string
  options: ConfigOption[]
}

export const CONFIG_STEPS: ConfigStepDef[] = [
  {
    key: 'training-style',
    title: 'Training Style',
    options: [
      { id: 'strength', label: 'Strength' },
      { id: 'hiit', label: 'HIIT' },
      { id: 'cardio', label: 'Cardio' },
      { id: 'mobility', label: 'Mobility' },
      { id: 'sport', label: 'Sport Specific' },
    ],
  },
  {
    key: 'schedule',
    title: 'Schedule',
    options: [
      { id: '2x', label: '2× / Week' },
      { id: '3x', label: '3× / Week' },
      { id: '5x', label: '5× / Week' },
      { id: 'daily', label: 'Daily' },
    ],
  },
  {
    key: 'goals',
    title: 'Primary Goal',
    options: [
      { id: 'mass', label: 'Build Mass' },
      { id: 'cut', label: 'Cut & Define' },
      { id: 'endurance', label: 'Endurance' },
      { id: 'performance', label: 'Performance' },
    ],
  },
  {
    key: 'equipment',
    title: 'Equipment Access',
    options: [
      { id: 'full', label: 'Full Gym' },
      { id: 'barbell', label: 'Barbell Only' },
      { id: 'dumbbells', label: 'Dumbbells' },
      { id: 'bodyweight', label: 'Bodyweight' },
    ],
  },
]
