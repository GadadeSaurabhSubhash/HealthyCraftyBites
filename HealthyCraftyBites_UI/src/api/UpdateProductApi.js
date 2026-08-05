import axiosInstance from "./AxiosInstance";

export const updateProduct = async (product_to_update) => {
  try {
    const response = await axiosInstance.put('/menumanagementservice/menuservice/updateproduct', product_to_update);
    return response.data; 
  } catch (error) {
    throw error;
  }
};