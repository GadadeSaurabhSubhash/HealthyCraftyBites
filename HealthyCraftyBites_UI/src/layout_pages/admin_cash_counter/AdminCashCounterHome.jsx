import "../layout_pages_css/AdminManagerHomeCSS.css"
import NavbarAdminHome from "../../common_components/NavbarAdminHome"
import page_logo_path from "../layout_pages_images/admin_cashcounter_dashboard_logo.png.png"
import AdminCashCounterFeatureBar from "../layout_pages_components/AdminCashCounterFeatureBar"
import { Outlet } from "react-router-dom"

function AdminCashCounterHome(){
    return(
        <>
        <div className="AdminCashCounterHome">
            <div className="px-3 py-2">
                <NavbarAdminHome page_title="Admin Cash Counter Dashboard" page_logo={page_logo_path} feature_component={<AdminCashCounterFeatureBar />} home_route="/admincashcounterhome" />
            </div>
            <div className="px-4 py-2">
                <Outlet />
            </div>
        </div>
        </>
    )
}

export default AdminCashCounterHome