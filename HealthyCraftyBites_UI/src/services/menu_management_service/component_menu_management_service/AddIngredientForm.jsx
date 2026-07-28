import React from 'react';
import "../css_menu_management_service/AddIngredientFormCSS.css"

function AddIngredientForm() {
    return (
        <>
            <div className='AddIngredientForm'>
                <form className='IngredientForm p-4'>

                    <div className='formHeading mb-3'>
                        <h3>Enter The Detail To Add New Ingredient..</h3>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Enter Ingredient Name</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Select Ingredient Category</label>
                            <select className="form-select">
                                <option selected>Select Category</option>
                                <option>Vegetable</option>
                                <option>Bean</option>
                                <option>Protien-Portion</option>
                                <option>Sauce</option>
                                <option>Seasoning</option>
                                <option>Roll-Roti</option>
                                <option>Bread</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Select Ingredient Image</label>
                            <input type="file" className="form-control" accept=".png,.jpg,.jpeg" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Enter Ingredient Price</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Total Ingredient Calories</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Protein Count</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Fat Count</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label className="form-label">Carbohydrates Count</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Fiber Count</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <br></br>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" id="AddProductBtn" className="btn w-50">
                            ADD INGREDIENT
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default AddIngredientForm;