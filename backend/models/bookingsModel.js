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
  timeSlotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stadium.timeSlots', // Reference to the timeSlots within Stadium model
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingsSchema, "bookings");
