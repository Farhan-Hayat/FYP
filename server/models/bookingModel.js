const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ground: {
      type: mongoose.Types.ObjectId,
      ref: "Ground",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["approved", "pending", "declined"],
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.statics.getOneGroundBookings = async function (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }
  const bookings = await this.find({ ground: id }).populate("user").exec();
  if (!bookings) {
    throw new Error("No bookings found");
  }

  return bookings;
};

bookingSchema.statics.addBooking = async function (body) {
  const { userId, groundId, date, startTime, endTime, price } = body;

  if (
    !mongoose.Types.ObjectId.isValid(body.userId) ||
    !mongoose.Types.ObjectId.isValid(body.groundId)
  ) {
    throw new Error("Invalid User or Ground ID");
  }

  const newBooking = new this({
    user: userId,
    ground: groundId,
    date,
    startTime,
    endTime,
    price,
  });

  const savedBooking = await newBooking.save();
  return savedBooking;
};

bookingSchema.statics.updateBookingStatus = async function (body) {
  const { requestId, status } = body;
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw new Error("Invalid Request ID");
  }
  const updatedBooking = await this.findByIdAndUpdate(
    requestId,
    {
      status,
    },
    { new: true }
  );
  if (!updatedBooking) {
    throw new Error("No booking found");
  }
  return updatedBooking;
};

bookingSchema.statics.getOneUserBookings = async function(userId){
  
  const userBookings = await this.find({user:userId})
  if(userBookings.length<1){
    throw new Error("No Bookings found for this user.")
  }
  return userBookings
}

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
