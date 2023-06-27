import { View, Text, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A paid of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2022-09-08"),
  },
  {
    id: "e3",
    description: "Magazines",
    amount: 29.5,
    date: new Date("2022-02-17"),
  },
  {
    id: "e4",
    description: "Festival tickets",
    amount: 119,
    date: new Date("2022-04-07"),
  },
  {
    id: "e5",
    description: "Beer",
    amount: 19.2,
    date: new Date("2022-12-09"),
  },
  {
    id: "e6",
    description: "Bread",
    amount: 1.5,
    date: new Date("2022-09-08"),
  },
  {
    id: "e7",
    description: "Food",
    amount: 19.98,
    date: new Date("2022-09-03"),
  },
  {
    id: "e8",
    description: "Candles",
    amount: 89.99,
    date: new Date("2022-09-08"),
  },
  {
    id: "e9",
    description: "Present mom",
    amount: 89.99,
    date: new Date("2022-10-08"),
  },
  {
    id: "e10",
    description: "Clothes",
    amount: 89.99,
    date: new Date("2022-10-16"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
