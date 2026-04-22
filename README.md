# WanderNotes – Setup Guide

## Project Structure

```
travel-site/
├── index.html                      ← Homepage
├── articles/
│   └── sample-article/
│       └── index.html              ← Article template (copy this for every new article)
├── assets/
│   ├── css/
│   │   └── main.css                ← All styles (design tokens, components, widgets)
│   └── js/
│       ├── components.js           ← Shared header + footer (auto-injected)
│       └── widgets.js              ← Currency, weather, TOC, share buttons
└── README.md
```

---

## Phase 1: GitHub Setup

### 1. Create your GitHub account
Go to github.com and sign up.

### 2. Create your repository
- Click **+** → **New repository**
- Name it: `yourusername.github.io`
- Set to **Public**
- Check **Add a README file**
- Click **Create repository**

### 3. Upload your files
- Click **Add file** → **Upload files**
- Drag in everything from this folder
- Commit directly to `main`

---

## Phase 2: Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under "Branch", select `main` → `/ (root)` → **Save**
3. Your site will be live at `https://yourusername.github.io` within ~2 minutes

---

## Phase 3: Connect Your Domain via Cloudflare

### Add your domain to Cloudflare
1. Go to cloudflare.com → **Add a site** → enter your domain
2. Choose the **Free plan**
3. Cloudflare will show you two nameservers (e.g., `ada.ns.cloudflare.com`)

### Update nameservers at your registrar
Log into wherever you bought your domain and replace the existing nameservers
with the two Cloudflare ones. DNS propagation takes up to 48 hours (usually under 2).

### Add DNS records in Cloudflare
Go to **DNS** → **Add record** and add these four:

| Type  | Name | Content            | Proxy |
|-------|------|--------------------|-------|
| A     | @    | 185.199.108.153    | ✅    |
| A     | @    | 185.199.109.153    | ✅    |
| A     | @    | 185.199.110.153    | ✅    |
| A     | @    | 185.199.111.153    | ✅    |
| CNAME | www  | yourusername.github.io | ✅ |

These are GitHub Pages' IP addresses.

### Tell GitHub your custom domain
1. In your repo → **Settings** → **Pages**
2. Under "Custom domain", enter `yourdomain.com` → **Save**
3. A `CNAME` file will be created automatically in your repo
4. Check **Enforce HTTPS** once it's available (may take a few minutes)

---

## Phase 4: QA Subdomain (qa.yourdomain.com)

### Create a QA branch in GitHub
```bash
git checkout -b qa
git push origin qa
```

### Enable Pages on the QA branch
1. **Settings** → **Pages**
2. Change branch from `main` to `qa`

Note: GitHub Pages only serves one branch at a time from the same repo.
For a true parallel QA environment, create a **second repo** named `qa-yoursite`
and point the subdomain there.

### Add QA DNS record in Cloudflare
| Type  | Name | Content                  | Proxy |
|-------|------|--------------------------|-------|
| CNAME | qa   | yourusername.github.io   | ✅    |

### Add CNAME file to QA repo/branch
Create a file named `CNAME` (no extension) containing:
```
qa.yourdomain.com
```

The purple QA banner will automatically appear on `qa.yourdomain.com` —
it's triggered by `components.js` checking the hostname.

---

## How to Add a New Article

1. Copy the folder: `articles/sample-article/` → `articles/your-article-name/`
2. Edit `index.html` inside it:
   - Update `<title>`, `<meta name="description">`, `.article-title`, `.article-subtitle`
   - Replace the article body content
   - Set `data-city="YourCity"` on `#widget-weather` to pre-load the right city
   - Update the related articles widget links
3. Commit and push — GitHub Pages builds automatically

---

## How Shared Components Work

Every page has two placeholder divs:
```html
<div id="site-header"></div>
<div id="site-footer"></div>
```

`components.js` injects the full header and footer HTML at page load.
To update the nav, footer links, or site name: **edit `components.js` once**
and every page updates automatically.

```javascript
// In components.js — edit these to change nav:
const NAV_LINKS = [
  { label: 'Destinations', href: '/destinations/' },
  { label: 'Travel Tips',  href: '/tips/' },
  // Add more here...
];
```

---

## Available Widgets

### Currency Converter
- Add `id="widget-currency"` to your widget div
- Uses free ExchangeRate-API (no key needed)

### Weather
- Add `id="widget-weather"` and `data-city="CityName"` to pre-load a location
- Uses Open-Meteo (free, no key needed)

### Table of Contents
- Add `<ul class="toc-list" id="toc-list"></ul>` in your sidebar
- Auto-generates from all `h2` and `h3` tags in `.article-body`
- Highlights the active section as you scroll

### Share Buttons
- Add `data-share="twitter"`, `data-share="facebook"`, or `data-share="copy"` to any button
