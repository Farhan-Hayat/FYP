import axios from "axios";

const useGetSingleGround = () => {
  
  async function getSingleGround(id){
    try {
      const response = await axios.get(`http://localhost:3001/api/ground/${id}`)
      
      return response.data;
    } catch (error) {
      return error.response.data
    }
  }
  
  return {getSingleGround};
}
 
export default useGetSingleGround;