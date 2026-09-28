import axios from "axios";

const STORAGE_KEY = "scscore_auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const { token } = JSON.parse(raw);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY);
      // AuthContext listens for this and clears state; ProtectedRoute
      // then redirects to the right portal's login page on its own.
      window.dispatchEvent(new Event("scscore:unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default apiClient;