import axios from "axios";

const useGetAllPosts = () => {
  async function getAllPosts(){
    try{
      const response = await axios.get("http://localhost:3001/api/post")
      return response.data
    }catch(error){
      return error.response.data
      
    }
  }
  return {getAllPosts}
}
 
export default useGetAllPosts;