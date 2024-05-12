const Booking = require("../models/bookingModel");

async function getOneGroundBookings(req, res) {
  try {
    const bookings = await Booking.getOneGroundBookings(req.params.groundId);
    res
      .status(200)
      .json({ message: "Bookings Fetched", ok: true, data: bookings });
  } catch (error) {
    res.status(400).json({ error: error.message, ok: false });
  }
}

async function postBooking(req, res) {
  try {
    const addedBooking = await Booking.addBooking(req.body);
    res.status(200).json({message:"Booking Added" , ok:true , data:addedBooking})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function updateBookingStatus(req,res){
  try {
    const updatedBooking = await Booking.updateBookingStatus(req.body)
    res.status(200).json({message:"Booking Status Updated" ,ok:true,data:updatedBooking})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function getOneUserBookings(req,res){
  try {
    const data = await Booking.getOneUserBookings(req.params.uesrId)
    res.status(200).json({data:data , ok:true, message:"User Bookings Fetched."})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})    
  }
}

module.exports = {
  getOneGroundBookings,
  postBooking,
  updateBookingStatus,
  getOneUserBookings
};
