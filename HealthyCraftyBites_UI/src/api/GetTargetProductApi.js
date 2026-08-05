import axiosInstance from "./AxiosInstance";

export const getProduct = async (targetProductName) => {
  try {
    const response = await axiosInstance.get('/menumanagementservice/menuservice/getproduct',
      {
        params:{
          targetProductName
        }
      }
    );
    return response.data; 
  } catch (error) {
    throw error;
  }
};