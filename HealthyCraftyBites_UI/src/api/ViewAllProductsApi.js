import axiosInstance from "./axiosInstance.js";

export const viewAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/menumanagementservice/menuservice/viewallproducts');
    return response.data; 
  } catch (error) {
    throw error;
  }
};