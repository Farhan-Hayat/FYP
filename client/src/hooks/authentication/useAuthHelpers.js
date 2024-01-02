import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
const useAuthHelper = () => {

  const {dispatch} = useContext(UserContext)

  async function authHelper(){
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.post("http://localhost:3001/api/user/rehydrateUser" , null , {
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        })
        dispatch({type:"LOGIN" , payload:response.data.data})
      } catch (error) {
        console.log(error.response.data)
      }
    } else {
      console.log("Token not present");
    }
  }

  return {authHelper}
  
};

export default useAuthHelper;
