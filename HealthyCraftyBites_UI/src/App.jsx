import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../src/context/AdminAuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import { refreshToken } from "./api/RefreshAccessTokenApi";
import Home from "./layout_pages/home_page/Home";
import BusinessInsightsDashboard from "./services/business_insights_service/component_business_insights_service/BusinessInsightsDashboard";
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
import ViewMenu from "./services/menu_management_service/pages_menu_management_service/ViewMenu";
import ProductCustomizer from "./services/menu_management_service/pages_menu_management_service/ProductCustomizer";
import CartPage from "./services/order_service/pages_order_service/CartPage";
import OrderHistoryPage from "./services/order_service/pages_order_service/OrderHistoryPage";
import OrderConfirmationPage from "./services/order_service/pages_order_service/OrderConfirmationPage";
import FavoritesPage from "./services/user_service/pages_user_service/FavoritesPage";
import UserProfilePage from "./services/user_service/pages_user_service/UserProfilePage";
import AboutUs from "./common_components/AboutUs";
import ContactUs from "./common_components/ContactUs";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { login, finishLoading } = useAuth();

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userregistration" element={<UserRegistration />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/viewmenu" element={<ViewMenu />} />
      <Route path="/customiseproduct" element={<ProductCustomizer />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="/orders" element={<OrderHistoryPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />

      <Route path="/adminmanagerhome" element={<ProtectedRoute />}>
        <Route element={<AdminManagerHome />}>
          <Route index element={<BusinessInsightsDashboard />} />
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