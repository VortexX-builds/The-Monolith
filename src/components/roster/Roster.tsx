import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsap'
import { RosterCard } from './RosterCard'

const MEMBERS = [
  { name: 'Marcus Webb', role: 'Head Coach', metric: '12yr', metricLabel: 'experience', imageSrc: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&auto=format&fit=crop&q=80' },
  { name: 'Sienna Park', role: 'Strength & Conditioning', metric: '400+', metricLabel: 'athletes trained', imageSrc: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&auto=format&fit=crop&crop=faces&q=80' },
  { name: 'Derek Okafor', role: 'Nutrition Lead', metric: '98%', metricLabel: 'client retention', imageSrc: 'https://plus.unsplash.com/premium_photo-1663050901483-ee8703cc8372?w=800&auto=format&fit=crop&crop=faces&q=80' },
  { name: 'Lyra Chen', role: 'Mobility Specialist', metric: '8', metricLabel: 'certifications', imageSrc: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&crop=faces&q=80' },
]

export function Roster() {
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
    <section id="roster" className="roster-section" style={{ backgroundColor: '#0d141a', padding: '0 48px' }}>
      <div ref={headingBlockRef} className="roster-heading-block" style={{ marginBottom: 80 }}>
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
          The Roster
        </p>
        <h2
          ref={titleRef}
          style={{
            fontFamily: '"Monument Extended", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 90px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          The Coaches.
        </h2>
      </div>

      <div
        className="roster-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        {MEMBERS.map((member) => (
          <RosterCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  )
}
