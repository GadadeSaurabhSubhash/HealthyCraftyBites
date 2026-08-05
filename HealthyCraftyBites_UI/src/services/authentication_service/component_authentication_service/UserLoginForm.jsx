function UserLoginForm(){
    return(
        <>
            <div className="login-card">
                              <h2 className="login-title">Good Food. Great Health. One Login Away! </h2>
            
                              <p className="login-subtitle">
                                Sign in to continue your healthy journey.
                              </p>
            
                              <form>
                                <div>
                                  <label className="email-input-label">Enter Email Id:</label>
                                </div>
                                <input type="email" />
            
                                <div>
                                  <label className="password-input-label">
                                    Enter Password:
                                  </label>
                                </div>
                                <input type="password" />
            
                                <button type="submit" className="login-btn-1">
                                  Sign In
                                </button>
            
                                <p className="signup-text">
                                  New User? &nbsp;
                                  <a href="/userregistration" className="signup-link">
                                    Register Here!
                                  </a>
                                </p>
                              </form>
                            </div>
        </>
    )
}

export default UserLoginForm;