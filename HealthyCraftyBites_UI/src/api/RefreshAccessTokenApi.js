import axiosInstance from "./AxiosInstance";

export async function refreshToken() {
    return await axiosInstance.post(
        "/authenticationservice/adminauthentication/refreshtoken", // 
        {},
        { withCredentials: true } // sends the HttpOnly cookie
    );
}