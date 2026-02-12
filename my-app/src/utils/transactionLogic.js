import { supabase } from "./supabaseClient";

// Fetch all transactions from Supabase, ordered by date desc
export const fetchTransactions = async () => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
  return data;
};

// Add new transaction (amount must be positive)
export const addTransaction = async (category, amount, date) => {
  const numericAmount = Math.abs(Number(amount)); // ensure positive
  const { data, error } = await supabase.from("expenses").insert([
    {
      category,
      amount: numericAmount,
      date,
    },
  ]);

  if (error) {
    console.error("Error adding transaction:", error);
    return null;
  }

  if (!data || data.length === 0) {
    console.error("No data returned from Supabase insert");
    return null;
  }

  return data[0];
};

// Filter transactions by category and date
export const filterTransactions = (transactions, filterCategory, filterDate) => {
  return transactions.filter((t) => {
    return (
      (filterCategory === "" || t.category === filterCategory) &&
      (filterDate === "" || t.date === filterDate)
    );
  });
};

// Calculate total expenses (sum of all amounts in expenses table)
export const getTotalExpenses = (transactions) =>
  transactions.reduce((acc, t) => acc + Number(t.amount), 0);

// Calculate balance dynamically using totalIncome from income table
export const getBalance = (totalIncome, transactions) => {
  const totalExpenses = getTotalExpenses(transactions);
  return totalIncome - totalExpenses;
};
