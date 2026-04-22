import { RosterCard } from './RosterCard'

const MEMBERS = [
  { name: 'Marcus Webb', role: 'Head Coach', metric: '12yr', metricLabel: 'experience', imageSrc: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&auto=format&fit=crop&q=80' },
  { name: 'Sienna Park', role: 'Strength & Conditioning', metric: '400+', metricLabel: 'athletes trained', imageSrc: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80' },
  { name: 'Derek Okafor', role: 'Nutrition Lead', metric: '98%', metricLabel: 'client retention', imageSrc: 'https://images.unsplash.com/photo-1583454110738-61e72e44ea40?w=800&auto=format&fit=crop&q=80' },
  { name: 'Lyra Chen', role: 'Mobility Specialist', metric: '8', metricLabel: 'certifications', imageSrc: 'https://images.unsplash.com/photo-1518310837-19ded5b5bdf4?w=800&auto=format&fit=crop&q=80' },
]

export function Roster() {
  return (
    <section
      id="roster"
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
