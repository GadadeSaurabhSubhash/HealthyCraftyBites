import { useState } from "react";
import "../css_menu_management_service/CartCSS.css";
import saladImage from "../images_menu_management_service/salad.png";

function Cart() {

    return (

        <div className="cart-container">

            {/* ===========================
                    Heading
            =========================== */}

            <h1 className="cart-title">

                My Shopping Cart

            </h1>


            {/* ===========================
                    Cart Table
            =========================== */}

            <div className="cart-table">

                {/* Header */}

                <div className="cart-header">

                    <div className="product-column">
                        Product
                    </div>

                    <div className="quantity-column">
                        Quantity
                    </div>

                    <div className="price-column">
                        Price
                    </div>

                    <div className="total-column">
                        Total
                    </div>

                    <div className="action-column">

                    </div>

                </div>


                {/* ======================
                        Item 1
                ======================= */}

                <div className="cart-row">

                    <div className="product-column">

                        <img
                            src={saladImage}
                            alt="Greek Salad"
                            className="product-image"
                        />

                        <div className="product-info">

                            <h3>

                                Greek Salad

                            </h3>

                            <p>

                                Fresh vegetables, olives, feta cheese with healthy dressing.

                            </p>

                            <span>

                                <i className="bi bi-record-circle-fill"></i>

                                Veg

                            </span>

                        </div>

                    </div>

                    <div className="quantity-column">

                        <div className="quantity-box">

                            <button>-</button>

                            <span>1</span>

                            <button>+</button>

                        </div>

                    </div>

                    <div className="price-column">

                        ₹299

                    </div>

                    <div className="total-column">

                        ₹299

                    </div>

                    <div className="action-column">

                        <button className="delete-btn">

                            <i className="bi bi-x-lg"></i>

                        </button>

                    </div>

                </div>


                {/* ======================
                        Item 2
                ======================= */}

                <div className="cart-row">

                    <div className="product-column">

                        <img
                            src={saladImage}
                            alt="Paneer Wrap"
                            className="product-image"
                        />

                        <div className="product-info">

                            <h3>

                                Paneer Wrap

                            </h3>

                            <p>

                                High protein paneer wrap with fresh vegetables.

                            </p>

                            <span>

                                <i className="bi bi-record-circle-fill"></i>

                                Veg

                            </span>

                        </div>

                    </div>

                    <div className="quantity-column">

                        <div className="quantity-box">

                            <button>-</button>

                            <span>2</span>

                            <button>+</button>

                        </div>

                    </div>

                    <div className="price-column">

                        ₹249

                    </div>

                    <div className="total-column">

                        ₹498

                    </div>

                    <div className="action-column">

                        <button className="delete-btn">

                            <i className="bi bi-x-lg"></i>

                        </button>

                    </div>

                </div>

            </div>



            {/* ===========================
                    Summary
            =========================== */}

            <div className="cart-summary">

                <div className="coupon-card">

                    <h3>

                        Apply Coupon

                    </h3>

                    <input
                        type="text"
                        placeholder="Enter coupon code"
                    />

                    <button>

                        Apply Coupon

                    </button>

                </div>



                <div className="amount-card">

                    <div className="amount-row">

                        <span>

                            Subtotal

                        </span>

                        <span>

                            ₹797

                        </span>

                    </div>

                    <div className="amount-row">

                        <span>

                            Discount

                        </span>

                        <span>

                            -₹50

                        </span>

                    </div>


                    <hr />

                    <div className="amount-row grand-total">

                        <span>

                            Total

                        </span>

                        <span>

                            ₹787

                        </span>

                    </div>

                </div>

            </div>



            {/* ===========================
                    Bottom Buttons
            =========================== */}

            <div className="cart-actions">

                <button className="back-btn">

                    <i className="bi bi-arrow-left"></i>

                    Back to Shopping

                </button>

                <button className="checkout-btn">

                    Proceed to Checkout

                </button>

            </div>

        </div>

    );

}

export default Cart;