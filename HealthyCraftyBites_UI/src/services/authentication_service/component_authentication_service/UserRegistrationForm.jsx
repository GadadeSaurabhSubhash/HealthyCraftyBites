import { useState } from "react";
import "../css_authentication_service/UserRegistrationFormCSS.css";
import healthyCraftyBitesLogo from "../authentication_service_images/healthy_crafty_bites_logo.png";
import { checkEmailAvailability } from "../../../api/User/CheckIfEmailExists";
import { verifyOtp } from "../../../api/User/VerifyOtp";
import { registerUser } from "../../../api/User/RegisterUser";
import { useNavigate } from "react-router-dom";
// Import your OTP API helper when ready, e.g.:
// import { verifyOtpApi } from "../../../api/User/VerifyOtp";

function UserRegistrationForm() {

  const navigate = useNavigate();
  /*==================================
    Individual Field States
    ==================================*/

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpOption, setShowOtpOption] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // ----- Toast Message State -----
      const [toastResponseMessage, setToastResponseMessage] = useState("");
      const [showToast, setShowToast] = useState(false);

  /*==================================
    Individual Error States
    ==================================*/

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");

  /*==================================
    Regular Expressions
    ==================================*/

  const usernamePasswordRegex = /^[A-Za-z0-9@#]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fullNameRegex = /^[A-Za-z ]+$/;
  const mobileNumberRegex = /^[0-9]{10}$/;
  const otpRegex = /^[0-9]{6}$/;

  /*==================================
    Validation Functions
    ==================================*/

  const validateEmail = () => {
    const trimmedEmail = email.trim();
    if (trimmedEmail === "") {
      const err = "Email Address is required.";
      setEmailError(err);
      return err;
    }
    if (!emailRegex.test(trimmedEmail)) {
      const err = "Please enter a valid email address.";
      setEmailError(err);
      return err;
    }
    setEmailError("");
    return "";
  };

  const validateFullName = () => {
    const trimmedFullName = fullName.trim();
    if (trimmedFullName === "") {
      const err = "Full Name is required.";
      setFullNameError(err);
      return err;
    }
    if (!fullNameRegex.test(trimmedFullName)) {
      const err = "Full Name can contain only letters and spaces.";
      setFullNameError(err);
      return err;
    }
    setFullNameError("");
    return "";
  };

  const validateMobileNumber = () => {
    const trimmedMobileNumber = mobileNumber.trim();
    if (trimmedMobileNumber === "") {
      const err = "Mobile Number is required.";
      setMobileNumberError(err);
      return err;
    }
    if (!mobileNumberRegex.test(trimmedMobileNumber)) {
      const err = "Mobile Number must contain exactly 10 digits.";
      setMobileNumberError(err);
      return err;
    }
    setMobileNumberError("");
    return "";
  };

  const validatePassword = () => {
    if (password === "") {
      const err = "Password is required.";
      setPasswordError(err);
      return err;
    }
    if (password.length < 8) {
      const err = "Password must be at least 8 characters long.";
      setPasswordError(err);
      return err;
    }
    if (!usernamePasswordRegex.test(password)) {
      const err = "Password can only contain letters, numbers, @ and #.";
      setPasswordError(err);
      return err;
    }
    setPasswordError("");
    return "";
  };

  /*==================================
    Validate OTP Function
    ==================================*/

  const validateOtp = () => {
    const trimmedOtp = otp.trim();

    if (trimmedOtp === "") {
      const err = "OTP cannot be blank. Please enter the OTP.";
      setOtpError(err);
      return err;
    }

    if (!/^\d+$/.test(trimmedOtp)) {
      const err = "OTP must contain only numbers.";
      setOtpError(err);
      return err;
    }

    if (trimmedOtp.length !== 6) {
      const err = "OTP must be exactly 6 digits long.";
      setOtpError(err);
      return err;
    }

    setOtpError("");
    return "";
  };

  /*==================================
    Validate Registration Form
    ==================================*/

  const validateRegistrationForm = () => {
    const emailErr = validateEmail();
    const fullNameErr = validateFullName();
    const mobileNumberErr = validateMobileNumber();
    const passwordErr = validatePassword();

    if (!isOtpVerified) {
      setOtpError("Please verify your OTP before registering.");
      return false;
    }

    return !emailErr && !fullNameErr && !mobileNumberErr && !passwordErr;
  };

  /*==================================
    API Calls
    ==================================*/

  /* Check Email Availability */
  const handleCheckEmail = async () => {
    const error = validateEmail();
    if (error) return;

    try {
      const response = await checkEmailAvailability(email);
      if (response.data) {
        setShowOtpOption(false);
        setEmailError("Email Already Exists. Please Use New Email!");
      } else {
        setShowOtpOption(true);
        setOtpError("OTP sent to your Email. Please Enter the OTP Here!");
      }
    } catch (error) {
      setShowOtpOption(false);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to verify email. Please try again later.";

      setEmailError(errorMessage);
    }
  };

  /* Handle OTP Verification */
  const handleOTPVerification = async () => {
    const error = validateOtp();
    if (error) return;

    try {
      /*==================================
        Backend Integration
        ==================================*/
      const otpVerificationData = {
        otp : otp,
        emailId : email
      }

      const response = await verifyOtp(otpVerificationData);
      setIsOtpVerified(true);
      setOtpSuccess(response.data.message);
    } catch (error) {
      setIsOtpVerified(false);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid OTP. Please try again.";

      setOtpError(errorMessage);
    }
  };

  /* Register User */
  const handleRegisterButtonClick = async (event) => {
    event.preventDefault();

    if (!validateRegistrationForm()) {
      return;
    }

    const userRegistrationData = {
      fullName : fullName,
      emailId : email,
      mobileNumber : mobileNumber,
      password : password,
    };

    try {
      /*==================================
        Backend Integration
        ==================================*/

      const response = await registerUser(userRegistrationData);
      setToastResponseMessage(response.message);
      setShowToast(true);
      setTimeout(() => {
          navigate("/");
      }, 3000);
      
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        setToastResponseMessage("Registration Failed. Please Try Again!");
        setShowToast(true);
    }
  };

  return (<>
  
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
            )
          }
      <div className="registration-form-container">
      <div className="registration-form-card">
        {/* Logo */}
        <img
          src={healthyCraftyBitesLogo}
          alt="Healthy Crafty Bites"
          className="registration-form-logo"
        />

        {/* Heading */}
        <h1 className="registration-form-title">Healthy eating starts here.</h1>
        <p className="registration-form-subtitle">
          Sign up and customize your bites.
        </p>

        {/* Email */}
        <div className="registration-form-group">
          <label className="registration-form-label">
            Email Address
            <span className="registration-required">*</span>
          </label>

          <div className="registration-email-container w-100 d-flex align-items-center gap-2">
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className="registration-form-input flex-grow-1"
            />

            <button
              type="button"
              className="btn btn-success px-4 py-2 text-nowrap"
              onClick={handleCheckEmail}
              disabled={isOtpVerified}
            >
              Check
            </button>
          </div>

          {emailError && (
            <p className="registration-error">{emailError}</p>
          )}
        </div>

        {/* OTP Field */}
        {showOtpOption && (
          <div className="w-75 mb-2">
            <div className="registration-email-container d-flex align-items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                name="otp"
                maxLength={6}
                placeholder="Enter Valid 6 Digit OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setOtpError("");
                }}
                className="registration-form-input flex-grow-1"
                disabled={isOtpVerified}
              />

              <button
                type="button"
                className={`btn ${isOtpVerified ? "btn-secondary" : "btn-primary"} px-4 py-2 text-nowrap`}
                onClick={handleOTPVerification}
                disabled={isOtpVerified}
              >
                {isOtpVerified ? "Verified" : "Verify OTP"}
              </button>
            </div>

            {otpError && (
              <p className="registration-error mt-1 text-danger small">
                {otpError}
              </p>
            )}

            {otpSuccess && (
              <p className="registration-error mt-1 text-success small">
                {otpSuccess}
              </p>
            )}
          </div>
        )}

        {/* Full Name */}
        <div className="registration-form-group">
          <label className="registration-form-label">
            Enter Full Name
            <span className="registration-required">*</span>
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setFullNameError("");
            }}
            className="registration-form-input"
          />

          {fullNameError && (
            <p className="registration-error">{fullNameError}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="registration-form-group">
          <label className="registration-form-label">
            Enter Mobile Number
            <span className="registration-required">*</span>
          </label>

          <input
            type="tel"
            name="mobileNumber"
            placeholder="Enter Mobile Number"
            maxLength={10}
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
              setMobileNumberError("");
            }}
            className="registration-form-input"
          />

          {mobileNumberError && (
            <p className="registration-error">{mobileNumberError}</p>
          )}
        </div>

        {/* Password */}
        <div className="registration-form-group">
          <label className="registration-form-label">
            Set Password
            <span className="registration-required">*</span>
          </label>

          <div className="registration-password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className="registration-form-input"
            />
          </div>

          {passwordError && (
            <p className="registration-error">{passwordError}</p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="button"
          className="registration-register-button"
          onClick={handleRegisterButtonClick}
        >
          REGISTER
        </button>
      </div>
    </div>
    </>
  );
}

export default UserRegistrationForm;