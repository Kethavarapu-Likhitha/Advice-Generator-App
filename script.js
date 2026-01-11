const adviceId = document.querySelector(".advice-id");
const adviceText = document.querySelector(".advice-text");
const diceBtn = document.querySelector(".dice-btn");
const divider = document.querySelector(".divider");

// Responsive divider
function updateDivider() {
  if (window.innerWidth < 600) {
    divider.src = "images/pattern-divider-mobile.svg";
  } else {
    divider.src = "images/pattern-divider-desktop.svg";
  }
}

window.addEventListener("resize", updateDivider);
updateDivider();

// Fetch advice
async function getAdvice() {
  try {
    diceBtn.disabled = true;
    adviceText.textContent = "⏳ Loading advice...";

    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    adviceId.textContent = `ADVICE #${data.slip.id}`;
    adviceText.textContent = `"${data.slip.advice}"`;

    // Animation
    adviceText.classList.remove("fade");
    void adviceText.offsetWidth;
    adviceText.classList.add("fade");

  } catch (error) {
    adviceText.textContent = "⚠️ Unable to fetch advice.";
  } finally {
    diceBtn.disabled = false;
  }
}

// Click event
diceBtn.addEventListener("click", getAdvice);
