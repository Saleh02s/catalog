/* ============================================================
   166 — Service Catalog Magazine
   Two-page open-spread flipbook (vanilla JS), print-catalog layout.
   No page scrolls internally: content is split across spreads instead.
   ============================================================ */

/* ---------- Inline SVG icons (stroke style) ---------- */
const ICONS = {
  furniture: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M3 14a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3H3z"/><line x1="5" y1="17" x2="5" y2="20"/><line x1="19" y1="17" x2="19" y2="20"/></svg>',
  plumbing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a6 6 0 0 0 6-6c0-4-6-10-6-10S6 12 6 16a6 6 0 0 0 6 6z"/></svg>',
  ac: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="9" rx="2"/><line x1="6" y1="9" x2="18" y2="9"/><path d="M7 17c0 1.5 1 2 1 3"/><path d="M12 17c0 1.5 1 2 1 3"/><path d="M17 17c0 1.5 1 2 1 3"/></svg>',
  appliance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="13" r="4"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/></svg>',
  electrical: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  boiler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="14" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><line x1="8" y1="17" x2="8" y2="21"/><line x1="16" y1="17" x2="16" y2="21"/></svg>',
  packing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><line x1="12" y1="13" x2="12" y2="21"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
};

/* ---------- Service catalog data (easy to edit) ---------- */
const CATEGORIES = [
  {
    id: 'furniture', name: 'Furniture Services', icon: ICONS.furniture,
    services: ['Furniture assembly', 'Furniture disassembly', 'Furniture repair', 'Furniture packing', 'Assembly of cargo furniture'],
  },
  {
    id: 'plumbing', name: 'Plumbing Services', icon: ICONS.plumbing,
    services: ['Leak detection & repair', 'Faucet & tap installation', 'Pipe installation & replacement', 'Drain unclogging', 'Bathroom & kitchen fittings'],
  },
  {
    id: 'ac', name: 'Air Conditioner Services', icon: ICONS.ac,
    services: ['Air conditioner disassembly', 'Air conditioner assembly / installation', 'Filter replacement', 'Air conditioner repair', 'Air conditioner cleaning / washing', 'Relocation: disassemble & re-install at a new address'],
  },
  {
    id: 'appliance', name: 'Small Household Appliances', icon: ICONS.appliance,
    services: ['Repair of small household appliances'],
  },
  {
    id: 'electrical', name: 'Electrical Services', icon: ICONS.electrical,
    services: ['Electrical cable installation', 'Chandelier repair', 'Chandelier assembly', 'Chandelier installation'],
  },
  {
    id: 'boiler', name: 'Combi Boiler Services', icon: ICONS.boiler,
    services: ['Combi boiler system installation', 'Combi boiler repair', 'Cleaning / washing of radiators & boiler system'],
  },
  {
    id: 'packing', name: 'Packing / Boxing Services', icon: ICONS.packing,
    services: ['Packing belongings into boxes', 'Preparing items for moving', 'Organizing packed items', 'Safe packaging for transportation'],
  },
];

const pad = (n) => String(n).padStart(2, '0');
const sheetHead = (pageNo, label = 'Available Services') =>
  `<div class="sheet-head"><span class="sh-left">${label}</span><span class="sh-right">Page ${pad(pageNo)}</span></div>`;

/* ---------- Face (single page) HTML builders ---------- */
function coverHTML() {
  return `
    <div class="page-inner cover-inner">
      <span class="cover-deco c1"></span>
      <span class="cover-deco c2"></span>
      <span class="cover-deco c3"></span>
      <div class="cover-top">
        <span>Service Catalog</span>
        <span class="cover-issue">Edition 01</span>
      </div>
      <div class="cover-center">
        <h1 class="cover-number">166</h1>
        <h2 class="cover-services">Our Services</h2>
        <p class="cover-tagline">Your trusted partner for home &amp; office services — all in one catalog.</p>
      </div>
      <div class="cover-bottom">
        <span class="cover-hint">Flip to open ${ICONS.hand}</span>
      </div>
    </div>`;
}

function tocCard(cat, num) {
  return `
    <a class="toc-card" href="#${cat.id}" data-cat="${cat.id}" aria-label="View ${cat.name} page">
      <span class="tc-art"><span class="tc-icon">${cat.icon}</span></span>
      <span class="tc-name">${cat.name}</span>
      <span class="tc-go">View page ${ICONS.arrow}</span>
    </a>`;
}

function tocIntroHTML() {
  return `
    <aside class="toc-intro">
      <div class="toc-logo"><span class="brand-badge">166</span><span>Luxury<br/>Services</span></div>
      <div>
        <span class="page-eyebrow">Our catalog</span>
        <h2 class="toc-title">Our<br/>Services</h2>
        <p class="toc-copy">Let’s make your home and office beautiful with trusted support.</p>
      </div>
      <div class="toc-note">
        <strong>Quality</strong>
        <span>Careful service by trained professionals.</span>
        <strong>Fast booking</strong>
        <span>Use “View page” to jump to any category.</span>
      </div>
    </aside>`;
}

function tocLeftHTML(pageNo) {
  const cards = CATEGORIES.slice(0, 3).map((c, i) => tocCard(c, i + 1)).join('');
  return `
    <div class="page-inner sheet toc-sheet">
      ${sheetHead(pageNo)}
      <div class="toc-layout">
        ${tocIntroHTML()}
        <div class="toc-grid featured">${cards}</div>
      </div>
    </div>`;
}

function tocRightHTML(pageNo) {
  const cards = CATEGORIES.slice(3).map((c, i) => tocCard(c, i + 4)).join('');
  return `
    <div class="page-inner sheet toc-sheet">
      ${sheetHead(pageNo)}
      <div class="toc-grid catalog">${cards}</div>
    </div>`;
}

/* Left page of a category spread: the "opener" / hero */
function openerHTML(cat, pageNo, num) {
  return `
    <div class="page-inner sheet">
      ${sheetHead(pageNo)}
      <div class="opener">
        <div class="opener-titles">
          <span class="page-eyebrow">Category ${pad(num)} · 166</span>
          <h2 class="opener-title">${cat.name}</h2>
        </div>
        <div class="opener-media">
          <span class="opener-icon">${cat.icon}</span>
          <span class="opener-stat"><b>166</b><span>pro team</span></span>
          <span class="photo-tag">Photo</span>
        </div>
      </div>
    </div>`;
}

/* Right page of a category spread: the services list (auto-fills, never scrolls) */
function servicesHTML(cat, pageNo) {
  const rows = cat.services.map((s, i) => `
    <li class="svc-row">
      <span class="svc-thumb t${(i % 3) + 1}">${ICONS.camera}</span>
      <span class="svc-info">
        <span class="svc-name">${s}</span>
        <span class="svc-meta">By 166 professionals</span>
      </span>
      <button class="svc-pill" type="button" data-cta="request">Request</button>
    </li>`).join('');
  return `
    <div class="page-inner sheet">
      ${sheetHead(pageNo)}
      <ul class="svc-list expanded">${rows}</ul>
    </div>`;
}

function backCoverHTML() {
  return `
    <div class="page-inner back-inner">
      <span class="brand-badge">166</span>
      <h2>Thank you!</h2>
      <p>We hope you found the service you were looking for. Reach out any time — we're happy to help.</p>
      <div class="back-contact">
        <div>${ICONS.phone}<span>166 (demo line)</span></div>
        <div>${ICONS.mail}<span>hello@166services.demo</span></div>
        <div>${ICONS.clock}<span>Open daily · 08:00 – 20:00</span></div>
      </div>
      <span class="back-foot">166 · Service Catalog · Demo Edition</span>
    </div>`;
}

/* ---------- Build ordered faces (pairs become open spreads) ---------- */
const faces = [];
const pageNoOf = (i) => i + 1; // display page number for face index i

faces.push({ cls: 'cover', html: coverHTML() });
faces.push({ cls: 'toc', html: tocLeftHTML(pageNoOf(faces.length)) });
faces.push({ cls: 'toc', html: tocRightHTML(pageNoOf(faces.length)) });

const catFaceIndex = {}; // category id -> opener (left) face index
CATEGORIES.forEach((cat, i) => {
  catFaceIndex[cat.id] = faces.length;
  faces.push({ cls: 'service opener-face', html: openerHTML(cat, pageNoOf(faces.length), i + 1) });
  faces.push({ cls: 'service services-face', html: servicesHTML(cat, pageNoOf(faces.length)) });
});

faces.push({ cls: 'backcover', html: backCoverHTML() });
if (faces.length % 2 !== 0) faces.push({ cls: 'blank', html: '<div class="page-inner"></div>' });

const LEAF_COUNT = faces.length / 2;

/* ---------- Render leaves ---------- */
const book = document.getElementById('book');
const leaves = [];

for (let i = 0; i < LEAF_COUNT; i++) {
  const leaf = document.createElement('div');
  leaf.className = 'leaf';

  const front = document.createElement('div');
  front.className = `leaf-face front ${faces[2 * i].cls}`;
  front.innerHTML = faces[2 * i].html;

  const back = document.createElement('div');
  back.className = `leaf-face back ${faces[2 * i + 1].cls}`;
  back.innerHTML = faces[2 * i + 1].html;

  leaf.appendChild(front);
  leaf.appendChild(back);
  book.appendChild(leaf);
  leaves.push(leaf);
}

const mobileView = document.createElement('div');
mobileView.className = 'mobile-page';
book.appendChild(mobileView);

const mobileFlipLayer = document.createElement('div');
mobileFlipLayer.className = 'mobile-page mobile-flip-layer';
book.appendChild(mobileFlipLayer);

/* ---------- Flipbook engine ---------- */
const N = LEAF_COUNT;
let current = 0;          // flipped leaves (0 = closed on cover)
let mobilePage = 0;       // visible face index in single-page phone mode
let animating = false;
const FLIP_MS = 760;
const SLIDE_MS = 420;
const MOBILE_FLIP_MS = 760;

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNow = document.getElementById('pageNow');
const pageTotal = document.getElementById('pageTotal');
pageTotal.textContent = String(N + 1);

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateZ() {
  leaves.forEach((leaf, i) => {
    leaf.style.zIndex = leaf.classList.contains('flipped') ? String(i + 1) : String(N - i);
  });
}

function isSinglePageView() {
  return window.matchMedia('(max-width: 760px)').matches;
}

function updatePosition(state) {
  const single = isSinglePageView();
  book.classList.toggle('mobile-single', single);
  book.classList.toggle('open', state > 0 && state < N);
  let shift = 0;
  if (!single) {
    if (state <= 0) shift = -25;
    else if (state >= N) shift = 25;
  }
  book.style.transform = `translateX(${shift}%)`;
}

function renderFace(el, pageIndex, extraClass = '') {
  const face = faces[pageIndex];
  el.className = `mobile-page ${face.cls}${extraClass ? ` ${extraClass}` : ''}`;
  el.innerHTML = face.html;
}

function renderMobilePage(animationClass = '') {
  renderFace(mobileView, mobilePage, animationClass);
  if (!animationClass || prefersReducedMotion()) return;
  mobileView.addEventListener('animationend', () => {
    mobileView.classList.remove(animationClass);
  }, { once: true });
}

function clearMobileFlipLayer() {
  mobileFlipLayer.className = 'mobile-page mobile-flip-layer';
  mobileFlipLayer.innerHTML = '';
}

function syncMobileFaces() {
  clearMobileFlipLayer();
  renderMobilePage();
}

function updateUI() {
  if (isSinglePageView()) {
    pageNow.textContent = String(mobilePage + 1);
    pageTotal.textContent = String(faces.length);
    prevBtn.disabled = mobilePage <= 0;
    nextBtn.disabled = mobilePage >= faces.length - 1;
    return;
  }
  pageNow.textContent = String(current + 1);
  pageTotal.textContent = String(N + 1);
  prevBtn.disabled = current <= 0;
  nextBtn.disabled = current >= N;
}

function stepForward() {
  const leaf = leaves[current];
  leaf.style.zIndex = String(N + 4);
  leaf.classList.add('flipping');
  requestAnimationFrame(() => leaf.classList.add('flipped'));
  current += 1;
}
function stepBack() {
  current -= 1;
  const leaf = leaves[current];
  leaf.style.zIndex = String(N + 4);
  leaf.classList.add('flipping');
  requestAnimationFrame(() => leaf.classList.remove('flipped'));
}
function finalize() {
  leaves.forEach((l) => l.classList.remove('flipping'));
  if (isSinglePageView()) clearMobileFlipLayer();
  else updateZ();
  animating = false;
  updateUI();
}

function mobileSlide(dir) {
  mobilePage += dir;
  renderMobilePage(dir > 0 ? 'mobile-slide-next' : 'mobile-slide-prev');
}

function mobileFlip(dir) {
  const fromPage = mobilePage;
  mobilePage += dir;
  renderMobilePage();
  renderFace(mobileFlipLayer, fromPage, `mobile-flip-layer ${dir > 0 ? 'mobile-turn-next' : 'mobile-turn-prev'}`);
  if (prefersReducedMotion()) {
    clearMobileFlipLayer();
    return;
  }
  mobileFlipLayer.addEventListener('animationend', clearMobileFlipLayer, { once: true });
  setTimeout(clearMobileFlipLayer, MOBILE_FLIP_MS + 120);
}

function nextMobile() {
  if (animating || mobilePage >= faces.length - 1) return;
  animating = true;
  const currentPageNumber = mobilePage + 1;
  const duration = currentPageNumber % 2 === 0 ? MOBILE_FLIP_MS : SLIDE_MS;
  if (currentPageNumber % 2 === 0) mobileFlip(1);
  else mobileSlide(1);
  updatePosition(current);
  updateUI();
  setTimeout(finalize, (prefersReducedMotion() ? 30 : duration) + 40);
}

function prevMobile() {
  if (animating || mobilePage <= 0) return;
  animating = true;
  const currentPageNumber = mobilePage + 1;
  const duration = currentPageNumber % 2 === 1 ? MOBILE_FLIP_MS : SLIDE_MS;
  if (currentPageNumber % 2 === 1) mobileFlip(-1);
  else mobileSlide(-1);
  updatePosition(current);
  updateUI();
  setTimeout(finalize, (prefersReducedMotion() ? 30 : duration) + 40);
}

function next() {
  if (isSinglePageView()) { nextMobile(); return; }
  if (animating || current >= N) return;
  animating = true;
  stepForward();
  updatePosition(current);
  updateUI();
  setTimeout(finalize, (prefersReducedMotion() ? 30 : FLIP_MS) + 40);
}
function prev() {
  if (isSinglePageView()) { prevMobile(); return; }
  if (animating || current <= 0) return;
  animating = true;
  stepBack();
  updatePosition(current);
  updateUI();
  setTimeout(finalize, (prefersReducedMotion() ? 30 : FLIP_MS) + 40);
}
function jumpToLeaf(target) {
  if (isSinglePageView()) {
    const targetPage = Math.max(0, Math.min(faces.length - 1, target * 2 - 1));
    if (animating || targetPage === mobilePage) return;
    mobilePage = targetPage;
    syncMobileFaces();
    updatePosition(current);
    updateUI();
    return;
  }
  target = Math.max(0, Math.min(N, target));
  if (animating || target === current) return;
  animating = true;
  const dir = target > current ? 1 : -1;
  const count = Math.abs(target - current);
  const reduced = prefersReducedMotion();
  const stagger = reduced ? 0 : Math.max(70, Math.min(170, 520 / count));
  for (let s = 0; s < count; s++) {
    setTimeout(() => (dir > 0 ? stepForward() : stepBack()), s * stagger);
  }
  updatePosition(target);
  updateUI();
  setTimeout(finalize, (count - 1) * stagger + (reduced ? 30 : FLIP_MS) + 40);
}

const leafForFace = (faceIndex) => Math.ceil(faceIndex / 2);

/* ---------- Controls wiring ---------- */
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
document.getElementById('goContents').addEventListener('click', () => {
  jumpToLeaf(leafForFace(faces.findIndex((f) => f.cls === 'toc')));
});

book.addEventListener('click', (e) => {
  const card = e.target.closest('[data-cat]');
  if (card) {
    e.preventDefault();
    jumpToLeaf(leafForFace(catFaceIndex[card.getAttribute('data-cat')]));
    return;
  }
  const cta = e.target.closest('[data-cta]');
  if (cta) {
    showToast(cta.getAttribute('data-cta') === 'request'
      ? 'Demo only — request flow is not connected.'
      : 'Demo only — this is a sample contact button.');
    return;
  }
  const face = e.target.closest('.leaf-face, .mobile-page');
  if (!face) return;
  const rect = book.getBoundingClientRect();
  if (isSinglePageView()) {
    if (e.clientX < rect.left + rect.width / 2) prev(); else next();
    return;
  }
  if (current <= 0) { next(); return; }
  if (current >= N) { prev(); return; }
  if (e.clientX < rect.left + rect.width / 2) prev(); else next();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next();
  else if (e.key === 'ArrowLeft') prev();
});

window.addEventListener('resize', () => {
  clearMobileFlipLayer();
  if (isSinglePageView()) syncMobileFaces();
  else updateZ();
  updatePosition(current);
  updateUI();
});

let touchX = null, touchY = null;
book.addEventListener('touchstart', (e) => {
  touchX = e.changedTouches[0].clientX;
  touchY = e.changedTouches[0].clientY;
}, { passive: true });
book.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) { if (dx < 0) next(); else prev(); }
  touchX = touchY = null;
}, { passive: true });

/* ---------- Toast ---------- */
const toastEl = document.getElementById('toast');
let toastTimer = null;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
}

/* ---------- Init ---------- */
if (isSinglePageView()) syncMobileFaces();
else updateZ();
updatePosition(current);
updateUI();
