import axiosInstance from "./AxiosInstance";

export const changePassword = async (changeAdminPasswordInputData) => {
  try {
    const response = await axiosInstance.patch('http://localhost:8080/authenticationservice/adminauthentication/changeadminpassword', changeAdminPasswordInputData);
    return response.data; 
  } catch (error) {
    throw error;
  }
};