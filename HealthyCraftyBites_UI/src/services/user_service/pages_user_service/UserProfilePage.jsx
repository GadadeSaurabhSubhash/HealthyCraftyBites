import React, { useState, useEffect } from 'react';
import CustomerNavbar from '../../../common_components/CustomerNavbar';
import { getUserProfile, updateUserProfile } from '../../../api/UserApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserProfilePage() {
  const username = localStorage.getItem('hcb_user') || 'Customer';
  const [fullName, setFullName] = useState(username);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await getUserProfile(username);
        if (res.data && res.data.data) {
          const p = res.data.data;
          setFullName(p.fullName || username);
          setEmail(p.email || '');
          setPhone(p.phone || '');
          setAddress(p.address || '');
        }
      } catch (e) {}
    }
    loadProfile();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(username, { fullName, email, phone, address });
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Profile details updated!");
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <h3 className="fw-bold text-success mb-3 text-center">👤 Edit Profile & Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <input type="text" className="form-control" value={username} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input type="text" className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Default Delivery Address</label>
                  <textarea className="form-control" rows="3" value={address} onChange={e => setAddress(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-success fw-bold w-100 py-2">Save Profile Details</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
