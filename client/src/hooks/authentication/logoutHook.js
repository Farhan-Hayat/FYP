import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  async function logout() {
    localStorage.removeItem("token");
    dispatch({type: "LOGOUT"});
    navigate("/");
  }

  return { logout };
};

export default useLogout;
