import { useState } from "react";

import "../css_authentication_service/UserRegistrationFormCSS.css";

import healthyCraftyBitesLogo from "../authentication_service_images/healthy_crafty_bites_logo.png";

function UserRegistrationForm() {
  /*==================================
    State
    ==================================*/

  const [userRegistrationData, setUserRegistrationData] = useState({
    username: "",

    email: "",

    fullName: "",

    mobileNumber: "",

    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",

    email: "",

    fullName: "",

    mobileNumber: "",

    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  /*==================================
    Regular Expressions
    ==================================*/

  const usernamePasswordRegex = /^[A-Za-z0-9@#]+$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fullNameRegex = /^[A-Za-z ]+$/;

  const mobileNumberRegex = /^[0-9]{10}$/;

  /*==================================
    Handle Input Change
    ==================================*/

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserRegistrationData((previousData) => ({
      ...previousData,

      [name]: value,
    }));

    setValidationErrors((previousErrors) => ({
      ...previousErrors,

      [name]: "",
    }));
  };

  /*==================================
    Username Validation
    ==================================*/

  const validateUsername = () => {
    const username = userRegistrationData.username.trim();

    if (username === "") {
      return "Username is required.";
    }

    if (username.length < 8) {
      return "Username must be at least 8 characters long.";
    }

    if (!usernamePasswordRegex.test(username)) {
      return "Username can only contain letters, numbers, @ and #.";
    }

    return "";
  };

  /*==================================
    Email Validation
    ==================================*/

  const validateEmail = () => {
    const email = userRegistrationData.email.trim();

    if (email === "") {
      return "Email is required.";
    }

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  /*==================================
    Full Name Validation
    ==================================*/

  const validateFullName = () => {
    const fullName = userRegistrationData.fullName.trim();

    if (fullName === "") {
      return "Full Name is required.";
    }

    if (!fullNameRegex.test(fullName)) {
      return "Full Name can contain only letters and spaces.";
    }

    return "";
  };

  /*==================================
    Mobile Number Validation
    ==================================*/

  const validateMobileNumber = () => {
    const mobileNumber = userRegistrationData.mobileNumber.trim();

    if (mobileNumber === "") {
      return "Mobile Number is required.";
    }

    if (!mobileNumberRegex.test(mobileNumber)) {
      return "Mobile Number must contain exactly 10 digits.";
    }

    return "";
  };

  /*==================================
    Password Validation
    ==================================*/

  const validatePassword = () => {
    const password = userRegistrationData.password;

    if (password === "") {
      return "Password is required.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (!usernamePasswordRegex.test(password)) {
      return "Password can only contain letters, numbers, @ and #.";
    }

    return "";
  };

  /*==================================
    Validate Registration Form
    ==================================*/

  const validateRegistrationForm = () => {
    const errors = {
      username: validateUsername(),

      email: validateEmail(),

      fullName: validateFullName(),

      mobileNumber: validateMobileNumber(),

      password: validatePassword(),
    };

    setValidationErrors(errors);

    return Object.values(errors).every((errorMessage) => errorMessage === "");
  };

  /*==================================
    Register User
    ==================================*/

  const handleRegisterButtonClick = async (event) => {
    event.preventDefault();

    if (!validateRegistrationForm()) {
      return;
    }

    /*
            ==================================

            Backend Integration

            UserRegistrationApi.registerUser(

                userRegistrationData

            );

            ==================================
        */

    console.log(userRegistrationData);
  };
  return (
    <div className="registration-form-container">
      <div className="registration-form-card">
        {/*==================================
                Logo
                ==================================*/}

        <img
          src={healthyCraftyBitesLogo}
          alt="Healthy Crafty Bites"
          className="registration-form-logo"
        />

        {/*==================================
                Heading
                ==================================*/}

        <h1 className="registration-form-title">Healthy eating starts here.</h1>

        <p className="registration-form-subtitle">
          Sign up and customize your bites.
        </p>

        {/*==================================
                Username
                ==================================*/}

        <div className="registration-form-group">
          <label className="registration-form-label">
            Set Username
            <span className="registration-required">*</span>
          </label>

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={userRegistrationData.username}
            onChange={handleInputChange}
            className="registration-form-input"
          />

          {validationErrors.username && (
            <p className="registration-error">{validationErrors.username}</p>
          )}
        </div>

        {/*==================================
                Email
                ==================================*/}

        <div className="registration-form-group">
          <label className="registration-form-label">
            Email Address
            <span className="registration-required">*</span>
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={userRegistrationData.email}
            onChange={handleInputChange}
            className="registration-form-input"
          />

          {validationErrors.email && (
            <p className="registration-error">{validationErrors.email}</p>
          )}
        </div>

        {/*==================================
                Full Name
                ==================================*/}

        <div className="registration-form-group">
          <label className="registration-form-label">
            Enter Full Name
            <span className="registration-required">*</span>
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={userRegistrationData.fullName}
            onChange={handleInputChange}
            className="registration-form-input"
          />

          {validationErrors.fullName && (
            <p className="registration-error">{validationErrors.fullName}</p>
          )}
        </div>

        {/*==================================
                Mobile Number
                ==================================*/}

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
            value={userRegistrationData.mobileNumber}
            onChange={handleInputChange}
            className="registration-form-input"
          />

          {validationErrors.mobileNumber && (
            <p className="registration-error">
              {validationErrors.mobileNumber}
            </p>
          )}
        </div>

        {/*==================================
                Password
                ==================================*/}

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
              value={userRegistrationData.password}
              onChange={handleInputChange}
              className="registration-form-input"
            />

            <button
              type="button"
              className="registration-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={
                  showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"
                }
              ></i>
            </button>
          </div>

          {validationErrors.password && (
            <p className="registration-error">{validationErrors.password}</p>
          )}
        </div>

        {/*==================================
                Mandatory Fields Note
                ==================================*/}

        <p className="registration-form-note">
          All fields marked with
          <span className="registration-required"> *</span>
          are mandatory.
        </p>

        {/*==================================
                Register Button
                ==================================*/}

        <button
          type="button"
          className="registration-register-button"
          onClick={handleRegisterButtonClick}
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}

export default UserRegistrationForm;
