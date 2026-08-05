import axiosInstance from "../AxiosInstance";

export const verifyOtp = async (otpVerificationData) => {
  try {
    const response = await axiosInstance.post('/authenticationservice/userauthentication/verifyotp',otpVerificationData);
    return response.data;
  } 
  catch (error) {
    throw error;
  }
};