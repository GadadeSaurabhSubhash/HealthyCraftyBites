import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../../common_components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (location.state && location.state.order) {
      setOrderDetails(location.state.order);
    } else {
      const savedOrder = JSON.parse(localStorage.getItem('hcb_last_order') || 'null');
      if (savedOrder) {
        setOrderDetails(savedOrder);
      }
    }
  }, [location]);

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-4 p-5 text-center bg-white" id="printableConfirmationReceipt">
              
              {/* Big Success Icon & Title */}
              <div className="mb-3">
                <span className="display-1 text-success">🎉</span>
              </div>

              <h1 className="fw-bold text-success display-5 mb-2">
                YOUR ORDER IS PLACED SUCCESSFULLY!
              </h1>
              <p className="fs-5 text-muted mb-4">
                Thank you for choosing HealthyCraftyBites. Your meal is being prepared with love and fresh ingredients.
              </p>

              {/* Prominent Order Number Display */}
              <div className="bg-success text-white p-4 rounded-4 shadow-sm mb-4">
                <h6 className="text-uppercase tracking-wide opacity-75 mb-1">Your Order Number</h6>
                <div className="display-3 fw-bold">
                  {orderDetails?.orderNumber || "HCB-178601"}
                </div>
              </div>

              {/* Order Summary Details */}
              {orderDetails && (
                <div className="bg-light p-4 rounded-4 mb-4 text-start">
                  <h5 className="fw-bold border-bottom pb-2 mb-3">📋 Order Summary</h5>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <strong>Customer:</strong> {orderDetails.username || localStorage.getItem('hcb_user')}
                    </div>
                    <div className="col-md-6 mb-2">
                      <strong>Payment Status:</strong> <span className="badge bg-success">{orderDetails.paymentStatus || 'PAID'}</span>
                    </div>
                    {orderDetails.receiverName && (
                      <div className="col-md-6 mb-2">
                        <strong>Receiver Name:</strong> {orderDetails.receiverName}
                      </div>
                    )}
                    {orderDetails.tableNumber && (
                      <div className="col-md-6 mb-2">
                        <strong>Table Number:</strong> {orderDetails.tableNumber}
                      </div>
                    )}
                    {orderDetails.orderType && (
                      <div className="col-md-6 mb-2">
                        <strong>Order Type:</strong> <span className="badge bg-info text-dark">{orderDetails.orderType}</span>
                      </div>
                    )}
                  </div>

                  <h6 className="fw-bold mt-3 mb-2">Items:</h6>
                  <ul className="list-group list-group-flush mb-3">
                    {orderDetails.items?.map((item, idx) => (
                      <li key={idx} className="list-group-item bg-transparent d-flex justify-content-between">
                        <span>{item.productName} x {item.quantity}</span>
                        <span className="fw-bold text-success">₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between border-top pt-2 fw-bold fs-5">
                    <span>Grand Total Paid:</span>
                    <span className="text-success">₹{orderDetails.totalAmount}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons: Download Bill & Redirect Home */}
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button className="btn btn-outline-primary btn-lg fw-bold px-4 rounded-3" onClick={handlePrintReceipt}>
                  📄 Download / Print Bill
                </button>
                <Link to="/" className="btn btn-success btn-lg fw-bold px-4 rounded-3">
                  🏠 Back to Home Page
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
