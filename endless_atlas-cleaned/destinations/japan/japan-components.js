/**
 * japan-components.js
 * Endless Atlas · Japan Section Sub-Navigation
 *
 * Renders a persistent country-level nav bar that sits directly below the
 * main site header and sticks there on scroll. Matches the site header's
 * max-width (1400px) and padding (0 2rem) so both bars align perfectly.
 *
 * Z-index stack:
 *   .site-header          z-index: 300  (main.css)
 *   .dropdown-menu        z-index: 400  (main.css) — clears japan bar
 *   #japan-sub-header     z-index: 200  — below site header + its dropdown
 *   page content          z-index: 10
 */

/* ── Route config ─────────────────────────────────────────────── */
const JAPAN_NAV = {
  home: { label: 'Japan', href: '/destinations/japan' },
  links: [
    {
      label: 'Tokyo',
      href:  '/destinations/japan/tokyo',
      dropdown: [
        { label: 'Neighborhoods', href: '/destinations/japan/tokyo/neighborhoods' },
        { label: 'Where to Eat',  href: '/destinations/japan/tokyo/food' },
        { label: 'Day Trips',     href: '/destinations/japan/tokyo/day-trips' },
        { label: 'Itineraries',   href: '/destinations/japan/tokyo/itineraries' },
      ],
    },
    {
      label: 'Osaka',
      href:  '/destinations/japan/osaka',
      dropdown: [
        { label: 'Neighborhoods', href: '/destinations/japan/osaka/neighborhoods' },
        { label: 'Street Food',   href: '/destinations/japan/osaka/street-food' },
        { label: 'Day Trips',     href: '/destinations/japan/osaka/day-trips' },
        { label: 'Itineraries',   href: '/destinations/japan/osaka/itineraries' },
      ],
    },
    {
      label: 'Kyoto',
      href:  '/destinations/japan/kyoto',
      dropdown: [
        { label: 'Temples & Shrines', href: '/destinations/japan/kyoto/temples' },
        { label: 'Traditional Arts',  href: '/destinations/japan/kyoto/arts' },
        { label: 'Day Trips',         href: '/destinations/japan/kyoto/day-trips' },
        { label: 'Itineraries',       href: '/destinations/japan/kyoto/itineraries' },
      ],
    },
    {
      label: 'Transit Tips',
      href:  '/destinations/japan/transit',
      dropdown: [
        { label: 'JR Pass Guide',  href: '/destinations/japan/transit/jr-pass' },
        { label: 'IC Cards',       href: '/destinations/japan/transit/ic-cards' },
        { label: 'Shinkansen',     href: '/destinations/japan/transit/shinkansen' },
        { label: 'Getting Around', href: '/destinations/japan/transit/local' },
      ],
    },
    {
      label: 'Food Guide',
      href:  '/destinations/japan/food',
      dropdown: [
        { label: 'Regional Dishes',    href: '/destinations/japan/food/regional' },
        { label: 'Ramen Deep Dive',    href: '/destinations/japan/food/ramen' },
        { label: 'Izakaya Culture',    href: '/destinations/japan/food/izakaya' },
        { label: 'Vegetarian & Vegan', href: '/destinations/japan/food/vegetarian' },
      ],
    },
  ],
};

/* ── Styles ───────────────────────────────────────────────────── */
const STYLES = `
  /* ── Positioning ───────────────────────────────────────────── */
  #japan-sub-header {
    position: sticky;
    top: 0;                           /* JS sets this dynamically — see initJapanHeader */
    width: 100%;
    z-index: 200;                     /* above page content, below site dropdown (400) */
    background: #1E4034;              /* --forest */
    border-bottom: 1px solid rgba(168, 137, 106, 0.18);
    transition: top 0.1s ease;
  }

  /* ── Inner wrapper — mirrors .nav-inner exactly ─────────────── */
  .jn-inner {
    max-width: 1400px;                /* matches .nav-inner and .content-grid */
    margin: 0 auto;
    padding: 0 2rem;                  /* matches .nav-inner padding */
    height: 46px;
    display: flex;
    align-items: center;
    position: relative;
  }

  /* ── Country badge (flag + label) ──────────────────────────── */
  .jn-badge {
    display: flex;
    align-items: center;
    gap: 9px;
    padding-right: 18px;
    margin-right: 4px;
    border-right: 1px solid rgba(168, 137, 106, 0.18);
    flex-shrink: 0;
    height: 100%;
  }

  .jn-flag {
    width: 17px;
    height: 12px;
    background: #fff;
    border-radius: 1px;
    position: relative;
    flex-shrink: 0;
  }

  .jn-flag::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #BC002D;
  }

  .jn-badge-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.06rem;
    letter-spacing: 0.13em;
    color: #F7F5F0;
    text-decoration: none;
    white-space: nowrap;
  }

  /* ── Desktop link list ──────────────────────────────────────── */
  .jn-links {
    display: flex;
    align-items: center;
    height: 100%;
    flex: 1;
    list-style: none;
    margin: 0; padding: 0;
  }

  .jn-item {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .jn-link {
    display: flex;
    align-items: center;
    gap: 4px;
    color: rgba(247, 245, 240, 0.62);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0 14px;
    height: 100%;
    text-decoration: none;
    transition: color 0.15s ease, background 0.15s ease;
    border-right: 1px solid rgba(168, 137, 106, 0.12);
    white-space: nowrap;
    position: relative;
  }

  .jn-link:hover,
  .jn-link.active {
    color: #F7F5F0;
    background: rgba(82, 183, 136, 0.07);
  }

  /* Active underline */
  .jn-link.active::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: #52B788;             /* --moss */
  }

  /* Chevron on links that have a dropdown */
  .jn-link-chevron {
    opacity: 0.45;
    font-size: 0.55rem;
    margin-left: 2px;
    transition: transform 0.15s ease, opacity 0.15s ease;
  }

  .jn-item:hover .jn-link-chevron {
    opacity: 0.9;
    transform: rotate(180deg);
  }

  /* ── Desktop dropdown ───────────────────────────────────────── */
  .jn-drop {
    position: absolute;
    top: 100%; left: 0;
    min-width: 180px;
    background: #122B21;
    border: 1px solid rgba(168, 137, 106, 0.18);
    border-top: 2px solid #52B788;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4px);
    transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s;
    z-index: 201;                     /* just above japan bar */
    list-style: none;
    margin: 0; padding: 0;
  }

  .jn-item:hover .jn-drop {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .jn-drop-link {
    display: block;
    padding: 9px 14px;
    color: rgba(247, 245, 240, 0.62);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    text-decoration: none;
    transition: color 0.12s, background 0.12s;
    white-space: nowrap;
  }

  .jn-drop-link:hover {
    color: #F7F5F0;
    background: rgba(82, 183, 136, 0.08);
  }

  /* ── Mobile hamburger button ────────────────────────────────── */
  .jn-mobile-btn {
    display: none;
    margin-left: auto;
    background: none;
    border: none;
    color: rgba(247, 245, 240, 0.75);
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 4px;
    transition: color 0.15s;
    flex-shrink: 0;
  }

  .jn-mobile-btn:hover { color: #F7F5F0; }

  /* ── Mobile drawer ──────────────────────────────────────────── */
  .jn-mobile-drawer {
    display: none;                    /* hidden on desktop */
    flex-direction: column;
    background: #122B21;
    border-top: 1px solid rgba(168, 137, 106, 0.18);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .jn-mobile-drawer.open {
    max-height: 520px;
  }

  /* Mobile top-level link row */
  .jn-mob-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    border-bottom: 1px solid rgba(168, 137, 106, 0.1);
  }

  .jn-mob-link {
    display: block;
    flex: 1;
    padding: 13px 0;
    color: rgba(247, 245, 240, 0.72);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.15s;
  }

  .jn-mob-link:hover,
  .jn-mob-link.active { color: #F7F5F0; }

  /* Expand toggle for sub-items */
  .jn-mob-toggle {
    background: none;
    border: none;
    color: rgba(247, 245, 240, 0.4);
    cursor: pointer;
    padding: 4px 0 4px 12px;
    font-size: 0.6rem;
    transition: transform 0.2s, color 0.15s;
    flex-shrink: 0;
  }

  .jn-mob-toggle.open {
    transform: rotate(180deg);
    color: #52B788;
  }

  /* Mobile sub-items */
  .jn-mob-sub {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
    background: rgba(0, 0, 0, 0.15);
  }

  .jn-mob-sub.open { max-height: 200px; }

  .jn-mob-sub-link {
    display: block;
    padding: 9px 2rem 9px 3rem;
    color: rgba(247, 245, 240, 0.5);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    text-decoration: none;
    border-bottom: 1px solid rgba(168, 137, 106, 0.07);
    transition: color 0.12s, background 0.12s;
  }

  .jn-mob-sub-link:last-child { border-bottom: none; }
  .jn-mob-sub-link:hover { color: #F7F5F0; background: rgba(82, 183, 136, 0.06); }

  /* ── Responsive breakpoint ──────────────────────────────────── */
  @media (max-width: 768px) {
    /* Hide desktop link list, show hamburger */
    .jn-links { display: none; }
    .jn-mobile-btn { display: flex; align-items: center; justify-content: center; }
    /* Show mobile drawer (visibility controlled by .open class) */
    .jn-mobile-drawer { display: flex; }
  }

  @media (min-width: 769px) {
    /* Ensure drawer is fully hidden on desktop even if JS left it open */
    .jn-mobile-drawer { display: none !important; }
  }
`;

/* ── HTML builder ─────────────────────────────────────────────── */
function renderJapanNav() {
  const path = window.location.pathname;

  /* Desktop link list */
  const desktopLinks = JAPAN_NAV.links.map(link => {
    const isActive = path.startsWith(link.href);
    const chevron  = link.dropdown
      ? `<span class="jn-link-chevron" aria-hidden="true">▼</span>`
      : '';
    const drop     = link.dropdown
      ? `<ul class="jn-drop" role="menu">
          ${link.dropdown.map(d =>
            `<li><a href="${d.href}" class="jn-drop-link" role="menuitem">${d.label}</a></li>`
          ).join('')}
        </ul>`
      : '';

    return `
      <li class="jn-item">
        <a href="${link.href}" class="jn-link${isActive ? ' active' : ''}"
           aria-haspopup="${link.dropdown ? 'true' : 'false'}">
          ${link.label}${chevron}
        </a>
        ${drop}
      </li>`;
  }).join('');

  /* Mobile drawer rows */
  const mobileRows = JAPAN_NAV.links.map((link, i) => {
    const isActive = path.startsWith(link.href);
    const subLinks = link.dropdown
      ? `<div class="jn-mob-sub" id="jn-mob-sub-${i}">
          ${link.dropdown.map(d =>
            `<a href="${d.href}" class="jn-mob-sub-link">${d.label}</a>`
          ).join('')}
        </div>`
      : '';
    const toggle = link.dropdown
      ? `<button class="jn-mob-toggle" data-target="jn-mob-sub-${i}"
                 aria-label="Expand ${link.label}" aria-expanded="false">▼</button>`
      : '';

    return `
      <div>
        <div class="jn-mob-row">
          <a href="${link.href}" class="jn-mob-link${isActive ? ' active' : ''}">${link.label}</a>
          ${toggle}
        </div>
        ${subLinks}
      </div>`;
  }).join('');

  return `
    <nav class="jn-bar" aria-label="Japan section navigation">
      <div class="jn-inner">
        <div class="jn-badge">
          <span class="jn-flag" aria-hidden="true"></span>
          <a href="${JAPAN_NAV.home.href}" class="jn-badge-label">Japan</a>
        </div>
        <ul class="jn-links">${desktopLinks}</ul>
        <button class="jn-mobile-btn" id="jnMobileBtn" aria-label="Toggle Japan navigation" aria-expanded="false">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2"
               fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="6"  x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
    <div class="jn-mobile-drawer" id="jnMobileDrawer" aria-hidden="true">
      ${mobileRows}
    </div>`;
}

/* ── Init ─────────────────────────────────────────────────────── */
function initJapanHeader() {
  const container = document.getElementById('japan-sub-header');
  if (!container) return;

  /* Inject styles once */
  if (!document.getElementById('jn-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'jn-styles';
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);
  }

  container.innerHTML = renderJapanNav();

  /* ── Mobile drawer toggle ─────────────────────────────────── */
  const mobileBtn    = document.getElementById('jnMobileBtn');
  const mobileDrawer = document.getElementById('jnMobileDrawer');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
      mobileDrawer.setAttribute('aria-hidden', !isOpen);
    });

    /* ── Sub-menu toggles ───────────────────────────────────── */
    mobileDrawer.addEventListener('click', e => {
      const toggle = e.target.closest('.jn-mob-toggle');
      if (!toggle) return;

      const targetId = toggle.dataset.target;
      const sub      = document.getElementById(targetId);
      if (!sub) return;

      const isOpen = sub.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    /* ── Close drawer on outside click ─────────────────────── */
    document.addEventListener('click', e => {
      if (!container.contains(e.target)) {
        mobileDrawer.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      }
    });

    /* ── Close drawer when a leaf link is tapped ────────────── */
    mobileDrawer.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        mobileDrawer.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ── Sticky offset: track site header so Japan bar locks under it
     while it's visible, then snaps to top:0 once it scrolls away   ── */
  function updateStickyTop() {
    const siteHeader = document.querySelector('.site-header');
    if (!siteHeader) { container.style.top = '0px'; return; }
    const rect = siteHeader.getBoundingClientRect();
    // rect.bottom = distance from viewport top to bottom of site header.
    // Once <= 0, header is fully scrolled off — Japan bar locks to top:0.
    container.style.top = Math.max(0, rect.bottom) + 'px';
  }

  updateStickyTop();
  window.addEventListener('scroll', updateStickyTop, { passive: true });
  window.addEventListener('resize', updateStickyTop, { passive: true });
}

/* Run after DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initJapanHeader);
} else {
  initJapanHeader();
}
