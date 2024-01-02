import { useState } from "react";
import useSignup from "../../hooks/authentication/signupHook";
import { useNavigate } from "react-router-dom";
import "./signupNavigation.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//component
const SignupPlayer = () => {
  //Variables
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("player");
  const [team, setTeam] = useState("");
  const [isValidPh, setIsValidPh] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);
  const [isValidConfirmPass, setIsValidConfirmPass] = useState(true);
  const [incompleteError, setIncompleteError] = useState("");
  const { signup } = useSignup();
  const navigate = useNavigate();

  //functions

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateIsFilled() && isValidPh && isValidPass && isValidConfirmPass) {
      const body = { name, username, password, phoneNumber, role, team };
      const res = await signup(body);
      if (res.ok) {
        navigate("/login");
      } else {
        console.log(res.error);
        setIncompleteError(res.error);
      }
    } else {
      // setIncompleteError(
      //   "Please review the provided information and ensure all fields are correctly filled before submitting."
      // );
      toast.error("Review and complete all fields before submitting.");
    }
  };

  const validateIsFilled = () => {
    if (
      !name ||
      !username ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !role
    ) {
      return false;
    } else {
      if (role === "player" && !team) {
        return false;
      }
      return true;
    }
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);

    // Check if the phone number is empty
    const isEmpty = newPhoneNumber.trim() === "";

    // Validate the phone number using a regular expression only if it's not empty
    const isValidPhoneNumber = isEmpty || /^(03\d{9})$/.test(newPhoneNumber);

    setIsValidPh(isValidPhoneNumber);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check if the password is empty
    const isEmpty = newPassword.trim() === "";

    // Validate the password using a regular expression only if it's not empty
    const isValidPassword = isEmpty || /^(?=.*\d)(.{8,16})$/.test(newPassword);

    setIsValidPass(isValidPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if the confirmation password is empty
    const isEmpty = newConfirmPassword.trim() === "";

    // Validate the confirmation password only if it's not empty
    const isMatching = isEmpty || password === newConfirmPassword;

    setIsValidConfirmPass(isMatching);
  };

  return (
    <div className="SignupPlayer">
      <form onSubmit={handleSignup}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            onChange={handlePasswordChange}
            className={isValidPass ? "" : "validationErrorStyle"}
          />
          <span>
            <p>*Minimum Length of 8 characters</p>
            <p>*Must include at least one number (0-9)</p>
          </span>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={isValidConfirmPass ? "" : "validationErrorStyle"}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className={isValidPh ? "" : "validationErrorStyle"}
          />

          <span>
            <p>*e.g:03001234567</p>
          </span>
        </div>

        {role === "player" && (
          <div>
            <label>Team</label>
            <input
              type="text"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
          </div>
        )}
        <div>
          <button>Signup</button>
        </div>
      </form>
      <ToastContainer />
      {/* {incompleteError && <p>{incompleteError}</p>} */}
      {/* <div>
        <h3>Note:</h3>
        <ul>
        The password must adhere to the following criteria
          <li>Minimum length of 8 characters</li>
          <li>At least one digit must be included</li>
        </ul>
      </div> */}
    </div>
  );
};

export default SignupPlayer;
