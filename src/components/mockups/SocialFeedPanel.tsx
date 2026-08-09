import { useEffect, useState } from 'react'

// 6 post tile configs — alternating content densities
const TILES = [
  { lines: [0.85, 0.6],  accent: true },
  { lines: [0.7, 0.45],  accent: false },
  { lines: [0.9, 0.5],   accent: false },
  { lines: [0.6, 0.75],  accent: true },
  { lines: [0.8, 0.4],   accent: false },
  { lines: [0.65, 0.55], accent: false },
]

const METRICS = [
  { label: 'Followers', start: 4_820,  target: 12_400 },
  { label: 'Avg Reach',  start: 2_100,  target: 8_740 },
]

function useCount(target: number, duration = 1600, delay = 0) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [target, duration, delay])
  return v
}

export default function SocialFeedPanel() {
  const followers = useCount(12_400, 1800, 200)
  const reach     = useCount(8_740,  1800, 400)
  const [tilesIn, setTilesIn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTilesIn(true), 150)
    return () => clearTimeout(t)
  }, [])

  const counts = [followers, reach]

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>SOCIAL GROWTH</span>
        <span style={{ fontSize: '0.55rem', color: '#4adec1', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'JetBrains Mono, monospace' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4adec1', boxShadow: '0 0 5px #4adec1' }} />
          LIVE
        </span>
      </div>

      {/* Metrics row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--gold-dim)' }}>
        {METRICS.map((m, i) => (
          <div key={m.label} style={{ padding: '0.75rem', borderRight: i === 0 ? '1px solid var(--gold-dim)' : 'none' }}>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '0.25rem', fontFamily: 'JetBrains Mono, monospace' }}>{m.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: 'var(--gold)', letterSpacing: '-0.01em' }}>
              {counts[i].toLocaleString()}
            </div>
            <div style={{ fontSize: '0.45rem', color: '#4adec1', fontFamily: 'JetBrains Mono, monospace', marginTop: '0.15rem' }}>
              ↑ {i === 0 ? '+157%' : '+316%'} growth
            </div>
          </div>
        ))}
      </div>

      {/* Feed grid */}
      <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--gold-dim)' }}>
        <div style={{ fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>Recent Posts</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
          {TILES.map((tile, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                background: tile.accent ? 'rgba(212,175,55,0.07)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${tile.accent ? 'rgba(212,175,55,0.2)' : 'rgba(154,152,143,0.1)'}`,
                padding: '0.4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: '0.2rem',
                opacity: tilesIn ? 1 : 0,
                transform: tilesIn ? 'none' : 'scale(0.96)',
                transition: `opacity 0.35s ease ${i * 0.07}s, transform 0.35s ease ${i * 0.07}s`,
              }}
            >
              {tile.lines.map((w, li) => (
                <div key={li} style={{ height: 3, width: `${w * 100}%`, background: tile.accent ? 'rgba(212,175,55,0.4)' : 'rgba(154,152,143,0.2)' }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '0.55rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.5rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>Instagram · Facebook · LinkedIn</span>
        <span style={{ fontSize: '0.52rem', color: 'var(--gold)', fontFamily: 'JetBrains Mono, monospace' }}>90-day plan</span>
      </div>
    </div>
  )
}
