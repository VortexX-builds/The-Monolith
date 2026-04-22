export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1000,
        backgroundImage: 'url(/textures/noise-tile.png)',
        backgroundSize: '256px 256px',
        opacity: 0.035,
        mixBlendMode: 'overlay',
        animation: 'noise-drift 0.5s steps(1) infinite',
      }}
    />
  )
}
