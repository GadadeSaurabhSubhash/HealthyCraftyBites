import React from 'react';
import CustomerNavbar from './CustomerNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AboutUs() {
  return (
    <div>
      <CustomerNavbar />
      <div className="container py-5">
        <div className="card shadow-sm border-0 rounded-4 p-5 text-center">
          <h2 className="fw-bold text-success mb-3">🌱 About HealthyCraftyBites</h2>
          <p className="lead text-secondary">
            HealthyCraftyBites empowers diet-conscious individuals and fitness enthusiasts to build completely personalized healthy meals with dynamic real-time macronutrient tracking.
          </p>
          <div className="row g-4 mt-3">
            <div className="col-md-4">
              <div className="p-3 bg-light rounded-3">
                <h4>🥗 100% Customizable</h4>
                <p className="small text-muted">Build your own salads, sandwiches, and wraps choosing from fresh greens, high-protein portions, beans, and dressings.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded-3">
                <h4>📊 Dynamic Macro Tracking</h4>
                <p className="small text-muted">See real-time calculations for Calories, Protein, Carbs, Fat, and Fiber as you add ingredients.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded-3">
                <h4>⚡ Microservices Power</h4>
                <p className="small text-muted">Built on Spring Boot microservices, OpenFeign synchronous communication, and Apache Kafka asynchronous messaging.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
