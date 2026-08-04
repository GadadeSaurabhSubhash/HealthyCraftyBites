import axiosInstance from "./AxiosInstance";
export async function logoutAdmin() {
    return await axiosInstance.post(
        "/authenticationservice/adminauthentication/logout", 
        {},
        { withCredentials: true }
    );
}