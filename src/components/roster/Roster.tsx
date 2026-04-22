import { RosterCard } from './RosterCard'

const MEMBERS = [
  { name: 'Marcus Webb', role: 'Head Coach', metric: '12yr', metricLabel: 'experience', imageSrc: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&auto=format&fit=crop&q=80' },
  { name: 'Sienna Park', role: 'Strength & Conditioning', metric: '400+', metricLabel: 'athletes trained', imageSrc: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&auto=format&fit=crop&crop=faces&q=80' },
  { name: 'Derek Okafor', role: 'Nutrition Lead', metric: '98%', metricLabel: 'client retention', imageSrc: 'https://plus.unsplash.com/premium_photo-1663050901483-ee8703cc8372?w=800&auto=format&fit=crop&crop=faces&q=80' },
  { name: 'Lyra Chen', role: 'Mobility Specialist', metric: '8', metricLabel: 'certifications', imageSrc: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&crop=faces&q=80' },
]

export function Roster() {
  return (
    <section
      id="roster"
      className="roster-section"
      style={{
        backgroundColor: '#0d141a',
        padding: '0 48px 120px',
      }}
    >
      <div style={{ marginBottom: 80 }}>
        <p
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
