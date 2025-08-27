import Cookies from "js-cookie";

const API_URL = "http://localhost:3000/api"; // đổi theo backend của bạn

// Lưu token vào 3 nơi
function saveToken(token) {
  localStorage.setItem("token", token);
  sessionStorage.setItem("token", token);
  Cookies.set("token", token, { expires: 1, path: "/" }); // expires: 1 ngày
}

// Lấy token từ 3 nơi (ưu tiên sessionStorage > localStorage > cookie)
function getToken() {
  return (
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    Cookies.get("token")
  );
}

async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });

  const data = await res.json();
  if (data.token) {
    saveToken(data.token);
  }
  return data;
}

async function register(user) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

async function getProtected() {
  const token = getToken();
  const res = await fetch(`${API_URL}/protected`, {
    headers: { Authorization: "Bearer " + token },
  });
  return res.json();
}

export { getProtected, getToken, login, register, saveToken };

