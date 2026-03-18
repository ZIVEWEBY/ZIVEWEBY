const tree = {
  id: "complexity",
  title: "Jak složitý web potřebujete?",
  description: "Vyberte variantu, která nejlépe odpovídá vašemu cíli.",
  options: {
    vizitka: {
      label: "Jednoduchá vizitka",
      next: {
        id: "fast-no-it",
        title: "Rychle a bez IT?",
        description: "Chcete co nejrychlejší řešení bez technické správy?",
        options: {
          ano: {
            label: "Ano",
            result: {
              title: "AI Web Creator",
              detail: "Nejrychlejší cesta k jednoduché prezentaci bez potřeby IT dovedností.",
            },
          },
          ne: {
            label: "Ne, chci růst",
            result: {
              title: "WP + Builder + AI",
              detail: "Lepší volba, pokud chcete web postupně rozšiřovat a mít větší kontrolu.",
            },
          },
        },
      },
    },
    blog: {
      label: "Blog, portfolio",
      next: {
        id: "html-knowledge",
        title: "Znáte HTML a kód?",
        description: "Podle technických zkušeností zvolíme vhodný přístup.",
        options: {
          ano: {
            label: "Ano",
            result: {
              title: "AI generující kód",
              detail: "Vhodné, pokud umíte kód upravovat a chcete flexibilitu.",
            },
          },
          ne: {
            label: "Ne, vizuální správa",
            result: {
              title: "WP + Builder + AI",
              detail: "Ideální pro správu obsahu přes editor bez zásahů do kódu.",
            },
          },
        },
      },
    },
    eshop: {
      label: "E-shop, složité funkce",
      next: {
        id: "self-management",
        title: "Spravovat vše sami?",
        description: "E-shop vyžaduje více provozní a technické péče.",
        options: {
          ano: {
            label: "Ano",
            result: {
              title: "WP + WooCommerce + AI",
              detail: "Pro týmy, které chtějí e-shop řídit interně s pomocí AI nástrojů.",
            },
          },
          ne: {
            label: "Ne",
            result: {
              title: "Expert na klíč",
              detail: "Nejbezpečnější volba, pokud chcete kompletní řešení na míru od specialisty.",
            },
          },
        },
      },
    },
  },
};

const state = {
  currentNode: tree,
  history: [],
};

const questionTitle = document.getElementById("question-title");
const questionDescription = document.getElementById("question-description");
const optionsContainer = document.getElementById("options");
const stepIndicator = document.getElementById("step-indicator");
const backBtn = document.getElementById("back-btn");
const resetBtn = document.getElementById("reset-btn");
const formCard = document.getElementById("form-card");

const resultCard = document.getElementById("result-card");
const resultText = document.getElementById("result-text");
const resultDetail = document.getElementById("result-detail");
const resultResetBtn = document.getElementById("result-reset-btn");

function renderQuestion() {
  const node = state.currentNode;
  const step = state.history.length + 1;

  questionTitle.textContent = node.title;
  questionDescription.textContent = node.description;
  stepIndicator.textContent = `Krok ${step}/2`;

  optionsContainer.innerHTML = "";

  Object.values(node.options).forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = option.label;
    button.addEventListener("click", () => selectOption(option));
    optionsContainer.appendChild(button);
  });

  backBtn.disabled = state.history.length === 0;
}

function selectOption(option) {
  state.history.push(state.currentNode);

  if (option.result) {
    showResult(option.result);
    return;
  }

  state.currentNode = option.next;
  renderQuestion();
}

function goBack() {
  if (state.history.length === 0) return;

  state.currentNode = state.history.pop();
  renderQuestion();
}

function resetFlow() {
  state.currentNode = tree;
  state.history = [];
  resultCard.classList.add("hidden");
  formCard.classList.remove("hidden");
  renderQuestion();
}

function showResult(result) {
  resultText.textContent = result.title;
  resultDetail.textContent = result.detail;
  formCard.classList.add("hidden");
  resultCard.classList.remove("hidden");
}

backBtn.addEventListener("click", goBack);
resetBtn.addEventListener("click", resetFlow);
resultResetBtn.addEventListener("click", resetFlow);

renderQuestion();
