import { useEffect, useState } from 'react'

const BARS = [
  { label: 'Mon', val: 62 },
  { label: 'Tue', val: 78 },
  { label: 'Wed', val: 55 },
  { label: 'Thu', val: 89 },
  { label: 'Fri', val: 74 },
  { label: 'Sat', val: 93 },
]

function useCount(target: number, delay = 0) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const dur = 1400
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [target, delay])
  return v
}

export default function CampaignAnalytics() {
  const [barsIn, setBarsIn] = useState(false)
  const ctr  = useCount(347, 200)
  const spend = useCount(12840, 350)
  const conv  = useCount(1293, 500)

  useEffect(() => {
    const t = setTimeout(() => setBarsIn(true), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>CAMPAIGN ANALYTICS</span>
        <span style={{ fontSize: '0.55rem', color: '#4adec1', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4adec1', boxShadow: '0 0 5px #4adec1' }} />
          LIVE
        </span>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid var(--gold-dim)' }}>
        {[
          { label: 'Clicks',      val: ctr.toLocaleString(),  unit: '' },
          { label: 'Spend',       val: `$${spend.toLocaleString()}`, unit: '' },
          { label: 'Conversions', val: conv.toLocaleString(), unit: '' },
        ].map((k, i) => (
          <div key={i} style={{ padding: '0.75rem', borderRight: i < 2 ? '1px solid var(--gold-dim)' : 'none' }}>
            <div style={{ fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '0.3rem' }}>{k.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.95rem', color: 'var(--gold)', letterSpacing: '-0.01em' }}>{k.val}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ padding: '0.85rem 1rem' }}>
        <div style={{ fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '0.65rem' }}>Daily Conversions</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.4rem', height: 56 }}>
          {BARS.map((b, i) => (
            <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '100%', height: 46, display: 'flex', alignItems: 'flex-end' }}>
                <div style={{
                  width: '100%',
                  height: barsIn ? `${b.val}%` : '0%',
                  background: i === 5 ? 'var(--gold)' : 'rgba(212,175,55,0.25)',
                  transition: `height 0.55s ease ${i * 0.08}s`,
                }} />
              </div>
              <span style={{ fontSize: '0.48rem', color: 'var(--grey)' }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer metric */}
      <div style={{ borderTop: '1px solid var(--gold-dim)', padding: '0.55rem 1rem', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.55rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>ROAS</span>
        <span style={{ fontSize: '0.7rem', color: '#4adec1', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>4.2×</span>
      </div>
    </div>
  )
}
