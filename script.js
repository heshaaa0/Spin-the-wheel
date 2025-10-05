/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const startBtn = document.getElementById("start_btn");
const text = document.getElementById("text");
const txt = document.getElementById("txt");
const gifttext = document.getElementById("gifttext");
const gift = document.getElementById("gift");

/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: 300 }, // 🎁
  { minDegree: 31, maxDegree: 60, value: 500 }, // OUT
  { minDegree: 0, maxDegree: 30, value: 500 }, // 🔄
  { minDegree: 331, maxDegree: 360, value: 400 }, // 🎁
  { minDegree: 301, maxDegree: 330, value: 300 }, // 🔄
  { minDegree: 271, maxDegree: 300, value: 300 }, // OUT
  { minDegree: 241, maxDegree: 270, value: 700 }, // 🎁
  { minDegree: 211, maxDegree: 240, value: 500 }, // OUT
  { minDegree: 181, maxDegree: 210, value: 500 }, // 🔄
  { minDegree: 151, maxDegree: 180, value: 2000 }, // 🎁
  { minDegree: 121, maxDegree: 150, value: 300 }, // 🔄
  { minDegree: 91, maxDegree: 120, value: 300 }, // OUT
];

/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

/* --------------- Background Colors  --------------------- */
var spinColors = [
  "rgb(255, 16, 71)",
  "rgb(255, 255, 255)",
  "rgb(255, 16, 71)",
  "rgb(255, 255, 255)",
  "rgb(255, 16, 71)",
  "rgb(255, 255, 255)",
  "rgb(255, 16, 71)",
  "rgb(255, 255, 255)",
  "rgb(255, 16, 71)",
  "rgb(255, 255, 255)",
  "rgb(255, 16, 71)",
  "rgb(255, 255, 255)",
];

/* --------------- Chart --------------------- */
let winnerCounts = { rs1000: 0 };
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "doughnut",
  data: {
    labels: [
      "🎁",
      "OUT",
      "🔄",
      "🎁",
      "🔄",
      "OUT",
      "🎁",
      "OUT",
      "🔄",
      "🎁",
      "🔄",
      "OUT",
    ],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
        cutout: 100,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        rotation: 90,
        color: "#0d0d0d",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 60, weight: 600 },
        anchor: "center",
        align: "center",
      },
    },
  },
});

let countSpins = 0; // Track total spins
const maxWins = 5; // Maximum wins allowed
let currentWins = 0; // Current wins
let gameOver = false; // Track game-over state

/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      if ([61, 151, 241, 331].includes(i.minDegree)) {
        // Gift segments
        gifttext.innerHTML = `<p>GIFT</p>`;
        gifttext.classList.add("gift-animation");
        gift.style.display = "block";
        currentWins++; // Increment wins for gift outcomes
        txt.style.display = "none";
        spinBtn.disabled = true;
      } else if ([31, 91, 211, 271].includes(i.minDegree)) {
        // OUT segments
        gifttext.innerHTML = `<p style="font-size:72px">OUT - Game Over!</p>`;
        text.innerHTML = `<p>No more spins allowed!</p>`;
        gift.style.display = "none";
        spinBtn.disabled = true; // Permanently disable spin button
        gameOver = true; // Set game-over state
        txt.style.display = "none";
      } else {
        // 🔄 segments
        gifttext.innerHTML = `<p style="font-size:72px">SPIN AGAIN</p>`;
        gift.style.display = "none";
        txt.style.display = "none";
      }
      if (!gameOver) {
        spinBtn.disabled = false; // Re-enable button unless game is over
      }

      break;
    }
  }
  setTimeout(reset, 150000);
};

/* --------------- Spin Wheel Logic --------------------- */
let specialStopsCount = 0;
const specialStopLimit = 2;
const startHour = 18;
const endHour = 21;

const specialRanges = [
  { min: 331, max: 360 },
  { min: 241, max: 270 },
  { min: 151, max: 180 },
  { min: 61, max: 90 },
];

const outRanges = [
  { min: 31, max: 60 },
  { min: 91, max: 120 },
  { min: 211, max: 240 },
  { min: 271, max: 300 },
];

const isWithinAllowedTime = () => {
  const currentHour = new Date().getHours();
  return currentHour >= startHour && currentHour < endHour;
};

const isSpecialRange = (degree) => {
  return specialRanges.some(
    (range) => degree >= range.min && degree <= range.max
  );
};

const isOutRange = (degree) => {
  return outRanges.some((range) => degree >= range.min && degree <= range.max);
};

const generateRandomDegree = () => {
  let degree;
  let isValid = false;
  const remainingWins = maxWins - currentWins;

  if (remainingWins <= 0) {
    // Force OUT when no remaining wins
    const randomRange = outRanges[Math.floor(Math.random() * outRanges.length)];
    degree =
      Math.floor(Math.random() * (randomRange.max - randomRange.min + 1)) +
      randomRange.min;
    return degree;
  }

  while (!isValid) {
    degree = Math.floor(Math.random() * 360);
    const inSpecialRange = isSpecialRange(degree);

    // Allow special range only if within time, under special stop limit, and remaining wins > 0
    if (
      !inSpecialRange ||
      (isWithinAllowedTime() &&
        specialStopsCount < specialStopLimit &&
        remainingWins > 0)
    ) {
      isValid = true;
      if (isWithinAllowedTime() && inSpecialRange) {
        specialStopsCount++;
      }
    }
  }
  return degree;
};

/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
  if (gameOver) {
    console.log("Game Over! No more spins allowed.");
    return;
  }
  countSpins++;
  console.log(`Count of Spins: ${countSpins}`);
  spinBtn.disabled = true;
  const randomDegree = generateRandomDegree();
  console.log("Stopping Degree:", randomDegree);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation += resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation === randomDegree) {
      generateValue(randomDegree);
      // totalSpins++;
      logWinningProbability();
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 30);
});

// Start button to reset the game
startBtn.addEventListener("click", () => {
  reset();
  console.log("Game Started!");
});

// Probability of winning and remaining wins
function logWinningProbability() {
  const remainingWins = maxWins - currentWins;

  console.log(`Remaining Wins: ${remainingWins >= 0 ? remainingWins : 0}`);
  if (gameOver) {
    console.log("Game Over: Landed on OUT!");
  }
}

/* --------------- Reset --------------------- */
function reset() {
  location.reload();
}

/* --------------- Debug --------------------- */
function logCurrentState() {
  console.log("Special Stops Count:", specialStopsCount);
  console.log("Within Allowed Time:", isWithinAllowedTime());
  console.log("Game Over:", gameOver);
}
