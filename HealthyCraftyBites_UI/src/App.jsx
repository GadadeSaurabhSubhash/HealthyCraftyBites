import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../src/context/AdminAuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import { refreshToken } from "./api/RefreshAccessTokenApi";
import Home from "./layout_pages/home_page/Home";
import BusinessInsightsDashboard from "./services/business_insights_service/component_business_insights_service/BusinessInsightsDashboard";
import DemoPage from "./services/menu_management_service/component_menu_management_service/DemoPage";
import UserRegistration from "./services/authentication_service/pages_authentication_service/UserRegistration";
import AdminManagerHome from "./layout_pages/admin_manager/AdminManagerHome";
import AdminLogin from "./services/authentication_service/pages_authentication_service/AdminLogin";
import AddProductForm from "./services/menu_management_service/component_menu_management_service/AddProductForm";
import AddIngredientForm from "./services/menu_management_service/component_menu_management_service/AddIngredientForm";
import ManageProductAvailability from "./services/menu_management_service/component_menu_management_service/ManageProductAvailability";
import ManageIngredientAvailability from "./services/menu_management_service/component_menu_management_service/ManageIngredientAvailability";
import EditProduct from "./services/menu_management_service/component_menu_management_service/EditProduct";
import EditIngredient from "./services/menu_management_service/component_menu_management_service/EditIngredient";
import ChangeAdminPassword from "./services/authentication_service/component_authentication_service/ChangeAdminPassword";
import AdminCashCounterHome from "./layout_pages/admin_cash_counter/AdminCashCounterHome";
import WelcomeAdmin from "../src/services/authentication_service/pages_authentication_service/WelcomeAdmin"

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { login,finishLoading } = useAuth();

  useEffect(() => {
    async function tryRestoreSession() {
      try {
        const response = await refreshToken();
        login(response.data.data.accessToken, response.data.data.role);
      } catch (error) {
        finishLoading();
      }
    }
    tryRestoreSession();
  }, []);

  return (
    <>
      <Routes>
            <Route path="/userregistration" element={<UserRegistration />} />
            <Route path="/demopage" element={<DemoPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
               <Route path="/adminmanagerhome" element={<AdminManagerHome />}>
                  <Route path="viewreviewdashboard" element={<BusinessInsightsDashboard />} />
                  <Route path="addproduct" element={<AddProductForm />} />
                  <Route path="addingredient" element={<AddIngredientForm />} />
                  <Route path="manageproductsavailability" element={<ManageProductAvailability />} />
               </Route>
        </Routes>
    </>
  )
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminlogin" element={<AdminLogin />} />

      <Route path="/adminmanagerhome" element={<ProtectedRoute />}>
        <Route element={<AdminManagerHome />}>
            <Route index element={<WelcomeAdmin />} />
            <Route path="addproduct" element={<AddProductForm />} />
            <Route path="addingredient" element={<AddIngredientForm />} />
            <Route path="manageproductsavailability" element={<ManageProductAvailability />} />
            <Route path="manageingredientsavailability" element={<ManageIngredientAvailability />} />
            <Route path="editproduct" element={<EditProduct />} />
            <Route path="editingredient" element={<EditIngredient />} />
            <Route path="changeadminpassword" element={<ChangeAdminPassword />} />
        </Route>
    </Route>

      <Route path="/admincashcounterhome" element={<ProtectedRoute />}>
        <Route index element={<AdminCashCounterHome />} />
      </Route>
    </Routes>
  );
}

export default App;