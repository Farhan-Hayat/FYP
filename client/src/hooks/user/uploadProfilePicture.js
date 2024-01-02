import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
const useUploadProfilePicture = () => {
  const {  dispatch } = useContext(UserContext);

  async function uploadProfilePicture(imageCode){
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/upload/dp",
        { imageCode: imageCode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );
      dispatch({ type: "LOGIN", payload: response.data.data });
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
  return {uploadProfilePicture};
}
 
export default useUploadProfilePicture;