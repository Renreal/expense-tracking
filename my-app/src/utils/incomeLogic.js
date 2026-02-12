import { supabase } from "./supabaseClient";

// Fetch all income records, including timestamp
export const fetchIncome = async () => {
  const { data, error } = await supabase
    .from("income")
    .select("id, amount, created_at") // use your actual column name
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching income:", error);
    return [];
  }
  return data;
};


// Add new income record
export const addIncome = async (amount) => {
  const { data, error } = await supabase.from("income").insert([
    { amount: Number(amount) },
  ]);

  if (error) {
    console.error("Error adding income:", error);
    return null;
  }

  if (!data || data.length === 0) return null;

  return data[0];
};

// Calculate total income from fetched income array
export const getTotalIncomeFromIncomeTable = (incomeArray) => {
  return incomeArray.reduce((acc, item) => acc + item.amount, 0);
};
