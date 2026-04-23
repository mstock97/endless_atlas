/**
 * components.js
 * Loads shared header and footer with a polished dropdown.
 */

const SITE_CONFIG = {
  name:        'Endless ',
  nameAccent:  'Atlas',
  tagline:     'Traveling the World',
  isQA:        window.location.hostname.startsWith('qa.'),
  basePath:    '/',
};

const NAV_LINKS = [
  { 
    label: 'Destinations', 
    href: '/destinations/',
    children: [
      { label: 'Japan', href: '/destinations/japan/' },
      { label: 'Europe', href: '/destinations/europe/' },
      { label: 'All Destinations', href: '/destinations/' }
    ]
  },
  { label: 'Travel Tips',  href: '/tips/' },
  { label: 'Gear',          href: '/gear/' },
  { label: 'Newsletter',   href: '/newsletter/', cta: true },
];

const FOOTER_COLS = [
  {
    title: 'Explore',
    links: [
      { label: 'All Destinations', href: '/destinations/' },
      { label: 'Europe',            href: '/destinations/europe/' },
      { label: 'Asia',              href: '/destinations/asia/' },
      { label: 'Americas',          href: '/destinations/americas/' },
    ],
  },
  {
    title: 'Content',
    links: [
      { label: 'Travel Tips', href: '/tips/' },
      { label: 'Gear Guide',  href: '/gear/' },
      { label: 'Itineraries', href: '/itineraries/' },
      { label: 'Budgeting',    href: '/budgeting/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',         href: '/about/' },
      { label: 'Contact',       href: '/contact/' },
      { label: 'Privacy',       href: '/privacy/' },
      { label: 'Advertise',     href: '/advertise/' },
    ],
  },
];

function renderHeader() {
  const navLinksHTML = NAV_LINKS.map(link => {
    if (link.children) {
      const dropdownHTML = link.children.map(child => 
        `<li><a href="${child.href}">${child.label}</a></li>`
      ).join('');

      return `
        <li class="nav-item has-dropdown">
          <a href="${link.href}" class="nav-link">${link.label} <small>▾</small></a>
          <ul class="dropdown-menu">
            ${dropdownHTML}
          </ul>
        </li>
      `;
    }

    return `<li><a href="${link.href}" class="nav-link ${link.cta ? 'nav-cta' : ''}">${link.label}</a></li>`;
  }).join('');

  const qaBanner = SITE_CONFIG.isQA
    ? `<div class="qa-banner">⚠️ QA ENVIRONMENT</div>`
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
            <p class="footer-desc">${SITE_CONFIG.tagline}</p>
          </div>
          ${colsHTML}
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${SITE_CONFIG.name}${SITE_CONFIG.nameAccent}.</span>
        </div>
      </div>
    </footer>
  `;
}

function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') !== '/' && path.startsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();

  setActiveNavLink();
});
