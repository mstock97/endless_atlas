/** * japan-components.js
 * Endless-Atlas · Japan Section Navigation
 * Persistent Sticky Sub-nav
 */

const JAPAN_NAV = {
  home: { label: 'Japan', href: '/destinations/japan' },
  links: [
    {
      label: 'Tokyo',
      href: '/destinations/japan/tokyo',
      dropdown: [
        { label: 'Neighborhoods',  href: '/destinations/japan/tokyo/neighborhoods' },
        { label: 'Where to Eat',   href: '/destinations/japan/tokyo/food' },
        { label: 'Day Trips',      href: '/destinations/japan/tokyo/day-trips' },
        { label: 'Itineraries',    href: '/destinations/japan/tokyo/itineraries' },
      ],
    },
    {
      label: 'Osaka',
      href: '/destinations/japan/osaka',
      dropdown: [
        { label: 'Neighborhoods',  href: '/destinations/japan/osaka/neighborhoods' },
        { label: 'Street Food',    href: '/destinations/japan/osaka/street-food' },
        { label: 'Day Trips',      href: '/destinations/japan/osaka/day-trips' },
        { label: 'Itineraries',    href: '/destinations/japan/osaka/itineraries' },
      ],
    },
    {
      label: 'Kyoto',
      href: '/destinations/japan/kyoto',
      dropdown: [
        { label: 'Temples & Shrines', href: '/destinations/japan/kyoto/temples' },
        { label: 'Traditional Arts',  href: '/destinations/japan/kyoto/arts' },
        { label: 'Day Trips',          href: '/destinations/japan/kyoto/day-trips' },
        { label: 'Itineraries',       href: '/destinations/japan/kyoto/itineraries' },
      ],
    },
    {
      label: 'Transit Tips',
      href: '/destinations/japan/transit',
      dropdown: [
        { label: 'JR Pass Guide',  href: '/destinations/japan/transit/jr-pass' },
        { label: 'IC Cards',       href: '/destinations/japan/transit/ic-cards' },
        { label: 'Shinkansen',     href: '/destinations/japan/transit/shinkansen' },
        { label: 'Getting Around', href: '/destinations/japan/transit/local' },
      ],
    },
    {
      label: 'Food Guide',
      href: '/destinations/japan/food',
      dropdown: [
        { label: 'Regional Dishes',    href: '/destinations/japan/food/regional' },
        { label: 'Ramen Deep Dive',    href: '/destinations/japan/food/ramen' },
        { label: 'Izakaya Culture',    href: '/destinations/japan/food/izakaya' },
        { label: 'Vegetarian & Vegan', href: '/destinations/japan/food/vegetarian' },
      ],
    },
  ],
};

const STYLES = `
  :root {
    --ea-forest:    #1E4034;
    --ea-canopy:    #2D6A4F;
    --ea-moss:      #52B788;
    --ea-drift:     #A8896A;
    --ea-paper:     #F7F5F0;
    --ea-ink:       #0F0F0F;
    --ea-stone:     #5C5346;

    --jn-bar-h:     46px;
    --jn-drop-bg:   #122B21;
    --jn-bdr:       rgba(168, 137, 106, 0.15);
    --jn-txt:       rgba(247, 245, 240, 0.62);
    --jn-txt-h:     #F7F5F0;
  }

  /* Target the specific container in your HTML */
  #japan-sub-header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: var(--ea-forest);
    border-bottom: 1px solid var(--jn-bdr);
  }

  .ea-japan-bar {
    height: var(--jn-bar-h);
    display: flex;
    align-items: center;
    position: relative;
  }

  .ea-japan-bar-inner {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 5%;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
  }

  .ea-japan-region {
    display: flex;
    align-items: center;
    gap: 9px;
    padding-right: 18px;
    margin-right: 4px;
    border-right: 1px solid var(--jn-bdr);
    flex-shrink: 0;
  }

  .ea-japan-flag {
    width: 17px; height: 12px;
    background: #fff;
    border-radius: 1px;
    position: relative;
    flex-shrink: 0;
  }

  .ea-japan-flag::after {
    content: '';
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #BC002D;
  }

  .ea-japan-region-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.06rem;
    letter-spacing: 0.13em;
    color: var(--ea-paper);
    text-decoration: none;
  }

  .ea-japan-links {
    display: flex;
    align-items: center;
    height: 100%;
    flex: 1;
  }

  .ea-japan-item {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .ea-japan-link {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--jn-txt);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0 14px;
    height: 100%;
    border-right: 1px solid var(--jn-bdr);
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .ea-japan-item:hover .ea-japan-link {
    color: var(--jn-txt-h);
    background: rgba(82, 183, 136, 0.06);
  }

  .ea-japan-link.active::after {
    content: '';
    position: absolute; bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: var(--ea-moss);
  }

  .ea-japan-drop {
    position: absolute;
    top: 100%; left: 0;
    min-width: 178px;
    background: var(--jn-drop-bg);
    border: 1px solid var(--jn-bdr);
    border-top: 2px solid var(--ea-moss);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4px);
    transition: all 0.16s ease;
    z-index: 500;
  }

  .ea-japan-item:hover .ea-japan-drop {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .ea-japan-drop-link {
    display: block;
    padding: 8px 14px;
    color: var(--jn-txt);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    text-decoration: none;
  }

  .ea-japan-drop-link:hover {
    color: #F7F5F0;
    background: rgba(82, 183, 136, 0.07);
  }

  @media (max-width: 900px) {
    .ea-japan-links { overflow-x: auto; scrollbar-width: none; }
    .ea-japan-link { font-size: 0.65rem; padding: 0 11px; }
  }
`;

function renderJapanNav() {
  const path = window.location.pathname;
  const linksHTML = JAPAN_NAV.links.map(link => {
    const isActive = path.startsWith(link.href);
    const dropHTML = link.dropdown ? `
      <div class="ea-japan-drop">
        ${link.dropdown.map(d => `<a href="${d.href}" class="ea-japan-drop-link">${d.label}</a>`).join('')}
      </div>` : '';

    return `
      <div class="ea-japan-item">
        <a href="${link.href}" class="ea-japan-link${isActive ? ' active' : ''}">${link.label}</a>
        ${dropHTML}
      </div>`;
  }).join('');

  return `
    <nav class="ea-japan-bar">
      <div class="ea-japan-bar-inner">
        <div class="ea-japan-region">
          <span class="ea-japan-flag"></span>
          <a href="${JAPAN_NAV.home.href}" class="ea-japan-region-label">${JAPAN_NAV.home.label}</a>
        </div>
        <div class="ea-japan-links">
          ${linksHTML}
        </div>
      </div>
    </nav>`;
}

function initJapanHeader() {
  const container = document.getElementById('japan-sub-header');
  if (!container) return;

  const styleEl = document.createElement('style');
  styleEl.textContent = STYLES;
  document.head.appendChild(styleEl);

  container.innerHTML = renderJapanNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initJapanHeader);
} else {
  initJapanHeader();
}
