import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section id="contact" className="section-lg" style={{ borderTop: '1px solid var(--gold-dim)', textAlign: 'center', background: 'var(--black-2)' }}>
      <div className="container" style={{ maxWidth: 680 }}>
        <p className="label" style={{ marginBottom: '2rem', color: 'var(--gold)', opacity: 0.65 }}>Get Started</p>
        <h2 className="serif" style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 300, lineHeight: 0.95, marginBottom: '1.75rem', color: 'var(--white)' }}>
          Ready To Scale{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Globally?</em>
        </h2>
        <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--grey)', lineHeight: 1.65, marginBottom: '3rem' }}>
          Join the network of elite financial brands operating at global scale.
        </p>

        {done ? (
          <p className="serif" style={{ fontStyle: 'italic', fontSize: '1rem', color: 'var(--grey)', padding: '1.5rem 0', borderTop: '1px solid var(--gold-dim)', borderBottom: '1px solid var(--gold-dim)' }}>
            Thank you — a senior director will be in touch within 24 hours.
          </p>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true) }}
            style={{ display: 'flex', gap: 0, maxWidth: 440, marginTop: 0, marginRight: 'auto', marginBottom: 0, marginLeft: 'auto' }}
          >
            <input
              type="email"
              placeholder="Corporate email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ flex: 1, borderBottom: '1px solid var(--gold-dim)', borderRight: 'none', fontStyle: 'italic' }}
            />
            <button type="submit" className="btn-primary" style={{ flexShrink: 0 }}>Engage</button>
          </form>
        )}

        <p className="label" style={{ marginTop: '2rem', fontSize: '0.52rem', opacity: 0.4 }}>
          All enquiries confidential · NDA on request
        </p>
      </div>
    </section>
  )
}
