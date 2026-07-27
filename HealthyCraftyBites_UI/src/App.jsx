import AdminManagerHome from "./layout_pages/admin_manager/AdminManagerHome";
import AdminLogin from "./services/authentication_service/pages_authentication_service/AdminLogin"
import AddProduct from "../src/services/authentication_service/pages_authentication_service/AddProduct"
import AddIng from "./services/authentication_service/pages_authentication_service/AddIng"
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Routes>
            <Route path="/adminlogin" element={<AdminLogin />} />
               <Route path="/adminmanagerhome" element={<AdminManagerHome />}>
                  <Route path="addproduct" element={<AddProduct />} />
                  <Route path="addingredient" element={<AddIng />} />
                </Route>
        </Routes>
    </>
  )
}

export default App
