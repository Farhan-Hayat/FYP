import axios from "axios"
const useRegisterGround = () => {
  async function registerGround(body){
    try{
      const response = await axios.post("http://localhost:3001/api/ground/Register" , body , {
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      return response.data
    }catch(error){
      return error.response.data
    }
  }
  return {registerGround};
}
 
export default useRegisterGround;