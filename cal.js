const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const calculator = document.getElementById("calculator");
const themeToggle = document.getElementById("themeToggle");

let isLight = false;

// Add button events
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) appendToDisplay(value);
    else if (action) handleAction(action);
  });
});

function appendToDisplay(input) {
  display.value += input;
}

function handleAction(action) {
  switch (action) {
    case "clear":
      display.value = "";
      break;
    case "backspace":
      display.value = display.value.slice(0, -1);
      break;
    case "calculate":
      calculate();
      break;
    case "square":
      display.value = Math.pow(Number(display.value) || 0, 2);
      break;
    case "sqrt":
      display.value = Math.sqrt(Number(display.value) || 0);
      break;
  }
}

function calculate() {
  try {
    display.value = eval(display.value.replace(/÷/g, "/").replace(/×/g, "*"));
  } catch (error) {
    display.value = "Error";
  }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key.match(/[0-9+\-*/.%]/)) {
    appendToDisplay(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    handleAction("backspace");
  } else if (e.key === "Escape") {
    handleAction("clear");
  }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  isLight = !isLight;
  calculator.classList.toggle("light", isLight);
  calculator.classList.toggle("dark", !isLight);
});
