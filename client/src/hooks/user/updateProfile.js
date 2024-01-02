import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";

const useUpdateProfile = () => {
  const {dispatch} = useContext(UserContext)
  async function updateProfile(body){
    try {
      const response = await axios.post("http://localhost:3001/api/user/updateProfile",body,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch({type:"LOGIN" , payload:response.data.data})
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
  return {updateProfile}
}
 
export default useUpdateProfile;