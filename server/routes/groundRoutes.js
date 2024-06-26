const express = require("express")
const router = express.Router();
const {registerGround, getAllGrounds , getSingleGround , postTimeSlot,searchByOwnerId , deleteTimeSlot} = require("../controllers/groundController")
const {authenticateToken} = require("../middleware/authentication")
router.post("/register" ,authenticateToken, registerGround)
router.get("/" , getAllGrounds)
router.get("/:id" , getSingleGround)
router.post("/post/timeSlot" , authenticateToken , postTimeSlot) 
router.post("/delete/timeSlot/" , deleteTimeSlot)
router.get("/search/by/:ownerId" , searchByOwnerId)
module.exports = router;
