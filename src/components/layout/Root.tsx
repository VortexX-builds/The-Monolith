import { useLenis } from '@/hooks/useLenis'
import { NoiseOverlay } from '@/components/noise/NoiseOverlay'
import { Cursor } from '@/components/cursor/Cursor'
import { Nav } from '@/components/layout/Nav'

interface RootProps {
  children: React.ReactNode
  scrollEnabled: boolean
}

export function Root({ children, scrollEnabled }: RootProps) {
  useLenis(scrollEnabled)

  return (
    <>
      <NoiseOverlay />
      <Cursor />
      <Nav />
      {children}
    </>
  )
}
