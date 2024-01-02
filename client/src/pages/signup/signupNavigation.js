import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./signupNavigation.scss";
const SignupNavigation = () => {
  // const [isClicked, setIsClicked] = useState(false);
  const [pathName , setPathName] = useState("")
  const location = useLocation()
  useEffect(() => {
    setPathName(location.pathname)
  }, [location.pathname]);
  
  return (
    <div className="SignupNavigation">
      <div className="overlay"></div>
      {/* {!isClicked && ( */}
      <div className="leftSide">
        <div className="btnsDiv">
          <h1>Sign up as:</h1>
          <Link to="player" className={pathName==="/signup/player"?"btn activeOpt":"btn"}>Player</Link>
          <Link to="ground-owner" className={pathName==="/signup/ground-owner"?"btn activeOpt":"btn"}>Owner</Link>
        </div>
      </div>
      {/* )} */}
      <div className="rightSide">
        <div className="formCont">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SignupNavigation;
