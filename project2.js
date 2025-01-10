const svg = document.getElementById('sky-svg');
const body = document.body;

// Create twinkling stars
function createStars() {
  for (let i = 0; i < 200; i++) {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const radius = Math.random() * 2 + 1;

    star.setAttribute("cx", x);
    star.setAttribute("cy", y);
    star.setAttribute("r", radius);
    star.setAttribute("fill", "white");
    star.setAttribute("opacity", Math.random());

    svg.appendChild(star);

    star.animate([
      { opacity: Math.random() },
      { opacity: Math.random() + 0.5 }
    ], {
      duration: Math.random() * 2000 + 1000,
      iterations: Infinity,
      direction: "alternate",
    });
  }
}

// Create sparkly comet trail
function createCometTrail(x, y) {
  const comet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  comet.setAttribute("cx", x);
  comet.setAttribute("cy", y);
  comet.setAttribute("r", 8);
  comet.setAttribute("fill", "yellow");
  comet.setAttribute("filter", "url(#glow)");
  comet.setAttribute("opacity", 1);

  svg.appendChild(comet);

  // Sparkle particles
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    sparkle.setAttribute("cx", x);
    sparkle.setAttribute("cy", y);
    sparkle.setAttribute("r", Math.random() * 3 + 1);
    sparkle.setAttribute("fill", "gold");
    sparkle.setAttribute("opacity", 1);

    svg.appendChild(sparkle);

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 30;

    sparkle.animate([
      { transform: `translate(0, 0)`, opacity: 1 },
      { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`, opacity: 0 }
    ], {
      duration: 600,
      easing: 'ease-out',
      fill: 'forwards',
    });

    setTimeout(() => sparkle.remove(), 600);
  }

  comet.animate([
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.5)" }
  ], {
    duration: 800,
    easing: 'ease-out',
    fill: 'forwards',
  });

  setTimeout(() => comet.remove(), 800);
}

// Animate background with mouse movement (solid color change)
document.addEventListener('mousemove', (e) => {
  const xPercent = e.clientX / window.innerWidth * 100;
  const yPercent = e.clientY / window.innerHeight * 100;
  body.style.backgroundColor = `rgb(${Math.floor(xPercent)}, ${Math.floor(yPercent)}, 51)`; // Solid color effect

  createCometTrail(e.clientX, e.clientY);
});

// Initialize stars
createStars();
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultDiv = document.getElementById("result");

    if (!amount) {
        resultDiv.innerHTML = "Please enter a valid amount.";
        return;
    }

    try {
        // Fetch exchange rates from API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        if (!response.ok) throw new Error("Failed to fetch exchange rates.");
        const data = await response.json();

        // Calculate conversion
        const rate = data.rates[toCurrency];
        if (!rate) {
            resultDiv.innerHTML = `Conversion rate for ${toCurrency} is not available.`;
            return;
        }

        const convertedAmount = (amount * rate).toFixed(2);
        resultDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
}