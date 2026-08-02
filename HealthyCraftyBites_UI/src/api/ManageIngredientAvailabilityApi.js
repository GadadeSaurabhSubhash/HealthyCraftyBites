import axiosInstance from "./AxiosInstance";

export const manageIngredientAvailabilityStatus = async (targetIngredientId,newAvailabilityStatus) => {
  try {
    const response = await axiosInstance.patch('http://localhost:8080/menumanagementservice/menuservice/changeingredientavailabilitystatus',
                                                null,
                                                {
                                                  params: {
                                                      targetIngredientId,
                                                      newAvailabilityStatus
                                                  }
                                                }
                                              );
    return response.data; 
  } catch (error) {
    throw error;
  }
};