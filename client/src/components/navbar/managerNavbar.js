import { NavLink } from "react-router-dom";

const ManagerNavbar = () => {
  return ( 
    <div className="ManagerNavbar">
      <NavLink to="my-posts">My Posts</NavLink>
      <NavLink to="upload-post">Upload Post</NavLink>
      <NavLink to="setup-ground">Setup Ground</NavLink>
      <NavLink to="add-time-slots">Add Time SLots</NavLink>
      <NavLink to="bookingRequests">Booking Requests</NavLink>
      <NavLink to="today-Bookings">Today Bookings</NavLink>
      <NavLink to="manage-league">Manage League</NavLink>
    </div>
   );
}
 
export default ManagerNavbar;