const en = {
  skip: "Skip to content",
  name: "Deyang Wang",
  hello: "Hello, I'm Deyang Wang",
  role1: "Beijing Jiaotong University · M.Eng. in Artificial Intelligence / year 2",
  role2: "Visible light, infrared, and synthetic aperture radar",
  skills: "Skills",
  methods: "Methods",
  links: "Links",
  paper: "Paper",
  "paper.note": "Co-author. The batched CNN inference project was a Beijing municipal innovation project; this is its paper.",
  projects: "Projects",
  projectLine: "Cross-modal perception model · Text-to-SQL fine-tuning · Railway corridor monitoring · Batched CNN inference on CPUs · Inference on an in-vehicle cDSP",
  contact: "Contact",
  footer: "Updated October 2026",
  title: "Deyang Wang",
  description: "Deyang Wang, M.Eng. student in artificial intelligence at Beijing Jiaotong University. Cross-modal perception across visible light, infrared, and synthetic aperture radar."
};

const themeLabel = {
  zh: { toLight: "切换到浅色", toDark: "切换到深色" },
  en: { toLight: "Switch to light", toDark: "Switch to dark" }
};

const langLabel = {
  zh: "切换到英文",
  en: "Switch to Chinese"
};

const nodes = () => document.querySelectorAll("[data-i18n], [data-i18n-aria]");
const zh = new Map();

function keyOf(el) {
  return el.dataset.i18n || el.dataset.i18nAria;
}

function remember() {
  nodes().forEach((el) => {
    const key = keyOf(el);
    zh.set(key, el.dataset.i18nAria ? el.getAttribute("aria-label") : el.textContent);
  });
  zh.set("description", document.querySelector('meta[name="description"]').getAttribute("content"));
}

function currentLang() {
  return document.documentElement.lang === "en" ? "en" : "zh";
}

function paintTheme(theme) {
  const dark = theme !== "light";
  const next = dark ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  const btn = document.querySelector("[data-theme-btn]");
  const copy = themeLabel[currentLang()];
  btn.setAttribute("aria-pressed", dark ? "true" : "false");
  btn.setAttribute("aria-label", dark ? copy.toLight : copy.toDark);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#050505" : "#ffffff");
  const icon = document.querySelector('link[rel="icon"]');
  if (icon) icon.href = dark ? "images/logo-dark.svg" : "images/logo-light.svg";
  try {
    localStorage.setItem("theme", next);
  } catch (err) {
    /* private mode */
  }
}

function apply(lang) {
  const useEn = lang === "en";
  nodes().forEach((el) => {
    const key = keyOf(el);
    const value = useEn ? en[key] : zh.get(key);
    if (value == null) return;
    if (el.dataset.i18nAria) el.setAttribute("aria-label", value);
    else el.textContent = value;
  });
  document.documentElement.lang = useEn ? "en" : "zh-CN";
  document.title = useEn ? en.title : zh.get("name");
  document.querySelector('meta[name="description"]').setAttribute(
    "content",
    useEn ? en.description : zh.get("description")
  );
  const langBtn = document.querySelector("[data-lang-btn]");
  langBtn.setAttribute("aria-pressed", useEn ? "true" : "false");
  langBtn.setAttribute("aria-label", useEn ? langLabel.en : langLabel.zh);
  paintTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  try {
    localStorage.setItem("lang", useEn ? "en" : "zh");
  } catch (err) {
    /* private mode */
  }
}

const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a, b, t) => a + t * (b - a);
const grad3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
];

function createNoise(seed) {
  let s = seed >>> 0 || 1;
  const rand = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s;
  };
  const source = new Uint8Array(256);
  for (let i = 0; i < 256; i++) source[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = rand() % (i + 1);
    const tmp = source[i];
    source[i] = source[j];
    source[j] = tmp;
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = source[i & 255];
  const dot = (hash, x, y, z) => {
    const g = grad3[hash % 12];
    return g[0] * x + g[1] * y + g[2] * z;
  };
  return function noise(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const zf = z - Math.floor(z);
    const u = fade(xf);
    const v = fade(yf);
    const w = fade(zf);
    const A = perm[X] + Y;
    const AA = perm[A] + Z;
    const AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y;
    const BA = perm[B] + Z;
    const BB = perm[B + 1] + Z;
    const n = lerp(
      lerp(
        lerp(dot(perm[AA], xf, yf, zf), dot(perm[BA], xf - 1, yf, zf), u),
        lerp(dot(perm[AB], xf, yf - 1, zf), dot(perm[BB], xf - 1, yf - 1, zf), u),
        v
      ),
      lerp(
        lerp(dot(perm[AA + 1], xf, yf, zf - 1), dot(perm[BA + 1], xf - 1, yf, zf - 1), u),
        lerp(dot(perm[AB + 1], xf, yf - 1, zf - 1), dot(perm[BB + 1], xf - 1, yf - 1, zf - 1), u),
        v
      ),
      w
    );
    return (n + 1) / 2;
  };
}

const canvas = document.getElementById("dots");
const ctx = canvas.getContext("2d");
const noise = createNoise(Date.now());
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let dots = [];
let viewW = 0;
let viewH = 0;
let lastFrame = 0;
let running = false;

function spacing() {
  return Math.max(18, Math.min(Math.sqrt((viewW * viewH) / 2000), 45));
}

function placeDots() {
  const step = spacing();
  dots = [];
  for (let x = -step / 2; x < viewW + step; x += step) {
    for (let y = -step / 2; y < viewH + step; y += step) {
      dots.push({ x, y, opacity: Math.random() * 0.5 + 0.5 });
      if (dots.length >= 2600) return;
    }
  }
}

function resizeField() {
  viewW = window.innerWidth;
  viewH = window.innerHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(viewW * ratio);
  canvas.height = Math.round(viewH * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  placeDots();
}

function paintDots(time) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, viewW, viewH);
  const t = time / 10000;
  const scroll = window.scrollY;
  for (const dot of dots) {
    const angle = (noise(dot.x / 200, dot.y / 200, t) - 0.5) * Math.PI * 4;
    const radius = (noise(dot.x / 200, dot.y / 200, t * 2) + 0.5) * 10;
    const x = dot.x + Math.cos(angle) * radius;
    const y = dot.y + Math.sin(angle) * radius - scroll;
    const alpha = (Math.abs(Math.cos(angle)) * 0.8 + 0.2) * dot.opacity;
    ctx.fillStyle = `rgba(200,200,200,${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function frame(time) {
  if (!running) return;
  if (time - lastFrame >= 1000 / 12) {
    lastFrame = time;
    paintDots(time);
  }
  requestAnimationFrame(frame);
}

resizeField();
if (reduceMotion) {
  paintDots(0);
} else {
  running = true;
  requestAnimationFrame(frame);
}

window.addEventListener("resize", () => {
  resizeField();
  if (reduceMotion) paintDots(0);
});

remember();

let initialLang = "zh";
let initialTheme = "dark";
try {
  if (localStorage.getItem("lang") === "en") initialLang = "en";
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") initialTheme = savedTheme;
} catch (err) {
  initialLang = "zh";
  initialTheme = "dark";
}

document.documentElement.dataset.theme = initialTheme;
apply(initialLang);

document.querySelector("[data-lang-btn]").addEventListener("click", () => {
  apply(currentLang() === "en" ? "zh" : "en");
});

document.querySelector("[data-theme-btn]").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  paintTheme(next);
});
