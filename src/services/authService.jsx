import api from "./api";

// Register or Login User
export const registerOrLoginUser = async (userData) => {
  try {
    const response = await api.post("/auth/register-or-login", userData);
    console.log("Auth Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Auth Error:", error.response?.data || error.message);
    throw error;
  }
};

// Save auth data to localStorage
export const saveAuthData = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  console.log("Auth data saved to localStorage");
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

// Logout - clear localStorage
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Update User in Database
export const updateUserInDB = async (userData) => {
  const response = await api.patch("/auth/update-profile", userData);
  return response.data;
};
