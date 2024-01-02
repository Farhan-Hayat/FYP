import axios from "axios";
const useGetSignupRequest = () => {
  async function getSignupRequest(){
    try {
      const response = await axios.get("http://localhost:3001/api/signupRequest/",{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      return response.data
    } catch (error) {
      return error.response.data.error
    }
  }
  return {getSignupRequest};
}
 
export default useGetSignupRequest;