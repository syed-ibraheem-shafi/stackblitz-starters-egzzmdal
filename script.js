const sampleParagraphs = [
  "The quick brown fox jumps over the lazy dog. Practice typing every single day to improve your speed and accuracy.",
  "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
  "Web development involves HTML for structure, CSS for design, and JavaScript for interactivity and full functionality."
];

let timer = 60;
let timerInterval = null;
let isPlaying = false;
let currentText = "";
let totalTyped = 0;
let correctTyped = 0;

const textDisplay = document.getElementById("text-display");
const inputBox = document.getElementById("input-box");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart-btn");

function loadParagraph() {
  const randomIndex = Math.floor(Math.random() * sampleParagraphs.length);
  currentText = sampleParagraphs[randomIndex];
  textDisplay.innerHTML = "";
  
  currentText.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    textDisplay.appendChild(span);
  });
}

function startTest() {
  if (!isPlaying) {
    isPlaying = true;
    timerInterval = setInterval(() => {
      if (timer > 0) {
        timer--;
        timerEl.innerText = timer;
        calculateStats();
      } else {
        endTest();
      }
    }, 1000);
  }
}

function calculateStats() {
  const timeElapsed = 60 - timer;
  if (timeElapsed > 0) {
    const wpm = Math.round((correctTyped / 5) / (timeElapsed / 60));
    wpmEl.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  }
  
  const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;
  accuracyEl.innerText = accuracy;
}

inputBox.addEventListener("input", () => {
  startTest();
  
  const arrayQuote = textDisplay.querySelectorAll("span");
  const arrayValue = inputBox.value.split("");
  
  totalTyped = arrayValue.length;
  correctTyped = 0;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
      correctTyped++;
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
    }
  });
});

function endTest() {
  clearInterval(timerInterval);
  inputBox.disabled = true;
  isPlaying = false;
}

restartBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timer = 60;
  isPlaying = false;
  totalTyped = 0;
  correctTyped = 0;
  timerEl.innerText = timer;
  wpmEl.innerText = 0;
  accuracyEl.innerText = 100;
  inputBox.disabled = false;
  inputBox.value = "";
  loadParagraph();
});

loadParagraph();
