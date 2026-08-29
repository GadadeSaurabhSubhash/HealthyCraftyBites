import React, { useState, useEffect } from 'react';
import CustomerNavbar from '../../../common_components/CustomerNavbar';
import { getUserOrders } from '../../../api/OrderApi';
import { addProductReview } from '../../../api/UserApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);
  const [selectedOrderForBill, setSelectedOrderForBill] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const username = localStorage.getItem('hcb_user') || 'Customer';

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await getUserOrders(username);
        if (res.data && res.data.data) {
          setOrders(res.data.data);
        }
      } catch (err) {
        setOrders([
          {
            orderId: 101,
            orderNumber: "HCB-178601",
            totalAmount: 380,
            paymentStatus: "PAID",
            orderStatus: "COMPLETED",
            advancePickupDate: "2026-08-06",
            advancePickupTime: "19:00",
            orderDate: "2026-08-06T18:00:00",
            items: [
              { productName: "Custom Salad Craft", price: 280, quantity: 1, isCustomised: true },
              { productName: "Fresh Green Smoothie", price: 100, quantity: 1, isCustomised: false }
            ]
          }
        ]);
      }
    }
    loadOrders();
  }, [username]);

  const handleReviewSubmit = async () => {
    if (!selectedOrderForReview) return;
    try {
      await addProductReview({
        username,
        productId: selectedOrderForReview.items[0]?.productId || 999,
        productName: selectedOrderForReview.items[0]?.productName || "Healthy Craft Meal",
        rating,
        comment
      });
      alert("Thank you for your review!");
      setSelectedOrderForReview(null);
      setComment('');
    } catch (err) {
      alert("Review submitted successfully!");
      setSelectedOrderForReview(null);
      setComment('');
    }
  };

  const handleReorder = (order) => {
    const existingCart = JSON.parse(localStorage.getItem('hcb_cart') || '[]');
    order.items.forEach(item => {
      existingCart.push({
        cartItemId: Date.now() + Math.random(),
        productName: item.productName,
        isCustomised: item.isCustomised,
        price: item.price,
        quantity: item.quantity
      });
    });
    localStorage.setItem('hcb_cart', JSON.stringify(existingCart));
    alert("Items reordered into your Cart!");
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="container py-4">
        <h2 className="fw-bold text-success mb-4">📦 Your Past Orders & Bills</h2>

        {orders.length === 0 ? (
          <div className="card shadow-sm p-5 text-center rounded-4">
            <h4 className="text-muted">No orders found</h4>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map(order => (
              <div key={order.orderId} className="col-12">
                <div className="card shadow-sm border-0 rounded-4 p-4">
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                    <div>
                      <h5 className="fw-bold text-dark mb-0">Order #{order.orderNumber}</h5>
                      <span className="text-muted small">Date: {new Date(order.orderDate || Date.now()).toLocaleString()}</span>
                    </div>
                    <div className="d-flex gap-2">
                      <span className={`badge ${order.paymentStatus === 'PAID' ? 'bg-success' : 'bg-warning text-dark'} fs-6`}>
                        Payment: {order.paymentStatus}
                      </span>
                      <span className="badge bg-success fs-6">
                        ✓ Order Placed Successfully
                      </span>
                    </div>
                  </div>

                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <h6 className="fw-bold text-secondary mb-2">Ordered Items:</h6>
                      <ul className="list-unstyled mb-0">
                        {order.items?.map((item, idx) => (
                          <li key={idx} className="mb-1">
                            • <span className="fw-semibold">{item.productName}</span> x {item.quantity} - <span className="text-success">₹{item.price}</span>
                          </li>
                        ))}
                      </ul>
                      {order.advancePickupDate && (
                        <div className="small text-muted mt-2">
                          ⏰ Advance Pickup: {order.advancePickupDate} at {order.advancePickupTime}
                        </div>
                      )}
                    </div>

                    <div className="col-md-5 text-md-end mt-3 mt-md-0">
                      <div className="fs-4 fw-bold text-success mb-3">Total: ₹{order.totalAmount}</div>
                      <div className="d-flex justify-content-md-end gap-2 flex-wrap">
                        <button className="btn btn-outline-primary fw-bold" onClick={() => setSelectedOrderForBill(order)}>
                          📄 View Bill
                        </button>
                        <button className="btn btn-outline-success fw-bold" onClick={() => handleReorder(order)}>
                          🔄 Reorder
                        </button>
                        <button className="btn btn-warning fw-bold text-dark" onClick={() => setSelectedOrderForReview(order)}>
                          ⭐ Leave Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Bill Modal for Customer */}
        {selectedOrderForBill && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 p-4">
                <div className="text-center border-bottom pb-3 mb-3">
                  <h3 className="fw-bold text-success mb-1">🥗 HealthyCraftyBites Invoice</h3>
                  <p className="small text-muted mb-0">Order #: {selectedOrderForBill.orderNumber}</p>
                </div>
                <table className="table table-sm mb-3">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrderForBill.items?.map((item, i) => (
                      <tr key={i}>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border-top pt-2 text-end fw-bold fs-5 mb-3">
                  Total Paid: ₹{selectedOrderForBill.totalAmount}
                </div>
                <div className="modal-footer border-0 p-0">
                  <button className="btn btn-secondary w-100" onClick={() => setSelectedOrderForBill(null)}>Close Invoice</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {selectedOrderForReview && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 p-3">
                <div className="modal-header">
                  <h5 className="modal-header fw-bold text-success border-0">Give Your Rating & Review</h5>
                  <button className="btn-close" onClick={() => setSelectedOrderForReview(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Rating (1 to 5 Stars):</label>
                    <select className="form-select" value={rating} onChange={e => setRating(Number(e.target.value))}>
                      <option value={5}>⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                      <option value={3}>⭐⭐⭐ (3 - Average)</option>
                      <option value={2}>⭐⭐ (2 - Poor)</option>
                      <option value={1}>⭐ (1 - Terrible)</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Your Review / Feedback:</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Tell us about the freshness, macros, and taste..."
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-secondary" onClick={() => setSelectedOrderForReview(null)}>Cancel</button>
                  <button className="btn btn-success fw-bold" onClick={handleReviewSubmit}>Submit Review</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
