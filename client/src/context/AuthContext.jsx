import { createContext, useContext, useState, useEffect } from "react";
import { login, logout, refreshToken } from "../services/authService.js";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On initial load, refresh token using HTTP-only cookie
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const { accessToken, user } = await refreshToken();
        if (isMounted) {
          setAccessToken(accessToken);
          setUser(user);
        }
      } catch (error) {
        console.error("Auth init failed:", error.message);
        if (isMounted) {
          setUser(null);
          setAccessToken(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogin({ username, password }) {
    try {
      setLoading(true);

      const { accessToken, user } = await login({ username, password }); // { accessToken, user }

      setUser(user);
      setAccessToken(accessToken);
      toast.success("Login successful!");

      return { success: true, role: user.role };
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);

      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage);

      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
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
