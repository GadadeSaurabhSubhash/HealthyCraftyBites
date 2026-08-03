import "../common_components/css_files/NavbarAdminHomeCSS.css"
import logoutButton from "../common_components/images/logout_button.png"
import { Link, useNavigate } from "react-router-dom";

function NavbarCashCounterHome({page_title,page_logo,buttonText,home_route,button_route}){
    let button_name = buttonText;
    const navigate = useNavigate();
    return(
        <>
            <div className="Navbar py-0">
                <div className="upperPart d-flex align-items-center justify-content-between">
                    <Link to={home_route} style={{ textDecoration: 'none'}}>
                        <div className="p-2 d-flex align-items-center justify-content-start">
                                <div>
                                    <img className="p-2" src={page_logo} id="adminManagerLogo"></img>
                                </div>
                                <div>
                                    <h1 className="px-2" id="Page-Heading">{page_title}</h1>
                                </div>
                        </div>
                    </Link>
                    <div className="ms-auto me-3">
                        <button className="btn btn-primary" id="view-orders-btn" onClick={() => {
                            navigate(`/${button_route}`);
                        }}>
                            {button_name}
                        </button>
                    </div>
                    <div>
                        <img className="p-2" src={logoutButton} id="logoutBtn"></img>
                    </div>
                </div>

                {/* <div className="lowerPart px-4 py-1 ">
                    {feature_component}
                </div> */}
            
            </div>
        </>
    )
}

export default NavbarCashCounterHome;