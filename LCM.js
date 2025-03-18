function calculateEMI() {
    let type = document.getElementById("loanType").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let rate = parseFloat(document.getElementById("rate").value) / 1200;
    let tenure = parseInt(document.getElementById("tenure").value);
    
    let emi = (amount * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    emi = emi.toFixed(2);
    
    let table = document.getElementById("loanTable");
    let row = table.insertRow();
    row.innerHTML = `<td>${type}</td><td>${amount}</td><td>${(rate * 1200).toFixed(2)}%</td><td>${tenure}</td><td>${emi}</td>`;
}

function trackPayment() {
    let loanId = document.getElementById("loanId").value;
    let emiPaid = parseFloat(document.getElementById("emiPaid").value);
    
    if (!loanId || isNaN(emiPaid) || emiPaid <= 0) {
        alert("Please enter valid details");
        return;
    }
    
    let table = document.getElementById("paymentTable");
    let row = table.insertRow();
    row.innerHTML = `<td>${loanId}</td><td>${emiPaid}</td>`;
}

function assessRisk() {
    let creditScore = parseInt(document.getElementById("creditScore").value);
    let income = parseFloat(document.getElementById("income").value);
    let debt = parseFloat(document.getElementById("debt").value);
    let loanRequested = parseFloat(document.getElementById("loanRequested").value);
    let status = document.getElementById("approvalStatus");
    
    let debtToIncomeRatio = (debt + loanRequested) / income;
    
    if (creditScore >= 750 && debtToIncomeRatio < 0.3) {
        status.innerHTML = "Approved ✅";
        status.style.color = "green";
    } else if (creditScore >= 650 && debtToIncomeRatio < 0.4) {
        status.innerHTML = "Conditional Approval ⚠️";
        status.style.color = "orange";
    } else {
        status.innerHTML = "Rejected ❌";
        status.style.color = "red";
    }
}



async function applyLoan() {
    const loanType = document.getElementById("loanType").value;
    const amount = document.getElementById("amount").value;
    const rate = document.getElementById("rate").value;
    const tenure = document.getElementById("tenure").value;
    
    const response = await fetch("http://localhost:3000/apply-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loanType, amount, rate, tenure })
    });
    
    const loan = await response.json();
    document.getElementById("loanTable").innerHTML += `<tr>
        <td>${loan.loanType}</td>
        <td>${loan.amount}</td>
        <td>${loan.rate}%</td>
        <td>${loan.tenure} months</td>
        <td>${loan.emi.toFixed(2)}</td>
    </tr>`;
}

async function trackPayment() {
    const loanId = document.getElementById("loanId").value;
    const emiPaid = document.getElementById("emiPaid").value;
    
    const response = await fetch("http://localhost:3000/track-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loanId, paidAmount: emiPaid })
    });
    
    const payment = await response.json();
    document.getElementById("paymentTable").innerHTML += `<tr>
        <td>${payment.loanId}</td>
        <td>${payment.paidAmount}</td>
    </tr>`;
}

async function assessRisk() {
    const creditScore = document.getElementById("creditScore").value;
    const income = document.getElementById("income").value;
    const debt = document.getElementById("debt").value;
    const loanRequested = document.getElementById("loanRequested").value;
    
    const response = await fetch("http://localhost:3000/assess-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creditScore, income, debt, loanRequested })
    });
    
    const result = await response.json();
    document.getElementById("approvalStatus").innerText = `Approval Status: ${result.approvalStatus}`;
}
