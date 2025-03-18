function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function processTransfer() {
    let transferType = document.getElementById("transferType").value;
    let amount = document.getElementById("amount").value;
    let recipient = document.getElementById("recipient").value;
    if(amount && recipient) {
        alert("Processing " + transferType.toUpperCase() + " Transfer of Rs. " + amount + " to " + recipient);
    } else {
        alert("Please enter amount and recipient account number.");
    }
}

function settleTransactions() {
    alert("Clearing & Settling Transactions...");
}

function reconcileTransactions() {
    alert("Reconciling Interbank Transactions...");
}

function generateReport() {
    document.getElementById("reportOutput").innerHTML = "<p>Report Generated: Transactions successfully reconciled and settled.</p>";
}

function validateOTP() {
    let otp = prompt("Enter OTP for verification:");
    if(otp === "123456") {
        alert("OTP Verified Successfully!");
    } else {
        alert("Invalid OTP. Try Again.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadTransactions();
});

// Function to process fund transfers
async function processTransfer() {
    const transferType = document.getElementById("transferType").value;
    const amount = document.getElementById("amount").value;
    const recipient = document.getElementById("recipient").value;

    if (!transferType || !amount || !recipient) {
        alert("Please fill all fields");
        return;
    }

    const requestData = { transferType, amount: Number(amount), recipient };

    try {
        const response = await fetch("http://localhost:3000/api/transfer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Transfer Successful!");
            loadTransactions();  // Reload transactions after successful transfer
        } else {
            alert(result.message || "Transfer Failed");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server Error. Please try again.");
    }
}

// Function to load and display transactions
async function loadTransactions() {
    try {
        const response = await fetch("http://localhost:3000/api/transactions");
        const transactions = await response.json();

        const reportOutput = document.getElementById("reportOutput");
        reportOutput.innerHTML = "<h3>Transaction History</h3>";

        if (transactions.length === 0) {
            reportOutput.innerHTML += "<p>No transactions available.</p>";
            return;
        }

        transactions.forEach(tx => {
            reportOutput.innerHTML += `
                <p><strong>${tx.transferType}</strong>: ₹${tx.amount} to ${tx.recipient} on ${new Date(tx.timestamp).toLocaleString()}</p>
            `;
        });
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("reportOutput").innerHTML = "<p>Error fetching transactions.</p>";
    }
}

// Function to show different sections
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}


