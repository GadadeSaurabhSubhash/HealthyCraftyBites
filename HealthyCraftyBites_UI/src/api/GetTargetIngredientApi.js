import axiosInstance from "./AxiosInstance";

export const getIngredient = async (targetIngredientName) => {
  try {
    const response = await axiosInstance.get('/menumanagementservice/menuservice/getingredient',
      {
        params:{
          targetIngredientName
        }
      }
    );
    return response.data; 
  } catch (error) {
    throw error;
  }
};