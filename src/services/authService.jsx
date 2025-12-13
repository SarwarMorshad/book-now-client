import api from "./api";

// Register or Login User
export const registerOrLoginUser = async (userData) => {
  const response = await api.post("/auth/register-or-login", userData);
  return response.data;
};

// Get User Profile
export const getUserProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// Save token and user to localStorage
export const saveAuthData = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
