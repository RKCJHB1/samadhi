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

const groups = [...document.querySelectorAll(".transformation")];
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

function updateProgress() {
  clearedCount.textContent = String(cleared.size);
  journeyProgress.textContent = `${cleared.size} of ${transformations.length}`;
  document.body.classList.toggle("has-progress", cleared.size > 0);

  journeyItems.forEach((item) => {
    item.classList.toggle("is-cleared", cleared.has(item.dataset.id));
  });

  const finished = cleared.size === transformations.length;
  completion.hidden = !finished;
  resetButton.hidden = cleared.size === 0;

  if (finished) {
    status.textContent =
      "All five obstacles have been removed. The path is clear. May Lord Ganesha guide us from obstacles towards wisdom.";
  }
}

function clearObstacle(group) {
  const item = transformations.find((entry) => entry.id === group.dataset.id);
  if (!item || cleared.has(item.id)) return;

  const button = group.querySelector(".stone");
  button.disabled = true;
  group.classList.add("is-clearing");
  cleared.add(item.id);

  showReflection(item);
  showToast(item);
  updateProgress();
  status.textContent = `${item.obstacle} has been transformed into ${item.quality}. ${cleared.size} of ${transformations.length} obstacles cleared.`;

  window.setTimeout(() => {
    group.classList.remove("is-clearing");
    group.classList.add("is-cleared");
  }, 610);
}

function resetGame() {
  cleared.clear();
  window.clearTimeout(toastTimer);
  toast.classList.remove("is-visible");

  groups.forEach((group) => {
    group.classList.remove("is-clearing", "is-cleared");
    group.querySelector(".stone").disabled = false;
  });

  reflectionContent.hidden = true;
  emptyState.hidden = false;
  completion.hidden = true;
  resetButton.hidden = true;
  status.textContent = "The obstacle-removal experience has been reset.";
  updateProgress();
  groups.at(-1)?.querySelector(".stone")?.focus();
}

groups.forEach((group) => {
  group.querySelector(".stone").addEventListener("click", () => clearObstacle(group));
});

resetButton.addEventListener("click", resetGame);
updateProgress();
