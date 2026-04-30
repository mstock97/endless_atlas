# Endless Atlas — CSS Reference

A travel journalism site built with a modular, token-driven CSS system. Every visual
property on every page is controlled by one of the seven CSS files below. No page
should ever contain an inline `<style>` block. If something looks wrong, the fix
belongs in a CSS file — one change then propagates everywhere automatically.

---

## Table of Contents

1. [File Architecture](#1-file-architecture)
2. [How to Link the CSS](#2-how-to-link-the-css)
3. [Design Tokens — theme.css](#3-design-tokens--themecss)
4. [Typography — typography.css](#4-typography--typographycss)
5. [Layout — layout.css](#5-layout--layoutcss)
6. [Components — components.css](#6-components--componentscss)
7. [Navigation — navigation.css](#7-navigation--navigationcss)
8. [Footer — footer.css](#8-footer--footercss)
9. [Animations — animations.css](#9-animations--animationscss)
10. [Page Templates](#10-page-templates)
11. [Rules for AI Assistants](#11-rules-for-ai-assistants)

---

## 1. File Architecture

Seven files. Every file depends on `theme.css`. Load them in this order every time.

| # | File | What lives here |
|---|------|-----------------|
| 1 | `theme.css` | Design tokens only: colors, fonts, spacing, radii, shadows, z-index, transitions |
| 2 | `typography.css` | Global heading scale, the `.prose` rich-text container, standalone text utility classes |
| 3 | `layout.css` | CSS reset, body base, containers, grid systems, section utilities, article page layout |
| 4 | `components.css` | Every UI component: buttons, heroes, cards, geo pins, destination page patterns, widgets |
| 5 | `navigation.css` | Site header, nav links, dropdowns, mobile hamburger menu |
| 6 | `footer.css` | Footer grid, link columns, newsletter form, bottom bar |
| 7 | `animations.css` | Keyframes, entrance animation classes, scroll-reveal system, reduced-motion override |

**`main.css`** is a compatibility bridge — it `@import`s all seven files in order so
pages that still reference `/main.css` continue to work. New pages should always link
the seven files directly.

---

## 2. How to Link the CSS

Every page `<head>` should contain exactly these seven link tags, in this order, with
no `<style>` blocks anywhere on the page.

```html
<link rel="stylesheet" href="/theme.css">
<link rel="stylesheet" href="/typography.css">
<link rel="stylesheet" href="/layout.css">
<link rel="stylesheet" href="/components.css">
<link rel="stylesheet" href="/navigation.css">
<link rel="stylesheet" href="/footer.css">
<link rel="stylesheet" href="/animations.css">
```

---

## 3. Design Tokens — `theme.css`

All values are CSS custom properties on `:root`. Reference them anywhere with
`var(--token-name)`. Never hardcode a hex color, pixel value, or font name
directly in HTML or other CSS files — use a token.

### Fonts

Three typefaces. Each has a token and a clear use case.

| Token | Typeface | Use case |
|-------|----------|----------|
| `--font-editorial` | Playfair Display (serif) | Article titles, section headings, editorial pull quotes |
| `--font-body` | DM Sans (sans-serif) | All body text, UI labels, navigation, captions, metadata |
| `--font-display` | Bebas Neue (display) | Destination hero titles only (JAPAN, TOKYO etc.) |

**Applying fonts directly in CSS:**
```css
.my-element { font-family: var(--font-editorial); }
.my-element { font-family: var(--font-body); }
.my-element { font-family: var(--font-display); }
```

All three are imported from Google Fonts inside `theme.css`. No additional
`@import` or `<link>` tags are needed anywhere else.

### Color Palette

**Core greens** — the brand identity:
```
--forest:    #1E4034   Dark forest green. Primary brand color. Headings, borders, CTAs.
--canopy:    #2D6A4F   Mid green. Hover states, active elements.
--moss:      #52B788   Light green. Highlights, accent dots, CTA buttons, list markers.
--sage:      #95D5B2   Pale green. Subtle tints, decorative accents.
```

**Neutrals** — text and surfaces:
```
--ink:       #0F0F0F   Near-black. Primary body text.
--graphite:  #3D3D3D   Dark grey. Secondary text, subheadings.
--stone:     #5C5346   Warm brown-grey. Muted text, captions.
--ash:       #8C8C8C   Mid grey. Labels, meta text, photo captions.
--cloud:     #EFEFEF   Light grey. Dividers, borders between items.
--warm-rule: #EAE6DB   Warm off-white. Section borders, rule lines.
--fog:       #C9D4C5   Green-tinted mist. Subtle decorative elements.
--paper:     #F7F5F0   Warm white. Default page background.
--white:     #FFFFFF   Pure white. Cards, widget backgrounds.
```

**Accents:**
```
--driftwood:  #A8896A   Warm tan. Secondary accent, hero card gradients.
--sand:       #E9D8C4   Light sand. Tint backgrounds.
--terracotta: #C4654A   Warm red-orange. Warning callout boxes.
```

**Tinted surfaces** — pre-built opacity variants for overlay use:
```
--forest-06  --forest-08  --forest-10  --forest-15  --forest-20
--moss-08    --moss-12    --moss-20
--ink-60
--white-10   --white-15   --white-60   --white-70
```

### Spacing Scale

All spacing uses a named scale. Use these instead of arbitrary pixel values.
```
--space-1:  0.25rem   ( 4px)
--space-2:  0.5rem    ( 8px)
--space-3:  0.75rem   (12px)
--space-4:  1rem      (16px)
--space-5:  1.25rem   (20px)
--space-6:  1.5rem    (24px)
--space-8:  2rem      (32px)
--space-10: 2.5rem    (40px)
--space-12: 3rem      (48px)
--space-16: 4rem      (64px)
--space-20: 5rem      (80px)
--space-24: 6rem      (96px)
```

### Type Scale

```
--text-xs:   0.70rem    Micro labels, fine print
--text-sm:   0.80rem    Secondary meta, captions
--text-base: 0.875rem   Default UI text
--text-md:   1rem       Standard body
--text-lg:   1.1rem     Slightly large body
--text-xl:   1.2rem     Card titles, small headings
--text-2xl:  1.6rem     Mid-size headings
--text-3xl:  2rem       Large headings
--text-4xl:  2.5rem     Display headings
--text-5xl:  3rem       Hero headings
```

### Other Tokens

**Border radius:**
```
--radius-xs: 4px    --radius-sm: 6px    --radius-md: 10px
--radius-lg: 16px   --radius-xl: 28px   --radius-full: 9999px (pill shape)
```

**Shadows:**
```
--shadow-soft   Subtle card resting state
--shadow-card   Standard card elevation
--shadow-hover  Card or element on hover
--shadow-modal  Overlay panels, modals
```

**Transitions:**
```
--transition:        0.22s ease             Standard UI interaction
--transition-slow:   0.4s ease              Image reveals, panel opens
--transition-spring: 0.3s cubic-bezier(...)  Springy micro-interactions
```

**Z-index scale:**
```
--z-base:      1    Normal stacking
--z-raised:    10   Elevated elements within a section
--z-japan-bar: 200  Country sub-navigation bar
--z-nav:       300  Main site header (always on top of content)
--z-dropdown:  400  Dropdown menus (above nav links)
--z-modal:     500  Modals and overlays
--z-toast:     600  Toast notifications (topmost)
```

---

## 4. Typography — `typography.css`

### Global Heading Scale

These apply automatically to bare `h1`-`h6` tags anywhere on the page. All use
`--font-editorial` (Playfair Display) by default.

| Tag | Size | Notes |
|-----|------|-------|
| `h1` | clamp(2.25rem to 3rem) | Page-level title |
| `h2` | clamp(1.8rem to 2.5rem) | Major section heading |
| `h3` | clamp(1.4rem to 1.6rem) | Sub-section heading |
| `h4` | 1.2rem | Minor heading |
| `h5` | 1rem, DM Sans, uppercase | Label-style heading |
| `h6` | 0.875rem, DM Sans, uppercase, graphite | Smallest label heading |

**Important:** `.dest-section-title` overrides the global `h2` to use Bebas Neue
instead. This is intentional — see the Components section.

### The `.prose` Container

Wrap any long-form rich text in `.prose`. It applies cohesive styles to every
child element so you never need to add classes inside the content itself.

```html
<div class="prose">
  <h2>Section Heading</h2>
  <p>Body text with <strong>bold</strong> and <a href="#">links</a>.</p>
  <h3>Sub-section</h3>
  <p>More text.</p>
  <ul>
    <li>List item one</li>
    <li>List item two</li>
  </ul>
  <blockquote>
    A pull quote goes here.
    <cite>Author Name</cite>
  </blockquote>
  <hr>
  <figure>
    <img src="photo.jpg" alt="Description">
    <figcaption>Photo caption text</figcaption>
  </figure>
</div>
```

**What `.prose` styles automatically:**
- `h2` — Playfair Display, forest green, top margin, tight line-height
- `h3` — Playfair Display, slightly smaller, snug line-height
- `p` — prose line-height (1.85), bottom margin
- `a` — forest green, underline, hover transitions
- `strong` — ink color, semi-bold weight
- `ul` / `ol` — left padding, bottom margin; `ul` markers are moss green, `ol` markers are forest green
- `li` — relaxed line-height, bottom gap
- `blockquote` — left moss border, italic Playfair Display, forest-tinted background
- `cite` inside blockquote — small DM Sans, graphite
- `hr` — warm-rule border, generous vertical margin
- `img` — full width, rounded corners, vertical margin
- `figure` — vertical margin wrapper
- `figcaption` — small, centered, italic, graphite

**Callout boxes inside `.prose`:**

```html
<!-- Information callout (blue-tinted) -->
<div class="info-box">
  <p class="info-box-title">Good to know</p>
  <p>Callout text here.</p>
</div>

<!-- Tip callout (green-tinted) -->
<div class="tip-box">
  <p class="tip-box-title">Local tip</p>
  <p>Tip text here.</p>
</div>

<!-- Warning callout (terracotta-tinted) -->
<div class="warning-box">
  <p class="warning-box-title">Watch out</p>
  <p>Warning text here.</p>
</div>
```

### Standalone Text Utility Classes

These are independent of any parent container — apply them to any element anywhere.

**Display headings — Playfair Display (editorial serif):**
```html
<h2 class="text-display-lg">Large display heading — clamp(2.5rem to 4rem)</h2>
<h3 class="text-display-md">Medium display heading — clamp(1.8rem to 2.5rem)</h3>
<h4 class="text-display-sm">Small display heading — clamp(1.4rem to 1.8rem)</h4>
```

**Intro and meta text — DM Sans (body sans-serif):**
```html
<p class="text-intro">Slightly larger intro paragraph. Max-width 600px.</p>
<p class="text-intro text-intro--wide">Same but max-width 780px.</p>
<p class="text-meta">Small metadata text in graphite. 0.8rem.</p>
```

**Label style — DM Sans, uppercase, tracked:**
```html
<span class="text-label">Uppercase label — moss green</span>
<span class="text-label text-label--light">Light label — on dark backgrounds</span>
<span class="text-label text-label--muted">Muted label — graphite</span>
```

**Color modifiers — combine with any text class:**
```html
<p class="text-white">White text — for dark backgrounds</p>
<p class="text-moss">Moss green text</p>
<p class="text-forest">Forest green text</p>
<p class="text-graphite">Graphite text</p>
<p class="text-muted">Graphite at 70% opacity</p>
<p class="text-italic">Italic text</p>
```

**Alignment:**
```html
<p class="text-center">Centered</p>
<p class="text-right">Right-aligned</p>
<p class="text-left">Left-aligned (default, rarely needed)</p>
```

---

## 5. Layout — `layout.css`

### Page Wrapper

```html
<div class="page-wrapper">
  <header>...</header>
  <main>...</main>        <!-- grows to fill available height -->
  <footer>...</footer>
</div>
```

### Containers

Max-width wrappers with consistent horizontal padding.

```html
<div class="container">          <!-- max-width: 1280px -->
<div class="container--wide">   <!-- max-width: 1400px -->
<div class="container--narrow"> <!-- max-width: 780px  -->
<div class="container--text">   <!-- max-width: 680px  -->
```

### Sections

Full-width page sections with vertical breathing room.

```html
<section class="section">                        <!-- 5rem top/bottom padding -->
<section class="section section--sm">            <!-- 3rem top/bottom -->
<section class="section section--lg">            <!-- 6rem top/bottom -->
<section class="section section--flush">         <!-- no vertical padding -->
<section class="section section--dark">          <!-- ink background -->
<section class="section section--forest">        <!-- forest background -->
<section class="section section--paper">         <!-- paper background (default) -->
<section class="section section--white">         <!-- white background -->
```

**Section header block — label + title + subtitle + optional action:**
```html
<header class="section-header">
  <div class="section-header__text">
    <span class="section-label">Latest stories</span>
    <h2 class="section-title">Fresh from the road</h2>
    <p class="section-subtitle">Guides and essays from around the globe.</p>
  </div>
  <a href="/all" class="btn btn-outline">View all</a>
</header>

<!-- Centered variant (for dark section headers) -->
<header class="section-header section-header--center">
  <div>
    <span class="section-label section-label--light">On dark backgrounds</span>
    <h2 class="section-title section-title--light">White heading</h2>
    <p class="section-subtitle section-subtitle--light">White subtitle.</p>
  </div>
</header>
```

### Grid Systems

**Auto-fill — responsive, no breakpoints needed:**
```html
<div class="grid-auto">      <!-- min 300px columns -->
<div class="grid-auto--sm">  <!-- min 220px columns -->
<div class="grid-auto--lg">  <!-- min 380px columns -->
```

**Fixed columns:**
```html
<div class="grid-2">  <!-- 2 equal columns -->
<div class="grid-3">  <!-- 3 equal columns -->
<div class="grid-4">  <!-- 4 equal columns -->
<div class="grid-5">  <!-- 5 equal columns -->
```

**Specialty grids:**
```html
<div class="grid-featured">       <!-- 2fr 1fr 1fr — featured card layout -->
<div class="grid-sidebar">        <!-- 1fr 280px — content + right sidebar -->
<div class="grid-sidebar--left">  <!-- 280px 1fr — left sidebar + content -->
```

**Gap modifiers — add to any grid:**
```html
<div class="grid-3 gap-sm">  <!-- 1rem gap -->
<div class="grid-3 gap-md">  <!-- 1.5rem gap (default) -->
<div class="grid-3 gap-lg">  <!-- 2rem gap -->
<div class="grid-3 gap-xl">  <!-- 3rem gap -->
```

### Flex Utilities

```html
<div class="flex">          <!-- display: flex -->
<div class="flex-center">   <!-- flex, centered both axes -->
<div class="flex-between">  <!-- flex, space-between -->
<div class="flex-wrap">     <!-- flex-wrap: wrap -->
<div class="flex-col">      <!-- flex-direction: column -->
<div class="flex-1">        <!-- flex: 1 (grow to fill) -->
```

### Article Page Layout

Three-column layout: left TOC sidebar | article body | right widget sidebar.

```html
<div class="article-layout">
  <aside class="article-sidebar-left">
    <!-- Table of contents — sticky, hidden below 1024px -->
  </aside>
  <article>
    <!-- Main article content -->
  </article>
  <aside class="article-sidebar-right">
    <!-- Widgets — sticky, collapses to inline below 768px -->
  </aside>
</div>
```

**Article header elements:**
```html
<div class="article-header">
  <span class="article-category">Japan</span>
  <h1 class="article-title">Article Title Here</h1>
  <p class="article-subtitle">A one-line summary of the piece.</p>
  <div class="article-byline">
    <div class="author-avatar">👤</div>
    <div class="author-info">
      <p class="author-name">Sara Okafor</p>
      <p class="author-date">November 2, 2025</p>
    </div>
    <div class="article-stats">
      <span>14 min read</span>
      <span>·</span>
      <span>2,840 words</span>
    </div>
  </div>
</div>
```

### Spacing Utilities

```html
<div class="mt-4">    <!-- margin-top: 1rem -->
<div class="mt-8">    <!-- margin-top: 2rem -->
<div class="mt-12">   <!-- margin-top: 3rem -->
<div class="mb-4">    <!-- margin-bottom: 1rem -->
<div class="mb-8">    <!-- margin-bottom: 2rem -->
<div class="mb-0">    <!-- margin-bottom: 0 -->
<div class="mt-auto"> <!-- margin-top: auto -->
```

### Visibility Utilities

```html
<div class="sr-only">Screen reader only — visually hidden</div>
<div class="hide-mobile">Hidden below 768px</div>
<div class="show-mobile">Visible only below 768px</div>
```

### Announcement Banner

```html
<div class="qa-banner">
  New guides dropping weekly — <a href="/newsletter">Subscribe free</a>
</div>
```

---

## 6. Components — `components.css`

### Buttons

All buttons share the `.btn` base class. Combine with one style modifier.

```html
<a href="#" class="btn btn-primary">Filled green — primary action</a>
<a href="#" class="btn btn-secondary">Ghost white — on dark backgrounds</a>
<a href="#" class="btn btn-outline">Outlined forest — on light backgrounds</a>
<a href="#" class="btn btn-dark">Dark filled</a>

<!-- Size modifiers -->
<a href="#" class="btn btn-primary btn--sm">Small</a>
<a href="#" class="btn btn-primary btn--lg">Large</a>

<!-- Button group (horizontal row with gap) -->
<div class="btn-group">
  <a href="#" class="btn btn-primary">Primary</a>
  <a href="#" class="btn btn-secondary">Secondary</a>
</div>
```

### Home Hero

```html
<section class="hero">
  <div class="hero-bg-pattern" aria-hidden="true"></div>
  <div class="hero-inner">
    <div>
      <span class="hero-tag">New stories every week</span>
      <h1 class="hero-title">The world is wide.<br><em>Go see it.</em></h1>
      <p class="hero-desc">Honest travel writing for curious travellers.</p>
      <div class="hero-actions">
        <a href="#" class="btn btn-primary">Explore</a>
        <a href="#" class="btn btn-secondary">Read</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-card">
        <div class="hero-card-img">🏔️</div>
        <div class="hero-card-body">
          <h3>Article Title</h3>
          <div class="hero-card-meta"><span>12 min</span><span>·</span><span>Region</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Destination Page Hero

```html
<!-- Country page (standard height) -->
<section class="dest-hero" id="heroContainer">

  <!-- City pages use: class="dest-hero dest-hero--tall" -->

  <img src="photo-hd.jpg" class="dest-hero__image img-low-res"
       id="mainHeroImage" alt="Description" referrerpolicy="no-referrer">

  <h1 class="dest-hero__title">JAPAN</h1>

  <!-- City pages only -->
  <p class="dest-hero__subtitle">Where ancient ritual meets neon overload.</p>
  <nav class="dest-hero__breadcrumb">
    <a href="/destinations">Destinations</a><span>/</span>
    <a href="/destinations/japan">Japan</a><span>/</span>Tokyo
  </nav>
  <div class="slide-counter">1 / 3</div>
  <div class="slideshow-dots">
    <button class="slideshow-dot active" aria-label="Slide 1"></button>
    <button class="slideshow-dot" aria-label="Slide 2"></button>
  </div>

  <!-- Geo pin (all pages) -->
  <div class="geo-pin" id="geoPin" aria-label="View photo location">
    <div class="geo-pin-icon">
      <svg viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
  </div>

  <!-- Full-width location strip (country pages) -->
  <div class="location-strip" id="locationStrip">
    <div class="strip-inner">
      <span class="strip-dot" aria-hidden="true"></span>
      <span class="strip-text">Chureito Pagoda, Yamanashi, Japan</span>
      <a class="strip-link" href="https://maps.google.com/..." target="_blank" rel="noopener">Open in Maps ↗</a>
    </div>
  </div>

</section>
```

**Progressive image loading:**
```html
<!-- Start with img-low-res (blurred). JS swaps to img-loaded once full image downloads. -->
<img class="dest-hero__image img-low-res" ...>
```

### Destination Content Layout

```html
<!-- Country / city pages -->
<main class="dest-main">
  <div class="content-grid" id="contentGrid">
    <article class="main-column" id="mainCol">...</article>
    <aside class="support-column" id="supportCol">...</aside>
  </div>
</main>

<!-- Article pages (wider main column) -->
<main class="dest-main">
  <div class="content-grid content-grid--wide" id="contentGrid">
    <article class="main-column" id="mainCol">...</article>
    <aside class="support-column" id="supportCol">...</aside>
  </div>
</main>
```

### Quick Facts Strip

```html
<div class="quick-facts">
  <div class="fact-cell">
    <span class="fact-label">Capital</span>
    <div class="fact-value">Tokyo</div>
  </div>
  <div class="fact-cell">
    <span class="fact-label">Time Zone</span>
    <div class="fact-value">JST <span>(UTC +9)</span></div>
  </div>
</div>
```

### Destination Section Title

All section headings on country and city pages. Renders in Bebas Neue.
Apply to any heading tag — the class overrides the global heading font.

```html
<h2 class="dest-section-title">Climate & Weather in Japan</h2>
<h2 class="dest-section-title">Japan National Holidays</h2>
```

### Climate Accordion

```html
<div class="weather-accordion">
  <div class="accordion-header" onclick="toggleWeather()">
    <h2 class="dest-section-title">Climate & Weather</h2>
    <div class="accordion-meta">
      <span class="best-months-label" id="bestMonthsLabel">Best time: May, June</span>
      <span class="accordion-chevron">v</span>
    </div>
  </div>
  <div class="accordion-content" id="weatherContent">
    <div class="accordion-inner">
      <!-- content -->
    </div>
  </div>
</div>
```

JS toggles `.expanded` on `.accordion-header` and `.accordion-content`.
The chevron rotates and the best-months label hides automatically via CSS.

### City Intro Block

```html
<div class="city-intro">
  <p class="city-kicker">Japan · Kanto Region</p>
  <h2 class="city-headline">Where <em>ancient ritual</em> meets neon overload.</h2>
  <div class="city-body">
    <p>First paragraph.</p>
    <p>Second paragraph.</p>
  </div>
</div>
```

### Inline Article Image with Geo Pin

Used for images within article body content. Uses the pill-shaped location
strip instead of the full-width strip.

```html
<div class="article-image-container">

  <img src="photo-hd.jpg" class="hero-image img-low-res"
       id="mainHeroImage" alt="Description" referrerpolicy="no-referrer">

  <div class="geo-pin" id="geoPin0" aria-label="View photo location">
    <div class="geo-pin-icon">
      <svg viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
  </div>

  <!-- Pill variant for inline images — NOT the full-width strip -->
  <div class="location-strip--pill" id="locationStrip0">
    <div class="strip-inner">
      <span class="strip-dot" aria-hidden="true"></span>
      <span class="strip-text">Asakusa, Tokyo, Japan</span>
      <a class="strip-link" href="https://maps.google.com/..." target="_blank" rel="noopener">Open in Maps</a>
    </div>
  </div>

</div>

<p class="photo-caption">Caption text goes here.</p>
```

### Article Intro Paragraph

Opening paragraph with a left moss accent bar — signals the key summary statement.

```html
<p class="article-intro">
  This is the opening paragraph of the article. It is slightly larger than
  body text and has a left green border to draw the eye.
</p>
```

### Home Page Article Cards

```html
<!-- Standard auto-fill grid -->
<div class="cards-grid">
  <article class="article-card">
    <a href="/article" class="card-img">
      <div class="card-img-placeholder">🍂</div>
      <span class="card-category">Japan</span>
    </a>
    <div class="card-body">
      <h3>Article Title</h3>
      <p class="card-excerpt">A short summary of the article.</p>
      <div class="card-meta">
        <span>Author Name</span>
        <span class="card-meta-dot" aria-hidden="true"></span>
        <span>14 min read</span>
      </div>
    </div>
  </article>
</div>

<!-- Featured layout — 2fr 1fr 1fr -->
<div class="cards-grid cards-grid--featured">
  <article class="article-card article-card--featured-main">...</article>
  <article class="article-card">...</article>
  <article class="article-card">...</article>
</div>
```

### Destinations Strip

```html
<section class="destinations-strip">
  <div class="dest-grid">
    <a href="/destinations/asia" class="dest-card">
      <span class="dest-icon">🌏</span>
      <p class="dest-name">Asia</p>
      <p class="dest-count">48 guides</p>
    </a>
  </div>
</section>
```

### Post Cards (City Pages)

```html
<div class="posts-grid">
  <a href="/article" class="post-card">
    <div class="post-card-image-placeholder" style="background: linear-gradient(135deg, #1E4034, #52B788);">
    </div>
    <div class="post-card-body">
      <span class="post-card-category">Neighborhoods</span>
      <h3 class="post-card-title">48 Hours in Shinjuku</h3>
      <p class="post-card-desc">A ground-level guide to Tokyo's most relentless ward.</p>
      <span class="post-card-meta">12 min read · Shinjuku</span>
    </div>
  </a>
</div>
```

Note: `post-card-image-placeholder` is the one place a gradient background-color
is acceptable inline, because it serves as a placeholder until a real image is
available. Replace with an `<img>` tag once photos exist.

### Map Card with Attraction List

```html
<div class="map-card">
  <div class="map-card-header">
    <h3 class="support-title">Tokyo Attractions</h3>
  </div>
  <iframe class="map-embed" src="..." title="Map" loading="lazy"></iframe>
  <div class="attraction-list">
    <a href="https://maps.google.com/..." class="attraction-item" target="_blank" rel="noopener">
      <span class="attraction-dot" aria-hidden="true"></span>
      <span class="attraction-name">Senso-ji Temple</span>
      <span class="attraction-type">Temple · Asakusa</span>
      <span class="attraction-arrow" aria-hidden="true">to</span>
    </a>
  </div>
</div>
```

### Support Column Widgets (Destination Pages)

Darker sidebar widgets used on country and city pages.

```html
<!-- Fixed-height iframe (map) -->
<iframe src="/support/html/japan_map.html" class="support-iframe" title="..."></iframe>

<!-- Auto-height iframe (resizes via postMessage from the iframe) -->
<div class="dynamic-iframe-container">
  <iframe src="/support/html/japan_essentials.html" class="dynamic-iframe" scrolling="no"></iframe>
</div>

<!-- FX converter (warm background) -->
<div class="dynamic-iframe-container fx-container">
  <iframe src="/support/html/fx_usd_jpy.html" class="dynamic-iframe" scrolling="no"></iframe>
</div>

<!-- Travel tips card -->
<div class="travel-tips-container">
  <h3 class="support-title">Travel Tips</h3>
  <div class="travel-tips-content" id="travel-tips-content">
    <!-- populated via fetch() -->
  </div>
</div>
```

`support-title` is Bebas Neue, smaller than `dest-section-title`, used as
the heading for all support column sections.

### Article Sidebar Widgets

Lighter widgets for the standard three-column article layout.

```html
<!-- Base widget shell -->
<div class="widget">
  <h2 class="widget-title">Section Title</h2>
  <!-- content -->
  <button class="widget-btn">Action</button>
</div>

<!-- Table of contents -->
<nav class="widget">
  <h2 class="widget-title">Contents</h2>
  <ul class="toc-list">
    <li><a href="#intro">Introduction</a></li>
    <li><a href="#section-2">Section 2</a></li>
    <li class="toc-h3"><a href="#sub-section">Sub-section</a></li>
  </ul>
</nav>
<!-- JS adds .active class to the link matching the current scroll position -->

<!-- Share widget -->
<div class="widget">
  <h2 class="widget-title">Share</h2>
  <div class="share-buttons">
    <button class="share-btn share-btn--twitter">Share on X</button>
    <button class="share-btn share-btn--facebook">Share on Facebook</button>
    <button class="share-btn share-btn--copy">Copy link</button>
  </div>
</div>

<!-- Related articles -->
<div class="widget">
  <h2 class="widget-title">Read next</h2>
  <div class="related-list">
    <a href="/article" class="related-item">
      <div class="related-thumb">🗼</div>
      <div class="related-info">
        <h4>Article Title</h4>
        <p class="related-meta">10 min read · Japan</p>
      </div>
    </a>
  </div>
</div>
```

### Info Card (General Sidebar)

```html
<div class="info-card">
  <h3 class="support-title">Getting Around</h3>
  <div class="info-card-body">
    <p>Introductory text.</p>
    <ul>
      <li>Point one</li>
      <li>Point two</li>
    </ul>
  </div>
</div>
```

### Live Currency Conversion Spans

Any text span can display a live-converted currency amount. The FX script
(included in article content files) populates all matching spans on load.

```html
<!-- data-jpy sets the JPY amount. The span text is written by JS. -->
<span class="fx-convert-jpy" data-jpy="500"></span>
<!-- Renders as: ¥500 (~$3.34 USD) -->
```

---

## 7. Navigation — `navigation.css`

The navigation is injected into `<div id="site-header">` by `components.js`.
Include this div on every page — do not build nav HTML manually.

```html
<div id="site-header"></div>
```

**Class reference** (for working inside `components.js`):

| Class | Purpose |
|-------|---------|
| `.site-header` | Sticky top bar, backdrop blur, warm border-bottom |
| `.nav-inner` | Max-width flex container holding logo + links |
| `.nav-logo` | Brand name in Playfair Display; `<span>` inside for moss accent color |
| `.nav-links` | `<ul>` of nav items |
| `.has-dropdown` | `<li>` containing a dropdown; reveals on hover and focus-within |
| `.dropdown-menu` | `<ul>` inside `.has-dropdown` |
| `.nav-cta` | Pill-shaped filled button in the nav |
| `.mobile-menu-btn` | Hamburger button; hidden on desktop, visible below 768px |
| `.nav-links.active` | Added by JS to show the mobile menu |
| `.has-dropdown.open` | Added by JS on mobile tap to reveal that dropdown |

The hamburger icon animates to an X when `aria-expanded="true"` is set on the button.

---

## 8. Footer — `footer.css`

The footer is injected into `<div id="site-footer">` by `components.js`.

```html
<div id="site-footer"></div>
```

**Class reference:**

| Class | Purpose |
|-------|---------|
| `.site-footer` | Dark ink background, generous top padding |
| `.footer-inner` | Max-width 1400px centered wrapper |
| `.footer-grid` | 4-column grid: 2fr brand + 1fr 1fr 1fr link columns |
| `.footer-brand` | Left brand column: logo, description, social links |
| `.footer-desc` | Tagline paragraph in brand column |
| `.footer-social` | Flex row of social icon buttons |
| `.footer-social-link` | Individual circular social button |
| `.footer-col` | Link column: `<h4>` for heading, `<ul>` for links |
| `.footer-newsletter` | Optional newsletter signup column |
| `.footer-newsletter-form` | Stacked input + button container |
| `.footer-newsletter-input` | Email text input |
| `.footer-newsletter-btn` | Submit button |
| `.footer-divider` | `<hr>` styled as subtle white horizontal rule |
| `.footer-bottom` | Bottom bar: copyright left, legal links right |
| `.footer-bottom-links` | `<ul>` of Privacy / Terms / Cookie links |

---

## 9. Animations — `animations.css`

### Entrance Animations (page load)

```html
<div class="fade-up">Fades up from below</div>
<div class="fade-in">Fades in (opacity only)</div>
<div class="fade-down">Drops in from above</div>
<div class="slide-left">Slides in from the left</div>
<div class="slide-right">Slides in from the right</div>
<div class="scale-in">Scales up from 92%</div>
```

**Staggered delays — sequence multiple elements:**
```html
<div class="fade-up">First (immediate)</div>
<div class="fade-up delay-1">0.1s delay</div>
<div class="fade-up delay-2">0.2s delay</div>
<div class="fade-up delay-3">0.3s delay</div>
<div class="fade-up delay-4">0.4s delay</div>
<div class="fade-up delay-5">0.5s delay</div>
<div class="fade-up delay-6">0.6s delay</div>
```

**Duration modifiers:**
```html
<div class="fade-up duration-fast">0.3s animation</div>
<div class="fade-up duration-normal">0.6s animation (default)</div>
<div class="fade-up duration-slow">0.9s animation</div>
```

### Scroll-Reveal System

Elements start hidden and reveal when scrolled into view. JS adds `.revealed`
via IntersectionObserver (wired in `index.html` — copy to new pages as needed).

```html
<!-- Single element -->
<div class="reveal">Reveals on scroll</div>
<div class="reveal-left">Slides in from the left on scroll</div>

<!-- Staggered children — reveal parent, children animate in sequence -->
<div class="reveal-stagger">
  <div>Child 1 — 0.05s</div>
  <div>Child 2 — 0.12s</div>
  <div>Child 3 — 0.19s</div>
  <div>Child 4 — 0.26s</div>
  <div>Child 5 — 0.33s</div>
  <div>Child 6 — 0.40s</div>
</div>
```

### Hover Effects

```html
<div class="hover-lift">Lifts 4px with shadow on hover</div>
<div class="hover-lift-sm">Lifts 2px on hover</div>
```

### Loading States

```html
<div class="skeleton" style="height: 1rem; width: 60%;">Loading...</div>
<span class="spin">Arrow</span>   <!-- continuously rotating -->
<span class="pulse">Dot</span>    <!-- pulsing attention indicator -->
```

### Reduced Motion

All animations are automatically disabled for users who have enabled
`prefers-reduced-motion` in their OS accessibility settings. This is handled
entirely inside `animations.css` — no JS or page-level changes are needed.

---

## 10. Page Templates

### Minimal page skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title | Endless Atlas</title>
  <meta name="description" content="Page description.">
  <link rel="stylesheet" href="/theme.css">
  <link rel="stylesheet" href="/typography.css">
  <link rel="stylesheet" href="/layout.css">
  <link rel="stylesheet" href="/components.css">
  <link rel="stylesheet" href="/navigation.css">
  <link rel="stylesheet" href="/footer.css">
  <link rel="stylesheet" href="/animations.css">
</head>
<body>
  <div id="site-header"></div>
  <main>
    <!-- page content -->
  </main>
  <div id="site-footer"></div>
  <script src="/components.js"></script>
</body>
</html>
```

### Destination page (country level)

```html
<div id="site-header"></div>
<div id="japan-sub-header"></div>

<section class="dest-hero" id="heroContainer">...</section>

<main class="dest-main">
  <div class="content-grid" id="contentGrid">
    <article class="main-column" id="mainCol">...</article>
    <aside class="support-column" id="supportCol">...</aside>
  </div>
</main>

<div id="site-footer"></div>
<script src="/components.js"></script>
<script src="/destinations/japan/japan-components.js"></script>
```

### Article page (injected content)

```html
<main class="dest-main">
  <div class="content-grid content-grid--wide" id="contentGrid">
    <article class="main-column" id="mainCol">
      <!-- populated by fetch('/support/japan/tokyo/article_content.html') -->
    </article>
    <aside class="support-column" id="supportCol">
      <!-- sidebar widgets -->
    </aside>
  </div>
</main>
```

Content files must contain only inner HTML — no `<html>`, `<head>`, or `<body>`
tags, and no `<style>` blocks. All styling must use classes from this system.

---

## 11. Rules for AI Assistants

When generating or editing any HTML or CSS for this project, follow these rules
exactly. They exist to maintain the single-source-of-truth CSS architecture.
A single change to a CSS file must be sufficient to change that style everywhere.

### Never do these things

- Add a `<style>` block to any HTML page under any circumstances
- Write `style="..."` inline attributes, except on `.post-card-image-placeholder` gradient backgrounds while a real photo is unavailable
- Hardcode a hex color, pixel value, rem value, or font name — use a token
- Define rules like `main { padding: ... }` or `h2 { font-family: ... }` in HTML
- Create a new CSS class inside an HTML file — all classes belong in a CSS file
- Duplicate a style that already exists in one of the seven CSS files
- Add a new `@import` or font `<link>` tag — fonts are imported in `theme.css` only
- Solve a cascade problem by patching the HTML page — fix the CSS file instead

### Always do these things

- Solve every visual problem by editing the appropriate CSS file
- Use `var(--token-name)` for every color, size, spacing, and font reference
- Wrap all long-form rich text in `<div class="prose">`
- Use `.dest-section-title` for all section headings on destination pages
- Use `.location-strip--pill` for geo pins on inline article images
- Use `.location-strip` (full-width) for geo pins on hero images
- Use `<main class="dest-main">` on all destination and article pages
- Use `content-grid--wide` on article pages, `content-grid` on country/city pages
- Apply `img-low-res` to images that will be progressively loaded; JS replaces it with `img-loaded`
- Include `aria-label`, `aria-hidden="true"`, and semantic HTML elements on every page
- Always use the exact geo-pin SVG structure: `.geo-pin > .geo-pin-icon > svg > path` — the JS hover and tap logic depends on this nesting
- Place the geo-pin `id` on the `.geo-pin` element, and the strip `id` on `.location-strip` or `.location-strip--pill`

### When to edit which file

| Change needed | Edit this file |
|---------------|----------------|
| A color is wrong anywhere on the site | `theme.css` |
| A font is wrong anywhere on the site | `theme.css` |
| Global spacing feels too tight or loose | `theme.css` |
| A heading style is wrong in prose or body text | `typography.css` |
| A new standalone text class is needed | `typography.css` |
| Page padding, container width, or a grid is wrong | `layout.css` |
| A new layout pattern is needed | `layout.css` |
| A button, card, widget, or destination component looks wrong | `components.css` |
| A new UI component is needed | `components.css` |
| The nav bar or mobile menu needs changing | `navigation.css` |
| The footer needs changing | `footer.css` |
| An animation timing or behavior needs changing | `animations.css` |
| A new animation is needed | `animations.css` |
