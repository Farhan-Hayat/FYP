import axios from "axios";
const useChangePassword = () => {
  async function changePassword(body){
    try {
      const response =await axios.post("http://localhost:3001/api/user/changepassword" , {
        password:body.oldPassword,
        newPassword:body.newPassword
      },
      {
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      }) 
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
  return {changePassword};
}
 
export default useChangePassword;