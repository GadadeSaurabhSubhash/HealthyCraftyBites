import { useEffect, useState } from "react";
import { viewAllProducts } from "../../../api/ViewAllProductsApi";
import "../css_menu_management_service/ManageProductAvailabilityCSS.css"
import {manageProductAvailabilityStatus} from "../../../api/ManageProductAvailabilityApi"
import {deleteProduct} from "../../../api/DeleteProductApi"

function ManageProductAvailability(){

    const[productData,setProductData] = useState([]);
    const[errorMessage,setErrorMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    // ----- Toast Message State -----
    const [toastResponseMessage, setToastResponseMessage] = useState("");
    const [showToast, setShowToast] = useState(false);


    useEffect(()=>{
        loadAllProducts();
    },[])

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowMessage(true);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    async function loadAllProducts(){
        try 
        {
            let response = await viewAllProducts();
            setProductData(response.data);
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


    //Change Product Availability Status
    async function changeAvailabililityStatus(productId,newAvailabilityStatus){
        try{
            const response = await manageProductAvailabilityStatus(productId,newAvailabilityStatus);
            setToastResponseMessage(response.message);
            setShowToast(true);
            {
                setTimeout(() => {
                    setShowToast(false);
                }, 10000)
            }
            loadAllProducts();
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

    //delete Product
    async function permanentlyDeleteProduct(productId){
        try{
            const response = await deleteProduct(productId);
            setToastResponseMessage(response.message);
            setShowToast(true);
            {
                setTimeout(() => {
                    setShowToast(false);
                }, 10000)
            }
            loadAllProducts();
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
            
            <div className="ManageProductAvailability p-4 d-flex justify-content-center">
                {
                    productData.length === 0
                    ? (
                        errorMessage
                        ? <>
                        
                        <h3 className="ErrorMessage mb-3 p-4">Opps! Something Went Wrong. Please Try Again!</h3>
                        
                        </>
                        : <>
                            {
                                showMessage && (
                                    <h3 className="DBEmptyMessage mb-3 p-4">Oops! There Is No Product To Display. Please Add The Product.</h3>
                                )
                            }               
                        </>
                        )
                        : (
                            <>
                                    <table className="ProductDataTable">
                                    <thead className="ProductDataTableHead">
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Product Category</th>
                                            <th>Current Availability Status</th>
                                            <th>Mark - OUT-OF-STOCK</th>
                                            <th>Mark - IN-STOCK</th>
                                            <th>Permanently Delete Product</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            productData.map(
                                                product =>(
                                                    <tr key={product.productId}>
                                                        <td><b>{product.name}</b></td>
                                                        <td>{product.category}</td>
                                                        <td>{product.availabilityStatus===1 ? "Available" : "Not Available"}</td>
                                                        <td><button className="Btn-1 px-3 py-1" onClick={()=>changeAvailabililityStatus(product.productId,0)}>Mark "OUT-OF-STOCK"</button></td>
                                                        <td><button className="Btn-2 px-3 py-1" onClick={()=>changeAvailabililityStatus(product.productId,1)}>Mark "IN-STOCK"</button></td>
                                                        <td><button className="Btn-3 px-3 py-1" onClick={()=>permanentlyDeleteProduct(product.productId)}>Delete Product</button></td>
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

export default ManageProductAvailability;