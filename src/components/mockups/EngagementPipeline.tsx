import { useEffect, useState } from 'react'

const STEPS = [
  { label: 'Brief Received',    sub: 'Form submitted' },
  { label: 'Reviewed',          sub: 'Within 24 h' },
  { label: 'Strategy Drafted',  sub: 'Tailored plan' },
  { label: 'Kickoff Call',      sub: 'Project starts' },
]

export default function EngagementPipeline() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setActive(a => (a + 1) % STEPS.length), 1800)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>ENGAGEMENT PIPELINE</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: '#4adec1', letterSpacing: '0.1em' }}>
          STEP {active + 1}/{STEPS.length}
        </span>
      </div>

      {/* Nodes */}
      <div style={{ padding: '1.25rem 1rem', display: 'flex', alignItems: 'center' }}>
        {STEPS.map((step, i) => {
          const isDone   = i < active
          const isActive = i === active
          return (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? '1' : 'none' }}>
              {/* Node */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, minWidth: 60 }}>
                <div style={{
                  width: 36, height: 36,
                  border: `1px solid ${isActive ? '#4adec1' : isDone ? 'var(--gold)' : 'var(--gold-dim)'}`,
                  background: isActive ? 'rgba(74,222,193,0.07)' : isDone ? 'rgba(212,175,55,0.07)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isActive ? '0 0 10px rgba(74,222,193,0.2)' : 'none',
                  transition: 'all 0.4s ease',
                  marginBottom: '0.4rem',
                  position: 'relative',
                }}>
                  {/* Expanding ring on active node — matches "Currently Available" pulse */}
                  {isActive && (
                    <div style={{
                      position: 'absolute', inset: -5,
                      border: '1px solid rgba(74,222,193,0.4)',
                      animation: 'ep-ring 1.8s ease-in-out infinite',
                      pointerEvents: 'none',
                    }} />
                  )}
                  <style>{`@keyframes ep-ring{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.35);opacity:0}}`}</style>
                  {isDone ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="var(--gold)" strokeWidth="1.5" />
                    </svg>
                  ) : isActive ? (
                    <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#4adec1' }} />
                    </div>
                  ) : (
                    <div style={{ width: 5, height: 5, background: 'var(--gold-dim2)', opacity: 0.5 }} />
                  )}
                </div>
                <div style={{ fontSize: '0.5rem', fontWeight: 500, color: isActive ? '#4adec1' : isDone ? 'var(--white)' : 'var(--grey)', textAlign: 'center', lineHeight: 1.3, transition: 'color 0.3s', maxWidth: 56 }}>
                  {step.label}
                </div>
                <div style={{ fontSize: '0.43rem', color: 'rgba(154,152,143,0.45)', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>
                  {step.sub}
                </div>
              </div>

              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 1, margin: '-22px 3px 0', position: 'relative' }}>
                  <div style={{ height: '100%', background: i < active ? 'var(--gold)' : 'var(--gold-dim)', transition: 'background 0.4s' }} />
                  <svg width="5" height="8" viewBox="0 0 5 8" style={{ position: 'absolute', right: -1, top: -3.5 }}>
                    <path d="M0 0l5 4-5 4" stroke={i < active ? 'var(--gold)' : 'var(--gold-dim)'} strokeWidth="1" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Status footer */}
      <div style={{ borderTop: '1px solid var(--gold-dim)', padding: '0.55rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: 'var(--grey)' }}>{STEPS[active].label}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#4adec1' }}>In progress →</span>
      </div>
    </div>
  )
}
