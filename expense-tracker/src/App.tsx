import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import { ExpenseFormData } from "./expense-tracker/components/ExpenseForm";

import { useState } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Pizza", amount: 10, category: "Groceries" },
    { id: 2, description: "Milk", amount: 10, category: "Groceries" },
    { id: 3, description: "Eggs", amount: 10, category: "Groceries" },
    { id: 4, description: "Electricity", amount: 10, category: "Utilities" },
  ]);

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleSubmit = (newExpense: ExpenseFormData) => {
    console.log(newExpense);
    setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }]);
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      <div className="mb-5">
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
      <div className="mb-3">
        Code
        <ExpenseFilter
          onSelectCategory={(category) => {
            setSelectedCategory(category);
          }}
        />
      </div>
      <ExpenseList expenses={visibleExpenses} handleDelete={handleDelete} />
    </>
  );
}

export default App;
