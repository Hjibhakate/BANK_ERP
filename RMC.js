function logAction(action) {
    let logDiv = document.getElementById("auditLogs");
    let timestamp = new Date().toLocaleString();
    logDiv.innerHTML += `<p>[${timestamp}] ${action}</p>`;
}

function updateRiskLevels() {
    const risks = ["Low", "Moderate", "High"];
    document.getElementById("creditRisk").innerText = risks[Math.floor(Math.random() * 3)];
    document.getElementById("marketRisk").innerText = risks[Math.floor(Math.random() * 3)];
    document.getElementById("operationalRisk").innerText = risks[Math.floor(Math.random() * 3)];
    logAction("Updated risk levels");
    updateRiskChart();
}

function checkCompliance() {
    const statuses = ["Compliant", "Non-Compliant", "Pending Review"];
    document.getElementById("rbiStatus").innerText = statuses[Math.floor(Math.random() * 3)];
    document.getElementById("sebiStatus").innerText = statuses[Math.floor(Math.random() * 3)];
    document.getElementById("baselStatus").innerText = statuses[Math.floor(Math.random() * 3)];
    document.getElementById("amlStatus").innerText = statuses[Math.floor(Math.random() * 3)];
    logAction("Checked compliance status");
}

function detectFraud() {
    const fraudCases = ["None", "1 Suspicious Transaction", "Multiple Suspicious Transactions"];
    document.getElementById("fraudAlerts").innerText = fraudCases[Math.floor(Math.random() * 3)];
    logAction("Fraud detection scan performed");
}

function uploadDocument() {
    let fileInput = document.getElementById("documentUpload");
    if (fileInput.files.length > 0) {
        logAction("Uploaded compliance document: " + fileInput.files[0].name);
    } else {
        alert("No file selected");
    }
}

function exportLogs() {
    let logs = document.getElementById("auditLogs").innerText;
    let blob = new Blob([logs], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "audit_logs.txt";
    link.click();
    logAction("Exported audit logs");
}

function updateRiskChart() {
    let ctx = document.getElementById("riskChart").getContext("2d");
    let data = {
        labels: ["Credit Risk", "Market Risk", "Operational Risk"],
        datasets: [{
            label: "Risk Levels",
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
            backgroundColor: ["red", "yellow", "blue"]
        }]
    };
    if (window.riskChart) {
        window.riskChart.destroy();
    }
    window.riskChart = new Chart(ctx, { type: "bar", data: data });
}

const API_URL = "http://localhost:3000"; // Update with your server URL if hosted elsewhere

// Fetch Risk & Compliance Data from MongoDB
async function fetchData() {
    try {
        let response = await fetch(`${API_URL}/getRisks`);
        let data = await response.json();

        document.getElementById("creditRisk").textContent = data.creditRisk || "N/A";
        document.getElementById("marketRisk").textContent = data.marketRisk || "N/A";
        document.getElementById("operationalRisk").textContent = data.operationalRisk || "N/A";

        document.getElementById("rbiStatus").textContent = data.rbiStatus || "N/A";
        document.getElementById("sebiStatus").textContent = data.sebiStatus || "N/A";
        document.getElementById("baselStatus").textContent = data.baselStatus || "N/A";
        document.getElementById("amlStatus").textContent = data.amlStatus || "N/A";

        document.getElementById("fraudAlerts").textContent = data.fraudAlerts || "None";

        let logsContainer = document.getElementById("auditLogs");
        logsContainer.innerHTML = "";
        (data.auditLogs || []).forEach(log => {
            let logEntry = document.createElement("p");
            logEntry.textContent = log;
            logsContainer.appendChild(logEntry);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Update Risk Levels in MongoDB
async function updateRiskLevels() {
    let updatedData = {
        creditRisk: "Moderate",
        marketRisk: "High",
        operationalRisk: "Low"
    };

    try {
        await fetch(`${API_URL}/updateRisks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });
        fetchData(); // Refresh UI
    } catch (error) {
        console.error("Error updating risks:", error);
    }
}

// Check Compliance Status
async function checkCompliance() {
    let complianceData = {
        rbiStatus: "Compliant",
        sebiStatus: "Compliant",
        baselStatus: "Non-Compliant",
        amlStatus: "Under Review"
    };

    try {
        await fetch(`${API_URL}/updateRisks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(complianceData)
        });
        fetchData();
    } catch (error) {
        console.error("Error updating compliance:", error);
    }
}

// Detect Fraud
async function detectFraud() {
    let fraudDetectionData = {
        fraudAlerts: "3 Suspicious Transactions Detected"
    };

    try {
        await fetch(`${API_URL}/updateRisks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fraudDetectionData)
        });
        fetchData();
    } catch (error) {
        console.error("Error detecting fraud:", error);
    }
}

// Upload KYC/AML Document
function uploadDocument() {
    let fileInput = document.getElementById("documentUpload");
    if (fileInput.files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    alert("Document uploaded successfully! (Mock Upload)");
}

// Export Audit Logs (Mock)
function exportLogs() {
    alert("Audit Logs Exported! (Mock Export)");
}

// Load Data on Page Load
document.addEventListener("DOMContentLoaded", fetchData);
