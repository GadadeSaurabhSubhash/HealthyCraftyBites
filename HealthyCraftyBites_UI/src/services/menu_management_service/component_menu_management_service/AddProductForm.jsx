import React from 'react';
import "../css_menu_management_service/AddProductFormCSS.css"

function AddProductForm() {
    return (
        <>
            <div className='AddProductForm'>
                <form className='ProductForm p-4'>

                    <div className='formHeading mb-3'>
                        <h3>Enter The Details To Add New Product..</h3>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Enter Product Name</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Select Product Category</label>
                            <select className="form-select">
                                <option selected>Select Category</option>
                                <option>Salad</option>
                                <option>Sandwich</option>
                                <option>Roll</option>
                                <option>Beverage</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Enter Product Description</label>
                        <textarea className="form-control" rows="5"></textarea>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Enter Product Tag</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Select Product Image</label>
                            <input type="file" className="form-control" accept=".png,.jpg,.jpeg" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Enter Product Price</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Total Product Calories</label>
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
                            ADD PRODUCT
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default AddProductForm;