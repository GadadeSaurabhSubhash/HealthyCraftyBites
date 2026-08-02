import ChangeAdminPasswordForm from "../component_authentication_service/ChangeAdminPasswordForm"
import "../css_authentication_service/ChangeAdminPasswordCSS.css"

function ChangeAdminPassword(){
    return(
        <>
            <div className="ChangeAdminPassword p-2">
                <ChangeAdminPasswordForm />
            </div>
        </>
    )
}
export default ChangeAdminPassword;