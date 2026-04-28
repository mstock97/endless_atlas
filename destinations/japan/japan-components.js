/** 
 * japan-components.js
 * Endless-Atlas · Japan Section Navigation
 * Two-tier bar: brand strip (top) + destination sub-nav with dropdowns.
 * Drop this script on every page under /destinations/japan/
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
        { label: 'Day Trips',         href: '/destinations/japan/kyoto/day-trips' },
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

/* ─────────────────────────────────────────────
   Brand palette (Endless-Atlas style guide v1.2)
   Forest #1E4034 · Canopy #2D6A4F · Moss #52B788
   Driftwood #A8896A · Paper #F7F5F0 · Ink #0F0F0F
   Fonts: Bebas Neue (display) / DM Sans (body)
───────────────────────────────────────────── */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --ea-forest:    #1E4034;
    --ea-canopy:    #2D6A4F;
    --ea-moss:      #52B788;
    --ea-drift:     #A8896A;
    --ea-paper:     #F7F5F0;
    --ea-ink:       #0F0F0F;
    --ea-stone:     #5C5346;

    --jn-strip-h:   26px;
    --jn-bar-h:     46px;
    --jn-total-h:   72px;
    --jn-drop-bg:   #122B21;
    --jn-bdr:       rgba(168, 137, 106, 0.15);
    --jn-txt:       rgba(247, 245, 240, 0.62);
    --jn-txt-h:     #F7F5F0;
  }

  body {
    padding-top: var(--jn-total-h) !important;
  }

  .ea-japan-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ea-japan-header.hidden {
    transform: translateY(-100%);
  }

  /* ── BRAND STRIP ── */
  .ea-japan-strip {
    background: var(--ea-ink);
    height: var(--jn-strip-h);
    display: flex;
    align-items: center;
  }

  .ea-japan-strip-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 5%;
  }

  .ea-japan-brand {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    color: var(--ea-paper);
    opacity: 0.9;
    text-decoration: none;
    text-transform: uppercase;
    transition: opacity 0.18s;
  }

  .ea-japan-brand:hover {
    opacity: 1;
  }

  .ea-japan-edition {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ea-drift);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ea-japan-edition::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 1px;
    background: var(--ea-drift);
    opacity: 0.4;
  }

  /* ── MAIN NAV BAR ── */
  .ea-japan-bar {
    background: var(--ea-forest);
    height: var(--jn-bar-h);
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--jn-bdr);
    position: relative;
    overflow: visible;
  }

  .ea-japan-bar-inner {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 5%;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
    overflow: visible;
  }

  /* ── REGION LABEL ── */
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
    width: 17px;
    height: 12px;
    background: #fff;
    border-radius: 1px;
    position: relative;
    flex-shrink: 0;
  }

  .ea-japan-flag::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #BC002D;
  }

  .ea-japan-region-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.06rem;
    letter-spacing: 0.13em;
    color: var(--ea-paper);
    line-height: 1;
    text-decoration: none;
    transition: color 0.18s;
  }

  .ea-japan-region-label:hover {
    color: var(--ea-moss);
  }

  /* ── LINK STRIP ── */
  .ea-japan-links {
    display: flex;
    align-items: center;
    height: 100%;
    flex: 1;
    overflow: visible;
  }

  .ea-japan-item {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  /* ── NAV LINK ── */
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
    white-space: nowrap;
    padding: 0 14px;
    height: 100%;
    border-right: 1px solid var(--jn-bdr);
    text-decoration: none;
    cursor: pointer;
    position: relative;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .ea-japan-item:first-child .ea-japan-link {
    border-left: 1px solid var(--jn-bdr);
  }

  .ea-japan-item:hover .ea-japan-link {
    color: var(--jn-txt-h);
    background: rgba(82, 183, 136, 0.06);
  }

  .ea-japan-link.active {
    color: #fff;
  }

  .ea-japan-link.active::after,
  .ea-japan-item:hover .ea-japan-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--ea-moss);
  }

  .ea-japan-chev {
    font-size: 0.45rem;
    opacity: 0.35;
    margin-left: 1px;
    transition: transform 0.18s ease, opacity 0.18s ease;
    display: inline-block;
    line-height: 1;
  }

  .ea-japan-item:hover .ea-japan-chev {
    transform: rotate(180deg);
    opacity: 0.6;
  }

  /* ── DROPDOWN ── */
  .ea-japan-drop {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 178px;
    background: var(--jn-drop-bg);
    border: 1px solid var(--jn-bdr);
    border-top: 2px solid var(--ea-moss);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4px);
    transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s;
    pointer-events: none;
    z-index: 500;
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.48), 0 4px 12px rgba(0, 0, 0, 0.24);
  }

  .ea-japan-item:hover .ea-japan-drop {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }

  .ea-japan-drop-head {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    color: var(--ea-drift);
    text-transform: uppercase;
    padding: 10px 14px 6px;
    border-bottom: 1px solid var(--jn-bdr);
  }

  .ea-japan-drop-link {
    display: flex;
    align-items: center;
    padding: 8px 14px;
    color: rgba(247, 245, 240, 0.62);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.01em;
    text-decoration: none;
    cursor: pointer;
    border-left: 2px solid transparent;
    border-radius: 0;
    transition: color 0.13s ease, background 0.13s ease, padding-left 0.13s ease, border-color 0.13s ease;
  }

  .ea-japan-drop-link::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--ea-drift);
    opacity: 0.4;
    margin-right: 9px;
    flex-shrink: 0;
    transition: background 0.13s ease, opacity 0.13s ease;
  }

  .ea-japan-drop-link:hover {
    color: #F7F5F0;
    background: rgba(82, 183, 136, 0.07);
    padding-left: 18px;
    border-left-color: var(--ea-moss);
  }

  .ea-japan-drop-link:hover::before {
    background: var(--ea-moss);
    opacity: 1;
  }

  .ea-japan-drop-link:last-child {
    margin-bottom: 4px;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .ea-japan-links {
      overflow-x: auto;
      overflow-y: visible;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .ea-japan-links::-webkit-scrollbar { display: none; }

    .ea-japan-link {
      font-size: 0.65rem;
      padding: 0 11px;
    }
  }

  @media (max-width: 600px) {
    .ea-japan-bar-inner,
    .ea-japan-strip-inner {
      padding: 0 3%;
    }
  }
`;

/* ─────────────────────────────────────────────
   RENDER
───────────────────────────────────────────── */

function renderHeader() {
  const path = window.location.pathname;

  const linksHTML = JAPAN_NAV.links.map(link => {
    const isActive =
      path === link.href ||
      path.startsWith(link.href + '/') ||
      path.startsWith(link.href + '?');

    const dropHTML = link.dropdown && link.dropdown.length
      ? `<div class="ea-japan-drop" role="menu" aria-label="${link.label} pages">
           <span class="ea-japan-drop-head">${link.label}</span>
           ${link.dropdown.map(d => `<a href="${d.href}" class="ea-japan-drop-link" role="menuitem">${d.label}</a>`).join('')}
         </div>`
      : '';

    const chev = link.dropdown && link.dropdown.length
      ? `<span class="ea-japan-chev" aria-hidden="true">&#9660;</span>`
      : '';

    return `
      <div class="ea-japan-item">
        <a href="${link.href}"
           class="ea-japan-link${isActive ? ' active' : ''}"
           ${link.dropdown ? 'aria-haspopup="true" aria-expanded="false"' : ''}
        >${link.label}${chev}</a>
        ${dropHTML}
      </div>`;
  }).join('');

  return `
    <header class="ea-japan-header" id="eaJapanHeader" aria-label="Japan section">
      <div class="ea-japan-strip" role="banner">
        <div class="ea-japan-strip-inner">
          <a href="/" class="ea-japan-brand">Endless&#8202;Atlas</a>
          <span class="ea-japan-edition">Japan Edition</span>
        </div>
      </div>
      <nav class="ea-japan-bar" aria-label="Japan destinations">
        <div class="ea-japan-bar-inner">
          <div class="ea-japan-region">
            <span class="ea-japan-flag" role="img" aria-label="Japan flag"></span>
            <a href="${JAPAN_NAV.home.href}" class="ea-japan-region-label">${JAPAN_NAV.home.label}</a>
          </div>
          <div class="ea-japan-links" role="menubar">
            ${linksHTML}
          </div>
        </div>
      </nav>
    </header>`;
}

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */

function injectStyles() {
  const el = document.createElement('style');
  el.id = 'ea-japan-styles';
  el.textContent = STYLES;
  document.head.appendChild(el);
}

function initJapanHeader() {
  injectStyles();

  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderHeader().trim();
  document.body.insertBefore(wrapper.firstElementChild, document.body.firstChild);

  let lastY = window.scrollY;
  let ticking = false;
  const THRESHOLD = 60;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const header = document.getElementById('eaJapanHeader');
        if (!header) { ticking = false; return; }
        const y = window.scrollY;
        if (y > lastY && y > THRESHOLD) {
          header.classList.add('hidden');
        } else if (y < lastY) {
          header.classList.remove('hidden');
        }
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  document.querySelectorAll('.ea-japan-item').forEach(item => {
    const trigger = item.querySelector('.ea-japan-link');
    const drop = item.querySelector('.ea-japan-drop');
    if (!drop) return;

    trigger.addEventListener('keydown', e => {
      if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        trigger.setAttribute('aria-expanded', 'true');
        Object.assign(drop.style, { opacity:'1', visibility:'visible', transform:'translateY(0)', pointerEvents:'auto' });
        drop.querySelector('.ea-japan-drop-link')?.focus();
      }
    });

    drop.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        trigger.setAttribute('aria-expanded', 'false');
        Object.assign(drop.style, { opacity:'', visibility:'', transform:'', pointerEvents:'' });
        trigger.focus();
      }
    });
  });

  const active = document.querySelector('.ea-japan-link.active');
  if (active) {
    const strip = active.closest('.ea-japan-links');
    if (strip) {
      setTimeout(() => {
        const item = active.parentElement;
        strip.scrollLeft = item.offsetLeft - (strip.offsetWidth / 2) + (item.offsetWidth / 2);
      }, 60);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initJapanHeader);
} else {
  initJapanHeader();
}
