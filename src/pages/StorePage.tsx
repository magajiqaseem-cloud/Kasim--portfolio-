import { useState } from 'react'
import { useNav } from '../context/nav'
import BrowserMockup from '../components/mockups/BrowserMockup'
import BrandSystem from '../components/mockups/BrandSystem'
import SEORankingPanel from '../components/mockups/SEORankingPanel'
import WorkflowDiagram from '../components/mockups/WorkflowDiagram'
import CampaignAnalytics from '../components/mockups/CampaignAnalytics'
import SocialFeedPanel from '../components/mockups/SocialFeedPanel'

type Filter = 'all' | 'fintech-templates' | 'branding-kits' | 'seo-marketing' | 'ai-automation'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all',               label: 'All Products' },
  { id: 'fintech-templates', label: 'Fintech Templates' },
  { id: 'branding-kits',     label: 'Branding Kits' },
  { id: 'seo-marketing',     label: 'SEO & Marketing' },
  { id: 'ai-automation',     label: 'AI & Automation' },
]

const TRUST_ITEMS = [
  'Instant Digital Delivery',
  'Premium Quality Guaranteed',
  'Used By Global Clients',
  'Lifetime Access',
  'WhatsApp Support Included',
]

type Product = {
  id: string
  filter: Filter
  badge?: string
  name: string
  price: number
  was?: number
  description: string
  includes: string[]
  Mockup: React.ComponentType
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    filter: 'fintech-templates',
    badge: 'BEST SELLER',
    name: 'Premium 6-Page Fintech Website Template',
    price: 49,
    description: 'A complete 6-page professional website template built with dark luxury aesthetics, gold accents, mobile-first responsive design and Google Analytics integration. Ready to deploy in minutes.',
    includes: [
      '6 fully coded HTML pages (Home, About, Services, Portfolio, Contact, Store)',
      'Dark luxury design system with gold brand accents',
      '100% mobile responsive',
      'Google Analytics integration built in',
      'Formspree contact form integration',
      'Full source code',
      'Complete setup guide',
      '30-day WhatsApp support',
    ],
    Mockup: BrowserMockup,
  },
  {
    id: 'p2',
    filter: 'branding-kits',
    name: 'Elite Fintech Brand Identity System',
    price: 35,
    was: 80,
    description: 'A complete brand identity system designed specifically for fintech startups and financial services companies — logo concepts, colour palettes, typography guide and social media templates.',
    includes: [
      'Logo design files (PNG, SVG, PDF)',
      'Brand colour palette & typography guide',
      'Business card design template',
      'Social media profile & banner templates',
      'Brand usage guidelines document',
    ],
    Mockup: BrandSystem,
  },
  {
    id: 'p3',
    filter: 'seo-marketing',
    name: 'Fintech SEO Domination Guide',
    price: 25,
    was: 60,
    description: 'The exact SEO strategy used to rank fintech and financial services websites on Google Page 1. Step-by-step guide covering technical SEO, keyword research, content strategy and backlinks.',
    includes: [
      '65-page fintech SEO strategy PDF',
      'Keyword research template (Excel)',
      'On-page SEO checklist',
      'Backlink outreach email templates',
      'Google ranking tracker spreadsheet',
    ],
    Mockup: SEORankingPanel,
  },
  {
    id: 'p4',
    filter: 'ai-automation',
    name: 'AI Automation Starter Kit for Fintech',
    price: 30,
    description: 'A complete guide to automating fintech or business operations using AI tools. Save 20+ hours per week and scale faster with intelligent workflows and automation systems.',
    includes: [
      'AI tools master list & setup guide',
      '10 ready-to-use automation workflows',
      'ChatGPT prompt library (200+ prompts)',
      'Social media automation setup guide',
      'Client follow-up automation templates',
    ],
    Mockup: WorkflowDiagram,
  },
  {
    id: 'p5',
    filter: 'seo-marketing',
    badge: 'NEW',
    name: 'Facebook Ads Profit Blueprint',
    price: 29,
    was: 70,
    description: 'The exact Facebook and Instagram ad strategy used to generate 6× ROI for financial services clients. Includes ad copy templates, targeting strategies and budget scaling framework.',
    includes: [
      'Facebook Ads strategy PDF guide',
      '30 proven ad copy templates',
      'Audience targeting cheat sheet',
      'Budget scaling framework',
      'Ads performance tracker spreadsheet',
    ],
    Mockup: CampaignAnalytics,
  },
  {
    id: 'p6',
    filter: 'seo-marketing',
    name: 'Financial Social Media Growth Playbook',
    price: 20,
    was: 50,
    description: 'The complete social media strategy playbook for financial services, fintech companies and business owners. Content calendars, caption frameworks and engagement strategies that grow real followers.',
    includes: [
      '90-day content calendar template',
      'Caption writing framework & templates',
      'Hashtag research master spreadsheet',
      'Instagram & Facebook growth guide',
      'Engagement scripts & DM templates',
    ],
    Mockup: SocialFeedPanel,
  },
]

const BUNDLE_INCLUDES = [
  'Premium 6-Page Fintech Website Template',
  'Elite Fintech Brand Identity Kit',
  'Fintech SEO Domination Guide',
  'AI Automation Starter Kit',
  'Social Media Growth Playbook',
  'Facebook Ads Profit Blueprint',
  'Priority WhatsApp Support (60 days)',
]

function ProductCard({ p }: { p: Product }) {
  const { Mockup } = p
  return (
    <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)', display: 'flex', flexDirection: 'column' }}>
      {/* Mockup */}
      <div style={{ borderBottom: '1px solid var(--gold-dim)', position: 'relative', overflow: 'hidden' }}>
        {p.badge && (
          <div style={{
            position: 'absolute', top: 10, right: 10, zIndex: 2,
            background: p.badge === 'NEW' ? 'rgba(74,222,193,0.15)' : 'rgba(212,175,55,0.18)',
            border: `1px solid ${p.badge === 'NEW' ? 'rgba(74,222,193,0.4)' : 'rgba(212,175,55,0.4)'}`,
            color: p.badge === 'NEW' ? '#4adec1' : 'var(--gold)',
            fontSize: '0.48rem', fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.16em', padding: '0.2rem 0.5rem',
          }}>
            {p.badge}
          </div>
        )}
        <Mockup />
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <span className="serif" style={{ fontSize: '1.65rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>${p.price}</span>
          {p.was && (
            <span className="sans" style={{ fontSize: '0.62rem', color: 'var(--grey)', textDecoration: 'line-through', opacity: 0.6 }}>${p.was}</span>
          )}
        </div>

        <h3 className="serif" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)', fontWeight: 300, lineHeight: 1.2, color: 'var(--white)', marginBottom: '0.75rem' }}>
          {p.name}
        </h3>
        <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(246,244,238,0.72)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
          {p.description}
        </p>

        {/* Includes */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p className="label" style={{ fontSize: '0.5rem', marginBottom: '0.65rem', color: 'var(--grey)', opacity: 0.6 }}>Includes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {p.includes.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <svg width="9" height="9" viewBox="0 0 9 9" style={{ flexShrink: 0, marginTop: '0.2rem' }}>
                  <path d="M1 4.5l2.5 2.5 4.5-4.5" stroke="var(--gold)" strokeWidth="1.2" fill="none" opacity="0.7" />
                </svg>
                <span className="sans" style={{ fontSize: '0.7rem', color: 'rgba(246,244,238,0.55)', lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
          Get Instant Access →
        </button>
      </div>
    </div>
  )
}

export default function StorePage() {
  const { navigate } = useNav()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.filter === filter)

  return (
    <main style={{ background: 'var(--black)', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ paddingTop: '10rem', paddingBottom: '5rem', borderBottom: '1px solid var(--gold-dim)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '2.5rem', top: '30%', width: 1, height: '45%', background: 'linear-gradient(to bottom, transparent, var(--gold-dim2), transparent)' }} />
        <div className="container">
          <p className="label" style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '1px solid var(--gold-dim2)', color: 'var(--gold)', opacity: 0.7 }}>
            Digital Products — Kasim Elite Digital Global
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', fontWeight: 300, lineHeight: 0.92, marginBottom: '2rem', color: 'var(--white)' }}>
            Premium{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Digital</em>{' '}
            Products Store
          </h1>
          <p className="serif" style={{ fontStyle: 'italic', fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)', color: 'var(--grey)', lineHeight: 1.7, maxWidth: '60ch' }}>
            Instant-access fintech resources, website templates, branding kits, AI automation guides and marketing systems — built from real client work and delivering real, verifiable results.
          </p>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────── */}
      <div style={{ background: 'var(--black-3,#141417)', borderBottom: '1px solid var(--gold-dim)', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 2.5rem', display: 'flex', alignItems: 'center' }}>
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <span className="sans" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(154,152,143,0.65)', padding: '0.85rem 1.25rem', whiteSpace: 'nowrap' }}>
                {item}
              </span>
              {i < TRUST_ITEMS.length - 1 && (
                <span style={{ color: 'var(--gold-dim2)', fontSize: '0.6rem' }}>·</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured bundle ──────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--gold-dim)', background: 'var(--black-2)' }}>
        <div className="container" style={{ padding: '4rem 0' }}>
          <div style={{ border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.03)', position: 'relative', overflow: 'hidden' }}>
            {/* Savings badge */}
            <div style={{
              position: 'absolute', top: 0, right: 0,
              background: 'var(--gold)', color: '#08080a',
              padding: '0.5rem 1.5rem',
              fontSize: '0.58rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
              Save $356
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0' }}>
              {/* Left: content */}
              <div style={{ padding: '3rem', borderRight: '1px solid var(--gold-dim)' }}>
                <p className="label" style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.65 }}>Complete Bundle — All 6 Products</p>
                <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--white)', marginBottom: '1rem' }}>
                  Complete Fintech{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Digital Business</em>{' '}
                  Bundle
                </h2>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'rgba(246,244,238,0.72)', lineHeight: 1.65, marginBottom: '2rem', maxWidth: '48ch' }}>
                  Everything you need to build, brand, market and grow a professional fintech or digital business online — all 6 best-selling products at a massive saving.
                </p>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2.5rem' }}>
                  <span className="serif" style={{ fontSize: '3rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>$99</span>
                  <div>
                    <span className="sans" style={{ fontSize: '0.72rem', color: 'var(--grey)', textDecoration: 'line-through', display: 'block', opacity: 0.6 }}>$455</span>
                    <span className="sans" style={{ fontSize: '0.58rem', color: '#4adec1', letterSpacing: '0.1em' }}>78% OFF</span>
                  </div>
                </div>

                <button className="btn-primary" style={{ fontSize: '0.65rem', padding: '1rem 2.5rem' }}>
                  Get The Complete Bundle →
                </button>
              </div>

              {/* Right: checklist */}
              <div style={{ padding: '3rem' }}>
                <p className="label" style={{ marginBottom: '1.5rem', color: 'var(--grey)', opacity: 0.6 }}>What's Included</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {BUNDLE_INCLUDES.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: i < BUNDLE_INCLUDES.length - 1 ? '1rem' : 0, borderBottom: i < BUNDLE_INCLUDES.length - 1 ? '1px solid var(--gold-dim)' : 'none' }}>
                      <div style={{
                        width: 20, height: 20, flexShrink: 0,
                        border: '1px solid rgba(212,175,55,0.4)',
                        background: 'rgba(212,175,55,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="10" height="10" viewBox="0 0 10 10">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
                        </svg>
                      </div>
                      <span className="sans" style={{ fontSize: '0.82rem', color: 'rgba(246,244,238,0.7)', lineHeight: 1.3 }}>{item}</span>
                    </div>
                  ))}
                </div>
                {/* Priority support tag */}
                <div style={{ marginTop: '1.5rem', padding: '0.65rem 1rem', border: '1px solid rgba(74,222,193,0.25)', background: 'rgba(74,222,193,0.05)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4adec1', flexShrink: 0 }} />
                  <span className="sans" style={{ fontSize: '0.62rem', color: '#4adec1', letterSpacing: '0.06em' }}>Priority WhatsApp support included for 60 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter rail ──────────────────────────────────────── */}
      <div style={{ position: 'sticky', top: 72, zIndex: 50, background: 'var(--black-2)', borderBottom: '1px solid var(--gold-dim)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 2.5rem', display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="sans"
              style={{
                flexShrink: 0, padding: '0.9rem 1.25rem',
                fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: filter === f.id ? 'var(--gold)' : 'var(--grey)',
                borderBottom: filter === f.id ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
                whiteSpace: 'nowrap', marginBottom: -1, background: 'transparent',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Product grid ─────────────────────────────────────── */}
      <div style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="store-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--gold-dim)', border: '1px solid var(--gold-dim)' }}>
            {visible.map(p => (
              <div key={p.id} style={{ background: 'var(--black)' }}>
                <ProductCard p={p} />
              </div>
            ))}
            {/* Pad to fill row if needed */}
            {visible.length % 3 === 1 && <><div style={{ background: 'var(--black-2)' }} /><div style={{ background: 'var(--black-2)' }} /></>}
            {visible.length % 3 === 2 && <div style={{ background: 'var(--black-2)' }} />}
          </div>
        </div>
      </div>

      {/* ── Trust pillars ────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--gold-dim)', borderBottom: '1px solid var(--gold-dim)', background: 'var(--black-2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', paddingTop: '3.5rem', paddingBottom: '2.5rem' }}>
            <p className="label" style={{ color: 'var(--gold)', opacity: 0.6, marginBottom: '0.75rem' }}>Why Our Customers Trust Us</p>
            <h3 className="serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--white)' }}>
              Products Built From{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Real Results</em>
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--gold-dim)' }}>
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1.5L11.18 6.26L16.5 7.05L12.75 10.74L13.64 16.04L9 13.77L4.36 16.04L5.25 10.74L1.5 7.05L6.82 6.26L9 1.5Z" stroke="var(--gold)" strokeWidth="1.2" fill="none" opacity="0.7"/>
                  </svg>
                ),
                title: 'Instant Delivery',
                body: 'Files delivered within 24 hours of purchase. No waiting, no friction — straight to your inbox.',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L2 6v5c0 4 3.1 7.7 7 8.7C12.9 18.7 16 15 16 11V6L9 2z" stroke="var(--gold)" strokeWidth="1.2" fill="none" opacity="0.7"/>
                    <path d="M6 9l2.5 2.5 3.5-3.5" stroke="var(--gold)" strokeWidth="1.2" opacity="0.7"/>
                  </svg>
                ),
                title: 'Battle-Tested',
                body: 'Every product is built directly from strategies and systems applied in real client engagements — not theory.',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 3h12v9H3z" stroke="var(--gold)" strokeWidth="1.2" fill="none" opacity="0.7"/>
                    <path d="M6 16h6M9 12v4" stroke="var(--gold)" strokeWidth="1.2" opacity="0.7"/>
                  </svg>
                ),
                title: 'WhatsApp Support',
                body: 'Direct support via WhatsApp is included with every purchase. Real answers from the person who built it.',
              },
            ].map((pillar, i) => (
              <div key={i} style={{ padding: '2.5rem 2rem', borderRight: i < 2 ? '1px solid var(--gold-dim)' : 'none', textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, border: '1px solid var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  {pillar.icon}
                </div>
                <h4 className="serif" style={{ fontSize: '1.1rem', fontWeight: 300, color: 'var(--white)', marginBottom: '0.6rem' }}>{pillar.title}</h4>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'var(--grey)', lineHeight: 1.65, opacity: 0.75, maxWidth: '28ch', margin: '0 auto' }}>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Custom solution CTA ──────────────────────────────── */}
      <section className="section-lg" style={{ textAlign: 'center', background: 'var(--black)' }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <p className="label" style={{ marginBottom: '2rem', color: 'var(--gold)', opacity: 0.6 }}>Custom Work</p>
          <h2 className="serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 0.95, marginBottom: '1.75rem', color: 'var(--white)' }}>
            Need a{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Custom Solution?</em>
          </h2>
          <p className="serif" style={{ fontStyle: 'italic', fontSize: '1rem', color: 'var(--grey)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Can't find exactly what you need? Contact us for a fully custom digital solution tailored specifically for your fintech business or global enterprise.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('services')} className="btn-primary">
              Request Custom Work →
            </button>
            <a
              href="https://wa.me/2347080083489"
              target="_blank" rel="noopener noreferrer"
              className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Me
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) { .store-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .store-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 780px) {
          .bundle-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
