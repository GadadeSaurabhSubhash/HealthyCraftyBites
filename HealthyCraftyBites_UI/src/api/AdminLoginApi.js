import axiosInstance from "./AxiosInstance";

export const loginAdmin = async (credentials) => {
  try {
    const response = await axiosInstance.post('/authenticationservice/adminauthentication/authenticateadmincredentials', credentials);
    return response.data; 
  } catch (error) {
    throw error;
  }
};