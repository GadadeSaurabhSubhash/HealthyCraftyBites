import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { viewAllIngredients } from '../../../api/ViewAllIngredientsApi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

// Flat generic price for any customized product as per business rules
const FLAT_CUSTOMISATION_PRICE = 249.00;

const CATEGORY_LIMITS = {
  "Bread": 1,
  "Roll-Roti": 1,
  "Vegetable": 6,
  "Bean": 2,
  "Protein-Portion": 1,
  "Sauce": 4,
  "Seasoning": 2
};

export default function ProductCustomizer() {
  const navigate = useNavigate();
  const [mealType, setMealType] = useState('SALAD'); // SALAD, SANDWICH, ROLL
  const [ingredientsList, setIngredientsList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection state map: ingredientId -> count
  const [selectedCounts, setSelectedCounts] = useState({});

  useEffect(() => {
    async function loadIngredients() {
      setLoading(true);
      try {
        const res = await viewAllIngredients();
        let items = [];
        if (Array.isArray(res)) {
          items = res;
        } else if (res && Array.isArray(res.data)) {
          items = res.data;
        } else if (res && res.data && Array.isArray(res.data.data)) {
          items = res.data.data;
        }
        setIngredientsList(items);
      } catch (err) {
        console.error("Error fetching ingredients from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadIngredients();
  }, []);

  // Category display sequence based on meal type
  const categoryOrder = mealType === 'SALAD'
    ? ["Vegetable", "Bean", "Protein-Portion", "Sauce", "Seasoning"]
    : mealType === 'SANDWICH'
    ? ["Bread", "Vegetable", "Bean", "Protein-Portion", "Sauce", "Seasoning"]
    : ["Roll-Roti", "Vegetable", "Bean", "Protein-Portion", "Sauce", "Seasoning"];

  const getCategorySelectedCount = (cat) => {
    return ingredientsList
      .filter(ing => ing.category === cat)
      .reduce((sum, ing) => sum + (selectedCounts[ing.ingredientId] || 0), 0);
  };

  const handleAddIngredient = (ing) => {
    const cat = ing.category;
    const maxLimit = CATEGORY_LIMITS[cat] || 99;
    const currentCatCount = getCategorySelectedCount(cat);

    if (currentCatCount >= maxLimit) {
      alert(`Maximum limit of ${maxLimit} reached for ${cat}!`);
      return;
    }

    setSelectedCounts(prev => ({
      ...prev,
      [ing.ingredientId]: (prev[ing.ingredientId] || 0) + 1
    }));
  };

  const handleRemoveIngredient = (ing) => {
    setSelectedCounts(prev => {
      const current = prev[ing.ingredientId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[ing.ingredientId];
        return next;
      }
      return { ...prev, [ing.ingredientId]: current - 1 };
    });
  };

  // Compute aggregate real-time macros with FLAT ₹249 price
  const totals = Object.keys(selectedCounts).reduce((acc, ingId) => {
    const count = selectedCounts[ingId];
    const ing = ingredientsList.find(i => String(i.ingredientId) === String(ingId));
    if (ing) {
      acc.calories += (ing.calories || 0) * count;
      acc.protein += (ing.protein || 0) * count;
      acc.carbs += (ing.carbohydrates || 0) * count;
      acc.fat += (ing.fat || 0) * count;
      acc.fiber += (ing.fiber || 0) * count;
    }
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, price: FLAT_CUSTOMISATION_PRICE });

  // Dynamic Chart.js Pie Chart Data
  const pieData = {
    labels: ['Protein (g)', 'Carbs (g)', 'Fat (g)', 'Fiber (g)'],
    datasets: [{
      data: [
        totals.protein > 0 ? totals.protein : 1,
        totals.carbs > 0 ? totals.carbs : 1,
        totals.fat > 0 ? totals.fat : 1,
        totals.fiber > 0 ? totals.fiber : 1
      ],
      backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#17a2b8'],
      hoverOffset: 6
    }]
  };

  const handleAddToCart = () => {
    if (Object.keys(selectedCounts).length === 0) {
      alert("Please select at least one ingredient to build your meal!");
      return;
    }

    const customMealPayload = {
      mealType,
      selectedIngredients: Object.keys(selectedCounts).map(id => ({
        ingredient: ingredientsList.find(i => String(i.ingredientId) === String(id)),
        quantity: selectedCounts[id]
      })),
      totals
    };

    const existingCart = JSON.parse(localStorage.getItem('hcb_cart') || '[]');
    existingCart.push({
      cartItemId: Date.now(),
      productName: `Custom ${mealType.charAt(0) + mealType.slice(1).toLowerCase()} Craft`,
      isCustomised: true,
      price: FLAT_CUSTOMISATION_PRICE,
      quantity: 1,
      customisedProduct: customMealPayload
    });
    localStorage.setItem('hcb_cart', JSON.stringify(existingCart));

    alert(`Your Custom ${mealType} has been added to the Cart!`);
    navigate('/cart');
  };

  const handleAddToFavorites = async () => {
    const currentUser = localStorage.getItem('hcb_user');
    if (!currentUser) {
      alert("Please log in first to save items to your favorites!");
      return;
    }

    if (Object.keys(selectedCounts).length === 0) {
      alert("Please select at least one ingredient to save your meal!");
      return;
    }

    const favoriteData = {
      username: currentUser,
      productId: 888,
      productName: `Custom ${mealType.charAt(0) + mealType.slice(1).toLowerCase()} Craft`,
      isCustomised: true,
      price: FLAT_CUSTOMISATION_PRICE
    };

    const existingFavs = JSON.parse(localStorage.getItem('hcb_favorites') || '[]');
    existingFavs.push({ favoriteId: Date.now(), ...favoriteData });
    localStorage.setItem('hcb_favorites', JSON.stringify(existingFavs));
    alert("Saved to your Favorites!");
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* Header & Meal Type Selector */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-success">🥗 Craft Your Custom Healthy Meal</h2>
        <p className="text-muted mb-3">Select ingredients to build your meal. Flat Price: <span className="badge bg-success fs-6">₹{FLAT_CUSTOMISATION_PRICE}</span></p>
        
        <div className="btn-group btn-group-lg shadow-sm" role="group">
          <button
            type="button"
            className={`btn ${mealType === 'SALAD' ? 'btn-success fw-bold' : 'btn-outline-success'}`}
            onClick={() => { setMealType('SALAD'); setSelectedCounts({}); }}
          >
            🥗 Custom Salad
          </button>
          <button
            type="button"
            className={`btn ${mealType === 'SANDWICH' ? 'btn-success fw-bold' : 'btn-outline-success'}`}
            onClick={() => { setMealType('SANDWICH'); setSelectedCounts({}); }}
          >
            🥪 Custom Sandwich
          </button>
          <button
            type="button"
            className={`btn ${mealType === 'ROLL' ? 'btn-success fw-bold' : 'btn-outline-success'}`}
            onClick={() => { setMealType('ROLL'); setSelectedCounts({}); }}
          >
            🌯 Custom Roll / Wrap
          </button>
        </div>
      </div>

      <div className="row">
        {/* LEFT STICKY NUTRIENT TRACKER PANEL */}
        <div className="col-lg-3 col-md-4 mb-4">
          <div
            className="card shadow border-0 rounded-4 p-3 sticky-top"
            style={{ top: '20px', zIndex: 100, backgroundColor: '#ffffff' }}
          >
            <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
              📊 Real-Time Macro Tracker
            </h5>

            <div className="bg-light p-3 rounded-3 mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold">🔥 Calories:</span>
                <span className="badge bg-danger fs-6">{totals.calories.toFixed(0)} kcal</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>🥩 Protein:</span>
                <span className="fw-bold text-success">{totals.protein.toFixed(1)} g</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>🌾 Carbs:</span>
                <span className="fw-bold text-warning">{totals.carbs.toFixed(1)} g</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>🥑 Fats:</span>
                <span className="fw-bold text-danger">{totals.fat.toFixed(1)} g</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>🥦 Fiber:</span>
                <span className="fw-bold text-info">{totals.fiber.toFixed(1)} g</span>
              </div>
            </div>

            {/* Dynamic Chart.js Pie Chart */}
            <div style={{ maxHeight: '180px' }} className="d-flex justify-content-center mb-3">
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } } }} />
            </div>

            <div className="border-top pt-2 mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fs-5 fw-bold">Fixed Custom Price:</span>
                <span className="fs-4 fw-bold text-success">₹{FLAT_CUSTOMISATION_PRICE.toFixed(2)}</span>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button
                className="btn btn-warning btn-lg w-100 fw-bold shadow-sm"
                style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
                onClick={handleAddToCart}
              >
                🛒 ADD TO CART
              </button>
              <button
                className="btn btn-outline-success fw-bold"
                onClick={handleAddToFavorites}
              >
                ⭐ Save to Favourites
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: CATEGORY-WISE INGREDIENT CARDS */}
        <div className="col-lg-9 col-md-8">
          {categoryOrder.map((cat, idx) => {
            const catIngredients = ingredientsList.filter(ing => ing.category === cat);
            const currentCatCount = getCategorySelectedCount(cat);
            const maxLimit = CATEGORY_LIMITS[cat] || 99;

            return (
              <div key={cat} className="card shadow-sm border-0 rounded-4 p-4 mb-4" style={{ backgroundColor: '#ffffff' }}>
                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                  <h4 className="fw-bold text-dark m-0">
                    Step {idx + 1}: Select {cat}
                  </h4>
                  <span className={`badge ${currentCatCount === maxLimit ? 'bg-danger' : 'bg-primary'} fs-6`}>
                    Selected: {currentCatCount} / Max {maxLimit}
                  </span>
                </div>

                <div className="row g-3">
                  {catIngredients.map(ing => {
                    const count = selectedCounts[ing.ingredientId] || 0;
                    const isSelected = count > 0;

                    return (
                      <div key={ing.ingredientId} className="col-xl-3 col-lg-4 col-md-6">
                        <div
                          className="card h-100 rounded-4 overflow-hidden position-relative"
                          style={{
                            border: isSelected ? '3px solid #ffd700' : '1px solid #dee2e6',
                            boxShadow: isSelected ? '0 0 15px rgba(255, 215, 0, 0.6)' : '0 2px 5px rgba(0,0,0,0.05)',
                            backgroundColor: isSelected ? '#fffdf0' : '#ffffff'
                          }}
                        >
                          {isSelected && (
                            <span className="position-absolute top-0 end-0 badge rounded-pill bg-warning text-dark m-2 shadow fs-6 fw-bold" style={{ zIndex: 5 }}>
                              {count}x
                            </span>
                          )}

                          {/* Ingredient Image Display from Public folder */}
                          <div className="text-center p-3 bg-light">
                            <img
                              src={`/${ing.imgName}`}
                              alt={ing.name}
                              className="img-fluid rounded-3"
                              style={{ height: '90px', objectFit: 'contain' }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/healthy_crafty_bites_logo.png';
                              }}
                            />
                          </div>

                          <div className="p-3 text-center flex-grow-1">
                            <h6 className="fw-bold mb-2 text-dark">{ing.name}</h6>

                            {/* Clean Nutrition Summary Details displayed inside Card Body without obscuring + Add button */}
                            <div className="bg-light p-2 rounded-3 text-muted small" style={{ fontSize: '0.75rem' }}>
                              <div>🔥 {ing.calories || 0} kcal | 🥩 P: {ing.protein || 0}g</div>
                              <div>🌾 C: {ing.carbohydrates || 0}g | 🥑 F: {ing.fat || 0}g</div>
                            </div>
                          </div>

                          {/* Card Footer Action Buttons (+ Add / -) ALWAYS 100% VISIBLE & CLICKABLE */}
                          <div className="card-footer bg-transparent border-0 p-2 text-center" style={{ zIndex: 10 }}>
                            {isSelected ? (
                              <div className="btn-group btn-group-sm w-100 shadow-sm">
                                <button className="btn btn-outline-danger fw-bold" onClick={() => handleRemoveIngredient(ing)}>-</button>
                                <button className="btn btn-warning fw-bold text-dark" disabled>{count}</button>
                                <button className="btn btn-outline-success fw-bold" onClick={() => handleAddIngredient(ing)}>+</button>
                              </div>
                            ) : (
                              <button
                                className="btn btn-sm btn-outline-success w-100 fw-bold shadow-sm py-2"
                                onClick={() => handleAddIngredient(ing)}
                              >
                                + Add
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
