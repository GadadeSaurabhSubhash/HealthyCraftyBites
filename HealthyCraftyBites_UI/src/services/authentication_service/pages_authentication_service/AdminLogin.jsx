import HomeButton from "../../../common_components/HomeButton"
import AdminLoginForm from "../component_authentication_service/AdminLoginForm"
import "../css_authentication_service/AdminLoginCSS.css";

function AdminLogin(){
    return (
        <>
        <div className="AdminLogin">
             <div className="upperBlock p-4 d-flex justify-content-end">
                <div><HomeButton width="5rem" height="5rem" /></div>
            </div>
        
            <div className="lowerBlock d-flex justify-content-center">
                <div><AdminLoginForm /></div>
            </div>
        </div>
        </>
    )
}

export default AdminLogin
