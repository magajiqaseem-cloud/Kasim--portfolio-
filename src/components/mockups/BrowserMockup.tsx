import { useEffect, useState } from 'react'

export default function BrowserMockup() {
  const [score, setScore] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setLoaded(true)
      let n = 0
      const iv = setInterval(() => {
        n += 3
        setScore(Math.min(n, 98))
        if (n >= 98) clearInterval(iv)
      }, 22)
      return () => clearInterval(iv)
    }, 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Browser chrome */}
      <div style={{ background: 'var(--black-3, #141417)', padding: '0.55rem 0.75rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {['#e05c5c','#d4af37','#4adec1'].map(c => <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: 0.7 }} />)}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', fontSize: '0.58rem', color: 'var(--grey)', borderRadius: 2, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>
          kasimempire.com
        </div>
      </div>

      {/* Page preview */}
      <div style={{ padding: '1rem', minHeight: 120 }}>
        {/* Mock nav bar */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ width: 40, height: 5, background: 'var(--gold)', opacity: 0.6 }} />
          <div style={{ flex: 1, display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
            {[28,22,30,24].map((w,i) => <div key={i} style={{ width: w, height: 4, background: 'rgba(154,152,143,0.25)' }} />)}
          </div>
        </div>
        {/* Mock hero */}
        <div style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid var(--gold-dim)', padding: '0.75rem', marginBottom: '0.6rem' }}>
          <div style={{ width: '55%', height: 7, background: 'rgba(246,244,238,0.35)', marginBottom: '0.4rem' }} />
          <div style={{ width: '40%', height: 5, background: 'rgba(246,244,238,0.15)', marginBottom: '0.6rem' }} />
          <div style={{ width: 52, height: 14, background: 'var(--gold)', opacity: loaded ? 0.85 : 0.3, transition: 'opacity 0.5s' }} />
        </div>
        {/* Mock content blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
          {[1,2,3].map(i => <div key={i} style={{ height: 28, background: 'rgba(154,152,143,0.08)', border: '1px solid var(--gold-dim)' }} />)}
        </div>
      </div>

      {/* Performance score */}
      <div style={{ borderTop: '1px solid var(--gold-dim)', padding: '0.65rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>
          Core Web Vitals
        </span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.82rem',
          fontWeight: 500,
          color: score > 90 ? '#4adec1' : score > 70 ? 'var(--gold)' : '#e05c5c',
          background: 'rgba(74,222,193,0.07)',
          border: '1px solid rgba(74,222,193,0.2)',
          padding: '0.15rem 0.5rem',
          transition: 'color 0.2s',
        }}>
          {score}/100
        </span>
      </div>
    </div>
  )
}
