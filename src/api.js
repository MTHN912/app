import Cookies from "js-cookie";

const API_URL = "http://localhost:3000/api";

function saveToken(token) {
  localStorage.setItem("token", token);
  sessionStorage.setItem("token", token);
  Cookies.set("token", token, { expires: 1, path: "/" });
}

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

function logout() {
  localStorage.removeItem("token");

  sessionStorage.removeItem("token");

  Cookies.remove("normalToken", { path: "/" });

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

async function fetchWithAuth(url, options = {}) {
  let token = getToken();

  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
  };

  let res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      const refreshRes = await refreshToken();
      if (refreshRes.accessToken) {
        token = getToken();
        const retryHeaders = {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        res = await fetch(`${API_URL}${url}`, {
          ...options,
          headers: retryHeaders,
          credentials: "include",
        });
      }
    } catch (err) {
      console.error("Refresh token thất bại:", err);
    }
  }

  return res;
}

export { fetchWithAuth, getToken, login, logout, refreshToken, register, saveToken };

