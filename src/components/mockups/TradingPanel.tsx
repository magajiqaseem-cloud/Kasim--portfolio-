import { useEffect, useState } from 'react'

const PAIRS = [
  { pair: 'BTC/USDT', base: 62480, dir: 1 },
  { pair: 'ETH/USDT', base: 3214,  dir: -1 },
  { pair: 'SOL/USDT', base: 148,   dir: 1 },
]

export default function TradingPanel() {
  const [prices, setPrices] = useState(PAIRS.map(p => p.base))
  const [deltas, setDeltas] = useState(PAIRS.map(() => 0))
  const [side, setSide] = useState<'buy'|'sell'>('buy')

  useEffect(() => {
    const iv = setInterval(() => {
      setPrices(prev => prev.map((p, i) => {
        const jitter = (Math.random() - 0.49) * PAIRS[i].base * 0.0012
        return +(p + jitter).toFixed(2)
      }))
      setDeltas(PAIRS.map((p, i) => {
        const pct = ((prices[i] - p.base) / p.base) * 100
        return +pct.toFixed(2)
      }))
    }, 1400)
    return () => clearInterval(iv)
  }, [prices])

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3, #141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>MARKET · SPOT</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.55rem', color: '#4adec1', letterSpacing: '0.12em' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4adec1', boxShadow: '0 0 5px #4adec1' }} />
          LIVE
        </span>
      </div>

      {/* Ticker rows */}
      {PAIRS.map((p, i) => (
        <div key={p.pair} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 1rem', borderBottom: '1px solid rgba(212,175,55,0.07)' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--grey)', letterSpacing: '0.05em' }}>{p.pair}</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--white)', letterSpacing: '-0.01em', transition: 'color 0.3s' }}>
            {prices[i].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: deltas[i] >= 0 ? '#4adec1' : '#e05c5c', minWidth: '5.5ch', textAlign: 'right' }}>
            {deltas[i] >= 0 ? '+' : ''}{deltas[i].toFixed(2)}%
          </span>
        </div>
      ))}

      {/* Buy / Sell */}
      <div style={{ padding: '0.85rem 1rem' }}>
        <div style={{ display: 'flex', marginBottom: '0.65rem', border: '1px solid var(--gold-dim)' }}>
          {(['buy','sell'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSide(s)}
              style={{
                flex: 1, padding: '0.45rem 0',
                fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
                background: side === s ? (s === 'buy' ? 'rgba(74,222,193,0.15)' : 'rgba(224,92,92,0.15)') : 'transparent',
                color: side === s ? (s === 'buy' ? '#4adec1' : '#e05c5c') : 'var(--grey)',
                borderRight: s === 'buy' ? '1px solid var(--gold-dim)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--gold-dim)', padding: '0.4rem 0.6rem' }}>
            <div style={{ fontSize: '0.5rem', color: 'var(--grey)', letterSpacing: '0.12em', marginBottom: '0.15rem' }}>AMOUNT</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--white)' }}>0.0412</div>
          </div>
          <button
            style={{
              padding: '0 1rem', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
              background: side === 'buy' ? 'rgba(74,222,193,0.18)' : 'rgba(224,92,92,0.18)',
              color: side === 'buy' ? '#4adec1' : '#e05c5c',
              border: `1px solid ${side === 'buy' ? 'rgba(74,222,193,0.3)' : 'rgba(224,92,92,0.3)'}`,
            }}
          >
            {side === 'buy' ? 'Buy' : 'Sell'}
          </button>
        </div>
      </div>
    </div>
  )
}
