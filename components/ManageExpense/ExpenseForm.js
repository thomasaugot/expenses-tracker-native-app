import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    let formattedValue = enteredValue;

    if (inputIdentifier === "date") {
      // Remove non-numeric characters from the entered value
      formattedValue = enteredValue.replace(/\D/g, "");

      if (formattedValue.length > 2) {
        // Insert "-" after the second character (day)
        formattedValue = formattedValue.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1-$2-$3");
      } else if (formattedValue.length > 4) {
        // Insert "-" after the fourth character (month)
        formattedValue = formattedValue.replace(/(\d{2})(\d{2})(\d{2,4})/, "$1-$2-$3");
      }
    }

    setInputValues((currentInputValues) => ({
      ...currentInputValues,
      [inputIdentifier]: formattedValue,
    }));
  };

  const submitHandler = () => {
    const dateParts = inputValues.date.split("-"); // Split the input date into parts
    const formattedDate = new Date(
      parseInt(dateParts[2]), // Year
      parseInt(dateParts[1]), // Month
      parseInt(dateParts[0]) // Day
    );

    const expenseData = {
      amount: +inputValues.amount,
      date: formattedDate,
      description: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid input", "Please check your input values");
      return;
    }
    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "DD-MM-YYYY",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
            keyboardType: "number-pad", // Use number-pad keyboard for numeric input
            textContentType: "none", // Disable auto-fill suggestions
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
          multiline: true,
          // autoCorrect: false , can be used but better for email inputs
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "white", textAlign: "center" },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    margin: 44,
  },
  button: {
    width: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flex: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
