/**
 * japan-components.js
 * Injects a Japan-specific sticky sub-header below the main site header.
 * The global header scrolls away naturally; this bar remains pinned.
 * Include this script on every page in the /destinations/japan/ section.
 */

const JAPAN_NAV = {
  home: { label: 'Japan', href: '/destinations/japan' },
  links: [
    { label: 'Tokyo',        href: '/destinations/japan/tokyo',        icon: '🗼' },
    { label: 'Osaka',        href: '/destinations/japan/osaka',        icon: '🏯' },
    { label: 'Kyoto',        href: '/destinations/japan/kyoto',        icon: '⛩️' },
    { label: 'Hiroshima',    href: '/destinations/japan/hiroshima',    icon: '🕊️' },
    { label: 'Hokkaido',     href: '/destinations/japan/hokkaido',     icon: '🌨️' },
    { label: 'Transit Tips', href: '/destinations/japan/transit',      icon: '🚄' },
    { label: 'Food Guide',   href: '/destinations/japan/food',         icon: '🍜' },
  ],
};

const JAPAN_SUBNAV_STYLES = `
  :root {
    --japan-bar-height: 46px;
    --japan-bar-bg: rgba(14, 30, 24, 0.97);
    --japan-bar-border: rgba(234, 230, 219, 0.12);
    --japan-accent: #C8A97E;
    --japan-text: rgba(234, 230, 219, 0.85);
    --japan-text-hover: #EAE6DB;
    --japan-active: #C8A97E;
  }

  /* Push body content down to account for both headers */
  body {
    padding-top: var(--japan-bar-height) !important;
  }

  /* ---- GLOBAL HEADER: scroll-aware ---- */
  /* The main site header is position:sticky by default in main.css.
     We let it scroll away naturally — no changes needed to it. */

  /* ---- JAPAN SUB-HEADER ---- */
  .japan-subnav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--japan-bar-height);
    z-index: 9999;
    background: var(--japan-bar-bg);
    border-bottom: 1px solid var(--japan-bar-border);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s ease;
    box-shadow: 0 1px 0 rgba(200, 169, 126, 0.08);
  }

  .japan-subnav.hidden {
    transform: translateY(-100%);
    box-shadow: none;
  }

  .japan-subnav-inner {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 5%;
    gap: 0;
    max-width: 1600px;
    margin: 0 auto;
  }

  /* ---- HOME PILL ---- */
  .japan-subnav-home {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    text-decoration: none;
    color: var(--japan-accent);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.1em;
    white-space: nowrap;
    padding-right: 1.2rem;
    margin-right: 0.5rem;
    border-right: 1px solid var(--japan-bar-border);
    transition: color 0.2s ease;
    flex-shrink: 0;
  }

  .japan-subnav-home:hover {
    color: var(--japan-text-hover);
  }

  .japan-subnav-home-flag {
    font-size: 0.95rem;
    line-height: 1;
  }

  /* ---- SCROLLABLE LINK STRIP ---- */
  .japan-subnav-links {
    display: flex;
    align-items: center;
    gap: 0;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    flex: 1;
    height: 100%;
  }

  .japan-subnav-links::-webkit-scrollbar {
    display: none;
  }

  .japan-subnav-link {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    text-decoration: none;
    color: var(--japan-text);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 0 0.95rem;
    height: 100%;
    border-right: 1px solid var(--japan-bar-border);
    transition: color 0.2s ease, background 0.2s ease;
    position: relative;
  }

  .japan-subnav-link:first-child {
    border-left: 1px solid var(--japan-bar-border);
  }

  .japan-subnav-link:hover {
    color: var(--japan-text-hover);
    background: rgba(234, 230, 219, 0.04);
  }

  .japan-subnav-link.active {
    color: var(--japan-active);
  }

  .japan-subnav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--japan-accent);
  }

  .japan-link-icon {
    font-size: 0.85rem;
    line-height: 1;
  }

  /* ---- SCROLL HINT FADE (desktop) ---- */
  .japan-subnav-fade {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 100%;
    background: linear-gradient(to right, transparent, var(--japan-bar-bg));
    pointer-events: none;
    display: none;
  }

  @media (max-width: 768px) {
    .japan-subnav-fade {
      display: block;
    }

    .japan-subnav-link {
      font-size: 0.75rem;
      padding: 0 0.7rem;
    }

    .japan-subnav-home {
      font-size: 1rem;
      padding-right: 0.85rem;
    }

    .japan-link-icon {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .japan-subnav-inner {
      padding: 0 3%;
    }
  }
`;

function renderJapanSubnav() {
  const linksHTML = JAPAN_NAV.links.map(link => {
    const path = window.location.pathname;
    const isActive = path === link.href || path.startsWith(link.href + '/') || path.startsWith(link.href + '?');
    return `
      <a href="${link.href}" class="japan-subnav-link${isActive ? ' active' : ''}">
        <span class="japan-link-icon">${link.icon}</span>
        ${link.label}
      </a>
    `;
  }).join('');

  return `
    <nav class="japan-subnav" id="japanSubnav" aria-label="Japan section navigation">
      <div class="japan-subnav-inner">
        <a href="${JAPAN_NAV.home.href}" class="japan-subnav-home">
          <span class="japan-subnav-home-flag">🇯🇵</span>
          ${JAPAN_NAV.home.label}
        </a>
        <div class="japan-subnav-links" id="japanSubnavLinks">
          ${linksHTML}
        </div>
        <div class="japan-subnav-fade"></div>
      </div>
    </nav>
  `;
}

function injectJapanStyles() {
  const styleEl = document.createElement('style');
  styleEl.id = 'japan-subnav-styles';
  styleEl.textContent = JAPAN_SUBNAV_STYLES;
  document.head.appendChild(styleEl);
}

function initJapanSubnav() {
  injectJapanStyles();

  // Insert subnav as the very first element in <body>
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderJapanSubnav();
  document.body.insertBefore(wrapper.firstElementChild, document.body.firstChild);

  // Scroll-hide logic: hide only when scrolling DOWN past the main site header.
  // Reappear instantly on scroll UP.
  let lastScrollY = window.scrollY;
  let ticking = false;

  // Approximate main header height — adjust if your main.css changes this
  const MAIN_HEADER_THRESHOLD = 60;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const subnav = document.getElementById('japanSubnav');
        if (!subnav) { ticking = false; return; }

        const currentY = window.scrollY;
        const scrollingDown = currentY > lastScrollY;

        // Hide sub-nav when scrolling DOWN and past the main header;
        // show it the moment the user scrolls UP at all.
        if (scrollingDown && currentY > MAIN_HEADER_THRESHOLD) {
          subnav.classList.add('hidden');
        } else if (!scrollingDown) {
          subnav.classList.remove('hidden');
        }

        lastScrollY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Scroll active link into view on mobile
  const activeLink = document.querySelector('.japan-subnav-link.active');
  if (activeLink) {
    const strip = document.getElementById('japanSubnavLinks');
    if (strip) {
      setTimeout(() => {
        const linkLeft = activeLink.offsetLeft;
        const linkWidth = activeLink.offsetWidth;
        const stripWidth = strip.offsetWidth;
        strip.scrollLeft = linkLeft - (stripWidth / 2) + (linkWidth / 2);
      }, 50);
    }
  }
}

// Fire after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initJapanSubnav);
} else {
  initJapanSubnav();
}
