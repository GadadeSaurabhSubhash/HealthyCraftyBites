import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css_menu_management_service/MenuItemDisplayCardCSS.css";

function MenuItemDisplayCard({ currentProduct }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('hcb_cart') || '[]');
    existingCart.push({
      cartItemId: Date.now() + Math.random(),
      productId: currentProduct.productId,
      productName: currentProduct.name,
      isCustomised: false,
      price: currentProduct.price,
      quantity: quantity
    });
    localStorage.setItem('hcb_cart', JSON.stringify(existingCart));
    alert(`${currentProduct.name} added to your Cart!`);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="menu-card">
      <div className="menu-top">
        <div className="menu-left">
          <img
            src={`/${currentProduct.imgName || 'healthy_crafty_bites_logo.png'}`}
            alt={currentProduct.name}
            className="menu-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/healthy_crafty_bites_logo.png';
            }}
          />
        </div>

        <div className="menu-content">
          <div className="menu-header">
            <h2>{currentProduct.name}</h2>

            <i className="heart bi bi-heart menu-favourite-icon"></i>
          </div>

          <p className="menu-description">
            {currentProduct.description}
          </p>

          <div className="menu-divider"></div>

          <h6 className="menu-nutrition-title">NUTRITION (Approx.)</h6>

          <div className="menu-nutrition-grid">
            <div className="menu-nutrition-item">
              <span className="menu-nutrition-icon">🔥</span>

              <div>
                <span className="menu-nutrition-name">Calories</span>
                <strong>{currentProduct.calories} kcal</strong>
              </div>
            </div>

            <div className="menu-nutrition-item">
              <span className="menu-nutrition-icon">💪</span>

              <div>
                <span className="menu-nutrition-name">Protein</span>
                <strong>{currentProduct.protein} g</strong>
              </div>
            </div>

            <div className="menu-nutrition-item">
              <span className="menu-nutrition-icon">🌾</span>

              <div>
                <span className="menu-nutrition-name">Carbs</span>
                <strong>{currentProduct.carbohydrates} g</strong>
              </div>
            </div>

            <div className="menu-nutrition-item">
              <span className="menu-nutrition-icon">🧈</span>

              <div>
                <span className="menu-nutrition-name">Fat</span>
                <strong>{currentProduct.fat} g</strong>
              </div>
            </div>

            <div className="menu-nutrition-item">
              <span className="menu-nutrition-icon">🍃</span>

              <div>
                <span className="menu-nutrition-name">Fiber</span>
                <strong>{currentProduct.fiber} g</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-divider"></div>

      <div className="menu-footer">
        <h3 className="menu-price">₹{currentProduct.price}</h3>

        <div className="menu-actions">
          <div className="menu-quantity-box">
            <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
              −
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>

          <button className="menu-cart-btn" onClick={handleAddToCart}>
            <i className="bi bi-cart3 me-2"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItemDisplayCard;