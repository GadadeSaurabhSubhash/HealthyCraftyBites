import axiosInstance from "../AxiosInstance";

export const checkEmailAvailability = async (emailid) => {
  try {
    const response = await axiosInstance.get(
      '/authenticationservice/userauthentication/checkifemailexists',
      {
        params: {
          emailId: emailid, 
        },
      }
    );
    return response.data;
  } 
  catch (error) {
    throw error;
  }
};