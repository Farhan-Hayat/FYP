import axios from "axios"
import { useContext } from "react";
import {UserContext} from "../../contexts/userContext"
const useSearchGroundByOwnerId = () => {
  const {user} = useContext(UserContext)
  async function searchGroudByOwnerId(){
    try {
      const response = await axios.get(`http://localhost:3001/api/ground/search/by/${user._id}`)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
  return {searchGroudByOwnerId};
}
 
export default useSearchGroundByOwnerId;