import React, { useState } from 'react';
import "../css_menu_management_service/AddIngredientFormCSS.css"
import { addIngredient } from '../../../api/AddIngredientApi';

function AddIngredientForm() {

    // ---- Field State ----
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientCategory, setIngredientCategory] = useState("");
    const [ingredientImage, setIngredientImage] = useState("");
    const [ingredientCalories, setIngredientCalories] = useState("");
    const [ingredientProtein, setIngredientProtein] = useState("");
    const [ingredientFat, setIngredientFat] = useState("");
    const [ingredientCarbohydrates, setIngredientCarbohydrates] = useState("");
    const [ingredientFiber, setIngredientFiber] = useState("");

    // ---- Error State ----
    const [ingredientNameError, setIngredientNameError] = useState("");
    const [ingredientCategoryError, setIngredientCategoryError] = useState("");
    const [ingredientImageError, setIngredientImageError] = useState("");
    const [ingredientCaloriesError, setIngredientCaloriesError] = useState("");
    const [ingredientProteinError, setIngredientProteinError] = useState("");
    const [ingredientFatError, setIngredientFatError] = useState("");
    const [ingredientCarbohydratesError, setIngredientCarbohydratesError] = useState("");
    const [ingredientFiberError, setIngredientFiberError] = useState("");

    // ----- Toast Message State -----
    const [toastResponseMessage, setToastResponseMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    // Shared regex for decimal(10,2) fields -> total 10 digits, 2 after decimal (so max 8 before decimal)
    const decimalRegex = /^\d{1,8}(\.\d{1,2})?$/;

    // ---- Ingredient Name Validation ----
    function validateIngredientName() {
        let trimmedName = ingredientName.trim();

        if (trimmedName === "") {
            setIngredientNameError("Ingredient name is required.");
            return false;
        }

        if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
            setIngredientNameError("Ingredient name must contain only characters.");
            return false;
        }

        setIngredientNameError("");
        return true;
    }

    // ---- Ingredient Category Validation ----
    function validateIngredientCategory() {
        if (ingredientCategory === "" || ingredientCategory === null) {
            setIngredientCategoryError("Please select an ingredient category.");
            return false;
        }

        setIngredientCategoryError("");
        return true;
    }

    // ---- Ingredient Image Validation ----
    function validateIngredientImage() {
        if (!ingredientImage) {
            setIngredientImageError("Ingredient image is required.");
            return false;
        }

        setIngredientImageError("");
        return true;
    }

    // ---- Ingredient Calories Validation ----
    function validateIngredientCalories() {
        let trimmedCalories = ingredientCalories.trim();

        if (trimmedCalories === "") {
            setIngredientCaloriesError("Total calories is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedCalories)) {
            setIngredientCaloriesError("Calories must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setIngredientCaloriesError("");
        return true;
    }

    // ---- Ingredient Protein Validation ----
    function validateIngredientProtein() {
        let trimmedProtein = ingredientProtein.trim();

        if (trimmedProtein === "") {
            setIngredientProteinError("Protein count is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedProtein)) {
            setIngredientProteinError("Protein must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setIngredientProteinError("");
        return true;
    }

    // ---- Ingredient Fat Validation ----
    function validateIngredientFat() {
        let trimmedFat = ingredientFat.trim();

        if (trimmedFat === "") {
            setIngredientFatError("Fat count is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedFat)) {
            setIngredientFatError("Fat must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setIngredientFatError("");
        return true;
    }

    // ---- Ingredient Carbohydrates Validation ----
    function validateIngredientCarbohydrates() {
        let trimmedCarbs = ingredientCarbohydrates.trim();

        if (trimmedCarbs === "") {
            setIngredientCarbohydratesError("Carbohydrates count is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedCarbs)) {
            setIngredientCarbohydratesError("Carbohydrates must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setIngredientCarbohydratesError("");
        return true;
    }

    // ---- Ingredient Fiber Validation ----
    function validateIngredientFiber() {
        let trimmedFiber = ingredientFiber.trim();

        if (trimmedFiber === "") {
            setIngredientFiberError("Fiber count is required.");
            return false;
        }

        if (!decimalRegex.test(trimmedFiber)) {
            setIngredientFiberError("Fiber must be numeric with up to 8 digits and 2 decimal places.");
            return false;
        }

        setIngredientFiberError("");
        return true;
    }

    // ---- Validate All Fields & Submit ----
    async function handleAddIngredient() {
        let isNameValid = validateIngredientName();
        let isCategoryValid = validateIngredientCategory();
        let isImageValid = validateIngredientImage();
        let isCaloriesValid = validateIngredientCalories();
        let isProteinValid = validateIngredientProtein();
        let isFatValid = validateIngredientFat();
        let isCarbohydratesValid = validateIngredientCarbohydrates();
        let isFiberValid = validateIngredientFiber();

        if (
            isNameValid &&
            isCategoryValid &&
            isImageValid &&
            isCaloriesValid &&
            isProteinValid &&
            isFatValid &&
            isCarbohydratesValid &&
            isFiberValid
        ) {
            let ingredient_to_add = {
                name: ingredientName,
                category: ingredientCategory,
                imgName: ingredientImage,
                calories: ingredientCalories,
                protein: ingredientProtein,
                carbohydrates: ingredientCarbohydrates,
                fat: ingredientFat,
                fiber: ingredientFiber,
                availabilityStatus:1
            };

            try 
            {
                const response = await addIngredient(ingredient_to_add);
                setToastResponseMessage(response.message)
                setShowToast(true);
                {
                    setTimeout(() => {
                        setShowToast(false);
                    }, 10000)
                }
            } 
            catch (error) 
            {
                if (error.response) 
                {
                    // Server responded with a status outside 2xx (e.g. 400, 500)
                    setToastResponseMessage(error.response.data.message);
                    setShowToast(true);
                    {
                        setTimeout(() => {
                            setShowToast(false);
                        }, 10000)
                    }
                } 
                else if (error.request) 
                {
                    // Request was sent but no response received (network/CORS/server down)
                    setToastResponseMessage(error.request);
                    setShowToast(true);
                    {
                       setTimeout(() => {
                       setShowToast(false);
                       }, 10000)
                    }
                } 
                else 
                {
                    // Something went wrong setting up the request
                    setToastResponseMessage(error.response.data.message);
                    setShowToast(true);
                    {
                       setTimeout(() => {
                       setShowToast(false);
                       }, 10000)
                    }
                }
            }
        }
    }

    return (
        <>
            {showToast && (
                <div className="toastBox">

                    <span>
                        {toastResponseMessage}
                    </span>

                    <button 
                        className='btn btn-danger'
                        onClick={() => setShowToast(false)}
                    >
                        X
                    </button>    
                </div>
            )}

            <div className='AddIngredientForm'>
                <form className='IngredientForm p-4'>

                    <div className='formHeading mb-3'>
                        <h3>Enter The Details To Add New Ingredient..</h3>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="ingredientName" className="form-label">Enter Ingredient Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredientName"
                                name="ingredientName"
                                value={ingredientName}
                                onChange={(e) => setIngredientName(e.target.value)}
                                onBlur={validateIngredientName}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForIngredientName">{ingredientNameError}</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="ingredientCategory" className="form-label">Select Ingredient Category</label>
                            <select
                                className="form-select"
                                id="ingredientCategory"
                                name="ingredientCategory"
                                value={ingredientCategory}
                                onChange={(e) => setIngredientCategory(e.target.value)}
                            >
                                <option value="" selected>Select Category</option>
                                <option value="Vegetable">Vegetable</option>
                                <option value="Bean">Bean</option>
                                <option value="Protien-Portion">Protien-Portion</option>
                                <option value="Sauce">Sauce</option>
                                <option value="Seasoning">Seasoning</option>
                                <option value="Roll-Roti">Roll-Roti</option>
                                <option value="Bread">Bread</option>
                            </select>
                            <div className="errorDisplayArea p-1" id="errorDisplayForIngredientCategory">{ingredientCategoryError}</div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="ingredientImage" className="form-label">Select Ingredient Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="ingredientImage"
                                name="ingredientImage"
                                accept=".png,.jpg,.jpeg"
                                onChange={(e) => setIngredientImage(e.target.files[0]?.name || "")}
                                onBlur={validateIngredientImage}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForIngredientImage">{ingredientImageError}</div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="ingredientCalories" className="form-label">Total Ingredient Calories</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredientCalories"
                                name="ingredientCalories"
                                value={ingredientCalories}
                                onChange={(e) => setIngredientCalories(e.target.value)}
                                onBlur={validateIngredientCalories}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForIngredientCalories">{ingredientCaloriesError}</div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="ingredientProtein" className="form-label">Protein Count</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredientProtein"
                                name="ingredientProtein"
                                value={ingredientProtein}
                                onChange={(e) => setIngredientProtein(e.target.value)}
                                onBlur={validateIngredientProtein}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForIngredientProtein">{ingredientProteinError}</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="ingredientFat" className="form-label">Fat Count</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredientFat"
                                name="ingredientFat"
                                value={ingredientFat}
                                onChange={(e) => setIngredientFat(e.target.value)}
                                onBlur={validateIngredientFat}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForIngredientFat">{ingredientFatError}</div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label htmlFor="ingredientCarbohydrates" className="form-label">Carbohydrates Count</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredientCarbohydrates"
                                name="ingredientCarbohydrates"
                                value={ingredientCarbohydrates}
                                onChange={(e) => setIngredientCarbohydrates(e.target.value)}
                                onBlur={validateIngredientCarbohydrates}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForIngredientCarbohydrates">{ingredientCarbohydratesError}</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="ingredientFiber" className="form-label">Fiber Count</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredientFiber"
                                name="ingredientFiber"
                                value={ingredientFiber}
                                onChange={(e) => setIngredientFiber(e.target.value)}
                                onBlur={validateIngredientFiber}
                            />
                            <div className="errorDisplayArea p-1" id="errorDisplayForIngredientFiber">{ingredientFiberError}</div>
                        </div>
                    </div>

                    <br></br>
                    <div className='d-flex justify-content-center'>
                        <button type="button" id="AddIngredientBtn" className="btn w-50" onClick={handleAddIngredient}>
                            ADD INGREDIENT
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default AddIngredientForm;
