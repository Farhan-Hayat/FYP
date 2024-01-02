import axios from "axios"
const usePostTimeSlot = () => {
  async function postTimeSlot(body){
    try {
      const response = await axios.post("http://localhost:3001/api/ground/post/timeSlot" , body , {
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  return {postTimeSlot};
}
 
export default usePostTimeSlot;