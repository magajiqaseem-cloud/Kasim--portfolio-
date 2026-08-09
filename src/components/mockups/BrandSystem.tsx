const SWATCHES = [
  { name: 'Primary',   hex: '#08080A', label: '#08080A' },
  { name: 'Gold',      hex: '#D4AF37', label: '#D4AF37' },
  { name: 'Soft Gold', hex: '#E8CF7A', label: '#E8CF7A' },
  { name: 'Ivory',     hex: '#F6F4EE', label: '#F6F4EE' },
]

export default function BrandSystem() {
  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>BRAND IDENTITY SYSTEM</span>
        <span style={{ fontSize: '0.5rem', color: 'var(--gold)', fontFamily: 'JetBrains Mono, monospace' }}>v2.0</span>
      </div>

      {/* Logo mark area */}
      <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Logo mark */}
        <div style={{ width: 56, height: 56, border: '1px solid var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
          {/* Diamond mark */}
          <div style={{ width: 22, height: 22, transform: 'rotate(45deg)', border: '1.5px solid var(--gold)', position: 'absolute' }} />
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', fontWeight: 600, color: 'var(--gold)', position: 'relative', zIndex: 1 }}>K</span>
        </div>
        {/* Wordmark */}
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--white)', letterSpacing: '0.04em', lineHeight: 1 }}>
            Kasim Elite
          </div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.4rem', letterSpacing: '0.46em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', marginTop: '0.25rem' }}>
            Digital Global
          </div>
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {['Fintech', 'Luxury', 'Global'].map(tag => (
              <span key={tag} style={{ fontSize: '0.42rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--grey)', padding: '0.1rem 0.3rem', border: '1px solid var(--gold-dim)' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Color swatches */}
      <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--gold-dim)' }}>
        <div style={{ fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '0.6rem', fontFamily: 'JetBrains Mono, monospace' }}>Colour Palette</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {SWATCHES.map(sw => (
            <div key={sw.name} style={{ flex: 1 }}>
              <div style={{
                height: 28,
                background: sw.hex,
                border: sw.name === 'Primary' ? '1px solid var(--gold-dim)' : 'none',
                marginBottom: '0.3rem',
              }} />
              <div style={{ fontSize: '0.44rem', color: 'var(--grey)', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace' }}>{sw.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Type sample */}
      <div style={{ padding: '0.85rem 1rem' }}>
        <div style={{ fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '0.6rem', fontFamily: 'JetBrains Mono, monospace' }}>Typography</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--white)', lineHeight: 1 }}>Aa</span>
            <span style={{ fontSize: '0.48rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>Cormorant Garamond · Display</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', fontWeight: 400, color: 'var(--white)', lineHeight: 1 }}>Aa</span>
            <span style={{ fontSize: '0.48rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>Outfit · UI & Body</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--gold)', lineHeight: 1 }}>01</span>
            <span style={{ fontSize: '0.48rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>JetBrains Mono · Data</span>
          </div>
        </div>
      </div>
    </div>
  )
}
