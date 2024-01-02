import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import useImageChange from "../../utils/imageChange";
import useChangePassword from "../../hooks/user/changePassword";
import useUploadProfilePicture from "../../hooks/user/uploadProfilePicture";
import useUpdateProfile from "../../hooks/user/updateProfile";
import "./userProfile.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const { changePassword } = useChangePassword();
  const { uploadProfilePicture } = useUploadProfilePicture();
  const [imageCode, setImageCode] = useState("");
  const [wantToEdit, setWantToEdit] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [team, setTeam] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { handleImageChange } = useImageChange();
  const { updateProfile } = useUpdateProfile();
  const [isValidPh, setIsValidPh] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  // Functions
  const handleImage = async (e) => {
    const base64Code = await handleImageChange(e);
    setImageCode(base64Code);
  };

  const handleUploadImage = async () => {
    if (!imageCode || imageCode.length === 0) return;
    const res = await uploadProfilePicture(imageCode);
    if (res.ok) {
      console.log("ok");
    } else {
      console.log("not ok");
    }
  };

  const handleWantToEdit = () => {
    setWantToEdit(!wantToEdit);
  };

  const handleFormEdit = async (e) => {
    e.preventDefault();
    if(isValidPh){
      const body = {
        name: !name ? user.name : name,
        phoneNumber: !phoneNumber ? user.phoneNumber : phoneNumber,
        team: !team ? user.team : team,
      };
      console.log(body);
      const res = await updateProfile(body);
      if (res.ok) {
        console.log("ok");
        setWantToEdit(false);
        setName("");
        setPhoneNumber("");
        setTeam("");
      } else {
        console.log(res.error);
      }
    }
    
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if(!oldPassword||!newPassword){
      toast.error("Please Fill all the fields")
      return
    }
    if(oldPassword===newPassword){
      toast.error("Old and New Passwords cannot be same.")
      return
    }
    if (isValidPass) {
      const body = { oldPassword, newPassword };
      const res = await changePassword(body);
      if (res.ok) {
        toast.success("Password Changed Successfully!")
        setPasswordErrorMessage("");
      } else {
        toast.error(res.error)
        setPasswordErrorMessage(res.error);
        setPasswordChangeSuccess("");
      }
    } else {
      toast.error("New password must contain atleast 8 characters and 1 digit.")
      setPasswordChangeSuccess("");
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
    setNewPassword(newPassword)
    // Check if the password is empty
    const isEmpty = newPassword.trim() === "";

    // Validate the password using a regular expression only if it's not empty
    const isValidPassword = isEmpty || /^(?=.*\d)(.{8,16})$/.test(newPassword);

    setIsValidPass(isValidPassword);
  };

  return (
    <div className="UserProfile">
      <div className="headingCont">
        <h1>User Profile</h1>
      </div>
      <div className="contentCont">
        <div className="profilePictureDiv">
          <div className="profilePicture">
            {user.profilePicture && (
              <img alt="Profile" src={user.profilePicture} />
            )}
          </div>
          <form onSubmit={handleUploadImage}>
            <input
              type="file"
              label="image"
              id="image-upload"
              accept=".jpeg , .png , .jpg"
              onChange={handleImage}
            />
            <button>Upload Image</button>
          </form>
        </div>
        <div className="profileDetailDiv">
          <div className="editDetail">
            <div className="editDetailHeading">
              <h1>User Information</h1>
              <button onClick={handleWantToEdit}>
                {wantToEdit ? "Cancel" : "Edit"}
              </button>
            </div>
            {!wantToEdit && (
              <form>
                <div>
                  <label>Username : </label>
                  <input type="text" value={user.username} />
                </div>
                <div>
                  <label>Name : </label>
                  <input type="text" value={user.name} />
                </div>
                <div>
                  <label>Phone Number :</label>
                  <input type="text" value={user.phoneNumber} />
                </div>
                {user.role === "player" && <div>
                  <label>Team : </label>
                  <input type="text" value={user.team} />
                </div>}
              </form>
            )}
            {wantToEdit && (
              <form onSubmit={handleFormEdit}>
                <div>
                  <label>Username : </label>
                  <input type="text" value={user.username} readOnly />
                </div>
                <div>
                  <label>Name : </label>
                  <input
                    type="text"
                    value={name}
                    placeholder={user.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Phone Number : </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    placeholder={user.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    style={{
                      borderColor: isValidPh ? "gray" : "red",
                      outline: "none",
                    }}
                  />
                </div>
                {user.role==="player" && <div>
                  <label>Team : </label>
                  <input
                    type="text"
                    value={team}
                    placeholder={user.team}
                    onChange={(e) => setTeam(e.target.value)}
                  />
                </div>}
                <div className="formBtnHolder">
                  <button>Submit</button>
                </div>
              </form>
            )}
          </div>
          <hr />
          <div className="editDetail">
            <div className="editDetailHeading">
              <h1>Change Password</h1>
            </div>
            <form onSubmit={handleChangePassword}>
              <div>
                <label>Old Password :</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div>
                <label>New Password :</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  style={{
                    borderColor: isValidPass ? "gray" : "red",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <button>Change Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
