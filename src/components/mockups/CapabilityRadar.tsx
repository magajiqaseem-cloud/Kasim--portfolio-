import { useEffect, useRef, useState } from 'react'

const AXES = [
  { label: 'Fintech UI/UX',  pct: 97, angle: -90 },
  { label: 'Crypto & Web3',  pct: 94, angle: -30 },
  { label: 'Brand Identity', pct: 95, angle:  30 },
  { label: 'AI Automation',  pct: 91, angle:  90 },
  { label: 'Fintech SEO',    pct: 88, angle: 150 },
  { label: 'Fin. Marketing', pct: 87, angle: 210 },
]

const CX = 150, CY = 148, MAX_R = 88, LABEL_R = 110
const toRad = (deg: number) => (deg * Math.PI) / 180

const ringPoints = (pct: number) =>
  AXES.map(a => {
    const r = (pct / 100) * MAX_R
    return `${CX + r * Math.cos(toRad(a.angle))},${CY + r * Math.sin(toRad(a.angle))}`
  }).join(' ')

function textAnchor(angle: number): 'start' | 'middle' | 'end' {
  if (angle > -60 && angle < 60)  return 'start'
  if (angle > 120 || angle < -120) return 'end'
  return 'middle'
}

function labelDy(angle: number) {
  if (angle === -90) return -6
  if (angle === 90)  return 14
  return 4
}

export default function CapabilityRadar() {
  const [progress, setProgress] = useState(0)
  const [pulse, setPulse] = useState(0)
  const rafRef  = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  // Draw-in animation — respects prefers-reduced-motion
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setProgress(1); return }
    const tid = setTimeout(() => {
      const dur = 1300
      const tick = (now: number) => {
        if (!startRef.current) startRef.current = now
        const t = Math.min((now - startRef.current) / dur, 1)
        setProgress(1 - Math.pow(1 - t, 3)) // ease-out cubic
        if (t < 1) rafRef.current = requestAnimationFrame(tick)
        else setProgress(1)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, 350)
    return () => { clearTimeout(tid); if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  // Rotate active pulse across axes
  useEffect(() => {
    const iv = setInterval(() => setPulse(p => (p + 1) % AXES.length), 2000)
    return () => clearInterval(iv)
  }, [])

  const polyPts = AXES.map(a => {
    const r = progress * (a.pct / 100) * MAX_R
    return `${CX + r * Math.cos(toRad(a.angle))},${CY + r * Math.sin(toRad(a.angle))}`
  }).join(' ')

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>

      {/* Header bar */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>CAPABILITY RADAR</span>
        <span style={{ fontSize: '0.55rem', color: '#4adec1', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'JetBrains Mono, monospace' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4adec1', boxShadow: '0 0 5px #4adec1' }} />
          LIVE
        </span>
      </div>

      {/* SVG radar */}
      <svg
        viewBox="0 0 300 292"
        width="100%"
        style={{ display: 'block', padding: '0.5rem 0' }}
        aria-label="Capability radar chart"
      >
        {/* Grid rings at 25 / 50 / 75 / 100% */}
        {[25, 50, 75, 100].map(pct => (
          <polygon
            key={pct}
            points={ringPoints(pct)}
            fill="none"
            stroke={pct === 100 ? 'rgba(212,175,55,0.22)' : 'rgba(212,175,55,0.10)'}
            strokeWidth="0.5"
          />
        ))}

        {/* Axis spokes */}
        {AXES.map(a => {
          const x2 = CX + MAX_R * Math.cos(toRad(a.angle))
          const y2 = CY + MAX_R * Math.sin(toRad(a.angle))
          return (
            <line key={a.label} x1={CX} y1={CY} x2={x2} y2={y2}
              stroke="rgba(212,175,55,0.14)" strokeWidth="0.5" />
          )
        })}

        {/* Ring pct hints */}
        {[50, 100].map(pct => (
          <text key={pct}
            x={CX + 2}
            y={CY - (pct / 100) * MAX_R - 3}
            fill="rgba(154,152,143,0.3)"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 7 }}>
            {pct}%
          </text>
        ))}

        {/* Filled data polygon */}
        <polygon
          points={polyPts}
          fill="rgba(212,175,55,0.07)"
          stroke="rgba(212,175,55,0.55)"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Data points + pulse rings */}
        {AXES.map((a, i) => {
          const r = progress * (a.pct / 100) * MAX_R
          const px = CX + r * Math.cos(toRad(a.angle))
          const py = CY + r * Math.sin(toRad(a.angle))
          const isActive = pulse === i
          return (
            <g key={a.label}>
              {/* Pulse ring — only on active axis */}
              {isActive && (
                <circle cx={px} cy={py} r="5" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="1">
                  <animate attributeName="r"       values="4;10;4"   dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Dot */}
              <circle cx={px} cy={py}
                r={isActive ? 4 : 2.5}
                fill={isActive ? 'var(--gold)' : 'rgba(212,175,55,0.55)'}
              />
              {/* Value label on active axis */}
              {isActive && (
                <text
                  x={px + (textAnchor(a.angle) === 'end' ? -10 : 8)}
                  y={py + 3}
                  fill="var(--gold)"
                  textAnchor={textAnchor(a.angle) === 'end' ? 'end' : 'start'}
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, fontWeight: 500 }}>
                  {a.pct}%
                </text>
              )}
            </g>
          )
        })}

        {/* Axis labels */}
        {AXES.map((a, i) => {
          const lx = CX + LABEL_R * Math.cos(toRad(a.angle))
          const ly = CY + LABEL_R * Math.sin(toRad(a.angle))
          const isActive = pulse === i
          return (
            <text key={`lbl-${a.label}`}
              x={lx}
              y={ly + labelDy(a.angle)}
              textAnchor={textAnchor(a.angle)}
              fill={isActive ? 'rgba(212,175,55,0.9)' : 'rgba(154,152,143,0.55)'}
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.04em', transition: 'fill 0.4s' }}>
              {a.label}
            </text>
          )
        })}
      </svg>

      {/* Legend strip */}
      <div style={{ borderTop: '1px solid var(--gold-dim)', padding: '0.65rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem 0.75rem' }}>
        {AXES.map((a, i) => (
          <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{ width: 4, height: 4, flexShrink: 0, background: pulse === i ? 'var(--gold)' : 'rgba(212,175,55,0.4)', transition: 'background 0.3s' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.46rem', color: pulse === i ? 'rgba(246,244,238,0.65)' : 'var(--grey)', whiteSpace: 'nowrap', transition: 'color 0.3s' }}>
              {a.label} — {a.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
