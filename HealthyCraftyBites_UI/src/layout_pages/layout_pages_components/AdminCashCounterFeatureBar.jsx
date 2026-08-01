import { Link } from 'react-router-dom';
import "../layout_pages_css/AdminManagerFeatureBarCSS.css"

function AdminCashCounterFeatureBar(){
    return(
        <>
            <div className="FeatureNavbar d-flex row">
                <div className="featurePanel1 px-3 py-2 d-flex justify-content-around">
                    <div><Link to="/admincashcounterhome/vieworder" className="gold-link">View Orders</Link></div>
                    <div><Link to="/admincashcounterhome/viewtransactions" className="gold-link">View Transactions</Link></div>
                   
                </div>
                
               
            </div>
        </>
    )
}

export default AdminCashCounterFeatureBar