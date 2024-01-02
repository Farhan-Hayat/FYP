import axios from "axios";

const useGetAllGrounds = () => {
  async function getAllGrounds(){
    try{
      const response = await axios.get("http://localhost:3001/api/ground")
      return response.data;
    }
    catch(error){
      return error.response.data
    }
  }
  return {getAllGrounds};
}
 
export default useGetAllGrounds;