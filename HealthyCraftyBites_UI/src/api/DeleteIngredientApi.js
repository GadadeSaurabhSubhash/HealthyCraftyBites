import axiosInstance from "./AxiosInstance";

export const deleteIngredient = async (targetingredientId) => {
  try {
    const response = await axiosInstance.delete('http://localhost:8080/menumanagementservice/menuservice/deleteingredient',
                                                {
                                                  params: {
                                                      targetIngredientId
                                                  }
                                                }
                                              );
    return response.data; 
  } catch (error) {
    throw error;
  }
};