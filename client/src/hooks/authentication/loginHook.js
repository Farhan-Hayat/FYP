import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
const useLogin = () => {
  const {dispatch} = useContext(UserContext);
  async function login(body){
    try {
      const response = await axios.post("http://localhost:3001/api/user/login" , body)
      localStorage.setItem("token" , response.data.token )  
      dispatch({type:"LOGIN" , payload:response.data.data})
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  return {login}
}
 
export default useLogin;