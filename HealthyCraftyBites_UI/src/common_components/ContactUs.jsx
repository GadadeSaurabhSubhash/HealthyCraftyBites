import React from 'react';
import CustomerNavbar from './CustomerNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ContactUs() {
  return (
    <div>
      <CustomerNavbar />
      <div className="container py-5">
        <div className="card shadow-sm border-0 rounded-4 p-5">
          <h2 className="fw-bold text-success mb-3 text-center">📞 Contact HealthyCraftyBites</h2>
          <div className="row g-4 mt-2">
            <div className="col-md-6">
              <h5>📍 Store Locations</h5>
              <p>• Deccan Gymkhana Branch, Pune</p>
              <p>• Katraj Branch, Pune</p>
              <h5 className="mt-4">✉️ Customer Support</h5>
              <p>Email: support@healthycraftybites.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
            <div className="col-md-6">
              <form onSubmit={e => { e.preventDefault(); alert("Thank you for contacting us!"); }}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Name</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Message</label>
                  <textarea className="form-control" rows="3" required></textarea>
                </div>
                <button type="submit" className="btn btn-success fw-bold w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
