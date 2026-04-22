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
  return (
    <section
      id="arsenal"
      className="arsenal-section"
      style={{
        backgroundColor: '#0d141a',
        padding: '0 48px',
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
          The Arsenal
        </p>
        <h2
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
        {ITEMS.map((item) => (
          <ArsenalCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}
