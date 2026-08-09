import { useEffect, useRef, useState } from 'react'

const TOOLS = ['Cut', 'Grade', 'Enhance', 'Export']
const RESOLUTIONS = ['4K', '1080p', '720p']

export default function VideoStudio() {
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [activeRes, setActiveRes] = useState(0)
  const [activeTool, setActiveTool] = useState(1)
  const [processPct, setProcessPct] = useState(72)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const tick = (now: number) => {
      if (playing) {
        if (!startRef.current) startRef.current = now - progress * 8000
        const elapsed = (now - startRef.current) / 8000
        const p = elapsed % 1
        setProgress(p)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [playing, progress])

  const toggle = () => {
    if (!playing) startRef.current = performance.now() - progress * 8000
    else startRef.current = null
    setPlaying(p => !p)
  }

  // Fake processing ticker
  useEffect(() => {
    const iv = setInterval(() => setProcessPct(p => p < 99 ? p + 1 : 72), 1800)
    return () => clearInterval(iv)
  }, [])

  const fmt = (p: number) => {
    const s = Math.round(p * 248)
    return `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`
  }

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>AI VIDEO STUDIO</span>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {RESOLUTIONS.map((r, i) => (
            <button key={r} onClick={() => setActiveRes(i)} style={{
              fontSize: '0.48rem', fontFamily: 'JetBrains Mono, monospace', padding: '0.15rem 0.4rem',
              border: `1px solid ${activeRes === i ? 'var(--gold)' : 'var(--gold-dim)'}`,
              background: activeRes === i ? 'rgba(212,175,55,0.12)' : 'transparent',
              color: activeRes === i ? 'var(--gold)' : 'var(--grey)',
              transition: 'all 0.2s',
            }}>{r}</button>
          ))}
        </div>
      </div>

      {/* Preview canvas */}
      <div style={{ position: 'relative', background: '#000', aspectRatio: '16/7', overflow: 'hidden' }}>
        {/* Fake video frame — gradient gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0a0c 0%, #1a1208 50%, #0a0a0c 100%)' }} />
        {/* Fake scene lines */}
        {[20, 38, 55, 70, 82].map(y => (
          <div key={y} style={{ position: 'absolute', left: 0, right: 0, top: `${y}%`, height: 1, background: 'rgba(212,175,55,0.04)' }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(212,175,55,0.35)', letterSpacing: '0.06em' }}>Kasim Empire</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.45rem', color: 'rgba(74,222,193,0.3)', letterSpacing: '0.2em', marginTop: 4 }}>AI-ENHANCED · {RESOLUTIONS[activeRes]}</div>
          </div>
        </div>
        {/* Play button */}
        <button onClick={toggle} style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'transparent',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s',
          }}>
            {playing ? (
              <svg width="10" height="12" viewBox="0 0 10 12"><rect x="0.5" y="0.5" width="3" height="11" fill="var(--gold)"/><rect x="6.5" y="0.5" width="3" height="11" fill="var(--gold)"/></svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12"><path d="M1 0.5l9 5.5-9 5.5z" fill="var(--gold)"/></svg>
            )}
          </div>
        </button>
        {/* Timecode overlay */}
        <div style={{ position: 'absolute', bottom: 8, right: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: 'rgba(246,244,238,0.5)', background: 'rgba(0,0,0,0.6)', padding: '0.1rem 0.35rem' }}>
          {fmt(progress)} / 04:08
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', cursor: 'pointer', position: 'relative' }}>
        <div style={{ width: `${progress * 100}%`, height: '100%', background: 'var(--gold)', transition: 'width 0.05s linear' }} />
        <div style={{ position: 'absolute', top: '50%', left: `${progress * 100}%`, transform: 'translate(-50%,-50%)', width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)' }} />
      </div>

      {/* Tool bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--gold-dim)' }}>
        {TOOLS.map((t, i) => (
          <button key={t} onClick={() => setActiveTool(i)} style={{
            flex: 1, padding: '0.5rem 0', fontSize: '0.52rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace',
            color: activeTool === i ? 'var(--gold)' : 'var(--grey)',
            borderBottom: activeTool === i ? '1px solid var(--gold)' : '1px solid transparent',
            background: activeTool === i ? 'rgba(212,175,55,0.05)' : 'transparent',
            transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>

      {/* Processing status */}
      <div style={{ padding: '0.65rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.52rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>AI Grade · Processing</span>
        <span style={{ fontSize: '0.65rem', color: '#4adec1', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>{processPct}%</span>
      </div>
    </div>
  )
}
