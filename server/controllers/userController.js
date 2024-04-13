const User = require("../models/userModel");
const { generateToken } = require("../middleware/authentication");

async function userSignup(req, res) {
  try {
    const user = await User.signup(req.body);
    res.status(200).json({ message: "User Registered Successfully", ok: true , data:user });
  } catch (error) {
    res.status(400).json({ error: error.message, ok: false });
  }
}

async function userLogin(req, res) {
  try {
    const user = await User.login(req.body);
    const token = generateToken(user._id, user.role);
    res.status(200).json({
      message: "User logged in successfully",
      ok: true,
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message, ok: false });
  }
}

async function rehydrateUser(req, res) {
  try {
    const user = await User.getUser(req.user._id);
    res.status(200).json({ message: "User Fetched", ok: true, data: user });
  } catch (error) {
    res.status(400).json({ error: error.message, ok: false });
  }
}

async function uploadProfilePicture(req, res) {
  try {
    const user = await User.uploadProfilePicture(
      req.user._id,
      req.body.imageCode
    );
    res
      .status(200)
      .json({ messasge: "Profile Picture Uploaded", ok: true, data: user });
  } catch (error) {
    res.status(400).json({ error: error.message, ok: false });
  }
}

async function changePassword(req, res) {
  try {
    const user = await User.changePassword(req.user._id, req.body);
    res.status(200).json({ message: "password chnaged", ok: true, data: user });
  } catch (error) {
    res.status(400).json({ error: error.message, ok: false });
  }
}

async function updateProfile(req,res){
  try {
    const user = await User.updateProfile(req.user._id ,req.body)
    res.status(200).json({message:"User UPdated" , ok:true , data:user})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

module.exports = {
  userSignup,
  userLogin,
  rehydrateUser,
  uploadProfilePicture,
  changePassword,
  updateProfile,
};
