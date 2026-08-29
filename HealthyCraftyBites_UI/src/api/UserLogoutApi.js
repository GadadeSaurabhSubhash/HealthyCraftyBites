import axiosInstance from "./AxiosInstance";

export async function logoutUser() {
    return await axiosInstance.post(
        "/authenticationservice/userauthentication/logout",
        {},
        { withCredentials: true }
    );
}
