import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/UserLogoutApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState(localStorage.getItem('hcb_user'));

  useEffect(() => {
    const updateNavbarState = () => {
      const cart = JSON.parse(localStorage.getItem('hcb_cart') || '[]');
      setCartCount(cart.length);
      setUsername(localStorage.getItem('hcb_user'));
    };
    updateNavbarState();
    window.addEventListener('storage', updateNavbarState);
    return () => window.removeEventListener('storage', updateNavbarState);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {}
    localStorage.removeItem('hcb_user');
    localStorage.removeItem('hcb_token');
    localStorage.removeItem('hcb_role');
    setUsername(null);
    navigate('/');
  };

  const isLoggedIn = !!username;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          🥗 HealthyCraftyBites
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">
            <li className="nav-item">
              <Link className="nav-link" to="/viewmenu">📋 Menu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-warning fw-bold" to="/customiseproduct">✨ Craft Custom Meal</Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/favorites">⭐ Favorites</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">📦 My Orders</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">ℹ️ About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactus">📞 Contact Us</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to="/cart" className="btn btn-outline-light position-relative">
              🛒 Cart
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark fw-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown displayed ONLY when user is logged in */}
            {isLoggedIn && (
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle fw-bold text-success" type="button" data-bs-toggle="dropdown">
                  👤 {username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li><Link className="dropdown-item fw-semibold" to="/orders">📦 View Order History</Link></li>
                  <li><Link className="dropdown-item fw-semibold" to="/favorites">⭐ View Favourites</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger fw-semibold" onClick={handleLogout}>🚪 Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
