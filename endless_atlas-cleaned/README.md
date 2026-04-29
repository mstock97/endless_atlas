# Endless Atlas

A travel journalism site built with modular, token-driven CSS.

## CSS Architecture

All stylesheets must be loaded in this order. Each file depends on the tokens defined in `theme.css`.

| File | Purpose |
|------|---------|
| `theme.css` | Design tokens: colors, fonts, spacing, radii, shadows, z-index, transitions |
| `typography.css` | Global h1–h6 scale, `.prose` container, text utility classes |
| `layout.css` | Reset, body base, containers, grid utilities, article three-column layout |
| `components.css` | All UI components: buttons, hero, geo pin, cards, destination page patterns, widgets |
| `navigation.css` | Site header, nav links, dropdowns, mobile menu |
| `footer.css` | Footer grid, columns, newsletter signup, bottom bar |
| `animations.css` | Keyframes, entrance classes, scroll-reveal, reduced-motion override |

### `main.css` — Compatibility Bridge

Pages that still reference `/main.css` are covered — it imports all seven files above via `@import`. New pages should link the individual files directly in `<head>`.

## Color Palette

All values live in `theme.css` as CSS custom properties. The canonical values are:

```
--forest:    #1E4034  (dark forest green — primary)
--canopy:    #2D6A4F  (mid green — hover states)
--moss:      #52B788  (light green — highlights/CTAs)
--ink:       #0F0F0F  (near-black — primary text)
--graphite:  #3D3D3D  (dark grey — secondary text)
--ash:       #8C8C8C  (mid grey — labels, meta)
--paper:     #F7F5F0  (warm white — page background)
```

## Font Stack

- **Playfair Display** (`--font-editorial`) — article headings, editorial titles
- **DM Sans** (`--font-body`) — body text, UI elements, labels
- **Bebas Neue** (`--font-display`) — destination hero titles, impact display text

All three are imported from Google Fonts in `theme.css`.

## Page Structure

### Home page (`index.html`)
Links the 7 split CSS files directly. No inline styles.

### Destination pages (`destinations/japan/`)
Link the 7 split CSS files. All page-specific styles absorbed into `components.css` and `layout.css`. No inline `<style>` blocks.

### JavaScript components
- `components.js` — Injects shared header and footer into every page via `#site-header` and `#site-footer` divs.
- `destinations/japan/japan-components.js` — Injects the Japan sub-navigation bar into `#japan-sub-header` divs on all Japan section pages.

## Key Component Classes

### Destination Hero (photo full-bleed)
```html
<section class="dest-hero" id="heroContainer">
  <img class="dest-hero__image img-low-res" ...>
  <h1 class="dest-hero__title">JAPAN</h1>
  <div class="geo-pin" ...>...</div>
  <div class="location-strip" ...>...</div>
</section>
```
Add `dest-hero--tall` for the taller city-page variant.

### Destination Content Grid
```html
<main class="dest-main">
  <div class="content-grid">
    <article class="main-column">...</article>
    <aside class="support-column">...</aside>
  </div>
</main>
```
Add `content-grid--wide` for the 8fr / 2fr article layout.

### Quick Facts
```html
<div class="quick-facts">
  <div class="fact-cell">
    <span class="fact-label">Capital</span>
    <div class="fact-value">Tokyo</div>
  </div>
</div>
```

### Geo Pin (inline pill variant for article images)
Use `.location-strip--pill` instead of `.location-strip` for the compact floating pill style.

### Prose Container
Wrap any rich text content in `.prose` for properly styled headings, paragraphs, blockquotes, lists, and callout boxes:
```html
<div class="prose">
  <h2>Section heading</h2>
  <p>Body text...</p>
  <div class="info-box">
    <p class="info-box-title">Good to know</p>
    <p>Callout text...</p>
  </div>
</div>
```
