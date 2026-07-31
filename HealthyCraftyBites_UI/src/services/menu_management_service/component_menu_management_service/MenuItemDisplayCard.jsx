import { useState } from "react";
import "../css_menu_management_service/MenuItemDisplayCardCSS.css";
import saladImage from "../images_menu_management_service/salad.png";

function MenuItemDisplayCard() {

    const [quantity, setQuantity] = useState(1);

    return (

    <div className="menu-card">

        <div className="menu-top">

            <div className="menu-left">

                <img
                    src={saladImage}
                    alt="Greek Salad"
                    className="menu-image"
                />

            </div>

            <div className="menu-content">

                <div className="menu-header">

                    <h2>Greek Salad</h2>

                    <i className="bi bi-record-circle veg-icon"></i>

                </div>

                <p className="menu-description">

                    Fresh vegetables, lettuce, cucumber,
                    tomato, olives, feta cheese and healthy dressing.

                </p>

                <hr />

                <h6 className="nutrition-title">
                    NUTRITION (Approx.)
                </h6>

                <div className="nutrition-grid">

                    <div className="nutrition-item">
                        <span className="nutrition-icon">🔥</span>

                        <div>

                            <span className="nutrition-name">
                                Calories
                            </span>

                            <strong>250 kcal</strong>

                        </div>

                    </div>

                    <div className="nutrition-item">

                        <span className="nutrition-icon">💪</span>

                        <div>

                            <span className="nutrition-name">
                                Protein
                            </span>

                            <strong>12 g</strong>

                        </div>

                    </div>

                    <div className="nutrition-item">

                        <span className="nutrition-icon">🌾</span>

                        <div>

                            <span className="nutrition-name">
                                Carbs
                            </span>

                            <strong>30 g</strong>

                        </div>

                    </div>

                    <div className="nutrition-item">

                        <span className="nutrition-icon">🧈</span>

                        <div>

                            <span className="nutrition-name">
                                Fat
                            </span>

                            <strong>10 g</strong>

                        </div>

                    </div>

                    <div className="nutrition-item">

                        <span className="nutrition-icon">🍃</span>

                        <div>

                            <span className="nutrition-name">
                                Fiber
                            </span>

                            <strong>5 g</strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <hr />

        <div className="menu-footer">

    <h3 className="menu-price">
        ₹299
    </h3>

    <div className="menu-actions">

        <div className="quantity-box">

            <button
                onClick={() =>
                    quantity > 1 &&
                    setQuantity(quantity - 1)
                }
            >
                −
            </button>

            <span>{quantity}</span>

            <button
                onClick={() =>
                    setQuantity(quantity + 1)
                }
            >
                +
            </button>

        </div>

        <button className="cart-btn">

            <i className="bi bi-cart3 me-2"></i>

            Add to Cart

        </button>

    </div>

</div>

    </div>

);

}

export default MenuItemDisplayCard;