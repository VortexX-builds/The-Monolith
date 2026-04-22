import { useState } from 'react'
import { CursorProvider } from '@/context/CursorContext'
import { NavigationContext } from '@/context/NavigationContext'
import { Root } from '@/components/layout/Root'
import { Preloader } from '@/components/preloader/Preloader'
import { NavTransition } from '@/components/preloader/NavTransition'
import { Hero } from '@/components/hero/Hero'
import { Marquee } from '@/components/marquee/Marquee'
import { Arsenal } from '@/components/arsenal/Arsenal'
import { Roster } from '@/components/roster/Roster'
import { Config } from '@/components/config/Config'
import { Contact } from '@/components/contact/Contact'
import { Footer } from '@/components/footer/Footer'

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [navTarget, setNavTarget] = useState<string | null>(null)
  const [programme, setProgramme] = useState<Record<string, string[]> | null>(null)

  return (
    <CursorProvider>
      <NavigationContext.Provider value={{ navigateTo: setNavTarget }}>
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
        {navTarget && (
          <NavTransition targetId={navTarget} onComplete={() => setNavTarget(null)} />
        )}
        <Root scrollEnabled={preloaderDone}>
          <Hero visible={preloaderDone} />
          <Marquee />
          <Arsenal />
          <Marquee />
          <Roster />
          <Marquee />
          <Config onProgrammeComplete={setProgramme} />
          <Marquee />
          <Contact programme={programme} />
          <Footer />
        </Root>
      </NavigationContext.Provider>
    </CursorProvider>
  )
}
