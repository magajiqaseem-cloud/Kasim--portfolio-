import { useState } from 'react'

const SAMPLES = [
  {
    before: 'We offer digital marketing services to help grow your business.',
    after: 'We engineer revenue-accelerating digital campaigns that transform emerging brands into category leaders — globally.',
  },
  {
    before: 'Our team has experience in fintech and can help you with your project.',
    after: 'Backed by deep fintech expertise, we craft institutional-grade digital products that command investor confidence from day one.',
  },
  {
    before: 'Contact us to learn more about our services and pricing.',
    after: 'Secure your competitive edge — let\'s architect a strategy that scales your revenue across every market you enter.',
  },
]

export default function CopyBeforeAfter() {
  const [idx, setIdx] = useState(0)
  const s = SAMPLES[idx]

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>COPY TRANSFORMATION</span>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {SAMPLES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: 16, height: 4,
              background: idx === i ? 'var(--gold)' : 'var(--gold-dim)',
              transition: 'background 0.2s',
            }} />
          ))}
        </div>
      </div>

      {/* Split panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Before */}
        <div style={{ padding: '1rem', borderRight: '1px solid var(--gold-dim)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e05c5c', fontFamily: 'JetBrains Mono, monospace' }}>Before</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(224,92,92,0.2)' }} />
          </div>
          <p style={{ fontSize: '0.68rem', color: 'rgba(154,152,143,0.65)', lineHeight: 1.65, margin: 0, fontFamily: 'Outfit, sans-serif', fontStyle: 'italic' }}>
            {s.before}
          </p>
        </div>

        {/* After */}
        <div style={{ padding: '1rem', background: 'rgba(212,175,55,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4adec1', fontFamily: 'JetBrains Mono, monospace' }}>After</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(74,222,193,0.2)' }} />
          </div>
          <p style={{ fontSize: '0.68rem', color: 'rgba(246,244,238,0.82)', lineHeight: 1.65, margin: 0, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 400 }}>
            {s.after}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--gold-dim)', padding: '0.55rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.5rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>Conversion-focused · Brand-aligned</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2.5 2.5 3.5-4" stroke="#4adec1" strokeWidth="1.2" fill="none"/></svg>
          <span style={{ fontSize: '0.5rem', color: '#4adec1', fontFamily: 'JetBrains Mono, monospace' }}>SEO-ready</span>
        </div>
      </div>
    </div>
  )
}
