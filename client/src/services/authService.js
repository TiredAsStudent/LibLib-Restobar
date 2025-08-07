import axiosInstance from "../utils/axiosInstance.js";

export const loginUser = async (credentials) => {
  const res = await axiosInstance.post("/auth/login", credentials);
  return res.data;
};

export const refreshAccessToken = async () => {
  const res = await axiosInstance.get("/auth/refresh");
  return res.data;
};

export const logoutUser = async () => {
  await axiosInstance.post("/auth/logout");
};
