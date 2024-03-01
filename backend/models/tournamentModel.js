const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, // Remove leading/trailing whitespace
  },
  creatorId: {
    type: String,
    required: true,
  },
  location_stadiumId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Tournament", tournamentSchema, "tournaments");
