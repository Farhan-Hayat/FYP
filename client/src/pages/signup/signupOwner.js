import { useState } from "react";
import GroundBasicDetails from "../../components/setupGround/groundBasicDetails";
import usePostSignupRequest from "../../hooks/signupRequest/postSignupRequest";
import useImageChange from "../../utils/imageChange";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignupOwner = () => {
  //Variable
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("groundOwner");
  const [isValidPh, setIsValidPh] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);
  const [isValidConfirmPass, setIsValidConfirmPass] = useState(true);
  const [imageCode, setImageCode] = useState("");
  const { postSignupRequest } = usePostSignupRequest();

  const { handleImageChange } = useImageChange();
  //Function
  const handleImage = async (e) => {
    const base64Code = await handleImageChange(e);
    setImageCode(base64Code);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (isValidConfirmPass && isValidPass && isValidPh && name && username && phoneNumber && password && imageCode) {
        const res = await postSignupRequest({
          name,
          username,
          password,
          role,
          phoneNumber,
          document: imageCode,
        });
        if(res.ok){
          toast.success("Signup request submitted successfully!")
          setConfirmPassword("")
          setImageCode("")
          setName("")
          setPassword("")
          setPhoneNumber("")
          setUsername("")
        }else{
          toast.error("This username is already in use. Try using another one!")
        }
      } else {
        toast.error("Review and complete all fields before submitting.");
      }
    
  };

  return (
    <div className="SignupPlayer">
      <form onSubmit={handleSubmit}>
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
          <label>Confirm password:</label>
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
        <div>
          <label>Upload Document:</label>
          <input type="file" className="fileInput" onChange={handleImage} />
          <span>
            <p>*Upload the required Document</p>
          </span>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <ToastContainer />

      {/* {imageCode && <img src={imageCode} alt="document" />} */}

    </div>
  );
};

export default SignupOwner;
