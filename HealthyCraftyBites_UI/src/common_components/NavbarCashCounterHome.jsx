import "../common_components/css_files/NavbarCashCounterHomeCSS.css"
import logoutButton from "../common_components/images/logout_button.png"
import { Link } from "react-router-dom";

function NavbarCashCounterHome({page_title,page_logo,feature_component,home_route}){
    let component_name = feature_component;
    return(
        <>
            <div className="Navbar py-0">
                <div className="upperPart d-flex align-items-center justify-content-between">
                    <Link to={home_route} style={{ textDecoration: 'none'}}>
                        <div className="p-2 d-flex align-items-center justify-content-start">
                                <div>
                                    <img className="p-2" src={page_logo} id="adminCashCounterLogo"></img>
                                </div>
                                <div>
                                    <h1 className="px-2" id="Page-Heading">{page_title}</h1>
                                </div>
                        </div>
                    </Link>
                    <div>
                        <img className="p-2" src={logoutButton} id="logoutBtn"></img>
                    </div>
                </div>

                <div className="lowerPart px-4 py-1 ">
                    {feature_component}
                </div>
            
            </div>
        </>
    )
}

export default NavbarCashCounterHome