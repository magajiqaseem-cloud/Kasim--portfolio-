import { useEffect, useState } from 'react'

const NODES = [
  { id: 'lead',   label: 'Lead In',    sub: 'CRM trigger' },
  { id: 'kyc',    label: 'KYC Check',  sub: 'AI verify' },
  { id: 'crm',    label: 'CRM Update', sub: 'Hubspot sync' },
  { id: 'follow', label: 'Follow-up',  sub: 'Email / SMS' },
]

export default function WorkflowDiagram() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setActive(a => (a + 1) % NODES.length), 1600)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>AUTOMATION PIPELINE</span>
        <span style={{ fontSize: '0.55rem', color: '#4adec1', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4adec1', animation: 'pulse 1.2s ease-in-out infinite', boxShadow: '0 0 5px #4adec1' }} />
          RUNNING
        </span>
      </div>

      {/* Pipeline nodes */}
      <div style={{ padding: '1.25rem 1rem', display: 'flex', alignItems: 'center', gap: '0', overflowX: 'auto' }}>
        {NODES.map((node, i) => {
          const isActive = active === i
          const isDone = i < active
          return (
            <div key={node.id} style={{ display: 'flex', alignItems: 'center', flex: i < NODES.length - 1 ? '1' : 'none' }}>
              {/* Node */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0,
                minWidth: 70,
              }}>
                <div style={{
                  width: 40, height: 40,
                  border: `1px solid ${isActive ? '#4adec1' : isDone ? 'var(--gold)' : 'var(--gold-dim)'}`,
                  background: isActive ? 'rgba(74,222,193,0.08)' : isDone ? 'rgba(212,175,55,0.07)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isActive ? '0 0 10px rgba(74,222,193,0.25)' : 'none',
                  transition: 'all 0.4s ease',
                  marginBottom: '0.4rem',
                }}>
                  {isDone ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="var(--gold)" strokeWidth="1.5"/>
                    </svg>
                  ) : isActive ? (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4adec1', animation: 'pulse 0.8s ease-in-out infinite' }} />
                  ) : (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-dim2)' }} />
                  )}
                </div>
                <div style={{ fontSize: '0.55rem', fontWeight: 500, color: isActive ? '#4adec1' : isDone ? 'var(--white)' : 'var(--grey)', textAlign: 'center', transition: 'color 0.3s', lineHeight: 1.3 }}>{node.label}</div>
                <div style={{ fontSize: '0.46rem', color: 'rgba(154,152,143,0.5)', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>{node.sub}</div>
              </div>

              {/* Connector */}
              {i < NODES.length - 1 && (
                <div style={{ flex: 1, height: 1, minWidth: 16, position: 'relative', margin: '-20px 2px 0' }}>
                  <div style={{ height: '100%', background: `linear-gradient(to right, ${isDone ? 'var(--gold)' : 'var(--gold-dim)'}, ${i + 1 <= active ? 'var(--gold)' : 'var(--gold-dim)'})`, transition: 'background 0.4s' }} />
                  {/* Arrow */}
                  <svg width="5" height="8" viewBox="0 0 5 8" style={{ position: 'absolute', right: -1, top: -3.5 }}>
                    <path d="M0 0l5 4-5 4" stroke={isDone || isActive ? 'var(--gold)' : 'var(--gold-dim)'} strokeWidth="1" fill="none"/>
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Status bar */}
      <div style={{ borderTop: '1px solid var(--gold-dim)', padding: '0.55rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.52rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>Step {active + 1}/{NODES.length}</span>
        <span style={{ fontSize: '0.52rem', color: '#4adec1', fontFamily: 'JetBrains Mono, monospace' }}>{NODES[active].label}</span>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>
    </div>
  )
}
