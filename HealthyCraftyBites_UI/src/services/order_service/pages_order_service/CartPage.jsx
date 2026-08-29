import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../../common_components/Navbar';
import { placeOrder } from '../../../api/OrderApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  
  // Advance Order & Table Details
  const [receiverName, setReceiverName] = useState('');
  const [receiverMobile, setReceiverMobile] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [orderType, setOrderType] = useState('DINE_IN'); // DINE_IN or TAKE_AWAY
  const [advanceDate, setAdvanceDate] = useState('');
  const [advanceTime, setAdvanceTime] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('hcb_cart') || '[]');
    setCartItems(saved);
  }, []);

  const handleRemoveItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem('hcb_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('hcb_cart');
    window.dispatchEvent(new Event('storage'));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const grandTotal = Number((totalPrice * 1.05 + 15).toFixed(2));

  const handleCheckout = async () => {
    const username = localStorage.getItem('hcb_user');
    if (!username) {
      alert("Please log in first to place an order!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsProcessing(true);

    const generatedOrderNumber = "HCB-" + Math.floor(100000 + Math.random() * 900000);

    const orderPayload = {
      username,
      customerEmail: `${username.toLowerCase()}@healthycraftybites.com`,
      receiverName: receiverName || username,
      receiverMobile,
      tableNumber,
      orderType,
      totalAmount: grandTotal,
      paymentStatus: paymentMethod === 'CASH_ON_COUNTER' ? 'PENDING_PAYMENT' : 'PAID',
      orderStatus: 'RECEIVED',
      advancePickupDate: advanceDate,
      advancePickupTime: advanceTime,
      specialInstructions,
      orderNumber: generatedOrderNumber,
      items: cartItems.map(item => ({
        productId: item.productId || 999,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        isCustomised: !!item.isCustomised,
        customisedProduct: item.isCustomised ? {
          mealType: item.customisedProduct.mealType,
          totalCalories: item.customisedProduct.totals.calories,
          totalProtein: item.customisedProduct.totals.protein,
          totalCarbohydrates: item.customisedProduct.totals.carbs,
          totalFat: item.customisedProduct.totals.fat,
          totalFiber: item.customisedProduct.totals.fiber,
          totalPrice: item.price,
          vegetableIdsJson: JSON.stringify(item.customisedProduct.selectedIngredients)
        } : null
      }))
    };

    try {
      const res = await placeOrder(orderPayload);
      const placedOrderData = (res.data && res.data.data) ? res.data.data : orderPayload;

      localStorage.removeItem('hcb_cart');
      window.dispatchEvent(new Event('storage'));
      localStorage.setItem('hcb_last_order', JSON.stringify(placedOrderData));

      navigate('/order-confirmation', { state: { order: placedOrderData } });
    } catch (err) {
      localStorage.removeItem('hcb_cart');
      window.dispatchEvent(new Event('storage'));
      localStorage.setItem('hcb_last_order', JSON.stringify(orderPayload));

      navigate('/order-confirmation', { state: { order: orderPayload } });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container py-4">
        <h2 className="fw-bold text-success mb-4">🛒 Shopping Cart & Checkout</h2>

        {cartItems.length === 0 ? (
          <div className="card shadow-sm p-5 text-center rounded-4">
            <h4 className="text-muted">Your cart is currently empty</h4>
            <p>Craft your custom meal or explore our healthy menu!</p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/customiseproduct" className="btn btn-warning fw-bold">✨ Craft Custom Meal</Link>
              <Link to="/viewmenu" className="btn btn-success fw-bold">📋 View Menu</Link>
            </div>
          </div>
        ) : (
          <div className="row">
            {/* Cart Items Table */}
            <div className="col-lg-8 mb-4">
              <div className="card shadow-sm border-0 rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark m-0">Selected Items ({cartItems.length})</h5>
                  <button className="btn btn-outline-danger btn-sm" onClick={handleClearCart}>Clear Cart</button>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="fw-bold">{item.productName}</div>
                            {item.isCustomised && item.customisedProduct?.selectedIngredients && (
                              <div className="small text-muted">
                                Ingredients: {item.customisedProduct.selectedIngredients.map(i => `${i.ingredient?.name} (${i.quantity}x)`).join(', ')}
                              </div>
                            )}
                          </td>
                          <td>
                            {item.isCustomised ? (
                              <span className="badge bg-warning text-dark">Custom {item.customisedProduct?.mealType}</span>
                            ) : (
                              <span className="badge bg-secondary">Standard</span>
                            )}
                          </td>
                          <td className="fw-bold text-success">₹{item.price}</td>
                          <td>
                            <button className="btn btn-sm btn-danger" onClick={() => handleRemoveItem(index)}>Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order & Dining Details Form */}
              <div className="card shadow-sm border-0 rounded-4 p-4 mt-4">
                <h5 className="fw-bold text-dark mb-3">📝 Order & Dining Details</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Receiver Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Receiver Name"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mobile Number"
                      value={receiverMobile}
                      onChange={(e) => setReceiverMobile(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Order Preference</label>
                    <select className="form-select" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                      <option value="DINE_IN">🍽️ Dine-in</option>
                      <option value="TAKE_AWAY">🛍️ Takeaway / Pickup</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Table Number (If Dine-in)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Table #5"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Pickup / Delivery Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={advanceDate}
                      onChange={(e) => setAdvanceDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Time Slot</label>
                    <input
                      type="time"
                      className="form-control"
                      value={advanceTime}
                      onChange={(e) => setAdvanceTime(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Special Instructions (Allergies / Dressing on side)</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="e.g. Extra napkins, sauce on the side..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary & Dummy Payment Section */}
            <div className="col-lg-4">
              <div className="card shadow-sm border-0 rounded-4 p-4 sticky-top" style={{ top: '90px' }}>
                <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span className="fw-bold">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>GST & Taxes (5%):</span>
                  <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Packaging Charge:</span>
                  <span>₹15.00</span>
                </div>

                <div className="border-top pt-2 mb-4 d-flex justify-content-between align-items-center">
                  <span className="fs-5 fw-bold">Grand Total:</span>
                  <span className="fs-4 fw-bold text-success">₹{grandTotal.toFixed(2)}</span>
                </div>

                <h6 className="fw-bold mb-2">Simulated Payment Options:</h6>
                <div className="form-check mb-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="payMethod"
                    id="payCard"
                    checked={paymentMethod === 'CARD'}
                    onChange={() => setPaymentMethod('CARD')}
                  />
                  <label className="form-check-label" htmlFor="payCard">💳 Credit / Debit Card</label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="payMethod"
                    id="payUpi"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                  />
                  <label className="form-check-label" htmlFor="payUpi">📱 UPI / QR Code</label>
                </div>
                <div className="form-check mb-4">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="payMethod"
                    id="payCash"
                    checked={paymentMethod === 'CASH_ON_COUNTER'}
                    onChange={() => setPaymentMethod('CASH_ON_COUNTER')}
                  />
                  <label className="form-check-label" htmlFor="payCash">💵 Pay Cash at Counter</label>
                </div>

                <button
                  className="btn btn-success btn-lg w-100 fw-bold shadow-sm"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing Order...' : '🚀 PLACE ORDER'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
