import { useState } from 'react'
import { useNav } from '../context/nav'

const SERVICES = [
  { n: '01', title: 'Website Development',                   body: 'Enterprise-grade web platforms built for performance, security, and conversion. Every stack decision is deliberate.' },
  { n: '02', title: 'Fintech & Crypto Web Design',           body: 'Exchange platforms, DeFi protocols, banking dashboards and NFT marketplaces — interfaces that build institutional trust.' },
  { n: '03', title: 'Marketing Campaigns',                   body: 'Full-funnel performance campaigns for investor acquisition and AUM growth across paid, programmatic and social.' },
  { n: '04', title: 'AI Automation & Advanced Workflows',    body: 'Intelligent pipelines automating KYC, onboarding, compliance and reporting for fintech operations — 24/7.' },
  { n: '05', title: 'Motion Design',                         body: 'Brand animation, UI micro-interactions and explainer films that make complex financial products feel effortless.' },
  { n: '06', title: 'AI Video Creation & Photo Editing',     body: 'Cinematic brand content produced to 4K broadcast standard with AI-assisted post-production and colour grading.' },
  { n: '07', title: 'Expert Copywriting',                    body: 'Precision copy for regulated financial brands — pitch decks, whitepapers, web copy and compliance-ready content.' },
  { n: '08', title: 'Multilingual Translation Services',     body: 'Localised financial content across 30+ languages, preserving technical accuracy and regulatory compliance in every market.' },
  { n: '09', title: 'Financial Brand Identity Design',       body: 'Positioning, naming and visual identity for fintech startups, trading desks and wealth managers entering global markets.' },
]

export default function Services() {
  const { navigate } = useNav()
  const [hov, setHov] = useState<number | null>(null)

  return (
    <section
      id="services"
      className="section"
      style={{ borderTop: '1px solid var(--gold-dim)', background: 'var(--black)' }}
    >
      <div className="container">

        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'end',
          marginBottom: '4.5rem',
        }}>
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--gold)', opacity: 0.65 }}>Services</p>
            <h2
              className="serif"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', fontWeight: 300, lineHeight: 1.02, color: 'var(--white)' }}
            >
              What We{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Deliver</em>
            </h2>
          </div>
          <p
            className="serif"
            style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--grey)', lineHeight: 1.75 }}
          >
            Nine disciplines. One ecosystem. Built for financial brands
            that refuse to be ordinary.
          </p>
        </div>

        {/* List */}
        {SERVICES.map((s, i) => {
          const active = hov === i
          return (
            <div
              key={i}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              onClick={() => navigate('services')}
              style={{
                display: 'grid',
                gridTemplateColumns: '3.5rem 1fr auto',
                gap: '2rem',
                alignItems: 'center',
                padding: '1.75rem 0',
                paddingLeft: active ? '0.75rem' : '0',
                borderBottom: '1px solid var(--gold-dim)',
                cursor: 'pointer',
                transition: 'padding-left 0.22s ease',
              }}
            >
              <span
                className="mono"
                style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: active ? 'rgba(212,175,55,0.6)' : 'rgba(212,175,55,0.25)', transition: 'color 0.2s' }}
              >
                {s.n}
              </span>
              <div>
                <h3
                  className="serif"
                  style={{ fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', fontWeight: 400, color: active ? 'var(--white)' : 'rgba(246,244,238,0.78)', marginBottom: '0.3rem', transition: 'color 0.2s' }}
                >
                  {s.title}
                </h3>
                <p
                  className="sans"
                  style={{ fontSize: '0.82rem', color: 'var(--grey)', lineHeight: 1.55, maxWidth: '60ch', opacity: active ? 1 : 0.7, transition: 'opacity 0.2s' }}
                >
                  {s.body}
                </p>
              </div>
              <span style={{ fontSize: '0.9rem', color: active ? 'var(--gold)' : 'var(--gold-dim)', transition: 'color 0.2s, transform 0.2s', transform: active ? 'translateX(4px)' : 'none' }}>
                →
              </span>
            </div>
          )
        })}

        <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => navigate('services')} className="btn-ghost">
            Explore All Services
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          #services .container > div:first-child { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
