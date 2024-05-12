import { NavLink, Outlet } from "react-router-dom";
import "./manageLeague.scss";
const ManageLeague = () => {
  return (
    <div className="ManageLeague">
      <nav className="manageLeagueNav">
        <NavLink to="add">Add League</NavLink>
        <NavLink to="teams">Teams</NavLink>
        <NavLink to="league-table">League Table</NavLink>
        <NavLink to="matches">Matches</NavLink>
      </nav>
      <div className="manageLeagueOutlet">
      <Outlet />

      </div>
    </div>
  );
};

export default ManageLeague;
