import axios from "axios"
const useDeleteUserPost = () => {

  async function deleteUserPost(postId){
    try {
      const response = await axios.delete(`http://localhost:3001/api/post/delete/${postId}` , null , {
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      return response.data
    } catch (error) {
      return error.response.data 
    }
  }
  return {deleteUserPost};
}
 
export default useDeleteUserPost;