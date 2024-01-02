import { useEffect, useState , useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
const AdminProtectedRoute = () => {
  const [isLoading , setIsLoading] = useState("")
  const navigate = useNavigate()
  const {user} = useContext(UserContext)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
    else{
      if(user.role === "admin"){
        setIsLoading(false)
      }else{
        navigate("/")
      }
    }
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
 
export default AdminProtectedRoute;