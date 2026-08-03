import { useEffect, useState } from "react";
import { viewAllIngredients } from "../../../api/ViewAllIngredientsApi";
import "../css_menu_management_service/ManageIngredientAvailabilityCSS.css"
import {manageIngredientAvailabilityStatus} from "../../../api/ManageIngredientAvailabilityApi"
import {deleteIngredient} from "../../../api/DeleteIngredientApi"

function ManageIngredientAvailability(){

    const[ingredientData,setIngredientData] = useState([]);
    const[errorMessage,setErrorMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    // ----- Toast Message State -----
    const [toastResponseMessage, setToastResponseMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    // ------------- Sorted Items State ---------------------
    const [SortedIngredientList, setSortedIngredientList] = useState([]);

    function sortList(category){
        if(category==="All")
        {
            setSortedIngredientList([...ingredientData]);
        }
        else
        {
            setSortedIngredientList(
                ingredientData.filter(ingredient => ingredient.category === category)
            );
        }                                                                              
    }

    useEffect(()=>{
        loadAllIngredients();
    },[])

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowMessage(true);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    async function loadAllIngredients(){
        try 
        {
            let response = await viewAllIngredients();
            setIngredientData(response.data);
            setSortedIngredientList(response.data);
        } 
        catch (error) 
        {
            if (error.response) 
            {
                setErrorMessage(error.response.data.message);
            } 
            else if (error.request) 
            {
                // Request was sent but no response received (network/CORS/server down)
                setErrorMessage(error.request);
            } 
            else 
            {
                // Something went wrong setting up the request
                setErrorMessage(error.response.data.message);
                            
            }
        }
    }


    //Change Ingredient Availability Status
    async function changeAvailabililityStatus(ingredientId,newAvailabilityStatus){
        try{
            const response = await manageIngredientAvailabilityStatus(ingredientId,newAvailabilityStatus);
            setToastResponseMessage(response.message);
            setShowToast(true);
            {
                setTimeout(() => {
                    setShowToast(false);
                }, 10000)
            }
            loadAllIngredients();
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
                    setToastResponseMessage(error.response);
                    setShowToast(true);
                    {
                       setTimeout(() => {
                       setShowToast(false);
                       }, 10000)
                    }
            }
        }
    }

    //delete Ingredient
    async function permanentlyDeleteIngredient(ingredientId){
        try{
            const response = await deleteIngredient(ingredientId);
            setToastResponseMessage(response.message);
            setShowToast(true);
            {
                setTimeout(() => {
                    setShowToast(false);
                }, 10000)
            }
            loadAllIngredients();
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
                    setToastResponseMessage(error.response);
                    setShowToast(true);
                    {
                       setTimeout(() => {
                       setShowToast(false);
                       }, 10000)
                    }
            }
        }
    }

    
    
    return(
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
            
            <div className="ManageIngredientAvailability p-4 d-flex row justify-content-center">
                {
                    ingredientData.length === 0
                    ? (
                        errorMessage
                        ? <>
                        
                        <h3 className="ErrorMessage mb-3 p-4">Opps! Something Went Wrong. Please Try Again!</h3>
                        
                        </>
                        : <>
                            {
                                showMessage && (
                                    <h3 className="DBEmptyMessage mb-3 p-4">Oops! There Is No Ingredient To Display. Please Add The Ingredient.</h3>
                                )
                            }               
                        </>
                        )
                        : (
                            <>
                                    <div className="SortOption mb-3 p-2 d-flex justify-content-start">
                                        <div>
                                            <p>Sort By :</p>
                                        </div>
                                        <div className=" px-2">
                                            <select className="CategoryBox"
                                                onChange={(e)=>{
                                                            const value = e.target.value;
                                                            sortList(value);
                                                        }
                                                }
                                            >
                                                <option value="All">All Categories</option>
                                                <option value="Vegetable">Vegetable</option>
                                                <option value="Bean">Bean</option>
                                                <option value="Protien-Portion">Protien-Portion</option>
                                                <option value="Sauce">Sauce</option>
                                                <option value="Seasoning">Seasoning</option>
                                                <option value="Roll-Roti">Roll-Roti</option>
                                                <option value="Bread">Bread</option>
                                            </select>
                                        </div>
                                    </div>

                                    <table className="IngredientDataTable">
                                    <thead className="IngredientDataTableHead">
                                        <tr>
                                            <th>Ingredient Name</th>
                                            <th>Ingredient Category</th>
                                            <th>Current Availability Status</th>
                                            <th>Mark - OUT-OF-STOCK</th>
                                            <th>Mark - IN-STOCK</th>
                                            <th>Permanently Delete Ingredient</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            SortedIngredientList.map(
                                                ingredient =>(
                                                    <tr key={ingredient.ingredientId}>
                                                        <td><b>{ingredient.name}</b></td>
                                                        <td>{ingredient.category}</td>
                                                        <td>{ingredient.availabilityStatus===1 ? "Available" : "Not Available"}</td>
                                                        <td><button className="Btn-1 px-3 py-1" onClick={()=>changeAvailabililityStatus(ingredient.ingredientId,0)}>Mark "OUT-OF-STOCK"</button></td>
                                                        <td><button className="Btn-2 px-3 py-1" onClick={()=>changeAvailabililityStatus(ingredient.ingredientId,1)}>Mark "IN-STOCK"</button></td>
                                                        <td><button className="Btn-3 px-3 py-1" onClick={()=>permanentlyDeleteIngredient(ingredient.ingredientId)}>Delete Ingredient</button></td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>   
                            </>
                        )
                }
            </div>
        </>
    )
}

export default ManageIngredientAvailability;
