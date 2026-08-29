import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../services/authentication_service/authentication_service_images/healthy_crafty_bites_logo.png";

function Navbar() {
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

  return (
    <nav className="navbar navbar-expand-lg home-navbar rounded">
      <div className="container-fluid">
        <div className="d-flex align-items-center" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img
            src={logo}
            alt="HealthyCraftyBites Logo"
            className="logo me-3"
          />
          <div>
            <h2 className="website-name">HealthyCraftyBites</h2>
            <p className="website-slogan">Eat Healthy, Customize Freely!</p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <Link to="/cart" className="btn btn-outline-light position-relative fw-semibold shadow-sm px-3 py-2">
            🛒 Cart
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark fw-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {username ? (
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle fw-bold text-success"
                type="button"
                data-bs-toggle="dropdown"
              >
                👤 {username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow">
                <li><Link className="dropdown-item fw-semibold" to="/orders">📦 View Order History</Link></li>
                <li><Link className="dropdown-item fw-semibold" to="/favorites">⭐ View Favourites</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    className="dropdown-item text-danger fw-semibold"
                    onClick={() => {
                      localStorage.removeItem('hcb_user');
                      localStorage.removeItem('hcb_token');
                      localStorage.removeItem('hcb_role');
                      setUsername(null);
                      window.dispatchEvent(new Event('storage'));
                      navigate('/');
                    }}
                  >
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <i
              className="bi bi-person-circle user-icon ms-2"
              title="Guest User"
              onClick={() => navigate('/userregistration')}
            ></i>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;