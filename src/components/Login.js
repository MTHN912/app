import { useState } from "react";
import { login } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.token) {
      setMessage("Đăng nhập thành công!");
    } else {
      setMessage(result.error || "Đăng nhập thất bại");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Đăng nhập</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}
