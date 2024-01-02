import { Outlet } from "react-router-dom";
import ManagerNavbar from "../../components/navbar/managerNavbar";

const Dashboard = () => {
  return (
    <div>
      <ManagerNavbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
