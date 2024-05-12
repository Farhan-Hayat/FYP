const express = require("express")
const router = express.Router();
const {getOneGroundBookings,postBooking , updateBookingStatus, getOneUserBookings} = require("../controllers/bookingController")
const {authenticateToken} = require("../middleware/authentication")
router.get("/ground/:groundId" , getOneGroundBookings)
router.post("/post" , authenticateToken , postBooking)
router.patch("/update/status" , authenticateToken,updateBookingStatus)
router.get("/user/:userId" , getOneUserBookings)
module.exports = router;
