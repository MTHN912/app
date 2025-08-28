import Cookies from "js-cookie";

const API_URL = "http://localhost:3000/api";

function saveToken(token) {
  localStorage.setItem("token", token);
  sessionStorage.setItem("token", token);
}

function getToken() {
  return (
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

function logout() {
  localStorage.removeItem("token");

  sessionStorage.removeItem("token");

  return fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include"
  }).then(res => res.json());
}

async function refreshToken() {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error("Không thể refresh token");
  }

  const data = await res.json();
  if (data.accessToken) {
    saveToken(data.accessToken);
  }
  return data;
}

export { getToken, login, logout, refreshToken, saveToken };

