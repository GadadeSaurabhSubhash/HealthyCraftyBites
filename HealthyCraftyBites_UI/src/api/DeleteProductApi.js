import axiosInstance from "./axiosInstance.js";

export const deleteProduct = async (targetProductId) => {
  try {
    const response = await axiosInstance.delete('http://localhost:8080/menumanagementservice/menuservice/deleteproduct',
                                                {
                                                  params: {
                                                      targetProductId
                                                  }
                                                }
                                              );
    return response.data; 
  } catch (error) {
    throw error;
  }
};