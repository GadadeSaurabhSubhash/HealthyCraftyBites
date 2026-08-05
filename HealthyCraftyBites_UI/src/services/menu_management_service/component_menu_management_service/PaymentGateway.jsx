import { useState } from "react";
import "../css_menu_management_service/PaymentGatewayCSS.css";

function PaymentGateway({
  totalAmount = 787,
  subtotal = 797,
  discount = 50,
  itemCount = 2,
  customerName = "Atharv",
  orderType = "Dine In",
}) {
  const [selectedMethod, setSelectedMethod] = useState("upi");

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");

  const [cardHolder, setCardHolder] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvv, setCvv] = useState("");

  const [selectedBank, setSelectedBank] = useState("");

  const paymentMethods = [
    {
      id: "upi",
      label: "UPI",
      icon: "bi-phone",
    },

    {
      id: "card",
      label: "Credit / Debit Card",
      icon: "bi-credit-card-2-front",
    },

    {
      id: "netbanking",
      label: "Net Banking",
      icon: "bi-bank",
    },

    {
      id: "cash",
      label: "Cash",
      icon: "bi-cash-stack",
    },
  ];

  return (
    <div className="payment-container">
      {/* ===========================
                    Heading
            =========================== */}

      <h1 className="payment-title">Payment Gateway</h1>

      <div className="payment-card">
        {/* ===========================
                        Amount
                =========================== */}

        <div className="payment-total">
          <h2>Amount Payable</h2>

          <h1>₹{totalAmount}</h1>
        </div>

        <div className="payment-divider"></div>

        {/* ===========================
                    Payment Method
                =========================== */}

        <h3 className="payment-section-title">Select Payment Method</h3>

        <div className="payment-method-list">
          {paymentMethods.map((method) => (
            <label key={method.id} className="payment-method">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => setSelectedMethod(e.target.value)}
              />

              <i className={`bi ${method.icon}`}></i>

              <span>{method.label}</span>
            </label>
          ))}
        </div>

        <div className="payment-divider"></div>

        {/* ===========================
                        UPI
                =========================== */}

        {selectedMethod === "upi" && (
          <div className="payment-form">
            <label>UPI ID</label>

            <input
              type="text"
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {/* ===========================
                        Card
                =========================== */}

        {selectedMethod === "card" && (
          <div className="payment-form">
            <label>Card Number</label>

            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <label>Card Holder</label>

            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />

            <div className="payment-row">
              <div>
                <label>Expiry</label>

                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>

              <div>
                <label>CVV</label>

                <input
                  type="password"
                  placeholder="***"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ===========================
                    Net Banking
                =========================== */}

        {selectedMethod === "netbanking" && (
          <div className="payment-form">
            <label>Select Bank</label>

            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">Select Bank</option>

              <option>SBI</option>

              <option>HDFC</option>

              <option>ICICI</option>

              <option>Axis Bank</option>
            </select>
          </div>
        )}

        {/* ===========================
                        Cash
                =========================== */}

        {selectedMethod === "cash" && (
          <div className="payment-info">
            Cash will be collected at the counter.
          </div>
        )}

        <div className="payment-divider"></div>

        {/* ===========================
                        Summary
                =========================== */}

        <div className="payment-summary">
          <div className="payment-summary-row">
            <span>Customer</span>

            <span>{customerName}</span>
          </div>

          <div className="payment-summary-row">
            <span>Order Type</span>

            <span>{orderType}</span>
          </div>

          <div className="payment-summary-row">
            <span>Items</span>

            <span>{itemCount}</span>
          </div>

          <div className="payment-summary-row">
            <span>Subtotal</span>

            <span>₹{subtotal}</span>
          </div>

          <div className="payment-summary-row">
            <span>Discount</span>

            <span>-₹{discount}</span>
          </div>

          <div className="payment-summary-row payment-grand-total">
            <span>Total</span>

            <span>₹{totalAmount}</span>
          </div>
        </div>

        <div className="payment-actions">
          <button className="payment-back-btn">
            <i className="bi bi-arrow-left"></i>
            Back
          </button>

          <button className="payment-pay-btn">Pay ₹{totalAmount}</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;
