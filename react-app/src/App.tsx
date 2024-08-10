import { useState } from "react";

import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup/ListGroup";

function App() {
  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  const handleClick = () => {
    const addProduct = {
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
      ),
    };
    setCart(addProduct);
  };

  return (
    <>
      <h1>Items</h1>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            Name:{item.title} Quanity:{item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>Add Product</button>
    </>
  );
}
export default App;
