import { Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses.context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      fallbackText="No expenses registered."
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
