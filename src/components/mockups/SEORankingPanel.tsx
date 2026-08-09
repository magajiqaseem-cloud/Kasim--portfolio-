import { useEffect, useState } from 'react'

const KEYWORDS = [
  { kw: 'fintech website design',  rank: 1,  delta: +3 },
  { kw: 'crypto exchange UI',       rank: 2,  delta: +5 },
  { kw: 'DeFi platform design',     rank: 1,  delta: +7 },
  { kw: 'fintech branding agency',  rank: 3,  delta: +2 },
]

// Points for a rising sparkline — 8 weeks, ending near top
const POINTS = [38, 31, 26, 19, 14, 9, 4, 1]

export default function SEORankingPanel() {
  const [score, setScore] = useState(0)
  const [rowsIn, setRowsIn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setRowsIn(true)
      let n = 0
      const iv = setInterval(() => {
        n += 2
        setScore(Math.min(n, 94))
        if (n >= 94) clearInterval(iv)
      }, 18)
      return () => clearInterval(iv)
    }, 300)
    return () => clearTimeout(t)
  }, [])

  // Build SVG path from POINTS (rank 1 = top = low y value)
  const W = 180, H = 44, max = 40
  const pts = POINTS.map((r, i) => {
    const x = (i / (POINTS.length - 1)) * W
    const y = H - ((max - r + 1) / max) * H
    return `${x},${y}`
  })
  const pathD = `M ${pts.join(' L ')}`

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>GOOGLE RANKINGS</span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', fontWeight: 600,
          padding: '0.15rem 0.5rem', letterSpacing: '0.1em',
          background: 'rgba(74,222,193,0.12)', border: '1px solid rgba(74,222,193,0.3)', color: '#4adec1',
        }}>PAGE 1</span>
      </div>

      {/* Sparkline */}
      <div style={{ padding: '0.85rem 1rem 0.5rem', borderBottom: '1px solid var(--gold-dim)' }}>
        <div style={{ fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>Ranking Trajectory · 8 Weeks</div>
        <div style={{ position: 'relative' }}>
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: 'block', height: 44 }}>
            {/* Area fill */}
            <path d={`${pathD} L ${W},${H} L 0,${H} Z`} fill="rgba(212,175,55,0.07)" />
            {/* Line */}
            <path d={pathD} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinejoin="round" />
            {/* End dot */}
            <circle cx={W} cy={POINTS[POINTS.length - 1] > 0 ? H - ((max - POINTS[POINTS.length-1] + 1) / max) * H : 2} r="3" fill="var(--gold)" />
          </svg>
          {/* Y-axis labels */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.42rem', color: 'rgba(154,152,143,0.4)' }}>#1</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.42rem', color: 'rgba(154,152,143,0.4)' }}>#40</span>
          </div>
        </div>
      </div>

      {/* Keyword rows */}
      <div>
        {KEYWORDS.map((k, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1fr auto auto',
            alignItems: 'center', gap: '0.5rem',
            padding: '0.55rem 1rem',
            borderBottom: i < KEYWORDS.length - 1 ? '1px solid rgba(212,175,55,0.06)' : 'none',
            opacity: rowsIn ? 1 : 0,
            transform: rowsIn ? 'none' : 'translateY(4px)',
            transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
          }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.54rem', color: 'var(--grey)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{k.kw}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: k.rank === 1 ? '#4adec1' : 'var(--gold)', fontWeight: 500, minWidth: '2ch', textAlign: 'right' }}>#{k.rank}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: '#4adec1', minWidth: '4ch', textAlign: 'right' }}>↑{k.delta}</span>
          </div>
        ))}
      </div>

      {/* Footer score */}
      <div style={{ borderTop: '1px solid var(--gold-dim)', padding: '0.55rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.52rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>Domain Authority</span>
        <span style={{ fontSize: '0.7rem', color: '#4adec1', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>{score}/100</span>
      </div>
    </div>
  )
}
