import HomeButton from "../../../common_components/HomeButton"
import AdminLoginForm from "../component_authentication_service/AdminLoginForm"
import "../css_authentication_service/AdminLoginCSS.css";
import { Link } from "react-router-dom";

function AdminLogin(){
    return (
        <>
        <div className="AdminLogin">
             <div className="upperBlock p-4 d-flex justify-content-end">
                <div><Link to="/"><HomeButton width="5rem" height="5rem" /></Link></div>
            </div>
        
            <div className="lowerBlock d-flex justify-content-center">
                <div><AdminLoginForm /></div>
            </div>
        </div>
        </>
    )
}

export default AdminLogin
