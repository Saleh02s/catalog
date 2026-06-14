/* ============================================================
   166 — Catalog
   Two-page open-spread flipbook (vanilla JS), print-catalog layout.
   Localised (AZ/RU/EN), dark mode, and print-friendly.
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

/* ---------- UI strings (AZ / RU / EN) ---------- */
const I18N = {
  en: {
    langName: "EN",
    catalog: "Catalog",
    contents: "Contents",
    availableServices: "Available Services",
    page: "Page",
    edition: "Edition 01",
    ourServices: "Our Services",
    ourCatalog: "Our catalog",
    coverTagline: "Your trusted partner for home & office services — all in one catalog.",
    flipToOpen: "Flip to open",
    tocCopy: "Let’s make your home and office beautiful with trusted support.",
    noteQualityT: "Quality",
    noteQualityD: "Careful service by trained professionals.",
    noteBookingT: "Fast booking",
    noteBookingD: "Use “View page” to jump to any category.",
    viewPage: "View page",
    category: "Category",
    section: "Section",
    byPros: "By 166 professionals",
    request: "Request",
    thankYou: "Thank you!",
    backText: "We hope you found the service you were looking for. Reach out any time — we're happy to help.",
    demoLine: "166 (demo line)",
    openDaily: "Open daily · 08:00 – 20:00",
    backFoot: "166 · Catalog · Demo Edition",
    toastRequest: "Demo only — request flow is not connected.",
    toastContact: "Demo only — this is a sample contact button.",
    print: "Print",
    previous: "Previous page",
    next: "Next page",
    darkMode: "Dark mode",
    lightMode: "Light mode",
  },
  az: {
    langName: "AZ",
    catalog: "Kataloq",
    contents: "Mündəricat",
    availableServices: "Mövcud Xidmətlər",
    page: "Səhifə",
    edition: "Buraxılış 01",
    ourServices: "Xidmətlərimiz",
    ourCatalog: "Bizim kataloq",
    coverTagline: "Ev və ofis xidmətləri üçün etibarlı tərəfdaşınız — hamısı bir kataloqda.",
    flipToOpen: "Açmaq üçün vərəqləyin",
    tocCopy: "Etibarlı dəstəklə evinizi və ofisinizi daha yaxşı edək.",
    noteQualityT: "Keyfiyyət",
    noteQualityD: "Təlim keçmiş peşəkarlar tərəfindən qayğılı xidmət.",
    noteBookingT: "Sürətli sifariş",
    noteBookingD: "İstənilən kateqoriyaya keçmək üçün “Səhifəyə bax” düyməsindən istifadə edin.",
    viewPage: "Səhifəyə bax",
    category: "Kateqoriya",
    section: "Bölmə",
    byPros: "166 peşəkarları tərəfindən",
    request: "Sifariş et",
    thankYou: "Təşəkkür edirik!",
    backText: "Axtardığınız xidməti tapdığınıza ümid edirik. İstənilən vaxt bizimlə əlaqə saxlayın — kömək etməyə şadıq.",
    demoLine: "166 (demo xətti)",
    openDaily: "Hər gün açıq · 08:00 – 20:00",
    backFoot: "166 · Kataloq · Demo Buraxılış",
    toastRequest: "Yalnız demo — sifariş axını qoşulmayıb.",
    toastContact: "Yalnız demo — bu nümunə əlaqə düyməsidir.",
    print: "Çap et",
    previous: "Əvvəlki səhifə",
    next: "Növbəti səhifə",
    darkMode: "Qaranlıq rejim",
    lightMode: "İşıqlı rejim",
  },
  ru: {
    langName: "RU",
    catalog: "Каталог",
    contents: "Содержание",
    availableServices: "Доступные услуги",
    page: "Страница",
    edition: "Выпуск 01",
    ourServices: "Наши услуги",
    ourCatalog: "Наш каталог",
    coverTagline: "Ваш надёжный партнёр для дома и офиса — всё в одном каталоге.",
    flipToOpen: "Листайте, чтобы открыть",
    tocCopy: "Сделаем ваш дом и офис лучше с надёжной поддержкой.",
    noteQualityT: "Качество",
    noteQualityD: "Аккуратный сервис от обученных специалистов.",
    noteBookingT: "Быстрый заказ",
    noteBookingD: "Используйте «Открыть страницу», чтобы перейти к категории.",
    viewPage: "Открыть страницу",
    category: "Категория",
    section: "Раздел",
    byPros: "Специалистами 166",
    request: "Заказать",
    thankYou: "Спасибо!",
    backText: "Надеемся, вы нашли нужную услугу. Свяжитесь с нами в любое время — мы рады помочь.",
    demoLine: "166 (демо-линия)",
    openDaily: "Открыто ежедневно · 08:00 – 20:00",
    backFoot: "166 · Каталог · Демо-выпуск",
    toastRequest: "Только демо — оформление заказа не подключено.",
    toastContact: "Только демо — это пример кнопки контакта.",
    print: "Печать",
    previous: "Предыдущая страница",
    next: "Следующая страница",
    darkMode: "Тёмная тема",
    lightMode: "Светлая тема",
  },
};

/* ---------- Service catalog data (localised) ---------- */
const CATEGORIES = [
  {
    id: 'furniture', icon: ICONS.furniture, image: 'images/furniture.jpg',
    name: { en: 'Furniture Services', az: 'Mebel Xidmətləri', ru: 'Мебельные услуги' },
    services: [
      { en: 'Furniture assembly', az: 'Mebel yığılması', ru: 'Сборка мебели' },
      { en: 'Furniture disassembly', az: 'Mebel sökülməsi', ru: 'Разборка мебели' },
      { en: 'Furniture repair', az: 'Mebel təmiri', ru: 'Ремонт мебели' },
      { en: 'Furniture packing', az: 'Mebel qablaşdırılması', ru: 'Упаковка мебели' },
      { en: 'Assembly of cargo furniture', az: 'Yük mebelinin yığılması', ru: 'Сборка корпусной мебели' },
    ],
  },
  {
    id: 'plumbing', icon: ICONS.plumbing, image: 'images/plumbing.jpg',
    name: { en: 'Plumbing Services', az: 'Santexnik Xidmətləri', ru: 'Сантехнические услуги' },
    services: [
      { en: 'Leak detection & repair', az: 'Sızmanın aşkarlanması və təmiri', ru: 'Поиск и устранение протечек' },
      { en: 'Faucet & tap installation', az: 'Kran quraşdırılması', ru: 'Установка смесителей и кранов' },
      { en: 'Pipe installation & replacement', az: 'Boruların quraşdırılması və dəyişdirilməsi', ru: 'Установка и замена труб' },
      { en: 'Drain unclogging', az: 'Kanalizasiyanın açılması', ru: 'Прочистка канализации' },
      { en: 'Bathroom & kitchen fittings', az: 'Hamam və mətbəx avadanlığı', ru: 'Сантехника для ванной и кухни' },
    ],
  },
  {
    id: 'ac', icon: ICONS.ac, image: 'images/ac.jpg',
    name: { en: 'Air Conditioner Services', az: 'Kondisioner Xidmətləri', ru: 'Услуги по кондиционерам' },
    services: [
      { en: 'Air conditioner disassembly', az: 'Kondisionerin sökülməsi', ru: 'Демонтаж кондиционера' },
      { en: 'Air conditioner assembly / installation', az: 'Kondisionerin yığılması / quraşdırılması', ru: 'Монтаж / установка кондиционера' },
      { en: 'Filter replacement', az: 'Filtrin dəyişdirilməsi', ru: 'Замена фильтров' },
      { en: 'Air conditioner repair', az: 'Kondisionerin təmiri', ru: 'Ремонт кондиционера' },
      { en: 'Air conditioner cleaning / washing', az: 'Kondisionerin təmizlənməsi / yuyulması', ru: 'Чистка / мойка кондиционера' },
      { en: 'Relocation: disassemble & re-install at a new address', az: 'Köçürmə: sökmə və yeni ünvanda quraşdırma', ru: 'Перенос: демонтаж и установка по новому адресу' },
    ],
  },
  {
    id: 'appliance', icon: ICONS.appliance, image: 'images/appliance.jpg',
    name: { en: 'Small Household Appliances', az: 'Kiçik Məişət Texnikası', ru: 'Мелкая бытовая техника' },
    services: [
      { en: 'Repair of small household appliances', az: 'Kiçik məişət texnikasının təmiri', ru: 'Ремонт мелкой бытовой техники' },
    ],
  },
  {
    id: 'electrical', icon: ICONS.electrical, image: 'images/electrical.jpg',
    name: { en: 'Electrical Services', az: 'Elektrik Xidmətləri', ru: 'Электромонтажные услуги' },
    services: [
      { en: 'Electrical cable installation', az: 'Elektrik kabelinin çəkilməsi', ru: 'Прокладка электрического кабеля' },
      { en: 'Chandelier repair', az: 'Çilçırağın təmiri', ru: 'Ремонт люстры' },
      { en: 'Chandelier assembly', az: 'Çilçırağın yığılması', ru: 'Сборка люстры' },
      { en: 'Chandelier installation', az: 'Çilçırağın quraşdırılması', ru: 'Установка люстры' },
    ],
  },
  {
    id: 'boiler', icon: ICONS.boiler, image: 'images/boiler.jpg',
    name: { en: 'Combi Boiler Services', az: 'Kombi Xidmətləri', ru: 'Услуги по котлам (комби)' },
    services: [
      { en: 'Combi boiler system installation', az: 'Kombi sisteminin quraşdırılması', ru: 'Установка системы котла (комби)' },
      { en: 'Combi boiler repair', az: 'Kombinin təmiri', ru: 'Ремонт котла (комби)' },
      { en: 'Cleaning / washing of radiators & boiler system', az: 'Radiatorların və kombi sisteminin təmizlənməsi / yuyulması', ru: 'Чистка / промывка радиаторов и системы котла' },
    ],
  },
  {
    id: 'packing', icon: ICONS.packing, image: 'images/packing.jpg',
    name: { en: 'Packing / Boxing Services', az: 'Qablaşdırma Xidmətləri', ru: 'Услуги упаковки' },
    services: [
      { en: 'Packing belongings into boxes', az: 'Əşyaların qutulara yığılması', ru: 'Упаковка вещей в коробки' },
      { en: 'Preparing items for moving', az: 'Əşyaların köçürməyə hazırlanması', ru: 'Подготовка вещей к переезду' },
      { en: 'Organizing packed items', az: 'Qablaşdırılmış əşyaların nizamlanması', ru: 'Организация упакованных вещей' },
      { en: 'Safe packaging for transportation', az: 'Daşınma üçün təhlükəsiz qablaşdırma', ru: 'Безопасная упаковка для перевозки' },
    ],
  },
];

/* ---------- Language / theme state ---------- */
const SUPPORTED_LANGS = ['az', 'ru', 'en'];
let LANG = (() => {
  const saved = localStorage.getItem('catalog-lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(nav) ? nav : 'en';
})();

const tr = (v) => (v && typeof v === 'object' && !Array.isArray(v) && v[LANG] !== undefined) ? v[LANG] : v;
const t = (key) => (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || '';

/* Optional photo for a slot. If the file is missing it removes itself,
   so the icon underneath stays visible until a real photo is added. */
const photo = (src, alt) =>
  src ? `<img class="media-photo" src="${src}" alt="${alt}" loading="lazy" onerror="this.remove()" />` : '';

const pad = (n) => String(n).padStart(2, '0');
const sheetHead = (pageNo, label) =>
  `<div class="sheet-head"><span class="sh-left">${label || t('availableServices')}</span><span class="sh-right">${t('page')} ${pad(pageNo)}</span></div>`;

/* ---------- Face (single page) HTML builders ---------- */
function coverHTML() {
  return `
    <div class="page-inner cover-inner">
      <div class="cover-top">
        <span>${t('catalog')}</span>
        <span class="cover-issue">${t('edition')}</span>
      </div>
      <div class="cover-center">
        <h1 class="cover-number">166</h1>
        <h2 class="cover-services">${t('ourServices')}</h2>
        <p class="cover-tagline">${t('coverTagline')}</p>
      </div>
      <div class="cover-bottom">
        <span class="cover-hint">${t('flipToOpen')} ${ICONS.hand}</span>
      </div>
    </div>`;
}

function tocCard(cat) {
  const name = tr(cat.name);
  return `
    <a class="toc-card" href="#${cat.id}" data-cat="${cat.id}" aria-label="${t('viewPage')} — ${name}">
      <span class="tc-art">${photo(cat.image, name)}<span class="tc-icon">${cat.icon}</span></span>
      <span class="tc-name">${name}</span>
      <span class="tc-go">${t('viewPage')} ${ICONS.arrow}</span>
    </a>`;
}

function tocIntroHTML() {
  return `
    <aside class="toc-intro">
      <div class="toc-logo"><span class="brand-badge">166</span><span>${t('catalog')}</span></div>
      <div>
        <span class="page-eyebrow">${t('ourCatalog')}</span>
        <h2 class="toc-title">${t('ourServices')}</h2>
        <p class="toc-copy">${t('tocCopy')}</p>
      </div>
      <div class="toc-note">
        <strong>${t('noteQualityT')}</strong>
        <span>${t('noteQualityD')}</span>
        <strong>${t('noteBookingT')}</strong>
        <span>${t('noteBookingD')}</span>
      </div>
    </aside>`;
}

function tocLeftHTML(pageNo) {
  const cards = CATEGORIES.slice(0, 3).map((c) => tocCard(c)).join('');
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
  const cards = CATEGORIES.slice(3).map((c) => tocCard(c)).join('');
  return `
    <div class="page-inner sheet toc-sheet">
      ${sheetHead(pageNo)}
      <div class="toc-grid catalog">${cards}</div>
    </div>`;
}

/* Left page of a category spread: the "opener" / hero */
function openerHTML(cat, pageNo, num) {
  const name = tr(cat.name);
  return `
    <div class="page-inner sheet">
      ${sheetHead(pageNo)}
      <div class="opener">
        <div class="opener-titles">
          <span class="page-eyebrow">${t('category')} ${pad(num)} · 166</span>
          <h2 class="opener-title">${name}</h2>
        </div>
        <div class="opener-media">
          ${photo(cat.image, name)}
          <span class="opener-icon">${cat.icon}</span>
          <span class="opener-stat"><b>${pad(num)}</b><span>${t('section')}</span></span>
        </div>
      </div>
    </div>`;
}

/* Right page of a category spread: the services list (auto-fills, never scrolls) */
function servicesHTML(cat, pageNo) {
  const rows = cat.services.map((s, i) => {
    const name = tr(s);
    const img = (s && s.img) ? s.img : cat.image;
    return `
    <li class="svc-row">
      <span class="svc-thumb t${(i % 3) + 1}">${photo(img, name)}${ICONS.camera}</span>
      <span class="svc-info">
        <span class="svc-name">${name}</span>
        <span class="svc-meta">${t('byPros')}</span>
      </span>
      <button class="svc-pill" type="button" data-cta="request">${t('request')}</button>
    </li>`;
  }).join('');
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
      <h2>${t('thankYou')}</h2>
      <p>${t('backText')}</p>
      <div class="back-contact">
        <div>${ICONS.phone}<span>${t('demoLine')}</span></div>
        <div>${ICONS.mail}<span>hello@166services.demo</span></div>
        <div>${ICONS.clock}<span>${t('openDaily')}</span></div>
      </div>
      <span class="back-foot">${t('backFoot')}</span>
    </div>`;
}

/* ---------- Persistent DOM refs ---------- */
const book = document.getElementById('book');
const mobileView = document.createElement('div');
mobileView.className = 'mobile-page';
const mobileFlipLayer = document.createElement('div');
mobileFlipLayer.className = 'mobile-page mobile-flip-layer';

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNow = document.getElementById('pageNow');
const pageTotal = document.getElementById('pageTotal');

/* ---------- Build / rebuild the book from data ---------- */
const pageNoOf = (i) => i + 1;
let faces = [];
let leaves = [];
let catFaceIndex = {};
let LEAF_COUNT = 0;
let N = 0;

function buildBook() {
  faces = [];
  faces.push({ cls: 'cover', html: coverHTML() });
  faces.push({ cls: 'toc', html: tocLeftHTML(pageNoOf(faces.length)) });
  faces.push({ cls: 'toc', html: tocRightHTML(pageNoOf(faces.length)) });

  catFaceIndex = {};
  CATEGORIES.forEach((cat, i) => {
    catFaceIndex[cat.id] = faces.length;
    faces.push({ cls: 'service opener-face', html: openerHTML(cat, pageNoOf(faces.length), i + 1) });
    faces.push({ cls: 'service services-face', html: servicesHTML(cat, pageNoOf(faces.length)) });
  });

  faces.push({ cls: 'backcover', html: backCoverHTML() });
  if (faces.length % 2 !== 0) faces.push({ cls: 'blank', html: '<div class="page-inner"></div>' });

  LEAF_COUNT = faces.length / 2;
  N = LEAF_COUNT;

  book.innerHTML = '';
  leaves = [];
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
  book.appendChild(mobileView);
  book.appendChild(mobileFlipLayer);
}

/* ---------- Flipbook engine ---------- */
let current = 0;          // flipped leaves (0 = closed on cover)
let mobilePage = 0;       // visible face index in single-page phone mode
let animating = false;
const FLIP_MS = 760;
const SLIDE_MS = 420;
const MOBILE_FLIP_MS = 760;

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
  // Left-hand pages (even display numbers, i.e. odd face index) bind on the
  // right; right-hand pages bind on the left — like a real open spread.
  const bind = pageIndex % 2 === 1 ? 'bind-right' : 'bind-left';
  el.className = `mobile-page ${face.cls} ${bind}${extraClass ? ` ${extraClass}` : ''}`;
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
  const totalPages = faces.length;
  if (isSinglePageView()) {
    pageNow.textContent = String(mobilePage + 1);
    pageTotal.textContent = String(totalPages);
    prevBtn.disabled = mobilePage <= 0;
    nextBtn.disabled = mobilePage >= faces.length - 1;
    return;
  }
  // Desktop shows a two-page spread, so report the real printed page numbers
  // of the visible pages (matching the "Page NN" labels), not the spread index.
  let label;
  if (current <= 0) label = '1';
  else if (current >= N) label = String(2 * current);
  else label = `${2 * current}\u2013${2 * current + 1}`;
  pageNow.textContent = label;
  pageTotal.textContent = String(totalPages);
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
  const fromPage = mobilePage;
  mobilePage += dir;
  renderMobilePage(dir > 0 ? 'mobile-slide-next' : 'mobile-slide-prev');
  // pan the outgoing page off-screen so it reads like the view sliding across
  renderFace(mobileFlipLayer, fromPage, `mobile-flip-layer ${dir > 0 ? 'mobile-slideout-next' : 'mobile-slideout-prev'}`);
  if (prefersReducedMotion()) {
    clearMobileFlipLayer();
    return;
  }
  mobileFlipLayer.addEventListener('animationend', clearMobileFlipLayer, { once: true });
  setTimeout(clearMobileFlipLayer, SLIDE_MS + 120);
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
  const isFlip = currentPageNumber % 2 === 1; // odd -> even = page turn
  const duration = isFlip ? MOBILE_FLIP_MS : SLIDE_MS;
  if (isFlip) mobileFlip(1);
  else mobileSlide(1);
  updatePosition(current);
  updateUI();
  setTimeout(finalize, (prefersReducedMotion() ? 30 : duration) + 40);
}

function prevMobile() {
  if (animating || mobilePage <= 0) return;
  animating = true;
  const currentPageNumber = mobilePage + 1;
  const isFlip = currentPageNumber % 2 === 0; // even -> odd (going back) = page turn
  const duration = isFlip ? MOBILE_FLIP_MS : SLIDE_MS;
  if (isFlip) mobileFlip(-1);
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

/* ---------- Language + theme ---------- */
function applyLeafState() {
  leaves.forEach((l, i) => l.classList.toggle('flipped', i < current));
}

function refreshView() {
  clearMobileFlipLayer();
  if (isSinglePageView()) syncMobileFaces();
  else { applyLeafState(); updateZ(); }
  updatePosition(current);
  updateUI();
}

function updateStaticText() {
  document.documentElement.lang = LANG;
  const set = (sel, txt) => { const el = document.querySelector(sel); if (el) el.textContent = txt; };
  set('.brand-text', t('catalog'));
  set('#goContents .label', t('contents'));
  prevBtn.setAttribute('aria-label', t('previous'));
  nextBtn.setAttribute('aria-label', t('next'));
  updateThemeButton();
  document.querySelectorAll('.lang-btn').forEach((b) => {
    const active = b.dataset.lang === LANG;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === LANG) {
    updateStaticText();
    return;
  }
  LANG = lang;
  localStorage.setItem('catalog-lang', lang);
  const savedCurrent = current;
  const savedMobile = mobilePage;
  buildBook();
  current = Math.min(savedCurrent, N);
  mobilePage = Math.min(savedMobile, faces.length - 1);
  refreshView();
  updateStaticText();
}

let THEME = (() => {
  const saved = localStorage.getItem('catalog-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
})();

function updateThemeButton() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const goingDark = THEME === 'light';
  btn.setAttribute('aria-label', goingDark ? t('darkMode') : t('lightMode'));
  btn.setAttribute('title', goingDark ? t('darkMode') : t('lightMode'));
}

function applyTheme(theme) {
  THEME = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('catalog-theme', theme);
  updateThemeButton();
}

/* ---------- Init ---------- */
buildBook();
applyTheme(THEME);

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
document.getElementById('goContents').addEventListener('click', () => {
  jumpToLeaf(leafForFace(faces.findIndex((f) => f.cls === 'toc')));
});

document.querySelectorAll('.lang-btn').forEach((b) => {
  b.addEventListener('click', () => setLanguage(b.dataset.lang));
});
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) themeToggle.addEventListener('click', () => applyTheme(THEME === 'dark' ? 'light' : 'dark'));

book.addEventListener('click', (e) => {
  const card = e.target.closest('[data-cat]');
  if (card) {
    e.preventDefault();
    jumpToLeaf(leafForFace(catFaceIndex[card.getAttribute('data-cat')]));
    return;
  }
  const cta = e.target.closest('[data-cta]');
  if (cta) {
    showToast(cta.getAttribute('data-cta') === 'request' ? t('toastRequest') : t('toastContact'));
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

/* ---------- First paint ---------- */
updateStaticText();
refreshView();
