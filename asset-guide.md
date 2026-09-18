# KASIM ELITE DIGITAL — ASSET GUIDE

Single source of truth for every image in the kasimempire.com repo.
Rule: **rename before upload.** No spaces, no em-dashes (—), no "@2x",
no "(1)". Lowercase, hyphens only. This is what caused the earlier
image mismatches on GitHub.

---

## 1. FOLDER STRUCTURE

```
/assets
  /img
    /brand      → logo, founder portraits
    /mockups    → concept UI mockups (portfolio + services)
    /hero       → hero background images
```

All paths in HTML are written from the repo root, e.g.
`assets/img/mockups/concept-blocktrade-exchange.webp`

---

## 2. RENAME MAP (Downloads → repo)

Rename these on the laptop FIRST, then upload.

| Current file in Downloads              | Rename to                             | Goes in          |
|----------------------------------------|---------------------------------------|------------------|
| Home — hero@2x.png                     | hero-home.webp                        | assets/img/hero  |
| Website hero@2x.png                    | hero-website.webp                     | assets/img/hero  |
| Services overview@2x.png               | services-overview.webp                | assets/img/hero  |
| Concept BlockTrade Exchange@2x.png     | concept-blocktrade-exchange.webp      | assets/img/mockups |
| Concept Fintech UI system@2x.png       | concept-fintech-ui-system.webp        | assets/img/mockups |
| Concept Fintech website system@2x.png  | concept-fintech-website-system.webp   | assets/img/mockups |
| Concept AI automation pipeline@2x.png  | concept-ai-automation-pipeline.webp   | assets/img/mockups |
| Concept Motion identity@2x.png         | concept-motion-identity.webp          | assets/img/mockups |
| Concept Multilingual platform@2x.png   | concept-multilingual-platform.webp    | assets/img/mockups |

Delete the duplicate `Concept AI automation pipeline@2x (1).png` — keep
only one. The `Gemini_Generated_Image_*.png` files are unsorted; rename
them by what they show before they go anywhere near the repo.

---

## 3. COMPRESS BEFORE UPLOAD (not optional)

The PNGs are 1,000–2,400 KB each. Nine of them is roughly 15 MB, which
will make the site load slowly on Nigerian mobile data and hurt the
Core Web Vitals score.

1. Go to squoosh.app (free, works in browser, no install)
2. Drop the PNG in
3. Right panel → format **WebP**, quality **80**
4. Download — expect 120–250 KB per file, ~90% smaller
5. Save with the new name from the table above

Target: no image over 300 KB. Hero images can go to 400 KB max.

---

## 4. WHERE EACH IMAGE IS USED

**hero-home.webp** — index.html, hero section background
**hero-website.webp** — services.html hero
**services-overview.webp** — services.html intro / index.html services teaser

**Portfolio case studies** (portfolio.html) and the matching service
sections (services.html):

| Image                               | Case study / service section        |
|-------------------------------------|-------------------------------------|
| concept-blocktrade-exchange.webp    | BlockTrade Exchange — fintech/crypto |
| concept-fintech-ui-system.webp      | Fintech UI system                   |
| concept-fintech-website-system.webp | Fintech website system              |
| concept-ai-automation-pipeline.webp | AI Automation & Workflows           |
| concept-motion-identity.webp        | Neonex — Motion Design              |
| concept-multilingual-platform.webp  | GlobalShop — Multilingual Translation |

All six are **concept work, not client results.** Every card using them
must carry a "Concept" label.

---

## 5. HTML REFERENCE PATTERN

Copy this exact shape. Always include width, height, alt, and lazy
loading — it stops layout shift and speeds up first paint.

```html
<img
  src="assets/img/mockups/concept-blocktrade-exchange.webp"
  alt="BlockTrade Exchange — concept fintech trading interface"
  width="1200"
  height="750"
  loading="lazy"
  decoding="async"
  class="case-visual"
/>
```

Hero images only: use `loading="eager"` and `fetchpriority="high"`
instead, since they are above the fold.

Alt text rule: describe what is shown plus the word "concept" for
mockups. Never leave alt empty on a portfolio image.

---

## 6. BRAND ASSETS — DO NOT ALTER

| File                          | Use                                  |
|-------------------------------|--------------------------------------|
| assets/img/brand/logo.webp    | nav + footer                         |
| assets/img/brand/kasim-gold-suit.webp  | index.html hero portrait    |
| assets/img/brand/kasim-full-body.webp  | about.html only             |

The gold-suit portrait belongs on Home. The full-body portrait belongs
on About. Never swap them, never recolour, never crop the logo.

---

## 7. UPLOAD CHECKLIST

Before every push:

- [ ] Filename is lowercase-with-hyphens, no spaces or symbols
- [ ] Converted to WebP, under 300 KB
- [ ] Sits in the correct /assets/img subfolder
- [ ] `src` path in the HTML matches the filename **exactly**,
      including case (GitHub + Vercel are case-sensitive; Windows is not,
      so a file that works locally can still 404 live)
- [ ] width, height, alt and loading attributes present
- [ ] Opened the live Vercel URL and confirmed the image renders

---

## 8. BRAND TOKENS (reference)

```css
--bg-primary:   #050505;
--bg-secondary: #0a0a0a;
--gold-primary: #D4AF37;
--gold-light:   #FFDF00;
--royal-blue:   #1E3A8A;
--accent-blue:  #3B82F6;
--text-main:    #FFFFFF;
--text-muted:   #9CA3AF;
```

Any image overlay, gradient, or border drawn over a mockup uses these
values only.
