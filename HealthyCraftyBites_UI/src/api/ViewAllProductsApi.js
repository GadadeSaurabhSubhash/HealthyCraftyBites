import axiosInstance from "./AxiosInstance";

export const viewAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/menumanagementservice/menuservice/viewallproducts');
    return response.data; 
  } catch (error) {
    throw error;
  }
};