/**
 * components.js
 * Shared header and footer injected into every page.
 *
 * Max-width: 1400px — matches .content-grid on destination pages.
 */

const SITE_CONFIG = {
  name:       'Endless',
  nameAccent: 'Atlas',
  tagline:    'Go further. Write honestly.',
  isQA:       window.location.hostname.startsWith('qa.'),
};

/* ── Navigation links ─────────────────────────────────────────── */
const NAV_LINKS = [
  {
    label: 'Destinations',
    href:  '/destinations/',
    children: [
      { label: 'Japan',            href: '/destinations/japan' },
      { label: 'Europe',           href: '/destinations/europe' },
      { label: 'All Destinations', href: '/destinations' },
    ],
  },
  { label: 'Travel Tips', href: '/tips' },
  { label: 'Gear',        href: '/gear' },
  { label: 'Newsletter',  href: '/newsletter', cta: true },
];

/* ── Footer columns (3 to fill the 4-column grid alongside brand) */
const FOOTER_COLS = [
  {
    title: 'Explore',
    links: [
      { label: 'All Destinations', href: '/destinations' },
      { label: 'Japan',            href: '/destinations/japan' },
      { label: 'Europe',           href: '/destinations/europe' },
      { label: 'Asia',             href: '/destinations/asia' },
    ],
  },
  {
    title: 'Content',
    links: [
      { label: 'Travel Tips', href: '/tips/' },
      { label: 'Gear Guide',  href: '/gear/' },
      { label: 'Itineraries', href: '/itineraries/' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story',  href: '/about' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Contact',    href: '/contact' },
    ],
  },
];

/* ── Logo ─────────────────────────────────────────────────────── */
function logoHTML(href) {
  return `<a href="${href}" class="nav-logo">${SITE_CONFIG.name}<span>${SITE_CONFIG.nameAccent}</span></a>`;
}

/* ── Header ───────────────────────────────────────────────────── */
function renderHeader() {
  const navLinksHTML = NAV_LINKS.map(link => {
    if (link.children) {
      const dropdownHTML = link.children
        .map(child => `<li><a href="${child.href}">${child.label}</a></li>`)
        .join('');
      return `
        <li class="has-dropdown">
          <a href="${link.href}">${link.label}</a>
          <ul class="dropdown-menu">${dropdownHTML}</ul>
        </li>`;
    }
    const ctaClass = link.cta ? ' class="nav-cta"' : '';
    return `<li><a href="${link.href}"${ctaClass}>${link.label}</a></li>`;
  }).join('');

  const qaBanner = SITE_CONFIG.isQA
    ? `<div class="qa-banner">⚠ QA ENVIRONMENT — changes here are not live</div>`
    : '';

  return `${qaBanner}
    <header class="site-header">
      <nav class="nav-inner">
        ${logoHTML('/')}
        <ul class="nav-links" id="navLinks">${navLinksHTML}</ul>
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu">
          <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" stroke-width="2"
               fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="6"  x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>
    </header>`;
}

/* ── Footer ───────────────────────────────────────────────────── */
function renderFooter() {
  const colsHTML = FOOTER_COLS.map(col => `
    <div class="footer-col">
      <h4>${col.title}</h4>
      <ul>${col.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}</ul>
    </div>`).join('');

  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            ${logoHTML('/')}
            <p class="footer-desc">${SITE_CONFIG.tagline}</p>
          </div>
          ${colsHTML}
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${SITE_CONFIG.name} ${SITE_CONFIG.nameAccent}.</span>
          <span style="font-size:0.8rem;opacity:0.4;letter-spacing:0.06em;">Go further. Write honestly.</span>
        </div>
      </div>
    </footer>`;
}

/* ── Active nav state ─────────────────────────────────────────── */
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '/' && path.startsWith(href)) {
      link.classList.add('active');
    }
  });
}

/* ── Hover image popup ────────────────────────────────────────── */
function initHoverReveal() {
  const GAP      = 12;
  const EDGE_PAD = 20;
  const PAD      = 8;

  function positionPopup(trigger, popup) {
    const img     = popup.querySelector('.hover-reveal__img');
    const caption = popup.querySelector('.hover-reveal__caption');
    if (!img) return;

    if (!img.naturalWidth || !img.naturalHeight) {
      img.addEventListener('load', () => positionPopup(trigger, popup), { once: true });
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const vw   = window.innerWidth;
    const vh   = window.innerHeight;

    const spaceAbove = rect.top    - GAP - EDGE_PAD;
    const spaceBelow = vh - rect.bottom - GAP - EDGE_PAD;
    const goAbove    = spaceAbove >= spaceBelow;
    const availH     = Math.max(goAbove ? spaceAbove : spaceBelow, 60);
    const availW     = vw - EDGE_PAD * 2;

    const captionH = caption ? Math.round(caption.offsetHeight || 28) + PAD : 0;
    const maxImgW  = availW - PAD * 2;
    const maxImgH  = availH - PAD * 2 - captionH;

    const ratio = img.naturalWidth / img.naturalHeight;
    let imgW    = img.naturalWidth;
    let imgH    = img.naturalHeight;

    if (imgW > maxImgW) { imgW = maxImgW; imgH = imgW / ratio; }
    if (imgH > maxImgH) { imgH = maxImgH; imgW = imgH * ratio; }

    imgW = Math.round(imgW);
    imgH = Math.round(imgH);

    img.style.width  = imgW + 'px';
    img.style.height = imgH + 'px';

    const popupW = imgW + PAD * 2;
    let left = Math.round(rect.left + rect.width / 2 - popupW / 2);
    left = Math.max(EDGE_PAD, Math.min(left, vw - popupW - EDGE_PAD));

    popup.style.left = left + 'px';

    if (goAbove) {
      popup.style.top    = '';
      popup.style.bottom = Math.round(vh - rect.top + GAP) + 'px';
    } else {
      popup.style.bottom = '';
      popup.style.top    = Math.round(rect.bottom + GAP) + 'px';
    }

    popup.classList.add('is-visible');
  }

  function closeAll() {
    document.querySelectorAll('.hover-reveal__popup.is-visible').forEach(p => {
      p.classList.remove('is-visible');
    });
  }

  document.addEventListener('mouseover', e => {
    const trigger = e.target.closest('.hover-reveal');
    if (!trigger) return;
    const popup = trigger.querySelector('.hover-reveal__popup');
    if (!popup || popup.classList.contains('is-visible')) return;
    positionPopup(trigger, popup);
  });

  document.addEventListener('mouseout', e => {
    const trigger = e.target.closest('.hover-reveal');
    if (!trigger) return;
    if (trigger.contains(e.relatedTarget)) return;
    const popup = trigger.querySelector('.hover-reveal__popup');
    if (popup) popup.classList.remove('is-visible');
  });

  document.addEventListener('touchend', e => {
    const trigger = e.target.closest('.hover-reveal');
    if (trigger) {
      e.preventDefault();
      const popup = trigger.querySelector('.hover-reveal__popup');
      if (!popup) return;
      const wasVisible = popup.classList.contains('is-visible');
      closeAll();
      if (!wasVisible) positionPopup(trigger, popup);
    } else {
      closeAll();
    }
  }, { passive: false });
}


document.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();

  setActiveNavLink();
  initHoverReveal();

  const btn   = document.getElementById('mobileMenuBtn');
  const links = document.getElementById('navLinks');
  if (btn && links) {
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('active');
      btn.setAttribute('aria-expanded', open);
    });
    // Close on link tap (mobile)
    links.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        links.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (headerEl && !headerEl.contains(e.target)) {
        links.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
