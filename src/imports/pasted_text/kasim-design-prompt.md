# Master Design Prompt — Kasim Elite Digital Global
*Paste this whole document into Figma Make to redesign kasimempire.com end-to-end.*

---

## 1. Brief

Redesign the full website for **Kasim Elite Digital Global**, a premium digital services agency based in Nigeria serving fintech, crypto, and global enterprise clients. The site must read as a **world-class, high-end studio** — the kind of visual and interaction quality a client would expect from a $50k+ agency, not a template.

Direction: **classical luxury meets modern fintech.** Think a private members' club crossed with a trading terminal — serif elegance for headlines, precise sans-serif structure for data and UI, near-black backgrounds, restrained gold accents, and **working, interactive product mockups embedded directly in the page** (not static screenshots) — this is the signature move that must appear on every major page.

---

## 2. Design Tokens

**Color**
- `--black: #08080a` — primary background
- `--black-2: #0e0e11` — secondary panel background
- `--gold: #d4af37` — primary accent
- `--gold-soft: #e8cf7a` — highlight/italic accent
- `--gold-dim: rgba(212,175,55,0.35)` — borders, hairlines
- `--white: #f6f4ee` — primary text (warm white, never pure #fff)
- `--grey: #9a988f` — body copy
- `--teal-accent: #4adec1` — used only inside dashboard/data mockups, never in main UI

**Typography**
- Display/headline: **Cormorant Garamond** (italic used sparingly for one emphasized word per headline)
- Body/UI: **Outfit**, weights 300–600
- Numerals in data mockups may use the serif face for a "ledger" feel (e.g. `$248,750`)

**Layout principles**
- Generous negative space; sections breathe (90–120px vertical padding)
- Hairline gold borders (`1px solid rgba(212,175,55,0.16)`) as the primary structural device — no drop shadows, no rounded-corner cards
- Numbering (01, 02, 03…) only where content is a genuine sequence (service verticals, process steps) — never decorative
- Mobile-first, but the design should feel equally intentional on desktop (not just a stretched mobile layout)

---

## 3. The Signature Element (must appear site-wide)

Every major page includes **at least one live, interactive interface mockup** — a real working component, not a flat image — that dramatizes what the agency actually builds. Examples already proven to work:

- **FinVault Dashboard** — a fintech portfolio widget with animated counters, a live-looking bar chart, and delta indicators (used on homepage/services as proof-of-craft for fintech work)
- **AI Video Studio** — a video editor mockup with a play button, progress bar, tool icons (palette, scissors, music, notes), and spec chips (4K, 60fps, AI Enhanced)

Extend this same pattern to other verticals so each service section can eventually host its own live mini-demo:
- Marketing Campaigns → a campaign analytics widget (CTR, spend, conversions ticking up)
- Motion Design → a timeline/keyframe scrubber mockup
- Copywriting → a "before/after" copy transformation panel
- Translation → a language-switcher preview panel

These mockups are what makes the site feel unlike anything a competitor has — treat them as real UI, with hover states, subtle motion, and believable data, not illustrations.

---

## 4. Site Structure

1. **Home** — hero thesis statement, trust bar, service preview (linking to the 9 verticals below), one flagship interactive mockup, process, testimonials, pricing teaser, final CTA
2. **Services** — full breakdown of all 9 verticals in this exact order:
   1. Website Development
   2. Fintech & Crypto Web Design
   3. Marketing Campaigns
   4. AI Automation & Advanced Workflows
   5. Motion Design
   6. AI Video Creation & Photo Editing
   7. Expert Copywriting
   8. Multilingual Translation Services
   9. Financial Brand Identity Design
3. **About** — founder story, agency positioning, why fintech/crypto specialization
4. **Portfolio** — case studies, each with its own live mockup where possible
5. **Contact** — form (Formspree), direct contact methods
6. **Store** — digital products for sale

---

## 5. Interaction & Motion

- Sticky nav, blurred background on scroll
- Numbered index rail on the Services page — a horizontal scrollable strip of all 9 verticals (01–09) that jumps to each section, since the order itself communicates priority
- Scroll-triggered reveals on section entry, subtle (8–12px translate + fade), never bouncy
- Hover states on every CTA: gold fill or gap-widening arrow, 250ms ease
- Respect `prefers-reduced-motion`
- Visible keyboard focus states throughout

---

## 6. Tone of Voice

Confident, precise, no filler. Copy speaks to fintech founders and enterprise clients who expect competence signaled through restraint, not hype-words. Every service description: one sentence of positioning + a 5-item capability list + one active-verb CTA (e.g. "Launch Your Website," "Automate Everything," "Build Your Brand").

---

## 7. What "done" looks like

- Every page uses the same token system — no page should look like it belongs to a different brand
- At least one live interactive mockup per major page
- Fully responsive down to a 375px mobile viewport
- No AI-template tells: no cream background + terracotta accent, no generic acid-green-on-black, no default rounded-corner SaaS cards