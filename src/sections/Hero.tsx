import { useEffect, useRef, useState } from 'react'
import { useNav } from '../context/nav'
import FinVaultDashboard from '../components/FinVaultDashboard'

const TRUST = [
  { n: '50k+', l: 'Users Served' },
  { n: '30+',  l: 'Global Clients' },
  { n: '98%',  l: 'Satisfaction' },
  { n: '6+',   l: 'Years' },
]

export default function Hero() {
  const { navigate } = useNav()
  const heroRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        minHeight: '100vh',
        background: 'var(--black)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '7rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gold vertical rail */}
      <div style={{
        position: 'absolute', left: '2.5rem', top: '25%',
        width: 1, height: '50%',
        background: 'linear-gradient(to bottom, transparent, var(--gold-dim2), transparent)',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}>

          {/* ── Left: copy ──────────────────────────────────────── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(10px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <p
              className="label"
              style={{
                marginBottom: '2rem',
                paddingLeft: '1.25rem',
                borderLeft: '1px solid var(--gold-dim2)',
                color: 'var(--gold)',
                opacity: 0.7,
              }}
            >
              Premium Fintech & Digital Agency · Est. 2019
            </p>

            <h1
              className="serif"
              style={{
                fontSize: 'clamp(3.8rem, 8vw, 7.5rem)',
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
                marginBottom: '2rem',
                color: 'var(--white)',
              }}
            >
              Kasim<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Empire.</em>
            </h1>

            <p
              className="serif"
              style={{
                fontSize: 'clamp(1rem, 1.7vw, 1.2rem)',
                fontStyle: 'italic',
                color: 'var(--grey)',
                lineHeight: 1.65,
                maxWidth: '40ch',
                marginBottom: '3rem',
              }}
            >
              Premium Fintech &amp; Digital Solutions — Worldwide.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
              <button onClick={() => navigate('services')} className="btn-primary">
                Start a Project
              </button>
              <button onClick={() => navigate('services')} className="btn-ghost">
                View Services
              </button>
            </div>

            {/* Trust strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0',
              borderTop: '1px solid var(--gold-dim)',
              paddingTop: '2rem',
            }}>
              {TRUST.map(({ n, l }, i) => (
                <div
                  key={l}
                  style={{
                    borderRight: i < 3 ? '1px solid var(--gold-dim)' : 'none',
                    paddingRight: '1.25rem',
                    paddingLeft: i > 0 ? '1.25rem' : 0,
                  }}
                >
                  <div
                    className="serif"
                    style={{ fontSize: '1.9rem', fontWeight: 400, color: 'var(--gold)', lineHeight: 1 }}
                  >
                    {n}
                  </div>
                  <div
                    className="label"
                    style={{ marginTop: '0.3rem', letterSpacing: '0.16em', fontSize: '0.55rem' }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: FinVault Dashboard mockup ────────────────── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}
          >
            <FinVaultDashboard />
          </div>
        </div>
      </div>

      <div className="rule" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

      <style>{`
        @media (max-width: 960px) {
          #home > .container > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  )
}
