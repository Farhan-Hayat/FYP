import { useEffect, useState , useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
const ManagerProtectedRoute = () => {
  const [isLoading , setIsLoading] = useState("")
  const navigate = useNavigate()
  const {user} = useContext(UserContext)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
    else{
      if(user.role === "groundOwner"){
        setIsLoading(false)
      }else{
        navigate("/")
      }
    }
    // eslint-disable-next-line
  }, [navigate]);

  if(isLoading){
    return (<div>loading...</div>)
  }
  else{
    return ( 
      <div>
        <Outlet/>
      </div>
     );
  }
  
}
 
export default ManagerProtectedRoute;