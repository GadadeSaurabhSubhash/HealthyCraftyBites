import { Link } from 'react-router-dom';
import "../layout_pages_css/AdminManagerFeatureBarCSS.css"

function AdminManagerFeatureBar(){
    return(
        <>
            <div className="FeatureNavbar d-flex row">
                <div className="featurePanel1 px-3 py-2 d-flex justify-content-around">
                    <div><Link to="/adminmanagerhome/addproduct" className="gold-link">Add-New-Product</Link></div>
                    <div><Link to="/adminmanagerhome/addingredient" className="gold-link">Add-New-Ingredient</Link></div>
                    <div><Link to="/adminmanagerhome/editproduct" className="gold-link">Edit-Product</Link></div>
                    <div><Link to="/adminmanagerhome/editingredient" className="gold-link">Edit-Ingredient</Link></div>
                </div>
                
                <div className="featurePanel1 px-3 py-3 d-flex justify-content-evenly">
                    <div><Link to="/adminmanagerhome/manageproductsavailability" className="gold-link">Manage-Products-Availability</Link></div>
                    <div><Link to="/adminmanagerhome/manageingredientsavailability" className="gold-link">Manage-Ingredients-Availability</Link></div>
                    <div><Link to="/adminmanagerhome/changeadminpassword" className="gold-link">Change-Password</Link></div>
                </div>
            </div>
        </>
    )
}

export default AdminManagerFeatureBar