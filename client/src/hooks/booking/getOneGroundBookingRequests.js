import axios from "axios";

const useGetOneGroundBookingRequests = () => {
  async function getOneGroundBookingRequests(groundId){
    try {
      const response = await axios.get(`http://localhost:3001/api/booking/ground/${groundId}`)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
  return {getOneGroundBookingRequests};
}
 
export default useGetOneGroundBookingRequests;