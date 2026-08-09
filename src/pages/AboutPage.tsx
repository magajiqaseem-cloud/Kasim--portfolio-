import { useEffect, useState } from 'react'
import { useNav } from '../context/nav'
import CapabilityRadar from '../components/mockups/CapabilityRadar'
import founderPhoto from '../imports/769082914_122221184048317965_8293335009896917379_n-1.jpg'

// ── Icon set ────────────────────────────────────────────────────────
function IconWhatsApp() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="1"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  )
}
function IconUpwork() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.001-2.439-5.439-5.439-5.439z" />
    </svg>
  )
}
function IconFacebook() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}
function IconLinkedIn() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ── Skill proficiency bar ───────────────────────────────────────────
function SkillBar({ pct, label, delay = 0 }: { pct: number; label: string; delay?: number }) {
  const [filled, setFilled] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 400 + delay)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
        <span className="sans" style={{ fontSize: '0.48rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--grey)', opacity: 0.7 }}>{label}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--gold)' }}>{pct}%</span>
      </div>
      {/* Track */}
      <div style={{ height: 1, background: 'var(--gold-dim)', position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: filled ? `${pct}%` : '0%',
          background: 'var(--gold)',
          transition: `width 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay * 0.001}s`,
        }} />
        {/* End cap dot */}
        <div style={{
          position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)',
          left: filled ? `${pct}%` : '0%',
          width: 5, height: 5,
          background: 'var(--gold)',
          borderRadius: '50%',
          transition: `left 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay * 0.001}s`,
        }} />
      </div>
    </div>
  )
}

// ── Skill card icons ────────────────────────────────────────────────
const SKILL_ICONS = [
  // Fintech UI/UX
  <svg key="1" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="1.5" y="3" width="15" height="12" rx="0.5"/>
    <path d="M5 7h8M5 10h5"/>
    <circle cx="13.5" cy="10" r="1.5"/>
  </svg>,
  // Crypto / Web3
  <svg key="2" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M9 1.5L16.5 9 9 16.5 1.5 9Z"/>
    <path d="M9 5v8M5 9h8"/>
  </svg>,
  // AI Automation
  <svg key="3" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="3" y="3" width="4" height="4"/><rect x="11" y="3" width="4" height="4"/>
    <rect x="7" y="11" width="4" height="4"/>
    <path d="M5 7v2.5a1.5 1.5 0 001.5 1.5H9m4.5-4v2.5A1.5 1.5 0 0112 11H9"/>
  </svg>,
  // SEO
  <svg key="4" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="7.5" cy="7.5" r="5"/>
    <path d="M11 11l4.5 4.5"/>
    <path d="M5.5 7.5h4M7.5 5.5v4"/>
  </svg>,
  // Marketing
  <svg key="5" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M2 12L6 8l3 3 4-5 3 2"/>
    <path d="M2 15h14"/>
  </svg>,
  // Brand Identity
  <svg key="6" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M9 2l1.8 5h5.2l-4.2 3 1.6 5L9 12.5 4.6 15l1.6-5L2 7h5.2z"/>
  </svg>,
]

const SKILLS = [
  { title: 'Fintech UI/UX Design',       pct: 97, label: 'Expert',   desc: 'Premium dashboards, banking apps and payment platform interfaces that build instant trust with high-net-worth users and institutional clients.' },
  { title: 'Crypto & Web3 Design',        pct: 94, label: 'Expert',   desc: 'Exchange platforms, DeFi protocols, NFT marketplaces and Web3 landing pages engineered to drive massive user adoption globally.' },
  { title: 'AI Automation & Workflows',   pct: 91, label: 'Advanced', desc: 'Custom AI agent systems automating KYC verification, client onboarding, compliance reporting and business pipelines 24/7.' },
  { title: 'Fintech SEO & Content',       pct: 88, label: 'Advanced', desc: 'Specialised SEO strategies for regulated financial platforms, crypto projects and banking institutions seeking global discoverability.' },
  { title: 'Financial Marketing',         pct: 87, label: 'Advanced', desc: 'Precision-targeted digital campaigns for fintech products generating qualified investor leads and maximum acquisition ROI.' },
  { title: 'Financial Brand Identity',    pct: 95, label: 'Expert',   desc: 'Premium brand systems for investment firms, fintech startups and crypto projects that command instant trust and global authority.' },
]

const JOURNEY_STATS = [
  { value: '6+',  label: 'Years Active' },
  { value: '40+', label: 'Projects Delivered' },
  { value: '12',  label: 'Countries Served' },
  { value: '98%', label: 'Client Retention' },
]

const VALUES = [
  {
    title: 'Precision, Not Volume',
    body: 'One brief, one strategy, one exact outcome. Every deliverable is refined until it meets the standard — not an acceptable approximation of it.',
  },
  {
    title: 'Global by Default',
    body: 'Every solution is built to operate at institutional level across any market, from Lagos to London to Singapore. Geography is not a constraint.',
  },
  {
    title: 'Direct Communication',
    body: 'No account managers, no relay chain. You work directly with the person who builds it — from the first brief through to final delivery.',
  },
  {
    title: 'Results Over Noise',
    body: 'Aesthetics serve performance. Every design decision is tested against the only metric that matters: does it measurably move the business forward.',
  },
]

const SOCIALS = [
  { label: 'WhatsApp', href: 'https://wa.me/2347080083489',                                           Icon: IconWhatsApp },
  { label: 'Email',    href: 'mailto:magajiqaseem@gmail.com',                                         Icon: IconMail },
  { label: 'Upwork',   href: 'https://www.upwork.com/freelancers/~01edb4f1d95b1a9790',               Icon: IconUpwork },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61559538970452',               Icon: IconFacebook },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kasim-magaji-ab66b9310',                   Icon: IconLinkedIn },
]

export default function AboutPage() {
  const { navigate } = useNav()

  return (
    <main style={{ background: 'var(--black)', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ paddingTop: '9rem', paddingBottom: '6rem', borderBottom: '1px solid var(--gold-dim)' }}>
        <div className="container">
          <div className="about-hero-grid" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '7rem', alignItems: 'center' }}>

            {/* Portrait */}
            <div style={{ position: 'relative' }}>
              <div style={{
                aspectRatio: '4/5',
                border: '1px solid var(--gold-dim)',
                background: 'var(--black-2)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img
                  src={founderPhoto}
                  alt="Kasim M. — Founder & Principal, Kasim Elite Digital Global"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
                {/* Thin gold hairline overlay to tie photo into the design system */}
                <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--gold-dim)', pointerEvents: 'none' }} />
              </div>

              {/* Badge overlay */}
              <div style={{
                position: 'absolute', bottom: -1, left: -1,
                border: '1px solid var(--gold-dim2)',
                background: 'var(--black)',
                padding: '1rem 1.25rem',
                display: 'flex', flexDirection: 'column', gap: '0.15rem',
              }}>
                <span className="serif" style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, letterSpacing: '-0.02em' }}>6+</span>
                <span className="sans" style={{ fontSize: '0.46rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--grey)', opacity: 0.65 }}>Years of Excellence</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="label" style={{ marginBottom: '1.25rem', paddingLeft: '1.25rem', borderLeft: '1px solid var(--gold-dim2)', color: 'var(--gold)', opacity: 0.7 }}>
                The Story
              </p>
              <h1 className="serif" style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '2rem', color: 'var(--white)' }}>
                Built To{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Dominate</em>{' '}
                The Fintech Space
              </h1>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {[
                  'Kasim M. — a premium fintech web developer, UI/UX designer, AI automation engineer and digital strategist helping financial technology companies, crypto platforms and global enterprises dominate their markets online.',
                  'Kasim Elite Digital Global was built on one conviction: world-class digital work creates world-class businesses. Every project is delivered with the same relentless standard — elite design, precision engineering and systems built for global scale.',
                  'From premium fintech dashboards and crypto exchange platforms to next-generation AI automation workflows and financial SEO strategies — solutions that don\'t just look elite, they perform at the absolute highest level.',
                  'Based in Nigeria — trusted by clients across the globe.',
                ].map((para, i) => (
                  <p key={i} className="serif" style={{ fontStyle: 'italic', fontSize: 'clamp(0.88rem, 1.4vw, 1rem)', color: 'rgba(246,244,238,0.72)', lineHeight: 1.72, margin: 0 }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Social pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                      padding: '0.45rem 0.85rem',
                      border: '1px solid var(--gold-dim)',
                      color: 'rgba(154,152,143,0.65)',
                      fontSize: '0.6rem', fontFamily: 'Outfit, sans-serif',
                      fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold-dim)'; (e.currentTarget as HTMLElement).style.color = 'rgba(154,152,143,0.65)' }}
                  >
                    <s.Icon />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capability Radar ─────────────────────────────────── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)', background: 'var(--black-2)' }}>
        <div className="container">
          <div className="radar-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>

            {/* Radar mockup */}
            <CapabilityRadar />

            {/* Explanation */}
            <div>
              <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--gold)', opacity: 0.65 }}>Proficiency at a Glance</p>
              <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1.75rem', color: 'var(--white)' }}>
                Six Disciplines.{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>One Ecosystem.</em>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(246,244,238,0.72)', lineHeight: 1.72, margin: 0 }}>
                  Each axis represents a core practice area — scored from a real body of delivered client work, not self-assessed theory. The filled area is the aggregate capability profile that financial clients engage Kasim Elite Digital Global to deploy.
                </p>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(246,244,238,0.72)', lineHeight: 1.72, margin: 0 }}>
                  No practice area scores below 87. Every engagement draws on the full spectrum — a fintech brand launch will leverage UI design, brand identity, SEO strategy and copywriting simultaneously, not in isolation.
                </p>
              </div>
              {/* Compact stat row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '0', width: 'fit-content', border: '1px solid var(--gold-dim)' }}>
                {[
                  { val: '97%', label: 'Peak Score' },
                  { val: '92%', label: 'Avg. Across All' },
                  { val: '6',   label: 'Disciplines' },
                ].map((s, i) => (
                  <div key={s.label} style={{ padding: '0.85rem 1.25rem', borderRight: i < 2 ? '1px solid var(--gold-dim)' : 'none', textAlign: 'center' }}>
                    <div className="serif" style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.val}</div>
                    <div className="sans" style={{ fontSize: '0.46rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--grey)', opacity: 0.6, marginTop: '0.3rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills & Expertise ───────────────────────────────── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem' }}>
            <p className="label" style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.65 }}>Core Competencies</p>
            <h2 className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, lineHeight: 1, color: 'var(--white)' }}>
              Skills &amp;{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Expertise</em>
            </h2>
          </div>

          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--gold-dim)', border: '1px solid var(--gold-dim)' }}>
            {SKILLS.map((skill, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? 'var(--black)' : 'var(--black-2)', padding: '2rem' }}>
                {/* Icon */}
                <div style={{ width: 36, height: 36, border: '1px solid var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'rgba(212,175,55,0.6)' }}>
                  {SKILL_ICONS[i]}
                </div>
                {/* Title */}
                <h3 className="serif" style={{ fontSize: '1.1rem', fontWeight: 300, color: 'var(--white)', marginBottom: '0.6rem', lineHeight: 1.2 }}>{skill.title}</h3>
                {/* Description */}
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(246,244,238,0.6)', lineHeight: 1.6, marginBottom: 0 }}>{skill.desc}</p>
                {/* Proficiency bar */}
                <SkillBar pct={skill.pct} label={skill.label} delay={i * 100} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey ──────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)', background: 'var(--black-2)' }}>
        <div className="container">
          <div className="about-journey-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>

            {/* Left */}
            <div>
              <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--gold)', opacity: 0.65 }}>The Journey</p>
              <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1.08, marginBottom: '2rem', color: 'var(--white)' }}>
                From Nigeria To{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>The Global Fintech Stage</em>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {[
                  'What began as a relentless drive to master digital craft in Nigeria became something far larger — a global practice trusted by financial companies, trading platforms and crypto ventures operating across three continents.',
                  'Six years of deliberate work, refusing every shortcut, produced a client base and a reputation built entirely on delivered results rather than agency promises. Kasim Elite Digital Global exists because the global fintech market demands a standard most providers cannot meet.',
                  'The work comes from Nigeria. The standard is international.',
                ].map((para, i) => (
                  <p key={i} className="serif" style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(246,244,238,0.7)', lineHeight: 1.75, margin: 0 }}>{para}</p>
                ))}
              </div>
            </div>

            {/* Right: stats */}
            <div>
              <div style={{ border: '1px solid var(--gold-dim)', background: 'rgba(212,175,55,0.03)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {JOURNEY_STATS.map((s, i) => (
                    <div
                      key={s.label}
                      style={{
                        padding: '2.5rem 2rem',
                        borderRight: i % 2 === 0 ? '1px solid var(--gold-dim)' : 'none',
                        borderBottom: i < 2 ? '1px solid var(--gold-dim)' : 'none',
                      }}
                    >
                      <div className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                        {s.value}
                      </div>
                      <div className="sans" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--grey)', opacity: 0.65 }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tagline under stats */}
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', border: '1px solid var(--gold-dim)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: 1, background: 'var(--gold-dim2)', alignSelf: 'stretch', flexShrink: 0 }} />
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.88rem', color: 'rgba(154,152,143,0.65)', lineHeight: 1.65, margin: 0 }}>
                  "Every metric above represents a real brief, a real client, and a delivered outcome — not an inflated agency projection."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gold-dim)' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', maxWidth: '36ch' }}>
            <p className="label" style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.65 }}>How I Work</p>
            <h2 className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, lineHeight: 1, color: 'var(--white)' }}>
              Non-Negotiable{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Standards</em>
            </h2>
          </div>

          <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--gold-dim)', border: '1px solid var(--gold-dim)' }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ background: 'var(--black-2)', padding: '2rem 1.75rem' }}>
                {/* Number */}
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'rgba(212,175,55,0.35)', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>0{i + 1}</div>
                <h3 className="serif" style={{ fontSize: '1.15rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '0.85rem' }}>
                  {v.title}
                </h3>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(246,244,238,0.62)', lineHeight: 1.65, margin: 0 }}>
                  {v.body}
                </p>
                {/* Hairline accent */}
                <div style={{ marginTop: '1.5rem', height: 1, width: '2rem', background: 'var(--gold-dim2)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-lg" style={{ textAlign: 'center', background: 'var(--black-2)', borderTop: '1px solid var(--gold-dim)' }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <p className="label" style={{ marginBottom: '2rem', color: 'var(--gold)', opacity: 0.6 }}>Work Together</p>
          <h2 className="serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 0.95, marginBottom: '1.75rem', color: 'var(--white)' }}>
            Let's Build Something{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Elite Together</em>
          </h2>
          <p className="serif" style={{ fontStyle: 'italic', fontSize: '1rem', color: 'rgba(246,244,238,0.65)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Every engagement starts with a single conversation. No obligation, no pressure — just a direct discussion about where you want to go and how to get there.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <button onClick={() => navigate('services')} className="btn-primary">Start a Project</button>
            <a href="https://wa.me/2347080083489" target="_blank" rel="noopener noreferrer"
              className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <IconWhatsApp />
              WhatsApp
            </a>
            <a href="https://www.upwork.com/freelancers/~01edb4f1d95b1a9790" target="_blank" rel="noopener noreferrer"
              className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <IconUpwork />
              Hire on Upwork
            </a>
          </div>
          <p className="label" style={{ fontSize: '0.54rem', opacity: 0.45 }}>No obligation · NDA on request · Response within 24 h</p>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px)  { .about-hero-grid    { grid-template-columns: 1fr !important; gap: 3.5rem !important; } }
        @media (max-width: 900px)  { .radar-grid         { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        @media (max-width: 860px)  { .about-journey-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        @media (max-width: 860px)  { .skills-grid        { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px)  { .skills-grid        { grid-template-columns: 1fr !important; } }
        @media (max-width: 700px)  { .values-grid        { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 440px)  { .values-grid        { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
