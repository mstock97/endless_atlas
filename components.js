/**
 * Endless-Atlas Components (v1.2)
 * Orchestrates brand-compliant Header, Footer, and QA Banner.
 */

const SITE_CONFIG = {
  name: 'Endless',
  nameAccent: 'Atlas',
  // Updated tagline to reflect "Editorial Intelligence" brand value
  tagline: 'The trail starts where the itinerary ends.', 
  isQA: window.location.hostname.startsWith('qa.') || window.location.hostname.includes('github.io'),
  basePath: '/',
};

const NAV_LINKS = [
  { 
    label: 'Destinations', 
    href: '/destinations/',
    children: [
      { label: 'Japan', href: '/destinations/japan' },
      { label: 'Europe', href: '/destinations/europe' },
      { label: 'Pacific Northwest', href: '/destinations/pnw' },
      { label: 'All Trails', href: '/destinations' }
    ]
  },
  { label: 'Travel Tips',  href: '/tips' },
  { label: 'Gear Lab',     href: '/gear' }, // Renamed to "Gear Lab" for a more "National Geographic" feel
  { label: 'Join the Expedition',  href: '/newsletter', cta: true }, // High-impact CTA text
];

const FOOTER_COLS = [
  {
    title: 'Explore',
    links: [
      { label: 'Japan Guide',     href: '/destinations/japan' },
      { label: 'European Trails', href: '/destinations/europe' },
      { label: 'Hidden Gems',     href: '/destinations/hidden-gems' },
      { label: 'Map Archive',     href: '/maps' },
    ],
  },
  {
    title: 'The Archive',
    links: [
      { label: 'Field Notes',    href: '/tips/' },
      { label: 'Essential Gear', href: '/gear/' },
      { label: 'Stories',        href: '/stories/' },
    ],
  },
  {
    title: 'Organization',
    links: [
      { label: 'About Atlas', href: '/about' },
      { label: 'Privacy',     href: '/privacy' },
      { label: 'Contact',     href: '/contact' },
    ],
  }
];

/**
 * Renders the QA Banner for staging/preview environments
 */
function renderQABanner() {
  if (!SITE_CONFIG.isQA) return '';
  return `
    <div class="qa-banner">
      STAGING ENVIRONMENT &nbsp;—&nbsp; Previewing Endless-Atlas v1.2 &nbsp;—&nbsp; 
      <a href="https://github.com/your-repo" target="_blank">View Docs</a>
    </div>
  `;
}

function renderHeader() {
  const navLinksHTML = NAV_LINKS.map(link => {
    const isCta = link.cta ? 'class="nav-cta"' : '';
    
    if (link.children) {
      const dropdownHTML = link.children.map(child => 
        `<li><a href="${child.href}">${child.label}</a></li>`
      ).join('');
      
      return `
        <li class="has-dropdown">
          <a href="${link.href}" ${isCta}>${link.label}</a>
          <ul class="dropdown-menu">
            ${dropdownHTML}
          </ul>
        </li>
      `;
    }
    
    return `<li><a href="${link.href}" ${isCta}>${link.label}</a></li>`;
  }).join('');

  return `
    ${renderQABanner()}
    <header class="site-header">
      <nav class="nav-inner">
        <a href="/" class="nav-logo">
          ${SITE_CONFIG.name}<span>${SITE_CONFIG.nameAccent}</span>
        </a>
        <ul class="nav-links" id="navLinks">${navLinksHTML}</ul>
        
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle Menu">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="square">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
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
          <span class="caption">© ${new Date().getFullYear()} ${SITE_CONFIG.name}${SITE_CONFIG.nameAccent}. Built for explorers.</span>
        </div>
      </div>
    </footer>
  `;
}

function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href !== '/' && path.startsWith(href)) {
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

  // Mobile Menu Toggle Logic
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  }
});
