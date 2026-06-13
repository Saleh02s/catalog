# 166 — Service Catalog Magazine (Local Demo)

A modern, interactive **digital service catalog** for the company **166**, designed to feel
like flipping through a real printed magazine — built with plain HTML, CSS and JavaScript.

> This is a **local test/demo project only**. There is no backend, database, login,
> payment, booking, hosting, or deployment configuration. Buttons like *Request service*
> and *Contact us* are intentionally non-functional (they show a small demo notice).

## Features

- **Magazine cover** with the big `166` / `Our Services` branding.
- **Table of Contents** with rounded, clickable service cards that jump straight to a page.
- **Dedicated service pages** for every category, with descriptions, image placeholders,
  service lists and call-to-action buttons.
- **Open two-page spread** — the cover shows as a single front page, then the magazine
  opens into a realistic two-page spread (left + right) with a center fold/spine, paper
  texture, page depth, and a smooth 3D page-flip animation.
- **Multiple ways to navigate:** Previous/Next buttons, the Contents button,
  keyboard arrow keys (← →), and swipe on touch devices.
- **Fully responsive** and mobile-friendly.
- **Brand colors:** yellow (main) with black and warm off-white paper.

## How to run locally

You only need a static file server (so the fonts/scripts load correctly).

### Option 1 — Python (already on macOS)

```bash
cd /Users/salehsalehli/Desktop/Catalog
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

### Option 2 — Node (if you prefer)

```bash
cd /Users/salehsalehli/Desktop/Catalog
npx serve .
```

### Option 3 — Just open the file

You can also double-click `index.html` to open it directly in a browser.
(A local server is recommended for the smoothest experience.)

## Project structure

```
Catalog/
├── index.html   # Page shell: top bar, book container, nav controls
├── styles.css   # Brand theme, magazine layout, flip animations, responsive rules
├── script.js    # Service content data + flipbook engine
└── README.md
```

## Editing the content

All service categories live in the `CATEGORIES` array near the top of `script.js`.
Each entry has a `name`, `desc`, an `icon`, and a `services` list — edit those to change
what appears in the catalog. Pages are generated automatically from this data and paired
into two-page "leaves", so the Table of Contents, spreads, and page numbers stay in sync.

### Photos

Photos live in the `images/` folder. Each category points at a file via its
`image:` field in `CATEGORIES` (e.g. `images/furniture.jpg`), and that photo is
shown on the contents card, the category opener page, and the service rows.
Missing files fall back to the line icon automatically. See
[`images/README.md`](images/README.md) for the full filename list and tips.
