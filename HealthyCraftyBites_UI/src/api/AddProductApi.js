import axiosInstance from "./AxiosInstance";

export const addProduct = async (product_to_add) => {
  try {
    const response = await axiosInstance.post('/menumanagementservice/menuservice/addnewproduct', product_to_add);
    return response.data; 
  } catch (error) {
    throw error;
  }
};