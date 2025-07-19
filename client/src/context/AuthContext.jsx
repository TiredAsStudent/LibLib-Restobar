import { createContext, useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  async function login({ username, password }) {
    try {
      const res = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const { user, token } = res.data;

      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Invalid login credentials");
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
