const en = {
  skip: "Skip to content",
  name: "Deyang Wang",
  hello: "Hello, I'm Deyang Wang",
  role1: "Beijing Jiaotong University · M.Eng. in Artificial Intelligence, year 2",
  role2: "Cross-modal perception across visible light, infrared, and synthetic aperture radar",
  sensorLabel: "Three sensors",
  langLabel: "Language",
  "band.rgb": "Visible",
  "band.ir": "Infrared",
  "band.sar": "SAR",
  "lede.rgb": "Visible light is for seeing the target: traffic lights, a railway corridor, an intersection in daylight. Infrared and radar take over when it fails.",
  "lede.ir": "At night and in smoke, visible light goes first. Infrared reads a temperature difference. The current project uses it together with visible light.",
  "lede.sar": "Synthetic aperture radar does not need light. It is a third measurement, not a filter on the same picture.",
  skills: "Skills",
  methods: "Methods",
  projects: "Projects",
  p1: "Cross-modal perception model",
  p2: "Text-to-SQL fine-tuning",
  p3: "Railway corridor monitoring",
  p4: "Batched CNN inference on CPUs",
  p5: "Inference on an in-vehicle cDSP",
  paper: "Paper",
  "paper.note": "Co-author. The batched CNN inference project was a Beijing municipal innovation project; this is its paper.",
  contact: "Contact",
  footer: "Updated October 2026",
  title: "Deyang Wang",
  description: "Deyang Wang, M.Eng. student in artificial intelligence at Beijing Jiaotong University. Cross-modal perception across visible light, infrared, and synthetic aperture radar."
};

const themeLabel = {
  zh: { toLight: "切换到浅色", toDark: "切换到深色" },
  en: { toLight: "Switch to light", toDark: "Switch to dark" }
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
  document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#101413" : "#eef3f0");
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
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === (useEn ? "en" : "zh") ? "true" : "false");
  });
  paintTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  try {
    localStorage.setItem("lang", useEn ? "en" : "zh");
  } catch (err) {
    /* private mode */
  }
}

function setBand(band) {
  document.documentElement.dataset.band = band;
  document.querySelectorAll("[data-band-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.bandPanel !== band;
  });
  document.querySelectorAll("[data-band-btn]").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.bandBtn === band ? "true" : "false");
  });
}

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
setBand("rgb");

document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => apply(btn.dataset.lang));
});

document.querySelector("[data-theme-btn]").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  paintTheme(next);
});

document.querySelectorAll("[data-band-btn]").forEach((btn) => {
  btn.addEventListener("click", () => setBand(btn.dataset.bandBtn));
});
