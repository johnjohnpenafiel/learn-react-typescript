import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import ExpenseList from "./expense-tracker/components/ExpenseList";

import { useState } from "react";

export const categories = ["Groceries", "Utilities", "Entertaiment"];

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

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      <div className="mb-5">
        <ExpenseForm />
      </div>
      <div className="mb-3">
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
