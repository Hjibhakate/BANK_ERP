const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');




const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/BankingERP", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));






















  
////////////////////////////////////////////////////////////////////////
  const CustomerSchema = new mongoose.Schema({
      customerName: { type: String, required: true },
      accountType: { type: String, enum: ['savings', 'current', 'fixed', 'recurring'], required: true },
      accountNumber: { type: String, unique: true, required: true },
      balance: { type: Number, default: 0 },
      kycVerified: { type: Boolean, default: false },
      kycDocuments: { type: String } // File path or URL
      
  });
  
  const TransactionSchema = new mongoose.Schema({
      accountNumber: { type: String, required: true },
      transactionType: { type: String, enum: ['deposit', 'withdraw'], required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now }
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  const loanSchema = new mongoose.Schema({
    loanType: String,
    amount: Number,
    rate: Number,
    tenure: Number,
    emi: Number
});

const paymentSchema = new mongoose.Schema({
    loanId: String,
    paidAmount: Number,
    date: { type: Date, default: Date.now }
});

const riskAssessmentSchema = new mongoose.Schema({
    creditScore: Number,
    income: Number,
    debt: Number,
    loanRequested: Number,
    approvalStatus: String
});

// Trade Finance Schema
const tradeSchema = new mongoose.Schema({
  companyName: String,
  tradeDetails: String,
  tradeType: String,
  tradeReason: String,
  status: { type: String, default: "Pending" }
});
// Cash Management Schema
const cashSchema = new mongoose.Schema({
  companyName: String,
  transactionType: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});
// Bulk Transactions Schema
const bulkSchema = new mongoose.Schema({
  companyName: String,
  fileName: String,
  status: { type: String, default: "Processing" }
});
// Treasury Services Schema
const treasurySchema = new mongoose.Schema({
  companyName: String,
  currency: String,
  amount: Number,
  transactionType: String,
  date: { type: Date, default: Date.now }
});
// Define the schema////////////////////////////
const FinancialSchema = new mongoose.Schema({
  type: String, // forex, stock, portfolio, risk, compliance
  currency: String, // for forex
  forexRate: Number,
  stockSymbol: String, // for stocks
  stockPrice: Number,
  cashAmount: Number, // for portfolio
  investmentAmount: Number,
  riskLevel: String, // for risk analysis
  complianceStatus: String, // for compliance checks
  timestamp: { type: Date, default: Date.now }
});
///////////////////////////////
// Define MongoDB Schema & Model
const RiskSchema = new mongoose.Schema({
  creditRisk: String,
  marketRisk: String,
  operationalRisk: String,
  rbiStatus: String,
  sebiStatus: String,
  baselStatus: String,
  amlStatus: String,
  fraudAlerts: String,
  auditLogs: [String]
});

///////////////

// Schema Definitions
const AccountSchema = new mongoose.Schema({
  name: String,
  type: String,
});

const JournalEntrySchema = new mongoose.Schema({
  description: String,
  debit: Number,
  credit: Number,
  date: { type: Date, default: Date.now },
});

const VendorSchema = new mongoose.Schema({
  name: String,
  contact: String,
});

const InvoiceSchema = new mongoose.Schema({
  vendor: String,
  amount: Number,
  gst: Number,
  tds: Number,
  totalPayable: Number,
  dueDate: Date,
  status: String,
});
/////////////////////////////////////


///////////////////
// Define MongoDB Schema
const QuerySchema = new mongoose.Schema({
  customerName: String,
  customerQuery: String,
  queryDepartment: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});
////////////////
////////////
////////

// Fund Transfer Schema
const FundTransferSchema = new mongoose.Schema({
  transferType: String,
  amount: Number,
  recipient: String,
  timestamp: { type: Date, default: Date.now }
});








































const FundTransfer = mongoose.model('FundTransfer', FundTransferSchema);
const Query = mongoose.model('Query', QuerySchema);
const Account = mongoose.model("Account", AccountSchema);
const JournalEntry = mongoose.model("JournalEntry", JournalEntrySchema);
const Vendor = mongoose.model("Vendor", VendorSchema);
const Invoice = mongoose.model("Invoice", InvoiceSchema);

const RiskCompliance = mongoose.model('RiskCompliance', RiskSchema);
const FinancialData = mongoose.model('FinancialData', FinancialSchema);
const Treasury = mongoose.model("Treasury", treasurySchema);
const BulkTransaction = mongoose.model("BulkTransaction", bulkSchema);
const CashTransaction = mongoose.model("CashTransaction", cashSchema);
const Trade = mongoose.model("Trade", tradeSchema);
const Loan = mongoose.model('Loan', loanSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const RiskAssessment = mongoose.model('RiskAssessment', riskAssessmentSchema);

  const Customer = mongoose.model('Customer', CustomerSchema);
  const Transaction = mongoose.model('Transaction', TransactionSchema);
  
  
  module.exports = { Customer, Transaction,Loan,Payment,RiskAssessment,Treasury,BulkTransaction,CashTransaction,Trade,FinancialData,RiskCompliance,Account, JournalEntry, Vendor,Invoice,Query,FundTransfer };

  
  
  //hjbbkbnnlm,.hjlnm.,bnmn,bnm iiiimmmpppp
  app.post('/addCustomer', async (req, res) => {
    try {
        const { customerName, accountType, accountNumber } = req.body;
        const newCustomer = new Customer({ customerName, accountType, accountNumber });
        await newCustomer.save();
        res.json({ message: 'Customer account created successfully' });
    } catch (error) {
        res.status(300).json({ error: error.message });
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// API Route: Process Transactions (Deposit/Withdraw)
app.post('/transaction', async (req, res) => {
    try {
        const { accountNumber, transactionType, amount } = req.body;
        const newTransaction = new Transaction({ accountNumber, transactionType, amount });
        await newTransaction.save();
        res.json({ message: 'Transaction successful' });
    } catch (error) {
        res.status(300).json({ error: error.message });
    }
});


app.post('/apply-loan', async (req, res) => {
  const { loanType, amount, rate, tenure } = req.body;
  const monthlyRate = rate / 100 / 12;
  const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const newLoan = new Loan({ loanType, amount, rate, tenure, emi });
  await newLoan.save();
  res.json(newLoan);
});

// Route to track EMI payments
app.post('/track-payment', async (req, res) => {
  const { loanId, paidAmount } = req.body;
  const newPayment = new Payment({ loanId, paidAmount });
  await newPayment.save();
  res.json(newPayment);
});

// Route to assess credit risk
app.post('/assess-risk', async (req, res) => {
  const { creditScore, income, debt, loanRequested } = req.body;
  let approvalStatus = 'Rejected';
  if (creditScore > 650 && (income - debt) > loanRequested * 0.5) {
      approvalStatus = 'Approved';
  }
  const riskAssessment = new RiskAssessment({ creditScore, income, debt, loanRequested, approvalStatus });
  await riskAssessment.save();
  res.json({ approvalStatus });
});
app.post("/request-trade", async (req, res) => {
  const newTrade = new Trade(req.body);
  await newTrade.save();
  res.json({ message: "Trade finance request submitted." });
});
app.post("/open-account", async (req, res) => {
  const newAccount = new Account(req.body);
  await newAccount.save();
  res.json({ message: "Business account opened successfully." });
});
app.post("/bulk-transaction", async (req, res) => {
  const newBulkTransaction = new BulkTransaction(req.body);
  await newBulkTransaction.save();
  res.json({ message: "Bulk transaction file uploaded." });
});
app.post("/treasury-transaction", async (req, res) => {
  const newTreasury = new Treasury(req.body);
  await newTreasury.save();
  res.json({ message: "Treasury transaction recorded." });
});
///////////////////////////////////////
app.post('/forex', async (req, res) => {
  const { currency, forexRate } = req.body;
  const data = new FinancialData({ type: 'forex', currency, forexRate });
  await data.save();
  res.json({ message: 'Forex rate saved', data });
});

// Save Stock Price
app.post('/stocks', async (req, res) => {
  const { stockSymbol, stockPrice } = req.body;
  const data = new FinancialData({ type: 'stock', stockSymbol, stockPrice });
  await data.save();
  res.json({ message: 'Stock price saved', data });
});

// Save Portfolio Data
app.post('/portfolio', async (req, res) => {
  const { cashAmount, investmentAmount } = req.body;
  const data = new FinancialData({ type: 'portfolio', cashAmount, investmentAmount });
  await data.save();
  res.json({ message: 'Portfolio updated', data });
});

// Save Risk Analysis
app.post('/risk', async (req, res) => {
  const { riskLevel } = req.body;
  const data = new FinancialData({ type: 'risk', riskLevel });
  await data.save();
  res.json({ message: 'Risk analysis saved', data });
});

// Save Compliance Check
app.post('/compliance', async (req, res) => {
  const { complianceStatus } = req.body;
  const data = new FinancialData({ type: 'compliance', complianceStatus });
  await data.save();
  res.json({ message: 'Compliance check saved', data });
});
///////////////////////////////////////////////

// API Routes
app.get('/getRisks', async (req, res) => {
  const risks = await RiskCompliance.findOne();
  res.json(risks);
});

app.post('/updateRisks', async (req, res) => {
  await RiskCompliance.findOneAndUpdate({}, req.body, { upsert: true });
  res.send("Risk Data Updated");
});
/////////////////
// API Routes
app.post("/accounts", async (req, res) => {
  const account = new Account(req.body);
  await account.save();
  res.status(201).send(account);
});

app.get("/accounts", async (req, res) => {
  const accounts = await Account.find();
  res.send(accounts);
});

app.post("/journal", async (req, res) => {
  const entry = new JournalEntry(req.body);
  await entry.save();
  res.status(201).send(entry);
});

app.get("/journal", async (req, res) => {
  const entries = await JournalEntry.find();
  res.send(entries);
});

app.post("/vendors", async (req, res) => {
  const vendor = new Vendor(req.body);
  await vendor.save();
  res.status(201).send(vendor);
});

app.get("/vendors", async (req, res) => {
  const vendors = await Vendor.find();
  res.send(vendors);
});

app.post("/invoices", async (req, res) => {
  req.body.totalPayable = req.body.amount + (req.body.amount * req.body.gst / 100) - (req.body.amount * req.body.tds / 100);
  const invoice = new Invoice(req.body);
  await invoice.save();
  res.status(201).send(invoice);
});

app.get("/invoices", async (req, res) => {
  const invoices = await Invoice.find();
  res.send(invoices);
});

////////////////////
//////////////////
// POST API to Save Query
app.post('/submit-query', async (req, res) => {
  try {
      const { customerName, customerQuery, queryDepartment } = req.body;
      const newQuery = new Query({ customerName, customerQuery, queryDepartment });
      await newQuery.save();
      res.status(201).json({ message: "Query submitted successfully", query: newQuery });
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//////////////////
///////////
//////////
// API to handle fund transfers
app.post('/api/transfer', async (req, res) => {
  try {
      const { transferType, amount, recipient } = req.body;

      if (!transferType || !amount || !recipient) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const newTransfer = new FundTransfer({ transferType, amount, recipient });
      await newTransfer.save();

      res.status(201).json({ message: "Transfer Successful", data: newTransfer });
  } catch (error) {
      res.status(500).json({ message: "Error processing transfer", error });
  }
});

// API to fetch all transactions
app.get('/api/transactions', async (req, res) => {
  try {
      const transactions = await FundTransfer.find();
      res.status(200).json(transactions);
  } catch (error) {
      res.status(500).json({ message: "Error fetching transactions", error });
  }
});






















// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve main.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
