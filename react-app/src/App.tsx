import { useState } from "react";

import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert
          onClick={() => {
            setAlertVisible(false);
          }}
        >
          My Alert
        </Alert>
      )}
      <Button onClick={() => setAlertVisible(true)}>Alert</Button>
    </div>
  );
}

export default App;
