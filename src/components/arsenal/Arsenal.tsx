import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsap'
import { ArsenalCard } from './ArsenalCard'

const ITEMS = [
  { title: 'Power Rack', category: 'Strength', imageSrc: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80' },
  { title: 'Olympic Platform', category: 'Olympic', imageSrc: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&auto=format&fit=crop&q=80' },
  { title: 'Cable System', category: 'Accessory', imageSrc: 'https://images.unsplash.com/photo-1767552273968-da3464e2986c?w=600&auto=format&fit=crop&q=80' },
  { title: 'Conditioning Floor', category: 'Cardio', imageSrc: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&auto=format&fit=crop&q=80' },
  { title: 'Turf Lane', category: 'Functional', imageSrc: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80' },
  { title: 'Recovery Zone', category: 'Recovery', imageSrc: 'https://images.unsplash.com/photo-1591741535585-9c4f52b3f13f?w=600&auto=format&fit=crop&q=80' },
]

export function Arsenal() {
  const headingBlockRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const block = headingBlockRef.current
    const label = labelRef.current
    const title = titleRef.current
    if (!block || !label || !title) return

    gsap.set([label, title], { y: 40, opacity: 0 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: block,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(label, { y: 0, opacity: 1, duration: 0.7, ease: 'monolith' })
          gsap.to(title, { y: 0, opacity: 1, duration: 0.7, ease: 'monolith', delay: 0.1 })
        },
      })
    }, block)

    return () => ctx.revert()
  }, [])

  return (
    <section id="arsenal" className="arsenal-section" style={{ backgroundColor: '#0d141a', padding: '0 48px' }}>
      <div ref={headingBlockRef} className="arsenal-heading-block" style={{ marginBottom: 80 }}>
        <p
          ref={labelRef}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#A8A9AD',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          The Arsenal
        </p>
        <h2
          ref={titleRef}
          className="arsenal-heading-title"
          style={{
            fontFamily: '"Monument Extended", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 90px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            maxWidth: '60%',
          }}
        >
          Built for the Serious.
        </h2>
      </div>

      <div
        className="arsenal-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
        }}
      >
        {ITEMS.map((item, i) => (
          <ArsenalCard key={item.title} {...item} index={i} />
        ))}
      </div>
    </section>
  )
}
