import axiosInstance from "../AxiosInstance";

export const registerUser = async (userRegistrationData) => {
  try {
    const response = await axiosInstance.post('/authenticationservice/userauthentication/userregistration',userRegistrationData);
    return response.data;
  } 
  catch (error) {
    throw error;
  }
};