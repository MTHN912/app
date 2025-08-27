import { useState } from "react";
import { getProtected } from "./api";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [protectedData, setProtectedData] = useState("");

  const handleGetProtected = async () => {
    try {
      const result = await getProtected();
      setProtectedData(JSON.stringify(result));
    } catch (err) {
      setProtectedData("Lỗi gọi API: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Auth Demo</h1>
      <Register />
      <Login />
      <hr />
      <button onClick={handleGetProtected}>Gọi API Protected</button>
      <pre>{protectedData}</pre>
    </div>
  );
}

export default App;