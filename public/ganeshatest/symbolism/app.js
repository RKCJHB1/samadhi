const symbols = [
  {
    id: "large-ears",
    title: "Large ears",
    theme: "Listen deeply",
    meaning: "Ganesha’s large ears remind us to listen more and speak less.",
  },
  {
    id: "elephant-head",
    title: "Elephant head",
    theme: "Seek wisdom",
    meaning:
      "The elephant head represents wisdom, understanding and the ability to see beyond appearances.",
  },
  {
    id: "trunk",
    title: "The trunk",
    theme: "Be strong and adaptable",
    meaning:
      "Ganesha’s trunk combines great strength with sensitivity, teaching us to adapt without losing our purpose.",
  },
  {
    id: "modaka",
    title: "The modaka",
    theme: "Taste inner joy",
    meaning:
      "The modaka represents the sweetness of spiritual realization—the quiet joy discovered through sincere practice.",
  },
  {
    id: "mushika",
    title: "Mushika",
    theme: "Master restless desire",
    meaning:
      "Ganesha’s small mouse reminds us that even restless desire can be guided when wisdom is in command.",
  },
];

const hotspotButtons = [...document.querySelectorAll(".hotspot")];
const card = document.querySelector("#meaning-card");
const emptyState = document.querySelector("#empty-state");
const content = document.querySelector("#meaning-content");
const number = document.querySelector("#symbol-number");
const title = document.querySelector("#symbol-title");
const theme = document.querySelector("#symbol-theme");
const meaning = document.querySelector("#symbol-meaning");
const progressLabel = document.querySelector("#progress-label");
const progressDots = document.querySelector("#progress-dots");
const previousButton = document.querySelector("#previous-symbol");
const nextButton = document.querySelector("#next-symbol");
const closeButton = document.querySelector("#close-card");
const backdrop = document.querySelector("#card-backdrop");
const completion = document.querySelector("#completion");

let currentIndex = -1;
const visited = new Set();

const isMobileLayout = () => window.matchMedia("(max-width: 820px)").matches;

function buildProgressDots() {
  symbols.forEach((symbol, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "progress-dot";
    dot.dataset.index = String(index);
    dot.setAttribute("aria-label", `Show ${symbol.title}`);
    dot.addEventListener("click", () => selectSymbol(index));
    progressDots.append(dot);
  });
}

function openCard() {
  card.classList.add("is-open");
  document.body.classList.add("has-selection");
  if (isMobileLayout()) {
    document.body.classList.add("card-open");
  }
}

function closeCard() {
  card.classList.remove("is-open");
  document.body.classList.remove("card-open");
}

function updateProgress() {
  const dots = [...progressDots.children];
  dots.forEach((dot, index) => {
    dot.classList.toggle("is-current", index === currentIndex);
    dot.classList.toggle("is-visited", visited.has(index));
    dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
  });

  progressLabel.textContent = `${visited.size} of ${symbols.length} discovered`;
  completion.hidden = visited.size !== symbols.length;
}

function selectSymbol(index) {
  const safeIndex = (index + symbols.length) % symbols.length;
  const symbol = symbols[safeIndex];
  currentIndex = safeIndex;
  visited.add(safeIndex);

  hotspotButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.symbol === symbol.id));
  });

  number.textContent = String(safeIndex + 1).padStart(2, "0");
  title.textContent = symbol.title;
  theme.textContent = symbol.theme;
  meaning.textContent = symbol.meaning;

  emptyState.hidden = true;
  content.hidden = false;
  content.style.animation = "none";
  requestAnimationFrame(() => {
    content.style.animation = "";
  });

  updateProgress();
  openCard();
}

hotspotButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = symbols.findIndex((symbol) => symbol.id === button.dataset.symbol);
    selectSymbol(index);
  });
});

previousButton.addEventListener("click", () => selectSymbol(currentIndex - 1));
nextButton.addEventListener("click", () => selectSymbol(currentIndex + 1));
closeButton.addEventListener("click", closeCard);
backdrop.addEventListener("click", closeCard);

document.addEventListener("keydown", (event) => {
  if (currentIndex < 0) return;

  if (event.key === "Escape") {
    closeCard();
  }
  if (event.key === "ArrowLeft") {
    selectSymbol(currentIndex - 1);
  }
  if (event.key === "ArrowRight") {
    selectSymbol(currentIndex + 1);
  }
});

window.addEventListener("resize", () => {
  if (!isMobileLayout()) {
    document.body.classList.remove("card-open");
  } else if (card.classList.contains("is-open")) {
    document.body.classList.add("card-open");
  }
});

buildProgressDots();
