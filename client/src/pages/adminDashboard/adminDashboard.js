import {Outlet , Link} from "react-router-dom";
import "./adminDashboard.scss"
const AdminDashboard = () => {
  return ( 
    <div className="AdminDashboard">
      <div className="adminDashboardNavbar">
      <Link to="signupRequest">Signup Requests</Link>

      </div>
      <div className="outlet">
      <Outlet/>

      </div>
    </div>
   );
}
 
export default AdminDashboard;