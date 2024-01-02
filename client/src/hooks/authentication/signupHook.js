import axios from "axios"

const useSignup = () => {
  
  const signup = async (body) => {
    try {
      const response = await axios.post("http://localhost:3001/api/user/signup", body);
      return {...response.data }
    } catch (error) {
      return error.response.data
    }
  };

  return {signup }

}
 
export default useSignup;