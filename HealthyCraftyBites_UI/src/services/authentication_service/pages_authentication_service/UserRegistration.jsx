import { useNavigate } from "react-router-dom";

import "../css_authentication_service/UserRegistrationCSS.css";

import UserRegistrationForm from "../component_authentication_service/UserRegistrationForm";

import registrationBackground from "../authentication_service_images/user_registration_bg.png";

import HomeButton from "../../../common_components/HomeButtonUserRegistration";

function UserRegistration() {

    const navigate = useNavigate();

    const handleHomeButtonClick = () => {

        navigate("/");

    };

    return (

        <div
            className="user-registration-page"
            style={{
                backgroundImage: `url(${registrationBackground})`
            }}
        >

            <div className="user-registration-top">

                <HomeButton
                    width="5rem"
                    height="5rem"
                    onClick={handleHomeButtonClick}
                />

            </div>

            <div className="user-registration-bottom">

                <UserRegistrationForm />

            </div>

        </div>

    );

}

export default UserRegistration;