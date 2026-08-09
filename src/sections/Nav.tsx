import { useState, useEffect } from 'react'
import { useNav, type Page } from '../context/nav'
import logoImg from '../imports/769144591_122221184096317965_8028717873563769994_n-1.jpg'

const LINKS: { label: string; page?: Page; anchor?: string }[] = [
  { label: 'Home',      page: 'home' },
  { label: 'Services',  page: 'services' },
  { label: 'Portfolio', page: 'portfolio' },
  { label: 'Store',     page: 'store' },
  { label: 'About',     page: 'about' },
  { label: 'Contact',   page: 'contact' },
]

export default function Nav() {
  const { page, navigate } = useNav()
  const [pinned, setPinned] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setPinned(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handle = (link: typeof LINKS[0]) => {
    setOpen(false)
    if (link.page) navigate(link.page)
  }

  return (
    <header style={{
      position: 'fixed', inset: '0 0 auto 0', zIndex: 100,
      transition: 'background 0.35s, border-color 0.35s',
      background: pinned ? 'rgba(8,8,10,0.97)' : 'transparent',
      borderBottom: pinned ? '1px solid var(--gold-dim)' : '1px solid transparent',
      backdropFilter: pinned ? 'blur(12px)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

        {/* Logo */}
        <button onClick={() => navigate('home')} style={{ padding: 0, lineHeight: 0 }}>
          <img
            src={logoImg}
            alt="Kasim Elite Digital Global"
            style={{ height: 44, width: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </button>

        {/* Desktop nav */}
        <nav className="d-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
          {LINKS.map((l) => {
            const isActive = l.page === page
            return (
              <button
                key={l.label}
                onClick={() => handle(l)}
                className={`nav-link sans${isActive ? ' nav-link--active' : ''}`}
                style={{ fontSize: '0.62rem', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', position: 'relative', padding: 0 }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '' }}
              >
                {l.label}
                {isActive && (
                  <span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 1, background: 'var(--gold)' }} />
                )}
              </button>
            )
          })}
          <button onClick={() => navigate('services')} className="btn-primary" style={{ marginLeft: '0.5rem' }}>
            Hire Me
          </button>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="m-tog" aria-label="Menu"
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: '0.4rem' }}>
          {[1, 0.6, 1].map((w, i) => (
            <span key={i} style={{ display: 'block', width: `${w * 20}px`, height: 1, background: 'rgba(246,244,238,0.5)' }} />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: 'var(--black-2)', borderTop: '1px solid var(--gold-dim)', padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {LINKS.map((l) => (
            <button key={l.label} onClick={() => handle(l)} className="sans"
              style={{ textAlign: 'left', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: l.page === page ? 'var(--gold)' : 'rgba(246,244,238,0.45)' }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { setOpen(false); navigate('services') }} className="btn-primary" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            Hire Me
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) { .d-nav { display: none !important; } .m-tog { display: flex !important; } }
      `}</style>
    </header>
  )
}
