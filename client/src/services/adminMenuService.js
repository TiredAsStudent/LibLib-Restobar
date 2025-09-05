import axiosInstance from "../utils/axiosInstance.js";
import { buildQuery } from "../utils/buildQuery.js";

//Fetch a list of menus
export const listMenus = async (params = {}) => {
  const query = buildQuery(params);
  const res = await axiosInstance.get(`/admin/menu${query}`);
  return res.data;
};

//Create a new menu item
export const createMenu = async (formData) => {
  const res = await axiosInstance.post(`/admin/menu`, formData);
  return res.data;
};

//Update an existing menu item
export const updateMenu = async (id, formData) => {
  const res = await axiosInstance.put(`/admin/menu/${id}`, formData);
  return res.data;
};

//Delete a menu item
export const deleteMenu = async (id) => {
  const res = await axiosInstance.delete(`/admin/menu/${id}`);
  return res.data;
};
