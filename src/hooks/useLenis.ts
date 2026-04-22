import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/utils/gsap'

type LenisScrollData = { velocity: number; direction: number }
type LenisScrollHandler = (data: LenisScrollData) => void

const _scrollSubscribers = new Set<LenisScrollHandler>()
let _lenis: Lenis | null = null

export function subscribeToLenisScroll(fn: LenisScrollHandler): () => void {
  _scrollSubscribers.add(fn)
  return () => _scrollSubscribers.delete(fn)
}

export function lenisScrollTo(target: string | number | HTMLElement, options?: Parameters<Lenis['scrollTo']>[1]) {
  _lenis?.scrollTo(target as never, options)
}

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    window.scrollTo(0, 0)
    _lenis = new Lenis()

    _lenis.on('scroll', (e: LenisScrollData) => {
      ScrollTrigger.update()
      _scrollSubscribers.forEach(fn => fn(e))
    })

    const tickerFn = (time: number) => _lenis!.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      gsap.ticker.remove(tickerFn)
      _lenis!.destroy()
      _lenis = null
    }
  }, [enabled])
}
