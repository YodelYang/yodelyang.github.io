const en = {
  skip: "Skip to content",
  eyebrow: "Beijing Jiaotong University · year 2",
  name: "Deyang Wang",
  role: "M.Eng. in Artificial Intelligence",
  sensorLabel: "Three sensors",
  "band.rgb": "Visible",
  "band.ir": "Infrared",
  "band.sar": "SAR",
  "lede.rgb": "Visible light is for seeing the target: traffic lights, a railway corridor, an intersection in daylight. Infrared and radar take over when it fails.",
  "lede.ir": "At night and in smoke, visible light goes first. Infrared reads a temperature difference. The current project uses it together with visible light.",
  "lede.sar": "Synthetic aperture radar does not need light. It is a third measurement, not a filter on the same picture.",
  langLabel: "Language",
  tocLabel: "On this page",
  "nav.now": "Now",
  "nav.experience": "Experience",
  "nav.projects": "Projects",
  "nav.paper": "Paper",
  "nav.education": "Education",
  "now.title": "Now",
  "now.body": "Fall 2026, second year of the master's. The project is cross-modal perception: visible light, infrared, and synthetic aperture radar. I fine-tune Qwen3-VL, then run GRPO. The reward looks at box IoU and whether the label is correct. The visible–infrared instructions come from M3FD and KAIST. Those sets do not include radar.",
  "exp.title": "Experience",
  "job1.org": "Neolix",
  "job1.date": "2026.02 — 2026.07",
  "job1.role": "Data and algorithms intern",
  "job1.b1": "Ran the traffic-light detection data path: screening, labeling handoff, pre-labeling, visualization, and delivery, including bus lights, intersections, and U-turns.",
  "job1.b2": "Retrained the YOLO detector and trained a ResNet classifier across day and night, weather, and lane type.",
  "job1.b3": "Mined samples such as bus lights, red-light running, and overhead wires. Maintained the Docker images and post-processing scripts and connected them to the data platform.",
  "job2.org": "北京普测时空科技有限公司",
  "job2.date": "2025.04 — 2025.07",
  "job2.role": "LLM agent intern",
  "job2.b1": "Built Coze agents for career advice, public-opinion briefs, and resume scoring, and wired intent, retrieval, and generation into workflows.",
  "job2.b2": "Transcribed meeting audio with Whisper and turned it into summaries and action items with Qwen2-7B-Instruct.",
  "proj.title": "Projects",
  "p1.title": "Cross-modal perception model",
  "p1.date": "2025.10 — present",
  "p1.meta": "Research",
  "p1.body": "For night and smoke, where visible light fails, I treat RGB, infrared, and synthetic aperture radar as complementary measurements. The base model is Qwen3-VL, trained with supervised fine-tuning. M3FD and KAIST supply visible–infrared instructions. Post-training uses GRPO, with rewards for box IoU and label correctness.",
  "p2.title": "Text-to-SQL fine-tuning",
  "p2.date": "2025.09 — 2025.12",
  "p2.meta": "Course project",
  "p2.body": "Cleaned Spider, BIRD, WikiSQL, and DuSQL, then fine-tuned Qwen3-4B-Instruct with ms-swift and DoRA. Exact match on BIRD moved from 1.56% to 16.32%. A Streamlit demo loads a database, generates SQL, and runs it.",
  "p3.title": "Railway corridor monitoring",
  "p3.date": "2024.12 — 2025.06",
  "p3.meta": "Undergraduate thesis",
  "p3.body": "Reimplemented MVX-Net: VGG16 for images, VoxelNet for lidar, then alignment into voxels. Django serves the API. Three.js shows the point cloud and detection boxes.",
  "p4.title": "Batched CNN inference on CPUs",
  "p4.date": "2023.04 — 2024.05",
  "p4.meta": "Beijing municipal innovation program",
  "p4.body": "Worked on the BDLO data layout and on folding the reorder into batch norm and pooling. Ablations in LibTorch and Eigen reached 1.28×. I am a co-author on the paper below.",
  "p5.title": "Inference on an in-vehicle cDSP",
  "p5.date": "2023.02 — 2024.05",
  "p5.meta": "NIO university collaboration",
  "p5.body": "Deployed HiFi-GAN to the cDSP on a Snapdragon chip with MACE, using int8 quantization and operator fusion. The Transformer variant was about 1.5× faster.",
  "paper.title": "Paper",
  "paper.note": "Co-author. The CPU project above was a Beijing municipal innovation project; this is its paper.",
  "edu.title": "Education",
  "edu1.school": "Beijing Jiaotong University",
  "edu1.date": "2025.09 — 2028.06 (expected)",
  "edu1.meta": "National Elite Engineering College · Artificial Intelligence · professional master's",
  "edu1.body": "Weighted average 87.88, top 10% of the program. First-class academic scholarship.",
  "edu2.school": "Beijing Jiaotong University",
  "edu2.date": "2021.09 — 2025.06",
  "edu2.meta": "School of Computer Science · Computer Science and Technology · B.Eng.",
  "edu2.body": "Weighted average 87.1, top 20% of the program. Lanqiao Cup provincial A-group second and third prizes, and second prize in the university programming contest.",
  footer: "Updated October 2026",
  title: "Deyang Wang"
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
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === (useEn ? "en" : "zh") ? "true" : "false");
  });
  try {
    localStorage.setItem("lang", useEn ? "en" : "zh");
  } catch (err) {
    /* private mode */
  }
}

function setBand(band) {
  document.body.dataset.band = band;
  document.querySelectorAll("[data-band-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.bandPanel !== band;
  });
  document.querySelectorAll("[data-band-btn]").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.bandBtn === band ? "true" : "false");
  });
}

remember();

let initial = "zh";
try {
  if (localStorage.getItem("lang") === "en") initial = "en";
} catch (err) {
  initial = "zh";
}
apply(initial);
setBand("rgb");

document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => apply(btn.dataset.lang));
});

document.querySelectorAll("[data-band-btn]").forEach((btn) => {
  btn.addEventListener("click", () => setBand(btn.dataset.bandBtn));
});

const tocLinks = [...document.querySelectorAll(".toc a")];
const sections = tocLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      tocLinks.forEach((link) => {
        const on = link.getAttribute("href") === `#${visible.target.id}`;
        if (on) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4] }
  );
  sections.forEach((section) => observer.observe(section));
}
