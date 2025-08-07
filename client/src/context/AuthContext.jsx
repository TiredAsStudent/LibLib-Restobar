import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../services/authService.js";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // RefreshToken
  async function refreshToken() {
    try {
      const { accessToken, user } = await refreshAccessToken();
      setUser(user);
      setAccessToken(accessToken);
    } catch (err) {
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  }

  // On initial load
  useEffect(() => {
    refreshToken();
  }, []);

  // Login
  async function handleLogin({ username, password }) {
    try {
      setLoading(true);

      const { accessToken, user } = await loginUser({ username, password }); // { accessToken, user }

      setUser(user);
      setAccessToken(accessToken);

      const role = user.role?.toLowerCase();

      if (role === "admin") navigate("/admin");
      else if (role === "staff_menu") navigate("/staff/menu");
      else if (role === "staff_kitchen") navigate("/staff/kitchen");
      else navigate("/");

      toast.success("Login successful!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Logout
  async function handleLogout() {
    try {
      await logoutUser();
      setUser(null);
      setAccessToken(null);

      navigate("/");

      toast.success("Logged out successfully!");
    } catch {
      toast.error("Logout failed");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login: handleLogin,
        logout: handleLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
