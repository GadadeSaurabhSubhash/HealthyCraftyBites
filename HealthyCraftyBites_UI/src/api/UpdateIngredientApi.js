import axiosInstance from "./AxiosInstance";

export const updateIngredient = async (ingredient_to_update) => {
  try {
    const response = await axiosInstance.put('/menumanagementservice/menuservice/updateingredient', ingredient_to_update);
    return response.data; 
  } catch (error) {
    throw error;
  }
};