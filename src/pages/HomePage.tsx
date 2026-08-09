import { useEffect, useRef, useState } from 'react'
import { useNav } from '../context/nav'
import FinVaultDashboard from '../components/FinVaultDashboard'
import WorkflowDiagram from '../components/mockups/WorkflowDiagram'
import founderPhoto from '../imports/742031587_122218115738317965_5002444421583270969_n__1_-1.jpg'

// ── Data ─────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  '6+ Years Active',
  '40+ Projects Delivered',
  '12 Countries Served',
  '98% Client Retention',
  'Response Within 24 Hours',
]

const SERVICES = [
  { n: '01', title: 'Website Development' },
  { n: '02', title: 'Fintech & Crypto Web Design' },
  { n: '03', title: 'Marketing Campaigns' },
  { n: '04', title: 'AI Automation & Advanced Workflows' },
  { n: '05', title: 'Motion Design' },
  { n: '06', title: 'AI Video Creation & Photo Editing' },
  { n: '07', title: 'Expert Copywriting' },
  { n: '08', title: 'Multilingual Translation Services' },
  { n: '09', title: 'Financial Brand Identity Design' },
]

const FEATURED_WORK = [
  {
    tag: 'FINTECH & CRYPTO',
    title: 'DeFi Protocol Dashboard',
    stat: '+139%',
    statLabel: 'Onboarding completion',
    outcome: 'Onboarding completion rose from 31% to 74% within 45 days of launch.',
  },
  {
    tag: 'AI AUTOMATION',
    title: 'Institutional KYC Pipeline',
    stat: '12 min → 90s',
    statLabel: 'Onboarding time',
    outcome: 'Cut average onboarding time from 12 minutes to under 90 seconds across 4 jurisdictions.',
  },
  {
    tag: 'WEBSITE DEVELOPMENT',
    title: 'Fintech Exchange Platform',
    stat: '+34%',
    statLabel: 'Conversion rate',
    outcome: 'Page load reduced from 4.2s to 0.8s; conversion rate up 34% in the first 30 days.',
  },
]

const PROCESS = [
  { n: '01', title: 'Brief & Strategy',   body: 'Share your goals. We return a tailored strategy document within 24 hours — no generic templates.' },
  { n: '02', title: 'Design & Build',     body: 'Full execution across design, engineering and content — delivered at an institutional standard.' },
  { n: '03', title: 'Review & Refine',    body: 'Structured revision rounds with direct access to the person who built it. No relay chain.' },
  { n: '04', title: 'Launch & Scale',     body: 'Deployment, handover documentation and ongoing support. The engagement doesn\'t end at go-live.' },
]

const VALUES = [
  { title: 'Precision, Not Volume',  body: 'One brief, one strategy, one exact outcome. Every deliverable is refined until it meets the standard — not an acceptable approximation of it.' },
  { title: 'Global by Default',      body: 'Every solution is built to operate at institutional level across any market, from Lagos to London to Singapore.' },
  { title: 'Direct Communication',   body: 'No account managers, no relay chain. You work directly with the person who builds it — from the first brief through to final delivery.' },
  { title: 'Results Over Noise',     body: 'Aesthetics serve performance. Every design decision is tested against the only metric that matters: does it measurably move the business forward.' },
]

const BUNDLE_ITEMS = [
  'Premium 6-Page Fintech Website Template',
  'Elite Fintech Brand Identity Kit',
  'Fintech SEO Domination Guide',
  'AI Automation Starter Kit',
  'Social Media Growth Playbook',
  'Facebook Ads Profit Blueprint',
  'Priority WhatsApp Support (60 days)',
]

// ── Trust bar ────────────────────────────────────────────────────────
function TrustBar() {
  return (
    <div style={{ background: 'var(--black-3,#141417)', borderBottom: '1px solid var(--gold-dim)', overflowX: 'auto' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 2.5rem', display: 'flex', alignItems: 'center' }}>
        {TRUST_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <span className="sans" style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(154,152,143,0.65)', padding: '0.85rem 1.25rem', whiteSpace: 'nowrap' }}>
              {item}
            </span>
            {i < TRUST_ITEMS.length - 1 && <span style={{ color: 'var(--gold-dim2)', fontSize: '0.55rem', flexShrink: 0 }}>·</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Service row ──────────────────────────────────────────────────────
function ServiceRow({ s, navigate }: { s: typeof SERVICES[0]; navigate: (p: 'services') => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => navigate('services')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', textAlign: 'left', display: 'grid',
        gridTemplateColumns: '2.5rem 1fr auto', alignItems: 'center', gap: '1rem',
        padding: '1rem 0',
        borderBottom: '1px solid var(--gold-dim)',
        background: hovered ? 'rgba(212,175,55,0.03)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(212,175,55,0.4)', letterSpacing: '0.08em' }}>{s.n}</span>
      <span className="serif" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', fontWeight: 300, color: hovered ? 'var(--white)' : 'rgba(246,244,238,0.72)', transition: 'color 0.2s' }}>{s.title}</span>
      <span style={{ color: hovered ? 'var(--gold)' : 'rgba(212,175,55,0.3)', fontSize: '0.75rem', transition: 'color 0.2s' }}>→</span>
    </button>
  )
}

// ── Featured work card ───────────────────────────────────────────────
function WorkCard({ w, navigate }: { w: typeof FEATURED_WORK[0]; navigate: (p: 'portfolio') => void }) {
  return (
    <div
      onClick={() => navigate('portfolio')}
      style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', cursor: 'pointer', transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.4)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold-dim)'}
    >
      {/* Stat banner */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--gold-dim)', textAlign: 'center', background: 'rgba(212,175,55,0.03)' }}>
        <div className="serif" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '0.3rem' }}>
          {w.stat}
        </div>
        <div className="sans" style={{ fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--grey)', opacity: 0.65 }}>
          {w.statLabel}
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <span className="label" style={{ color: 'var(--gold)', opacity: 0.6, display: 'block', marginBottom: '0.6rem' }}>{w.tag}</span>
        <h3 className="serif" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', fontWeight: 300, color: 'var(--white)', marginBottom: '0.75rem', lineHeight: 1.2 }}>{w.title}</h3>
        <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(246,244,238,0.6)', lineHeight: 1.6, margin: 0, marginBottom: '1.25rem' }}>{w.outcome}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderTop: '1px solid var(--gold-dim)', paddingTop: '1rem' }}>
          <span className="sans" style={{ fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.7 }}>View Case Study</span>
          <span style={{ color: 'var(--gold)', opacity: 0.5, fontSize: '0.68rem' }}>→</span>
        </div>
      </div>
    </div>
  )
}

// ── Testimonials marquee ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "The dashboard redesign completely changed how our investors perceive us. The quality of the UI was unlike anything we'd seen at this price point.",
    tag: 'Fintech & Crypto Web Design',
  },
  {
    quote: "Our KYC pipeline went from embarrassingly slow to a genuine competitive advantage. Every edge case was handled with zero hand-holding required.",
    tag: 'AI Automation & Advanced Workflows',
  },
  {
    quote: "Three agencies promised us results. Kasim actually delivered them — on time, within scope, and to a standard that made our previous site look amateur.",
    tag: 'Website Development',
  },
  {
    quote: "The brand identity work repositioned us from a startup to an institution overnight. Our enterprise outreach conversion rate doubled within two months.",
    tag: 'Financial Brand Identity Design',
  },
  {
    quote: "Copy that finally sounds like a serious financial firm, not a growth-hacker. Our trial signups went up 41% in the first 30 days after launch.",
    tag: 'Expert Copywriting',
  },
]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="var(--gold)" style={{ opacity: 0.85 }}>
          <path d="M6 1l1.3 3.9H11L8.2 7l1 3.9L6 8.8l-3.2 2.1 1-3.9L1 4.9h3.7z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialsMarquee() {
  const [paused, setPaused] = useState(false)
  // Duplicate cards so the loop seams invisibly
  const cards = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)', overflow: 'hidden' }}>
      {/* Header */}
      <div className="container" style={{ marginBottom: '3rem' }}>
        <p className="label" style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.65 }}>Client Testimonials</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1, color: 'var(--white)', margin: 0 }}>
            What Clients{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Say.</em>
          </h2>
          <span className="sans" style={{ fontSize: '0.54rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(154,152,143,0.32)' }}>
            Placeholder testimonials — real quotes coming soon
          </span>
        </div>
      </div>

      {/* Marquee track */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ position: 'relative', cursor: 'default' }}
      >
        {/* Fade masks */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8rem', background: 'linear-gradient(to right, var(--black), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8rem', background: 'linear-gradient(to left, var(--black), transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div
          className="tm-track"
          style={{
            display: 'flex',
            gap: '1px',
            width: 'max-content',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {cards.map((t, i) => (
            <div
              key={i}
              style={{
                width: 340,
                flexShrink: 0,
                background: i % 2 === 0 ? 'var(--black-2)' : 'var(--black)',
                border: '1px solid var(--gold-dim)',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stars />
              {/* Opening quote mark */}
              <div className="serif" style={{ fontSize: '2.8rem', lineHeight: 0.5, color: 'var(--gold)', opacity: 0.14, fontWeight: 300, marginBottom: '1rem' }}>"</div>
              <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(246,244,238,0.72)', lineHeight: 1.65, margin: 0, flex: 1 }}>
                {t.quote}
              </p>
              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--gold-dim)' }}>
                <div className="sans" style={{ fontSize: '0.47rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.4)', marginBottom: '0.25rem' }}>
                  Client Testimonial
                </div>
                <div className="serif" style={{ fontStyle: 'italic', fontSize: '0.72rem', color: 'rgba(154,152,143,0.45)' }}>
                  {t.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

// ── Main component ───────────────────────────────────────────────────
export default function HomePage() {
  const { navigate } = useNav()
  const [visible, setVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <main style={{ background: 'var(--black)' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '7rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--gold-dim)' }}>
        <div style={{ position: 'absolute', left: '2.5rem', top: '25%', width: 1, height: '50%', background: 'linear-gradient(to bottom, transparent, var(--gold-dim2), transparent)' }} />
        <div className="container">
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* Left: copy */}
            <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(10px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
              <p className="label" style={{ marginBottom: '2rem', paddingLeft: '1.25rem', borderLeft: '1px solid var(--gold-dim2)', color: 'var(--gold)', opacity: 0.7 }}>
                Premium Fintech & Digital Agency · Est. 2019
              </p>
              <h1 className="serif" style={{ fontSize: 'clamp(3.8rem, 8vw, 7.5rem)', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: '2rem', color: 'var(--white)' }}>
                Kasim<br />
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Empire.</em>
              </h1>
              <p className="serif" style={{ fontSize: 'clamp(1rem, 1.7vw, 1.2rem)', fontStyle: 'italic', color: 'rgba(246,244,238,0.65)', lineHeight: 1.65, maxWidth: '40ch', marginBottom: '3rem' }}>
                Nine elite service verticals — fintech dashboards to AI automation — delivering institutional-grade digital work for financial brands operating globally.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
                <button onClick={() => navigate('services')} className="btn-primary">Start a Project</button>
                <button onClick={() => navigate('services')} className="btn-ghost">View Services</button>
              </div>
              {/* Stat strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--gold-dim)', paddingTop: '2rem' }}>
                {[
                  { n: '40+', l: 'Projects' },
                  { n: '12',  l: 'Countries' },
                  { n: '98%', l: 'Retention' },
                  { n: '6+',  l: 'Years' },
                ].map(({ n, l }, i) => (
                  <div key={l} style={{ borderRight: i < 3 ? '1px solid var(--gold-dim)' : 'none', paddingRight: '1.25rem', paddingLeft: i > 0 ? '1.25rem' : 0 }}>
                    <div className="serif" style={{ fontSize: '1.9rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{n}</div>
                    <div className="label" style={{ marginTop: '0.3rem', letterSpacing: '0.16em', fontSize: '0.55rem' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: FinVault Dashboard */}
            <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s' }}>
              <FinVaultDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────── */}
      <TrustBar />

      {/* ── Services preview ─────────────────────────────────── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)' }}>
        <div className="container">
          <div className="svc-preview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>

            {/* Left: list */}
            <div>
              <p className="label" style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.65 }}>What We Deliver</p>
              <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1, marginBottom: '2.5rem', color: 'var(--white)' }}>
                Nine Verticals.{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>One Ecosystem.</em>
              </h2>
              <div style={{ borderTop: '1px solid var(--gold-dim)' }}>
                {SERVICES.map(s => <ServiceRow key={s.n} s={s} navigate={navigate} />)}
              </div>
              <div style={{ marginTop: '2rem' }}>
                <button onClick={() => navigate('services')} className="btn-primary">Explore All Services →</button>
              </div>
            </div>

            {/* Right: live automation pipeline mockup */}
            <div style={{ position: 'sticky', top: '6rem' }}>
              <p className="label" style={{ marginBottom: '0.85rem', color: 'var(--grey)', opacity: 0.55 }}>Live Capability Demo</p>
              <WorkflowDiagram />
              <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(154,152,143,0.5)', lineHeight: 1.6, marginTop: '1.25rem' }}>
                A real-time preview of the AI Automation pipeline — one of nine verticals delivered to financial clients globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured work ─────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)', background: 'var(--black-2)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p className="label" style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.65 }}>Selected Work</p>
              <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1, color: 'var(--white)', margin: 0 }}>
                Proof,{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Not Promises.</em>
              </h2>
            </div>
            <button onClick={() => navigate('portfolio')} className="btn-ghost" style={{ flexShrink: 0 }}>
              View Full Portfolio →
            </button>
          </div>
          <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--gold-dim)', border: '1px solid var(--gold-dim)' }}>
            {FEATURED_WORK.map(w => (
              <div key={w.title} style={{ background: 'var(--black)' }}>
                <WorkCard w={w} navigate={navigate} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', maxWidth: '36ch' }}>
            <p className="label" style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.65 }}>How It Works</p>
            <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1, color: 'var(--white)' }}>
              From Brief To{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Launch.</em>
            </h2>
          </div>
          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--gold-dim)', border: '1px solid var(--gold-dim)' }}>
            {PROCESS.map((p, i) => (
              <div key={p.n} style={{ background: i % 2 === 0 ? 'var(--black)' : 'var(--black-2)', padding: '2rem 1.75rem' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'rgba(212,175,55,0.35)', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>{p.n}</div>
                <h3 className="serif" style={{ fontSize: '1.1rem', fontWeight: 300, color: 'var(--white)', marginBottom: '0.75rem', lineHeight: 1.2 }}>{p.title}</h3>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(246,244,238,0.62)', lineHeight: 1.65, margin: 0 }}>{p.body}</p>
                <div style={{ marginTop: '1.5rem', height: 1, width: '2rem', background: 'var(--gold-dim2)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)', background: 'var(--black-2)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p className="label" style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.65 }}>How We Work</p>
              <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1, color: 'var(--white)', margin: 0 }}>
                Non-Negotiable{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Standards.</em>
              </h2>
            </div>
            <button onClick={() => navigate('about')} className="btn-ghost" style={{ flexShrink: 0 }}>Meet Kasim →</button>
          </div>
          <div className="values-home-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--gold-dim)', border: '1px solid var(--gold-dim)' }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ background: 'var(--black)', padding: '2rem 1.75rem' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'rgba(212,175,55,0.35)', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>0{i + 1}</div>
                <h3 className="serif" style={{ fontSize: '1.1rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '0.85rem' }}>{v.title}</h3>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(246,244,238,0.62)', lineHeight: 1.65, margin: 0 }}>{v.body}</p>
                <div style={{ marginTop: '1.5rem', height: 1, width: '2rem', background: 'var(--gold-dim2)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials marquee ──────────────────────────────── */}
      <TestimonialsMarquee />

      {/* ── About preview ────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)', background: 'var(--black-2)' }}>
        <div className="container">
          <div className="about-preview-grid" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '6rem', alignItems: 'center' }}>

            {/* Portrait */}
            <div style={{ position: 'relative', maxWidth: 420 }}>
              <div style={{ aspectRatio: '4/5', border: '1px solid var(--gold-dim)', background: 'var(--black)', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={founderPhoto}
                  alt="Kasim M. — Founder, Kasim Elite Digital Global"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--gold-dim)', pointerEvents: 'none' }} />
              </div>
              {/* Badge */}
              <div style={{ position: 'absolute', bottom: -1, left: -1, border: '1px solid var(--gold-dim2)', background: 'var(--black-2)', padding: '0.85rem 1.1rem' }}>
                <span className="serif" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, letterSpacing: '-0.02em', display: 'block' }}>6+</span>
                <span className="sans" style={{ fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--grey)', opacity: 0.6 }}>Years of Excellence</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--gold)', opacity: 0.65 }}>The Founder</p>
              <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, lineHeight: 1.08, marginBottom: '1.5rem', color: 'var(--white)' }}>
                Built To{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Dominate</em>{' '}
                The Fintech Space
              </h2>
              <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(246,244,238,0.7)', lineHeight: 1.72, marginBottom: '1.25rem' }}>
                Kasim M. — a premium fintech web developer, UI/UX designer, AI automation engineer and digital strategist helping financial technology companies, crypto platforms and global enterprises dominate their markets online.
              </p>
              <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(246,244,238,0.7)', lineHeight: 1.72, marginBottom: '2rem' }}>
                Based in Nigeria — trusted by clients across the globe. Six years of deliberate work, refusing every shortcut, built on delivered results rather than agency promises.
              </p>
              <button onClick={() => navigate('about')} className="btn-ghost">Meet Kasim →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Store / Bundle preview ────────────────────────────── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <p className="label" style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.65 }}>Digital Products</p>
            <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1, color: 'var(--white)' }}>
              Own The Toolkit That{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Built The Results.</em>
            </h2>
          </div>

          <div style={{ border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.03)', position: 'relative' }}>
            {/* Save badge */}
            <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--gold)', color: '#08080a', padding: '0.45rem 1.25rem', fontSize: '0.58rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Save $356
            </div>
            <div className="bundle-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0 }}>
              {/* Left */}
              <div style={{ padding: '3rem', borderRight: '1px solid var(--gold-dim)' }}>
                <p className="label" style={{ marginBottom: '0.75rem', color: 'var(--gold)', opacity: 0.6 }}>Complete Bundle — All 6 Products</p>
                <h3 className="serif" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--white)', marginBottom: '1rem' }}>
                  Complete Fintech{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Digital Business</em>{' '}
                  Bundle
                </h3>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(246,244,238,0.65)', lineHeight: 1.65, marginBottom: '2rem', maxWidth: '42ch' }}>
                  Everything to build, brand, market and grow a professional fintech business online — all 6 best-selling products at a massive saving.
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
                  <span className="serif" style={{ fontSize: '2.8rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>$99</span>
                  <div>
                    <span className="sans" style={{ fontSize: '0.7rem', color: 'var(--grey)', textDecoration: 'line-through', display: 'block', opacity: 0.55 }}>$455</span>
                    <span className="sans" style={{ fontSize: '0.55rem', color: '#4adec1', letterSpacing: '0.1em' }}>78% OFF</span>
                  </div>
                </div>
                <button onClick={() => navigate('store')} className="btn-primary">Get The Complete Bundle →</button>
              </div>
              {/* Right: checklist */}
              <div style={{ padding: '3rem' }}>
                <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--grey)', opacity: 0.55 }}>What's Included</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {BUNDLE_ITEMS.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: i < BUNDLE_ITEMS.length - 1 ? '0.85rem' : 0, borderBottom: i < BUNDLE_ITEMS.length - 1 ? '1px solid var(--gold-dim)' : 'none' }}>
                      <div style={{ width: 18, height: 18, flexShrink: 0, border: '1px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="9" height="9" viewBox="0 0 9 9"><path d="M1.5 4.5l2 2 4-4" stroke="var(--gold)" strokeWidth="1.2" fill="none"/></svg>
                      </div>
                      <span className="sans" style={{ fontSize: '0.78rem', color: 'rgba(246,244,238,0.65)', lineHeight: 1.3 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="section-lg" style={{ textAlign: 'center', background: 'var(--black-2)', borderTop: '1px solid var(--gold-dim)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <p className="label" style={{ marginBottom: '2rem', color: 'var(--gold)', opacity: 0.6 }}>Get Started</p>
          <h2 className="serif" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 0.95, marginBottom: '2rem', color: 'var(--white)' }}>
            Ready To Scale{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Globally?</em>
          </h2>
          <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'rgba(246,244,238,0.65)', lineHeight: 1.65, marginBottom: '3rem' }}>
            Every engagement begins with a no-obligation conversation. Tell us where you want to go.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <button onClick={() => navigate('contact')} className="btn-primary">Start a Project</button>
            <a href="https://wa.me/2347080083489" target="_blank" rel="noopener noreferrer"
              className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a href="https://www.upwork.com/freelancers/~01edb4f1d95b1a9790" target="_blank" rel="noopener noreferrer"
              className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.001-2.439-5.439-5.439-5.439z"/>
              </svg>
              Hire on Upwork
            </a>
          </div>
          <p className="label" style={{ fontSize: '0.54rem', opacity: 0.45 }}>No obligation · NDA on request · Response within 24 h</p>
        </div>
      </section>

      <style>{`
        @keyframes tm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .tm-track { animation: tm-scroll 36s linear infinite; }
        @media (max-width: 960px)  { .hero-grid           { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        @media (max-width: 900px)  { .svc-preview-grid   { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        @media (max-width: 860px)  { .work-grid           { grid-template-columns: 1fr !important; } }
        @media (max-width: 860px)  { .process-grid        { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px)  { .process-grid        { grid-template-columns: 1fr !important; } }
        @media (max-width: 860px)  { .values-home-grid   { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px)  { .values-home-grid   { grid-template-columns: 1fr !important; } }
        @media (max-width: 860px)  { .test-grid           { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px)  { .about-preview-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        @media (max-width: 780px)  { .bundle-grid         { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
