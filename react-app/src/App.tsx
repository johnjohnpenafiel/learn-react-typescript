import { useState } from "react";

import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup/ListGroup";

function App() {
  const [alertVisible, setAlertVisible] = useState(false);

  const items = ["New York", "Los Angeles", "Miami"];

  const onSelectedItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectedItem={onSelectedItem}
      />
    </div>
  );
}

export default App;
