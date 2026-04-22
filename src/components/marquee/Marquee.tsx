const PHRASE = 'NO SHORTCUTS.\u00a0\u00a0·\u00a0\u00a0NO EXCUSES.\u00a0\u00a0·\u00a0\u00a0NO LIMITS.\u00a0\u00a0·\u00a0\u00a0'

const REPETITIONS = 6

function Track() {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: '"Monument Extended", sans-serif',
        fontWeight: 800,
        fontSize: 'clamp(13px, 1.5vw, 20px)',
        letterSpacing: '-0.01em',
        color: '#ffffff',
        whiteSpace: 'nowrap',
      }}
    >
      {Array.from({ length: REPETITIONS }, (_, i) => (
        <span key={i}>{PHRASE}</span>
      ))}
    </span>
  )
}

export function Marquee() {
  return (
    <div
      className="marquee-wrap"
      style={{
        height: 56,
        margin: '72px 0',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-hidden
    >
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'marquee-scroll 55s linear infinite',
          willChange: 'transform',
        }}
      >
        <Track />
        <Track />
      </div>
    </div>
  )
}
