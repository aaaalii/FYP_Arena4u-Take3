const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
    match: /^(1[012]|0?[1-9]):[0-5][0-9]\s(?:AM|PM)$/, // HH:MM AM|PM format
  },
  endTime: {
    type: String,
    required: true,
    match: /^(1[012]|0?[1-9]):[0-5][0-9]\s(?:AM|PM)$/, // HH:MM AM|PM format
  },
  isBooked:{
    type: Boolean,
  }
})

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
