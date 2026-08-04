import { createContext, useContext, useState } from "react";
import { registerAccessTokenGetter } from "../api/AxiosInstance";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    registerAccessTokenGetter(() => accessToken);

    function login(token, userRole) {
        setAccessToken(token);
        setRole(userRole);
        setIsLoading(false);
    }

    function logout() {
        setAccessToken(null);
        setRole(null);
    }

    function finishLoading() {
        setIsLoading(false);
    }

    return (
        <AuthContext.Provider value={{ accessToken, role, login, logout, isLoading, finishLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);