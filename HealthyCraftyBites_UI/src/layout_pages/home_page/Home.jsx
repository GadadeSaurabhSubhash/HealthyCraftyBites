import { Link, useNavigate } from "react-router-dom";
import adminImage from "../layout_pages_images/admin_login_image_icon.png";
import aboutImage from "../layout_pages_images/about_us_image.png";
import saladImage from "../layout_pages_images/salad.png";
import rollImage from "../layout_pages_images/roll.png";
import sandwichImage from "../layout_pages_images/sandwhich.png";
import beverageImage from "../layout_pages_images/beverage.png";
import "../layout_pages_css/HomeCSS.css";
import logo from "../../services/authentication_service/authentication_service_images/healthy_crafty_bites_logo.png";
import colabImage from "../../common_components/images/salad_roll_sandwhich_img_home_page.png";
import Navbar from "../layout_pages_components/Navbar";
import UserLoginForm from "../../services/authentication_service/component_authentication_service/UserLoginForm";


function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-page">

        <div className="p-2">
          <Navbar className="border-rounded" />
        </div>
        

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
                  <UserLoginForm />
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
                    <div className="food-card" onClick={() => navigate("/viewmenu")}>
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
                    <div className="food-card" onClick={() => navigate("/viewmenu")}>
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
                    <div className="food-card" onClick={() => navigate("/viewmenu")}>
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
                    <div className="food-card" onClick={() => navigate("/viewmenu")}>
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

                  <button className="build-btn" onClick={() => navigate("/customiseproduct")}>
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

              <div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3783.2788475574603!2d73.8387290749628!3d18.51629698257642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDMwJzU4LjciTiA3M8KwNTAnMjguNyJF!5e0!3m2!1sen!2sin!4v1785973245232!5m2!1sen!2sin"
                    width="200"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            

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
