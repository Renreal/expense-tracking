import { useState, useEffect } from "react";
import {
  fetchTransactions,
  addTransaction,
  filterTransactions,
  getTotalExpenses,
} from "./utils/transactionLogic";
import {
  fetchIncome,
  addIncome,
  getTotalIncomeFromIncomeTable,
} from "./utils/incomeLogic";
import Summary from "./components/summary.jsx";
import ExpensesModal from "./components/expenseModal.jsx";

function App() {
  const [showSummary, setShowSummary] = useState(false);
  const [showExpensesModal, setShowExpensesModal] = useState(false);

  // Expenses state
  const [transactions, setTransactions] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Income state
  const [incomeRecords, setIncomeRecords] = useState([]);
  const [newIncome, setNewIncome] = useState("");

  // Load income and expenses on mount
  useEffect(() => {
    const loadData = async () => {
      const incomeData = await fetchIncome();
      const expenseData = await fetchTransactions();
      setIncomeRecords(incomeData);
      setTransactions(expenseData);
    };
    loadData();
  }, []);

  // Add new income
  const handleAddIncome = async () => {
    if (!newIncome) return;
    const incomeItem = await addIncome(newIncome);
    if (incomeItem) {
      setIncomeRecords([incomeItem, ...incomeRecords]);
      setNewIncome("");
    }
  };

  // Add new expense
  const handleAddExpense = async () => {
    if (!expenseAmount || !expenseCategory || !expenseDate) return;

    const expenseItem = await addTransaction(
      expenseCategory,
      Number(expenseAmount),
      expenseDate
    );

    if (expenseItem) {
      setTransactions([expenseItem, ...transactions]);
      setExpenseAmount("");
      setExpenseCategory("");
      setExpenseDate("");
    }
  };

  // Filtered expenses for display
  const filteredTransactions = filterTransactions(
    transactions,
    filterCategory,
    filterDate
  );

  // Calculate totals (always using all records)
  const totalIncome = getTotalIncomeFromIncomeTable(incomeRecords);
  const totalExpenses = getTotalExpenses(transactions);
  const balance = totalIncome - totalExpenses;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "2rem",
        fontFamily: "Arial",
      }}
    >
      <h1>Expense Tracker (Supabase)</h1>

      {/* Income Section */}
      <div
        style={{
          marginBottom: "1rem",
          borderBottom: "1px solid #ccc",
          paddingBottom: "1rem",
        }}
      >
        <h3>Add Income</h3>
        <input
          type="number"
          placeholder="Amount"
          value={newIncome}
          onChange={(e) => setNewIncome(e.target.value)}
        />
        <button onClick={handleAddIncome}>Add Income</button>
      </div>

      {/* Expense Section */}
      <div style={{ marginBottom: "1rem" }}>
        <h3>Add Expense</h3>
        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={expenseCategory}
          onChange={(e) => setExpenseCategory(e.target.value)}
        />
        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      {/* Filter Expenses */}
      <div style={{ marginBottom: "1rem" }}>
        <h3>Filter Expenses</h3>
        <input
          type="text"
          placeholder="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <button
          onClick={() => setShowSummary(true)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Show Summary
        </button>
        <button
          onClick={() => setShowExpensesModal(true)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Show Expenses
        </button>
      </div>

      {/* Income List */}
      <div>
        <h3>Income Records</h3>
        <ul>
          {incomeRecords.map((inc) => (
            <li key={inc.id}>
              ${parseFloat(inc.amount).toFixed(2)} —{" "}
              <em>{new Date(inc.created_at).toLocaleString()}</em>
            </li>
          ))}
        </ul>
      </div>

   
      {showSummary && (
        <Summary
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
          onClose={() => setShowSummary(false)}
        />
      )}
      {showExpensesModal && (
        <ExpensesModal
          expenses={filteredTransactions}
          onClose={() => setShowExpensesModal(false)}
        />
      )}
    </div>
  );
}

export default App;
