import { useNav } from '../context/nav'
import logoImg from '../imports/769144591_122221184096317965_8028717873563769994_n-1.jpg'

const SERVICES = [
  'Website Development',
  'Fintech & Crypto Web Design',
  'Marketing Campaigns',
  'AI Automation & Workflows',
  'Motion Design',
  'AI Video Creation',
  'Expert Copywriting',
  'Translation Services',
  'Brand Identity Design',
]

const PRODUCTS = [
  'Fintech Website Template',
  'Brand Identity System',
  'SEO Domination Guide',
  'AI Automation Starter Kit',
  'Facebook Ads Blueprint',
  'Social Media Playbook',
  'Complete Bundle ($99)',
]

const COMPANY = ['About', 'Portfolio', 'Store', 'Contact']
const LEGAL   = ['Privacy', 'Terms', 'NDA']

export default function Footer() {
  const { navigate } = useNav()

  return (
    <footer style={{ borderTop: '1px solid var(--gold-dim)', paddingTop: '5rem', paddingBottom: '2.5rem', background: 'var(--black)' }}>
      <div className="container">
        {/* Main link columns */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1.1fr', gap: '3.5rem', marginBottom: '4rem' }}>

          {/* Brand block */}
          <div>
            <button onClick={() => navigate('home')} style={{ padding: 0, lineHeight: 0, marginBottom: '1.25rem', display: 'inline-block' }}>
              <img
                src={logoImg}
                alt="Kasim Elite Digital Global"
                style={{ height: 64, width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </button>
            <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--grey)', lineHeight: 1.7, maxWidth: '24ch', opacity: 0.65, marginBottom: '1.75rem' }}>
              Premium fintech &amp; digital solutions for the global financial elite.
            </p>
            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="mailto:magajiqaseem@gmail.com" className="sans" style={{ fontSize: '0.65rem', color: 'rgba(154,152,143,0.5)', letterSpacing: '0.03em', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(154,152,143,0.5)')}>
                magajiqaseem@gmail.com
              </a>
              <a href="https://wa.me/2347080083489" target="_blank" rel="noopener noreferrer" className="sans" style={{ fontSize: '0.65rem', color: 'rgba(154,152,143,0.5)', letterSpacing: '0.03em', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(154,152,143,0.5)')}>
                +234 708 008 3489
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--gold)', opacity: 0.55 }}>Services</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {SERVICES.map(l => (
                <li key={l}>
                  <button onClick={() => navigate('services')} className="serif"
                    style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(154,152,143,0.5)', transition: 'color 0.18s', textAlign: 'left' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--white)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(154,152,143,0.5)')}>
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--gold)', opacity: 0.55 }}>Products</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {PRODUCTS.map(l => (
                <li key={l}>
                  <button onClick={() => navigate('store')} className="serif"
                    style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(154,152,143,0.5)', transition: 'color 0.18s', textAlign: 'left' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--white)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(154,152,143,0.5)')}>
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Legal */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--gold)', opacity: 0.55 }}>Company</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
              {COMPANY.map(l => (
                <li key={l}>
                  <button className="serif"
                    style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(154,152,143,0.5)', transition: 'color 0.18s', textAlign: 'left' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--white)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(154,152,143,0.5)')}>
                    {l}
                  </button>
                </li>
              ))}
            </ul>
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--gold)', opacity: 0.55 }}>Legal</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {LEGAL.map(l => (
                <li key={l}>
                  <button className="serif"
                    style={{ fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(154,152,143,0.5)', transition: 'color 0.18s', textAlign: 'left' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--white)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(154,152,143,0.5)')}>
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--gold)', opacity: 0.55 }}>Get in Touch</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { label: 'Email',        href: 'mailto:magajiqaseem@gmail.com', text: 'magajiqaseem@gmail.com' },
                { label: 'WhatsApp',     href: 'https://wa.me/2347080083489',   text: '+234 708 008 3489' },
                { label: 'Upwork',       href: 'https://www.upwork.com/freelancers/your-profile', text: 'Hire on Upwork' },
                { label: 'Facebook',     href: '#', text: 'Facebook' },
                { label: 'LinkedIn',     href: '#', text: 'LinkedIn' },
              ].map(link => (
                <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="sans"
                  style={{ fontSize: '0.7rem', color: 'rgba(154,152,143,0.5)', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.1rem', transition: 'color 0.18s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--white)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(154,152,143,0.5)')}>
                  <span style={{ fontSize: '0.46rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(154,152,143,0.3)' }}>{link.label}</span>
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="rule" style={{ marginBottom: '1.75rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span className="sans" style={{ fontSize: '0.57rem', letterSpacing: '0.1em', color: 'rgba(154,152,143,0.32)' }}>
            © 2026 Kasim Elite Digital Global. All Rights Reserved.
          </span>
          <span className="serif" style={{ fontSize: '0.72rem', fontStyle: 'italic', color: 'rgba(154,152,143,0.22)' }}>
            Designed &amp; Built by Kasim M.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (max-width: 680px)  { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; } }
        @media (max-width: 420px)  { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
