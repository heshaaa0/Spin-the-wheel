/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
const txt = document.getElementById("txt");
const gifttext = document.getElementById("gifttext");
const gift = document.getElementById("gift");

/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: 300 },
  { minDegree: 31, maxDegree: 60, value: 500 },
  { minDegree: 0, maxDegree: 30, value: 500 },
  { minDegree: 331, maxDegree: 360, value: 400 },
  { minDegree: 301, maxDegree: 330, value: 300 },
  { minDegree: 271, maxDegree: 300, value: 300 },
  { minDegree: 241, maxDegree: 270, value: 700 },
  { minDegree: 211, maxDegree: 240, value: 500 },
  { minDegree: 181, maxDegree: 210, value: 500 },
  { minDegree: 151, maxDegree: 180, value: 2000 },
  { minDegree: 121, maxDegree: 150, value: 300 },
  { minDegree: 91, maxDegree: 120, value: 300 },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "rgb(255, 16, 71)", //green
  "rgb(255, 255, 255)",
  "rgb(255, 16, 71)", //green
  "rgb(255, 255, 255)",
  "rgb(255, 16, 71)", //green
  "rgb(255, 255, 255)",
  "rgb(255, 16, 71)", //green
  "rgb(255, 255, 255)",
  "rgb(255, 16, 71)", //green
  "rgb(255, 255, 255)",
  "rgb(255, 16, 71)", //green
  "rgb(255, 255, 255)",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */

let winnerCounts = {
  rs1000: 0,
};
("S🎫");
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "doughnut",

  data: {
    labels: [
      "🧳",
      "OUT",
      "🔄",
      "☂️",
      "🔄",
      "OUT",
      "🍺",
      "OUT",
      "🔄",
      "👜",
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
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#0d0d0d",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 60, weight: 600 },
        anchor: "center", // Adjust anchor property (start, center, end)
        align: "center",
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      if (31 <= i.minDegree && i.maxDegree <= 60) {
        spinBtn.disabled = false;
        break;
      } else if (0 <= i.minDegree && i.maxDegree <= 30) {
        spinBtn.disabled = false;
        break;
      } else if (331 <= i.minDegree && i.maxDegree <= 360) {
        gifttext.innerHTML = `<p>GIFT</p>`;
        txt.style.display = "none";
        gifttext.classList.add("gift-animation");
        gift.style.display = "block";

        spinBtn.disabled = false;
        break;
      } else if (301 <= i.minDegree && i.maxDegree <= 330) {
        spinBtn.disabled = false;
        break;
      } else if (241 <= i.minDegree && i.maxDegree <= 270) {
        gifttext.innerHTML = `<p>GIFT</p>`;
        gifttext.classList.add("gift-animation");
        txt.style.display = "none";
        gift.style.display = "block";

        spinBtn.disabled = false;
        break;
      } else if (211 <= i.minDegree && i.maxDegree <= 240) {
        spinBtn.disabled = false;
        break;
      } else if (151 <= i.minDegree && i.maxDegree <= 180) {
        gifttext.innerHTML = `<p>GIFT</p>`;
        gifttext.classList.add("gift-animation");
        txt.style.display = "none";
        gift.style.display = "block";

        spinBtn.disabled = false;
        break;
      } else if (121 <= i.minDegree && i.maxDegree <= 150) {
        spinBtn.disabled = false;
        break;
      } else if (91 <= i.minDegree && i.maxDegree <= 120) {
        spinBtn.disabled = false;
        break;
      } else if (61 <= i.minDegree && i.maxDegree <= 90) {
        gifttext.innerHTML = `<p>GIFT</p>`;
        gifttext.classList.add("gift-animation");
        txt.style.display = "none";
        gift.style.display = "block";

        spinBtn.disabled = false;
        break;
      } else if (271 <= i.minDegree && i.maxDegree <= 300) {
        spinBtn.disabled = false;
        break;
      } else {
        spinBtn.disabled = false;
        break;
      }
    }
  }

  setTimeout(reset, 15000);
};

/* --------------- Spin Wheel Logic --------------------- */

let specialStopsCount = 0;
const specialStopLimit = 2;
const startHour = 9;
const endHour = 21;

const specialRanges = [
  { min: 331, max: 360 },
  { min: 241, max: 270 },
  { min: 151, max: 180 },
  { min: 61, max: 90 },
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

const generateRandomDegree = () => {
  let degree;
  let isValid = false;

  while (!isValid) {
    degree = Math.floor(Math.random() * 360);
    const inSpecialRange = isSpecialRange(degree);

    if (
      !isWithinAllowedTime() ||
      !inSpecialRange ||
      specialStopsCount < specialStopLimit
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
  spinBtn.disabled = true;

  const randomDegree = generateRandomDegree(); // Get a valid random degree
  console.log("Stopping Degree:", randomDegree);

  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation += resultValue; // Increment rotation
    spinChart.update();

    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0; // Reset rotation after a full turn
    } else if (count > 15 && spinChart.options.rotation === randomDegree) {
      generateValue(randomDegree); // Display the result
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 30);
});

// Debugging Helper
function logCurrentState() {
  console.log("Special Stops Count:", specialStopsCount);
  console.log("Within Allowed Time:", isWithinAllowedTime());
}

function reset() {
  text.innerHTML = `<p></p>`;
  gifttext.innerHTML = `<p></p>`;
  gift.style.display = "none";
  txt.style.display = "block";
  spinBtn.disabled = false;
}

/* --------------- End Spin Wheel  --------------------- */
