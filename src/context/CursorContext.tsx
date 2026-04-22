import { createContext, useContext, useState } from 'react'

export type CursorLabel = '[ + ]' | '[ DRAG ]' | '[ EXPLORE ]' | '[ TRANSMIT ]' | ''

interface CursorContextValue {
  label: CursorLabel
  setLabel: (label: CursorLabel) => void
}

const CursorContext = createContext<CursorContextValue | null>(null)

interface CursorProviderProps {
  children: React.ReactNode
}

export function CursorProvider({ children }: CursorProviderProps) {
  const [label, setLabel] = useState<CursorLabel>('')

  return (
    <CursorContext.Provider value={{ label, setLabel }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used inside CursorProvider')
  return ctx
}
