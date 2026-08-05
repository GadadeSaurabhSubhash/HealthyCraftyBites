import { useState } from "react";
import "../css_menu_management_service/SearchIngredientBarCSS.css";
import { getIngredient } from "../../../api/GetTargetIngredientApi";

function SearchIngredientBar({
    targetIngredientToEdit,
    setTargetIngredientToEdit,
    setIngredientData,
    setToastResponseMessage,
    setShowToast,
    setCurrentIngredientData
}) {
    const [IngredientNameError, setIngredientNameError] = useState("");

    function validateIngredientName(value) {
        const Inputvalue = value;
        const trimmedName = Inputvalue.trim();

        if (trimmedName === "") {
            setIngredientNameError("Ingredient name is required.");
            setTargetIngredientToEdit(value);
            return false;
        }

        if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
            setIngredientNameError("Ingredient name must contain only letters.");
            setTargetIngredientToEdit(value);
            return false;
        }

        setIngredientNameError("");
        setTargetIngredientToEdit(value);
        return true;
    }

    async function checkTargetIngredient() {
        let isValidIngredientName = validateIngredientName(targetIngredientToEdit);

        if (isValidIngredientName) {
            try {
                const response = await getIngredient(targetIngredientToEdit);
                setCurrentIngredientData(response.data);
                setToastResponseMessage(response.message);
                setShowToast(true);

                setTimeout(() => {
                    setShowToast(false);
                }, 10000);
            } catch (error) {
                if (error.response) {
                    setToastResponseMessage(error.response.message);
                    setShowToast(true);

                    setTimeout(() => {
                        setShowToast(false);
                    }, 10000);
                } else if (error.request) {
                    setToastResponseMessage(error.request.message);
                    setShowToast(true);

                    setTimeout(() => {
                        setShowToast(false);
                    }, 10000);
                } else {
                    setToastResponseMessage(error.message);
                    setShowToast(true);

                    setTimeout(() => {
                        setShowToast(false);
                    }, 10000);
                }
            }
        }
    }

    return (
        <>
            <div className="SearchIngredientBar d-flex p-2 align-items-center">
                <div className="d-flex align-items-center">
                    <div className="p-2">
                        <label className="LabelText">
                            Enter Ingredient Name To Edit :
                        </label>
                    </div>

                    <div className="SearchBox p-2">
                        <input
                            type="text"
                            className="IngredientNameInputBox px-3"
                            id="ingredientName"
                            name="ingredientName"
                            value={targetIngredientToEdit}
                            onChange={(e) => {
                                const value = e.target.value;
                                setTargetIngredientToEdit(value);
                                validateIngredientName(value);
                            }}
                        />
                    </div>

                    <div className="p-2">
                        <button
                            className="SearchBtn px-3 py-1"
                            onClick={() => checkTargetIngredient()}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="ResultDisplay px-3">
                {IngredientNameError}
            </div>
        </>
    );
}

export default SearchIngredientBar;