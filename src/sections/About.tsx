const STATS = [
  { v: '50k+', l: 'Users Served',    sub: 'Across fintech platforms worldwide' },
  { v: '30+',  l: 'Global Clients',  sub: 'Enterprise & institutional brands' },
  { v: '98%',  l: 'Satisfaction',    sub: 'Client retention and referral rate' },
]

export default function About() {
  return (
    <section id="about" className="section" style={{ borderTop: '1px solid var(--gold-dim)', background: 'var(--black-2)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7rem', alignItems: 'start' }}>
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--gold)', opacity: 0.65 }}>About</p>
            <h2 className="serif" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '2rem', color: 'var(--white)' }}>
              Built for the{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Financial Elite</em>
            </h2>
            <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--grey)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Kasim Elite Digital Global was founded with a singular mandate: world-class digital infrastructure, exclusively for the financial sector.
            </p>
            <p className="sans" style={{ fontSize: '0.88rem', color: 'var(--grey)', lineHeight: 1.75, marginBottom: '3rem', opacity: 0.75 }}>
              No templates. No shortcuts. Every engagement is bespoke, every deliverable held to the standard that global financial markets demand — where trust is the only currency that matters.
            </p>
            <a href="#contact" className="btn-primary">Work With Us</a>
          </div>
          <div>
            {STATS.map((s, i) => (
              <div key={i} style={{ paddingTop: i === 0 ? 0 : '2.75rem', marginTop: i === 0 ? 0 : '2.75rem', borderTop: i === 0 ? 'none' : '1px solid var(--gold-dim)' }}>
                <div className="serif" style={{ fontSize: 'clamp(3.2rem, 6vw, 5rem)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>{s.v}</div>
                <p className="sans" style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--white)', fontWeight: 500, marginBottom: '0.2rem' }}>{s.l}</p>
                <p className="sans" style={{ fontSize: '0.78rem', color: 'var(--grey)', opacity: 0.7 }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 820px) { #about > .container > div { grid-template-columns: 1fr !important; gap: 4rem !important; } }`}</style>
    </section>
  )
}
