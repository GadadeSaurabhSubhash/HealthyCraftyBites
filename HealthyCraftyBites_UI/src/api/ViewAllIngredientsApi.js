import axiosInstance from "./AxiosInstance";

export const viewAllIngredients = async () => {
  try {
    const response = await axiosInstance.get('/menumanagementservice/menuservice/viewallingredients');
    return response.data; 
  } catch (error) {
    throw error;
  }
};