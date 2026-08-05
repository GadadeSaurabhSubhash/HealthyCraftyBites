import { useNavigate } from "react-router-dom";

import "../css_authentication_service/UserRegistrationCSS.css";

import UserRegistrationForm from "../component_authentication_service/UserRegistrationForm";

import registrationBackground from "../authentication_service_images/user_registration_bg.png";

import HomeButton from "../../../common_components/HomeButtonUserRegistration";
import Navbar from "../../../layout_pages/layout_pages_components/Navbar";

function UserRegistration() {

    const navigate = useNavigate();

    const handleHomeButtonClick = () => {

        navigate("/");

    };

    return (

        <div
            className="user-registration-page d-flex row "
            style={{
                backgroundImage: `url(${registrationBackground})`
            }}
        >

            <div className="user-registration-top px-3 py-2">

                <Navbar />

            </div>

            <div className="user-registration-bottom py-5">

                <UserRegistrationForm />

            </div>

        </div>

    );

}

export default UserRegistration;