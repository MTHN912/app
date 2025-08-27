import { useState } from "react";
import { register } from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register({ email, password });
    if (result.user) {
      setMessage("Đăng ký thành công!");
    } else {
      setMessage(result.error || "Đăng ký thất bại");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Đăng ký</h2>
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
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}
