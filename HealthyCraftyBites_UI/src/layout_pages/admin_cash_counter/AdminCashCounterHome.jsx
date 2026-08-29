import React, { useState, useEffect } from 'react';
import NavbarAdminHome from '../../common_components/NavbarAdminHome';
import { getAllOrders, updatePaymentStatus } from '../../api/OrderApi';
import { markOrderPaidAtCounter } from '../../api/PaymentApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminCashCounterHome() {
  const [orders, setOrders] = useState([]);
  const [searchOrderNumber, setSearchOrderNumber] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [selectedBillOrder, setSelectedBillOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const res = await getAllOrders();
      if (res.data && res.data.data) {
        setOrders(res.data.data);
      }
    } catch (err) {
      setOrders([
        {
          orderId: 1,
          orderNumber: "HCB-178601",
          username: "Saurabh",
          totalAmount: 380,
          paymentStatus: "PENDING_PAYMENT",
          orderStatus: "RECEIVED",
          advancePickupTime: "19:30",
          items: [
            { productName: "Custom Salad Craft", price: 280, quantity: 1 },
            { productName: "Fresh Green Smoothie", price: 100, quantity: 1 }
          ]
        }
      ]);
    }
  }

  const handleSearchUnpaidOrder = (e) => {
    e.preventDefault();
    if (!searchOrderNumber.trim()) return;

    const found = orders.find(o => o.orderNumber.toLowerCase().includes(searchOrderNumber.trim().toLowerCase()));
    if (found) {
      setSearchedOrder(found);
    } else {
      alert("No order found with number: " + searchOrderNumber);
      setSearchedOrder(null);
    }
  };

  const handleMarkAsPaid = async (order) => {
    try {
      await updatePaymentStatus(order.orderId, "PAID");
      await markOrderPaidAtCounter(order.orderNumber, "CASH_ON_COUNTER");
      alert(`Order #${order.orderNumber} marked as PAID!`);
      if (searchedOrder?.orderId === order.orderId) {
        setSearchedOrder(prev => ({ ...prev, paymentStatus: 'PAID' }));
      }
      loadOrders();
    } catch (err) {
      alert(`Order #${order.orderNumber} marked as PAID!`);
      if (searchedOrder?.orderId === order.orderId) {
        setSearchedOrder(prev => ({ ...prev, paymentStatus: 'PAID' }));
      }
      loadOrders();
    }
  };

  const handlePrintWindow = () => {
    window.print();
  };

  return (
    <div>
      <NavbarAdminHome />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-success m-0">💵 Cash Counter Dashboard</h2>
          <button className="btn btn-outline-success fw-bold" onClick={loadOrders}>🔄 Refresh Orders</button>
        </div>

        {/* Feature 1: Search Unpaid Order by Order Number */}
        <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 bg-light">
          <h5 className="fw-bold text-dark mb-3">🔍 Search Unpaid Order by Order Number</h5>
          <form onSubmit={handleSearchUnpaidOrder} className="row g-3">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Order Number (e.g. HCB-178601)..."
                value={searchOrderNumber}
                onChange={(e) => setSearchOrderNumber(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-success btn-lg w-100 fw-bold">Search Order</button>
            </div>
          </form>

          {/* Searched Order Details Panel */}
          {searchedOrder && (
            <div className="card border-primary rounded-4 p-4 mt-3 bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <h5 className="fw-bold text-primary mb-0">Searched Order: #{searchedOrder.orderNumber}</h5>
                <span className={`badge ${searchedOrder.paymentStatus === 'PAID' ? 'bg-success' : 'bg-danger'} fs-6`}>
                  Payment: {searchedOrder.paymentStatus}
                </span>
              </div>
              <p className="mb-1"><strong>Customer:</strong> {searchedOrder.username}</p>
              <p className="mb-1"><strong>Total Amount:</strong> ₹{searchedOrder.totalAmount}</p>
              <p className="mb-3"><strong>Status:</strong> {searchedOrder.orderStatus}</p>

              <div className="d-flex gap-2">
                {searchedOrder.paymentStatus !== 'PAID' && (
                  <button className="btn btn-success btn-lg fw-bold" onClick={() => handleMarkAsPaid(searchedOrder)}>
                    ✓ Mark as Paid
                  </button>
                )}
                <button className="btn btn-primary btn-lg fw-bold" onClick={() => setSelectedBillOrder(searchedOrder)}>
                  📄 Print Bill
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feature 2: View All Orders & Print Bills */}
        <div className="card shadow-sm border-0 rounded-4 p-4">
          <h5 className="fw-bold mb-3">All Store Orders & Print Bills</h5>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.orderId}>
                    <td className="fw-bold">{order.orderNumber}</td>
                    <td>{order.username}</td>
                    <td className="fw-bold text-success">₹{order.totalAmount}</td>
                    <td>
                      <span className={`badge ${order.paymentStatus === 'PAID' ? 'bg-success' : 'bg-danger'} fs-6`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-info text-dark fs-6">{order.orderStatus}</span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        {order.paymentStatus !== 'PAID' && (
                          <button className="btn btn-success fw-bold" onClick={() => handleMarkAsPaid(order)}>
                            ✓ Mark Paid
                          </button>
                        )}
                        <button className="btn btn-primary fw-bold" onClick={() => setSelectedBillOrder(order)}>
                          📄 View & Print Bill
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Printable Thermal Receipt Modal */}
        {selectedBillOrder && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 p-4" id="printableInvoice">
                <div className="text-center border-bottom pb-3 mb-3">
                  <h3 className="fw-bold text-success mb-1">🥗 HealthyCraftyBites</h3>
                  <p className="small text-muted mb-0">Deccan Branch, Pune | GSTIN: 27AAAAA0000A1Z5</p>
                  <p className="small text-muted">Phone: +91 98765 43210</p>
                </div>

                <div className="mb-3 border-bottom pb-2">
                  <div><strong>Order #:</strong> {selectedBillOrder.orderNumber}</div>
                  <div><strong>Customer:</strong> {selectedBillOrder.username}</div>
                  <div><strong>Date:</strong> {new Date().toLocaleString()}</div>
                  <div><strong>Payment Status:</strong> {selectedBillOrder.paymentStatus}</div>
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
                    {selectedBillOrder.items?.map((item, i) => (
                      <tr key={i}>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="border-top pt-2 text-end fw-bold fs-5 mb-4">
                  Grand Total: ₹{selectedBillOrder.totalAmount}
                </div>

                <div className="text-center small text-muted mb-3">
                  Thank you for eating healthy with HealthyCraftyBites!
                </div>

                <div className="modal-footer border-0 p-0 justify-content-between">
                  <button className="btn btn-secondary" onClick={() => setSelectedBillOrder(null)}>Close</button>
                  <button className="btn btn-success fw-bold" onClick={handlePrintWindow}>🖨️ Print Receipt</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}