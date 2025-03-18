// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Fetch Forex Rates (Placeholder API)
function fetchForexRate() {
    let currency = document.getElementById("forexCurrency").value;
    let forexRates = { USD: 83, EUR: 90, GBP: 105, JPY: 0.61 };  // Simulated Rates
    let rate = forexRates[currency];

    document.getElementById("forexResult").innerHTML = `1 ${currency} = ₹${rate}`;
}

// Fetch Stock Prices (Placeholder API)
function fetchStockPrice() {
    let stock = document.getElementById("stockSymbol").value.toUpperCase();
    let stockPrices = { AAPL: 150, TSLA: 800, TCS: 3500, INFY: 1800 };  // Simulated Prices
    let price = stockPrices[stock] || "Unknown";

    document.getElementById("stockResult").innerHTML = `Stock Price of ${stock}: ₹${price}`;
}

// Calculate Portfolio Summary
function calculatePortfolio() {
    let cash = parseFloat(document.getElementById("cashAmount").value) || 0;
    let investment = parseFloat(document.getElementById("investmentAmount").value) || 0;
    let totalWealth = cash + investment;

    document.getElementById("portfolioSummary").innerHTML = `Total Portfolio Value: ₹${totalWealth.toFixed(2)}`;
}

// Risk Analysis (Simulated AI Model)
function analyzeRisk() {
    let riskLevel = Math.random() * 100;  // Simulated Risk %
    let strategy = riskLevel > 50 ? "High Risk! Diversify investments." : "Low Risk! Portfolio is stable.";

    document.getElementById("riskResult").innerHTML = `Risk Level: ${riskLevel.toFixed(2)}% - ${strategy}`;
}

// Compliance Check (Placeholder)
function checkCompliance() {
    let complianceStatus = Math.random() > 0.5 ? "✅ Compliant" : "⚠️ Non-Compliant! Check investments.";
    
    document.getElementById("complianceResult").innerHTML = complianceStatus;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BASE_URL = "http://localhost:3000"; // Change this if using a live server

// Fetch Forex Rate
async function fetchForexRate() {
    const currency = document.getElementById("forexCurrency").value;
    try {
        // Simulated forex rate (Replace with actual API if needed)
        const forexRate = (Math.random() * (85 - 70) + 70).toFixed(2); 

        document.getElementById("forexResult").innerText = `1 ${currency} = ₹${forexRate}`;

        await fetch(`${BASE_URL}/forex`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currency, forexRate })
        });
    } catch (error) {
        console.error("Error fetching forex rate:", error);
    }
}

// Fetch Stock Price
async function fetchStockPrice() {
    const stockSymbol = document.getElementById("stockSymbol").value.toUpperCase();
    if (!stockSymbol) return alert("Please enter a stock symbol.");

    try {
        // Simulated stock price (Replace with actual API if needed)
        const stockPrice = (Math.random() * (3000 - 1000) + 1000).toFixed(2);

        document.getElementById("stockResult").innerText = `${stockSymbol} = ₹${stockPrice}`;

        await fetch(`${BASE_URL}/stocks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stockSymbol, stockPrice })
        });
    } catch (error) {
        console.error("Error fetching stock price:", error);
    }
}

// Update Portfolio
async function calculatePortfolio() {
    const cashAmount = parseFloat(document.getElementById("cashAmount").value) || 0;
    const investmentAmount = parseFloat(document.getElementById("investmentAmount").value) || 0;

    const totalValue = cashAmount + investmentAmount;
    document.getElementById("portfolioSummary").innerText = `Total Portfolio Value: ₹${totalValue}`;

    await fetch(`${BASE_URL}/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cashAmount, investmentAmount })
    });
}

// Risk Analysis
async function analyzeRisk() {
    const riskLevels = ["Low", "Moderate", "High", "Very High"];
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];

    document.getElementById("riskResult").innerText = `Risk Level: ${riskLevel}`;

    await fetch(`${BASE_URL}/risk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riskLevel })
    });
}

// Compliance Check
async function checkCompliance() {
    const complianceStatus = Math.random() > 0.5 ? "Compliant" : "Non-Compliant";

    document.getElementById("complianceResult").innerText = `Compliance Status: ${complianceStatus}`;

    await fetch(`${BASE_URL}/compliance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complianceStatus })
    });
}
////////////////////////////////////////////////////////////////////////////////