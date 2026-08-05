import { useNavigate } from "react-router-dom";
import logo from "../../services/authentication_service/authentication_service_images/healthy_crafty_bites_logo.png";
function Navbar(){
    const navigate = useNavigate();  
    return(
        <>
            <nav className="navbar navbar-expand-lg home-navbar rounded">
                      <div className="container-fluid">
                        <div className="d-flex align-items-center">
                          <img
                            src={logo}
                            alt="HealthyCraftyBites Logo"
                            className="logo me-3"
                            onClick={() => navigate("/")}
                          />
                          <div>
                            <h2 className="website-name">HealthyCraftyBites</h2>
                            <p className="website-slogan">Eat Healthy, Customize Freely!</p>
                          </div>
                        </div>
            
                        <div>
                          <i className="bi bi-person-circle user-icon"></i>
                        </div>
                      </div>
                    </nav>
        </>
    )
}

export default Navbar;