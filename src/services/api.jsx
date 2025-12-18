import axios from "axios";

const api = axios.create({
  baseURL: "https://book-now-server-two.vercel.app/api", // ← Make sure this is correct
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // console.log("API Request - Token exists:", !!token);
    // console.log("API Request - URL:", config.url);
    if (config.data) {
      // console.log("API Request - Data:", config.data);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => {
    // console.log("API Response - Success:", response.data);
    return response;
  },
  (error) => {
    console.error("API Response - Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
