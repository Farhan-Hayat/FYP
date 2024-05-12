import axios from "axios"
const usePostTimeSlot = () => {
  async function postTimeSlot(body){
    try {
      const response = await axios.post("http://localhost:3001/api/ground/post/timeSlot" , body , {
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
  return {postTimeSlot};
}
 
export default usePostTimeSlot;