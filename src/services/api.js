// Thin fetch client for the backend. Nothing in the UI calls it yet -
// the pages currently read from src/data/mockData.js. Swap page by page.

const BASE = (import.meta.env.VITE_BACKEND_API_URL || "").replace(/\/+$/, "");
const TOKEN_KEY = "uiu_access_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) =>
  t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY);

async function request(path, { method = "GET", body, headers = {}, auth = true } = {}) {
  const token = auth ? getToken() : null;
  const res = await fetch(`${BASE}${path.startsWith("/") ? path : `/${path}`}`, {
    method,
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include", // remove if your friend's API does not use cookies
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error((data && data.message) || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  del: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

// Example (adjust paths/shape to what the backend actually exposes):
//   const { token, user } = await api.post("/auth/login", { email, password }, { auth: false });
//   setToken(token);
//   const mentors = await api.get("/mentors");
