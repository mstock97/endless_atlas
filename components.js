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
  name:        'Wander',
  nameAccent:  'Notes',
  tagline:     'Stories from everywhere.',
  isQA:        window.location.hostname.startsWith('qa.'),
  basePath:    '/',   // change to '/subfolder/' if deploying to a subdirectory
};

// ─── NAV LINKS ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Destinations', href: '/destinations/' },
  { label: 'Travel Tips',  href: '/tips/' },
  { label: 'Gear',         href: '/gear/' },
  { label: 'About',        href: '/about/' },
  { label: 'Newsletter',   href: '/newsletter/', cta: true },
];

// ─── FOOTER COLUMNS ──────────────────────────────────────────────────────────
const FOOTER_COLS = [
  {
    title: 'Explore',
    links: [
      { label: 'All Destinations', href: '/destinations/' },
      { label: 'Europe',           href: '/destinations/europe/' },
      { label: 'Asia',             href: '/destinations/asia/' },
      { label: 'Americas',         href: '/destinations/americas/' },
    ],
  },
  {
    title: 'Content',
    links: [
      { label: 'Travel Tips', href: '/tips/' },
      { label: 'Gear Guide',  href: '/gear/' },
      { label: 'Itineraries', href: '/itineraries/' },
      { label: 'Budgeting',   href: '/budgeting/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',        href: '/about/' },
      { label: 'Contact',      href: '/contact/' },
      { label: 'Privacy',      href: '/privacy/' },
      { label: 'Advertise',    href: '/advertise/' },
    ],
  },
];

// ─── RENDER HEADER ────────────────────────────────────────────────────────────
function renderHeader() {
  const navLinksHTML = NAV_LINKS.map(link =>
    `<li><a href="${link.href}" class="${link.cta ? 'nav-cta' : ''}">${link.label}</a></li>`
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
  const colsHTML = FOOTER_COLS.map(col => `
    <div class="footer-col">
      <h4>${col.title}</h4>
      <ul>
        ${col.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
      </ul>
    </div>
  `).join('');

  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="/" class="nav-logo">${SITE_CONFIG.name}<span>${SITE_CONFIG.nameAccent}</span></a>
            <p class="footer-desc">
              ${SITE_CONFIG.tagline} Independent travel writing, honest guides, and stories
              from every corner of the globe.
            </p>
          </div>
          ${colsHTML}
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${SITE_CONFIG.name}${SITE_CONFIG.nameAccent}. All rights reserved.</span>
          <span>Made with ☀️ for wanderers</span>
        </div>
      </div>
    </footer>
  `;
}

// ─── ACTIVE NAV LINK ─────────────────────────────────────────────────────────
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') !== '/' && path.startsWith(link.getAttribute('href'))) {
      link.style.color = 'var(--ocean)';
    }
  });
}

// ─── MOUNT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();

  setActiveNavLink();
});
