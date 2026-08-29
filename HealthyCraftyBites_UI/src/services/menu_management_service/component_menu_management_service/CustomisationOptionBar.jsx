import { useNavigate } from "react-router-dom";
import "../css_menu_management_service/CustomisationOptionBarCSS.css";
import customisationThemeImg from "../images_menu_management_service/customsationbarimg.png";

function CustomisationOptionBar() {
    const navigate = useNavigate();
    return (
        <div className="customisationOptionBar d-flex align-items-center w-50 mx-auto">
            <div className="leftSection">
                <img
                    className="custImage"
                    src={customisationThemeImg}
                    alt="Option"
                />
            </div>

            <div className="rightSection">
                <div className="optionHeading">
                    <h4>Craft Your Perfect Meal</h4>
                </div>

                <div className="optionContent">
                    <p>Choose fresh ingredients, customize every layer, and enjoy Salads, <br></br>Sandwiches, Rolls made just the way you like it.</p>
                    <button className="navigationBtn btn btn-warning p-2" onClick={() => navigate("/customiseproduct")} >CLICK HERE</button>
                </div>
            </div>
        </div>
    );
}

export default CustomisationOptionBar;