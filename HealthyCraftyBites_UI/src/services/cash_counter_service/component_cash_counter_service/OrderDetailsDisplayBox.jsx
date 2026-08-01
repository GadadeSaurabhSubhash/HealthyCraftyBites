import React from 'react';

function OrderDetailsDisplayBox({
  order,
  paymentMode,
  onPaymentModeChange,
  onPaymentDone,
  onPlaceOrder,
  paymentDone,
  placingOrder,
  errorMessage,
  successMessage,
  calculateTotal,
  calculateQtyTotal
}) {
  return (
    <div className="order-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && !errorMessage && <div className="success-message">{successMessage}</div>}

      <div className="order-header">
        <div><strong>Order No:</strong> {order.orderNumber}</div>
        <div><strong>Date:</strong> {order.date}</div>
        <div><strong>Time:</strong> {order.time}</div>
      </div>

      <div className="customer-info">
        <div><strong>Customer Name:</strong> {order.customerName}</div>
        <div><strong>Mobile:</strong> {order.mobile}</div>
      </div>

      <table className="items-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items && order.items.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.product}</td>
              <td className="qty-col">{item.qty}</td>
              <td className="price-col">₹{item.price}</td>
              <td className="total-col">₹{item.qty * item.price}</td>
            </tr>
          ))}
          <tr className="totals-row">
            <td colSpan="2">TOTALS:</td>
            <td className="qty-col">{calculateQtyTotal()}</td>
            <td></td>
            <td className="total-col">₹{calculateTotal()}</td>
          </tr>
        </tbody>
      </table>

      <div className="payment-section">
        <label>Payment Mode:</label>
        <select value={paymentMode} onChange={onPaymentModeChange}>
          <option value="online">Online</option>
          <option value="upi">UPI</option>
          <option value="cash">Cash</option>
        </select>
        <button onClick={onPaymentDone} disabled={paymentDone}>
          Payment Done
        </button>
        <button onClick={onPlaceOrder} disabled={placingOrder}>
          {placingOrder ? 'Placing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}

export default OrderDetailsDisplayBox;
