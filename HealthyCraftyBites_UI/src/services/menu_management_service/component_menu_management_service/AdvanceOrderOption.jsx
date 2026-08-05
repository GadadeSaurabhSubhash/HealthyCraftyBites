import { useState } from "react";
import "../css_menu_management_service/AdvanceOrderOptionCSS.css";

function AdvanceOrderOption() {
  const [orderType, setOrderType] = useState("dinein");

  return (
    <div className="advance-order-container">
      {/* ===========================
                    Heading
            =========================== */}

      <h1 className="advance-order-title">Advance Order</h1>

      <div className="advance-order-card">
        {/* ===========================
                        Customer Details
                =========================== */}

        <div className="advance-form-row">
          <div className="advance-form-group">
            <label>Customer Name</label>

            <input type="text"/>
          </div>

          <div className="advance-form-group">
            <label>Mobile Number</label>

            <input type="tel"  />
          </div>
        </div>

        {/* ===========================
                        Order Details
                =========================== */}

        <div className="advance-form-row">
          <div className="advance-form-group">
            <label>Order Type</label>

            <div className="order-type-group">
              <label className="order-type-option">
                <input
                  type="radio"
                  name="orderType"
                  value="dinein"
                  checked={orderType === "dinein"}
                  onChange={(e) => setOrderType(e.target.value)}
                />
                Dine In
              </label>

              <label className="order-type-option">
                <input
                  type="radio"
                  name="orderType"
                  value="takeaway"
                  checked={orderType === "takeaway"}
                  onChange={(e) => setOrderType(e.target.value)}
                />
                Takeaway
              </label>
            </div>
          </div>

          <div className="advance-form-group">
            <label>Table Number</label>

            <input
              type="number"
              min="1"
              disabled={orderType === "takeaway"}
            />
          </div>
        </div>

        <hr />

        {/* ===========================
                        Bottom Buttons
                =========================== */}

        <div className="advance-order-actions">
          <button className="advance-back-btn">
            <i className="bi bi-arrow-left"></i>
            Back to Cart
          </button>

          <button className="advance-proceed-btn">
            Proceed to Payment
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvanceOrderOption;
