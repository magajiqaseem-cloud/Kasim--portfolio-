import { useState } from 'react'
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

type Filter = 'all' | 'web-dev' | 'fintech' | 'marketing' | 'ai-automation' | 'motion' | 'ai-video' | 'copywriting' | 'translation' | 'brand'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all',          label: 'All' },
  { id: 'web-dev',      label: 'Website Dev' },
  { id: 'fintech',      label: 'Fintech & Crypto' },
  { id: 'marketing',    label: 'Marketing' },
  { id: 'ai-automation',label: 'AI Automation' },
  { id: 'motion',       label: 'Motion Design' },
  { id: 'ai-video',     label: 'AI Video' },
  { id: 'copywriting',  label: 'Copywriting' },
  { id: 'translation',  label: 'Translation' },
  { id: 'brand',        label: 'Brand Identity' },
]

type CaseStudy = {
  id: string
  filter: Filter
  tag: string
  name: string
  outcome: string
  Mockup: React.ComponentType
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-01',
    filter: 'fintech',
    tag: 'FINTECH & CRYPTO',
    name: 'DeFi Protocol Dashboard',
    outcome: 'Onboarding completion rose from 31% to 74% — a 139% lift — within 45 days of launch.',
    Mockup: TradingPanel,
  },
  {
    id: 'cs-02',
    filter: 'ai-automation',
    tag: 'AI AUTOMATION',
    name: 'Institutional KYC Pipeline',
    outcome: 'Cut average onboarding time from 12 minutes to under 90 seconds across 4 jurisdictions.',
    Mockup: WorkflowDiagram,
  },
  {
    id: 'cs-03',
    filter: 'web-dev',
    tag: 'WEBSITE DEVELOPMENT',
    name: 'Fintech Exchange Platform',
    outcome: 'Page load reduced from 4.2s to 0.8s; conversion rate up 34% in the first 30 days.',
    Mockup: BrowserMockup,
  },
  {
    id: 'cs-04',
    filter: 'marketing',
    tag: 'MARKETING CAMPAIGNS',
    name: 'Wealth Management Growth Campaign',
    outcome: '1,293 qualified investor leads generated at $9.90 CPL over a 60-day paid-media sprint.',
    Mockup: CampaignAnalytics,
  },
  {
    id: 'cs-05',
    filter: 'brand',
    tag: 'BRAND IDENTITY',
    name: 'Fintech Startup Visual Identity',
    outcome: 'Full brand system delivered in 3 weeks; client raised pre-seed at a $1.8M valuation.',
    Mockup: BrandSystem,
  },
  {
    id: 'cs-06',
    filter: 'ai-video',
    tag: 'AI VIDEO CREATION',
    name: 'Institutional Trading Firm Showreel',
    outcome: '4K brand film produced in 8 days; cited by lead investor in Series A due-diligence notes.',
    Mockup: VideoStudio,
  },
  {
    id: 'cs-07',
    filter: 'copywriting',
    tag: 'EXPERT COPYWRITING',
    name: 'Hedge Fund Pitch Deck Narrative',
    outcome: 'Rewritten pitch narrative contributed to a $4.2M seed close within 6 weeks of delivery.',
    Mockup: CopyBeforeAfter,
  },
  {
    id: 'cs-08',
    filter: 'motion',
    tag: 'MOTION DESIGN',
    name: 'Crypto Exchange Launch Film',
    outcome: 'Brand animation reached 2.4M organic views across LinkedIn and X in the first two weeks.',
    Mockup: TimelineScrubber,
  },
  {
    id: 'cs-09',
    filter: 'translation',
    tag: 'TRANSLATION SERVICES',
    name: 'Multi-Jurisdiction Regulatory Filing',
    outcome: '340-page compliance document localised across 7 languages in 12 days — zero legal challenges.',
    Mockup: TranslationSwitcher,
  },
  {
    id: 'cs-10',
    filter: 'web-dev',
    tag: 'WEBSITE DEVELOPMENT',
    name: 'Payment Gateway SaaS Platform',
    outcome: 'Zero-downtime stack migration; 99.98% uptime maintained in the 6 months post-launch.',
    Mockup: BrowserMockup,
  },
  {
    id: 'cs-11',
    filter: 'marketing',
    tag: 'MARKETING CAMPAIGNS',
    name: 'Crypto Exchange User Acquisition',
    outcome: 'Daily active users scaled from 800 to 14,000 across 6 paid channels in 90 days.',
    Mockup: CampaignAnalytics,
  },
  {
    id: 'cs-12',
    filter: 'fintech',
    tag: 'FINTECH & CRYPTO',
    name: 'NFT Marketplace Redesign',
    outcome: 'Average session duration up 88%; secondary sale volume doubled within the first month.',
    Mockup: TradingPanel,
  },
]

const STATS = [
  { value: '40+',  label: 'Projects Delivered' },
  { value: '98%',  label: 'Client Retention' },
  { value: '12',   label: 'Countries Served' },
  { value: '4.9',  label: 'Average Rating' },
]

function CaseCard({ cs }: { cs: CaseStudy }) {
  const { Mockup } = cs
  return (
    <div style={{
      border: '1px solid var(--gold-dim)',
      background: 'var(--black-2)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Mockup */}
      <div style={{ borderBottom: '1px solid var(--gold-dim)', overflow: 'hidden' }}>
        <Mockup />
      </div>

      {/* Content */}
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span className="label" style={{ color: 'var(--gold)', opacity: 0.65, marginBottom: '0.85rem' }}>
          {cs.tag}
        </span>
        <h3 className="serif" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.55rem)', fontWeight: 300, lineHeight: 1.15, color: 'var(--white)', marginBottom: '1rem' }}>
          {cs.name}
        </h3>
        <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--grey)', lineHeight: 1.65, flex: 1, marginBottom: '1.5rem', opacity: 0.8 }}>
          {cs.outcome}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderTop: '1px solid var(--gold-dim)', paddingTop: '1.25rem' }}>
          <span className="sans" style={{ fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.75 }}>
            View Case Study
          </span>
          <span style={{ color: 'var(--gold)', opacity: 0.6, fontSize: '0.7rem' }}>→</span>
        </div>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const { navigate } = useNav()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = filter === 'all' ? CASE_STUDIES : CASE_STUDIES.filter(cs => cs.filter === filter)

  return (
    <main style={{ background: 'var(--black)', minHeight: '100vh' }}>

      {/* ── Page hero ────────────────────────────────────────── */}
      <section style={{ paddingTop: '10rem', paddingBottom: '6rem', borderBottom: '1px solid var(--gold-dim)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '2.5rem', top: '30%', width: 1, height: '45%', background: 'linear-gradient(to bottom, transparent, var(--gold-dim2), transparent)' }} />
        <div className="container">
          <p className="label" style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '1px solid var(--gold-dim2)', color: 'var(--gold)', opacity: 0.7 }}>
            Portfolio — Kasim Elite Digital Global
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', fontWeight: 300, lineHeight: 0.92, marginBottom: '2.5rem', color: 'var(--white)' }}>
            Proof,{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Not Promises.</em>
          </h1>
          <p className="serif" style={{ fontStyle: 'italic', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: 'var(--grey)', lineHeight: 1.65, maxWidth: '52ch' }}>
            Real engagements. Real outcomes. Across all nine verticals — delivered to financial brands operating at the highest levels globally.
          </p>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--gold-dim)', background: 'var(--black-2)' }}>
        <div className="container">
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '3rem 0',
                  textAlign: 'center',
                  borderRight: i < STATS.length - 1 ? '1px solid var(--gold-dim)' : 'none',
                }}
              >
                <div className="serif" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                  {s.value}
                </div>
                <div className="sans" style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--grey)', opacity: 0.7 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter rail ──────────────────────────────────────── */}
      <div style={{ position: 'sticky', top: 72, zIndex: 50, background: 'var(--black-2)', borderBottom: '1px solid var(--gold-dim)' }}>
        <div style={{
          maxWidth: 1300,
          margin: '0 auto',
          padding: '0 2.5rem',
          display: 'flex',
          gap: 0,
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="sans"
              style={{
                flexShrink: 0,
                padding: '0.9rem 1.25rem',
                fontSize: '0.58rem',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: filter === f.id ? 'var(--gold)' : 'var(--grey)',
                borderBottom: filter === f.id ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
                whiteSpace: 'nowrap',
                marginBottom: -1,
                background: 'transparent',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Case study grid ──────────────────────────────────── */}
      <div style={{ padding: '5rem 0' }}>
        <div className="container">
          {visible.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p className="serif" style={{ fontStyle: 'italic', color: 'var(--grey)', fontSize: '1.1rem' }}>No projects in this category yet.</p>
            </div>
          ) : (
            <div className="portfolio-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1px',
              background: 'var(--gold-dim)',
              border: '1px solid var(--gold-dim)',
            }}>
              {visible.map(cs => (
                <div key={cs.id} style={{ background: 'var(--black)' }}>
                  <CaseCard cs={cs} />
                </div>
              ))}
              {/* Fill empty cell when odd count so border stays clean */}
              {visible.length % 2 !== 0 && (
                <div style={{ background: 'var(--black-2)', minHeight: 200 }} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="section-lg" style={{ textAlign: 'center', background: 'var(--black-2)', borderTop: '1px solid var(--gold-dim)' }}>
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
        @media (max-width: 860px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  )
}
