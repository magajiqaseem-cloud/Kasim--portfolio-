import { useEffect, useState, useRef } from 'react'

const BARS = [
  { month: 'Feb', val: 58 },
  { month: 'Mar', val: 72 },
  { month: 'Apr', val: 61 },
  { month: 'May', val: 84 },
  { month: 'Jun', val: 77 },
  { month: 'Jul', val: 93 },
]

const ASSETS = [
  { name: 'BTC / USD',  price: '62,480.00', delta: '+3.41%',  up: true  },
  { name: 'ETH / USD',  price: '3,214.50',  delta: '+1.87%',  up: true  },
  { name: 'AAPL',       price: '189.23',    delta: '-0.52%',  up: false },
  { name: 'NGN / USD',  price: '0.00063',   delta: '-1.12%',  up: false },
]

function useCounter(target: number, duration = 1200) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(target * ease))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return val
}

export default function FinVaultDashboard() {
  const [barsVisible, setBarsVisible] = useState(false)
  const [activeBar, setActiveBar] = useState<number | null>(null)
  const portfolioVal = useCounter(248750)
  const returnPct = useCounter(18)

  useEffect(() => {
    const t = setTimeout(() => setBarsVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 0 })

  return (
    <div
      style={{
        background: 'var(--black-2)',
        border: '1px solid var(--gold-dim)',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '0.78rem',
        color: 'var(--white)',
        userSelect: 'none',
      }}
    >
      {/* ── Header bar ──────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.25rem',
          borderBottom: '1px solid var(--gold-dim)',
          background: 'var(--black-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--teal)',
            boxShadow: '0 0 6px var(--teal)',
          }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--grey)', letterSpacing: '0.08em' }}>
            FINVAULT · PORTFOLIO
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['1D','1W','1M','YTD'].map((t, i) => (
            <span
              key={t}
              style={{
                padding: '0.15rem 0.5rem',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                background: i === 2 ? 'rgba(212,175,55,0.12)' : 'transparent',
                color: i === 2 ? 'var(--gold)' : 'var(--grey)',
                border: i === 2 ? '1px solid var(--gold-dim)' : '1px solid transparent',
                cursor: 'pointer',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Portfolio value ──────────────────────────────────── */}
      <div style={{ padding: '1.5rem 1.25rem 1rem', borderBottom: '1px solid var(--gold-dim)' }}>
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '0.4rem' }}>
          Total Portfolio Value
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <span
            className="serif"
            style={{ fontSize: '2.4rem', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            ${fmt(portfolioVal)}
          </span>
          <span style={{
            fontSize: '0.72rem', fontWeight: 500,
            color: 'var(--teal)',
            background: 'rgba(74,222,193,0.08)',
            border: '1px solid rgba(74,222,193,0.2)',
            padding: '0.2rem 0.5rem',
          }}>
            +{returnPct}% YTD
          </span>
        </div>
      </div>

      {/* ── Bar chart ────────────────────────────────────────── */}
      <div style={{ padding: '1.25rem 1.25rem 0.75rem', borderBottom: '1px solid var(--gold-dim)' }}>
        <p style={{ fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '1rem' }}>
          Monthly Performance
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '72px' }}>
          {BARS.map((b, i) => (
            <div
              key={b.month}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
              onMouseEnter={() => setActiveBar(i)}
              onMouseLeave={() => setActiveBar(null)}
            >
              <div style={{ width: '100%', height: '60px', display: 'flex', alignItems: 'flex-end' }}>
                <div
                  style={{
                    width: '100%',
                    height: barsVisible ? `${b.val}%` : '0%',
                    background: activeBar === i
                      ? 'var(--gold)'
                      : i === 5
                        ? 'rgba(212,175,55,0.55)'
                        : 'rgba(212,175,55,0.22)',
                    transition: `height 0.6s ease ${i * 0.07}s, background 0.2s`,
                    position: 'relative',
                  }}
                >
                  {activeBar === i && (
                    <div style={{
                      position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                      background: 'var(--black-3)',
                      border: '1px solid var(--gold-dim)',
                      padding: '0.1rem 0.3rem',
                      fontSize: '0.55rem',
                      color: 'var(--gold)',
                      whiteSpace: 'nowrap',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>
                      {b.val}%
                    </div>
                  )}
                </div>
              </div>
              <span style={{ fontSize: '0.52rem', color: 'var(--grey)', letterSpacing: '0.06em' }}>{b.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Asset rows ───────────────────────────────────────── */}
      <div style={{ padding: '0.5rem 0' }}>
        {ASSETS.map((a, i) => (
          <div
            key={a.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.65rem 1.25rem',
              borderBottom: i < ASSETS.length - 1 ? '1px solid rgba(212,175,55,0.07)' : 'none',
              transition: 'background 0.18s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212,175,55,0.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--grey)', letterSpacing: '0.05em' }}>
              {a.name}
            </span>
            <span className="serif" style={{ fontSize: '0.88rem', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.01em' }}>
              ${a.price}
            </span>
            <span style={{
              fontSize: '0.62rem',
              fontFamily: 'JetBrains Mono, monospace',
              color: a.up ? 'var(--teal)' : 'var(--red-delta)',
              minWidth: '5ch',
              textAlign: 'right',
            }}>
              {a.delta}
            </span>
          </div>
        ))}
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid var(--gold-dim)',
        padding: '0.7rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.52rem', color: 'var(--grey)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Last updated: just now
        </span>
        <span style={{
          fontSize: '0.52rem',
          color: 'var(--teal)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
          Live
        </span>
      </div>
    </div>
  )
}
