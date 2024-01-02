const express = require("express")
const router = express.Router();
const {uploadPost,getAllPosts, getUserPosts, deleteUserPost} = require("../controllers/postController")
const {authenticateToken} = require("../middleware/authentication")

router.get("/" , getAllPosts)
router.post("/upload" , authenticateToken , uploadPost)
router.get("/user/",authenticateToken , getUserPosts)
router.delete("/delete/:id"  ,deleteUserPost)
module.exports = router;