document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const companyName = document.getElementById("companyName").value.trim();
    const loanAmount = document.getElementById("loanAmount").value.trim();
    const loanType = document.getElementById("loanType").value;
    const loanReason = document.getElementById("loanReason").value.trim();
    const statusMsg = document.getElementById("loanStatus");

    if (companyName && loanAmount && loanType && loanReason) {
        statusMsg.style.color = "green";
        statusMsg.innerText = "Loan application submitted successfully! We will contact you soon.";
        document.getElementById("loanForm").reset();
    } else {
        statusMsg.style.color = "red";
        statusMsg.innerText = "Please fill in all fields correctly.";
    }
});




document.getElementById("tradeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const companyName = document.getElementById("tradeCompanyName").value.trim();
    const tradeDetails = document.getElementById("tradeDetails").value.trim();
    const tradeType = document.getElementById("tradeType").value;
    const tradeReason = document.getElementById("tradeReason").value.trim();
    const statusMsg = document.getElementById("tradeStatus");
    
    if (companyName && tradeDetails && tradeType && tradeReason) {
        statusMsg.style.color = "green";
        statusMsg.innerText = "Trade finance request submitted successfully! We will contact you soon.";
        document.getElementById("tradeForm").reset();
    } else {
        statusMsg.style.color = "red";
        statusMsg.innerText = "Please fill in all fields correctly.";
    }
});





function viewAccounts() {
    const accountDetails = document.getElementById("accountDetails");
    accountDetails.innerHTML = "<p>Fetching account details...</p>";
    setTimeout(() => {
        accountDetails.innerHTML = `
            <ul>
                <li id="acc1">Account 1: Corporate Savings - Balance: $50,000 <button onclick="closeSpecificAccount('acc1')">Close</button></li>
                <li id="acc2">Account 2: Business Checking - Balance: $120,000 <button onclick="closeSpecificAccount('acc2')">Close</button></li>
            </ul>
        `;
    }, 1000);
}

function openAccount() {
    const accountDetails = document.getElementById("accountDetails");
    accountDetails.innerHTML += "<p>New business account request submitted. Our team will contact you shortly.</p>";
}

function closeAccount() {
    const accountDetails = document.getElementById("accountDetails");
    accountDetails.innerHTML = "<p>Business account closure request submitted. Our team will review your request.</p>";
}

function closeSpecificAccount(accountId) {
    const accountElement = document.getElementById(accountId);
    if (accountElement) {
        accountElement.remove();
    }
}





function viewCashFlow() {
    const cashDetails = document.getElementById("cashDetails");
    cashDetails.innerHTML = "<p>Fetching cash flow details...</p>";
    setTimeout(() => {
        cashDetails.innerHTML = `
            <ul>
                <li>Available Balance: $250,000</li>
                <li>Pending Transactions: $15,000</li>
                <li>Expected Revenue: $50,000</li>
            </ul>
        `;
    }, 1000);
}

function transferFunds() {
    const cashDetails = document.getElementById("cashDetails");
    cashDetails.innerHTML += "<p>Funds transfer request initiated. Our team will process it shortly.</p>";
}

function generateReport() {
    const cashDetails = document.getElementById("cashDetails");
    cashDetails.innerHTML += "<p>Generating cash flow report... Download will be available soon.</p>";
}






document.getElementById("bulkForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const fileInput = document.getElementById("bulkFile");
    const statusMsg = document.getElementById("bulkStatus");

    if (fileInput.files.length === 0) {
        statusMsg.style.color = "red";
        statusMsg.innerText = "Please upload a CSV file.";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const transactions = parseCSV(content);
        
        if (transactions.length === 0) {
            statusMsg.style.color = "red";
            statusMsg.innerText = "Invalid file format. Please upload a valid CSV.";
            return;
        }

        displayTransactions(transactions);
        statusMsg.style.color = "green";
        statusMsg.innerText = "Processing bulk transactions...";

        setTimeout(() => {
            statusMsg.innerText = "Bulk transactions successfully processed!";
        }, 2000);
    };

    reader.readAsText(file);
});

function parseCSV(csvText) {
    const rows = csvText.trim().split("\n").slice(1); 
    return rows.map(row => {
        const columns = row.split(",");
        return {
            id: columns[0],
            amount: columns[1],
            beneficiary: columns[2],
            status: columns[3]
        };
    });
}

function displayTransactions(transactions) {
    let tableHTML = `<table border="1">
        <tr><th>Transaction ID</th><th>Amount</th><th>Beneficiary</th><th>Status</th></tr>`;
    transactions.forEach(tx => {
        tableHTML += `<tr>
            <td>${tx.id}</td>
            <td>$${tx.amount}</td>
            <td>${tx.beneficiary}</td>
            <td>${tx.status}</td>
        </tr>`;
    });
    tableHTML += `</table>`;

    document.getElementById("transactionPreview").innerHTML = tableHTML;
}

function downloadSample() {
    const sampleData = `Transaction ID,Amount,Beneficiary,Status\n12345,5000,John Doe,Pending\n67890,10000,Jane Smith,Pending`;
    const blob = new Blob([sampleData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_bulk_transactions.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}





// Open and close modal functions
function openTreasuryModal() {
    document.getElementById("treasuryModal").style.display = "block";
}

function closeTreasuryModal() {
    document.getElementById("treasuryModal").style.display = "none";
}

// Exchange Currency Function
function exchangeCurrency() {
    let currency = document.getElementById("currency").value;
    let amount = document.getElementById("amount").value;

    if (amount <= 0) {
        alert("Enter a valid amount!");
        return;
    }

    let exchangeRate = {
        USD: 83,
        EUR: 90,
        GBP: 105
    };

    let convertedAmount = amount * exchangeRate[currency];
    alert(`Converted Amount: ₹${convertedAmount.toFixed(2)}`);

    addTransaction("Exchange", convertedAmount);
}

// Get Interest Rates
function getInterestRates() {
    let rates = {
        "Fixed Deposit": "6.5% per annum",
        "Savings Account": "4% per annum",
        "Loan Interest": "8.5% per annum"
    };

    document.getElementById("interestRate").innerHTML =
        `<ul>
            <li>Fixed Deposit: ${rates["Fixed Deposit"]}</li>
            <li>Savings Account: ${rates["Savings Account"]}</li>
            <li>Loan Interest: ${rates["Loan Interest"]}</li>
        </ul>`;
}

// Add Transaction to History
function addTransaction(type, amount) {
    let table = document.getElementById("transactionHistory");
    let row = table.insertRow(0);
    let date = new Date().toLocaleDateString();

    row.insertCell(0).innerHTML = date;
    row.insertCell(1).innerHTML = type;
    row.insertCell(2).innerHTML = `₹${amount.toFixed(2)}`;
}









    document.getElementById("tradeForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/request-trade", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                companyName: document.getElementById("tradeCompanyName").value,
                tradeDetails: document.getElementById("tradeDetails").value,
                tradeType: document.getElementById("tradeType").value,
                tradeReason: document.getElementById("tradeReason").value,
            })
        });
        const data = await response.json();
        document.getElementById("tradeStatus").textContent = data.message;
    });

    document.getElementById("bulkForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", document.getElementById("bulkFile").files[0]);

        const response = await fetch("http://localhost:3000/bulk-transaction", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        document.getElementById("bulkStatus").textContent = data.message;
    });

    document.getElementById("exchangeForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/treasury-transaction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                companyName: "Your Company",
                currency: document.getElementById("currency").value,
                amount: document.getElementById("amount").value,
                transactionType: "Currency Exchange"
            })
        });
        const data = await response.json();
        alert(data.message);
    });

    window.getInterestRates = async () => {
        document.getElementById("interestRate").textContent = "Fetching rates...";
        const response = await fetch("http://localhost:3000/interest-rates");
        const data = await response.json();
        document.getElementById("interestRate").textContent = `Current Interest Rate: ${data.rate}%`;
    };

    window.downloadSample = () => {
        const sampleCsv = "Company,Amount,Account Number\nABC Corp,50000,123456789\nXYZ Ltd,75000,987654321";
        const blob = new Blob([sampleCsv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "sample_bulk_transactions.csv";
        link.click();
    };


