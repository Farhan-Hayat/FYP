import { Link } from "react-router-dom";

const ManagerNavbar = () => {
  return ( 
    <div>
      <Link to="upload-post">Upload Post</Link>
      <Link to="my-posts">My Posts</Link>
      <Link to="setup-ground">Setup Ground</Link>
      <Link to="add-time-slots">Add Time SLots</Link>
      <Link to="bookingRequests">Booking Requests</Link>
    </div>
   );
}
 
export default ManagerNavbar;