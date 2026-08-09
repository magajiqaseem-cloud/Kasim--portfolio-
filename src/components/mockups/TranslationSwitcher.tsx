import { useEffect, useState } from 'react'

const LANGS = [
  { code: 'EN', flag: '🇬🇧', name: 'English',    text: 'Premium Fintech & Digital Solutions — Worldwide.' },
  { code: 'FR', flag: '🇫🇷', name: 'Français',   text: 'Solutions fintech et numériques haut de gamme — À l\'échelle mondiale.' },
  { code: 'AR', flag: '🇦🇪', name: 'العربية',    text: 'حلول مالية ورقمية متميزة — على مستوى عالمي.', rtl: true },
  { code: 'ZH', flag: '🇨🇳', name: '中文',       text: '全球顶级金融科技与数字解决方案。' },
]

export default function TranslationSwitcher() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActive(a => (a + 1) % LANGS.length)
        setFading(false)
      }, 300)
    }, 2400)
    return () => clearInterval(iv)
  }, [])

  const lang = LANGS[active]

  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', fontSize: '0.72rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--black-3,#141417)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--gold-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em' }}>MULTILINGUAL OUTPUT</span>
        <span style={{ fontSize: '0.55rem', color: '#4adec1', letterSpacing: '0.12em', fontFamily: 'JetBrains Mono, monospace' }}>{LANGS.length} LANGUAGES</span>
      </div>

      {/* Language tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--gold-dim)' }}>
        {LANGS.map((l, i) => (
          <button key={l.code} onClick={() => { setFading(true); setTimeout(() => { setActive(i); setFading(false) }, 200) }}
            style={{
              flex: 1, padding: '0.6rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem',
              borderBottom: active === i ? '1px solid var(--gold)' : '1px solid transparent',
              background: active === i ? 'rgba(212,175,55,0.05)' : 'transparent',
              transition: 'all 0.2s',
            }}>
            <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>{l.flag}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.46rem', color: active === i ? 'var(--gold)' : 'var(--grey)', letterSpacing: '0.1em' }}>{l.code}</span>
          </button>
        ))}
      </div>

      {/* Translation output */}
      <div style={{ padding: '1.25rem 1rem', minHeight: 80, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>{lang.name}</div>
        <p style={{
          margin: 0,
          fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
          fontSize: '0.88rem', lineHeight: 1.6,
          color: 'rgba(246,244,238,0.8)',
          direction: (lang as { rtl?: boolean }).rtl ? 'rtl' : 'ltr',
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(4px)' : 'translateY(0)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}>
          {lang.text}
        </p>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--gold-dim)', padding: '0.55rem 1rem', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.5rem', color: 'var(--grey)', fontFamily: 'JetBrains Mono, monospace' }}>Native-speaker reviewed</span>
        <span style={{ fontSize: '0.5rem', color: 'var(--gold)', fontFamily: 'JetBrains Mono, monospace' }}>50+ languages available</span>
      </div>
    </div>
  )
}
