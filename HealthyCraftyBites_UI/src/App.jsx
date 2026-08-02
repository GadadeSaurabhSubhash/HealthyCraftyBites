import Home from "./layout_pages/home_page/Home";
import AdminManagerHome from "./layout_pages/admin_manager/AdminManagerHome";
import AdminLogin from "./services/authentication_service/pages_authentication_service/AdminLogin"
import AddProductForm from "./services/menu_management_service/component_menu_management_service/AddProductForm"
import AddIngredientForm from "./services/menu_management_service/component_menu_management_service/AddIngredientForm";
import ManageProductAvailability from "./services/menu_management_service/component_menu_management_service/ManageProductAvailability";
import ManageIngredientAvailability from "./services/menu_management_service/component_menu_management_service/ManageIngredientAvailability";
import EditProduct from "./services/menu_management_service/component_menu_management_service/EditProduct"
import { Routes, Route } from "react-router-dom";
import EditIngredient from "./services/menu_management_service/component_menu_management_service/EditIngredient";
import ChangeAdminPassword from "./services/authentication_service/component_authentication_service/ChangeAdminPassword";


function App() {

  return (
    <>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
               <Route path="/adminmanagerhome" element={<AdminManagerHome />}>
                  <Route path="addproduct" element={<AddProductForm />} />
                  <Route path="addingredient" element={<AddIngredientForm />} />
                  <Route path="manageproductsavailability" element={<ManageProductAvailability />} />
                  <Route path="manageingredientsavailability" element={<ManageIngredientAvailability />} />
                  <Route path="editproduct" element={<EditProduct />} />
                  <Route path="editingredient" element={<EditIngredient />} />
                  <Route path="changeadminpassword" element={<ChangeAdminPassword />} />
               </Route>
        </Routes>
    </>
  )
}

export default App
