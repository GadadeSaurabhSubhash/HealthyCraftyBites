import React, { useState } from 'react';
import "../css_menu_management_service/AddProductFormCSS.css"
import { addProduct } from '../../../api/AddProductApi';

function AddProductForm() {

    // ---- Field State ----
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productTag, setProductTag] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [productPrice, setProductPrice] = useState("");
    const [productCalories, setProductCalories] = useState("");
    const [productProtein, setProductProtein] = useState("");
    const [productFat, setProductFat] = useState("");
    const [productCarbohydrates, setProductCarbohydrates] = useState("");
    const [productFiber, setProductFiber] = useState("");

    // ---- Error State ----
    const [productNameError, setProductNameError] = useState("");
    const [productCategoryError, setProductCategoryError] = useState("");
    const [productDescriptionError, setProductDescriptionError] = useState("");
    const [productTagError, setProductTagError] = useState("");
    const [productImageError, setProductImageError] = useState("");
    const [productPriceError, setProductPriceError] = useState("");
    const [productCaloriesError, setProductCaloriesError] = useState("");
    const [productProteinError, setProductProteinError] = useState("");
    const [productFatError, setProductFatError] = useState("");
    const [productCarbohydratesError, setProductCarbohydratesError] = useState("");
    const [productFiberError, setProductFiberError] = useState("");

    // Shared regex for decimal(10,2) fields -> total 10 digits, 2 after decimal (so max 8 before decimal)
    const decimalRegex = /^\d{1,8}(\.\d{1,2})?$/;

    // ---- Product Name Validation ----
    function validateProductName() {
        let trimmedName = productName.trim();

        if (trimmedName === "") {
            setProductNameError("Product name is required.");
            return false;
        }

        if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
            setProductNameError("Product name must contain only characters.");
            return false;
        }

        setProductNameError("");
        return true;
    }

    // ---- Product Category Validation ----
    function validateProductCategory() {
        if (productCategory === "" || productCategory === null) {
            setProductCategoryError("Please select a product category.");
            return false;
        }

        setProductCategoryError("");
        return true;
    }

    // ---- Product Description Validation ----
    function validateProductDescription() {
        let trimmedDescription = productDescription.trim();

        if (trimmedDescription === "") {
            setProductDescriptionError("Product description is required.");
            return false;
        }

        setProductDescriptionError("");
        return true;
    }

    // ---- Product Tag Validation ----
    function validateProductTag() {
        let trimmedTag = productTag.trim();

        if (trimmedTag === "") {
            setProductTagError("Product tag is required.");
            return false;
        }

        setProductTagError("");
        return true;
    }

    // ---- Product Image Validation ----
    function validateProductImage() {
        if (!productImage) {
            setProductImageError("Product image is required.");
            return false;
        }

        setProductImageError("");
        return true;
    }

    // ---- Product Price Validation ----
    function validateProductPrice() {
        let trimmedPrice = productPrice.trim();

        if (trimmedPrice === "") {
            setProductPriceError("Product price is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedPrice)) {
            setProductPriceError("Price must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setProductPriceError("");
        return true;
    }

    // ---- Product Calories Validation ----
    function validateProductCalories() {
        let trimmedCalories = productCalories.trim();

        if (trimmedCalories === "") {
            setProductCaloriesError("Total calories is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedCalories)) {
            setProductCaloriesError("Calories must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setProductCaloriesError("");
        return true;
    }

    // ---- Product Protein Validation ----
    function validateProductProtein() {
        let trimmedProtein = productProtein.trim();

        if (trimmedProtein === "") {
            setProductProteinError("Protein count is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedProtein)) {
            setProductProteinError("Protein must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setProductProteinError("");
        return true;
    }

    // ---- Product Fat Validation ----
    function validateProductFat() {
        let trimmedFat = productFat.trim();

        if (trimmedFat === "") {
            setProductFatError("Fat count is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedFat)) {
            setProductFatError("Fat must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setProductFatError("");
        return true;
    }

    // ---- Product Carbohydrates Validation ----
    function validateProductCarbohydrates() {
        let trimmedCarbs = productCarbohydrates.trim();

        if (trimmedCarbs === "") {
            setProductCarbohydratesError("Carbohydrates count is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedCarbs)) {
            setProductCarbohydratesError("Carbohydrates must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setProductCarbohydratesError("");
        return true;
    }

    // ---- Product Fiber Validation ----
    function validateProductFiber() {
        let trimmedFiber = productFiber.trim();

        if (trimmedFiber === "") {
            setProductFiberError("Fiber count is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedFiber)) {
            setProductFiberError("Fiber must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setProductFiberError("");
        return true;
    }

    // ---- Validate All Fields & Submit ----
    async function handleAddProduct() {
        let isNameValid = validateProductName();
        let isCategoryValid = validateProductCategory();
        let isDescriptionValid = validateProductDescription();
        let isTagValid = validateProductTag();
        let isImageValid = validateProductImage();
        let isPriceValid = validateProductPrice();
        let isCaloriesValid = validateProductCalories();
        let isProteinValid = validateProductProtein();
        let isFatValid = validateProductFat();
        let isCarbohydratesValid = validateProductCarbohydrates();
        let isFiberValid = validateProductFiber();

        if (
            isNameValid &&
            isCategoryValid &&
            isDescriptionValid &&
            isTagValid &&
            isImageValid &&
            isPriceValid &&
            isCaloriesValid &&
            isProteinValid &&
            isFatValid &&
            isCarbohydratesValid &&
            isFiberValid
        ) {
            let product_to_add = {
                name: productName,
                category: productCategory,
                description: productDescription,
                tag: productTag,
                imgName: productImage,
                price: productPrice,
                calories: productCalories,
                protein: productProtein,
                carbohydrates: productCarbohydrates,
                fat: productFat,
                fiber: productFiber,
                availabilityStatus:1
            };

            try 
            {
                const response = await addProduct(product_to_add);
                console.log(response);
            } 
            catch (error) 
            {
                if (error.response) {
                    // Server responded with a status outside 2xx (e.g. 400, 500)
                    console.log("Add Product Failed - Server Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    // Request was sent but no response received (network/CORS/server down)
                    console.log("Add Product Failed - No Response:", error.request);
                } else {
                    // Something went wrong setting up the request
                    console.log("Add Product Failed - Request Error:", error.message);
                }
            }
            
        }
    }

    return (
        <>
            <div className='AddProductForm'>
                <form className='ProductForm p-4'>

                    <div className='formHeading mb-3'>
                        <h3>Enter The Details To Add New Product..</h3>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="productName" className="form-label">Enter Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productName"
                                name="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                onBlur={validateProductName}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForProductName">{productNameError}</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="productCategory" className="form-label">Select Product Category</label>
                            <select
                                className="form-select"
                                id="productCategory"
                                name="productCategory"
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            >
                                <option value="" selected>Select Category</option>
                                <option value="Salad">Salad</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Roll">Roll</option>
                                <option value="Beverage">Beverage</option>
                            </select>
                            <div className="errorDisplayArea p-1" id="errorDisplayForProductCategory">{productCategoryError}</div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label">Enter Product Description</label>
                        <textarea
                            className="form-control"
                            id="productDescription"
                            name="productDescription"
                            rows="5"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            onBlur={validateProductDescription}
                        ></textarea>
                        <div className="errorDisplayArea p-1" id="errorDisplayForProductDescription">{productDescriptionError}</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="productTag" className="form-label">Enter Product Tag</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productTag"
                                name="productTag"
                                value={productTag}
                                onChange={(e) => setProductTag(e.target.value)}
                                onBlur={validateProductTag}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForProductTag">{productTagError}</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="productImage" className="form-label">Select Product Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="productImage"
                                name="productImage"
                                accept=".png,.jpg,.jpeg"
                                onChange={(e) => setProductImage(e.target.files[0]?.name || "")}
                                onBlur={validateProductImage}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForProductImage">{productImageError}</div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="productPrice" className="form-label">Enter Product Price</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productPrice"
                                name="productPrice"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                onBlur={validateProductPrice}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForProductPrice">{productPriceError}</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="productCalories" className="form-label">Total Product Calories</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productCalories"
                                name="productCalories"
                                value={productCalories}
                                onChange={(e) => setProductCalories(e.target.value)}
                                onBlur={validateProductCalories}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForProductCalories">{productCaloriesError}</div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="productProtein" className="form-label">Protein Count</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productProtein"
                                name="productProtein"
                                value={productProtein}
                                onChange={(e) => setProductProtein(e.target.value)}
                                onBlur={validateProductProtein}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForProductProtein">{productProteinError}</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="productFat" className="form-label">Fat Count</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productFat"
                                name="productFat"
                                value={productFat}
                                onChange={(e) => setProductFat(e.target.value)}
                                onBlur={validateProductFat}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForProductFat">{productFatError}</div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label htmlFor="productCarbohydrates" className="form-label">Carbohydrates Count</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productCarbohydrates"
                                name="productCarbohydrates"
                                value={productCarbohydrates}
                                onChange={(e) => setProductCarbohydrates(e.target.value)}
                                onBlur={validateProductCarbohydrates}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForProductCarbohydrates">{productCarbohydratesError}</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="productFiber" className="form-label">Fiber Count</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productFiber"
                                name="productFiber"
                                value={productFiber}
                                onChange={(e) => setProductFiber(e.target.value)}
                                onBlur={validateProductFiber}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForProductFiber">{productFiberError}</div>
                        </div>
                    </div>

                    <br></br>
                    <div className='d-flex justify-content-center'>
                        <button type="button" id="AddProductBtn" className="btn w-50" onClick={handleAddProduct}>
                            ADD PRODUCT
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default AddProductForm;
