import React, { useState, useEffect } from "react";
import NavbarCashCounterHome from "../../common_components/NavbarCashCounterHome";
import page_logo_path from "../layout_pages_images/admin_manager_dashboard_logo.png";

import "../layout_pages_css/ViewOrderCSS.css";


function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
  const fetchActiveOrders = async () => {
    try {
      const response = await fetch('/api/orders/active');

      if(!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    }
    catch(error) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveOrders();
  }, []);
  */

  if(loading) return <div>Loading...</div>;
  if(error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  const orders_list = [
    {
      orderNumber: 200,
      time: "15/06/26 17:56:00",
      customerName: "Ram",
      mobileNumber: "89758654",
      amount: 800,
      paymentMode: "Cash",
      paymentStatus: "Paid",
    },
    {
      orderNumber: 300,
      time: "15/06/26 18:56:00",
      customerName: "Shyam",
      mobileNumber: "89758654",
      amount: 600,
      paymentMode: "Cash",
      paymentStatus: "Paid",
    },
    {
      orderNumber: 300,
      time: "15/06/26 18:56:00",
      customerName: "Shyam",
      mobileNumber: "89758654",
      amount: 600,
      paymentMode: "Cash",
      paymentStatus: "Paid",
    },
  ];

  return (
    <div className="view-orders-layout">
      <NavbarCashCounterHome
        page_title="View Orders"
        page_logo={page_logo_path}
        buttonText="Check Order Status"
        home_route="/admincashcounterhome"
        action_button_text="Check Order Status"
        action_button_route="/admincashcounterhome"
        button_route="admincashcounterhome"
      />

      {/* View Orders page */}
      <div className="view-orders-page">

        <div className="orders-container">

          {orders_list.map((order) => (

            <div
              className="order-card"
              key={order.orderNumber}
            >

              <div className="order-details">

                <p>
                  <span>Order Number:</span>
                  {order.orderNumber}
                </p>

                <p>
                  <span>Time:</span>
                  {order.time}
                </p>

                <p>
                  <span>Customer Name:</span>
                  {order.customerName}
                </p>

              </div>


              <div className="payment-details">
                <p>
                  <span>Mobile Number:</span>
                  {order.mobileNumber}
                </p>

                <p>
                  <span>Amount:</span>
                  ₹{order.amount}
                </p>

                <p>
                  <span>Payment Mode:</span>
                  {order.paymentMode}
                </p>

              </div>


              <button
                type="button"
                className="payment-status"
              >
                {order.paymentStatus}
              </button>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}


export default ViewOrders;