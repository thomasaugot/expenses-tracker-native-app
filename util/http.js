import axios from "axios";

const BACKEND_URL = "https://expenses-tracker-react-n-d4496-default-rtdb.firebaseio.com/";

export const storeExpense = async (expenseData) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/expenses.json", // .json extension is only specific to firebase
      expenseData
    );
    const id = response.data.name;
    console.log("Expense data stored successfully");
    return id;
  } catch (error) {
    console.log("Error storing expense data:", error);
  }
};

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/expenses.json");
    const expenses = [];

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: response.data[key].date,
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }
    return expenses;
  } catch (error) {
    console.log("Error fetching expense data:", error);
  }
};

export const updateExpense = async (expenseData) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/expenses.json", // .json extension is only specific to firebase
      expenseData
    );
    const id = response.data.name;
    console.log("Expense data stored successfully");
    return id;
  } catch (error) {
    console.log("Error storing expense data:", error);
  }
};

export const deleteExpense = async (expenseData) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/expenses.json", // .json extension is only specific to firebase
      expenseData
    );
    const id = response.data.name;
    console.log("Expense data stored successfully");
    return id;
  } catch (error) {
    console.log("Error storing expense data:", error);
  }
};
