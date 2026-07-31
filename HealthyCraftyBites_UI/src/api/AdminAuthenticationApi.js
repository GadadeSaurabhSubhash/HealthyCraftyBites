import axiosInstance from "./AxiosInstance";

export const loginAdmin = async (credentials) => {
  try {
    const response = await axiosInstance.post('/authenticationservice/adminauth/authadmincredentials', credentials);
    return response.data; 
  } catch (error) {
    // we'll refine this error handling shortly, for now just rethrow
    throw error;
  }
};