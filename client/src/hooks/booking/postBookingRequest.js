import axios from "axios";
const usePostBookingRequest = () => {
  async function postBookingRequest(body){
    try {
      const response = await axios.post("http://localhost:3001/api/booking/post",body,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
  return {postBookingRequest};
}
 
export default usePostBookingRequest;