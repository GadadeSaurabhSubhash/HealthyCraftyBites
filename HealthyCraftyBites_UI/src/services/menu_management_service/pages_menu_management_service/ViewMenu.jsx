import { useState } from "react";
import CustomisationOptionBar from "../component_menu_management_service/CustomisationOptionBar";
import MenuCategoryBar from "../component_menu_management_service/MenuCategoryBar";
import "../css_menu_management_service/ViewMenuCSS.css";
import Navbar from "../../../layout_pages/layout_pages_components/Navbar";
import DisplayProductSection from "../component_menu_management_service/DisplayProductsSection";
import { viewAllProducts } from "../../../api/ViewAllProductsApi";
import { useEffect } from "react";

function ViewMenu() {

    const [productData, setProductData] = useState([]);
    const [filteredProductData, setFilteredProductData] = useState([]);
    const [dataCategorySelected, setDataCategorySelected] = useState("Salad");
    const [ErrorMessage,setErrorMessage] = useState("");


     useEffect(()=>{
            loadAllProducts();
    },[])
    //GET ALL PRODUCTS
    async function loadAllProducts(){
            try 
            {
                let response = await viewAllProducts();
                setProductData(response.data);

                const AvailableProducts = response.data.filter(
                (product) => product.availabilityStatus === 1
                );

                setProductData(AvailableProducts);

                const saladProducts = response.data.filter(
                (product) => product.category === "Salads"
                );

                setFilteredProductData(saladProducts);
                
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



    return (
        <div className="ViewMenu">
            <div className="px-3 py-2">
                <Navbar />
            </div>

            <MenuCategoryBar
                dataCategorySelected={dataCategorySelected}
                setDataCategorySelected={setDataCategorySelected}
            />

            <CustomisationOptionBar/>

            <DisplayProductSection
                productData={productData}
                setProductData={setProductData}
                filteredProductData={filteredProductData}
                setFilteredProductData={setFilteredProductData}
                errorMessage={ErrorMessage}
                dataCategorySelected={dataCategorySelected}
            />
        </div>
    );
}

export default ViewMenu;