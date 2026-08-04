import { loginAdmin } from "../../../api/AdminLoginApi";
import HCBLogoImg from "../authentication_service_images/healthy_crafty_bites_logo.png"
import "../css_authentication_service/AdminLoginFormCSS.css" 
import { useState } from "react";
import { useAuth } from "../../../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

function AdminLoginForm() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [userNameError, setUserNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");

    // Username Validation
    function validateUserName() {

        let trimmedUserName = userName.trim();

        if (trimmedUserName === "") {
            setUserNameError("Username is required.");
            return false;
        }

        if (trimmedUserName.length < 8) {
            setUserNameError("Username must be at least 8 characters.");
            return false;
        }

        if (!/^[A-Za-z0-9@#]+$/.test(trimmedUserName)) {
            setUserNameError("Username must contain only letters,numbers,'@' and '#'.");
            return false;
        }

        // Clear error
        setUserNameError("");
        return true;
    }

    // Password Validation
    function validatePassword() {

        let trimmedPassword = password.trim();

        if (trimmedPassword === "") {
            setPasswordError("Password is required.");
            return false;
        }

        if (trimmedPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters.");
            return false;
        }

        if (!/^[A-Za-z0-9@#]+$/.test(trimmedPassword)) {
            setPasswordError("Password must contain only letters,numbers,'@' and '#'.");
            return false;
        }

        // Clear error
        setPasswordError("");
        return true;
    }

    // Validate All Fields
    async function validateCredentials() {

        let isUserNameValid = validateUserName();
        let isPasswordValid = validatePassword();

        if (isUserNameValid && isPasswordValid) {

            let credentials = {
            userName:userName,
            password:password
        }
        
        try {
            const response = await loginAdmin(credentials);
            login(response.data.accessToken, response.data.role);
            if(response.data.role==="MANAGER"){
                navigate("/adminmanagerhome");
            }
            else if (response.data.role==="CASHIER")
            {
                navigate("/admincashcounterhome");
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                   setLoginError("Invalid username or password.");
            } else {
                   setLoginError("Something went wrong. Please try again.");
            }
        }

    }
    }

    return (
        <form className="adminLoginForm p-4 border-0 rounded-4  shadow-lg">
            
            <div className="mb-3 d-flex justify-content-center">
                <img src={HCBLogoImg} style={{ width: '7rem', height: '7rem',filter: 'drop-shadow(2px 2px 2px black)' }} ></img>
            </div>
            
            <div className="formHeading mb-3">
                <h1>Admin-Manager Login</h1>
            </div>

            <div className="mb-3">
                <label htmlFor="userName" className="form-label fw-bold">
                Enter Username
                </label>
                <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={validateUserName}
                />
            </div>
            <div className="errorDisplayArea mb-3" id="errorDisplayForUserName">{userNameError}</div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                Enter Password
                </label>
                <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                />
            </div>
            <div className="errorDisplayArea mb-3" id="errorDisplayForPassword">{passwordError}</div>

            <div className="d-flex justify-content-center">
                 <button type="button" id="loginBtn" className="loginButton btn w-50 fw-bold" onClick={validateCredentials}>
                    LOGIN
                </button>
            </div>
            <div className="errorDisplayArea mb-3 py-2 text-center" id="errorDisplayForPassword">{loginError}</div>
        </form>
    );
}

export default AdminLoginForm;