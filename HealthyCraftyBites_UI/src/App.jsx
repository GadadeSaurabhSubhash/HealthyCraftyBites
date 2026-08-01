import AdminManagerHome from "./layout_pages/admin_manager/AdminManagerHome";
import AdminLogin from "./services/authentication_service/pages_authentication_service/AdminLogin"
import AddProductForm from "./services/menu_management_service/component_menu_management_service/AddProductForm"
import AddIngredientForm from "./services/menu_management_service/component_menu_management_service/AddIngredientForm";
import ManageProductAvailability from "./services/menu_management_service/component_menu_management_service/ManageProductAvailability";
import EditProduct from "./services/menu_management_service/component_menu_management_service/EditProduct";
import EditIngredient from "./services/menu_management_service/component_menu_management_service/EditIngredient";
import ManageIngredientsAvailability from "./services/menu_management_service/component_menu_management_service/ManageIngredientsAvailability";
import ViewReviewDashboard from "./services/menu_management_service/component_menu_management_service/ViewReviewDashboard";
import ResetLoginCredentials from "./services/menu_management_service/component_menu_management_service/ResetLoginCredentials";
 import { Routes, Route, Navigate } from "react-router-dom";

 import AdminCashCounterHome from "./layout_pages/admin_cash_counter/AdminCashCounterHome";

 import ViewOrder from "./services/cash_counter_service/component_cash_counter_service/ViewOrder";
import OrderDetailsDisplayBox from "./services/cash_counter_service/component_cash_counter_service/OrderDetailsDisplayBox";
import "./services/cash_counter_service/css_cash_counter_service/ViewOrderCSS.css";
import ViewTransactions from "./services/cash_counter_service/component_cash_counter_service/ViewTransactions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/adminlogin" replace />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/adminmanagerhome" element={<AdminManagerHome />}>
        <Route path="addproduct" element={<AddProductForm />} />
        <Route path="addingredient" element={<AddIngredientForm />} />
        <Route path="editproduct" element={<EditProduct />} />
        <Route path="editingredient" element={<EditIngredient />} />
        <Route path="manageproductsavailability" element={<ManageProductAvailability />} />
        <Route path="manageingredientsavailability" element={<ManageIngredientsAvailability />} />
        <Route path="viewreviewdashboard" element={<ViewReviewDashboard />} />
        <Route path="resetlogincredentials" element={<ResetLoginCredentials />} />
      </Route>
      <Route path="/admincashcounterhome" element={<AdminCashCounterHome />}>
        <Route path="viewtransactions" element={<ViewTransactions />} />
        <Route path="vieworder" element={<ViewOrder />} />
      </Route>
      <Route path="*" element={<Navigate to="/adminlogin" replace />} />
    </Routes>
  );
}

export default App
