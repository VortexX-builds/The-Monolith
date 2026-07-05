import { useEffect, useState } from 'react'

let scrollActive = false
const LISTENERS = new Set<() => void>()

function activate() {
  if (scrollActive) return
  scrollActive = true
  LISTENERS.forEach((fn) => fn())
  LISTENERS.clear()
  cleanupGlobal()
}

const EVENTS = ['scroll', 'mousemove', 'touchstart', 'keydown']

function setupGlobal() {
  if (typeof window === 'undefined') return
  EVENTS.forEach((e) => window.addEventListener(e, activate, { passive: true }))
}

function cleanupGlobal() {
  if (typeof window === 'undefined') return
  EVENTS.forEach((e) => window.removeEventListener(e, activate))
}

// Automatically setup global listeners on initial load
setupGlobal()

export function useScrollTriggerActive(): boolean {
  const [active, setActive] = useState(scrollActive)

  useEffect(() => {
    if (scrollActive) {
      setActive(true)
      return
    }

    const handler = () => setActive(true)
    LISTENERS.add(handler)
    return () => {
      LISTENERS.delete(handler)
    }
  }, [])

  return active
}
