import { useState } from 'react'
import EngagementPipeline from '../components/mockups/EngagementPipeline'

// ── Inline SVG icons ─────────────────────────────────────────────────
const Icons = {
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="0.5"/><path d="M2 7l10 7 10-7"/>
    </svg>
  ),
  whatsapp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  upwork: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.001-2.439-5.439-5.439-5.439z"/>
    </svg>
  ),
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 .774 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="var(--gold)" strokeWidth="1" opacity="0.5"/>
      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="var(--gold)" strokeWidth="1.5"/>
    </svg>
  ),
}

const CONTACT_METHODS = [
  { icon: Icons.mail,      label: 'Email',     badge: '',                  href: 'mailto:magajiqaseem@gmail.com',                                     display: 'magajiqaseem@gmail.com' },
  { icon: Icons.whatsapp,  label: 'WhatsApp',  badge: 'Fastest Response',  href: 'https://wa.me/2347080083489',                                       display: '+234 708 008 3489' },
  { icon: Icons.upwork,    label: 'Upwork',    badge: 'Hire Officially',   href: 'https://www.upwork.com/freelancers/~01edb4f1d95b1a9790',            display: 'Kasim M. — Upwork Profile' },
  { icon: Icons.facebook,  label: 'Facebook',  badge: '',                  href: 'https://www.facebook.com/profile.php?id=61559538970452',            display: 'Kasim Magaji' },
  { icon: Icons.linkedin,  label: 'LinkedIn',  badge: '',                  href: 'https://www.linkedin.com/in/kasim-magaji-ab66b9310',               display: 'Kasim Magaji' },
]

const QUICK_LINKS = [
  { label: 'WhatsApp', href: 'https://wa.me/2347080083489',                                            icon: Icons.whatsapp },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61559538970452',                icon: Icons.facebook },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kasim-magaji-ab66b9310',                   icon: Icons.linkedin },
  { label: 'Upwork',   href: 'https://www.upwork.com/freelancers/~01edb4f1d95b1a9790',              icon: Icons.upwork },
]

const SERVICES = [
  'Website Development',
  'Fintech & Crypto Web Design',
  'Marketing Campaigns',
  'AI Automation & Advanced Workflows',
  'Motion Design',
  'AI Video Creation & Photo Editing',
  'Expert Copywriting',
  'Multilingual Translation Services',
  'Financial Brand Identity Design',
  'Full Package — Multiple Services',
]

const BUDGETS = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
]

// Shared input style factory
const inputStyle = (focused: boolean): React.CSSProperties => ({
  width: '100%',
  background: 'var(--black-3,#141417)',
  border: `1px solid ${focused ? 'rgba(212,175,55,0.55)' : 'var(--gold-dim)'}`,
  color: 'var(--white)',
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.9rem',
  padding: '0.75rem 1rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  borderRadius: 0,
  boxSizing: 'border-box' as const,
  appearance: 'none' as const,
})

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.57rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '0.4rem', fontFamily: 'Outfit, sans-serif' }}>
        {label}{required && <span style={{ color: 'var(--gold)', marginLeft: '0.2rem' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.currentTarget),
      })
      if (res.ok) setSuccess(true)
      else setError(true)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const foc  = (id: string) => () => setFocused(id)
  const blur = () => setFocused(null)

  return (
    <main style={{ background: 'var(--black)', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ paddingTop: '10rem', paddingBottom: '5rem', borderBottom: '1px solid var(--gold-dim)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '2.5rem', top: '30%', width: 1, height: '45%', background: 'linear-gradient(to bottom, transparent, var(--gold-dim2), transparent)' }} />
        <div className="container">
          <p className="label" style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '1px solid var(--gold-dim2)', color: 'var(--gold)', opacity: 0.7 }}>
            Get in Touch
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', fontWeight: 300, lineHeight: 0.92, marginBottom: '2rem', color: 'var(--white)' }}>
            Let's Build Something{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>World-Class</em>
          </h1>
          <p className="serif" style={{ fontStyle: 'italic', fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', color: 'rgba(246,244,238,0.65)', lineHeight: 1.7, maxWidth: '58ch' }}>
            Ready to transform your fintech platform or digital business? Tell us about your project and we'll craft a premium strategy tailored specifically for your goals.
          </p>
        </div>
      </section>

      {/* ── Main two-column layout ───────────────────────────── */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '6rem', alignItems: 'start' }}>

            {/* ── Left column ──────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

              {/* Intro */}
              <div>
                <p className="label" style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.65 }}>Start the Conversation</p>
                <h2 className="serif" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1.25rem', color: 'var(--white)' }}>
                  Work With Kasim
                </h2>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '1rem', color: 'rgba(246,244,238,0.68)', lineHeight: 1.72, margin: 0 }}>
                  Whether you need a fintech dashboard, crypto exchange platform, AI automation system, financial SEO strategy, or a complete brand identity — elite results for your business worldwide.
                </p>
              </div>

              {/* Contact method rows */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {CONTACT_METHODS.map((m, i) => (
                  <a
                    key={m.label}
                    href={m.href}
                    target={m.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      display: 'grid', gridTemplateColumns: '40px 1fr auto',
                      alignItems: 'center', gap: '1rem',
                      padding: '1rem 0',
                      borderBottom: '1px solid var(--gold-dim)',
                      borderTop: i === 0 ? '1px solid var(--gold-dim)' : 'none',
                      textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {/* Icon */}
                    <div style={{ width: 36, height: 36, border: '1px solid var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(212,175,55,0.55)', flexShrink: 0 }}>
                      {m.icon}
                    </div>
                    {/* Label + value */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                        <span className="sans" style={{ fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey)', opacity: 0.6 }}>{m.label}</span>
                        {m.badge && (
                          <span style={{ fontSize: '0.44rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4adec1', padding: '0.1rem 0.35rem', border: '1px solid rgba(74,222,193,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>{m.badge}</span>
                        )}
                      </div>
                      <span className="sans" style={{ fontSize: '0.85rem', color: 'rgba(246,244,238,0.72)' }}>{m.display}</span>
                    </div>
                    {/* Arrow */}
                    <span style={{ color: 'var(--gold-dim2)', fontSize: '0.75rem' }}>→</span>
                  </a>
                ))}
              </div>

              {/* Availability panel */}
              <div style={{ border: '1px solid var(--gold-dim)', background: 'rgba(212,175,55,0.03)', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                  <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#4adec1' }} />
                    <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid rgba(74,222,193,0.35)', animation: 'avail-pulse 1.8s ease-in-out infinite' }} />
                  </div>
                  <span className="sans" style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4adec1', fontWeight: 500 }}>Currently Available</span>
                </div>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'rgba(246,244,238,0.65)', lineHeight: 1.68, margin: 0 }}>
                  Accepting new fintech and digital projects. Response time under 24 hours. Premium slots fill quickly — reach out early to secure yours.
                </p>
              </div>

              {/* Quick-contact pills */}
              <div>
                <p className="label" style={{ marginBottom: '0.85rem', color: 'var(--grey)', opacity: 0.55 }}>Quick Contact</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {QUICK_LINKS.map(l => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank" rel="noopener noreferrer"
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
                      <span style={{ opacity: 0.75 }}>{l.icon}</span>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Engagement Pipeline mockup */}
              <div>
                <p className="label" style={{ marginBottom: '0.85rem', color: 'var(--grey)', opacity: 0.55 }}>What Happens Next</p>
                <EngagementPipeline />
              </div>
            </div>

            {/* ── Right column — form ───────────────────────── */}
            <div style={{ border: '1px solid var(--gold-dim)', background: 'var(--black-2)' }}>
              {/* Form header */}
              <div style={{ padding: '2rem 2rem 1.5rem', borderBottom: '1px solid var(--gold-dim)' }}>
                <h2 className="serif" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 300, color: 'var(--white)', marginBottom: '0.5rem' }}>
                  Submit Your Project Brief
                </h2>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'rgba(246,244,238,0.55)', lineHeight: 1.6, margin: 0 }}>
                  Fill in the details below and Kasim will respond within 24 hours with a tailored strategy for your business.
                </p>
              </div>

              {success ? (
                /* ── Success state ── */
                <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, border: '1px solid rgba(212,175,55,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    {Icons.check}
                  </div>
                  <h3 className="serif" style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--gold)', marginBottom: '0.75rem' }}>
                    Message Received
                  </h3>
                  <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'rgba(246,244,238,0.65)', lineHeight: 1.72, marginBottom: '1.5rem', maxWidth: '38ch', margin: '0 auto 1.5rem' }}>
                    Thank you! Kasim will personally review your project brief and respond within 24 hours.
                  </p>
                  <p className="sans" style={{ fontSize: '0.65rem', color: 'var(--grey)', letterSpacing: '0.06em' }}>
                    For instant support — WhatsApp{' '}
                    <a href="https://wa.me/2347080083489" target="_blank" rel="noopener noreferrer"
                      style={{ color: '#4adec1', textDecoration: 'none' }}>
                      +234 708 008 3489
                    </a>
                  </p>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                  {/* Name row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="First Name" required>
                      <input name="firstName" required style={inputStyle(focused === 'firstName')}
                        onFocus={foc('firstName')} onBlur={blur}
                        placeholder="Alejandro" />
                    </Field>
                    <Field label="Last Name" required>
                      <input name="lastName" required style={inputStyle(focused === 'lastName')}
                        onFocus={foc('lastName')} onBlur={blur}
                        placeholder="Martinez" />
                    </Field>
                  </div>

                  <Field label="Email Address" required>
                    <input name="email" type="email" required style={inputStyle(focused === 'email')}
                      onFocus={foc('email')} onBlur={blur}
                      placeholder="alejandro@wealthvaultcapital.com" />
                  </Field>

                  <Field label="Phone / WhatsApp">
                    <input name="phone" type="tel" style={inputStyle(focused === 'phone')}
                      onFocus={foc('phone')} onBlur={blur}
                      placeholder="+1 555 000 0000" />
                  </Field>

                  <Field label="Company / Brand Name">
                    <input name="company" style={inputStyle(focused === 'company')}
                      onFocus={foc('company')} onBlur={blur}
                      placeholder="Wealth Vault Capital (optional)" />
                  </Field>

                  <Field label="Service Required" required>
                    <div style={{ position: 'relative' }}>
                      <select name="service" required
                        style={{ ...inputStyle(focused === 'service'), paddingRight: '2.5rem', cursor: 'pointer', color: 'var(--white)' }}
                        onFocus={foc('service')} onBlur={blur}
                        defaultValue="">
                        <option value="" disabled style={{ background: 'var(--black-3,#141417)', color: 'var(--grey)' }}>Select a service…</option>
                        {SERVICES.map(s => (
                          <option key={s} value={s} style={{ background: 'var(--black-3,#141417)', color: 'var(--white)' }}>{s}</option>
                        ))}
                      </select>
                      {/* Custom chevron */}
                      <svg width="10" height="6" viewBox="0 0 10 6" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <path d="M1 1l4 4 4-4" stroke="rgba(212,175,55,0.5)" strokeWidth="1.2" fill="none"/>
                      </svg>
                    </div>
                  </Field>

                  <Field label="Budget Range" required>
                    <div style={{ position: 'relative' }}>
                      <select name="budget" required
                        style={{ ...inputStyle(focused === 'budget'), paddingRight: '2.5rem', cursor: 'pointer', color: 'var(--white)' }}
                        onFocus={foc('budget')} onBlur={blur}
                        defaultValue="">
                        <option value="" disabled style={{ background: 'var(--black-3,#141417)', color: 'var(--grey)' }}>Select a budget range…</option>
                        {BUDGETS.map(b => (
                          <option key={b} value={b} style={{ background: 'var(--black-3,#141417)', color: 'var(--white)' }}>{b}</option>
                        ))}
                      </select>
                      <svg width="10" height="6" viewBox="0 0 10 6" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <path d="M1 1l4 4 4-4" stroke="rgba(212,175,55,0.5)" strokeWidth="1.2" fill="none"/>
                      </svg>
                    </div>
                  </Field>

                  <Field label="Project Details" required>
                    <textarea name="details" required rows={5}
                      style={{ ...inputStyle(focused === 'details'), resize: 'vertical', minHeight: 120 }}
                      onFocus={foc('details')} onBlur={blur}
                      placeholder="Describe your project, goals, timeline, and any specific requirements…" />
                  </Field>

                  {/* Error message */}
                  {error && (
                    <p className="sans" style={{ fontSize: '0.65rem', color: '#e05c5c', margin: 0 }}>
                      Something went wrong. Please try again or contact directly via WhatsApp.
                    </p>
                  )}

                  {/* Submit */}
                  <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--gold-dim)' }}>
                    <button type="submit" className="btn-primary"
                      disabled={submitting}
                      style={{ width: '100%', textAlign: 'center', opacity: submitting ? 0.7 : 1, transition: 'opacity 0.2s' }}>
                      {submitting ? 'Sending…' : 'Send Project Brief →'}
                    </button>
                    <p className="sans" style={{ fontSize: '0.55rem', letterSpacing: '0.06em', color: 'rgba(154,152,143,0.45)', textAlign: 'center', marginTop: '0.85rem', lineHeight: 1.5 }}>
                      We reply within 24 hours. All information is kept strictly confidential.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes avail-pulse { 0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.5);opacity:0} }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 4rem !important; } }
        select option { background: #0e0e11; }
      `}</style>
    </main>
  )
}
