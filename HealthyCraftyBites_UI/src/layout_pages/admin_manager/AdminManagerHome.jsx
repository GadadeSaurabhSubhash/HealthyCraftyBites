import "../layout_pages_css/AdminManagerHomeCSS.css"
import NavbarAdminHome from "../../common_components/NavbarAdminHome"
import page_logo_path from "../layout_pages_images/admin_manager_dashboard_logo.png"
import AdminManagerFeatureBar from "../layout_pages_components/AdminManagerFeatureBar"
import { Outlet } from "react-router-dom"

function AdminManagerHome(){
    return(
        <>
        <div className="AdminManagerHome">
            <div className="px-3 py-2">
                <NavbarAdminHome page_title="Admin Manager Dashboard" page_logo={page_logo_path} feature_component={<AdminManagerFeatureBar />} home_route="/adminmanagerhome" />
            </div>
            <div className="px-4 py-2">
                <Outlet />
            </div>
        </div>
        </>
    )
}

export default AdminManagerHome