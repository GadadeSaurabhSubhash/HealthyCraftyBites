import axiosInstance from "./AxiosInstance";

export const manageProductAvailabilityStatus = async (targetProductId,newAvailabilityStatus) => {
  try {
    const response = await axiosInstance.patch('http://localhost:8080/menumanagementservice/menuservice/changeproductavailabilitystatus',
                                                null,
                                                {
                                                  params: {
                                                      targetProductId,
                                                      newAvailabilityStatus
                                                  }
                                                }
                                              );
    return response.data; 
  } catch (error) {
    throw error;
  }
};