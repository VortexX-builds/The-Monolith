import { createContext, useContext } from 'react'

interface NavigationContextValue {
  navigateTo: (sectionId: string) => void
}

export const NavigationContext = createContext<NavigationContextValue>({
  navigateTo: () => {},
})

export function useNavigation() {
  return useContext(NavigationContext)
}
