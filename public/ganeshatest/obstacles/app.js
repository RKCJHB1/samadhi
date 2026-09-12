const transformations = [
  {
    id: "anger",
    obstacle: "Anger",
    quality: "Peace",
    teaching:
      "Peace begins when we pause before reacting and choose a response rooted in patience and understanding.",
  },
  {
    id: "fear",
    obstacle: "Fear",
    quality: "Courage",
    teaching:
      "Courage does not mean never feeling fear. It means taking the next right step even when fear is present.",
  },
  {
    id: "laziness",
    obstacle: "Laziness",
    quality: "Effort",
    teaching:
      "Steady effort turns good intentions into action. Even a small sincere step can move us forward.",
  },
  {
    id: "selfishness",
    obstacle: "Selfishness",
    quality: "Kindness",
    teaching:
      "Kindness widens the heart. When we remember the needs of others, service becomes a spiritual practice.",
  },
  {
    id: "ignorance",
    obstacle: "Ignorance",
    quality: "Wisdom",
    teaching:
      "Wisdom grows through reflection, learning and the humility to see beyond our first assumptions.",
  },
];

const PATH_ORDER = ["fear", "anger", "laziness", "selfishness", "ignorance"];

const CAMERA = [
  { fx: 50, fy: 50, scale: 1, vy: 50 },
  { fx: 54, fy: 46, scale: 1.22, vy: 48 },
  { fx: 46, fy: 42, scale: 1.4, vy: 46 },
  { fx: 54, fy: 36, scale: 1.58, vy: 44 },
  { fx: 50, fy: 30, scale: 1.78, vy: 42 },
  { fx: 50, fy: 19.6, scale: 2.32, vy: 34 },
];

const groups = [...document.querySelectorAll(".transformation")];
const pathFrame = document.querySelector("#path-frame");
const pathWorld = document.querySelector("#path-world");
const clearedCount = document.querySelector("#cleared-count");
const journeyProgress = document.querySelector("#journey-progress");
const journeyItems = [...document.querySelectorAll("#journey-list li")];
const emptyState = document.querySelector("#empty-state");
const reflectionContent = document.querySelector("#reflection-content");
const currentObstacle = document.querySelector("#current-obstacle");
const currentQuality = document.querySelector("#current-quality");
const currentTeaching = document.querySelector("#current-teaching");
const completion = document.querySelector("#completion");
const resetButton = document.querySelector("#reset-game");
const status = document.querySelector("#game-status");
const toast = document.querySelector("#result-toast");
const toastObstacle = document.querySelector("#toast-obstacle");
const toastQuality = document.querySelector("#toast-quality");

const cleared = new Set();
let toastTimer;
let focusTimer;

function nextObstacleId() {
  return PATH_ORDER[cleared.size] ?? null;
}

function setCamera(stage, { immediate = false } = {}) {
  const cam = CAMERA[Math.min(Math.max(stage, 0), CAMERA.length - 1)];
  if (immediate) {
    pathWorld.style.transition = "none";
  }
  pathWorld.style.setProperty("--fx", String(cam.fx));
  pathWorld.style.setProperty("--fy", String(cam.fy));
  pathWorld.style.setProperty("--scale", String(cam.scale));
  pathWorld.style.setProperty("--vy", String(cam.vy));
  pathWorld.style.setProperty("--vx", "50");
  pathWorld.classList.toggle("is-arriving", stage === CAMERA.length - 1);
  if (immediate) {
    pathWorld.getBoundingClientRect();
    pathWorld.style.transition = "";
  }
}

function showToast(item) {
  toastObstacle.textContent = item.obstacle;
  toastQuality.textContent = item.quality;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1900);
}

function showReflection(item) {
  currentObstacle.textContent = item.obstacle;
  currentQuality.textContent = item.quality;
  currentTeaching.textContent = item.teaching;
  emptyState.hidden = true;
  reflectionContent.hidden = false;
  reflectionContent.style.animation = "none";
  requestAnimationFrame(() => {
    reflectionContent.style.animation = "";
  });
}

function updateStoneStates() {
  const nextId = nextObstacleId();

  groups.forEach((group) => {
    const id = group.dataset.id;
    const isCleared = cleared.has(id);
    const isCurrent = id === nextId;
    group.classList.toggle("is-current", isCurrent);
    group.classList.toggle("is-ahead", !isCleared && !isCurrent);

    const button = group.querySelector(".stone");
    button.disabled = !isCurrent;
  });

  journeyItems.forEach((item) => {
    item.classList.toggle("is-cleared", cleared.has(item.dataset.id));
    item.classList.toggle("is-current", item.dataset.id === nextId);
  });
}

function updateProgress() {
  clearedCount.textContent = String(cleared.size);
  journeyProgress.textContent = `${cleared.size} of ${transformations.length}`;
  document.body.classList.toggle("has-progress", cleared.size > 0);

  const finished = cleared.size === transformations.length;
  completion.hidden = !finished;
  resetButton.hidden = cleared.size === 0;
  pathFrame.classList.toggle("is-complete", finished);

  if (finished) {
    status.textContent =
      "All five obstacles have been removed. The path is clear. May Lord Ganesha guide us from obstacles towards wisdom.";
  }
}

function focusNextStone() {
  window.clearTimeout(focusTimer);
  focusTimer = window.setTimeout(() => {
    const next = groups.find((group) => group.dataset.id === nextObstacleId());
    next?.querySelector(".stone")?.focus();
  }, 280);
}

function clearObstacle(group) {
  const item = transformations.find((entry) => entry.id === group.dataset.id);
  if (!item || cleared.has(item.id) || item.id !== nextObstacleId()) return;

  const button = group.querySelector(".stone");
  button.disabled = true;
  group.classList.add("is-clearing");
  group.classList.remove("is-current");
  cleared.add(item.id);

  setCamera(cleared.size);
  showReflection(item);
  showToast(item);
  updateStoneStates();
  updateProgress();

  groups.forEach((other) => {
    if (other !== group && cleared.has(other.dataset.id)) {
      other.classList.add("is-passed");
    }
  });

  const remaining = transformations.length - cleared.size;
  status.textContent = remaining
    ? `${item.obstacle} has been transformed into ${item.quality}. You walk closer to Lord Ganesha. ${cleared.size} of ${transformations.length} obstacles cleared.`
    : `${item.obstacle} has been transformed into ${item.quality}. You arrive at the shrine of Lord Ganesha.`;

  window.setTimeout(() => {
    group.classList.remove("is-clearing");
    group.classList.add("is-cleared");
    if (remaining) focusNextStone();
  }, 610);

  window.setTimeout(() => {
    group.classList.add("is-passed");
  }, remaining ? 1350 : 850);
}

function resetGame() {
  cleared.clear();
  window.clearTimeout(toastTimer);
  window.clearTimeout(focusTimer);
  toast.classList.remove("is-visible");

  groups.forEach((group) => {
    group.classList.remove("is-clearing", "is-cleared", "is-current", "is-ahead", "is-passed");
    group.querySelector(".stone").disabled = false;
  });

  reflectionContent.hidden = true;
  emptyState.hidden = false;
  completion.hidden = true;
  resetButton.hidden = true;
  pathFrame.classList.remove("is-complete");
  setCamera(0);
  status.textContent = "The obstacle-removal experience has been reset.";
  updateStoneStates();
  updateProgress();
  groups.find((group) => group.dataset.id === "fear")?.querySelector(".stone")?.focus();
}

groups.forEach((group) => {
  group.querySelector(".stone").addEventListener("click", () => clearObstacle(group));
});

resetButton.addEventListener("click", resetGame);
setCamera(0, { immediate: true });
updateStoneStates();
updateProgress();
