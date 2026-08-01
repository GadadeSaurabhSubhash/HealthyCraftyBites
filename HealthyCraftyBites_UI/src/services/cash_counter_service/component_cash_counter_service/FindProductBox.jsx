import React from 'react';

function FindProductBox({ orderNo, onChange, onCheck, loading }) {
  return (
    <div className="search-section">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Enter Order Number"
          value={orderNo}
          onChange={onChange}
          onKeyDown={(e) => e.key === 'Enter' && onCheck()}
        />

        <span className="empty-block" aria-hidden="true" />

        <button
          onClick={onCheck}
          disabled={loading}
          className="check-btn inside"
          aria-label="Check Order"
        >
          {loading ? 'Searching...' : 'Check'}
        </button>
      </div>
    </div>
  );
}

export default FindProductBox;
