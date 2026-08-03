import { changePassword } from "../../../api/ChangeAdminPasswordApi";
import { useState } from "react";
import "../css_authentication_service/ChangeAdminPasswordFormCSS.css"

function ChangeAdminPasswordForm(){
    const [userName, setUserName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    const [userNameError, setUserNameError] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");

    // ----- Toast Message State -----
    const [toastResponseMessage, setToastResponseMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

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

    // Current Password Validation
    function validateCurrentPassword() {

        let trimmedCurrentPassword = currentPassword.trim();

        if (trimmedCurrentPassword === "") {
            setCurrentPasswordError("Current Password is required.");
            return false;
        }

        if (trimmedCurrentPassword.length < 8) {
            setCurrentPasswordError("Current Password must be at least 8 characters.");
            return false;
        }

        if (!/^[A-Za-z0-9@#]+$/.test(trimmedCurrentPassword)) {
            setCurrentPasswordError("Current Password must contain only letters,numbers,'@' and '#'.");
            return false;
        }

        // Clear error
        setCurrentPasswordError("");
        return true;
    }

    // New Password Validation
    function validateNewPassword() {

        let trimmedNewPassword = newPassword.trim();

        if (trimmedNewPassword === "") {
            setNewPasswordError("New Password is required.");
            return false;
        }

        if(trimmedNewPassword === currentPassword){
            setNewPasswordError("Password entered matches current password. Please set New Password!");
            return false;
        }

        if (trimmedNewPassword.length < 8) {
            setNewPasswordError("New Password must be at least 8 characters.");
            return false;
        }

        if (!/^[A-Za-z0-9@#]+$/.test(trimmedNewPassword)) {
            setNewPasswordError("New Password must contain only letters,numbers,'@' and '#'.");
            return false;
        }

        // Clear error
        setNewPasswordError("");
        return true;
    }

    // Validate All Fields
        async function validateCredentials() {
    
            let isUserNameValid = validateUserName();
            let isCurrentPasswordValid = validateCurrentPassword();
            let isNewPasswordValid = validateNewPassword();


            if (isUserNameValid && isCurrentPasswordValid && isNewPasswordValid) {
                let changeAdminPasswordInputData = {
                    userName : userName,
                    currentPassword : currentPassword,
                    newPassword : newPassword
                }
            
                        try 
                        {
                            const response = await changePassword(changeAdminPasswordInputData);
                            setToastResponseMessage(response.message)
                            setShowToast(true);
                            {
                                setTimeout(() => {
                                    setShowToast(false);
                                }, 10000)
                            }
                        } 
                        catch (error) 
                        {
                            if (error.response) 
                            {
                                // Server responded with a status outside 2xx (e.g. 400, 500)
                                setToastResponseMessage(error.response.message);
                                setShowToast(true);
                                {
                                    setTimeout(() => {
                                        setShowToast(false);
                                    }, 10000)
                                }
                            } 
                            else if (error.request) 
                            {
                                // Request was sent but no response received (network/CORS/server down)
                                setToastResponseMessage(error.message);
                                setShowToast(true);
                                {
                                   setTimeout(() => {
                                   setShowToast(false);
                                   }, 10000)
                                }
                            } 
                            else 
                            {
                                // Something went wrong setting up the request
                                setToastResponseMessage("Cannot Complete Your Request!");
                                setShowToast(true);
                                {
                                   setTimeout(() => {
                                   setShowToast(false);
                                   }, 10000)
                                }
                            }
                        }
                    }
    
        }





    return(
        <>
            {showToast && (
                <div className="toastBox">

                    <span>
                        {toastResponseMessage}
                    </span>

                    <button 
                        className='btn btn-danger'
                        onClick={() => setShowToast(false)}
                    >
                        X
                    </button>    
                </div>
            )}

            <div className="ChangeAdminPasswordForm">
                <form className='p-4'>
                    <div className='formHeading mb-3'>
                        <h3>Please Enter Valid Credentails & Set your new Password!</h3>
                    </div>

                    <div className="col-md-6">
                            <label htmlFor="userName" className="form-label">Enter User Name :</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                name="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                onBlur={validateUserName}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForUserName">{userNameError}</div>
                    </div>

                    <div className="col-md-6">
                            <label htmlFor="currentPassword" className="form-label">Enter Current Password :</label>
                            <input
                                type="password"
                                placeholder="* * * * * * * *"
                                className="form-control"
                                id="currentPassword"
                                name="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                onBlur={validateCurrentPassword}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForCurrentPassword">{currentPasswordError}</div>
                    </div>
                    <hr></hr>
                    <div className="SetNewPasswordBox p-4">
                            <div className="PasswordSettingRules">
                                <div>
                                    <p>Username must be at least 8 characters.</p>
                                    <p>Username can contain only letters(A-Z), numbers(0-9) and Symobls ('@' and '#')</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="newPassword" className="NewPasswordLabel form-label">Set New Password :</label>
                                <input
                                    type="password"
                                    placeholder="* * * * * * * *"
                                    className="form-control"
                                    id="newPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    onBlur={validateNewPassword}
                                />
                                <div className="px-1 py-2" id="errorDisplayForNewPassword">{newPasswordError}</div>
                            </div>
                    </div>

                    <div className="py-4 px-2 d-flex justify-content-end">
                            <button type="button"  className="btn btn-danger w-25" onClick={validateCredentials}>
                                CHANGE PASSWORD
                            </button>
                    </div>
                    
                </form>
            </div>
        </>
    )
}
export default ChangeAdminPasswordForm;