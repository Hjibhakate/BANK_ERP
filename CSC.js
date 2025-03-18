document.addEventListener("DOMContentLoaded", function() {
    loadCallLogs();
});

// Ticket Submission
function submitQuery() {
    let name = document.getElementById("customer-name").value;
    let query = document.getElementById("customer-query").value;
    let department = document.getElementById("query-department").value;

    if (!name || !query) {
        alert("Please enter your name and query.");
        return;
    }

    let queryList = document.getElementById("query-list");
    let newQuery = document.createElement("p");
    newQuery.innerHTML = `<strong>${name} (${department}):</strong> ${query}`;
    queryList.appendChild(newQuery);

    document.getElementById("customer-name").value = "";
    document.getElementById("customer-query").value = "";
}

// Load Call Logs
function loadCallLogs() {
    let callLogs = document.getElementById("call-logs");
    callLogs.innerHTML = "<p>Call Log 1: Customer A - Resolved</p><p>Call Log 2: Customer B - Pending</p>";
}

// Assign Call to Agent
function assignCall() {
    let assignedCalls = document.getElementById("assigned-calls");
    let newCall = document.createElement("p");
    newCall.innerHTML = "New call assigned to Agent.";
    assignedCalls.appendChild(newCall);
}

// Chatbot Interaction
function sendMessage() {
    let chatWindow = document.getElementById("chat-window");
    let chatInput = document.getElementById("chat-input").value;
    
    if (!chatInput) return;
    
    let userMessage = document.createElement("p");
    userMessage.innerHTML = `<strong>You:</strong> ${chatInput}`;
    chatWindow.appendChild(userMessage);

    let botResponse = document.createElement("p");
    botResponse.innerHTML = `<strong>Bot:</strong> Thank you for your query. We will assist you shortly.`;
    chatWindow.appendChild(botResponse);

    document.getElementById("chat-input").value = "";
}

// Connect to Human Agent
function connectAgent() {
    let chatWindow = document.getElementById("chat-window");
    let agentResponse = document.createElement("p");
    agentResponse.innerHTML = `<strong>Agent:</strong> You are now connected to a human support agent.`;
    chatWindow.appendChild(agentResponse);
}

// View Audit Logs
function viewAuditLogs() {
    let auditLogs = document.getElementById("audit-logs");
    auditLogs.innerHTML = "<p>Log Entry 1: Query submitted by Customer A.</p><p>Log Entry 2: Call assigned to Agent B.</p>";
}

///////////////////////////////////////////
///////////////////////

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submit-query-btn").addEventListener("click", submitQuery);
});

async function submitQuery() {
    const customerName = document.getElementById("customer-name").value;
    const customerQuery = document.getElementById("customer-query").value;
    const queryDepartment = document.getElementById("query-department").value;

    if (!customerName || !customerQuery) {
        alert("Please fill in all fields.");
        return;
    }

    const queryData = { customerName, customerQuery, queryDepartment };
    
    try {
        const response = await fetch("http://localhost:3000/submit-query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(queryData)
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Error submitting query:", error);
        alert("Failed to submit query. Please try again later.");
    }
}
