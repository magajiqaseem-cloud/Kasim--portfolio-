import { useEffect, useRef, useState } from 'react'

const KEYFRAMES = [0.08, 0.22, 0.41, 0.58, 0.76, 0.91]
const TRACKS = ['BG Music', 'Motion', 'Text FX']
const TRACK_COLORS = ['rgba(212,175,55,0.35)', 'rgba(74,222,193,0.25)', 'rgba(224,92,92,0.2)']
const TRACK_LENGTHS = [
  [[0, 0.55], [0.6, 1]],
  [[0.05, 0.38], [0.44, 0.72], [0.78, 1]],
  [[0.12, 0.35], [0.55, 0.88]],
]

export default function TimelineScrubber() {
  const [playhead, setPlayhead] = useState(0)
  const [playing, setPlaying] = useState(true)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(performance.now())

  useEffect(() => {
    const tick = (now: number) => {
      if (playing) {
        const elapsed = (now - startRef.current) / 5000
        setPlayhead(elapsed % 1)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [playing])

  const togglePlay = () => {
    if (!playing) startRef.current = performance.now() - playhead * 5000
    setPlaying(p => !p)
  }

  const totalSecs = 120
  const currentSec = Math.round(playhead * totalSecs)
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>MOTION TIMELINE</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--gold)' }}>{fmt(currentSec)}</span>
          <button onClick={togglePlay} style={{ background: 'none', padding: 0, display: 'flex', alignItems: 'center' }}>
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 12 12"><rect x="1.5" y="1.5" width="3" height="9" fill="var(--grey)"/><rect x="7.5" y="1.5" width="3" height="9" fill="var(--grey)"/></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 1.5l9 4.5-9 4.5z" fill="var(--gold)"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Timecode ruler */}
      <div style={{ position: 'relative', height: 20, background: 'var(--black-3,#141417)', borderBottom: '1px solid var(--gold-dim)' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', paddingBottom: 3 }}>
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} style={{ flex: 1, borderLeft: i > 0 ? '1px solid rgba(154,152,143,0.15)' : 'none', paddingLeft: 2 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.42rem', color: 'rgba(154,152,143,0.4)' }}>{fmt(Math.round(i * totalSecs / 10))}</span>
            </div>
          ))}
        </div>
        {/* Playhead on ruler */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${playhead * 100}%`, width: 1, background: 'var(--gold)', transition: 'left 0.05s linear', zIndex: 2 }} />
      </div>

      {/* Tracks */}
      <div style={{ padding: '0.5rem 0', paddingLeft: '0.5rem' }}>
        {TRACKS.map((track, ti) => (
          <div key={track} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.5rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>{track}</span>
            <div style={{ position: 'relative', height: 14, background: 'rgba(255,255,255,0.02)', marginRight: '0.5rem' }}>
              {/* Clips */}
              {TRACK_LENGTHS[ti].map(([s, e], ci) => (
                <div key={ci} style={{
                  position: 'absolute', left: `${s * 100}%`, width: `${(e - s) * 100}%`,
                  top: 1, bottom: 1,
                  background: TRACK_COLORS[ti],
                  border: `1px solid ${TRACK_COLORS[ti].replace('0.', '0.6').replace('0.2', '0.5')}`,
                }} />
              ))}
              {/* Keyframe diamonds */}
              {KEYFRAMES.filter(k => k >= (TRACK_LENGTHS[ti][0][0]) && k <= (TRACK_LENGTHS[ti][TRACK_LENGTHS[ti].length-1][1])).map((k, ki) => (
                <div key={ki} style={{
                  position: 'absolute', left: `${k * 100}%`, top: '50%',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  width: 5, height: 5,
                  background: 'var(--gold)',
                  zIndex: 1,
                }} />
              ))}
              {/* Playhead line */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${playhead * 100}%`, width: 1, background: 'rgba(212,175,55,0.8)', zIndex: 2, transition: 'left 0.05s linear' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--gold-dim)', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.52rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>24fps · 1080p</span>
        <span style={{ fontSize: '0.52rem', color: 'var(--gold)', fontFamily: 'JetBrains Mono, monospace' }}>{KEYFRAMES.length} keyframes</span>
      </div>
    </div>
  )
}
