import { useState, useRef, useEffect } from 'react'
import { useNav } from '../context/nav'
import BrowserMockup from '../components/mockups/BrowserMockup'
import TradingPanel from '../components/mockups/TradingPanel'
import CampaignAnalytics from '../components/mockups/CampaignAnalytics'
import WorkflowDiagram from '../components/mockups/WorkflowDiagram'
import TimelineScrubber from '../components/mockups/TimelineScrubber'
import VideoStudio from '../components/mockups/VideoStudio'
import CopyBeforeAfter from '../components/mockups/CopyBeforeAfter'
import TranslationSwitcher from '../components/mockups/TranslationSwitcher'
import BrandSystem from '../components/mockups/BrandSystem'

const MOCKUPS = [
  BrowserMockup,
  TradingPanel,
  CampaignAnalytics,
  WorkflowDiagram,
  TimelineScrubber,
  VideoStudio,
  CopyBeforeAfter,
  TranslationSwitcher,
  BrandSystem,
]

const SERVICES = [
  {
    n: '01', id: 'web-dev',
    title: 'Website Development',
    tag: 'Engineering',
    positioning: 'Enterprise-grade platforms built for performance, security, and conversion.',
    capabilities: [
      'Full-stack web application development',
      'CMS integration (Sanity, Contentful, Strapi)',
      'Performance optimisation & Core Web Vitals',
      'Security hardening & penetration testing',
      'API design, integration & documentation',
    ],
    cta: 'Launch Your Website',
  },
  {
    n: '02', id: 'fintech-design',
    title: 'Fintech & Crypto\nWeb Design',
    tag: 'Design',
    positioning: 'Interfaces that build institutional trust — from exchange dashboards to DeFi protocols.',
    capabilities: [
      'Trading platform & exchange UI/UX',
      'DeFi protocol front-end development',
      'NFT marketplace design & build',
      'Banking dashboard & payment flow design',
      'Design systems & component libraries',
    ],
    cta: 'Design Your Platform',
  },
  {
    n: '03', id: 'marketing',
    title: 'Marketing Campaigns',
    tag: 'Performance',
    positioning: 'Full-funnel campaigns for investor acquisition and AUM growth at global scale.',
    capabilities: [
      'Paid search & programmatic media buying',
      'LinkedIn & Meta financial audience targeting',
      'Compliance-reviewed creative production',
      'Attribution modelling & analytics setup',
      'Retargeting & lifecycle automation',
    ],
    cta: 'Scale Your Reach',
  },
  {
    n: '04', id: 'ai-automation',
    title: 'AI Automation &\nAdvanced Workflows',
    tag: 'Technology',
    positioning: 'Intelligent pipelines automating KYC, onboarding, compliance and reporting — 24/7.',
    capabilities: [
      'KYC & AML automation pipelines',
      'GPT-4 / Claude custom integrations',
      'n8n, Zapier & Make workflow builds',
      'Compliance reporting automation',
      'CRM enrichment & lead scoring',
    ],
    cta: 'Automate Everything',
  },
  {
    n: '05', id: 'motion',
    title: 'Motion Design',
    tag: 'Creative',
    positioning: 'Brand animation and UI micro-interactions that make complex products feel effortless.',
    capabilities: [
      'Brand identity animation & logo reveal',
      'UI motion design & micro-interactions',
      'Explainer and product walkthrough films',
      'Social-first motion content',
      'Lottie / Rive animation for web & app',
    ],
    cta: 'Animate Your Brand',
  },
  {
    n: '06', id: 'ai-video',
    title: 'AI Video Creation &\nPhoto Editing',
    tag: 'Production',
    positioning: 'Cinematic brand content produced to 4K broadcast standard with AI-assisted post-production.',
    capabilities: [
      '4K / 60fps brand film production',
      'AI-assisted video generation & editing',
      'Colour grading & sound design',
      'Corporate documentary & case studies',
      'Thumbnail & key visual design',
    ],
    cta: 'Create Your Showreel',
  },
  {
    n: '07', id: 'copywriting',
    title: 'Expert Copywriting',
    tag: 'Content',
    positioning: 'Precision copy for regulated financial brands — pitch decks, whitepapers and web copy.',
    capabilities: [
      'Website & landing page copywriting',
      'Investor pitch deck narrative',
      'Whitepaper & technical documentation',
      'Regulatory-compliant product copy',
      'Thought leadership & LinkedIn content',
    ],
    cta: 'Sharpen Your Message',
  },
  {
    n: '08', id: 'translation',
    title: 'Multilingual\nTranslation Services',
    tag: 'Global',
    positioning: 'Localised financial content across 30+ languages, technically accurate and regulation-aware.',
    capabilities: [
      'Financial document translation (30+ languages)',
      'Regulatory filing localisation',
      'Website & app localisation (i18n)',
      'Simultaneous interpretation services',
      'Transcreation for marketing campaigns',
    ],
    cta: 'Go Global',
  },
  {
    n: '09', id: 'brand-identity',
    title: 'Financial Brand\nIdentity Design',
    tag: 'Brand',
    positioning: 'Positioning and visual identity for fintech startups, trading desks and wealth managers.',
    capabilities: [
      'Brand strategy & competitive positioning',
      'Logo design & typographic system',
      'Full visual identity & colour system',
      'Branded collateral suite',
      '100-page brand guidelines document',
    ],
    cta: 'Build Your Brand',
  },
]

export default function ServicesPage() {
  const { navigate } = useNav()
  const [active, setActive] = useState(0)
  const railRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  /* Scroll the rail tab into view when active changes */
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const btn = rail.children[active] as HTMLElement
    if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [active])

  const scrollTo = (i: number) => {
    setActive(i)
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main style={{ background: 'var(--black)', minHeight: '100vh' }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <section style={{ paddingTop: '10rem', paddingBottom: '6rem', borderBottom: '1px solid var(--gold-dim)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '2.5rem', top: '30%', width: 1, height: '45%', background: 'linear-gradient(to bottom, transparent, var(--gold-dim2), transparent)' }} />
        <div className="container">
          <p className="label" style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '1px solid var(--gold-dim2)', color: 'var(--gold)', opacity: 0.7 }}>
            Services — Kasim Elite Digital Global
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', fontWeight: 300, lineHeight: 0.92, marginBottom: '2.5rem', color: 'var(--white)' }}>
            What We{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Deliver.</em>
          </h1>
          <p className="serif" style={{ fontStyle: 'italic', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: 'var(--grey)', lineHeight: 1.65, maxWidth: '48ch' }}>
            Nine disciplines. One ecosystem. Built for financial brands that refuse to be ordinary.
          </p>
        </div>
      </section>

      {/* ── Numbered index rail ──────────────────────────────── */}
      <div style={{ position: 'sticky', top: 72, zIndex: 50, background: 'var(--black-2)', borderBottom: '1px solid var(--gold-dim)' }}>
        <div
          ref={railRef}
          style={{
            maxWidth: 1300,
            margin: '0 auto',
            padding: '0 2.5rem',
            display: 'flex',
            gap: 0,
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {SERVICES.map((s, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="sans"
              style={{
                flexShrink: 0,
                padding: '0.9rem 1.1rem',
                fontSize: '0.58rem',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: active === i ? 'var(--gold)' : 'var(--grey)',
                borderBottom: active === i ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
                whiteSpace: 'nowrap',
                marginBottom: -1,
              }}
            >
              {s.n}
            </button>
          ))}
        </div>
      </div>

      {/* ── Service sections ─────────────────────────────────── */}
      {SERVICES.map((s, i) => (
        <div
          key={i}
          ref={(el) => { sectionRefs.current[i] = el }}
          style={{
            borderBottom: '1px solid var(--gold-dim)',
            padding: '6rem 0',
          }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>

              {/* Left */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <span className="mono" style={{ fontSize: '0.65rem', color: 'rgba(212,175,55,0.45)', letterSpacing: '0.1em' }}>{s.n}</span>
                  <span className="label" style={{ color: 'var(--gold)', opacity: 0.6 }}>{s.tag}</span>
                </div>
                <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, lineHeight: 1.08, marginBottom: '1.5rem', whiteSpace: 'pre-line', color: 'var(--white)' }}>
                  {s.title}
                </h2>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--grey)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                  {s.positioning}
                </p>
                <button onClick={() => navigate('home')} className="btn-primary">
                  {s.cta}
                </button>
              </div>

              {/* Right: capabilities + mockup */}
              <div>
                <p className="label" style={{ marginBottom: '1.75rem', color: 'var(--grey)' }}>Capabilities</p>
                {s.capabilities.map((cap, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1.25rem',
                      padding: '1.1rem 0',
                      borderBottom: j < s.capabilities.length - 1 ? '1px solid var(--gold-dim)' : 'none',
                    }}
                  >
                    <span style={{ width: 4, height: 4, background: 'var(--gold)', flexShrink: 0, marginTop: '0.45rem', opacity: 0.6 }} />
                    <span className="sans" style={{ fontSize: '0.88rem', color: 'rgba(246,244,238,0.65)', lineHeight: 1.45 }}>{cap}</span>
                  </div>
                ))}
                {/* Live interactive mockup */}
                <div style={{ marginTop: '2.5rem' }}>
                  {(() => { const M = MOCKUPS[i]; return <M /> })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-lg" style={{ textAlign: 'center', background: 'var(--black-2)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <p className="label" style={{ marginBottom: '2rem', color: 'var(--gold)', opacity: 0.6 }}>Get Started</p>
          <h2 className="serif" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 0.95, marginBottom: '2rem', color: 'var(--white)' }}>
            Ready To Scale{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Globally?</em>
          </h2>
          <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--grey)', lineHeight: 1.65, marginBottom: '3rem' }}>
            Every engagement begins with a no-obligation conversation. Tell us where you want to go.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <button onClick={() => navigate('home')} className="btn-primary">Start a Project</button>
            <a
              href="https://wa.me/message/your-number"
              target="_blank" rel="noopener noreferrer"
              className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://www.upwork.com/freelancers/your-profile"
              target="_blank" rel="noopener noreferrer"
              className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.001-2.439-5.439-5.439-5.439z" />
              </svg>
              Hire on Upwork
            </a>
          </div>
          <p className="label" style={{ fontSize: '0.54rem', marginTop: '1rem', opacity: 0.5 }}>
            No obligation · NDA on request · Response within 24 h
          </p>
        </div>
      </section>

      <style>{`
        .svc-detail { grid-template-columns: 1fr 1fr; }
        @media (max-width: 860px) {
          .svc-detail { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </main>
  )
}
