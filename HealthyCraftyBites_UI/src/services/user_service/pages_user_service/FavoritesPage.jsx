import React, { useState, useEffect } from 'react';
import CustomerNavbar from '../../../common_components/CustomerNavbar';
import { getFavorites, removeFavorite } from '../../../api/UserApi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const username = localStorage.getItem('hcb_user') || 'Customer';

  useEffect(() => {
    async function loadFavs() {
      try {
        const res = await getFavorites(username);
        if (res.data && res.data.data) {
          setFavorites(res.data.data);
        }
      } catch (err) {
        setFavorites([
          { favoriteId: 1, itemName: "Avocado & Protein Power Salad", category: "Salad", price: 280 },
          { favoriteId: 2, itemName: "Multigrain Chicken Wrap", category: "Roll", price: 240 }
        ]);
      }
    }
    loadFavs();
  }, [username]);

  const handleRemove = async (favId) => {
    try {
      await removeFavorite(username, favId);
    } catch (e) {}
    setFavorites(prev => prev.filter(f => f.favoriteId !== favId));
  };

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('hcb_cart') || '[]');
    existingCart.push({
      cartItemId: Date.now(),
      productName: item.itemName,
      isCustomised: false,
      price: item.price,
      quantity: 1
    });
    localStorage.setItem('hcb_cart', JSON.stringify(existingCart));
    alert(`${item.itemName} added to Cart!`);
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="container py-4">
        <h2 className="fw-bold text-success mb-4">⭐ Your Saved Favorite Meals</h2>

        {favorites.length === 0 ? (
          <div className="card shadow-sm p-5 text-center rounded-4">
            <h5 className="text-muted">No favorite items saved yet!</h5>
          </div>
        ) : (
          <div className="row g-3">
            {favorites.map(fav => (
              <div key={fav.favoriteId} className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 rounded-4 p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold text-dark m-0">{fav.itemName}</h5>
                    <span className="badge bg-success">{fav.category}</span>
                  </div>
                  <div className="fs-5 fw-bold text-success mb-3">₹{fav.price}</div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm fw-bold flex-grow-1" onClick={() => handleAddToCart(fav)}>
                      🛒 Add to Cart
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemove(fav.favoriteId)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
