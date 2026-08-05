import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AdminAuthContext";
import AdminManagerHome from "../layout_pages/admin_manager/AdminManagerHome";

export default function ProtectedRoute() {
    const { accessToken,isLoading } = useAuth();

    if (isLoading) return null;
    if (!accessToken) {
        return <Navigate to="/adminlogin" replace />;
    }

    return <Outlet />;
}