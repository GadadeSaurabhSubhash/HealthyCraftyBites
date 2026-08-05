import { Link } from "react-router-dom";
import { useState } from "react";
import UserDropdownMenu from "../../services/user_service/component_user_service/UserDropdownMenu";
import adminImage from "../layout_pages_images/admin_login_image_icon.png";
import aboutImage from "../layout_pages_images/about_us_image.png";
import saladImage from "../layout_pages_images/salad.png";
import rollImage from "../layout_pages_images/roll.png";
import sandwichImage from "../layout_pages_images/sandwhich.png";
import beverageImage from "../layout_pages_images/beverage.png";
import "../layout_pages_css/HomeCSS.css";
import logo from "../../services/authentication_service/authentication_service_images/healthy_crafty_bites_logo.png";
import colabImage from "../../common_components/images/salad_roll_sandwhich_img_home_page.png";
function Home() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  return (
    <>
      <div className="home-page">
        <nav className="navbar navbar-expand-lg home-navbar">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <img
                src={logo}
                alt="HealthyCraftyBites Logo"
                className="logo me-3"
              />
              <div>
                <h2 className="website-name">HealthyCraftyBites</h2>
                <p className="website-slogan">Eat Healthy, Live Happy</p>
              </div>
            </div>

            <div className="user-dropdown-container">
              <i
                className="bi bi-person-circle user-icon"
                onClick={() => setShowUserMenu(!showUserMenu)}
              ></i>

              {showUserMenu && (
                <UserDropdownMenu
                  userName="Guest User"
                  email="guest@healthycraftybites.com"
                  onProfile={() => console.log("Profile")}
                  onOrders={() => console.log("Orders")}
                  onFavourites={() => console.log("Favourites")}
                  onLogout={() => console.log("Logout")}
                />
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section starts here */}
        <section className="hero-section">
          <div className="container">
            {/* First Row */}
            <div className="row align-items-center">
              <div className="col-lg-8 d-flex align-items-center">
                <div className="col-lg-6 text-center">
                  <img
                    src={colabImage}
                    alt="Healthy Food"
                    className="img-fluid hero-image"
                  />
                </div>
                <div className="hero-content ">
                  <h1 className="hero-heading">
                    Fresh. Healthy. Crafted for You.
                  </h1>

                  <p className="hero-text">
                    HealthyCraftyBites brings together fresh ingredients,
                    nutritious recipes, and customizable meals to help you enjoy
                    delicious food without compromising your health.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 d-flex justify-content-center">
                <div className="login-card">
                  <h2 className="login-title">Welcome Back </h2>

                  <p className="login-subtitle">
                    Sign in to continue your healthy journey.
                  </p>

                  <form>
                    <div>
                      <label className="email-input-label">Enter Email</label>
                    </div>
                    <input type="email" />

                    <div>
                      <label className="password-input-label">
                        Enter Password
                      </label>
                    </div>
                    <input type="password" />

                    <button type="submit" className="login-btn">
                      Sign In
                    </button>

                    <p className="signup-text">
                      Didn't register?{" "}
                      <a href="/signup" className="signup-link">
                        Sign Up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>

            {/* Second Row (Later) */}
            {/* Features */}

            {/* Why Choose Us Section */}
            <section className="features-section">
              <div className="container">
                <div className="text-center mb-5">
                  <h2 className="section-heading">
                    FRESH • HEALTHY • CUSTOMIZED
                  </h2>

                  <p className="section-subtitle">Explore What We Offer</p>
                </div>
                <div className="row g-4 justify-content-center">
                  <div className="col-lg-3 col-md-6 d-flex justify-content-center">
                    <div className="food-card">
                      {/* here add onclick for explore menu inside food-card div*/}
                      <img src={saladImage} alt="Salads" />

                      <div className="food-card-body">
                        <h3>SALADS</h3>

                        <div className="food-footer">
                          <span>Explore</span>
                          <i className="bi bi-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 d-flex justify-content-center">
                    <div className="food-card">
                      <img src={rollImage} alt="Rolls" />

                      <div className="food-card-body">
                        <h3>ROLLS</h3>

                        <div className="food-footer">
                          <span>Explore</span>
                          <i className="bi bi-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 d-flex justify-content-center">
                    <div className="food-card">
                      <img src={sandwichImage} alt="Sandwiches" />

                      <div className="food-card-body">
                        <h3>SANDWICHES</h3>

                        <div className="food-footer">
                          <span>Explore</span>
                          <i className="bi bi-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 d-flex justify-content-center">
                    <div className="food-card">
                      <img src={beverageImage} alt="Beverages" />

                      <div className="food-card-body">
                        <h3>BEVERAGES</h3>

                        <div className="food-footer">
                          <span>Explore</span>
                          <i className="bi bi-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Build Your Own */}

                <div className="build-banner">
                  <div className="banner-left">
                    <div className="banner-icon">🥗</div>

                    <div>
                      <h2>BUILD YOUR OWN</h2>

                      <p>
                        Customize and build your perfect meal.
                        <br />
                        Choose your ingredients. Your way.
                      </p>
                    </div>
                  </div>

                  <button className="build-btn">
                    {/* here should be onclick function to redirect to build your own ingredient inside build-btn div*/}
                    BUILD NOW
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* Third Row (Later) */}
            {/* about us section */}
            {/* ================= ABOUT US ================= */}

            <section className="about-section">
              <div className="container">
                <div className="row align-items-center g-5">
                  {/* Left Side - Image */}

                  <div className="col-lg-5 text-center">
                    <img
                      src={aboutImage}
                      alt="HealthyCraftyBites"
                      className="about-image"
                    />
                  </div>

                  {/* Right Side - Content */}

                  <div className="col-lg-7">
                    <p className="about-tagline">OUR STORY</p>

                    <h2 className="about-heading">
                      Healthy Food, Crafted With Purpose
                    </h2>

                    <p className="about-text">
                      HealthyCraftyBites was created to make healthy eating
                      simple, delicious, and personalized. Using fresh
                      ingredients and thoughtfully crafted recipes, we aim to
                      help people enjoy nutritious meals that fit their taste
                      and lifestyle.
                    </p>

                    <div className="about-details">
                      <div className="about-item">
                        <i className="bi bi-calendar-event-fill"></i>
                        <div>
                          <h6>Established</h6>
                          <span>2026</span>
                        </div>
                      </div>

                      <div className="about-item">
                        <i className="bi bi-people-fill"></i>
                        <div>
                          <h6>Founded By</h6>
                          <span>HealthyCraftyBites Team</span>
                        </div>
                      </div>

                      <div className="about-item">
                        <i className="bi bi-heart-pulse-fill"></i>
                        <div>
                          <h6>Mission</h6>
                          <span>Healthy Food For Everyone</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* footer section */}

        {/* ================= FOOTER ================= */}

        <footer className="footer-section">
          <div className="container">
            <div className="footer-content">
              {/* Google Maps */}

              <a
                href="https://maps.app.goo.gl/bg9rmFLrCzJuJpdZ9"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-map"
              >
                <i className="bi bi-geo-alt-fill"></i>
                <span>Find Us</span>
              </a>

              {/* Copyright */}

              <p className="footer-copy">
                © 2026 HealthyCraftyBites. All Rights Reserved.
              </p>

              {/* Admin */}

              <a href="/adminlogin" className="footer-admin">
                <img src={adminImage} alt="Admin Login" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
