const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
  stadiumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stadium', // Reference to the Stadium model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
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
});

module.exports = mongoose.model("Booking", bookingsSchema, "bookings");
