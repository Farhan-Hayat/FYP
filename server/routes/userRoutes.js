const express = require("express")
const router = express.Router();

const {userSignup , userLogin , rehydrateUser, uploadProfilePicture , changePassword , updateProfile} = require("../controllers/userController")
const {authenticateToken} = require("../middleware/authentication")
router.post("/signup" , userSignup)
router.post("/login" , userLogin)
router.post("/rehydrateUser", authenticateToken, rehydrateUser)
router.post("/upload/dp" , authenticateToken, uploadProfilePicture)
router.post("/changepassword" , authenticateToken , changePassword)
router.post("/updateProfile" , authenticateToken , updateProfile)
module.exports = router