import { useState } from 'react'
import { CursorProvider } from '@/context/CursorContext'
import { Root } from '@/components/layout/Root'
import { Preloader } from '@/components/preloader/Preloader'
import { Hero } from '@/components/hero/Hero'
import { Marquee } from '@/components/marquee/Marquee'
import { Arsenal } from '@/components/arsenal/Arsenal'
import { Roster } from '@/components/roster/Roster'
import { Config } from '@/components/config/Config'

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <CursorProvider>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <Root scrollEnabled={preloaderDone}>
        <Hero visible={preloaderDone} />
        <Marquee />
        <Arsenal />
        <Marquee />
        <Roster />
        <Marquee />
        <Config />
      </Root>
    </CursorProvider>
  )
}
