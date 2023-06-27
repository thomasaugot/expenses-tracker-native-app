import { Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect } from "react";
import { ExpensesContext } from "../store/expenses.context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const expenseDate = new Date(expense.date);

    return expenseDate >= date7DaysAgo && expenseDate <= today;
  });

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      setFetchedExpenses(expenses);
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  return (
    <ExpensesOutput
      fallbackText="No expenses registered for the last 7 days."
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
