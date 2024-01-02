import {Outlet , Link} from "react-router-dom";
const AdminDashboard = () => {
  return ( 
    <div>
      <Link to="signupRequest">Signup Requests</Link>
      <Outlet/>
    </div>
   );
}
 
export default AdminDashboard;