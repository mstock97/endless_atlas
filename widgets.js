/**
 * components.js
 * Loads shared header and footer into every page.
 * Include this script in every HTML file.
 *
 * Usage: <script src="/assets/js/components.js"></script>
 * Then place <div id="site-header"></div> and <div id="site-footer"></div>
 * in your HTML where you want the header/footer to appear.
 */

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const SITE_CONFIG = {
  name:        'Endless Atlas',
  nameAccent:  'Endless Atlas',
  tagline:     'Go further. Write honestly.',
  isQA:        window.location.hostname.startsWith('qa.'),
  basePath:    '/',
};

// ─── NAV LINKS ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Destinations', href: '/destinations/' },
  { label: 'Itineraries',  href: '/itineraries/' },
  { label: 'Travel Tips',  href: '/tips/' },
  { label: 'About',        href: '/about/' },
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --forest:    #1E4034;
    --canopy:    #2D6A4F;
    --moss:      #52B788;
    --stone:     #5C5346;
    --driftwood: #A8896A;
    --fog:       #C9D4C5;
    --ink:       #0F0F0F;
    --graphite:  #3D3D3D;
    --ash:       #8C8C8C;
    --cloud:     #EFEFEF;
    --paper:     #F7F5F0;
    --white:     #FFFFFF;

    --font-display:   'Bebas Neue', sans-serif;
    --font-editorial: 'Playfair Display', Georgia, serif;
    --font-body:      'DM Sans', sans-serif;

    --space-xs:  4px;
    --space-sm:  8px;
    --space-md:  16px;
    --space-lg:  24px;
    --space-xl:  40px;
    --space-2xl: 64px;
  }

  /* ── Header ────────────────────────────────────────────────── */
  .qa-banner {
    background: var(--driftwood);
    color: var(--white);
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    padding: var(--space-sm) var(--space-md);
    letter-spacing: 0.04em;
  }
  .qa-banner a {
    color: var(--white);
    text-decoration: underline;
    margin-left: var(--space-sm);
  }

  .site-header {
    background-color: var(--forest);
    border-bottom: 1px solid var(--canopy);
  }

  .nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-lg) var(--space-xl);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xl);
  }

  .nav-logo {
    font-family: var(--font-display);
    font-size: 28px;
    letter-spacing: 0.08em;
    color: var(--white);
    text-decoration: none;
    line-height: 1;
    text-transform: uppercase;
  }
  .nav-logo span {
    color: var(--moss);
  }

  .nav-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    gap: var(--space-xl);
  }
  .nav-links li {
    margin: 0;
  }
  .nav-links a {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fog);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .nav-links a:hover {
    color: var(--moss);
  }
  .nav-links a.nav-active {
    color: var(--moss);
  }

  /* ── Footer ────────────────────────────────────────────────── */
  .site-footer {
    background-color: var(--ink);
    border-top: 1px solid #1e1e1e;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-xl);
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
  }

  .footer-top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-xl);
    flex-wrap: wrap;
  }

  .footer-brand-block .nav-logo {
    display: inline-block;
    margin-bottom: var(--space-md);
  }

  .footer-tagline {
    font-family: var(--font-editorial);
    font-style: italic;
    font-size: 15px;
    color: var(--stone);
    margin: 0;
    line-height: 1.6;
    max-width: 260px;
  }

  .footer-nav {
    display: flex;
    gap: var(--space-2xl);
    flex-wrap: wrap;
  }

  .footer-nav a {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ash);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .footer-nav a:hover {
    color: var(--moss);
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: var(--space-lg);
    border-top: 1px solid #222;
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .footer-copyright {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 300;
    color: var(--stone);
    letter-spacing: 0.04em;
    margin: 0;
  }

  .footer-mark {
    font-family: var(--font-display);
    font-size: 11px;
    letter-spacing: 0.2em;
    color: #2a2a2a;
    text-transform: uppercase;
  }
`;

// ─── INJECT STYLES ────────────────────────────────────────────────────────────
function injectStyles() {
  const style = document.createElement('style');
  style.textContent = STYLES;
  document.head.appendChild(style);
}

// ─── RENDER HEADER ────────────────────────────────────────────────────────────
function renderHeader() {
  const navLinksHTML = NAV_LINKS.map(link =>
    `<li><a href="${link.href}">${link.label}</a></li>`
  ).join('');

  const qaBanner = SITE_CONFIG.isQA
    ? `<div class="qa-banner">⚠️ QA ENVIRONMENT — Changes here are not live. <a href="#">View production site →</a></div>`
    : '';

  return `
    ${qaBanner}
    <header class="site-header">
      <nav class="nav-inner">
        <a href="/" class="nav-logo">${SITE_CONFIG.name}<span>${SITE_CONFIG.nameAccent}</span></a>
        <ul class="nav-links">${navLinksHTML}</ul>
      </nav>
    </header>
  `;
}

// ─── RENDER FOOTER ────────────────────────────────────────────────────────────
function renderFooter() {
  const footerNavHTML = NAV_LINKS.map(link =>
    `<a href="${link.href}">${link.label}</a>`
  ).join('');

  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand-block">
            <a href="/" class="nav-logo">${SITE_CONFIG.name}<span>${SITE_CONFIG.nameAccent}</span></a>
            <p class="footer-tagline">${SITE_CONFIG.tagline}</p>
          </div>
          <nav class="footer-nav">
            ${footerNavHTML}
          </nav>
        </div>
        <div class="footer-bottom">
          <p class="footer-copyright">© ${new Date().getFullYear()} ${SITE_CONFIG.name}${SITE_CONFIG.nameAccent}. All rights reserved.</p>
          <span class="footer-mark">Explore Everything</span>
        </div>
      </div>
    </footer>
  `;
}

// ─── ACTIVE NAV LINK ─────────────────────────────────────────────────────────
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href !== '/' && path.startsWith(href)) {
      link.classList.add('nav-active');
    }
  });
}

// ─── MOUNT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectStyles();

  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();

  setActiveNavLink();
});
