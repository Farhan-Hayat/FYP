import { Link } from "react-router-dom";
import useLogout from "../../hooks/authentication/logoutHook";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import "./navbar.scss";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { logout } = useLogout();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <div className="Navbar">
      <div className="logo">
        <div></div>
      </div>
      <div className="links">
        <ul className="linksUl">
          <li className="linksUlLi">
            <Link to="/">Home</Link>
          </li>
          <li className="linksUlLi">
            <Link to="/grounds">Grounds</Link>
          </li>
          <li className="linksUlLi">
            <Link to="">Contact Us</Link>
          </li>
          <li className="linksUlLi">
            <Link to="">About Us</Link>
          </li>

          <li className="linksUlLi">
          <Link>{isLoggedIn ? user?.name?.split(" ")[0] || "User" : "User"}</Link>

            <ul className="dropDown">
              {isLoggedIn && user.role === "admin" && (
                <li className="dropDownLi">
                  <Link to="/admin/dashboard/">Dashboard</Link>
                </li>
              )}
              {isLoggedIn && user.role === "groundOwner" && (
                <li className="dropDownLi">
                  <Link to="/manager/dashboard/my-posts">Dashboard</Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="dropDownLi">
                  <Link to="/my/profile">User Profile</Link>{" "}
                </li>
              )}
              {isLoggedIn && (
                <li className="dropDownLi">
                  <Link to="/my/profile">My Bookings</Link>{" "}
                </li>
              )}
              {isLoggedIn && (
                <li className="dropDownLi">
                  <button onClick={logout}>Logout</button>{" "}
                </li>
              )}
              {!isLoggedIn && (
                <li className="dropDownLi">
                  <Link to="/login">Sign in</Link>
                </li>
              )}
              {!isLoggedIn && (
                <li className="dropDownLi">
                  <Link to="/signup">Sign up</Link>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
