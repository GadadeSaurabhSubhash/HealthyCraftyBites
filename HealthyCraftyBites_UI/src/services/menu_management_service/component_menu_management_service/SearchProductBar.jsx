import { useState } from "react";
import "../css_menu_management_service/SearchProductBarCSS.css"
import { getProduct } from "../../../api/GetTargetProductApi";

function SearchProductBar({targetProductToEdit, setTargetProductToEdit, setProductData, setToastResponseMessage, setShowToast, setCurrentProductData}){
    const [ProductNameError,setProductNameError] = useState("");
        

        function validateProductName(value) 
        {
            const Inputvalue = value;
            const trimmedName = Inputvalue.trim();

            if (trimmedName === "") {
                setProductNameError("Product name is required.");
                setTargetProductToEdit(value);
                return false;
            }

            if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
                setProductNameError("Product name must contain only letters.");
                setTargetProductToEdit(value);
                return false;
            }

            setProductNameError("");
            setTargetProductToEdit(value);
            return true;
       }

       async function checkTargetProduct()
       {
                let isValidProductName = validateProductName(targetProductToEdit);

                if(isValidProductName){
                try 
                        {
                            const response = await getProduct(targetProductToEdit);
                            setCurrentProductData(response.data)
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
                                setToastResponseMessage(error.message);
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
                                setToastResponseMessage(error.message);
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
                                setToastResponseMessage(error.message);
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
    
    return(
        <>
            <div className="SearchProductBar d-flex p-2 align-items-center">
                        <div className="d-flex align-items-center">
                            <div className="p-2">
                                <label className="LabelText">Enter Product Name To Edit : </label>
                            </div>
                            <div className="SearchBox p-2">
                                <input
                                    type="text"
                                    className="ProductNameInputBox px-3"
                                    id="productName"
                                    name="productName"
                                    value={targetProductToEdit}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setTargetProductToEdit(value);
                                        validateProductName(value);
                                    }}
                                />
                            </div>
                            <div className="p-2"> 
                                <button className="SearchBtn px-3 py-1" onClick={()=>checkTargetProduct()}>Search</button>
                            </div>
                        </div>    
            </div>
            <div className="ResultDisplay px-3">
                 {ProductNameError}
            </div>
        </>
    )
}
export default SearchProductBar;