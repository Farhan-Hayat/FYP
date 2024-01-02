import axios from "axios";
const useDeleteSignupRequest = () => {
  async function deleteRequest(id){
    try{
      const response = await axios.delete(`http://localhost:3001/api/signupRequest/delete/${id}` , {
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response.data)
      return response.data
    }
    catch(error){
      return error.response.data
    }
  }
  return {deleteRequest};
}
 
export default useDeleteSignupRequest;