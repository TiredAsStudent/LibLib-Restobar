import axios from "../utils/axiosInstance.js";

export const login = async (credentials) => {
  const res = await axios.post("/auth/login", credentials, {
    withCredentials: true,
  });
  return res.data; // { accessToken, user }
};

export const refreshToken = async () => {
  const res = await axios.get("/auth/refresh", {
    withCredentials: true,
  });
  return res.data; // { accessToken, user }
};

export const logout = async () => {
  await axios.post("/auth/logout", {}, { withCredentials: true });
};

export const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
