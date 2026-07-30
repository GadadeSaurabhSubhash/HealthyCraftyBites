import AdminManagerHome from "./layout_pages/admin_manager/AdminManagerHome";
import AdminCashCounterHome from "./layout_pages/admin_cash_counter/AdminCashCounterHome";
import AdminLogin from "./services/authentication_service/pages_authentication_service/AdminLogin"
import AddProductForm from "./services/menu_management_service/component_menu_management_service/AddProductForm"
import AddIngredientForm from "./services/menu_management_service/component_menu_management_service/AddIngredientForm";
import ManageProductAvailability from "./services/menu_management_service/component_menu_management_service/ManageProductAvailability";
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Routes>
            <Route path="/adminlogin" element={<AdminLogin />} />
               <Route path="/adminmanagerhome" element={<AdminManagerHome />}>
                  <Route path="addproduct" element={<AddProductForm />} />
                  <Route path="addingredient" element={<AddIngredientForm />} />
                  <Route path="manageproductsavailability" element={<ManageProductAvailability />} />
                  
               </Route>
              <Route path="/admincashcounterhome" element={<AdminCashCounterHome />} />
        </Routes>
    </>
  )
}

export default App
