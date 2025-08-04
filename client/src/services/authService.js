import axiosInstance from "../utils/axiosInstance.js";

export const login = async (credentials) => {
  const res = await axiosInstance.post("/auth/login", credentials, {
    withCredentials: true,
  });
  return res.data;
};

export const refreshToken = async () => {
  const res = await axiosInstance.get("/auth/refresh", {
    withCredentials: true,
  });
  return res.data;
};

export const logout = async () => {
  await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
};

export const getAuthHeaderConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
