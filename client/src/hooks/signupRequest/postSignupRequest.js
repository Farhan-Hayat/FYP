import axios from "axios";

const usePostSignupRequest = () => {
  
  async function postSignupRequest(body){
    try{
      const response = await axios.post("http://localhost:3001/api/signupRequest/post" , body)
      return response.data
    }
    catch(error){
      return error.response.data
    }
  }
  
  return {postSignupRequest};
}
 
export default usePostSignupRequest;