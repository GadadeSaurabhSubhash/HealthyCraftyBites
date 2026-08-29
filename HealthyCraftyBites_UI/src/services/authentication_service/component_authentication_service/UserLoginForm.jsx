import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/AxiosInstance';
import { useAuth } from '../../../context/AdminAuthContext';

function UserLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const cleanEmail = email.trim();
      const cleanPassword = password.trim();

      const response = await axiosInstance.post('/authenticationservice/userauthentication/authenticateusercredentials', {
        emailId: cleanEmail,
        password: cleanPassword
      });

      if (response.data && response.data.data) {
        const { accessToken, role, username } = response.data.data;
        const loggedInUsername = username || cleanEmail.split('@')[0];

        // Store JWT token and session keys
        login(accessToken, role || 'CUSTOMER');
        localStorage.setItem('hcb_jwt_token', accessToken);
        localStorage.setItem('hcb_token', accessToken);
        localStorage.setItem('hcb_user', loggedInUsername);
        localStorage.setItem('hcb_role', role || 'CUSTOMER');

        // Immediately notify Navbar to display profile dropdown
        window.dispatchEvent(new Event('storage'));

        alert(`User Login Successful! Welcome ${loggedInUsername}`);
        navigate('/viewmenu');
      } else {
        setLoginError('Invalid Email/Username or Password!');
      }
    } catch (err) {
      console.error("Login Error:", err);
      const serverMessage = err.response?.data?.message || err.response?.data;
      setLoginError(typeof serverMessage === 'string' ? serverMessage : 'Invalid Email/Username or Password! Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card p-4 rounded-4 shadow bg-white">
      <h2 className="login-title text-success fw-bold fs-4">Good Food. Great Health. One Login Away! </h2>

      <p className="login-subtitle text-muted small mb-3">
        Sign in to continue your healthy journey.
      </p>

      <form onSubmit={handleUserLogin}>
        <div className="mb-2">
          <label className="email-input-label fw-semibold">Enter Email Id / Full Name / Mobile:</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email or Registered Mobile"
            required
          />
        </div>

        <div className="mb-3">
          <label className="password-input-label fw-semibold">Enter Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>

        {loginError && <div className="alert alert-danger p-2 small mb-3">{loginError}</div>}

        <button type="submit" className="btn btn-success fw-bold w-100 py-2 mb-3" disabled={loading}>
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>

        <p className="signup-text text-center small mb-0">
          New User? &nbsp;
          <a href="/userregistration" className="signup-link text-success fw-bold">
            Register Here!
          </a>
        </p>
      </form>
    </div>
  );
}

export default UserLoginForm;