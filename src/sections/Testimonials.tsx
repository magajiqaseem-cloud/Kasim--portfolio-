import { useState } from 'react'

const T = [
  {
    q: 'Kasim Elite redesigned our trading platform UI and onboarding conversion increased by 41% within 60 days. Their understanding of fintech UX is genuinely unmatched.',
    name: 'Alejandro M.', co: 'Wealth Vault Capital', role: 'Chief Product Officer',
  },
  {
    q: "From brand identity through to SEO and performance marketing, every deliverable came ahead of schedule and above expectation. They operate at a tier I've rarely encountered.",
    name: 'Sarah K.', co: 'Apex Digital Scale', role: 'CEO & Co-Founder',
  },
  {
    q: 'Our DeFi dashboard needed a complete overhaul before our Series A roadshow. Kasim Elite delivered an institutional-grade product in six weeks. Investor response exceeded all targets.',
    name: 'David H.', co: 'Block Trade Exchange', role: 'Head of Product',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const t = T[active]

  return (
    <section className="section" style={{ borderTop: '1px solid var(--gold-dim)', background: 'var(--black)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', alignItems: 'start' }}>

          {/* Left: selectors */}
          <div>
            <p className="label" style={{ marginBottom: '2.5rem', color: 'var(--gold)', opacity: 0.65 }}>Client Testimonials</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {T.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    background: 'none', border: 'none', padding: '1.25rem 1.5rem', textAlign: 'left', cursor: 'pointer',
                    borderLeft: `1px solid ${active === i ? 'var(--gold)' : 'var(--gold-dim)'}`,
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div className="sans" style={{ fontSize: '0.72rem', fontWeight: 500, color: active === i ? 'var(--white)' : 'var(--grey)', marginBottom: '0.2rem', transition: 'color 0.2s' }}>
                    {item.name}
                  </div>
                  <div className="serif" style={{ fontSize: '0.8rem', fontStyle: 'italic', color: active === i ? 'rgba(212,175,55,0.7)' : 'rgba(154,152,143,0.5)', transition: 'color 0.2s' }}>
                    {item.co}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: quote */}
          <div key={active}>
            <div className="serif" style={{ fontSize: '4rem', lineHeight: 0.6, color: 'var(--gold)', opacity: 0.25, marginBottom: '1.5rem', fontWeight: 300 }}>"</div>
            <blockquote className="serif" style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.4rem)', fontWeight: 300, fontStyle: 'italic',
              color: 'rgba(246,244,238,0.72)', lineHeight: 1.72,
              marginTop: 0, marginRight: 0, marginBottom: '3rem', marginLeft: 0,
            }}>
              {t.q}
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--gold-dim)' }}>
              <div style={{ width: 36, height: 36, border: '1px solid var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="serif" style={{ color: 'var(--gold)', fontSize: '0.95rem', fontWeight: 500 }}>{t.name[0]}</span>
              </div>
              <div>
                <div className="sans" style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--white)', letterSpacing: '0.04em' }}>{t.name}</div>
                <div className="serif" style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--grey)', marginTop: '0.1rem' }}>{t.role}, {t.co}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 820px) { section > .container > div { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
    </section>
  )
}
