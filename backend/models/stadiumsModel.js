const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    day: {
      type: Number, // Representing day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
      required: true
    },
    time: {
      type: String, // Assuming time is in HH:mm format
      required: true
    }
  },
  endTime: {
    day: {
      type: Number,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  isBooked: {
    type: Boolean,
    required: false
  },
});

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  timeSlots: {
    type: [timeSlotSchema],
    default: [],
  },
});


const Stadium = mongoose.model('Stadium', stadiumSchema, "stadiums");

module.exports = Stadium;
