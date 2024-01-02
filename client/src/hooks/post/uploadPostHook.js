import axios from "axios";
const useUploadPost = () => {
  async function uploadPost(body){
    try {
      const response = await axios.post("http://localhost:3001/api/post/upload",body,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  return {uploadPost};
}
 
export default useUploadPost;