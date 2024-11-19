import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_HLVS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default apiClient;