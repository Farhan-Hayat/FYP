import { Outlet } from "react-router-dom";
import ManagerNavbar from "../../components/navbar/managerNavbar";
import "./dashboard.scss"
const Dashboard = () => {
  return (
    <div className="ManagerDashboard">
      <ManagerNavbar />
      <div className="ManagerOutlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
