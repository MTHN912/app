import CookieViewer from "../src/document.cookie";
import { logout } from "./api";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {

  const handleLogout = async () => {
    await logout();
    alert("Đăng xuất thành công!");
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Auth Demo</h1>
      <Register />
      <Login />
      <hr />
      <button onClick={handleLogout}>Đăng xuất</button>
      <CookieViewer />
    </div>
  );
}

export default App;