const express = require("express")
const router = express.Router();
const {postRequest,getRequests,deleteRequest} = require("../controllers/signupRequestController")
const {authenticateToken} = require("../middleware/authentication")

router.post("/post" , postRequest )
router.get("/" , authenticateToken ,getRequests)
router.delete("/delete/:id",authenticateToken,deleteRequest)

module.exports = router;
