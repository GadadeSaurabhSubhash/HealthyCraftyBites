import axiosInstance from "./axiosInstance.js";

export const addIngredient = async (ingredient_to_add) => {
  try {
    const response = await axiosInstance.post('/menumanagementservice/menuservice/addnewingredient', ingredient_to_add);
    return response.data; 
  } catch (error) {
    throw error;
  }
};