import React from 'react';
import { Link } from 'react-router-dom';


/*
Not unsed anywhere, but can be used in future if needed.
*/

const CashCounterFeatureBar = () => {
  return (
    <>
      <div className="FeatureNavbar d-flex row">
        <div className="featurePanel1 px-3 py-2 d-flex justify-content-around">
            <div><Link to="/adminmanagerhome/addproduct" className="gold-link">View Transactions</Link></div>
            <div><Link to="/adminmanagerhome/addingredient" className="gold-link">View Orders</Link></div>
        </div>
      </div>
    </>
  )
}

export default CashCounterFeatureBar