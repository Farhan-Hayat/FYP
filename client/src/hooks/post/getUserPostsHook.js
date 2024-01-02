import axios from "axios";
const useGetUserPosts = () => {
  async function getUserPosts(){
    try {
      const response = await axios.get("http://localhost:3001/api/post/user/" , {
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
  
  return {getUserPosts};
}
 
export default useGetUserPosts;