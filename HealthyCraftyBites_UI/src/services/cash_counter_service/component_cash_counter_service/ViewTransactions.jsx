import React, { useState, useEffect } from 'react';
import { fetchTransactionsByFilter } from './../../../api/ViewAllTransactionAPI'; 
import OrderDetailsDisplayBox from './OrderDetailsDisplayBox';
import '../css_cash_counter_service/ViewTransactionsCSS.css';

function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all'); 
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);


  const loadTransactionsData = async (mode) => {
    setLoading(true);
    try {
      const data = await fetchTransactionsByFilter(mode);
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load records from database:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactionsData('all');
  }, []);

  const handleFilterClick = (mode) => {
    setSelectedFilter(mode);
    setSelectedOrder(null); 
    loadTransactionsData(mode);
  };

  return (
    <div className="form-container">
      <h3>Transaction History Records</h3>

      {}
      <div className="button-group" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          className={`btn ${selectedFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleFilterClick('all')}
        >
          📁 All Transactions
        </button>
        <button 
          className={`btn ${selectedFilter === 'cash' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleFilterClick('cash')}
        >
          💵 Cash Transactions
        </button>
        <button 
          className={`btn ${selectedFilter === 'online' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleFilterClick('online')}
        >
          🌐 Online Transactions
        </button>
      </div>

      {loading ? (
        <p>Fetching records from the database...</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          
          {/* Main List Table */}
          <table className="form-table" style={{ flex: 1 }}>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Mode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.orderNumber}>
                  <td>{txn.orderNumber}</td>
                  <td>{txn.customerName}</td>
                  <td>{txn.date}</td>
                  <td><span className="badge">{txn.paymentMode}</span></td>
                  <td>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => setSelectedOrder(txn)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No {selectedFilter !== 'all' ? selectedFilter : ''} transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Side Drawer Display Box for Order Preview */}
          {selectedOrder && (
            <div style={{ flex: 1, background: '#f9f9f9', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '10px' }}>
                <h4>Details for #{selectedOrder.orderNumber}</h4>
                <button className="btn btn-close" onClick={() => setSelectedOrder(null)}>✕</button>
              </div>
              <OrderDetailsDisplayBox 
                order={selectedOrder}
                paymentMode={selectedOrder.paymentMode}
                calculateTotal={() => selectedOrder.items?.reduce((sum, i) => sum + (i.qty * i.price), 0) || 0}
                calculateQtyTotal={() => selectedOrder.items?.reduce((sum, i) => sum + i.qty, 0) || 0}
              />
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default ViewTransactions;

