
// Function to greet the user with voice and text
function greetUser() {
    let chatBox = document.getElementById("chat-box");
    let currentTime = new Date().getHours();
    let greeting;

    if (currentTime < 12) {
        greeting = "Good morning! ☀️";
    } else if (currentTime < 18) {
        greeting = "Good afternoon! 😊";
    } else {
        greeting = "Good evening! 🌙";
    }

    chatBox.innerHTML += `<p><strong>Bot:</strong> ${greeting}</p>`;
    speak(greeting, function() {
        let welcomeMessage = "Welcome to the Customer Service & CRM page! How can I assist you today?";
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${welcomeMessage}</p>`;
        speak(welcomeMessage);
    });
}

// Function to start voice recognition
function startListening() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
        alert("Sorry, your browser does not support speech recognition.");
        return;
    }

    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.start();

    recognition.onstart = function () {
        document.getElementById("speak-btn").innerText = "🎤 Listening...";
    };

    recognition.onresult = function (event) {
        let userSpeech = event.results[0][0].transcript;
        document.getElementById("chat-box").innerHTML += `<p><strong>You:</strong> ${userSpeech}</p>`;
        processUserQuery(userSpeech);
    };

    recognition.onerror = function (event) {
        alert("Speech recognition error: " + event.error);
    };

    recognition.onend = function () {
        document.getElementById("speak-btn").innerText = "🎤 Speak";
    };
}

// Function to process user queries
function processUserQuery(query) {
    query = query.toLowerCase();
    let response;

    if (query.includes("help")) {
        response = "Sure! I can help you with customer service, support tickets, or feedback. What do you need assistance with?";
    } else if (query.includes("ticket")) {
        response = "You can submit a support ticket by entering the details in the Support Ticket section.";
    } else if (query.includes("customer info")) {
        response = "To save customer details, enter their name, email, and phone number in the Customer Information section.";
    } else if (query.includes("feedback")) {
        response = "You can provide feedback and rate our service using the Feedback & Rating section.";
    } else if (query.includes("thank you") || query.includes("thanks")) {
        response = "You're welcome! 😊 Let me know if you need any more help.";
    } else {
        response = "I'm not sure about that. Try asking about customer service, tickets, or feedback!";
    }

    document.getElementById("chat-box").innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;
    speak(response);
}

// Function to make the bot speak
function speak(text, callback = null) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.onend = function () {
        if (callback) callback();
    };
    window.speechSynthesis.speak(speech);
}



























function openAccount() {
    alert("Account opened successfully!");
}

function closeAccount() {
    alert("Account closed successfully!");
}

function deleteAccount() {
    let confirmDelete = confirm("Are you sure you want to delete this account?");
    if (confirmDelete) {
        alert("Account deleted successfully!");
    }
}





 // KYC Verification Function
 function verifyKYC() {
    let accountNumber = document.getElementById("kyc-account").value;
    let kycDoc = document.getElementById("kyc-doc").files[0];
    let statusMessage = document.getElementById("kyc-status");

    if (!accountNumber || !kycDoc) {
        statusMessage.innerHTML = "Please enter your account number and upload a document.";
        statusMessage.style.color = "red";
        return;
    }

    // Simulating a KYC submission process
    statusMessage.innerHTML = "Submitting KYC...";
    statusMessage.style.color = "blue";

    // Simulate a delay for verification
    setTimeout(() => {
        statusMessage.innerHTML = "KYC Submitted Successfully!";
        statusMessage.style.color = "green";
    }, 2000);
}



//gfdghdftyfhg
function toggleSections() {
    let accountType = document.getElementById("account-type").value;
    document.getElementById("transaction-section").classList.toggle("hidden", accountType !== "savings" && accountType !== "current");
    document.getElementById("fd-section").classList.toggle("hidden", accountType !== "fd");
    document.getElementById("rd-section").classList.toggle("hidden", accountType !== "rd");
}

// Transaction Processing (Savings & Current)
function processTransaction() {
    let accountNumber = document.getElementById("transaction-account").value.trim();
    let amount = document.getElementById("transaction-amount").value;
    let type = document.getElementById("transaction-type").value;
    let status = document.getElementById("transaction-status");

    if (accountNumber === "" || amount <= 0) {
        status.innerHTML = "❌ Please enter valid details.";
        status.style.color = "red";
        return;
    }

    status.innerHTML = `✅ ${type === "deposit" ? "Deposited" : "Withdrawn"} ₹${amount} successfully from Account: ${accountNumber}`;
    status.style.color = "green";
}

// Fixed Deposit (FD) Processing
function openFixedDeposit() {
    let accountNumber = document.getElementById("fd-account").value.trim();
    let amount = document.getElementById("fd-amount").value;
    let tenure = document.getElementById("fd-tenure").value;
    let status = document.getElementById("fd-status");

    if (accountNumber === "" || amount <= 0 || tenure <= 0) {
        status.innerHTML = "❌ Please enter valid FD details.";
        status.style.color = "red";
        return;
    }

    let maturityAmount = amount * (1 + (5.5 / 100) * (tenure / 12)); // Approx. FD rate of 5.5%
    status.innerHTML = `✅ FD Opened! Maturity Amount: ₹${maturityAmount.toFixed(2)} for Account: ${accountNumber}`;
    status.style.color = "green";
}

// Recurring Deposit (RD) Processing
function openRecurringDeposit() {
    let accountNumber = document.getElementById("rd-account").value.trim();
    let amount = document.getElementById("rd-amount").value;
    let tenure = document.getElementById("rd-tenure").value;
    let status = document.getElementById("rd-status");

    if (accountNumber === "" || amount <= 0 || tenure <= 0) {
        status.innerHTML = "❌ Please enter valid RD details.";
        status.style.color = "red";
        return;
    }

    let maturityAmount = amount * tenure + (amount * tenure * (5 / 100)); // Approx. RD rate of 5%
    status.innerHTML = `✅ RD Opened! Maturity Amount: ₹${maturityAmount.toFixed(2)} for Account: ${accountNumber}`;
    status.style.color = "green";
}








//dfdfd

// Save Customer Information
function saveCustomerInfo() {
    let name = document.getElementById("customer-name").value.trim();
    let email = document.getElementById("customer-email").value.trim();
    let phone = document.getElementById("customer-phone").value.trim();
    let status = document.getElementById("customer-status");

    if (name === "" || email === "" || phone === "") {
        status.innerHTML = "❌ Please enter all customer details.";
        status.style.color = "red";
        return;
    }

    status.innerHTML = `✅ Customer ${name} saved successfully!`;
    status.style.color = "green";
}

// Submit Support Ticket
function submitTicket() {
    let ticketId = document.getElementById("ticket-id").value.trim();
    let description = document.getElementById("ticket-description").value.trim();
    let status = document.getElementById("ticket-status");

    if (description === "") {
        status.innerHTML = "❌ Please enter a description for the issue.";
        status.style.color = "red";
        return;
    }

    let generatedId = ticketId || Math.floor(Math.random() * 10000);
    status.innerHTML = `✅ Ticket Submitted! Your Ticket ID: ${generatedId}`;
    status.style.color = "green";
}



// Submit Feedback
function submitFeedback() {
    let feedback = document.getElementById("feedback-text").value.trim();
    let rating = document.getElementById("feedback-rating").value;
    let status = document.getElementById("feedback-status");

    if (feedback === "") {
        status.innerHTML = "❌ Please enter your feedback.";
        status.style.color = "red";
        return;
    }

    status.innerHTML = `✅ Thank you for your feedback! Rating: ${rating} ⭐`;
    status.style.color = "green";
}

















//bhdbcksdcksndvbsdnmvnslkdncvzdbfjvnzdbhvln iiiiiiiimmmp

async function openAccount() {
    const customerName = document.getElementById('customerName').value;
    const accountType = document.getElementById('accountType').value;
    const accountNumber = document.getElementById('accountNumber').value;

    const response = await fetch('http://localhost:3000/addCustomer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, accountType, accountNumber })
    });

    const data = await response.json();
    alert(data.message);
}
////////////////////////////////////////////hhjjmkjnkjnj

async function processTransaction() {
    const accountNumber = document.getElementById('transaction-account').value;
    const transactionType = document.getElementById('transaction-type').value;
    const amount = document.getElementById('transaction-amount').value;

    const response = await fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountNumber, transactionType, amount })
    });

    const data = await response.json();
    alert(data.message);
}

 



