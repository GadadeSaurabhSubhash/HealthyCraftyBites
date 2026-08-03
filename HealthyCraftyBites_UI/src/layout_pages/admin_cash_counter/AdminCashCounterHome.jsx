import { useState } from "react"
import "../layout_pages_css/CashCounterHomeCSS.css";
import NavbarCashCounterHome from "../../common_components/NavbarCashCounterHome.jsx"
import page_logo_path from "../layout_pages_images/admin_manager_dashboard_logo.png"
import { useNavigate } from "react-router-dom";

const MOCK_ORDERS = {
  200: {
	 orderNumber: 200,
	 time: "15/06/26 17:56:00",
	 customerName: "Atharv Sabale",
	 mobileNumber: "1234567890",
	 items: [{ srNo: 1, name: "Paneer Sandwich", qty: 1, price: 300 },
		{ srNo: 2, name: "Biryani", qty: 1, price: 500 },
		{ srNo: 3, name: "Pasta", qty: 1, price: 400 }
	 ],
  },
};


function fetchOrderByNumber(orderNumber) {
  return new Promise((resolve, reject) => {
	 setTimeout(() => {
		const order = MOCK_ORDERS[orderNumber];
		if (order) resolve(order);
		else reject(new Error("No order found with that number"));
	 }, 300);
  });
}

export default function AdminCashCounterHome() {
	const navigate = useNavigate();
  const [orderNumberInput, setOrderNumberInput] = useState("");
  const [order, setOrder] = useState(null);
  const [paymentMode, setPaymentMode] = useState(""); // "ONLINE" or "CASH"
  const [status, setStatus] = useState({
	 loading: false,
	 error: "",
  });
  const [placing, setPlacing] = useState(false);
  const [placedMessage, setPlacedMessage] = useState("");

  // Logic for calculating total price of the order
  const total =
	 order?.items.reduce((sum, item) => sum + item.qty * item.price, 0) ?? 0;


  const handleCheck = async () => {
	 setPlacedMessage("");
	
	 if (!orderNumberInput.trim()) {
		setOrder(null);
		setStatus({
		  loading: false,
		  error: "Enter an order number first",
		});
		return;
	 }

	 setStatus({
		loading: true,
		error: "",
	 });

	 // Replace the function below with actual API call
	 try {
		const result = await fetchOrderByNumber(Number(orderNumberInput));

		setOrder(result);
		setPaymentMode("");
		setStatus({
		  loading: false,
		  error: "",
		});
	 } catch (err) {
		setOrder(null);
		setStatus({
		  loading: false,
		  error: err.message,
		});
	 }
  };

  const handleKeyDown = ({ key }) => {
	 if (key === "Enter") {
		handleCheck();
	 }
  };

  const handlePlaceOrder = () => {
	 if (!order) return;

	 if (!paymentMode) {
		setStatus((prev) => ({
		  ...prev,
		  error: "Select a payment mode",
		}));
		return;
	 }

	 setPlacing(true);

	 setTimeout(() => {
		setPlacing(false);

		setPlacedMessage(
		  `Order #${order.orderNumber} placed via ${
			 paymentMode === "ONLINE" ? "Online / UPI" : "Cash"
		  }.`
		);
	 }, 400);
  };

  return (
	 <div className="CashCounterHome">
		<NavbarCashCounterHome
		  page_title="Cash Counter Dashboard"
		  page_logo={page_logo_path}
		  buttonText="View Orders"
		  home_route="/admincashcounterhome"
		  button_route="admincashcounterhome/vieworders"
		/>

		<div className="container-fluid mt-3" style={{ maxWidth: 1200 }}>
		  {/* Order Search */}
		  <section className="check-order-input">
			 <label htmlFor="orderNumber" className="check-order-label">
				Enter Order Number
			 </label>

			 <div className="d-flex gap-2" >
				<input
				  id="orderNumber"
				  type="text"
				  inputMode="numeric"
				  className="form-control border-light flex-grow-1"
				  style={{ minWidth: 120 }}
				  placeholder="e.g. 200"
				  value={orderNumberInput}
				  onChange={(e) => setOrderNumberInput(e.target.value)}
				  onKeyDown={handleKeyDown}
				/>

				<button
				  className="btn btn-primary"
				  onClick={handleCheck}
				  disabled={status.loading}
				>
				  {status.loading ? "Checking..." : "Check"}
				</button>
			 </div>
		  </section>

		  {status.error && (
			 <div className="alert alert-danger">{status.error}</div>
		  )}

		  {/* Order Details */}
		  {order && (
			 <section className="mt-3 px-4 py-4 order-details-section">
				<div className="mb-3 fs-5">
				  Order Number:
				  <span className="ms-2">{order.orderNumber}</span>
				</div>

				<div className="mb-3 fs-5">
				  Time: {order.time}
				</div>

				<div className="mb-3 fs-5">
				  Customer Name:
				  <span className="ms-2">{order.customerName}</span>
				</div>

				<div className="mb-4 fs-5">
				  Mobile Number:
				  <span className="ms-2">{order.mobileNumber}</span>
				</div>

			<div className="table-responsive">
				<table className="table table-bordered align-middle mb-3 cash-counter-table">
					 <thead>
						<tr>
						  <th style={{ width: 100 }}>Sr. No</th>
						  <th>Product Name</th>
						  <th style={{ width: 100 }}>Qty</th>
						  <th style={{ width: 120 }}>Price</th>
						</tr>
					 </thead>

					 <tbody>
						{order.items.map((item) => (
						  <tr key={item.srNo}>
							 <td className="text-center">{item.srNo}</td>
							 <td>{item.name}</td>
							 <td className="text-center">{item.qty}</td>
							 <td>{item.price}</td>
						  </tr>
						))}
					 </tbody>
				</table>
				<div className="d-flex justify-content-end">
					<table className="table table-light table-bordered mb-0 px-0 py-0 mt-0 rounded" style={{ width: 220 }}>
						<tbody>
							<tr>
								<td className="fw-semibold rounded p-1">Total</td>
								<td className="p-1">{total}</td>
							</tr>
						</tbody>
				</table>
				</div>
			</div>
		</section>
	)}

		  {/* Payment */}
		  {order && (
			 <section className="px-4 py-4 mt-3 d-flex flex-wrap justify-content-between align-items-center gap-3 payment-section">
				<div>
				  <div className="mb-2">
					 Select Payment Mode:
				  </div>

				  <div className="form-check">
					 <input
						id="payOnline"
						className="form-check-input"
						type="radio"
						name="paymentMode"
						value="ONLINE"
						checked={paymentMode === "ONLINE"}
						onChange={() => setPaymentMode("ONLINE")}
					 />

					 <label
						className="form-check-label"
						htmlFor="payOnline"
					 >
						Online / UPI
					 </label>
				  </div>

				  <div className="form-check">
					 <input
						id="payCash"
						className="form-check-input"
						type="radio"
						name="paymentMode"
						value="CASH"
						checked={paymentMode === "CASH"}
						onChange={() => setPaymentMode("CASH")}
					 />

					 <label
						className="form-check-label"
						htmlFor="payCash"
					 >
						Cash
					 </label>
				  </div>
				</div>

				<button
				  type="button"
				  className="btn btn-primary rounded-3 px-4"
				  onClick={handlePlaceOrder}
				  disabled={placing}
				>
				  {placing ? "Placing..." : "Place Order"}
				</button>
			 </section>
		  )}

		  {placedMessage && (
			 <div className="alert alert-success mt-4 mb-0">
				{placedMessage}
			 </div>
		  )}
		</div>
	 </div>
  );
}
