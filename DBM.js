// script.js
function authenticateUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    if (username === "hjibhakate2004@gmail.com" && password === "123456") {
        alert("Login successful!");
        document.getElementById("auth").classList.add("hidden");
        document.getElementById("account-management").classList.remove("hidden");
        document.getElementById("fund-transfers").classList.remove("hidden");
        document.getElementById("chatbot").classList.remove("hidden");
    } else {
        alert("Invalid credentials");
    }
}

function checkBalance() {
    alert("Your balance is $5,000");
}

function viewTransactions() {
    alert("Recent Transactions:\n- Grocery: $50\n- Rent: $500\n- Salary Credit: $2000");
}

function downloadStatement() {
    alert("Downloading Statement...");
}

function transferFunds() {
    let method = document.getElementById("transfer-method").value;
    let amount = document.getElementById("amount").value;
    alert(`Transferred ${amount} via ${method}`);
}

function chatbotReply() {
    let input = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");
    let response = "I am a simple bot. Please contact support for further help.";
    chatbox.innerHTML += `<p>User: ${input}</p>`;
    chatbox.innerHTML += `<p>Bot: ${response}</p>`;
}



/////////////////////











































