function showSection(sectionId) {
    let sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}



document.getElementById("accountForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let accountName = document.getElementById("accountName").value;
    let accountType = document.getElementById("accountType").value;

    let table = document.getElementById("accountTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.innerHTML = `<td>${accountName}</td><td>${accountType}</td>`;

    document.getElementById("accountName").value = "";
});

document.getElementById("journalForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let entryDesc = document.getElementById("entryDesc").value;
    let debit = parseFloat(document.getElementById("debit").value);
    let credit = parseFloat(document.getElementById("credit").value);

    if (debit <= 0 && credit <= 0) {
        alert("Debit or Credit must have a valid amount!");
        return;
    }

    let table = document.getElementById("journalTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.innerHTML = `<td>${entryDesc}</td><td>${debit.toFixed(2)}</td><td>${credit.toFixed(2)}</td>`;

    document.getElementById("entryDesc").value = "";
    document.getElementById("debit").value = "";
    document.getElementById("credit").value = "";
});

function calculateTrialBalance() {
    let trialBalanceTable = document.getElementById("trialBalanceTable").getElementsByTagName('tbody')[0];
    trialBalanceTable.innerHTML = "";

    let journalRows = document.getElementById("journalTable").getElementsByTagName('tbody')[0].rows;
    let debitTotal = 0, creditTotal = 0;

    for (let row of journalRows) {
        let desc = row.cells[0].innerText;
        let debit = parseFloat(row.cells[1].innerText) || 0;
        let credit = parseFloat(row.cells[2].innerText) || 0;

        debitTotal += debit;
        creditTotal += credit;

        let newRow = trialBalanceTable.insertRow();
        newRow.innerHTML = `<td>${desc}</td><td>${debit.toFixed(2)}</td><td>${credit.toFixed(2)}</td>`;
    }

    let newRow = trialBalanceTable.insertRow();
    newRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${debitTotal.toFixed(2)}</strong></td><td><strong>${creditTotal.toFixed(2)}</strong></td>`;
}






document.getElementById("vendorForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let vendorName = document.getElementById("vendorName").value;
    let vendorContact = document.getElementById("vendorContact").value;

    let table = document.getElementById("vendorTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.innerHTML = `<td>${vendorName}</td><td>${vendorContact}</td>`;

    document.getElementById("vendorName").value = "";
    document.getElementById("vendorContact").value = "";
});

document.getElementById("invoiceForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let vendor = document.getElementById("invoiceVendor").value;
    let amount = parseFloat(document.getElementById("invoiceAmount").value);
    let dueDate = document.getElementById("dueDate").value;
    let gstRate = parseFloat(document.getElementById("gstRate").value);
    let tdsRate = parseFloat(document.getElementById("tdsRate").value);

    let gstAmount = (amount * gstRate) / 100;
    let tdsAmount = (amount * tdsRate) / 100;
    let totalPayable = amount + gstAmount - tdsAmount;

    let table = document.getElementById("invoiceTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${vendor}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${gstAmount.toFixed(2)}</td>
        <td>${tdsAmount.toFixed(2)}</td>
        <td>${totalPayable.toFixed(2)}</td>
        <td>${dueDate}</td>
        <td>Pending</td>
        <td><button onclick="markAsPaid(this)">Mark as Paid</button></td>
    `;

    document.getElementById("invoiceVendor").value = "";
    document.getElementById("invoiceAmount").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("gstRate").value = "";
    document.getElementById("tdsRate").value = "";
});

function markAsPaid(button) {
    let row = button.parentElement.parentElement;
    row.cells[6].innerText = "Paid";
    button.remove();
}

function generateAgingReport() {
    let agingTable = document.getElementById("agingTable").getElementsByTagName('tbody')[0];
    agingTable.innerHTML = "";

    let invoiceRows = document.getElementById("invoiceTable").getElementsByTagName('tbody')[0].rows;
    let today = new Date();

    for (let row of invoiceRows) {
        let vendor = row.cells[0].innerText;
        let amount = row.cells[1].innerText;
        let dueDate = new Date(row.cells[5].innerText);
        let status = row.cells[6].innerText;

        let rowClass = "";
        if (status === "Pending" && dueDate < today) {
            rowClass = 'overdue';
        }

        let newRow = agingTable.insertRow();
        newRow.className = rowClass;
        newRow.innerHTML = `<td>${vendor}</td><td>${amount}</td><td>${dueDate.toDateString()}</td><td>${status}</td>`;
    }
}







document.addEventListener("DOMContentLoaded", function () {
    const addInvoiceBtn = document.getElementById("add-invoice-btn");
    const modal = document.getElementById("invoice-form");
    const closeModal = document.querySelector(".close");
    const saveInvoiceBtn = document.getElementById("save-invoice");
    const invoiceTableBody = document.getElementById("invoice-table-body");

    let invoices = [];

    addInvoiceBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    saveInvoiceBtn.addEventListener("click", () => {
        const invoiceNumber = document.getElementById("invoice-number").value;
        const customerName = document.getElementById("customer-name").value;
        const invoiceAmount = document.getElementById("invoice-amount").value;
        const dueDate = document.getElementById("due-date").value;

        if (invoiceNumber && customerName && invoiceAmount && dueDate) {
            const invoice = {
                invoiceNumber,
                customerName,
                invoiceAmount,
                dueDate,
                status: "Pending"
            };

            invoices.push(invoice);
            updateTable();
            modal.style.display = "none";
        } else {
            alert("Please fill all fields.");
        }
    });

    function updateTable() {
        invoiceTableBody.innerHTML = "";
        invoices.forEach((inv, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${inv.invoiceNumber}</td>
                <td>${inv.customerName}</td>
                <td>$${inv.invoiceAmount}</td>
                <td>${inv.dueDate}</td>
                <td>${inv.status}</td>
                <td><button onclick="markPaid(${index})">Mark Paid</button></td>
            `;
            invoiceTableBody.appendChild(row);
        });
    }

    window.markPaid = function (index) {
        invoices[index].status = "Paid";
        updateTable();
    };
});





document.addEventListener("DOMContentLoaded", function () {
    const addTransactionBtn = document.getElementById("add-transaction-btn");
    const modal = document.getElementById("transaction-form");
    const closeModal = document.querySelector(".close");
    const saveTransactionBtn = document.getElementById("save-transaction");
    const transactionTable = document.getElementById("transaction-table");
    const totalProfitLoss = document.getElementById("total-profit-loss");

    let transactions = [];

    addTransactionBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    saveTransactionBtn.addEventListener("click", () => {
        const type = document.getElementById("transaction-type").value;
        const description = document.getElementById("transaction-description").value;
        const amount = parseFloat(document.getElementById("transaction-amount").value);
        const date = document.getElementById("transaction-date").value;

        if (description && amount && date) {
            const transaction = { type, description, amount, date };
            transactions.push(transaction);
            updateTable();
            modal.style.display = "none";
        } else {
            alert("Please fill all fields.");
        }
    });

    function updateTable() {
        transactionTable.innerHTML = "";
        let total = 0;

        transactions.forEach((txn, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${txn.type}</td>
                <td>${txn.description}</td>
                <td>$${txn.amount.toFixed(2)}</td>
                <td>${txn.date}</td>
                <td><button onclick="deleteTransaction(${index})">Delete</button></td>
            `;

            if (txn.type === "Income") {
                total += txn.amount;
            } else {
                total -= txn.amount;
            }

            transactionTable.appendChild(row);
        });

        totalProfitLoss.textContent = `$${total.toFixed(2)}`;
    }

    window.deleteTransaction = function (index) {
        transactions.splice(index, 1);
        updateTable();
    };
});





document.addEventListener("DOMContentLoaded", function () {
    const addAssetBtn = document.getElementById("add-asset-btn");
    const modal = document.getElementById("asset-form");
    const closeModal = document.querySelector(".close");
    const saveAssetBtn = document.getElementById("save-asset");
    const assetTableBody = document.getElementById("asset-table-body");

    let assets = [];

    addAssetBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    saveAssetBtn.addEventListener("click", () => {
        const assetId = document.getElementById("asset-id").value;
        const assetName = document.getElementById("asset-name").value;
        const purchasePrice = parseFloat(document.getElementById("purchase-price").value);
        const depreciationRate = parseFloat(document.getElementById("depreciation-rate").value);

        if (assetId && assetName && purchasePrice && depreciationRate) {
            const currentValue = purchasePrice - (purchasePrice * (depreciationRate / 100));
            const asset = {
                assetId,
                assetName,
                purchasePrice,
                currentValue,
                depreciationRate
            };

            assets.push(asset);
            updateTable();
            modal.style.display = "none";
        } else {
            alert("Please fill all fields.");
        }
    });

    function updateTable() {
        assetTableBody.innerHTML = "";
        assets.forEach((asset, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${asset.assetId}</td>
                <td>${asset.assetName}</td>
                <td>$${asset.purchasePrice.toFixed(2)}</td>
                <td>$${asset.currentValue.toFixed(2)}</td>
                <td>${asset.depreciationRate}%</td>
                <td><button onclick="disposeAsset(${index})">Dispose</button></td>
            `;
            assetTableBody.appendChild(row);
        });
    }

    window.disposeAsset = function (index) {
        assets.splice(index, 1);
        updateTable();
    };
});





document.addEventListener("DOMContentLoaded", function () {
    const addExpenseBtn = document.getElementById("add-expense-btn");
    const modal = document.getElementById("expense-form");
    const closeModal = document.querySelector(".close");
    const saveExpenseBtn = document.getElementById("save-expense");
    const expenseTable = document.getElementById("expense-table");
    const totalExpenses = document.getElementById("total-expenses");
    const remainingBudget = document.getElementById("remaining-budget");
    const setBudgetBtn = document.getElementById("set-budget-btn");
    const monthlyBudgetInput = document.getElementById("monthly-budget");

    let expenses = [];
    let budget = 0;

    addExpenseBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    setBudgetBtn.addEventListener("click", () => {
        budget = parseFloat(monthlyBudgetInput.value);
        if (isNaN(budget) || budget <= 0) {
            alert("Please enter a valid budget amount.");
            return;
        }
        updateBudget();
    });

    saveExpenseBtn.addEventListener("click", () => {
        const category = document.getElementById("expense-category").value;
        const description = document.getElementById("expense-description").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const date = document.getElementById("expense-date").value;

        if (description && amount && date) {
            const expense = { category, description, amount, date };
            expenses.push(expense);
            updateTable();
            modal.style.display = "none";
        } else {
            alert("Please fill all fields.");
        }
    });

    function updateTable() {
        expenseTable.innerHTML = "";
        let total = 0;

        expenses.forEach((expense, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.date}</td>
                <td><button onclick="deleteExpense(${index})">Delete</button></td>
            `;

            total += expense.amount;
            expenseTable.appendChild(row);
        });

        totalExpenses.textContent = `$${total.toFixed(2)}`;
        updateBudget();
    }

    function updateBudget() {
        let totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        let remaining = budget - totalSpent;
        remainingBudget.textContent = `$${remaining.toFixed(2)}`;

        if (remaining < 0) {
            remainingBudget.classList.add("alert");
        } else {
            remainingBudget.classList.remove("alert");
        }
    }

    window.deleteExpense = function (index) {
        expenses.splice(index, 1);
        updateTable();
    };
});






document.addEventListener("DOMContentLoaded", function () {
    const addTaxBtn = document.getElementById("add-tax-btn");
    const modal = document.getElementById("tax-form");
    const closeModal = document.querySelector(".close");
    const saveTaxBtn = document.getElementById("save-tax");
    const taxTable = document.getElementById("tax-table");
    const totalTaxDisplay = document.getElementById("total-tax");
    const generateReportBtn = document.getElementById("generate-report");

    let taxTransactions = [];

    addTaxBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    saveTaxBtn.addEventListener("click", () => {
        const transactionId = document.getElementById("transaction-id").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const taxType = document.getElementById("tax-type").value;
        const taxRate = parseFloat(document.getElementById("tax-rate").value);

        if (transactionId && amount && taxType && taxRate) {
            const taxAmount = (amount * taxRate) / 100;
            const transaction = { transactionId, amount, taxType, taxRate, taxAmount };

            taxTransactions.push(transaction);
            updateTable();
            modal.style.display = "none";
        } else {
            alert("Please fill all fields.");
        }
    });

    function updateTable() {
        taxTable.innerHTML = "";
        let totalTax = 0;

        taxTransactions.forEach((transaction, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.transactionId}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
                <td>${transaction.taxType}</td>
                <td>${transaction.taxRate}%</td>
                <td>$${transaction.taxAmount.toFixed(2)}</td>
                <td><button onclick="deleteTransaction(${index})">Delete</button></td>
            `;

            totalTax += transaction.taxAmount;
            taxTable.appendChild(row);
        });

        totalTaxDisplay.textContent = `$${totalTax.toFixed(2)}`;
    }

    window.deleteTransaction = function (index) {
        taxTransactions.splice(index, 1);
        updateTable();
    };

    generateReportBtn.addEventListener("click", () => {
        let report = "Tax Compliance Report\n\n";
        report += "Transaction ID | Amount | Tax Type | Tax Rate | Tax Amount\n";
        report += "-----------------------------------------------------------\n";

        taxTransactions.forEach(t => {
            report += `${t.transactionId} | $${t.amount.toFixed(2)} | ${t.taxType} | ${t.taxRate}% | $${t.taxAmount.toFixed(2)}\n`;
        });

        report += `\nTotal Tax Liability: $${totalTaxDisplay.textContent}\n`;
        
        alert(report);  // Display as an alert (Can be saved as a file)
    });
});



document.querySelectorAll('.sidebar ul li').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
        this.classList.add('active');
    });
});
//////////////////////

const API_URL = "http://localhost:3000";

// Function to add an account
document.getElementById("accountForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const accountName = document.getElementById("accountName").value;
    const accountType = document.getElementById("accountType").value;

    const response = await fetch(`${API_URL}/add-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountName, accountType }),
    });

    const data = await response.json();
    loadAccounts();
    e.target.reset();
});

// Function to load accounts
async function loadAccounts() {
    const response = await fetch(`${API_URL}/get-accounts`);
    const accounts = await response.json();
    const tableBody = document.querySelector("#accountTable tbody");
    tableBody.innerHTML = "";
    accounts.forEach(account => {
        const row = `<tr><td>${account.accountName}</td><td>${account.accountType}</td></tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to add a journal entry
document.getElementById("journalForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const entryDesc = document.getElementById("entryDesc").value;
    const debit = document.getElementById("debit").value;
    const credit = document.getElementById("credit").value;

    await fetch(`${API_URL}/add-journal-entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryDesc, debit, credit }),
    });

    loadJournalEntries();
    e.target.reset();
});

// Function to load journal entries
async function loadJournalEntries() {
    const response = await fetch(`${API_URL}/get-journal-entries`);
    const entries = await response.json();
    const tableBody = document.querySelector("#journalTable tbody");
    tableBody.innerHTML = "";
    entries.forEach(entry => {
        const row = `<tr><td>${entry.entryDesc}</td><td>${entry.debit}</td><td>${entry.credit}</td></tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to add a vendor
document.getElementById("vendorForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const vendorName = document.getElementById("vendorName").value;
    const vendorContact = document.getElementById("vendorContact").value;

    await fetch(`${API_URL}/add-vendor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorName, vendorContact }),
    });

    loadVendors();
    e.target.reset();
});

// Function to load vendors
async function loadVendors() {
    const response = await fetch(`${API_URL}/get-vendors`);
    const vendors = await response.json();
    const tableBody = document.querySelector("#vendorTable tbody");
    tableBody.innerHTML = "";
    vendors.forEach(vendor => {
        const row = `<tr><td>${vendor.vendorName}</td><td>${vendor.vendorContact}</td></tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to add an invoice
document.getElementById("invoiceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const invoiceVendor = document.getElementById("invoiceVendor").value;
    const invoiceAmount = document.getElementById("invoiceAmount").value;
    const dueDate = document.getElementById("dueDate").value;
    const gstRate = document.getElementById("gstRate").value;
    const tdsRate = document.getElementById("tdsRate").value;

    await fetch(`${API_URL}/add-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceVendor, invoiceAmount, dueDate, gstRate, tdsRate }),
    });

    loadInvoices();
    e.target.reset();
});

// Function to load invoices
async function loadInvoices() {
    const response = await fetch(`${API_URL}/get-invoices`);
    const invoices = await response.json();
    const tableBody = document.querySelector("#invoiceTable tbody");
    tableBody.innerHTML = "";
    invoices.forEach(invoice => {
        const row = `
            <tr>
                <td>${invoice.invoiceVendor}</td>
                <td>${invoice.invoiceAmount}</td>
                <td>${invoice.gstRate}%</td>
                <td>${invoice.tdsRate}%</td>
                <td>${invoice.totalPayable}</td>
                <td>${new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td>${invoice.status}</td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}

// Load data when the page loads
document.addEventListener("DOMContentLoaded", () => {
    loadAccounts();
    loadJournalEntries();
    loadVendors();
    loadInvoices();
});

