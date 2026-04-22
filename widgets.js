/**
 * widgets.js
 * Self-contained widget logic for:
 *  - Currency Converter
 *  - Weather
 *  - Table of Contents (auto-generated)
 *  - Share Buttons
 */

// ─── CURRENCY CONVERTER ───────────────────────────────────────────────────────
function initCurrencyWidget() {
  const widget = document.getElementById('widget-currency');
  if (!widget) return;

  const fromInput  = widget.querySelector('#currency-amount');
  const fromSelect = widget.querySelector('#currency-from');
  const toSelect   = widget.querySelector('#currency-to');
  const resultEl   = widget.querySelector('#currency-result');
  const swapBtn    = widget.querySelector('#currency-swap');

  // Uses a free public API - no key needed for basic rates
  const API_URL = 'https://api.exchangerate-api.com/v4/latest/';
  let rates = {};

  async function fetchRates(base) {
    try {
      resultEl.textContent = 'Loading…';
      const res  = await fetch(`${API_URL}${base}`);
      const data = await res.json();
      rates = data.rates;
      convert();
    } catch {
      resultEl.textContent = 'Rates unavailable';
    }
  }

  function convert() {
    const amount = parseFloat(fromInput.value);
    const to     = toSelect.value;
    if (isNaN(amount) || !rates[to]) {
      resultEl.textContent = '—';
      return;
    }
    const converted = (amount * rates[to]).toFixed(2);
    resultEl.textContent = `${converted} ${to}`;
  }

  fromSelect.addEventListener('change', () => fetchRates(fromSelect.value));
  fromInput.addEventListener('input',   convert);
  toSelect.addEventListener('change',   convert);

  swapBtn.addEventListener('click', () => {
    const tmp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value   = tmp;
    fetchRates(fromSelect.value);
  });

  fetchRates(fromSelect.value);
}

// ─── WEATHER WIDGET ───────────────────────────────────────────────────────────
function initWeatherWidget() {
  const widget = document.getElementById('widget-weather');
  if (!widget) return;

  const input     = widget.querySelector('#weather-city');
  const searchBtn = widget.querySelector('#weather-search');
  const display   = widget.querySelector('#weather-display');

  // Uses Open-Meteo (free, no key) + geocoding API
  async function fetchWeather(city) {
    display.innerHTML = '<div style="text-align:center;color:var(--ink-light);font-size:.85rem">Loading…</div>';
    try {
      // Step 1: geocode city name
      const geoRes  = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      );
      const geoData = await geoRes.json();
      if (!geoData.results?.length) throw new Error('City not found');

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: fetch weather
      const wxRes  = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current_weather=true&hourly=relativehumidity_2m,windspeed_10m,precipitation_probability`
      );
      const wxData = await wxRes.json();
      const w      = wxData.current_weather;

      const icons = {
        0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️',
        45:'🌫️', 48:'🌫️',
        51:'🌦️', 61:'🌧️', 71:'🌨️', 80:'🌦️',
        95:'⛈️', 99:'⛈️',
      };
      const icon = icons[w.weathercode] || '🌡️';

      display.innerHTML = `
        <div class="weather-display">
          <div class="weather-icon">${icon}</div>
          <div class="weather-temp">${Math.round(w.temperature)}°C</div>
          <div class="weather-desc">${name}, ${country}</div>
          <div class="weather-details">
            <div class="weather-detail">
              <div class="weather-detail-label">Wind</div>
              <div class="weather-detail-value">${w.windspeed} km/h</div>
            </div>
            <div class="weather-detail">
              <div class="weather-detail-label">Humidity</div>
              <div class="weather-detail-value">${wxData.hourly.relativehumidity_2m[0]}%</div>
            </div>
            <div class="weather-detail">
              <div class="weather-detail-label">Rain chance</div>
              <div class="weather-detail-value">${wxData.hourly.precipitation_probability[0]}%</div>
            </div>
            <div class="weather-detail">
              <div class="weather-detail-label">Wind dir.</div>
              <div class="weather-detail-value">${w.winddirection}°</div>
            </div>
          </div>
        </div>
      `;
    } catch (e) {
      display.innerHTML = `<div style="text-align:center;color:var(--clay);font-size:.85rem">
        Could not load weather. Try another city name.
      </div>`;
    }
  }

  searchBtn.addEventListener('click', () => {
    const city = input.value.trim();
    if (city) fetchWeather(city);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchBtn.click();
  });

  // Auto-load default city if set
  const defaultCity = widget.dataset.city;
  if (defaultCity) {
    input.value = defaultCity;
    fetchWeather(defaultCity);
  }
}

// ─── TABLE OF CONTENTS ────────────────────────────────────────────────────────
function initTOC() {
  const tocList = document.getElementById('toc-list');
  const body    = document.querySelector('.article-body');
  if (!tocList || !body) return;

  const headings = body.querySelectorAll('h2, h3');
  if (!headings.length) return;

  headings.forEach((h, i) => {
    if (!h.id) h.id = `section-${i}`;
    const li = document.createElement('li');
    li.innerHTML = `<a href="#${h.id}" class="${h.tagName === 'H3' ? 'toc-h3' : ''}">${h.textContent}</a>`;
    tocList.appendChild(li);
  });

  // Highlight active section on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id   = entry.target.id;
      const link = tocList.querySelector(`a[href="#${id}"]`);
      if (entry.isIntersecting) {
        tocList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  headings.forEach(h => observer.observe(h));
}

// ─── SHARE BUTTONS ────────────────────────────────────────────────────────────
function initShareButtons() {
  const url   = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.share;
      if (type === 'twitter')  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`);
      if (type === 'facebook') window.open(`https://facebook.com/sharer/sharer.php?u=${url}`);
      if (type === 'copy') {
        navigator.clipboard.writeText(window.location.href);
        btn.textContent = '✓ Copied!';
        setTimeout(() => btn.textContent = '🔗 Copy link', 2000);
      }
    });
  });
}

// ─── INIT ALL ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCurrencyWidget();
  initWeatherWidget();
  initTOC();
  initShareButtons();
});
