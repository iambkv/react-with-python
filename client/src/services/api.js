import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to login if token is expired/invalid
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ─── Auth APIs ──────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getMe: () => API.get("/auth/me"),
};

// ─── Item APIs ──────────────────────────────────────────────────────────────
export const itemAPI = {
  getAll: () => API.get("/items/"),
  getOne: (id) => API.get(`/items/${id}`),
  create: (data) => API.post("/items/", data),
  update: (id, data) => API.put(`/items/${id}`, data),
  delete: (id) => API.delete(`/items/${id}`),
};

export default API;
