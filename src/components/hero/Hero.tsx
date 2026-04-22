import { HeroCanvas } from './HeroCanvas'
import { HeroHeadline } from './HeroHeadline'

interface HeroProps {
  visible: boolean
}

export function Hero({ visible }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100dvh',
        width: '100%',
        backgroundColor: '#0d141a',
        overflow: 'hidden',
      }}
    >
      <HeroCanvas />
      <HeroHeadline visible={visible} />
    </section>
  )
}
