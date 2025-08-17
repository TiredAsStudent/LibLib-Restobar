import axiosInstance from "../utils/axiosInstance.js";
import { buildQuery } from "../utils/buildQuery.js";

/** List menus with filters & pagination */
export const listMenus = async (params = {}) => {
  const q = buildQuery(params);
  const res = await axiosInstance.get(`/admin/menus${q}`);
  return res.data;
};

export const createMenu = async (formData) => {
  const res = await axiosInstance.post(`/admin/menus`, formData);
  return res.data;
};

export const updateMenu = async (id, formData) => {
  const res = await axiosInstance.put(`/admin/menus/${id}`, formData);
  return res.data;
};

export const deleteMenu = async (id) => {
  const res = await axiosInstance.delete(`/admin/menus/${id}`);
  return res.data;
};
