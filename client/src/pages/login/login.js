import { useState } from "react";
import useLogin from "../../hooks/authentication/loginHook";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  // Variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { login } = useLogin();
  const navigate = useNavigate();

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { username, password };
    const res = await login(body);
    if (!res.ok) {
      toast.error(res.error)
    } else {
      navigate("/");
    }
  };

  return (
    <div className="Login">
      <div className="leftCont">
        <div>
          <h1>Login</h1>
          <h3>Sign in to continue</h3>
        </div>
        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
            corporis ea omnis eos voluptas recusandae ratione nulla.{" "}
          </p>
        </div>
        <div>
          <button>Learn More</button>
        </div>
      </div>
      <div className="rightCont">
        <div className="loginDiv">
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div>{loginError && <p className="error">{loginError}</p>}</div> */}
            <div>
              <button>Login</button>
            </div>
          </form>
        </div>
      </div>
            <ToastContainer/>
    </div>
  );
};

export default Login;
